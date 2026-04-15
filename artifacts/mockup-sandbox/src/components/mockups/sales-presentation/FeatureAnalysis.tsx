import './_group.css';
import { useState } from 'react';

const NAVY = '#1A1A2E';
const ORANGE = '#F05A28';
const AMBER = '#FFC107';
const LGRAY = '#F8F9FA';

function Nav({ cur, total, onPrev, onNext, title }: { cur: number; total: number; onPrev: () => void; onNext: () => void; title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#111', borderTop: '1px solid #333', padding: '0 20px', height: 44, flexShrink: 0, fontFamily: 'system-ui' }}>
      <button onClick={onPrev} disabled={cur === 0} style={{ background: 'none', border: 'none', color: cur === 0 ? '#555' : '#fff', cursor: cur === 0 ? 'default' : 'pointer', fontSize: 13, fontWeight: 600 }}>← Prev</button>
      <span style={{ color: '#888', fontSize: 12 }}>{title} &nbsp;|&nbsp; {cur + 1} / {total}</span>
      <button onClick={onNext} disabled={cur === total - 1} style={{ background: 'none', border: 'none', color: cur === total - 1 ? '#555' : '#fff', cursor: cur === total - 1 ? 'default' : 'pointer', fontSize: 13, fontWeight: 600 }}>Next →</button>
    </div>
  );
}

function SlideShell({ children, bg = LGRAY }: { children: React.ReactNode; bg?: string }) {
  return <div style={{ flex: 1, background: bg, display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: 'system-ui' }}>{children}</div>;
}

function SlideHeader({ title, num, bg: bgColor = NAVY }: { title: string; num: number; bg?: string }) {
  return (
    <div style={{ background: bgColor, padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
      <div style={{ borderTop: `3px solid ${ORANGE}`, paddingTop: 6, color: '#fff', fontWeight: 800, fontSize: 18 }}>{title}</div>
      <div style={{ color: 'rgba(255,255,255,0.15)', fontWeight: 900, fontSize: 36 }}>{String(num).padStart(2, '0')}</div>
    </div>
  );
}

function SlideFooter() {
  return <div style={{ borderTop: '1px solid #ddd', padding: '6px 32px', display: 'flex', justifyContent: 'space-between', flexShrink: 0 }}>
    <span style={{ color: '#aaa', fontSize: 11 }}>ace.apps.44@gmail.com</span>
    <span style={{ color: '#aaa', fontSize: 11 }}>Vocabulary Builder — ACE-Apps</span>
  </div>;
}

function Card({ title, children, accent = ORANGE, flex }: { title?: string; children: React.ReactNode; accent?: string; flex?: number }) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden', display: 'flex', flexDirection: 'column', flex }}>
      {title && <div style={{ background: NAVY, color: '#fff', fontWeight: 700, fontSize: 12, padding: '8px 16px', borderBottom: `3px solid ${accent}` }}>{title}</div>}
      <div style={{ padding: 16, flex: 1 }}>{children}</div>
    </div>
  );
}

