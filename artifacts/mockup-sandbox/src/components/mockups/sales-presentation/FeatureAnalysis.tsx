import './_group.css';
import { useState } from 'react';

/* ── Chevron icons ──────────────────────────────────────────────── */
const ChevL = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>;
const ChevR = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>;
const Tick = ({ c = 'white', sz = 12 }: { c?: string; sz?: number }) => (
  <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
);

/* ── Reusable pieces ────────────────────────────────────────────── */
function Header({ title, num, bg = '#1A1A2E' }: { title: string; num: number; bg?: string }) {
  return (
    <div className="flex items-center justify-between flex-shrink-0" style={{ padding: '2.5vh 5vw', background: bg }}>
      <div className="text-white font-black leading-tight" style={{ fontSize: '2.4vw' }}>{title}</div>
      <div className="text-white/15 font-black" style={{ fontSize: '5vw' }}>{String(num).padStart(2,'0')}</div>
    </div>
  );
}

function Footer() {
  return (
    <div className="flex items-center justify-between border-t border-white/10 flex-shrink-0" style={{ padding: '1.2vh 5vw' }}>
      <span className="text-white/30 text-xs">ace.apps.44@gmail.com</span>
      <span className="text-white/30 text-xs">Vocabulary Builder — ACE-Apps</span>
    </div>
  );
}

function Row({ label, detail, color = '#F05A28' }: { label: string; detail?: string; color?: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-gray-50" style={{ padding: '1.2vh 1.5vw' }}>
      <div className="rounded-full flex-shrink-0 flex items-center justify-center" style={{ marginTop: 2, background: color, width: 18, height: 18 }}>
        <Tick sz={10} />
      </div>
      <div>
        <span className="text-gray-800 font-bold" style={{ fontSize: '0.9vw' }}>{label}</span>
        {detail ? <span className="text-gray-500" style={{ fontSize: '0.84vw' }}>{'  '}{detail}</span> : null}
      </div>
    </div>
  );
}

