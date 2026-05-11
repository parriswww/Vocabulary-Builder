import OpenAI from "openai";
import { z } from "zod";

const AiResponseSchema = z.object({
  definitions: z.array(z.string()).min(1),
  synonyms: z.array(z.string()),
  antonyms: z.array(z.string()),
  partOfSpeech: z.string(),
  example: z.string(),
});

export interface EnrichResult {
  definitions: string[];
  synonyms: string[];
  antonyms: string[];
  partOfSpeech: string;
  example: string;
  source: "ai" | "dictionary";
}

function buildFallback(
  rawDictionary: any[],
  synTopWords: string[],
  antTopWords: string[],
  firstPos: string,
  firstExample: string,
): EnrichResult {
  const fallbackDefs: string[] = [];
  if (Array.isArray(rawDictionary) && rawDictionary[0]?.meanings?.length) {
    for (const m of rawDictionary[0].meanings.slice(0, 3)) {
      const d0 = m.definitions?.[0];
      if (d0?.definition) fallbackDefs.push(`(${m.partOfSpeech}) ${d0.definition}`);
    }
  }
  return {
    definitions: fallbackDefs,
    synonyms: synTopWords.slice(0, 10),
    antonyms: antTopWords.slice(0, 8),
    partOfSpeech: firstPos,
    example: firstExample,
    source: "dictionary",
  };
}

export async function enrichWord(word: string): Promise<EnrichResult> {
  const [dictRes, mlRes, synRes, antRes] = await Promise.allSettled([
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`),
    fetch(`https://api.datamuse.com/words?ml=${encodeURIComponent(word)}&max=15`),
    fetch(`https://api.datamuse.com/words?rel_syn=${encodeURIComponent(word)}&max=15`),
    fetch(`https://api.datamuse.com/words?rel_ant=${encodeURIComponent(word)}&max=15`),
  ]);

  let rawDictionary: any[] = [];
  let mlWords: { word: string; score: number }[] = [];
  let synWords: { word: string }[] = [];
  let antWords: { word: string }[] = [];

  if (dictRes.status === "fulfilled" && dictRes.value.ok) {
    try { rawDictionary = await dictRes.value.json(); } catch (e) { console.warn("[enrich] dict parse error:", e); }
  }
  if (mlRes.status === "fulfilled" && mlRes.value.ok) {
    try { mlWords = await mlRes.value.json(); } catch (e) { console.warn("[enrich] ml parse error:", e); }
  }
  if (synRes.status === "fulfilled" && synRes.value.ok) {
    try { synWords = await synRes.value.json(); } catch (e) { console.warn("[enrich] syn parse error:", e); }
  }
  if (antRes.status === "fulfilled" && antRes.value.ok) {
    try { antWords = await antRes.value.json(); } catch (e) { console.warn("[enrich] ant parse error:", e); }
  }

  const allRawDefs: string[] = [];
  let firstExample = "";
  let firstPos = "";
  if (Array.isArray(rawDictionary) && rawDictionary[0]?.meanings?.length) {
    for (const m of rawDictionary[0].meanings) {
      if (!firstPos) firstPos = m.partOfSpeech || "";
      for (const d of m.definitions || []) {
        if (d.definition) allRawDefs.push(`(${m.partOfSpeech}) ${d.definition}`);
        if (!firstExample && d.example) firstExample = d.example;
      }
    }
  }

  const mlTopWords = mlWords.slice(0, 10).map(w => w.word);
  const synTopWords = synWords.slice(0, 12).map(w => w.word).filter(w => w !== word);
  const antTopWords = antWords.slice(0, 10).map(w => w.word).filter(w => w !== word);

  const prompt = `You are a vocabulary assistant. Given data about the English word "${word}", return a JSON object with the most useful, common-usage information.

RAW DICTIONARY DEFINITIONS (all meanings):
${allRawDefs.slice(0, 12).join('\n') || 'None found'}

DATAMUSE "MEANS LIKE" ASSOCIATIONS (ranked by usage frequency, most common first):
${mlTopWords.join(', ') || 'None found'}

DATAMUSE SYNONYMS: ${synTopWords.join(', ') || 'None found'}
DATAMUSE ANTONYMS: ${antTopWords.join(', ') || 'None found'}
EXAMPLE SENTENCE FROM DICTIONARY: ${firstExample || 'None found'}

Instructions:
1. Use the "means like" associations to identify which raw definitions match the MOST COMMON real-world usage of "${word}". Prioritize those definitions.
2. Return 2-3 definitions maximum, ordered most-common-first. Keep each definition concise (1 sentence). Include the part of speech label like "(noun)" or "(verb)".
3. Return 6-10 synonyms that are most relevant to the common meaning. If Datamuse synonyms are insufficient, add more from your knowledge.
4. Return 4-8 antonyms. If Datamuse antonyms are empty, generate them from your knowledge based on the common meaning.
5. Return the most common part of speech (noun/verb/adjective/etc, no parentheses).
6. Return a natural example sentence if one was provided, otherwise create one showing the most common usage.

Return ONLY valid JSON (no markdown, no explanation):
{
  "definitions": ["(noun) ...", "(verb) ..."],
  "synonyms": ["word1", "word2", ...],
  "antonyms": ["word1", "word2", ...],
  "partOfSpeech": "noun",
  "example": "..."
}`;

  let client: OpenAI;
  try {
    client = new OpenAI({
      apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
      baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
    });
  } catch (initErr) {
    console.error("[enrich] OpenAI client init failed, using dictionary fallback:", initErr);
    return buildFallback(rawDictionary, synTopWords, antTopWords, firstPos, firstExample);
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-5-mini",
      messages: [{ role: "user", content: prompt }],
      max_completion_tokens: 4000,
    });

    const msg = completion.choices[0]?.message;
    const finish = completion.choices[0]?.finish_reason;
    console.log("[OpenAI] finish_reason:", finish, "content length:", (msg?.content || "").length);
    const content = (msg?.content || "").trim();
    if (!content) throw new Error(`Empty response from OpenAI (finish: ${finish})`);
    const jsonStr = content.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim();
    const parsed = AiResponseSchema.parse(JSON.parse(jsonStr));

    return {
      definitions: parsed.definitions.slice(0, 4),
      synonyms: parsed.synonyms.slice(0, 10),
      antonyms: parsed.antonyms.slice(0, 8),
      partOfSpeech: parsed.partOfSpeech || firstPos,
      example: parsed.example || firstExample,
      source: "ai",
    };
  } catch (err) {
    console.error("[enrich] OpenAI call failed, using dictionary fallback:", err);
    return buildFallback(rawDictionary, synTopWords, antTopWords, firstPos, firstExample);
  }
}