function BulletList({ items, color = ORANGE }: { items: string[]; color?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map(item => (
        <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: color, marginTop: 5, flexShrink: 0 }} />
          <span style={{ color: '#374151', fontSize: 13, lineHeight: 1.5 }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Slides ─────────────────────────────────────────────────────── */

function S01() {
  return (
    <SlideShell bg={NAVY}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 60px', textAlign: 'center' }}>
        <div style={{ color: ORANGE, fontWeight: 700, fontSize: 13, letterSpacing: 3, marginBottom: 16 }}>ACE-APPS</div>
        <div style={{ color: '#fff', fontWeight: 900, fontSize: 46, lineHeight: 1.1, marginBottom: 12 }}>Vocabulary Builder</div>
        <div style={{ color: ORANGE, fontWeight: 700, fontSize: 28, marginBottom: 20 }}>Full Feature Analysis</div>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', fontSize: 15, marginBottom: 36 }}>A technical &amp; competitive deep-dive</div>
        <div style={{ display: 'flex', gap: 12 }}>
          {['Science-Backed', 'B2B-Ready', 'Vietnam-Focused'].map(tag => (
            <div key={tag} style={{ border: `1px solid ${ORANGE}`, color: ORANGE, fontWeight: 600, fontSize: 12, padding: '5px 14px', borderRadius: 20 }}>{tag}</div>
          ))}
        </div>
      </div>
      <SlideFooter />
    </SlideShell>
  );
}

function S02() {
  return (
    <SlideShell>
      <SlideHeader title="The SM-2 Spaced Repetition Engine" num={2} />
      <div style={{ flex: 1, padding: '20px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{ color: '#555', fontSize: 13, margin: 0 }}>
          The same algorithm used by Anki — the gold standard in memory science. The app tracks three per-word variables:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, flex: 1 }}>
          {[
            { title: 'Ease Factor', val: '2.5', desc: 'Starts at 2.5. Multiplier applied to the interval after each recall. Increases with strong recall, decreases with poor recall.' },
            { title: 'Review Interval', val: 'Days', desc: 'Days before the word is shown again. Grows exponentially with each successful recall.' },
            { title: 'Review Count', val: 'N+', desc: 'Times a word has been reviewed. Combined with accuracy to determine mastery level promotion.' },
          ].map(({ title, val, desc }) => (
            <Card key={title} accent={ORANGE}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ color: NAVY, fontWeight: 800, fontSize: 14 }}>{title}</div>
                <div style={{ color: ORANGE, fontWeight: 900, fontSize: 28 }}>{val}</div>
              </div>
              <div style={{ background: LGRAY, borderRadius: 8, padding: '10px 12px' }}>
                <p style={{ color: '#555', fontSize: 12, margin: 0, lineHeight: 1.6 }}>{desc}</p>
              </div>
            </Card>
          ))}
        </div>
        <div style={{ background: NAVY, borderRadius: 10, padding: '12px 20px', textAlign: 'center' }}>
          <span style={{ color: '#fff', fontSize: 13 }}>Poor recall <strong style={{ color: ORANGE }}>resets the interval</strong>; strong recall <strong style={{ color: AMBER }}>extends it exponentially</strong> — optimizing long-term retention while minimizing study time.</span>
        </div>
      </div>
      <SlideFooter />
    </SlideShell>
  );
}

function S03() {
  return (
    <SlideShell>
      <SlideHeader title="Three Mastery Levels & Flashcard Mode" num={3} bg={ORANGE} />
      <div style={{ flex: 1, padding: '20px 32px', display: 'flex', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '48%' }}>
          {[
            { name: 'Learning', color: '#6B7280', req: 'Default for new words' },
            { name: 'Reviewing', color: ORANGE, req: 'Reached after 3+ reviews with ≥70% accuracy' },
            { name: 'Mastered', color: '#10B981', req: 'Reached after 10+ reviews with ≥90% accuracy and a ≥30-day review interval' },
          ].map(({ name, color, req }) => (
            <div key={name} style={{ background: '#fff', borderRadius: 10, border: '1px solid #e5e7eb', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: color, flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 800, color, fontSize: 15 }}>{name}</div>
                <div style={{ color: '#6B7280', fontSize: 12, marginTop: 2 }}>{req}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ flex: 1, background: NAVY, borderRadius: 12, padding: '20px 24px', borderLeft: `4px solid ${ORANGE}` }}>
          <div style={{ color: ORANGE, fontWeight: 700, fontSize: 11, letterSpacing: 2, marginBottom: 12 }}>FLASHCARD MODE</div>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, lineHeight: 1.8, margin: 0 }}>
            Front/back card review with audio pronunciation (fetched from the dictionary API) and example sentences. Integrated directly with the SM-2 engine so every flip updates that word's review schedule.
          </p>
        </div>
      </div>
      <SlideFooter />
    </SlideShell>
  );
}

