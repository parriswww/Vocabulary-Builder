import './_group.css';
import { useState } from 'react';

/* ── Nav icons ──────────────────────────────────────────────────── */
const ChevL = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>;
const ChevR = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>;
const Tick = ({ c = 'white', sz = 12 }: { c?: string; sz?: number }) => (
  <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
);

/* ── Reusable pieces ────────────────────────────────────────────── */
function Header({ title, num, bg = '#1A1A2E' }: { title: string; num: number; bg?: string }) {
  return (
    <div className="flex items-center justify-between" style={{ padding: '2.5vh 5vw', background: bg }}>
      <div className="text-white font-black" style={{ fontSize: '2.6vw' }}>{title}</div>
      <div className="text-white/15 font-black" style={{ fontSize: '5vw' }}>{String(num).padStart(2,'0')}</div>
    </div>
  );
}
function Footer() {
  return (
    <div className="flex items-center justify-between border-t border-white/10" style={{ padding: '1.2vh 5vw' }}>
      <span className="text-white/30 text-xs">ace.apps.44@gmail.com</span>
      <span className="text-white/30 text-xs">Vocabulary Builder — ACE-Apps</span>
    </div>
  );
}
function BulletRow({ label, detail, color = '#F05A28' }: { label: string; detail: string; color?: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-gray-50" style={{ padding: '1.2vh 1.5vw' }}>
      <div className="rounded-full flex-shrink-0 flex items-center justify-center mt-0.5" style={{ background: color, width: 18, height: 18 }}>
        <Tick sz={10} />
      </div>
      <div>
        <span className="text-navy font-bold" style={{ fontSize: '0.88vw' }}>{label}</span>
        {detail && <span className="text-gray-500" style={{ fontSize: '0.82vw' }}>{'  '}{detail}</span>}
      </div>
    </div>
  );
}