/* ── S01: Cover ─────────────────────────────────────────────────── */
function S01() {
  return (
    <div className="slide-root flex flex-col" style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)' }}>
      <div className="h-1.5 bg-brand w-full flex-shrink-0" />
      <div className="flex-1 flex flex-col items-center justify-center" style={{ padding: '5vh 8vw', textAlign: 'center' }}>
        <h1 className="text-white font-black leading-tight" style={{ fontSize: '5vw' }}>
          Vocabulary Builder<br />
          <span className="text-brand">Full Feature Analysis</span>
        </h1>
        <p className="text-white/50 italic mt-5" style={{ fontSize: '1.4vw' }}>
          A technical &amp; competitive deep-dive
        </p>
        <div className="flex gap-4 mt-8 flex-wrap justify-center">
          {['Science-Backed', 'B2B-Ready', 'Vietnam-Focused'].map(tag => (
            <span key={tag} className="border border-brand/50 text-brand font-semibold px-4 py-1.5 rounded-full" style={{ fontSize: '0.9vw' }}>{tag}</span>
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
    { title: 'Ease Factor', value: '2.5', sub: 'Starting value', desc: 'Starts at 2.5. Multiplier applied to the review interval after each recall. Increases with strong recall, decreases with poor recall.' },
    { title: 'Review Interval', value: 'Days', sub: 'Days until next review', desc: 'Number of days before the word is shown again. Grows after each successful recall.' },
    { title: 'Review Count', value: 'N+', sub: 'Per word', desc: 'The number of times a word has been reviewed. Combined with accuracy to determine mastery level promotion.' },
  ];
  return (
    <div className="slide-root bg-gray-50 flex flex-col">
      <Header title="Spaced Repetition System (SM-2 Algorithm)" num={2} />
      <div className="flex-1 flex flex-col justify-center" style={{ padding: '2vh 5vw' }}>
        <p className="text-gray-500 mb-4" style={{ fontSize: '0.88vw' }}>
          This is the same algorithm used by Anki, widely considered the gold standard in memory science. The app tracks three per-word variables:
        </p>
        <div className="grid grid-cols-3 gap-5 mb-5">
          {vars.map(({ title, value, sub, desc }) => (
            <div key={title} className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col" style={{ padding: '2.5vh 2vw' }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-navy font-black" style={{ fontSize: '1.1vw' }}>{title}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{sub}</div>
                </div>
                <div className="text-brand font-black" style={{ fontSize: '2vw' }}>{value}</div>
              </div>
              <div className="bg-gray-50 rounded-xl flex-1" style={{ padding: '1.2vh 1.2vw' }}>
                <p className="text-gray-600" style={{ fontSize: '0.8vw', lineHeight: 1.6 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-navy rounded-2xl" style={{ padding: '2vh 3vw' }}>
          <p className="text-white font-semibold text-center" style={{ fontSize: '1vw' }}>
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
    { name: 'Learning', color: '#6B7280', req: 'Default for new words' },
    { name: 'Reviewing', color: '#F05A28', req: 'Reached after 3+ reviews with ≥70% accuracy' },
    { name: 'Mastered', color: '#10B981', req: 'Reached after 10+ reviews with ≥90% accuracy and a ≥30-day review interval' },
  ];
  return (
    <div className="slide-root bg-gray-50 flex flex-col">
      <Header title="Three Mastery Levels & Flashcard Mode" num={3} bg="#F05A28" />
      <div className="flex-1 flex gap-6" style={{ padding: '2.5vh 5vw' }}>
        <div className="flex flex-col justify-center gap-4" style={{ width: '48vw' }}>
          {levels.map(({ name, color, req }) => (
            <div key={name} className="bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4" style={{ padding: '2vh 2.5vw' }}>
              <div className="rounded-full flex-shrink-0" style={{ background: color, width: 14, height: 14 }} />
              <div>
                <div className="font-black" style={{ color, fontSize: '1.15vw' }}>{name}</div>
                <div className="text-gray-500 mt-0.5" style={{ fontSize: '0.82vw' }}>{req}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex-1 rounded-2xl flex flex-col" style={{ background: 'linear-gradient(135deg, #16213E 0%, #1A1A2E 100%)', padding: '2.5vh 2.5vw' }}>
          <div className="text-brand font-bold uppercase tracking-wider mb-4" style={{ fontSize: '0.78vw' }}>Flashcard Mode</div>
          <p className="text-white/70 mb-4" style={{ fontSize: '0.88vw', lineHeight: 1.7 }}>
            Front/back card review with audio pronunciation (fetched from the dictionary API) and example sentences. Integrated directly with the SM-2 engine so every flip updates that word's review schedule.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── S04: Quiz Mode + Daily Streak ─────────────────────────────── */
function S04() {
  return (
    <div className="slide-root bg-gray-50 flex flex-col">
      <Header title="Quiz Mode & Daily Streak Tracking" num={4} />
      <div className="flex-1 flex gap-6" style={{ padding: '2.5vh 5vw' }}>
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100" style={{ padding: '2.5vh 2.5vw' }}>
          <div className="text-navy font-black mb-3" style={{ fontSize: '1.2vw' }}>Quiz Mode</div>
          <p className="text-gray-600 leading-relaxed" style={{ fontSize: '0.88vw', lineHeight: 1.8 }}>
            Multiple-choice format. Up to 10 words per session drawn from the user's active list. Shows the definition, user selects the correct word from 4 options. Tracks score and percentage at the end.
          </p>
        </div>
        <div className="flex-1 rounded-2xl flex flex-col" style={{ background: 'linear-gradient(135deg, #0F3460 0%, #16213E 100%)', padding: '2.5vh 2.5vw' }}>
          <div className="text-white font-black mb-3" style={{ fontSize: '1.2vw' }}>Daily Streak Tracking</div>
          <p className="text-white/70 leading-relaxed" style={{ fontSize: '0.88vw', lineHeight: 1.8 }}>
            Day-over-day consistency is measured and displayed. The streak increments for consecutive calendar days of activity and resets if a day is missed — a proven motivational mechanic.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── S05: Word & Content Management ────────────────────────────── */
function S05() {
  return (
    <div className="slide-root bg-gray-50 flex flex-col">
      <Header title="Word & Content Management" num={5} bg="#F05A28" />
      <div className="flex-1 flex flex-col" style={{ padding: '2vh 5vw', gap: '1.5vh' }}>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1" style={{ padding: '2vh 2.5vw' }}>
          <div className="text-navy font-black mb-2" style={{ fontSize: '1.05vw' }}>Manual Word Entry</div>
          <div className="space-y-2 mb-2">
            <Row label="Word, definition, example sentence, and custom tags — all user-controlled" color="#1A1A2E" />
            <Row label="Words can be edited or deleted at any time" color="#1A1A2E" />
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1" style={{ padding: '2vh 2.5vw' }}>
          <div className="text-navy font-black mb-2" style={{ fontSize: '1.05vw' }}>Search &amp; Filter</div>
          <p className="text-gray-600" style={{ fontSize: '0.86vw' }}>Live search across word and definition fields. Filterable by mastery level and tags.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1" style={{ padding: '2vh 2.5vw' }}>
          <div className="text-navy font-black mb-2" style={{ fontSize: '1.05vw' }}>Tag System</div>
          <p className="text-gray-600" style={{ fontSize: '0.86vw' }}>Custom tags per word (or per import batch) for organizing vocabulary by topic, unit, or source.</p>
        </div>
      </div>
    </div>
  );
}

/* ── S06: Automatic Dictionary Lookup ──────────────────────────── */
function S06() {
  return (
    <div className="slide-root bg-gray-50 flex flex-col">
      <Header title="Automatic Dictionary Lookup" num={6} />
      <div className="flex-1 flex items-center" style={{ padding: '2.5vh 5vw' }}>
        <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100" style={{ padding: '3vh 4vw' }}>
          <p className="text-gray-700 leading-relaxed" style={{ fontSize: '1.05vw', lineHeight: 1.85 }}>
            When a user adds a word, the app queries a dictionary API (proxied through the backend) to auto-populate{' '}
            <span className="text-navy font-bold">definitions, example sentences, phonetic pronunciation, and audio</span>.
            {' '}The <span className="text-brand font-bold">Datamuse API</span> is also queried for{' '}
            <span className="text-navy font-bold">synonyms and antonyms</span>.
            {' '}Users can also manually trigger the{' '}
            <span className="text-brand font-bold">"Word Lookup" view</span> to search any word before adding it.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── S07: CSV Bulk Import ───────────────────────────────────────── */
function S07() {
  const bullets = [
    'Auto-detects whether a header row is present',
    'Recognizes common header variations ("term", "vocab", "meaning", "phrase", etc.)',
    "Skips duplicates (already in the user's list)",
    'Skips rows missing word or definition',
    'Shows a preview with counts (valid, duplicates, invalid) before committing',
    'Lets users apply a tag to the entire import batch',
  ];
  return (
    <div className="slide-root flex flex-col" style={{ background: 'linear-gradient(160deg, #1A1A2E 0%, #16213E 100%)' }}>
      <Header title="CSV Bulk Import" num={7} bg="#F05A28" />
      <div className="flex-1 flex flex-col" style={{ padding: '2vh 5vw' }}>
        <p className="text-white/60 mb-4" style={{ fontSize: '0.88vw' }}>Users upload a file with columns: word, definition, sentence. The app:</p>
        <div className="grid grid-cols-2 gap-4 flex-1">
          {bullets.map((b, i) => (
            <div key={b} className="rounded-2xl flex items-start gap-3" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(240,90,40,0.3)', padding: '2vh 2vw' }}>
              <div className="rounded-xl bg-brand flex-shrink-0 flex items-center justify-center text-white font-black" style={{ width: 32, height: 32, fontSize: '0.85vw', flexShrink: 0 }}>{i + 1}</div>
              <span className="text-white/80" style={{ fontSize: '0.86vw', lineHeight: 1.6 }}>{b}</span>
            </div>
          ))}
        </div>
        <div className="text-white/80 text-center font-semibold border-t border-white/10 mt-4" style={{ paddingTop: '1.5vh', fontSize: '0.9vw' }}>
          This is the key feature for businesses who want to load industry-specific word lists.
        </div>
      </div>
    </div>
  );
}

/* ── S08: Data & Sync ───────────────────────────────────────────── */
function S08() {
  return (
    <div className="slide-root bg-gray-50 flex flex-col">
      <Header title="Data & Sync" num={8} />
      <div className="flex-1 flex gap-6" style={{ padding: '2.5vh 5vw' }}>
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100" style={{ padding: '2.5vh 2.5vw' }}>
          <div className="text-navy font-black mb-3" style={{ fontSize: '1.1vw' }}>Cloud Storage — Firebase Firestore</div>
          <p className="text-gray-500 mb-3" style={{ fontSize: '0.82vw' }}>Every word and its entire review history is stored in Firebase's real-time NoSQL cloud database, tied to the authenticated user's UID. This means:</p>
          <div className="space-y-2">
            <Row label="Words are synced in real time across every device the user logs into" color="#1A1A2E" />
            <Row label="No manual backup needed" color="#1A1A2E" />
            <Row label="Data persists if the user reinstalls the app or switches phones/computers" color="#1A1A2E" />
          </div>
        </div>
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100" style={{ padding: '2.5vh 2.5vw' }}>
          <div className="text-navy font-black mb-3" style={{ fontSize: '1.1vw' }}>Subscriber Registry — PostgreSQL</div>
          <p className="text-gray-600 leading-relaxed" style={{ fontSize: '0.88vw', lineHeight: 1.8 }}>
            A separate server-side database (PostgreSQL) maintains subscription status, trial dates, admin grants, and payment records. This is used by the admin panel and survives server restarts and redeployments — unlike file-based storage that some competing apps use.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── S09: Authentication + Security ────────────────────────────── */
function S09() {
  const authItems = [
    { label: 'Email + Password', detail: 'signup and login' },
    { label: 'Password reset', detail: 'via email' },
    { label: 'Anonymous sign-in', detail: 'for the direct checkout flow (no friction for purchasers)' },
    { label: 'Session persistence', detail: '— users stay logged in across browser sessions' },
  ];
  const secItems = [
    'Helmet.js HTTP security headers',
    'API rate limiting',
    'Webhook signature verification (Paddle webhooks are validated before processing)',
    "Firebase Security Rules restrict each user's data to their own UID",
    'Admin password stored as an environment secret, never hardcoded',
  ];
  return (
    <div className="slide-root bg-gray-50 flex flex-col">
      <Header title="Authentication & Security" num={9} bg="#F05A28" />
      <div className="flex-1 flex gap-6" style={{ padding: '2.5vh 5vw' }}>
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100" style={{ padding: '2.5vh 2.5vw' }}>
          <div className="text-navy font-black mb-3" style={{ fontSize: '1.1vw' }}>Authentication</div>
          <div className="space-y-2">
            {authItems.map(({ label, detail }) => (
              <Row key={label} label={label} detail={detail} color="#1A1A2E" />
            ))}
          </div>
        </div>
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100" style={{ padding: '2.5vh 2.5vw' }}>
          <div className="text-navy font-black mb-3" style={{ fontSize: '1.1vw' }}>Security</div>
          <div className="space-y-2">
            {secItems.map(s => <Row key={s} label={s} />)}
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
        <div className="flex-1 rounded-2xl flex flex-col" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(240,90,40,0.4)', padding: '2.5vh 2vw' }}>
          <div className="text-brand font-bold uppercase tracking-wider mb-3" style={{ fontSize: '0.75vw' }}>Pricing</div>
          <div className="text-accent font-black text-center mb-1" style={{ fontSize: '2.6vw' }}>500,000 ₫</div>
          <div className="text-white/50 text-center mb-4" style={{ fontSize: '0.78vw' }}>per 6 months · ≈$19 USD</div>
          <div className="text-white/70 mb-2" style={{ fontSize: '0.82vw' }}>+ 10% VAT for Vietnamese purchasers. Total: 550,000 ₫.</div>
          <div className="rounded-xl bg-white/5 mt-2" style={{ padding: '1.2vh 1.2vw' }}>
            <p className="text-white/80 font-semibold mb-1" style={{ fontSize: '0.82vw' }}>7-Day Free Trial</p>
            <p className="text-white/55" style={{ fontSize: '0.76vw' }}>Standard access flow. Full features from day one.</p>
          </div>
          <div className="rounded-xl bg-white/5 mt-2" style={{ padding: '1.2vh 1.2vw' }}>
            <p className="text-white/80 font-semibold mb-1" style={{ fontSize: '0.82vw' }}>Direct Subscription</p>
            <p className="text-white/55" style={{ fontSize: '0.76vw' }}>"Skip Trial" flow for businesses and employees who want to pay immediately without a trial.</p>
          </div>
        </div>
        {/* Paddle */}
        <div className="flex-1 rounded-2xl flex flex-col" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', padding: '2.5vh 2vw' }}>
          <div className="text-white/50 font-bold uppercase tracking-wider mb-3" style={{ fontSize: '0.75vw' }}>Paddle (Global Payment Processor)</div>
          <p className="text-white/70 leading-relaxed" style={{ fontSize: '0.88vw', lineHeight: 1.8 }}>
            Handles credit/debit cards, Apple Pay, Google Pay, and PayPal. Paddle manages tax compliance, recurring billing, cancellations, and refunds globally.
          </p>
        </div>
        {/* VietQR */}
        <div className="flex-1 rounded-2xl flex flex-col" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,193,7,0.35)', padding: '2.5vh 2vw' }}>
          <div className="text-accent font-bold uppercase tracking-wider mb-3" style={{ fontSize: '0.75vw' }}>VietQR / Techcombank</div>
          <p className="text-white/70 leading-relaxed" style={{ fontSize: '0.88vw', lineHeight: 1.8 }}>
            Local Vietnamese bank transfer option. The user enters their email, the QR code is revealed, they transfer via any Vietnamese banking app, and the admin activates the account. This is critical for the Vietnamese B2B market where many businesses still prefer bank transfer over card.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── S11: UI & User Experience ─────────────────────────────────── */
function S11() {
  const cards = [
    { title: 'Mobile-First Design', color: '#F05A28', desc: 'Built specifically to feel like a native mobile app in the browser. Vertical navigation, touch-friendly card sizes, 3D button press effects.' },
    { title: 'Dark Mode', color: '#5B6CF0', desc: 'Full dark/light mode toggle with preference saved to the browser. Every color, border, and gradient is theme-aware.' },
    { title: 'Responsive Layout', color: '#9B5CF6', desc: 'Works on phone, tablet, and desktop browsers without a separate mobile app.' },
    { title: 'No App Store Required', color: '#10B981', desc: 'Runs entirely in the browser — no installation, no App Store approval, no update process for the user.' },
    { title: 'Progressive Loading', color: '#FFC107', desc: 'Splash screen while Firebase initializes. "Checking access…" screen while subscription loads. Prevents blank/broken states.' },
  ];
  return (
    <div className="slide-root bg-gray-50 flex flex-col">
      <Header title="UI & User Experience" num={11} />
      <div className="flex-1 flex gap-4 items-stretch" style={{ padding: '2.5vh 5vw' }}>
        {cards.map(({ title, color, desc }) => (
          <div key={title} className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col" style={{ padding: '2vh 1.5vw' }}>
            <div className="rounded-xl flex-shrink-0 mb-4" style={{ background: color, width: 36, height: 36 }} />
            <div className="text-navy font-black mb-2" style={{ fontSize: '0.9vw' }}>{title}</div>
            <div className="text-gray-500 flex-1" style={{ fontSize: '0.78vw', lineHeight: 1.65 }}>{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── S12: Competitive Comparison Table ─────────────────────────── */
function S12() {
  const cols = [
    { key: 'vb',       label: 'Vocabulary\nBuilder', highlight: true  },
    { key: 'anki',     label: 'Anki',                highlight: false },
    { key: 'quizlet',  label: 'Quizlet',             highlight: false },
    { key: 'duolingo', label: 'Duolingo',            highlight: false },
    { key: 'memrise',  label: 'Memrise',             highlight: false },
  ];
  type Row = { feature: string; vb: string; anki: string; quizlet: string; duolingo: string; memrise: string };
  const rows: Row[] = [
    { feature: 'SM-2 Spaced Repetition',       vb:'✅ Full',        anki:'✅ Full',        quizlet:'❌ Basic',        duolingo:'❌ Gamified',  memrise:'✅ Partial'   },
    { feature: 'CSV Industry Word Import',      vb:'✅ Yes',         anki:'✅ (complex)',   quizlet:'✅ (paid tier)',  duolingo:'❌',           memrise:'❌'           },
    { feature: 'Auto Dictionary + Audio',       vb:'✅ Yes',         anki:'❌ Manual',      quizlet:'✅ Limited',     duolingo:'✅ Built-in',  memrise:'✅ Limited'   },
    { feature: 'Synonyms / Antonyms',           vb:'✅ Yes',         anki:'❌',             quizlet:'❌',             duolingo:'❌',           memrise:'❌'           },
    { feature: 'Cross-Device Cloud Sync',       vb:'✅ Realtime',    anki:'⚠️ AnkiWeb\n(paid)',quizlet:'✅ Yes',    duolingo:'✅ Yes',       memrise:'✅ Yes'       },
    { feature: 'Works in Browser (no install)', vb:'✅ Yes',         anki:'❌ App required', quizlet:'✅ Yes',        duolingo:'✅ Yes',       memrise:'✅ Yes'       },
    { feature: 'Dark Mode',                     vb:'✅ Yes',         anki:'✅ Yes',         quizlet:'✅ Yes',         duolingo:'❌',           memrise:'❌'           },
    { feature: 'Vietnamese Bank Payment',       vb:'✅ VietQR',      anki:'❌',             quizlet:'❌',             duolingo:'❌',           memrise:'❌'           },
    { feature: 'Admin Override / B2B Console',  vb:'✅ Full panel',  anki:'❌',             quizlet:'❌',             duolingo:'❌',           memrise:'❌'           },
    { feature: 'Industry-Specific Focus',       vb:'✅ Designed\nfor it', anki:'⚠️ General', quizlet:'⚠️ General', duolingo:'❌ Consumer\nonly', memrise:'⚠️ General' },
    { feature: 'One-Time Bulk Team Setup',      vb:'✅ CSV batch',   anki:'⚠️ Manual',     quizlet:'⚠️ Limited',    duolingo:'❌',           memrise:'❌'           },
    { feature: 'Price (6 months)',              vb:'~$19',           anki:'Free / $25/yr\n(sync)', quizlet:'$35.99/yr', duolingo:'$79.99/yr', memrise:'$59.99/yr' },
  ];
  return (
    <div className="slide-root bg-gray-50 flex flex-col">
      <Header title="Where This App Stands vs. Competitors" num={12} />
      <div className="flex-1 flex flex-col" style={{ padding: '1.5vh 4vw', overflow: 'hidden' }}>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex-1 flex flex-col">
          {/* Header row — 6 columns: feature + 5 competitors */}
          <div className="grid flex-shrink-0" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr', background: '#1A1A2E' }}>
            <div className="text-white/60 font-semibold" style={{ padding: '1.2vh 1.5vw', fontSize: '0.72vw' }}>Feature</div>
            {cols.map(({ key, label, highlight }) => (
              <div key={key} className="text-center font-black" style={{ padding: '1.2vh 0.3vw', fontSize: '0.68vw', background: highlight ? '#F05A28' : 'transparent', color: 'white', whiteSpace: 'pre-line', lineHeight: 1.3 }}>
                {label}
              </div>
            ))}
          </div>
          {/* Data rows */}
          <div className="flex-1 flex flex-col">
            {rows.map((row, i) => (
              <div key={row.feature} className="grid flex-1" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr', background: i % 2 === 0 ? 'white' : '#F9FAFB', borderBottom: '1px solid #F3F4F6' }}>
                <div className="text-navy font-semibold flex items-center" style={{ padding: '0 1.5vw', fontSize: '0.72vw' }}>{row.feature}</div>
                {cols.map(({ key, highlight }) => (
                  <div key={key} className="flex items-center justify-center text-center" style={{ background: highlight ? 'rgba(240,90,40,0.06)' : 'transparent', fontSize: '0.7vw', whiteSpace: 'pre-line', lineHeight: 1.3, padding: '0 0.4vw' }}>
                    {row[key as keyof Row]}
                  </div>
                ))}
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
    { vs: 'Against Anki', color: '#5B6CF0', text: 'Anki requires a separate desktop app and AnkiWeb subscription for sync. It has a steep learning curve and no auto-dictionary lookup. Vocabulary Builder offers the same SM-2 algorithm in a clean browser interface with automatic definitions, synonyms, and audio — at a lower cost.' },
    { vs: 'Against Quizlet', color: '#9B5CF6', text: 'Quizlet\'s free tier is increasingly limited, and its "spaced repetition" is basic compared to true SM-2. CSV import is only on paid plans. Vocabulary Builder offers deeper SRS, automatic word enrichment, and is purpose-built for professional vocabulary — not just student flashcards.' },
    { vs: 'Against Duolingo / Babbel', color: '#10B981', text: 'Those are designed for complete language beginners following a fixed curriculum. They cannot be customized with your own industry vocabulary. Vocabulary Builder is for professionals who already know conversational English and need to master the specific vocabulary of their field.' },
    { vs: 'Against generic apps in Vietnam', color: '#F05A28', text: 'No other app combines SM-2 SRS + industry CSV import + auto-dictionary lookup + VietQR payment + a Vietnamese B2B admin console in one product.' },
  ];
  return (
    <div className="slide-root flex flex-col" style={{ background: 'linear-gradient(160deg, #1A1A2E 0%, #0F3460 100%)' }}>
      <Header title="The Core Competitive Argument" num={13} bg="#F05A28" />
      <div className="flex-1 grid grid-cols-2 gap-4" style={{ padding: '2.5vh 5vw' }}>
        {args.map(({ vs, color, text }) => (
          <div key={vs} className="rounded-2xl flex flex-col" style={{ background: 'rgba(255,255,255,0.07)', border: `1px solid ${color}50`, padding: '2vh 2.5vw' }}>
            <div className="font-black text-white inline-flex rounded-lg mb-3 self-start" style={{ background: color, padding: '0.3vh 1vw', fontSize: '0.78vw' }}>{vs}</div>
            <p className="text-white/75 leading-relaxed" style={{ fontSize: '0.82vw', lineHeight: 1.7 }}>{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── S14: Summary ───────────────────────────────────────────────── */
function S14() {
  const diffs = [
    { title: 'True SM-2 Spaced Repetition', color: '#F05A28' },
    { title: 'CSV Bulk Import', color: '#5B6CF0' },
    { title: 'VietQR + Paddle Payments', color: '#FFC107' },
    { title: 'Full Admin B2B Console', color: '#10B981' },
  ];
  return (
    <div className="slide-root flex flex-col" style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)' }}>
      <div className="h-1.5 bg-brand w-full flex-shrink-0" />
      <div className="flex-1 flex flex-col items-center justify-center" style={{ padding: '4vh 8vw' }}>
        <div className="text-brand font-semibold uppercase tracking-widest mb-4" style={{ fontSize: '0.78vw' }}>Summary</div>
        <h1 className="text-white font-black text-center leading-tight" style={{ fontSize: '4vw' }}>
          One App. Every Industry.<br /><span className="text-brand">Every Word.</span>
        </h1>
        <div className="grid grid-cols-4 gap-5 mt-10" style={{ width: '80vw' }}>
          {diffs.map(({ title, color }) => (
            <div key={title} className="rounded-2xl flex flex-col items-center" style={{ background: 'rgba(255,255,255,0.07)', border: `1px solid ${color}50`, padding: '3vh 2vw' }}>
              <div className="rounded-xl mb-3" style={{ background: color, width: 36, height: 36 }} />
              <div className="text-white font-black text-center" style={{ fontSize: '0.9vw' }}>{title}</div>
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
    <div className="flex flex-col bg-black" style={{ width: '100vw', height: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="flex-1 relative overflow-hidden"><SlideComp /></div>
      <div className="flex items-center justify-between bg-gray-950 border-t border-white/10 flex-shrink-0" style={{ padding: '0 20px', height: 48 }}>
        <button onClick={() => setCur(c => Math.max(c-1,0))} disabled={cur===0}
          className="flex items-center gap-2 text-sm font-semibold text-white/60 disabled:text-white/20 hover:text-white transition-colors"
          style={{ background:'none', border:'none', cursor: cur===0?'not-allowed':'pointer', padding:'8px 12px' }}>
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