function S04() {
  return (
    <SlideShell>
      <SlideHeader title="Quiz Mode & Daily Streak Tracking" num={4} />
      <div style={{ flex: 1, padding: '20px 32px', display: 'flex', gap: 24 }}>
        <Card title="Quiz Mode" flex={1}>
          <p style={{ color: '#374151', fontSize: 13, lineHeight: 1.8, margin: 0 }}>
            Multiple-choice format. Up to 10 words per session drawn from the user's active list. Shows the definition, user selects the correct word from 4 options. Tracks score and percentage at the end.
          </p>
        </Card>
        <div style={{ flex: 1, background: NAVY, borderRadius: 12, border: '1px solid #333', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: '#0F3460', color: AMBER, fontWeight: 700, fontSize: 12, padding: '8px 16px', borderBottom: `3px solid ${AMBER}` }}>Daily Streak Tracking</div>
          <div style={{ padding: 16, flex: 1 }}>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, lineHeight: 1.8, margin: 0 }}>
              Day-over-day consistency is measured and displayed. The streak increments for consecutive calendar days of activity and resets if a day is missed — a proven motivational mechanic.
            </p>
          </div>
        </div>
      </div>
      <SlideFooter />
    </SlideShell>
  );
}

function S05() {
  return (
    <SlideShell>
      <SlideHeader title="Word & Content Management" num={5} bg={ORANGE} />
      <div style={{ flex: 1, padding: '20px 32px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Card title="Manual Word Entry">
          <BulletList items={[
            'Word, definition, example sentence, and custom tags — all user-controlled',
            'Words can be edited or deleted at any time',
          ]} color={NAVY} />
        </Card>
        <Card title="Search & Filter">
          <p style={{ color: '#374151', fontSize: 13, margin: 0 }}>Live search across word and definition fields. Filterable by mastery level and tags.</p>
        </Card>
        <Card title="Tag System">
          <p style={{ color: '#374151', fontSize: 13, margin: 0 }}>Custom tags per word (or per import batch) for organizing vocabulary by topic, unit, or source.</p>
        </Card>
      </div>
      <SlideFooter />
    </SlideShell>
  );
}

function S06() {
  return (
    <SlideShell bg={NAVY}>
      <SlideHeader title="Automatic Dictionary Lookup" num={6} bg="#0F3460" />
      <div style={{ flex: 1, padding: '24px 32px', display: 'flex', alignItems: 'center' }}>
        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 14, border: `1px solid rgba(240,90,40,0.35)`, padding: '28px 36px', width: '100%' }}>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, lineHeight: 1.85, margin: 0 }}>
            When a user adds a word, the app queries a dictionary API (proxied through the backend) to auto-populate{' '}
            <strong style={{ color: AMBER }}>definitions, example sentences, phonetic pronunciation, and audio</strong>.
            {' '}The <strong style={{ color: ORANGE }}>Datamuse API</strong> is also queried for{' '}
            <strong style={{ color: AMBER }}>synonyms and antonyms</strong>.
            {' '}Users can also manually trigger the <strong style={{ color: ORANGE }}>"Word Lookup" view</strong> to search any word before adding it.
          </p>
        </div>
      </div>
      <SlideFooter />
    </SlideShell>
  );
}

