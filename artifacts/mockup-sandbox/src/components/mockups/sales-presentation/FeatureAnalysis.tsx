import './_group.css';
import { useState } from 'react';

/* ── Icons ─────────────────────────────────────────────────────── */
const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
);
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
);
const Check = ({ size = 14, color = 'white' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
);

/* ── S01: Cover ─────────────────────────────────────────────────── */
function S01() {
  return (
    <div className="slide-root flex flex-col" style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 60%, #0F3460 100%)' }}>
      <div className="h-1.5 bg-brand w-full" />
      <div className="flex-1 flex flex-col items-center justify-center" style={{ padding: '6vh 8vw', textAlign: 'center' }}>
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-brand rounded-xl flex items-center justify-center" style={{ width: 44, height: 44 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ width: 22, height: 22 }}>
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="text-left">
            <div className="text-brand font-bold" style={{ fontSize: '1vw' }}>ACE-Apps</div>
            <div className="text-white/40 font-medium" style={{ fontSize: '0.8vw' }}>Vocabulary Builder</div>
          </div>
        </div>
        <h1 className="text-white font-black leading-tight" style={{ fontSize: '4.2vw', maxWidth: '70vw' }}>
          Vocabulary Builder<br />
          <span className="text-brand">Full Feature Analysis</span>
        </h1>
        <p className="text-white/50 font-light italic mt-4" style={{ fontSize: '1.4vw' }}>
          A technical &amp; competitive deep-dive
        </p>
        <div className="flex gap-4 mt-8 flex-wrap justify-center">
          {['Science-Backed', 'B2B-Ready', 'Vietnam-Focused'].map(tag => (
            <span key={tag} className="border border-brand/50 text-brand font-semibold px-4 py-1.5 rounded-full" style={{ fontSize: '0.85vw' }}>{tag}</span>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-3 gap-6" style={{ width: '60vw' }}>
          {[
            { num: '14', label: 'Feature slides' },
            { num: '5', label: 'Competitors analysed' },
            { num: '12', label: 'Feature categories' },
          ].map(({ num, label }) => (
            <div key={num} className="rounded-xl" style={{ background: 'rgba(255,255,255,0.05)', padding: '2vh 2vw', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="text-accent font-black" style={{ fontSize: '2.8vw' }}>{num}</div>
              <div className="text-white/50 text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-white/10" style={{ padding: '1.5vh 5vw' }}>
        <span className="text-white/30 text-xs">ace.apps.44@gmail.com</span>
        <span className="text-white/30 text-xs">Confidential — For Presentation Only</span>
      </div>
    </div>
  );
}

/* ── S02: SM-2 Algorithm ────────────────────────────────────────── */
function S02() {
  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
      <div className="bg-navy flex items-center justify-between" style={{ padding: '2.5vh 5vw' }}>
        <div>
          <div className="text-brand font-semibold uppercase tracking-wider" style={{ fontSize: '0.8vw' }}>Feature 01 — Learning Engine</div>
          <h2 className="text-white font-black" style={{ fontSize: '2.8vw' }}>The SM-2 Spaced Repetition Engine</h2>
        </div>
        <div className="text-white/15 font-black" style={{ fontSize: '5vw' }}>02</div>
      </div>
      <div className="flex-1 flex flex-col justify-center" style={{ padding: '3vh 5vw' }}>
        <div className="grid grid-cols-3 gap-6 mb-6">
          {[
            { title: 'Ease Factor', value: '2.5', sub: 'Starting value', desc: 'Multiplier applied to the review interval after each successful recall. Increases with strong recall, decreases with poor recall. Range: 1.3 – 2.5+.' },
            { title: 'Review Interval', value: 'Days', sub: 'Until next review', desc: 'The number of days before a word is shown again. Starts at 1 day, grows exponentially — 1 → 3 → 7 → 14 → 30 → 60+ days.' },
            { title: 'Review Count', value: 'N+', sub: 'Per word', desc: 'Number of times a word has been reviewed. Used alongside accuracy to determine mastery level promotion (Learning → Reviewing → Mastered).' },
          ].map(({ title, value, sub, desc }) => (
            <div key={title} className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col" style={{ padding: '3vh 2.5vw' }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-navy font-black" style={{ fontSize: '1.3vw' }}>{title}</div>
                  <div className="text-muted text-xs mt-0.5">{sub}</div>
                </div>
                <div className="text-brand font-black" style={{ fontSize: '2.5vw' }}>{value}</div>
              </div>
              <div className="flex-1 bg-gray-50 rounded-xl" style={{ padding: '1.5vh 1.5vw' }}>
                <p className="text-gray-600" style={{ fontSize: '0.9vw', lineHeight: 1.6 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-navy rounded-2xl" style={{ padding: '2.5vh 3vw' }}>
          <p className="text-white font-semibold text-center" style={{ fontSize: '1.15vw' }}>
            Poor recall <span className="text-brand">resets the interval</span>; strong recall <span className="text-accent">extends it exponentially</span> — optimizing long-term retention while minimizing study time.
          </p>
        </div>
        <div className="grid grid-cols-5 gap-3 mt-5">
          {['Day 1', 'Day 3', 'Day 7', 'Day 14', 'Day 30+'].map((d, i) => {
            const colors = ['#F05A28', '#F05A28', '#5B6CF0', '#5B6CF0', '#10B981'];
            return (
              <div key={d} className="rounded-xl text-center" style={{ background: colors[i] + '18', border: `1px solid ${colors[i]}40`, padding: '1.2vh 0' }}>
                <div className="font-black" style={{ color: colors[i], fontSize: '1vw' }}>{d}</div>
                <div className="text-gray-500 text-xs mt-0.5">Review {i + 1}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── S03: Mastery Levels + Flashcard Mode ───────────────────────── */
function S03() {
  const levels = [
    { name: 'Learning', color: '#6B7280', bg: '#6B728018', req: 'Default state — every new word starts here.' },
    { name: 'Reviewing', color: '#F05A28', bg: '#F05A2818', req: '3+ reviews · ≥70% accuracy' },
    { name: 'Mastered', color: '#10B981', bg: '#10B98118', req: '10+ reviews · ≥90% accuracy · ≥30-day interval' },
  ];
  const flashFeatures = [
    'Front / back card review with manual flip',
    'Audio pronunciation from Dictionary API',
    'Example sentence on the back of the card',
    'SM-2 score recorded on every card flip',
    'Dedicated review queue for due words',
    'Mastery level updates after each session',
  ];
  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
      <div className="bg-brand flex items-center justify-between" style={{ padding: '2.5vh 5vw' }}>
        <div>
          <div className="text-white/70 font-semibold uppercase tracking-wider" style={{ fontSize: '0.8vw' }}>Feature 02</div>
          <h2 className="text-white font-black" style={{ fontSize: '2.8vw' }}>Three Mastery Levels &amp; Flashcard Mode</h2>
        </div>
        <div className="text-white/15 font-black" style={{ fontSize: '5vw' }}>03</div>
      </div>
      <div className="flex-1 flex gap-6" style={{ padding: '3vh 5vw' }}>
        <div className="flex flex-col justify-center gap-4" style={{ width: '46vw' }}>
          <div className="text-navy font-bold mb-1" style={{ fontSize: '1.1vw' }}>Mastery Level Progression</div>
          {levels.map(({ name, color, bg, req }) => (
            <div key={name} className="bg-white rounded-xl border border-gray-100 shadow-sm flex items-center gap-4" style={{ padding: '2vh 2.5vw' }}>
              <div className="rounded-full flex items-center justify-center flex-shrink-0" style={{ background: bg, border: `2px solid ${color}`, width: 44, height: 44 }}>
                <div className="rounded-full" style={{ background: color, width: 16, height: 16 }} />
              </div>
              <div className="flex-1">
                <div className="font-black" style={{ color, fontSize: '1.2vw' }}>{name}</div>
                <div className="text-muted" style={{ fontSize: '0.85vw', marginTop: 2 }}>{req}</div>
              </div>
              <div className="rounded-lg text-white text-xs font-semibold px-3 py-1" style={{ background: color }}>
                {name === 'Learning' ? 'Start' : name === 'Reviewing' ? 'Progressing' : 'Complete'}
              </div>
            </div>
          ))}
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="rounded-2xl text-white flex flex-col" style={{ background: 'linear-gradient(135deg, #16213E 0%, #1A1A2E 100%)', padding: '3vh 2.5vw', height: '100%' }}>
            <div className="text-brand font-bold uppercase tracking-wider mb-4" style={{ fontSize: '0.8vw' }}>Flashcard Mode</div>
            <div className="bg-white/8 rounded-xl mb-4" style={{ padding: '2.5vh 2vw', background: 'rgba(255,255,255,0.07)' }}>
              <div className="text-white/50 text-xs uppercase tracking-wider mb-2">Front of card</div>
              <div className="text-accent font-black" style={{ fontSize: '2vw' }}>procurement</div>
              <div className="text-white/50 text-xs mt-1">noun · /prəˈkjʊərmənt/</div>
            </div>
            <div className="bg-white/5 rounded-xl mb-5" style={{ padding: '2.5vh 2vw', background: 'rgba(255,255,255,0.04)' }}>
              <div className="text-white/50 text-xs uppercase tracking-wider mb-2">Back of card (after flip)</div>
              <div className="text-white font-medium" style={{ fontSize: '0.9vw' }}>The process of obtaining goods or services for a business.</div>
              <div className="text-white/40 text-xs italic mt-2">"The procurement team reduced costs by 30%."</div>
            </div>
            <div className="space-y-2">
              {flashFeatures.map(f => (
                <div key={f} className="flex items-center gap-2">
                  <div className="rounded-full bg-brand flex-shrink-0 flex items-center justify-center" style={{ width: 18, height: 18 }}>
                    <Check size={10} />
                  </div>
                  <span className="text-white/70" style={{ fontSize: '0.85vw' }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── S04: Quiz Mode + Daily Streak ─────────────────────────────── */
function S04() {
  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
      <div className="bg-navy flex items-center justify-between" style={{ padding: '2.5vh 5vw' }}>
        <div>
          <div className="text-brand font-semibold uppercase tracking-wider" style={{ fontSize: '0.8vw' }}>Feature 03</div>
          <h2 className="text-white font-black" style={{ fontSize: '2.8vw' }}>Quiz Mode &amp; Daily Streak</h2>
        </div>
        <div className="text-white/15 font-black" style={{ fontSize: '5vw' }}>04</div>
      </div>
      <div className="flex-1 flex gap-6" style={{ padding: '3vh 5vw' }}>
        {/* Quiz Mode */}
        <div className="flex flex-col" style={{ width: '46vw' }}>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1" style={{ padding: '3vh 3vw' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-brand rounded-xl flex items-center justify-center" style={{ width: 40, height: 40 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ width: 20, height: 20 }}>
                  <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <div>
                <div className="text-navy font-black" style={{ fontSize: '1.3vw' }}>Quiz Mode</div>
                <div className="text-muted text-xs">Multiple-choice knowledge testing</div>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Format', val: 'Multiple choice — 4 options per question' },
                { label: 'Session size', val: 'Up to 10 words per quiz session' },
                { label: 'Question type', val: 'Definition shown → pick the correct word' },
                { label: 'Scoring', val: 'Score + percentage displayed at end' },
                { label: 'SM-2 impact', val: 'Quiz results feed back into the spaced repetition engine' },
                { label: 'Distractor pool', val: 'Wrong options drawn from your own word list' },
              ].map(({ label, val }) => (
                <div key={label} className="flex items-start gap-3 rounded-xl bg-gray-50" style={{ padding: '1.2vh 1.5vw' }}>
                  <div className="text-brand font-bold flex-shrink-0" style={{ fontSize: '0.85vw', minWidth: '7vw' }}>{label}</div>
                  <div className="text-gray-600" style={{ fontSize: '0.85vw' }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Daily Streak */}
        <div className="flex-1 flex flex-col">
          <div className="rounded-2xl flex-1 flex flex-col" style={{ background: 'linear-gradient(135deg, #0F3460 0%, #16213E 100%)', padding: '3vh 3vw' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-accent rounded-xl flex items-center justify-center" style={{ width: 40, height: 40 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="2.5" style={{ width: 20, height: 20 }}>
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </div>
              <div>
                <div className="text-white font-black" style={{ fontSize: '1.3vw' }}>Daily Streak</div>
                <div className="text-white/50 text-xs">Consistency measurement &amp; motivation</div>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1.5 mb-5">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="text-white/40 text-xs">{d}</div>
                  <div className="rounded" style={{ width: '100%', height: 28, background: i < 5 ? '#FFC107' : 'rgba(255,255,255,0.08)' }} />
                </div>
              ))}
            </div>
            <div className="bg-accent/10 rounded-xl mb-4" style={{ padding: '1.5vh 1.5vw', border: '1px solid rgba(255,193,7,0.3)' }}>
              <div className="text-accent font-black" style={{ fontSize: '2.5vw' }}>5</div>
              <div className="text-white/70 text-xs">Day streak — keep it going!</div>
            </div>
            <div className="space-y-2.5">
              {[
                'Increments on consecutive practice days',
                'Resets if a day is missed',
                'Tracked independently per user account',
                'A proven motivational mechanic for habit-building',
              ].map(f => (
                <div key={f} className="flex items-center gap-2">
                  <div className="rounded-full bg-accent/20 flex-shrink-0 flex items-center justify-center" style={{ width: 18, height: 18 }}>
                    <Check size={10} color="#FFC107" />
                  </div>
                  <span className="text-white/70" style={{ fontSize: '0.85vw' }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── S05: Word & Content Management ────────────────────────────── */
function S05() {
  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
      <div className="bg-brand flex items-center justify-between" style={{ padding: '2.5vh 5vw' }}>
        <div>
          <div className="text-white/70 font-semibold uppercase tracking-wider" style={{ fontSize: '0.8vw' }}>Feature 04</div>
          <h2 className="text-white font-black" style={{ fontSize: '2.8vw' }}>Word &amp; Content Management</h2>
        </div>
        <div className="text-white/15 font-black" style={{ fontSize: '5vw' }}>05</div>
      </div>
      <div className="flex-1 flex gap-6" style={{ padding: '3vh 5vw' }}>
        {/* Manual Entry */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100" style={{ padding: '3vh 3vw' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-xl bg-navy flex items-center justify-center" style={{ width: 40, height: 40 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ width: 20, height: 20 }}>
                <path d="M12 5v14M5 12h14"/>
              </svg>
            </div>
            <div className="text-navy font-black" style={{ fontSize: '1.2vw' }}>Manual Word Entry</div>
          </div>
          <div className="space-y-3">
            {[
              { field: 'Word', note: 'The target vocabulary word' },
              { field: 'Definition', note: 'Auto-fetched or manually entered' },
              { field: 'Example sentence', note: 'From dictionary API or your own' },
              { field: 'Custom tags', note: 'e.g. "finance", "Q3-review", "medical"' },
            ].map(({ field, note }) => (
              <div key={field} className="rounded-xl bg-gray-50 flex items-center justify-between" style={{ padding: '1.5vh 1.5vw' }}>
                <div>
                  <div className="text-navy font-bold" style={{ fontSize: '0.95vw' }}>{field}</div>
                  <div className="text-muted" style={{ fontSize: '0.8vw' }}>{note}</div>
                </div>
                <div className="rounded-lg bg-brand/10 text-brand text-xs font-semibold px-2 py-0.5">Required / Optional</div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl bg-brand/8 border border-brand/20" style={{ padding: '1.5vh 1.5vw', background: 'rgba(240,90,40,0.06)' }}>
            <div className="text-brand font-semibold" style={{ fontSize: '0.85vw' }}>All words are editable and deletable at any time.</div>
          </div>
        </div>
        {/* Search & Filter */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100" style={{ padding: '3vh 3vw' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-xl bg-navy flex items-center justify-center" style={{ width: 40, height: 40 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ width: 20, height: 20 }}>
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
            </div>
            <div className="text-navy font-black" style={{ fontSize: '1.2vw' }}>Search, Filter &amp; Tag System</div>
          </div>
          <div className="space-y-3">
            {[
              { cap: 'Live search', detail: 'Searches across word text and definition in real time — no submit required.' },
              { cap: 'Filter by mastery', detail: 'Show only Learning, Reviewing, or Mastered words.' },
              { cap: 'Filter by tag', detail: 'Narrow to a specific topic, project, or import batch.' },
              { cap: 'Custom tags per word', detail: 'Attach one or more tags to any word at any time.' },
              { cap: 'Batch tag on import', detail: 'Apply a single tag to the entire CSV import batch.' },
            ].map(({ cap, detail }) => (
              <div key={cap} className="flex items-start gap-3 rounded-xl bg-gray-50" style={{ padding: '1.2vh 1.5vw' }}>
                <div className="rounded-full bg-navy flex-shrink-0 flex items-center justify-center mt-0.5" style={{ width: 18, height: 18 }}>
                  <Check size={10} />
                </div>
                <div>
                  <div className="text-navy font-bold" style={{ fontSize: '0.9vw' }}>{cap}</div>
                  <div className="text-muted" style={{ fontSize: '0.8vw' }}>{detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── S06: Automatic Dictionary Lookup ──────────────────────────── */
function S06() {
  return (
    <div className="slide-root bg-navy flex flex-col">
      <div className="bg-brand flex items-center justify-between" style={{ padding: '2.5vh 5vw' }}>
        <div>
          <div className="text-white/70 font-semibold uppercase tracking-wider" style={{ fontSize: '0.8vw' }}>Feature 05 — Auto-Population</div>
          <h2 className="text-white font-black" style={{ fontSize: '2.8vw' }}>Automatic Dictionary Lookup</h2>
        </div>
        <div className="text-white/15 font-black" style={{ fontSize: '5vw' }}>06</div>
      </div>
      <div className="flex-1 flex gap-6 items-center" style={{ padding: '3vh 5vw' }}>
        {/* Main card */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              { source: 'Free Dictionary API', items: ['Word definition', 'Phonetic pronunciation (IPA)', 'Audio pronunciation file', 'Example sentences'] },
              { source: 'Datamuse API', items: ['Synonyms for the word', 'Antonyms for the word', 'Related word associations', 'Optional: triggered on demand'] },
            ].map(({ source, items }) => (
              <div key={source} className="rounded-2xl bg-white/8" style={{ padding: '2.5vh 2.5vw', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="text-brand font-bold mb-3" style={{ fontSize: '0.85vw' }}>{source}</div>
                <div className="space-y-2">
                  {items.map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="rounded-full bg-accent/20 flex-shrink-0 flex items-center justify-center" style={{ width: 18, height: 18 }}>
                        <Check size={10} color="#FFC107" />
                      </div>
                      <span className="text-white/70" style={{ fontSize: '0.85vw' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl bg-brand/10" style={{ padding: '2vh 2.5vw', border: '1px solid rgba(240,90,40,0.3)' }}>
            <div className="text-brand font-bold mb-1" style={{ fontSize: '0.9vw' }}>Zero friction word capture</div>
            <p className="text-white/60" style={{ fontSize: '0.85vw' }}>
              Type a word → definitions, examples, audio, synonyms, and antonyms populate automatically. Users can also manually trigger the Word Lookup view to explore any word in detail before adding it.
            </p>
          </div>
        </div>
        {/* Mock word card */}
        <div style={{ width: '32vw' }}>
          <div className="rounded-2xl" style={{ background: 'linear-gradient(135deg, #5B6CF0 0%, #9B5CF6 100%)', padding: '3vh 3vw' }}>
            <div className="text-white/50 text-xs uppercase tracking-wider mb-3">Auto-populated word card</div>
            <div className="text-accent font-black" style={{ fontSize: '2.2vw' }}>catalyst</div>
            <div className="text-white/60 text-xs mb-4">noun · /ˈkætəlɪst/</div>
            <div className="bg-white/10 rounded-xl mb-3" style={{ padding: '1.5vh 1.5vw' }}>
              <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Definition</div>
              <div className="text-white" style={{ fontSize: '0.9vw' }}>A person or thing that precipitates an event or change.</div>
            </div>
            <div className="bg-white/10 rounded-xl mb-3" style={{ padding: '1.5vh 1.5vw' }}>
              <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Example</div>
              <div className="text-white/80 italic" style={{ fontSize: '0.85vw' }}>"The new manager was the catalyst for the team's transformation."</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/10 rounded-xl" style={{ padding: '1vh 1.2vw' }}>
                <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Synonyms</div>
                <div className="text-accent text-xs">stimulus · trigger · impetus</div>
              </div>
              <div className="bg-white/10 rounded-xl" style={{ padding: '1vh 1.2vw' }}>
                <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Audio</div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-brand flex items-center justify-center" style={{ width: 24, height: 24 }}>
                    <svg viewBox="0 0 24 24" fill="white" style={{ width: 12, height: 12 }}><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </div>
                  <span className="text-white/60 text-xs">Play pronunciation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── S07: CSV Bulk Import ───────────────────────────────────────── */
function S07() {
  const bullets = [
    { title: 'Auto-detect header row', detail: 'Intelligently detects whether the first row is a header and skips it automatically.' },
    { title: 'Recognizes field variations', detail: 'Accepts "word", "term", "vocab", "definition", "meaning" — flexible column naming.' },
    { title: 'Skips duplicate words', detail: 'If a word already exists in the user\'s library, it is silently skipped — no duplicates created.' },
    { title: 'Skips invalid rows', detail: 'Rows missing a word or definition are excluded and reported to the user after import.' },
    { title: 'Preview before commit', detail: 'Users see a full preview of parsed words with counts before confirming the import.' },
    { title: 'Apply a tag to the entire batch', detail: 'One tag can be applied to all words in a single import — enabling instant category organization.' },
  ];
  return (
    <div className="slide-root flex flex-col" style={{ background: 'linear-gradient(160deg, #1A1A2E 0%, #16213E 100%)' }}>
      <div className="bg-brand flex items-center justify-between" style={{ padding: '2.5vh 5vw' }}>
        <div>
          <div className="text-white/80 font-semibold uppercase tracking-wider" style={{ fontSize: '0.8vw' }}>Key B2B Feature — Feature 06</div>
          <h2 className="text-white font-black" style={{ fontSize: '2.8vw' }}>CSV Bulk Import — The Enterprise Accelerator</h2>
        </div>
        <div className="text-white/15 font-black" style={{ fontSize: '5vw' }}>07</div>
      </div>
      <div className="flex-1 flex gap-6" style={{ padding: '3vh 5vw' }}>
        <div className="flex-1 grid grid-cols-2 gap-4">
          {bullets.map(({ title, detail }, i) => (
            <div key={title} className="rounded-2xl flex items-start gap-4" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(240,90,40,0.25)', padding: '2.5vh 2.5vw' }}>
              <div className="rounded-xl bg-brand flex-shrink-0 flex items-center justify-center font-black text-white" style={{ width: 36, height: 36, fontSize: '0.9vw' }}>
                {i + 1}
              </div>
              <div>
                <div className="text-white font-black" style={{ fontSize: '1vw' }}>{title}</div>
                <div className="text-white/55 mt-1" style={{ fontSize: '0.82vw', lineHeight: 1.55 }}>{detail}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-between" style={{ width: '26vw' }}>
          <div className="rounded-2xl flex-1" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '2.5vh 2.5vw' }}>
            <div className="text-white/50 text-xs uppercase tracking-wider mb-3">Sample CSV format</div>
            <div className="rounded-xl font-mono text-xs" style={{ background: 'rgba(0,0,0,0.4)', padding: '1.5vh 1.5vw', color: '#FFC107', lineHeight: 1.8 }}>
              word,definition<br/>
              catalyst,A person or thing<br/>
              &nbsp;&nbsp;that precipitates change<br/>
              procurement,The process of<br/>
              &nbsp;&nbsp;obtaining goods<br/>
              synergy,Combined effort greater<br/>
              &nbsp;&nbsp;than the sum of parts
            </div>
            <div className="mt-4 rounded-xl bg-accent/10 border border-accent/30" style={{ padding: '1.5vh 1.5vw' }}>
              <div className="text-accent font-bold mb-1" style={{ fontSize: '0.85vw' }}>This is the key feature for businesses</div>
              <div className="text-white/60" style={{ fontSize: '0.8vw' }}>loading industry-specific word lists at scale — no manual entry required.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── S08: Data & Sync ───────────────────────────────────────────── */
function S08() {
  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
      <div className="bg-navy flex items-center justify-between" style={{ padding: '2.5vh 5vw' }}>
        <div>
          <div className="text-brand font-semibold uppercase tracking-wider" style={{ fontSize: '0.8vw' }}>Feature 07 — Infrastructure</div>
          <h2 className="text-white font-black" style={{ fontSize: '2.8vw' }}>Data Storage &amp; Cross-Device Sync</h2>
        </div>
        <div className="text-white/15 font-black" style={{ fontSize: '5vw' }}>08</div>
      </div>
      <div className="flex-1 flex gap-6" style={{ padding: '3vh 5vw' }}>
        {/* Firebase */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100" style={{ padding: '3vh 3vw' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-xl flex items-center justify-center" style={{ background: '#FF6D00', width: 44, height: 44 }}>
              <svg viewBox="0 0 24 24" fill="white" style={{ width: 22, height: 22 }}>
                <path d="M3.89 15.673L6.255.461A.542.542 0 017.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 00-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 001.588 0zM14.3 7.148l-1.82-3.482a.542.542 0 00-.96 0L3.53 17.984z"/>
              </svg>
            </div>
            <div>
              <div className="text-navy font-black" style={{ fontSize: '1.2vw' }}>Firebase Firestore</div>
              <div className="text-muted text-xs">Cloud vocabulary storage</div>
            </div>
          </div>
          <div className="space-y-3 mb-4">
            {[
              { cap: 'Real-time NoSQL database', detail: 'Writes sync instantly across all devices without polling.' },
              { cap: 'Synced across every device', detail: 'Phone, tablet, laptop — one account, one library.' },
              { cap: 'No manual backup needed', detail: 'Firebase handles redundancy and durability automatically.' },
              { cap: 'Data persists across reinstalls', detail: 'Log back in to restore all words, tags, and mastery levels.' },
              { cap: 'Per-UID security rules', detail: 'Each user can only read and write their own data.' },
            ].map(({ cap, detail }) => (
              <div key={cap} className="flex items-start gap-3 rounded-xl bg-gray-50" style={{ padding: '1.2vh 1.5vw' }}>
                <div className="rounded-full flex-shrink-0 flex items-center justify-center mt-0.5" style={{ background: '#FF6D00', width: 18, height: 18 }}>
                  <Check size={10} />
                </div>
                <div>
                  <div className="text-navy font-bold" style={{ fontSize: '0.9vw' }}>{cap}</div>
                  <div className="text-muted" style={{ fontSize: '0.8vw' }}>{detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* PostgreSQL */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100" style={{ padding: '3vh 3vw' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-xl flex items-center justify-center bg-navy" style={{ width: 44, height: 44 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ width: 22, height: 22 }}>
                <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
              </svg>
            </div>
            <div>
              <div className="text-navy font-black" style={{ fontSize: '1.2vw' }}>PostgreSQL Subscriber Registry</div>
              <div className="text-muted text-xs">Server-side B2B administration database</div>
            </div>
          </div>
          <div className="space-y-3 mb-4">
            {[
              { cap: 'Subscription status tracking', detail: 'Active, trial, expired, admin-granted — stored server-side.' },
              { cap: 'Trial start and end dates', detail: 'Precise timestamps for 7-day trial enforcement.' },
              { cap: 'Admin manual activation', detail: 'Admins can grant or extend access directly from the dashboard.' },
              { cap: 'Payment event records', detail: 'Paddle webhook events stored and linked to user accounts.' },
              { cap: 'Survives server restarts', detail: 'Unlike file-backed storage used by competitors, data persists across redeployments.' },
            ].map(({ cap, detail }) => (
              <div key={cap} className="flex items-start gap-3 rounded-xl bg-gray-50" style={{ padding: '1.2vh 1.5vw' }}>
                <div className="rounded-full bg-brand flex-shrink-0 flex items-center justify-center mt-0.5" style={{ width: 18, height: 18 }}>
                  <Check size={10} />
                </div>
                <div>
                  <div className="text-navy font-bold" style={{ fontSize: '0.9vw' }}>{cap}</div>
                  <div className="text-muted" style={{ fontSize: '0.8vw' }}>{detail}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-xl bg-brand/8 border border-brand/20" style={{ padding: '1.5vh 1.5vw', background: 'rgba(240,90,40,0.06)' }}>
            <div className="text-brand font-bold" style={{ fontSize: '0.85vw' }}>Admin dashboard at /admin accesses this registry directly.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── S09: Authentication + Security ────────────────────────────── */
function S09() {
  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
      <div className="bg-brand flex items-center justify-between" style={{ padding: '2.5vh 5vw' }}>
        <div>
          <div className="text-white/70 font-semibold uppercase tracking-wider" style={{ fontSize: '0.8vw' }}>Feature 08 — Platform Security</div>
          <h2 className="text-white font-black" style={{ fontSize: '2.8vw' }}>Authentication &amp; Security Architecture</h2>
        </div>
        <div className="text-white/15 font-black" style={{ fontSize: '5vw' }}>09</div>
      </div>
      <div className="flex-1 flex gap-6" style={{ padding: '3vh 5vw' }}>
        {/* Auth */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100" style={{ padding: '3vh 3vw' }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="rounded-xl bg-navy flex items-center justify-center" style={{ width: 40, height: 40 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ width: 20, height: 20 }}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div className="text-navy font-black" style={{ fontSize: '1.2vw' }}>Authentication (Firebase Auth v11)</div>
          </div>
          <div className="space-y-3">
            {[
              { cap: 'Email + Password signup/login', detail: 'Standard credentials stored securely in Firebase Auth.' },
              { cap: 'Password reset via email', detail: 'Firebase sends a reset link — no server-side handling needed.' },
              { cap: 'Anonymous sign-in for direct checkout', detail: 'Users can subscribe without creating an account first — auth happens behind the scenes.' },
              { cap: 'Session persistence across browser sessions', detail: 'Users remain logged in after closing and reopening the browser.' },
            ].map(({ cap, detail }) => (
              <div key={cap} className="flex items-start gap-3 rounded-xl bg-gray-50" style={{ padding: '1.5vh 1.5vw' }}>
                <div className="rounded-full bg-navy flex-shrink-0 flex items-center justify-center mt-0.5" style={{ width: 20, height: 20 }}>
                  <Check size={11} />
                </div>
                <div>
                  <div className="text-navy font-bold" style={{ fontSize: '0.9vw' }}>{cap}</div>
                  <div className="text-muted" style={{ fontSize: '0.8vw', marginTop: 2 }}>{detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Security */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100" style={{ padding: '3vh 3vw' }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="rounded-xl bg-brand flex items-center justify-center" style={{ width: 40, height: 40 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ width: 20, height: 20 }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div className="text-navy font-black" style={{ fontSize: '1.2vw' }}>Security Layers</div>
          </div>
          <div className="space-y-3">
            {[
              { cap: 'Helmet.js HTTP headers', detail: 'Prevents XSS, clickjacking, and other common web attacks via secure response headers.' },
              { cap: 'API rate limiting', detail: 'Express-rate-limit middleware blocks brute-force and abuse on all API endpoints.' },
              { cap: 'Paddle webhook signature verification', detail: 'Every payment event is cryptographically verified before processing.' },
              { cap: 'Firebase Security Rules per UID', detail: 'Firestore enforces row-level security — users cannot read or write other users\' data.' },
              { cap: 'Admin password as environment secret', detail: 'Admin credentials stored as a server environment variable — never in the codebase.' },
            ].map(({ cap, detail }) => (
              <div key={cap} className="flex items-start gap-3 rounded-xl bg-gray-50" style={{ padding: '1.5vh 1.5vw' }}>
                <div className="rounded-full bg-brand flex-shrink-0 flex items-center justify-center mt-0.5" style={{ width: 20, height: 20 }}>
                  <Check size={11} />
                </div>
                <div>
                  <div className="text-navy font-bold" style={{ fontSize: '0.9vw' }}>{cap}</div>
                  <div className="text-muted" style={{ fontSize: '0.8vw', marginTop: 2 }}>{detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── S10: Payments & Business Model ────────────────────────────── */
function S10() {
  return (
    <div className="slide-root flex flex-col" style={{ background: 'linear-gradient(160deg, #1A1A2E 0%, #16213E 100%)' }}>
      <div className="bg-brand flex items-center justify-between" style={{ padding: '2.5vh 5vw' }}>
        <div>
          <div className="text-white/70 font-semibold uppercase tracking-wider" style={{ fontSize: '0.8vw' }}>Feature 09 — Monetization</div>
          <h2 className="text-white font-black" style={{ fontSize: '2.8vw' }}>Payments &amp; Business Model</h2>
        </div>
        <div className="text-white/15 font-black" style={{ fontSize: '5vw' }}>10</div>
      </div>
      <div className="flex-1 flex gap-5" style={{ padding: '3vh 5vw' }}>
        {/* Pricing */}
        <div className="flex-1 rounded-2xl flex flex-col" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(240,90,40,0.4)', padding: '3vh 2.5vw' }}>
          <div className="text-brand font-bold uppercase tracking-wider mb-4" style={{ fontSize: '0.8vw' }}>Pricing Structure</div>
          <div className="text-center mb-4">
            <div className="text-accent font-black" style={{ fontSize: '3vw' }}>500,000 ₫</div>
            <div className="text-white/60 text-sm">per 6 months</div>
            <div className="text-white/40 text-xs mt-1">~$19 USD</div>
          </div>
          <div className="space-y-2.5">
            {[
              { label: 'Base price', val: '500,000 ₫' },
              { label: '+ 10% VAT', val: '50,000 ₫' },
              { label: 'Total charged', val: '550,000 ₫', highlight: true },
            ].map(({ label, val, highlight }) => (
              <div key={label} className="flex items-center justify-between rounded-lg" style={{ padding: '1.2vh 1.5vw', background: highlight ? 'rgba(240,90,40,0.15)' : 'rgba(255,255,255,0.05)', border: highlight ? '1px solid rgba(240,90,40,0.4)' : '1px solid transparent' }}>
                <span style={{ color: highlight ? '#F05A28' : 'rgba(255,255,255,0.6)', fontSize: '0.85vw', fontWeight: highlight ? 700 : 400 }}>{label}</span>
                <span style={{ color: highlight ? '#FFC107' : 'rgba(255,255,255,0.8)', fontSize: '0.9vw', fontWeight: 700 }}>{val}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            {['7-day free trial available', 'Direct subscription (skip trial)'].map(opt => (
              <div key={opt} className="flex items-center gap-2">
                <div className="rounded-full bg-accent/20 flex-shrink-0 flex items-center justify-center" style={{ width: 18, height: 18 }}>
                  <Check size={10} color="#FFC107" />
                </div>
                <span className="text-white/60" style={{ fontSize: '0.82vw' }}>{opt}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Paddle */}
        <div className="flex-1 rounded-2xl flex flex-col" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', padding: '3vh 2.5vw' }}>
          <div className="text-white/50 font-bold uppercase tracking-wider mb-4" style={{ fontSize: '0.8vw' }}>Paddle — Global Payments</div>
          <div className="mb-4">
            <div className="text-white font-black" style={{ fontSize: '1.2vw' }}>International card payments</div>
            <div className="text-white/40 text-xs mt-1">via Paddle Billing platform</div>
          </div>
          <div className="space-y-2.5 mb-4">
            {[
              'Credit & debit cards (Visa, Mastercard)',
              'Apple Pay & Google Pay',
              'PayPal',
              'Global tax compliance (VAT handled by Paddle)',
              'Recurring billing with automatic renewal',
              'Paddle webhook — real-time payment events',
            ].map(item => (
              <div key={item} className="flex items-center gap-2">
                <div className="rounded-full bg-brand flex-shrink-0 flex items-center justify-center" style={{ width: 18, height: 18 }}>
                  <Check size={10} />
                </div>
                <span className="text-white/65" style={{ fontSize: '0.82vw' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
        {/* VietQR */}
        <div className="flex-1 rounded-2xl flex flex-col" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,193,7,0.3)', padding: '3vh 2.5vw' }}>
          <div className="text-accent font-bold uppercase tracking-wider mb-4" style={{ fontSize: '0.8vw' }}>VietQR — Local Bank Transfer</div>
          <div className="mb-4">
            <div className="text-white font-black" style={{ fontSize: '1.2vw' }}>Techcombank QR payment</div>
            <div className="text-white/40 text-xs mt-1">For Vietnamese users preferring bank transfer</div>
          </div>
          <div className="space-y-2.5 mb-4">
            {[
              'User enters email in the paywall UI',
              'QR code revealed after email submission',
              'User transfers via any Vietnamese banking app',
              'Admin manually activates the account after payment',
              'No Paddle subscription required for this path',
            ].map(item => (
              <div key={item} className="flex items-center gap-2">
                <div className="rounded-full bg-accent/20 flex-shrink-0 flex items-center justify-center" style={{ width: 18, height: 18 }}>
                  <Check size={10} color="#FFC107" />
                </div>
                <span className="text-white/65" style={{ fontSize: '0.82vw' }}>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-auto rounded-xl bg-accent/10 border border-accent/30" style={{ padding: '1.2vh 1.5vw' }}>
            <div className="text-accent font-bold" style={{ fontSize: '0.82vw' }}>Unique to Vocabulary Builder — no competitor offers this payment path for Vietnam.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── S11: UI & User Experience ─────────────────────────────────── */
function S11() {
  const cards = [
    { title: 'Mobile-First Design', detail: 'Vertical navigation, touch-friendly tap targets, and a native app feel — all in the browser. Optimised for 375px screens and up.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ width: 20, height: 20 }}><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg> },
    { title: 'Dark Mode', detail: 'Full theme-aware toggle with a dark navy colour palette. Light mode also supported. User preference saved to localStorage.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ width: 20, height: 20 }}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg> },
    { title: 'Responsive Layout', detail: 'Scales cleanly from phone to tablet to desktop. The UI adapts its spacing, navigation, and card layout for each breakpoint.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ width: 20, height: 20 }}><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
    { title: 'No App Store Required', detail: 'Runs entirely in the browser — no iOS or Android download. Instant access from any device with a URL.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ width: 20, height: 20 }}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
    { title: 'Progressive Loading States', detail: 'Branded splash screen during auth check. Paywall state resolved before revealing the app. Subscription check with a 3-second safety timeout fallback.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ width: 20, height: 20 }}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  ];
  const colors = ['#F05A28', '#5B6CF0', '#9B5CF6', '#10B981', '#FFC107'];
  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
      <div className="bg-navy flex items-center justify-between" style={{ padding: '2.5vh 5vw' }}>
        <div>
          <div className="text-brand font-semibold uppercase tracking-wider" style={{ fontSize: '0.8vw' }}>Feature 10 — Interface</div>
          <h2 className="text-white font-black" style={{ fontSize: '2.8vw' }}>UI &amp; User Experience</h2>
        </div>
        <div className="text-white/15 font-black" style={{ fontSize: '5vw' }}>11</div>
      </div>
      <div className="flex-1 flex items-center" style={{ padding: '3vh 5vw' }}>
        <div className="grid grid-cols-5 gap-4 w-full h-full">
          {cards.map(({ title, detail, icon }, i) => (
            <div key={title} className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col" style={{ padding: '2.5vh 2vw' }}>
              <div className="rounded-xl flex items-center justify-center flex-shrink-0 mb-4" style={{ background: colors[i], width: 44, height: 44 }}>
                {icon}
              </div>
              <div className="text-navy font-black mb-2" style={{ fontSize: '1vw' }}>{title}</div>
              <div className="text-muted flex-1" style={{ fontSize: '0.82vw', lineHeight: 1.6 }}>{detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── S12: Competitive Comparison Table ─────────────────────────── */
type CellVal = 'yes' | 'partial' | 'no' | string;
function Cell({ val }: { val: CellVal }) {
  if (val === 'yes') return <span style={{ fontSize: '1.1vw' }}>✅</span>;
  if (val === 'partial') return <span style={{ fontSize: '1.1vw' }}>⚠️</span>;
  if (val === 'no') return <span style={{ fontSize: '1.1vw' }}>❌</span>;
  return <span style={{ fontSize: '0.75vw', color: '#374151', fontWeight: 600 }}>{val}</span>;
}

function S12() {
  const rows: { feature: string; vb: CellVal; anki: CellVal; quizlet: CellVal; duolingo: CellVal; memrise: CellVal }[] = [
    { feature: 'SM-2 Spaced Repetition', vb: 'yes', anki: 'yes', quizlet: 'partial', duolingo: 'partial', memrise: 'partial' },
    { feature: 'CSV Industry Word Import', vb: 'yes', anki: 'partial', quizlet: 'partial', duolingo: 'no', memrise: 'no' },
    { feature: 'Auto Dictionary + Audio', vb: 'yes', anki: 'partial', quizlet: 'partial', duolingo: 'yes', memrise: 'partial' },
    { feature: 'Synonyms / Antonyms', vb: 'yes', anki: 'no', quizlet: 'no', duolingo: 'no', memrise: 'no' },
    { feature: 'Cross-Device Cloud Sync', vb: 'yes', anki: 'partial', quizlet: 'yes', duolingo: 'yes', memrise: 'yes' },
    { feature: 'Works in Browser (no install)', vb: 'yes', anki: 'no', quizlet: 'yes', duolingo: 'yes', memrise: 'yes' },
    { feature: 'Dark Mode', vb: 'yes', anki: 'yes', quizlet: 'yes', duolingo: 'no', memrise: 'no' },
    { feature: 'Vietnamese Bank Payment', vb: 'yes', anki: 'no', quizlet: 'no', duolingo: 'no', memrise: 'no' },
    { feature: 'Admin Override / B2B Console', vb: 'yes', anki: 'no', quizlet: 'partial', duolingo: 'no', memrise: 'no' },
    { feature: 'Industry-Specific Focus', vb: 'yes', anki: 'partial', quizlet: 'partial', duolingo: 'no', memrise: 'no' },
    { feature: 'One-Time Bulk Team Setup', vb: 'yes', anki: 'partial', quizlet: 'no', duolingo: 'no', memrise: 'no' },
    { feature: 'Price (6 months)', vb: '~$19', anki: 'Free/$25/yr', quizlet: '$35.99/yr', duolingo: '$79.99/yr', memrise: '$59.99/yr' },
  ];
  const cols = [
    { key: 'vb', label: 'Vocabulary\nBuilder', highlight: true },
    { key: 'anki', label: 'Anki', highlight: false },
    { key: 'quizlet', label: 'Quizlet', highlight: false },
    { key: 'duolingo', label: 'Duolingo', highlight: false },
    { key: 'memrise', label: 'Memrise', highlight: false },
  ];
  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
      <div className="bg-navy flex items-center justify-between" style={{ padding: '2.5vh 5vw' }}>
        <div>
          <div className="text-brand font-semibold uppercase tracking-wider" style={{ fontSize: '0.8vw' }}>Feature 11 — Competitive Analysis</div>
          <h2 className="text-white font-black" style={{ fontSize: '2.8vw' }}>Competitive Comparison Table</h2>
        </div>
        <div className="text-white/15 font-black" style={{ fontSize: '5vw' }}>12</div>
      </div>
      <div className="flex-1 flex flex-col" style={{ padding: '2.5vh 5vw', overflow: 'hidden' }}>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex-1 flex flex-col">
          {/* Header row */}
          <div className="grid" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr', background: '#1A1A2E' }}>
            <div className="text-white/60 font-semibold" style={{ padding: '1.5vh 2vw', fontSize: '0.8vw' }}>Feature</div>
            {cols.map(({ key, label, highlight }) => (
              <div key={key} className="text-center font-black" style={{ padding: '1.5vh 0.5vw', fontSize: '0.8vw', background: highlight ? '#F05A28' : 'transparent', color: highlight ? 'white' : 'rgba(255,255,255,0.7)', whiteSpace: 'pre-line', lineHeight: 1.3 }}>
                {label}
              </div>
            ))}
          </div>
          {/* Data rows */}
          <div className="flex-1 flex flex-col">
            {rows.map((row, i) => (
              <div key={row.feature} className="grid flex-1" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr', background: i % 2 === 0 ? 'white' : '#F9FAFB', borderBottom: '1px solid #F3F4F6' }}>
                <div className="text-navy font-semibold flex items-center" style={{ padding: '0 2vw', fontSize: '0.82vw' }}>{row.feature}</div>
                {cols.map(({ key, highlight }) => (
                  <div key={key} className="flex items-center justify-center" style={{ background: highlight ? 'rgba(240,90,40,0.06)' : 'transparent' }}>
                    <Cell val={row[key as keyof typeof row]} />
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* Legend */}
          <div className="flex items-center gap-6 border-t border-gray-100" style={{ padding: '1.2vh 2vw' }}>
            {[{ sym: '✅', label: 'Full support' }, { sym: '⚠️', label: 'Partial' }, { sym: '❌', label: 'Not available' }].map(({ sym, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <span style={{ fontSize: '0.9vw' }}>{sym}</span>
                <span className="text-muted" style={{ fontSize: '0.75vw' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── S13: Competitive Arguments ─────────────────────────────────── */
function S13() {
  const args = [
    {
      vs: 'vs Anki',
      color: '#5B6CF0',
      heading: 'More accessible, equally powerful',
      points: [
        'Anki requires manual deck setup, plugin installation, and desktop syncing for full features.',
        'Vocabulary Builder runs in the browser — no install, no configuration, no separate sync tool.',
        'Our B2B CSV import and admin console have no equivalent in Anki.',
        'Anki has no Vietnamese payment option; VietQR is unique to this product.',
      ],
    },
    {
      vs: 'vs Quizlet',
      color: '#9B5CF6',
      heading: 'Better algorithm, lower price',
      points: [
        'Quizlet\'s spaced repetition is simplified and does not implement the full SM-2 algorithm.',
        'Quizlet charges $35.99/year vs 500,000 ₫/6 months (~$19 USD) here.',
        'No VietQR payment path and no admin override console in Quizlet.',
        'Quizlet\'s CSV import is basic; ours detects headers, skips duplicates, and previews before commit.',
      ],
    },
    {
      vs: 'vs Duolingo / Babbel',
      color: '#10B981',
      heading: 'Your words, not their curriculum',
      points: [
        'Duolingo and Babbel teach a fixed curriculum — you cannot add your own vocabulary.',
        'Neither supports CSV import, custom word lists, or industry-specific terminology.',
        'Duolingo is $79.99/year — 4× the cost of this product.',
        'No B2B admin console, no bulk team onboarding, no manual access activation.',
      ],
    },
    {
      vs: 'vs Generic Vietnam Apps',
      color: '#F05A28',
      heading: 'Enterprise-grade at consumer price',
      points: [
        'Most local alternatives use file-backed storage that is wiped on redeployment.',
        'No competitor offers both Paddle international billing AND VietQR local transfer.',
        'None provide an admin dashboard with subscriber management and trial extension.',
        'Auto-dictionary lookup with audio and synonyms is unique in the Vietnamese market at this price.',
      ],
    },
  ];
  return (
    <div className="slide-root flex flex-col" style={{ background: 'linear-gradient(160deg, #1A1A2E 0%, #0F3460 100%)' }}>
      <div className="bg-brand flex items-center justify-between" style={{ padding: '2.5vh 5vw' }}>
        <div>
          <div className="text-white/70 font-semibold uppercase tracking-wider" style={{ fontSize: '0.8vw' }}>Feature 12 — Positioning</div>
          <h2 className="text-white font-black" style={{ fontSize: '2.8vw' }}>The Core Competitive Arguments</h2>
        </div>
        <div className="text-white/15 font-black" style={{ fontSize: '5vw' }}>13</div>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-5" style={{ padding: '3vh 5vw' }}>
        {args.map(({ vs, color, heading, points }) => (
          <div key={vs} className="rounded-2xl flex flex-col" style={{ background: 'rgba(255,255,255,0.07)', border: `1px solid ${color}40`, padding: '2.5vh 2.5vw' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-lg font-black text-white flex items-center justify-center" style={{ background: color, padding: '0.4vh 1.2vw', fontSize: '0.82vw' }}>{vs}</div>
              <div className="text-white font-bold" style={{ fontSize: '1vw' }}>{heading}</div>
            </div>
            <div className="space-y-2">
              {points.map(p => (
                <div key={p} className="flex items-start gap-2">
                  <div className="rounded-full flex-shrink-0 flex items-center justify-center mt-0.5" style={{ background: color + '30', border: `1px solid ${color}60`, width: 18, height: 18 }}>
                    <Check size={9} color={color} />
                  </div>
                  <span className="text-white/65" style={{ fontSize: '0.82vw', lineHeight: 1.55 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── S14: Summary / Closing ─────────────────────────────────────── */
function S14() {
  const differentiators = [
    { title: 'True SM-2 Spaced Repetition', detail: 'Full algorithm implementation — ease factor, interval, review count — not a simplified version.', color: '#F05A28', icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ width: 20, height: 20 }}><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg> },
    { title: 'CSV Bulk Import', detail: 'The only vocabulary app in Vietnam with header detection, duplicate skipping, preview, and batch tagging.', color: '#5B6CF0', icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ width: 20, height: 20 }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> },
    { title: 'VietQR + Paddle Payments', detail: 'Techcombank bank transfer for local users. International card, Apple Pay, Google Pay, PayPal via Paddle.', color: '#FFC107', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="2" style={{ width: 20, height: 20 }}><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> },
    { title: 'Full Admin B2B Console', detail: 'Password-protected dashboard with subscriber registry, trial management, manual activation, and payment records.', color: '#10B981', icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ width: 20, height: 20 }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  ];
  return (
    <div className="slide-root flex flex-col" style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 60%, #0F3460 100%)' }}>
      <div className="h-1.5 bg-brand w-full" />
      <div className="flex-1 flex flex-col items-center justify-center" style={{ padding: '4vh 8vw' }}>
        <div className="text-brand font-semibold uppercase tracking-widest mb-4" style={{ fontSize: '0.85vw' }}>Summary</div>
        <h1 className="text-white font-black text-center leading-tight" style={{ fontSize: '4vw' }}>
          One App. Every Industry.<br />
          <span className="text-brand">Every Word.</span>
        </h1>
        <p className="text-white/40 text-center mt-3" style={{ fontSize: '1.1vw' }}>
          The four things no single competitor matches — all in one product.
        </p>
        <div className="grid grid-cols-4 gap-5 mt-8" style={{ width: '80vw' }}>
          {differentiators.map(({ title, detail, color, icon }) => (
            <div key={title} className="rounded-2xl flex flex-col" style={{ background: 'rgba(255,255,255,0.07)', border: `1px solid ${color}40`, padding: '2.5vh 2vw' }}>
              <div className="rounded-xl flex items-center justify-center mb-3 flex-shrink-0" style={{ background: color, width: 44, height: 44 }}>
                {icon}
              </div>
              <div className="text-white font-black mb-2" style={{ fontSize: '1vw' }}>{title}</div>
              <div className="text-white/50 flex-1" style={{ fontSize: '0.8vw', lineHeight: 1.55 }}>{detail}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-white/10" style={{ padding: '1.5vh 5vw' }}>
        <span className="text-white/30 text-xs">ace.apps.44@gmail.com</span>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-brand rounded-full" />
          <span className="text-white/30 text-xs">Vocabulary Builder — ACE-Apps</span>
        </div>
      </div>
    </div>
  );
}

/* ── Presentation shell ─────────────────────────────────────────── */
const SLIDES = [S01, S02, S03, S04, S05, S06, S07, S08, S09, S10, S11, S12, S13, S14];
const SLIDE_TITLES = [
  'Cover', 'SM-2 Algorithm', 'Mastery Levels & Flashcards', 'Quiz Mode & Streak',
  'Word Management', 'Dictionary Lookup', 'CSV Bulk Import', 'Data & Sync',
  'Auth & Security', 'Payments', 'UI & UX', 'Comparison Table',
  'Competitive Arguments', 'Summary',
];

export default function FeatureAnalysis() {
  const [cur, setCur] = useState(0);
  const total = SLIDES.length;
  const SlideComp = SLIDES[cur];
  return (
    <div className="flex flex-col bg-black" style={{ width: '100vw', height: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <div className="flex-1 relative overflow-hidden">
        <SlideComp />
      </div>
      <div className="flex items-center justify-between bg-gray-950 border-t border-white/10" style={{ padding: '0 20px', height: 48, flexShrink: 0 }}>
        <button
          onClick={() => setCur(c => Math.max(c - 1, 0))}
          disabled={cur === 0}
          className="flex items-center gap-2 text-sm font-semibold text-white/60 disabled:text-white/20 hover:text-white transition-colors"
          style={{ background: 'none', border: 'none', cursor: cur === 0 ? 'not-allowed' : 'pointer', padding: '8px 12px' }}
        >
          <ChevronLeft /> Prev
        </button>
        <div className="flex flex-col items-center gap-1">
          <div className="text-white/40 text-xs font-medium">{SLIDE_TITLES[cur]}</div>
          <div className="flex items-center gap-1">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCur(i)}
                style={{ width: i === cur ? 20 : 6, height: 6, borderRadius: 3, background: i === cur ? '#F05A28' : 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.2s' }}
              />
            ))}
          </div>
          <div className="text-white/30 text-xs">{cur + 1} / {total}</div>
        </div>
        <button
          onClick={() => setCur(c => Math.min(c + 1, total - 1))}
          disabled={cur === total - 1}
          className="flex items-center gap-2 text-sm font-semibold text-white/60 disabled:text-white/20 hover:text-white transition-colors"
          style={{ background: 'none', border: 'none', cursor: cur === total - 1 ? 'not-allowed' : 'pointer', padding: '8px 12px' }}
        >
          Next <ChevronRight />
        </button>
      </div>
    </div>
  );
}

export { S01, S02, S03, S04, S05, S06, S07, S08, S09, S10, S11, S12, S13, S14, SLIDES, SLIDE_TITLES };