/* ── S01: Cover ─────────────────────────────────────────────────── */
function S01() {
  return (
    <div className="slide-root flex flex-col" style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 60%, #0F3460 100%)' }}>
      <div className="h-1.5 bg-brand w-full" />
      <div className="flex-1 flex flex-col items-center justify-center" style={{ padding: '5vh 8vw', textAlign: 'center' }}>
        <h1 className="text-white font-black leading-tight" style={{ fontSize: '4.5vw' }}>
          Vocabulary Builder<br />
          <span className="text-brand">Full Feature Analysis</span>
        </h1>
        <p className="text-white/50 font-light italic mt-5" style={{ fontSize: '1.4vw' }}>
          A technical &amp; competitive deep-dive
        </p>
        <div className="flex gap-4 mt-8 flex-wrap justify-center">
          {['Science-Backed', 'B2B-Ready', 'Vietnam-Focused'].map(tag => (
            <span key={tag} className="border border-brand/50 text-brand font-semibold px-4 py-1.5 rounded-full" style={{ fontSize: '0.85vw' }}>{tag}</span>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

/* ── S02: SM-2 Algorithm ────────────────────────────────────────── */
function S02() {
  const vars = [
    { title: 'Ease Factor', value: '2.5', sub: 'Starting value', desc: 'Multiplier applied to the review interval after each successful recall. Increases with strong recall, decreases with poor recall. Range: 1.3 – 2.5+.' },
    { title: 'Review Interval', value: 'Days', sub: 'Until next review', desc: 'Days before the word is shown again. Starts at 1 day and grows exponentially: 1 → 3 → 7 → 14 → 30 → 60+.' },
    { title: 'Review Count', value: 'N+', sub: 'Per word', desc: 'Number of times a word has been reviewed. Used with accuracy to determine mastery level promotion.' },
  ];
  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
      <Header title="The SM-2 Spaced Repetition Engine" num={2} />
      <div className="flex-1 flex flex-col justify-center" style={{ padding: '2vh 5vw' }}>
        <div className="grid grid-cols-3 gap-5 mb-5">
          {vars.map(({ title, value, sub, desc }) => (
            <div key={title} className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col" style={{ padding: '2.5vh 2vw' }}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-navy font-black" style={{ fontSize: '1.2vw' }}>{title}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{sub}</div>
                </div>
                <div className="text-brand font-black" style={{ fontSize: '2.2vw' }}>{value}</div>
              </div>
              <div className="bg-gray-50 rounded-xl flex-1" style={{ padding: '1.2vh 1.2vw' }}>
                <p className="text-gray-600" style={{ fontSize: '0.82vw', lineHeight: 1.6 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-navy rounded-2xl" style={{ padding: '2vh 3vw' }}>
          <p className="text-white font-semibold text-center" style={{ fontSize: '1.05vw' }}>
            Poor recall <span className="text-brand">resets the interval</span>; strong recall <span className="text-accent">extends it exponentially</span> — optimizing long-term retention while minimizing study time.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── S03: Mastery Levels + Flashcard Mode ───────────────────────── */
function S03() {
  const levels = [
    { name: 'Learning', color: '#6B7280', req: 'Default state — every new word starts here.' },
    { name: 'Reviewing', color: '#F05A28', req: '3+ reviews · ≥70% accuracy' },
    { name: 'Mastered', color: '#10B981', req: '10+ reviews · ≥90% accuracy · ≥30-day interval' },
  ];
  const flashItems = [
    'Front / back card review',
    'Audio pronunciation from Dictionary API',
    'Example sentences',
    'SM-2 integration on every flip',
  ];
  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
      <Header title="Three Mastery Levels & Flashcard Mode" num={3} bg="#F05A28" />
      <div className="flex-1 flex gap-6" style={{ padding: '2.5vh 5vw' }}>
        <div className="flex flex-col justify-center gap-4" style={{ width: '46vw' }}>
          {levels.map(({ name, color, req }) => (
            <div key={name} className="bg-white rounded-xl border border-gray-100 shadow-sm flex items-center gap-4" style={{ padding: '2vh 2vw' }}>
              <div className="rounded-full flex-shrink-0" style={{ background: color, width: 14, height: 14 }} />
              <div className="flex-1">
                <div className="font-black" style={{ color, fontSize: '1.15vw' }}>{name}</div>
                <div className="text-gray-500" style={{ fontSize: '0.82vw', marginTop: 2 }}>{req}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="rounded-2xl text-white flex flex-col h-full" style={{ background: 'linear-gradient(135deg, #16213E 0%, #1A1A2E 100%)', padding: '2.5vh 2.5vw' }}>
            <div className="text-brand font-bold uppercase tracking-wider mb-4" style={{ fontSize: '0.78vw' }}>Flashcard Mode</div>
            <div className="space-y-3">
              {flashItems.map(f => (
                <div key={f} className="flex items-center gap-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)', padding: '1.5vh 1.5vw' }}>
                  <div className="rounded-full bg-brand flex-shrink-0 flex items-center justify-center" style={{ width: 20, height: 20 }}>
                    <Tick sz={11} />
                  </div>
                  <span className="text-white/80" style={{ fontSize: '0.9vw' }}>{f}</span>
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
  const quizItems = [
    { label: 'Format', detail: 'Multiple-choice — 4 options per question' },
    { label: 'Session size', detail: 'Up to 10 words per quiz session' },
    { label: 'Question type', detail: 'Definition shown → pick the correct word' },
    { label: 'Scoring', detail: 'Score + percentage displayed at end' },
  ];
  const streakItems = [
    'Increments on consecutive practice days',
    'Resets on missed day',
    'A proven motivational mechanic',
  ];
  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
      <Header title="Quiz Mode & Daily Streak" num={4} />
      <div className="flex-1 flex gap-6" style={{ padding: '2.5vh 5vw' }}>
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100" style={{ padding: '2.5vh 2.5vw' }}>
          <div className="text-navy font-black mb-4" style={{ fontSize: '1.2vw' }}>Quiz Mode</div>
          <div className="space-y-3">
            {quizItems.map(({ label, detail }) => (
              <div key={label} className="flex items-center gap-4 rounded-xl bg-gray-50" style={{ padding: '1.5vh 1.5vw' }}>
                <div className="text-brand font-bold flex-shrink-0" style={{ fontSize: '0.82vw', minWidth: '6vw' }}>{label}</div>
                <div className="text-gray-600" style={{ fontSize: '0.82vw' }}>{detail}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 rounded-2xl flex flex-col" style={{ background: 'linear-gradient(135deg, #0F3460 0%, #16213E 100%)', padding: '2.5vh 2.5vw' }}>
          <div className="text-white font-black mb-2" style={{ fontSize: '1.2vw' }}>Daily Streak</div>
          <div className="text-accent font-black mb-4" style={{ fontSize: '3.5vw' }}>5 Days</div>
          <div className="space-y-3">
            {streakItems.map(s => (
              <div key={s} className="flex items-center gap-3">
                <div className="rounded-full bg-accent/20 flex-shrink-0 flex items-center justify-center" style={{ width: 20, height: 20 }}>
                  <Tick sz={11} c="#FFC107" />
                </div>
                <span className="text-white/80" style={{ fontSize: '0.9vw' }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── S05: Word & Content Management ────────────────────────────── */
function S05() {
  const entryItems = [
    { label: 'Word', detail: 'The target vocabulary word' },
    { label: 'Definition', detail: 'Auto-fetched or manually entered' },
    { label: 'Example sentence', detail: 'From dictionary API or custom' },
    { label: 'Custom tags', detail: 'e.g. "finance", "Q3-review"' },
  ];
  const filterItems = [
    { label: 'Live search', detail: 'Across word text and definition' },
    { label: 'Filter by mastery level', detail: '' },
    { label: 'Filter by tags', detail: '' },
    { label: 'Custom tags per word', detail: 'Attach one or more tags at any time' },
    { label: 'Batch tag on CSV import', detail: 'Apply one tag to entire import' },
  ];
  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
      <Header title="Word & Content Management" num={5} bg="#F05A28" />
      <div className="flex-1 flex gap-6" style={{ padding: '2.5vh 5vw' }}>
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100" style={{ padding: '2.5vh 2.5vw' }}>
          <div className="text-navy font-black mb-3" style={{ fontSize: '1.1vw' }}>Manual Word Entry</div>
          <div className="space-y-2 mb-3">
            {entryItems.map(({ label, detail }) => (
              <BulletRow key={label} label={label} detail={detail} color="#1A1A2E" />
            ))}
          </div>
          <div className="rounded-xl bg-orange-50 border border-orange-100" style={{ padding: '1.2vh 1.5vw' }}>
            <span className="text-brand font-bold" style={{ fontSize: '0.82vw' }}>All words are editable and deletable at any time.</span>
          </div>
        </div>
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100" style={{ padding: '2.5vh 2.5vw' }}>
          <div className="text-navy font-black mb-3" style={{ fontSize: '1.1vw' }}>Search, Filter &amp; Tag System</div>
          <div className="space-y-2">
            {filterItems.map(({ label, detail }) => (
              <BulletRow key={label} label={label} detail={detail} color="#1A1A2E" />
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
      <Header title="Automatic Dictionary Lookup" num={6} bg="#F05A28" />
      <div className="flex-1 flex gap-6 items-stretch" style={{ padding: '2.5vh 5vw' }}>
        <div className="flex-1 flex flex-col gap-4">
          <div className="rounded-2xl flex-1" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', padding: '2vh 2.5vw' }}>
            <div className="text-brand font-bold mb-3" style={{ fontSize: '0.82vw' }}>Free Dictionary API — auto-populates on word add</div>
            {['Definitions', 'Example sentences', 'Phonetic pronunciation', 'Audio pronunciation'].map(i => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <div className="rounded-full bg-brand/20 flex-shrink-0 flex items-center justify-center" style={{ width: 18, height: 18 }}><Tick sz={10} c="#F05A28" /></div>
                <span className="text-white/70" style={{ fontSize: '0.85vw' }}>{i}</span>
              </div>
            ))}
          </div>
          <div className="rounded-2xl flex-1" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', padding: '2vh 2.5vw' }}>
            <div className="text-accent font-bold mb-3" style={{ fontSize: '0.82vw' }}>Datamuse API — synonyms &amp; antonyms</div>
            {['Synonyms', 'Antonyms'].map(i => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <div className="rounded-full bg-accent/20 flex-shrink-0 flex items-center justify-center" style={{ width: 18, height: 18 }}><Tick sz={10} c="#FFC107" /></div>
                <span className="text-white/70" style={{ fontSize: '0.85vw' }}>{i}</span>
              </div>
            ))}
            <div className="text-white/40 mt-2" style={{ fontSize: '0.78vw' }}>Users can also manually trigger the Word Lookup view.</div>
          </div>
        </div>
        <div style={{ width: '36vw' }}>
          <div className="rounded-2xl h-full" style={{ background: 'linear-gradient(135deg, #5B6CF0 0%, #9B5CF6 100%)', padding: '3vh 3vw' }}>
            <div className="text-white/50 text-xs uppercase tracking-wider mb-3">Auto-populated word card</div>
            <div className="text-accent font-black" style={{ fontSize: '2.2vw' }}>catalyst</div>
            <div className="text-white/60 text-xs mb-4">noun · /ˈkætəlɪst/</div>
            <div className="bg-white/10 rounded-xl mb-3" style={{ padding: '1.5vh 1.5vw' }}>
              <div className="text-white/50 text-xs mb-1">Definition</div>
              <div className="text-white" style={{ fontSize: '0.88vw' }}>A person or thing that precipitates an event or change.</div>
            </div>
            <div className="bg-white/10 rounded-xl mb-3" style={{ padding: '1.5vh 1.5vw' }}>
              <div className="text-white/50 text-xs mb-1">Synonyms</div>
              <div className="text-accent" style={{ fontSize: '0.85vw' }}>stimulus · trigger · impetus</div>
            </div>
            <div className="bg-white/10 rounded-xl" style={{ padding: '1.5vh 1.5vw' }}>
              <div className="text-white/50 text-xs mb-1">Audio</div>
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
  );
}

/* ── S07: CSV Bulk Import ───────────────────────────────────────── */
function S07() {
  const bullets = [
    { title: 'Auto-detect header row', detail: 'Intelligently detects whether the first row is a header and skips it automatically.' },
    { title: 'Recognizes field variations', detail: 'Accepts "word", "term", "vocab", "definition", "meaning" — flexible column naming.' },
    { title: 'Skips duplicate words', detail: 'If a word already exists in the library, it is silently skipped — no duplicates created.' },
    { title: 'Skips invalid rows', detail: 'Rows missing a word or definition are excluded and reported after import.' },
    { title: 'Preview before commit', detail: 'Users see a full preview of parsed words with counts before confirming the import.' },
    { title: 'Apply a tag to the entire batch', detail: 'One tag applied to all words in a single import — instant category organization.' },
  ];
  return (
    <div className="slide-root flex flex-col" style={{ background: 'linear-gradient(160deg, #1A1A2E 0%, #16213E 100%)' }}>
      <Header title="CSV Bulk Import — The Enterprise Accelerator" num={7} bg="#F05A28" />
      <div className="flex-1 flex gap-5" style={{ padding: '2.5vh 5vw' }}>
        <div className="flex-1 grid grid-cols-2 gap-4">
          {bullets.map(({ title, detail }, i) => (
            <div key={title} className="rounded-2xl flex items-start gap-3" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(240,90,40,0.25)', padding: '2vh 2vw' }}>
              <div className="rounded-xl bg-brand flex-shrink-0 flex items-center justify-center text-white font-black" style={{ width: 32, height: 32, fontSize: '0.85vw' }}>{i + 1}</div>
              <div>
                <div className="text-white font-black" style={{ fontSize: '0.92vw' }}>{title}</div>
                <div className="text-white/55 mt-1" style={{ fontSize: '0.78vw', lineHeight: 1.5 }}>{detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-white text-center font-bold border-t border-white/10" style={{ padding: '1.5vh 5vw', background: 'rgba(240,90,40,0.15)', fontSize: '0.9vw' }}>
        This is the key feature for businesses loading industry-specific word lists.
      </div>
    </div>
  );
}

/* ── S08: Data & Sync ───────────────────────────────────────────── */
function S08() {
  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
      <Header title="Data Storage & Cross-Device Sync" num={8} />
      <div className="flex-1 flex gap-6" style={{ padding: '2.5vh 5vw' }}>
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100" style={{ padding: '2.5vh 2.5vw' }}>
          <div className="text-navy font-black mb-3" style={{ fontSize: '1.1vw' }}>Cloud Storage — Firebase Firestore</div>
          <div className="space-y-2">
            {[
              { label: 'Real-time NoSQL', detail: 'Synced across every device instantly' },
              { label: 'No manual backup', detail: 'Firebase handles redundancy automatically' },
              { label: 'Data persists across reinstalls', detail: 'Log back in to restore all words and progress' },
            ].map(({ label, detail }) => <BulletRow key={label} label={label} detail={detail} color="#1A1A2E" />)}
          </div>
        </div>
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100" style={{ padding: '2.5vh 2.5vw' }}>
          <div className="text-navy font-black mb-3" style={{ fontSize: '1.1vw' }}>Subscriber Registry — PostgreSQL</div>
          <div className="space-y-2">
            {[
              { label: 'Subscription status', detail: 'Active, trial, expired, admin-granted' },
              { label: 'Trial start and end dates', detail: 'Precise timestamps for 7-day trial enforcement' },
              { label: 'Admin grants', detail: 'Manual access activation from the dashboard' },
              { label: 'Payment records', detail: 'Paddle webhook events linked to accounts' },
              { label: 'Survives server restarts', detail: 'Unlike file-backed storage, data persists across redeployments' },
            ].map(({ label, detail }) => <BulletRow key={label} label={label} detail={detail} />)}
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
      <Header title="Authentication & Security Architecture" num={9} bg="#F05A28" />
      <div className="flex-1 flex gap-6" style={{ padding: '2.5vh 5vw' }}>
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100" style={{ padding: '2.5vh 2.5vw' }}>
          <div className="text-navy font-black mb-3" style={{ fontSize: '1.1vw' }}>Authentication</div>
          <div className="space-y-2">
            {[
              { label: 'Email + Password signup/login', detail: '' },
              { label: 'Password reset via email', detail: '' },
              { label: 'Anonymous sign-in for direct checkout', detail: '' },
              { label: 'Session persistence across browser sessions', detail: '' },
            ].map(({ label, detail }) => <BulletRow key={label} label={label} detail={detail} color="#1A1A2E" />)}
          </div>
        </div>
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100" style={{ padding: '2.5vh 2.5vw' }}>
          <div className="text-navy font-black mb-3" style={{ fontSize: '1.1vw' }}>Security</div>
          <div className="space-y-2">
            {[
              { label: 'Helmet.js HTTP headers', detail: '' },
              { label: 'API rate limiting', detail: '' },
              { label: 'Paddle webhook signature verification', detail: '' },
              { label: 'Firebase Security Rules per UID', detail: '' },
              { label: 'Admin password as environment secret', detail: '' },
            ].map(({ label, detail }) => <BulletRow key={label} label={label} detail={detail} />)}
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
      <Header title="Payments & Business Model" num={10} bg="#F05A28" />
      <div className="flex-1 flex gap-4" style={{ padding: '2.5vh 5vw' }}>
        {/* Pricing */}
        <div className="flex-1 rounded-2xl flex flex-col" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(240,90,40,0.35)', padding: '2.5vh 2vw' }}>
          <div className="text-brand font-bold uppercase tracking-wider mb-3" style={{ fontSize: '0.75vw' }}>Pricing</div>
          <div className="text-accent font-black text-center mb-1" style={{ fontSize: '2.8vw' }}>500,000 ₫</div>
          <div className="text-white/50 text-center text-xs mb-4">per 6 months · ~$19 USD</div>
          {[['Base price','500,000 ₫'],['+ 10% VAT','50,000 ₫'],['Total charged','550,000 ₫']].map(([l,v],i) => (
            <div key={l} className="flex justify-between rounded-lg mb-2" style={{ padding: '1vh 1.2vw', background: i===2 ? 'rgba(240,90,40,0.2)' : 'rgba(255,255,255,0.05)' }}>
              <span className="text-white/60" style={{ fontSize: '0.82vw' }}>{l}</span>
              <span className="text-white font-bold" style={{ fontSize: '0.85vw' }}>{v}</span>
            </div>
          ))}
          <div className="mt-3 text-white/40 text-center" style={{ fontSize: '0.75vw' }}>7-day free trial · or direct subscription (skip trial)</div>
        </div>
        {/* Paddle */}
        <div className="flex-1 rounded-2xl flex flex-col" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', padding: '2.5vh 2vw' }}>
          <div className="text-white/50 font-bold uppercase tracking-wider mb-3" style={{ fontSize: '0.75vw' }}>Paddle — International</div>
          <div className="space-y-2.5">
            {['Credit & debit cards','Apple Pay & Google Pay','PayPal','Global tax compliance','Recurring billing'].map(i => (
              <div key={i} className="flex items-center gap-2">
                <div className="rounded-full bg-brand flex-shrink-0 flex items-center justify-center" style={{ width: 18, height: 18 }}><Tick sz={10} /></div>
                <span className="text-white/70" style={{ fontSize: '0.82vw' }}>{i}</span>
              </div>
            ))}
          </div>
        </div>
        {/* VietQR */}
        <div className="flex-1 rounded-2xl flex flex-col" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,193,7,0.3)', padding: '2.5vh 2vw' }}>
          <div className="text-accent font-bold uppercase tracking-wider mb-3" style={{ fontSize: '0.75vw' }}>VietQR — Local Transfer</div>
          <div className="space-y-2.5">
            {['Email entry reveals QR code','Transfer via any Vietnamese banking app','Admin manually activates account after payment'].map(i => (
              <div key={i} className="flex items-center gap-2">
                <div className="rounded-full bg-accent/20 flex-shrink-0 flex items-center justify-center" style={{ width: 18, height: 18 }}><Tick sz={10} c="#FFC107" /></div>
                <span className="text-white/70" style={{ fontSize: '0.82vw' }}>{i}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── S11: UI & User Experience ─────────────────────────────────── */
function S11() {
  const cards = [
    { title: 'Mobile-First Design', color: '#F05A28' },
    { title: 'Dark Mode', color: '#5B6CF0' },
    { title: 'Responsive Layout', color: '#9B5CF6' },
    { title: 'No App Store Required', color: '#10B981' },
    { title: 'Progressive Loading', color: '#FFC107' },
  ];
  const details: Record<string, string> = {
    'Mobile-First Design': 'Vertical navigation, touch-friendly tap targets. Optimised for 375px screens and up.',
    'Dark Mode': 'Full theme-aware toggle. User preference saved to localStorage.',
    'Responsive Layout': 'Phone · tablet · desktop — UI adapts for each breakpoint.',
    'No App Store Required': 'Runs entirely in the browser. Instant access from any device with a URL.',
    'Progressive Loading': 'Splash screen + subscription check states. 3-second safety timeout fallback.',
  };
  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
      <Header title="UI & User Experience" num={11} />
      <div className="flex-1 flex items-center" style={{ padding: '2.5vh 5vw' }}>
        <div className="grid grid-cols-5 gap-4 w-full" style={{ height: '100%' }}>
          {cards.map(({ title, color }) => (
            <div key={title} className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col" style={{ padding: '2vh 1.5vw' }}>
              <div className="rounded-xl flex-shrink-0 mb-4" style={{ background: color, width: 40, height: 40 }} />
              <div className="text-navy font-black mb-2" style={{ fontSize: '0.92vw' }}>{title}</div>
              <div className="text-gray-500 flex-1" style={{ fontSize: '0.78vw', lineHeight: 1.6 }}>{details[title]}</div>
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
  if (val === 'yes') return <span style={{ fontSize: '1vw' }}>✅</span>;
  if (val === 'partial') return <span style={{ fontSize: '1vw' }}>⚠️</span>;
  if (val === 'no') return <span style={{ fontSize: '1vw' }}>❌</span>;
  return <span style={{ fontSize: '0.7vw', color: '#374151', fontWeight: 600 }}>{val}</span>;
}

function S12() {
  const cols = [
    { key: 'vb',       label: 'Vocabulary\nBuilder', highlight: true  },
    { key: 'anki',     label: 'Anki',                highlight: false },
    { key: 'quizlet',  label: 'Quizlet',             highlight: false },
    { key: 'duolingo', label: 'Duolingo',            highlight: false },
    { key: 'memrise',  label: 'Memrise',             highlight: false },
  ];
  const rows: { feature: string; vb: CellVal; anki: CellVal; quizlet: CellVal; duolingo: CellVal; memrise: CellVal }[] = [
    { feature: 'SM-2 Spaced Repetition',          vb: 'yes', anki: 'yes',     quizlet: 'partial', duolingo: 'partial', memrise: 'partial' },
    { feature: 'CSV Industry Word Import',         vb: 'yes', anki: 'partial', quizlet: 'partial', duolingo: 'no',      memrise: 'no'      },
    { feature: 'Auto Dictionary + Audio',          vb: 'yes', anki: 'partial', quizlet: 'partial', duolingo: 'yes',     memrise: 'partial' },
    { feature: 'Synonyms / Antonyms',              vb: 'yes', anki: 'no',      quizlet: 'no',      duolingo: 'no',      memrise: 'no'      },
    { feature: 'Cross-Device Cloud Sync',          vb: 'yes', anki: 'partial', quizlet: 'yes',     duolingo: 'yes',     memrise: 'yes'     },
    { feature: 'Works in Browser (no install)',    vb: 'yes', anki: 'no',      quizlet: 'yes',     duolingo: 'yes',     memrise: 'yes'     },
    { feature: 'Dark Mode',                        vb: 'yes', anki: 'yes',     quizlet: 'yes',     duolingo: 'no',      memrise: 'no'      },
    { feature: 'Vietnamese Bank Payment',          vb: 'yes', anki: 'no',      quizlet: 'no',      duolingo: 'no',      memrise: 'no'      },
    { feature: 'Admin Override / B2B Console',     vb: 'yes', anki: 'no',      quizlet: 'partial', duolingo: 'no',      memrise: 'no'      },
    { feature: 'Industry-Specific Focus',          vb: 'yes', anki: 'partial', quizlet: 'partial', duolingo: 'no',      memrise: 'no'      },
    { feature: 'One-Time Bulk Team Setup',         vb: 'yes', anki: 'partial', quizlet: 'no',      duolingo: 'no',      memrise: 'no'      },
    { feature: 'Price (6 months)',                 vb: '~$19', anki: 'Free/$25/yr', quizlet: '$35.99/yr', duolingo: '$79.99/yr', memrise: '$59.99/yr' },
  ];
  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
      <Header title="Competitive Comparison Table" num={12} />
      <div className="flex-1 flex flex-col" style={{ padding: '1.5vh 4vw', overflow: 'hidden' }}>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex-1 flex flex-col">
          {/* Header */}
          <div className="grid flex-shrink-0" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr', background: '#1A1A2E' }}>
            <div className="text-white/60 font-semibold" style={{ padding: '1.2vh 1.5vw', fontSize: '0.75vw' }}>Feature</div>
            {cols.map(({ key, label, highlight }) => (
              <div key={key} className="text-center font-black" style={{ padding: '1.2vh 0.3vw', fontSize: '0.72vw', background: highlight ? '#F05A28' : 'transparent', color: 'white', whiteSpace: 'pre-line', lineHeight: 1.25 }}>
                {label}
              </div>
            ))}
          </div>
          {/* Rows */}
          <div className="flex-1 flex flex-col">
            {rows.map((row, i) => (
              <div key={row.feature} className="grid flex-1" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr', background: i % 2 === 0 ? 'white' : '#F9FAFB', borderBottom: '1px solid #F3F4F6' }}>
                <div className="text-navy font-semibold flex items-center" style={{ padding: '0 1.5vw', fontSize: '0.75vw' }}>{row.feature}</div>
                {cols.map(({ key, highlight }) => (
                  <div key={key} className="flex items-center justify-center" style={{ background: highlight ? 'rgba(240,90,40,0.06)' : 'transparent' }}>
                    <Cell val={row[key as keyof typeof row]} />
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* Legend */}
          <div className="flex items-center gap-5 border-t border-gray-100 flex-shrink-0" style={{ padding: '1vh 1.5vw' }}>
            {[['✅','Full support'],['⚠️','Partial'],['❌','Not available']].map(([sym,lbl]) => (
              <div key={lbl} className="flex items-center gap-1.5">
                <span style={{ fontSize: '0.85vw' }}>{sym}</span>
                <span className="text-gray-500" style={{ fontSize: '0.7vw' }}>{lbl}</span>
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
    { vs: 'vs Anki', color: '#5B6CF0', points: [
      'Anki requires manual deck setup, plugin installation, and desktop syncing for full features.',
      'Vocabulary Builder runs in the browser — no install, no configuration, no separate sync tool.',
      'B2B CSV import and admin console have no equivalent in Anki.',
      'Anki has no Vietnamese payment option; VietQR is unique to this product.',
    ]},
    { vs: 'vs Quizlet', color: '#9B5CF6', points: [
      'Quizlet\'s spaced repetition does not implement the full SM-2 algorithm.',
      'Quizlet charges $35.99/year vs 500,000 ₫/6 months (~$19 USD).',
      'No VietQR payment path and no admin override console in Quizlet.',
      'CSV import detects headers, skips duplicates, and previews before commit.',
    ]},
    { vs: 'vs Duolingo / Babbel', color: '#10B981', points: [
      'Duolingo and Babbel teach a fixed curriculum — users cannot add their own vocabulary.',
      'Neither supports CSV import or industry-specific word lists.',
      'Duolingo is $79.99/year — more than 4× the cost.',
      'No B2B admin console or bulk team onboarding in either product.',
    ]},
    { vs: 'vs Generic Vietnam Apps', color: '#F05A28', points: [
      'Most local alternatives use file-backed storage that is wiped on redeployment.',
      'No competitor offers both Paddle international billing AND VietQR local transfer.',
      'None provide an admin dashboard with subscriber management and trial extension.',
      'Auto-dictionary with audio and synonyms at this price point is unique in the Vietnamese market.',
    ]},
  ];
  return (
    <div className="slide-root flex flex-col" style={{ background: 'linear-gradient(160deg, #1A1A2E 0%, #0F3460 100%)' }}>
      <Header title="The Core Competitive Arguments" num={13} bg="#F05A28" />
      <div className="flex-1 grid grid-cols-2 gap-4" style={{ padding: '2.5vh 5vw' }}>
        {args.map(({ vs, color, points }) => (
          <div key={vs} className="rounded-2xl flex flex-col" style={{ background: 'rgba(255,255,255,0.07)', border: `1px solid ${color}40`, padding: '2vh 2vw' }}>
            <div className="rounded-lg font-black text-white inline-flex items-center mb-3" style={{ background: color, padding: '0.3vh 1vw', fontSize: '0.78vw', alignSelf: 'flex-start' }}>{vs}</div>
            <div className="space-y-2">
              {points.map(p => (
                <div key={p} className="flex items-start gap-2">
                  <div className="rounded-full flex-shrink-0 flex items-center justify-center mt-0.5" style={{ background: color + '25', border: `1px solid ${color}50`, width: 18, height: 18 }}>
                    <Tick sz={9} c={color} />
                  </div>
                  <span className="text-white/70" style={{ fontSize: '0.78vw', lineHeight: 1.5 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── S14: Summary ───────────────────────────────────────────────── */
function S14() {
  const diffs = [
    { title: 'True SM-2 SRS',         color: '#F05A28' },
    { title: 'CSV Bulk Import',        color: '#5B6CF0' },
    { title: 'VietQR + Paddle',        color: '#FFC107' },
    { title: 'Full Admin B2B Console', color: '#10B981' },
  ];
  return (
    <div className="slide-root flex flex-col" style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 60%, #0F3460 100%)' }}>
      <div className="h-1.5 bg-brand w-full" />
      <div className="flex-1 flex flex-col items-center justify-center" style={{ padding: '4vh 8vw' }}>
        <div className="text-brand font-semibold uppercase tracking-widest mb-4" style={{ fontSize: '0.8vw' }}>Summary</div>
        <h1 className="text-white font-black text-center leading-tight" style={{ fontSize: '4vw' }}>
          One App. Every Industry.<br />
          <span className="text-brand">Every Word.</span>
        </h1>
        <div className="grid grid-cols-4 gap-5 mt-10" style={{ width: '80vw' }}>
          {diffs.map(({ title, color }) => (
            <div key={title} className="rounded-2xl flex flex-col items-center" style={{ background: 'rgba(255,255,255,0.07)', border: `1px solid ${color}40`, padding: '3vh 2vw' }}>
              <div className="rounded-xl mb-3" style={{ background: color, width: 40, height: 40 }} />
              <div className="text-white font-black text-center" style={{ fontSize: '1vw' }}>{title}</div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

/* ── Shell ──────────────────────────────────────────────────────── */
const SLIDES = [S01,S02,S03,S04,S05,S06,S07,S08,S09,S10,S11,S12,S13,S14];
const SLIDE_TITLES = ['Cover','SM-2 Algorithm','Mastery Levels & Flashcards','Quiz Mode & Streak','Word Management','Dictionary Lookup','CSV Bulk Import','Data & Sync','Auth & Security','Payments','UI & UX','Comparison Table','Competitive Arguments','Summary'];

export default function FeatureAnalysis() {
  const [cur, setCur] = useState(0);
  const total = SLIDES.length;
  const SlideComp = SLIDES[cur];
  return (
    <div className="flex flex-col bg-black" style={{ width: '100vw', height: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <div className="flex-1 relative overflow-hidden"><SlideComp /></div>
      <div className="flex items-center justify-between bg-gray-950 border-t border-white/10" style={{ padding: '0 20px', height: 48, flexShrink: 0 }}>
        <button onClick={() => setCur(c => Math.max(c-1,0))} disabled={cur===0}
          className="flex items-center gap-2 text-sm font-semibold text-white/60 disabled:text-white/20 hover:text-white transition-colors"
          style={{ background:'none', border:'none', cursor: cur===0 ? 'not-allowed':'pointer', padding:'8px 12px' }}>
          <ChevL /> Prev
        </button>
        <div className="flex flex-col items-center gap-1">
          <div className="text-white/40 text-xs font-medium">{SLIDE_TITLES[cur]}</div>
          <div className="flex items-center gap-1">
            {SLIDES.map((_,i) => (
              <button key={i} onClick={() => setCur(i)}
                style={{ width: i===cur?20:6, height:6, borderRadius:3, background: i===cur?'#F05A28':'rgba(255,255,255,0.2)', border:'none', cursor:'pointer', padding:0, transition:'all 0.2s' }} />
            ))}
          </div>
          <div className="text-white/30 text-xs">{cur+1} / {total}</div>
        </div>
        <button onClick={() => setCur(c => Math.min(c+1,total-1))} disabled={cur===total-1}
          className="flex items-center gap-2 text-sm font-semibold text-white/60 disabled:text-white/20 hover:text-white transition-colors"
          style={{ background:'none', border:'none', cursor: cur===total-1?'not-allowed':'pointer', padding:'8px 12px' }}>
          Next <ChevR />
        </button>
      </div>
    </div>
  );
}

export { S01,S02,S03,S04,S05,S06,S07,S08,S09,S10,S11,S12,S13,S14,SLIDES,SLIDE_TITLES };