function S07() {
  const items = [
    'Auto-detects whether a header row is present',
    "Recognizes common header variations (\"term\", \"vocab\", \"meaning\", \"phrase\", etc.)",
    "Skips duplicates (already in the user's list)",
    'Skips rows missing word or definition',
    'Shows a preview with counts (valid, duplicates, invalid) before committing',
    'Lets users apply a tag to the entire import batch',
  ];
  return (
    <SlideShell bg={NAVY}>
      <SlideHeader title="CSV Bulk Import — The Enterprise Accelerator" num={7} bg={ORANGE} />
      <div style={{ flex: 1, padding: '20px 32px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, margin: 0 }}>Users upload a file with columns: word, definition, sentence. The app:</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, flex: 1 }}>
          {items.map((item, i) => (
            <div key={item} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 10, border: '1px solid rgba(240,90,40,0.3)', padding: '12px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ background: ORANGE, color: '#fff', fontWeight: 800, fontSize: 13, width: 26, height: 26, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</div>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
        <div style={{ background: ORANGE, borderRadius: 8, padding: '10px 20px', textAlign: 'center' }}>
          <span style={{ color: '#fff', fontWeight: 600, fontSize: 13 }}>This is the key feature for businesses who want to load industry-specific word lists.</span>
        </div>
      </div>
      <SlideFooter />
    </SlideShell>
  );
}

function S08() {
  return (
    <SlideShell>
      <SlideHeader title="Data & Sync" num={8} />
      <div style={{ flex: 1, padding: '20px 32px', display: 'flex', gap: 24 }}>
        <Card title="Cloud Storage — Firebase Firestore" flex={1}>
          <p style={{ color: '#555', fontSize: 13, marginBottom: 12 }}>Every word and review history stored in Firebase's real-time NoSQL cloud database, tied to the authenticated user's UID:</p>
          <BulletList color={NAVY} items={[
            'Words are synced in real time across every device the user logs into',
            'No manual backup needed',
            'Data persists if the user reinstalls or switches devices',
          ]} />
        </Card>
        <div style={{ flex: 1, background: NAVY, borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: '#0F3460', color: '#fff', fontWeight: 700, fontSize: 12, padding: '8px 16px', borderBottom: `3px solid ${ORANGE}` }}>Subscriber Registry — PostgreSQL</div>
          <div style={{ padding: 16, flex: 1 }}>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, lineHeight: 1.8, margin: 0 }}>
              A separate server-side database (PostgreSQL) maintains subscription status, trial dates, admin grants, and payment records. This is used by the admin panel and survives server restarts and redeployments — unlike file-based storage that some competing apps use.
            </p>
          </div>
        </div>
      </div>
      <SlideFooter />
    </SlideShell>
  );
}

function S09() {
  return (
    <SlideShell>
      <SlideHeader title="Authentication & Security" num={9} bg={ORANGE} />
      <div style={{ flex: 1, padding: '20px 32px', display: 'flex', gap: 24 }}>
        <Card title="Authentication" flex={1}>
          <BulletList color={NAVY} items={[
            'Email + Password signup and login',
            'Password reset via email',
            'Anonymous sign-in for the direct checkout flow (no friction for purchasers)',
            'Session persistence — users stay logged in across browser sessions',
          ]} />
        </Card>
        <Card title="Security" flex={1}>
          <BulletList items={[
            'Helmet.js HTTP security headers',
            'API rate limiting',
            'Webhook signature verification (Paddle webhooks are validated before processing)',
            "Firebase Security Rules restrict each user's data to their own UID",
            'Admin password stored as an environment secret, never hardcoded',
          ]} />
        </Card>
      </div>
      <SlideFooter />
    </SlideShell>
  );
}

function S10() {
  return (
    <SlideShell bg={NAVY}>
      <SlideHeader title="Payments & Business Model" num={10} bg={ORANGE} />
      <div style={{ flex: 1, padding: '20px 32px', display: 'flex', gap: 16 }}>
        {[
          {
            label: 'PRICING',
            accent: ORANGE,
            content: (
              <div>
                <div style={{ color: AMBER, fontWeight: 900, fontSize: 28, textAlign: 'center', marginBottom: 4 }}>500,000 ₫</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, textAlign: 'center', marginBottom: 16 }}>per 6 months · ≈$19 USD · + 10% VAT = 550,000 ₫</div>
                <div style={{ color: ORANGE, fontWeight: 700, fontSize: 12, marginBottom: 4 }}>7-Day Free Trial</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginBottom: 14, lineHeight: 1.5 }}>Standard access flow. Full features from day one.</div>
                <div style={{ color: ORANGE, fontWeight: 700, fontSize: 12, marginBottom: 4 }}>Direct Subscription</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, lineHeight: 1.5 }}>"Skip Trial" flow for businesses who want to pay immediately.</div>
              </div>
            ),
          },
          {
            label: 'PADDLE',
            accent: '#5B6CF0',
            content: <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, lineHeight: 1.8, margin: 0 }}>Handles credit/debit cards, Apple Pay, Google Pay, and PayPal. Paddle manages tax compliance, recurring billing, cancellations, and refunds globally.</p>,
          },
          {
            label: 'VIETQR / TECHCOMBANK',
            accent: AMBER,
            content: <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, lineHeight: 1.8, margin: 0 }}>Local Vietnamese bank transfer option. The user enters their email, the QR code is revealed, they transfer via any Vietnamese banking app, and the admin activates the account. Critical for the Vietnamese B2B market.</p>,
          },
        ].map(({ label, accent, content }) => (
          <div key={label} style={{ flex: 1, background: 'rgba(255,255,255,0.07)', borderRadius: 12, borderTop: `4px solid ${accent}`, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ color: accent, fontWeight: 700, fontSize: 11, letterSpacing: 2, padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>{label}</div>
            <div style={{ padding: 16, flex: 1 }}>{content}</div>
          </div>
        ))}
      </div>
      <SlideFooter />
    </SlideShell>
  );
}

function S11() {
  const features = [
    { title: 'Mobile-First Design', desc: 'Built specifically to feel like a native mobile app in the browser. Vertical navigation, touch-friendly card sizes, 3D button press effects.', color: ORANGE },
    { title: 'Dark Mode', desc: 'Full dark/light mode toggle with preference saved to the browser. Every color, border, and gradient is theme-aware.', color: '#5B6CF0' },
    { title: 'Responsive Layout', desc: 'Works on phone, tablet, and desktop browsers without a separate mobile app.', color: '#9B5CF6' },
    { title: 'No App Store Required', desc: 'Runs entirely in the browser — no installation, no App Store approval, no update process for the user.', color: '#10B981' },
    { title: 'Progressive Loading', desc: 'Splash screen while Firebase initializes. "Checking access…" screen while subscription loads. Prevents blank/broken states.', color: AMBER },
  ];
  return (
    <SlideShell>
      <SlideHeader title="UI & User Experience" num={11} />
      <div style={{ flex: 1, padding: '20px 32px', display: 'flex', gap: 14 }}>
        {features.map(({ title, desc, color }) => (
          <div key={title} style={{ flex: 1, background: '#fff', borderRadius: 10, border: '1px solid #e5e7eb', borderTop: `4px solid ${color}`, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ color: NAVY, fontWeight: 800, fontSize: 13 }}>{title}</div>
            <div style={{ color: '#6B7280', fontSize: 12, lineHeight: 1.6 }}>{desc}</div>
          </div>
        ))}
      </div>
      <SlideFooter />
    </SlideShell>
  );
}

function S12() {
  const cols = [
    { key: 'vb', label: 'Vocabulary\nBuilder', hi: true },
    { key: 'anki', label: 'Anki', hi: false },
    { key: 'quizlet', label: 'Quizlet', hi: false },
    { key: 'duolingo', label: 'Duolingo', hi: false },
    { key: 'memrise', label: 'Memrise', hi: false },
  ];
  type R = { feature: string; vb: string; anki: string; quizlet: string; duolingo: string; memrise: string };
  const rows: R[] = [
    { feature: 'SM-2 Spaced Repetition',       vb:'✅ Full',       anki:'✅ Full',         quizlet:'❌ Basic',       duolingo:'❌ Gamified',   memrise:'✅ Partial' },
    { feature: 'CSV Industry Word Import',      vb:'✅ Yes',        anki:'✅ (complex)',    quizlet:'✅ (paid tier)', duolingo:'❌',            memrise:'❌' },
    { feature: 'Auto Dictionary + Audio',       vb:'✅ Yes',        anki:'❌ Manual',      quizlet:'✅ Limited',     duolingo:'✅ Built-in',   memrise:'✅ Limited' },
    { feature: 'Synonyms / Antonyms',           vb:'✅ Yes',        anki:'❌',             quizlet:'❌',             duolingo:'❌',            memrise:'❌' },
    { feature: 'Cross-Device Cloud Sync',       vb:'✅ Realtime',   anki:'⚠️ AnkiWeb\n(paid)', quizlet:'✅ Yes',    duolingo:'✅ Yes',        memrise:'✅ Yes' },
    { feature: 'Works in Browser (no install)', vb:'✅ Yes',        anki:'❌ App required', quizlet:'✅ Yes',        duolingo:'✅ Yes',        memrise:'✅ Yes' },
    { feature: 'Dark Mode',                     vb:'✅ Yes',        anki:'✅ Yes',          quizlet:'✅ Yes',        duolingo:'❌',            memrise:'❌' },
    { feature: 'Vietnamese Bank Payment',       vb:'✅ VietQR',     anki:'❌',             quizlet:'❌',             duolingo:'❌',            memrise:'❌' },
    { feature: 'Admin Override / B2B Console',  vb:'✅ Full panel', anki:'❌',             quizlet:'❌',             duolingo:'❌',            memrise:'❌' },
    { feature: 'Industry-Specific Focus',       vb:'✅ Yes',        anki:'⚠️ General',    quizlet:'⚠️ General',    duolingo:'❌ Consumer',   memrise:'⚠️ General' },
    { feature: 'One-Time Bulk Team Setup',      vb:'✅ CSV batch',  anki:'⚠️ Manual',     quizlet:'⚠️ Limited',    duolingo:'❌',            memrise:'❌' },
    { feature: 'Price (6 months)',              vb:'~$19',          anki:'Free / $25/yr\n(sync)', quizlet:'$35.99/yr', duolingo:'$79.99/yr', memrise:'$59.99/yr' },
  ];
  const colWidths = ['28%', '14.4%', '14.4%', '14.4%', '14.4%', '14.4%'];
  return (
    <SlideShell>
      <SlideHeader title="Where This App Stands vs. Competitors" num={12} bg={ORANGE} />
      <div style={{ flex: 1, padding: '12px 24px 8px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #e5e7eb', overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <div style={{ display: 'grid', gridTemplateColumns: colWidths.join(' '), background: NAVY, flexShrink: 0 }}>
            <div style={{ padding: '8px 12px', color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: 600 }}>Feature</div>
            {cols.map(({ key, label, hi }) => (
              <div key={key} style={{ padding: '8px 4px', textAlign: 'center', background: hi ? ORANGE : 'transparent', color: '#fff', fontSize: 11, fontWeight: 700, whiteSpace: 'pre-line', lineHeight: 1.3 }}>{label}</div>
            ))}
          </div>
          {/* Rows */}
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {rows.map((row, i) => (
              <div key={row.feature} style={{ display: 'grid', gridTemplateColumns: colWidths.join(' '), flex: 1, background: i % 2 === 0 ? '#fff' : LGRAY, borderBottom: '1px solid #f3f4f6' }}>
                <div style={{ padding: '0 12px', display: 'flex', alignItems: 'center', color: '#374151', fontSize: 11, fontWeight: 500 }}>{row.feature}</div>
                {cols.map(({ key, hi }) => (
                  <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: hi ? 'rgba(240,90,40,0.06)' : 'transparent', textAlign: 'center', color: '#374151', fontSize: 10, whiteSpace: 'pre-line', lineHeight: 1.3, padding: '0 4px' }}>
                    {row[key as keyof R]}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <SlideFooter />
    </SlideShell>
  );
}

function S13() {
  const args = [
    { vs: 'Against Anki', color: '#5B6CF0', text: "Anki requires a separate desktop app and AnkiWeb subscription for sync. It has a steep learning curve and no auto-dictionary lookup. Vocabulary Builder offers the same SM-2 algorithm in a clean browser interface with automatic definitions, synonyms, and audio — at a lower cost." },
    { vs: 'Against Quizlet', color: '#9B5CF6', text: "Quizlet's free tier is increasingly limited, and its \"spaced repetition\" is basic compared to true SM-2. CSV import is only on paid plans. Vocabulary Builder offers deeper SRS, automatic word enrichment, and is purpose-built for professional vocabulary — not just student flashcards." },
    { vs: 'Against Duolingo / Babbel', color: '#10B981', text: "Those are designed for complete language beginners following a fixed curriculum. They cannot be customized with your own industry vocabulary. Vocabulary Builder is for professionals who already know conversational English and need to master the specific vocabulary of their field." },
    { vs: 'Against generic apps in Vietnam', color: ORANGE, text: "No other app combines SM-2 SRS + industry CSV import + auto-dictionary lookup + VietQR payment + a Vietnamese B2B admin console in one product." },
  ];
  return (
    <SlideShell bg={NAVY}>
      <SlideHeader title="The Core Competitive Argument" num={13} bg={ORANGE} />
      <div style={{ flex: 1, padding: '20px 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {args.map(({ vs, color, text }) => (
          <div key={vs} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 10, border: `1px solid ${color}40`, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ background: color, color: '#fff', fontWeight: 700, fontSize: 11, padding: '4px 10px', borderRadius: 6, alignSelf: 'flex-start' }}>{vs}</div>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, lineHeight: 1.7, margin: 0 }}>{text}</p>
          </div>
        ))}
      </div>
      <SlideFooter />
    </SlideShell>
  );
}

function S14() {
  const diffs = [
    { title: 'True SM-2 Spaced Repetition', color: ORANGE },
    { title: 'CSV Bulk Import', color: '#5B6CF0' },
    { title: 'VietQR + Paddle Payments', color: AMBER },
    { title: 'Full Admin B2B Console', color: '#10B981' },
  ];
  return (
    <SlideShell bg={NAVY}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 60px', textAlign: 'center' }}>
        <div style={{ color: ORANGE, fontWeight: 700, fontSize: 12, letterSpacing: 3, marginBottom: 12 }}>SUMMARY</div>
        <div style={{ color: '#fff', fontWeight: 900, fontSize: 42, lineHeight: 1.1, marginBottom: 8 }}>One App. Every Industry.</div>
        <div style={{ color: ORANGE, fontWeight: 900, fontSize: 42, lineHeight: 1.1, marginBottom: 36 }}>Every Word.</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, width: '100%' }}>
          {diffs.map(({ title, color }) => (
            <div key={title} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 10, borderTop: `4px solid ${color}`, padding: '20px 16px', textAlign: 'center' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: color, margin: '0 auto 12px' }} />
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>{title}</div>
            </div>
          ))}
        </div>
      </div>
      <SlideFooter />
    </SlideShell>
  );
}

const SLIDES = [S01, S02, S03, S04, S05, S06, S07, S08, S09, S10, S11, S12, S13, S14];
const TITLES = ['Cover', 'SM-2 Algorithm', 'Mastery Levels & Flashcards', 'Quiz Mode & Streak', 'Word Management', 'Dictionary Lookup', 'CSV Bulk Import', 'Data & Sync', 'Auth & Security', 'Payments', 'UI & UX', 'Comparison Table', 'Competitive Arguments', 'Summary'];

export default function FeatureAnalysis() {
  const [cur, setCur] = useState(0);
  const Slide = SLIDES[cur];
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', background: '#000', fontFamily: 'system-ui' }}>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <Slide />
      </div>
      <Nav cur={cur} total={SLIDES.length} onPrev={() => setCur(c => Math.max(c - 1, 0))} onNext={() => setCur(c => Math.min(c + 1, SLIDES.length - 1))} title={TITLES[cur]} />
    </div>
  );
}

export { S01, S02, S03, S04, S05, S06, S07, S08, S09, S10, S11, S12, S13, S14, SLIDES, TITLES };
