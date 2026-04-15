// Standalone script — run with: node scripts/generate-feature-analysis-pdf.cjs
// Generates: downloads/VB-Feature-Analysis.pdf
// Content source: attached_assets/VB_market_analysis_v1_1776227541634.pdf

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const W = 720, H = 405;
const NAVY   = '#1A1A2E';
const ORANGE = '#F05A28';
const AMBER  = '#FFC107';
const LGRAY  = '#F8F9FA';
const MGRAY  = '#6B7280';
const DKGRAY = '#374151';
const WHITE  = '#FFFFFF';

const outDir = path.join(__dirname, '..', 'downloads');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, 'VB-Feature-Analysis.pdf');

const doc = new PDFDocument({ size: [W, H], margin: 0, autoFirstPage: false });
const stream = fs.createWriteStream(outPath);
doc.pipe(stream);

// ── Helpers ───────────────────────────────────────────────────────
function bg(color) { doc.rect(0,0,W,H).fill(color); }
function rect(x,y,w,h,color) { doc.rect(x,y,w,h).fill(color); }
function accent() { rect(0,0,W,3,ORANGE); }

function slideHeader(title, num, bg2 = NAVY) {
  bg(LGRAY);
  rect(0,0,W,52,bg2);
  accent();
  doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(17).text(title, 28, 16, { width: W - 80 });
  doc.fillColor(WHITE+'20').font('Helvetica-Bold').fontSize(28).text(String(num).padStart(2,'0'), W-58, 7, { width:50, align:'right' });
}

function footer() {
  doc.fillColor(MGRAY).font('Helvetica').fontSize(7).text('ace.apps.44@gmail.com', 28, H-14, { width: W/2 });
  doc.fillColor(MGRAY).font('Helvetica').fontSize(7).text('Vocabulary Builder — ACE-Apps', 0, H-14, { width: W-28, align:'right' });
}

function bullet(label, x, y, w, color) {
  doc.circle(x+4, y+4, 3).fill(color || ORANGE);
  doc.fillColor(DKGRAY).font('Helvetica').fontSize(8).text(label, x+12, y, { width: w-12, lineGap:1 });
  return doc.y + 2;
}

function card(x, y, w, h, color) {
  doc.rect(x,y,w,h).fill(WHITE);
  doc.rect(x,y,w,4).fill(color || ORANGE);
}

// ─────────────────────────────────────────────────────────────────
// S01 — COVER
// ─────────────────────────────────────────────────────────────────
doc.addPage();
bg(NAVY);
accent();
doc.rect(0,0,W,3).fill(ORANGE);
doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(30).text('Vocabulary Builder', 0, 90, { width: W, align: 'center' });
doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(24).text('Full Feature Analysis', 0, 128, { width: W, align: 'center' });
doc.fillColor(WHITE+'66').font('Helvetica').fontSize(11).text('A technical & competitive deep-dive', 0, 165, { width: W, align: 'center' });

// Tags
const tags = ['Science-Backed','B2B-Ready','Vietnam-Focused'];
let allW = 0;
tags.forEach(t => { allW += doc.widthOfString(t) + 26 + 10; });
let tx = (W - allW + 10) / 2;
tags.forEach(tag => {
  const tw = doc.widthOfString(tag) + 26;
  doc.rect(tx, 206, tw, 18).fill(ORANGE+'33');
  doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(7.5).text(tag, tx + 13, 211, { width: tw - 26 });
  tx += tw + 10;
});

footer();

// ─────────────────────────────────────────────────────────────────
// S02 — SM-2 ALGORITHM
// ─────────────────────────────────────────────────────────────────
doc.addPage();
slideHeader('Spaced Repetition System (SM-2 Algorithm)', 2);

doc.fillColor(DKGRAY).font('Helvetica').fontSize(8.5).text(
  'This is the same algorithm used by Anki, widely considered the gold standard in memory science. The app tracks three per-word variables:',
  28, 65, { width: W - 56 }
);

const vars = [
  { title: 'Ease Factor', val: '2.5', sub: 'Starting value', desc: 'Starts at 2.5. Multiplied by the review interval after each recall. Increases with strong recall, decreases with poor recall.' },
  { title: 'Review Interval', val: 'Days', sub: 'Days until next review', desc: 'Number of days before the word is shown again. Grows after each successful recall.' },
  { title: 'Review Count', val: 'N+', sub: 'Per word', desc: 'The number of times a word has been reviewed. Used with accuracy to determine mastery level.' },
];
const bw2 = (W - 72) / 3;
vars.forEach(({ title, val, sub, desc }, i) => {
  const bx = 24 + i * (bw2 + 12);
  const by = 98;
  doc.rect(bx, by, bw2, 158).fill(WHITE);
  doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(10).text(title, bx+10, by+10, { width: bw2-20 });
  doc.fillColor(MGRAY).font('Helvetica').fontSize(6.5).text(sub, bx+10, by+25, { width: bw2-20 });
  doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(22).text(val, bx+10, by+38, { width: bw2-20, align:'right' });
  doc.rect(bx+10, by+72, bw2-20, 74).fill(LGRAY);
  doc.fillColor(DKGRAY).font('Helvetica').fontSize(7).text(desc, bx+16, by+79, { width: bw2-32, lineGap:1 });
});

// Bottom paragraph from source
doc.rect(24, 268, W-48, 32).fill(NAVY);
doc.fillColor(WHITE).font('Helvetica').fontSize(8.5).text(
  'Poor recall resets the interval; strong recall extends it exponentially — optimizing long-term retention while minimizing study time.',
  36, 276, { width: W-72, align:'center' }
);

footer();

// ─────────────────────────────────────────────────────────────────
// S03 — MASTERY LEVELS + FLASHCARD MODE
// ─────────────────────────────────────────────────────────────────
doc.addPage();
slideHeader('Three Mastery Levels & Flashcard Mode', 3, ORANGE);

const levels = [
  { name: 'Learning', color: '#6B7280', req: 'Default for new words' },
  { name: 'Reviewing', color: ORANGE, req: 'Reached after 3+ reviews with ≥70% accuracy' },
  { name: 'Mastered', color: '#10B981', req: 'Reached after 10+ reviews with ≥90% accuracy and a ≥30-day review interval' },
];
levels.forEach(({ name, color, req }, i) => {
  const ly = 62 + i * 64;
  doc.rect(24, ly, 310, 50).fill(WHITE);
  doc.circle(50, ly+25, 8).fill(color);
  doc.fillColor(color).font('Helvetica-Bold').fontSize(12).text(name, 70, ly+9, { width: 250 });
  doc.fillColor(MGRAY).font('Helvetica').fontSize(7.5).text(req, 70, ly+27, { width: 250 });
});

// Flashcard column
const fx = 350;
doc.rect(fx, 62, W-fx-24, 292).fill(NAVY);
doc.rect(fx, 62, 3, 292).fill(ORANGE);
doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(8).text('FLASHCARD MODE', fx+14, 74);
doc.fillColor(WHITE+'77').font('Helvetica').fontSize(8).text(
  'Front/back card review with audio pronunciation (fetched from the dictionary API) and example sentences. Integrated directly with the SM-2 engine so every flip updates that word\'s review schedule.',
  fx+14, 96, { width: W-fx-38, lineGap:2 }
);

footer();

// ─────────────────────────────────────────────────────────────────
// S04 — QUIZ MODE + DAILY STREAK
// ─────────────────────────────────────────────────────────────────
doc.addPage();
slideHeader('Quiz Mode & Daily Streak Tracking', 4);

doc.rect(24, 62, 330, 292).fill(WHITE);
doc.rect(24, 62, 330, 24).fill(NAVY);
doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(9.5).text('Quiz Mode', 36, 70);
doc.fillColor(DKGRAY).font('Helvetica').fontSize(8.5).text(
  'Multiple-choice format. Up to 10 words per session drawn from the user\'s active list. Shows the definition, user selects the correct word from 4 options. Tracks score and percentage at the end.',
  36, 98, { width: 306, lineGap:2 }
);

doc.rect(368, 62, W-392, 292).fill(NAVY);
doc.rect(368, 62, 3, 292).fill(AMBER);
doc.fillColor(AMBER).font('Helvetica-Bold').fontSize(9.5).text('Daily Streak Tracking', 382, 70);
doc.fillColor(WHITE+'88').font('Helvetica').fontSize(8.5).text(
  'Day-over-day consistency is measured and displayed. The streak increments for consecutive calendar days of activity and resets if a day is missed — a proven motivational mechanic.',
  382, 98, { width: W-420, lineGap:2 }
);

footer();

// ─────────────────────────────────────────────────────────────────
// S05 — WORD & CONTENT MANAGEMENT
// ─────────────────────────────────────────────────────────────────
doc.addPage();
slideHeader('Word & Content Management', 5, ORANGE);

const sections = [
  { title: 'Manual Word Entry', items: [
    'Word, definition, example sentence, and custom tags — all user-controlled',
    'Words can be edited or deleted at any time',
  ]},
  { title: 'Search & Filter', text: 'Live search across word and definition fields. Filterable by mastery level and tags.' },
  { title: 'Tag System', text: 'Custom tags per word (or per import batch) for organizing vocabulary by topic, unit, or source.' },
];

let sy = 66;
sections.forEach(({ title, items, text }) => {
  doc.rect(24, sy, W-48, items ? items.length*28 + 40 : 56).fill(WHITE);
  doc.rect(24, sy, W-48, 22).fill(NAVY);
  doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(8.5).text(title, 36, sy+7, { width: W-72 });
  if (items) {
    items.forEach((item, j) => {
      bullet(item, 36, sy + 32 + j*28, W-72, NAVY);
    });
    sy += items.length*28 + 50;
  } else {
    doc.fillColor(DKGRAY).font('Helvetica').fontSize(8).text(text, 36, sy+30, { width: W-72 });
    sy += 68;
  }
});

footer();

// ─────────────────────────────────────────────────────────────────
// S06 — AUTOMATIC DICTIONARY LOOKUP
// ─────────────────────────────────────────────────────────────────
doc.addPage();
slideHeader('Automatic Dictionary Lookup', 6);

doc.rect(24, 62, W-48, 290).fill(WHITE);
doc.fillColor(DKGRAY).font('Helvetica').fontSize(9.5).text(
  'When a user adds a word, the app queries a dictionary API (proxied through the backend) to auto-populate definitions, example sentences, phonetic pronunciation, and audio.',
  42, 84, { width: W-84, lineGap:2 }
);
doc.fillColor(DKGRAY).font('Helvetica').fontSize(9.5).text(
  'The Datamuse API is also queried for synonyms and antonyms.',
  42, 144, { width: W-84, lineGap:2 }
);
doc.fillColor(DKGRAY).font('Helvetica').fontSize(9.5).text(
  'Users can also manually trigger the "Word Lookup" view to search any word before adding it.',
  42, 180, { width: W-84, lineGap:2 }
);

footer();

// ─────────────────────────────────────────────────────────────────
// S07 — CSV BULK IMPORT
// ─────────────────────────────────────────────────────────────────
doc.addPage();
slideHeader('CSV Bulk Import', 7, ORANGE);

doc.fillColor(DKGRAY).font('Helvetica').fontSize(8.5).text(
  'Users upload a file with columns: word, definition, sentence. The app:',
  28, 62, { width: W-56 }
);

const csvBullets = [
  'Auto-detects whether a header row is present',
  'Recognizes common header variations ("term", "vocab", "meaning", "phrase", etc.)',
  'Skips duplicates (already in the user\'s list)',
  'Skips rows missing word or definition',
  'Shows a preview with counts (valid, duplicates, invalid) before committing',
  'Lets users apply a tag to the entire import batch',
];
const colW = (W-60) / 2;
csvBullets.forEach((b, i) => {
  const col = i < 3 ? 0 : 1;
  const row = i % 3;
  const bx = 24 + col*(colW+12);
  const by = 84 + row*70;
  doc.rect(bx, by, colW, 60).fill(WHITE);
  doc.rect(bx, by, colW, 22).fill(NAVY+'CC');
  doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(7.5).text(String(i+1), bx+8, by+7, { width:22 });
  doc.fillColor(WHITE).font('Helvetica').fontSize(7.5).text(b, bx+32, by+7, { width: colW-44 });
  // small desc area
});

doc.rect(24, 302, W-48, 24).fill(ORANGE);
doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(8.5).text(
  'This is the key feature for businesses who want to load industry-specific word lists.',
  36, 308, { width: W-72, align:'center' }
);

footer();

// ─────────────────────────────────────────────────────────────────
// S08 — DATA & SYNC
// ─────────────────────────────────────────────────────────────────
doc.addPage();
slideHeader('Data & Sync', 8);

// Firestore box
doc.rect(24, 62, 326, 296).fill(WHITE);
doc.rect(24, 62, 326, 24).fill(NAVY);
doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(8.5).text('Cloud Storage — Firebase Firestore', 36, 70, { width: 302 });
doc.fillColor(DKGRAY).font('Helvetica').fontSize(8).text(
  'Every word and its entire review history is stored in Firebase\'s real-time NoSQL cloud database, tied to the authenticated user\'s UID. This means:',
  36, 96, { width: 302, lineGap:2 }
);
let fy = 136;
['Words are synced in real time across every device the user logs into','No manual backup needed','Data persists if the user reinstalls the app or switches phones/computers'].forEach(item => {
  fy = bullet(item, 36, fy, 302, NAVY) + 10;
});

// PostgreSQL box
const px = 364;
doc.rect(px, 62, W-px-24, 296).fill(NAVY);
doc.rect(px, 62, 3, 296).fill(ORANGE);
doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(8.5).text('Subscriber Registry — PostgreSQL', px+14, 70, { width: W-px-38 });
doc.fillColor(WHITE+'88').font('Helvetica').fontSize(8).text(
  'A separate server-side database (PostgreSQL) maintains subscription status, trial dates, admin grants, and payment records. This is used by the admin panel and survives server restarts and redeployments — unlike file-based storage that some competing apps use.',
  px+14, 96, { width: W-px-38, lineGap:2 }
);

footer();

// ─────────────────────────────────────────────────────────────────
// S09 — AUTHENTICATION + SECURITY
// ─────────────────────────────────────────────────────────────────
doc.addPage();
slideHeader('Authentication & Security', 9, ORANGE);

// Auth box
doc.rect(24, 62, 326, 296).fill(WHITE);
doc.rect(24, 62, 326, 24).fill(NAVY);
doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(8.5).text('Authentication', 36, 70);
const authItems = [
  ['Email + Password', 'signup and login'],
  ['Password reset', 'via email'],
  ['Anonymous sign-in', 'for the direct checkout flow (no friction for purchasers)'],
  ['Session persistence', '— users stay logged in across browser sessions'],
];
let ay = 96;
authItems.forEach(([bold, rest]) => {
  doc.rect(36, ay, 302, 48).fill(LGRAY);
  doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(8).text(bold + '  ', 46, ay+7, { continued: true, width: 280 });
  doc.fillColor(MGRAY).font('Helvetica').fontSize(8).text(rest, { width: 280 });
  ay += 58;
});

// Security box
const sx = 364;
doc.rect(sx, 62, W-sx-24, 296).fill(WHITE);
doc.rect(sx, 62, W-sx-24, 24).fill(NAVY);
doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(8.5).text('Security', sx+12, 70);
const secItems = [
  'Helmet.js HTTP security headers',
  'API rate limiting',
  'Webhook signature verification (Paddle webhooks are validated before processing)',
  'Firebase Security Rules restrict each user\'s data to their own UID',
  'Admin password stored as an environment secret, never hardcoded',
];
let scy = 96;
secItems.forEach(item => {
  scy = bullet(item, sx+12, scy, W-sx-36, ORANGE) + 12;
});

footer();

// ─────────────────────────────────────────────────────────────────
// S10 — PAYMENTS & BUSINESS MODEL
// ─────────────────────────────────────────────────────────────────
doc.addPage();
bg(NAVY);
accent();
doc.rect(0,0,W,52).fill(ORANGE);
doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(17).text('Payments & Business Model', 28, 16, { width: W-80 });
doc.fillColor(WHITE+'20').font('Helvetica-Bold').fontSize(28).text('10', W-58, 7, { width:50, align:'right' });

// Pricing panel
doc.rect(20, 62, 220, 306).fill('#FFFFFF08');
doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(7.5).text('PRICING', 34, 74);
doc.fillColor(AMBER).font('Helvetica-Bold').fontSize(24).text('500,000 ₫', 34, 92, { width: 196, align:'center' });
doc.fillColor(WHITE+'66').font('Helvetica').fontSize(7).text('per 6 months · ≈$19 USD', 34, 122, { width: 196, align:'center' });
doc.fillColor(WHITE+'77').font('Helvetica').fontSize(7.5).text('+ 10% VAT for Vietnamese purchasers.\nTotal: 550,000 ₫.', 34, 142, { width: 196 });
doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(7.5).text('7-Day Free Trial', 34, 180);
doc.fillColor(WHITE+'55').font('Helvetica').fontSize(7).text('Standard access flow. Full features from day one.', 34, 193, { width: 196 });
doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(7.5).text('Direct Subscription', 34, 220);
doc.fillColor(WHITE+'55').font('Helvetica').fontSize(7).text('"Skip Trial" flow for businesses and employees who want to pay immediately without a trial.', 34, 233, { width: 196, lineGap:1 });

// Paddle panel
doc.rect(252, 62, 218, 306).fill('#FFFFFF08');
doc.fillColor(WHITE+'55').font('Helvetica-Bold').fontSize(7.5).text('PADDLE (GLOBAL PAYMENT PROCESSOR)', 266, 74, { width: 190 });
doc.fillColor(WHITE+'88').font('Helvetica').fontSize(8).text(
  'Handles credit/debit cards, Apple Pay, Google Pay, and PayPal. Paddle manages tax compliance, recurring billing, cancellations, and refunds globally.',
  266, 92, { width: 190, lineGap:2 }
);

// VietQR panel
doc.rect(482, 62, W-506, 306).fill('#FFFFFF08');
doc.fillColor(AMBER).font('Helvetica-Bold').fontSize(7.5).text('VIETQR / TECHCOMBANK', 496, 74, { width: W-530 });
doc.fillColor(WHITE+'88').font('Helvetica').fontSize(8).text(
  'Local Vietnamese bank transfer option. The user enters their email, the QR code is revealed, they transfer via any Vietnamese banking app, and the admin activates the account. This is critical for the Vietnamese B2B market where many businesses still prefer bank transfer over card.',
  496, 92, { width: W-530, lineGap:2 }
);

footer();

// ─────────────────────────────────────────────────────────────────
// S11 — UI & UX
// ─────────────────────────────────────────────────────────────────
doc.addPage();
slideHeader('UI & User Experience', 11);

const uiCards = [
  { title: 'Mobile-First Design', desc: 'Built specifically to feel like a native mobile app in the browser. Vertical navigation, touch-friendly card sizes, 3D button press effects.' },
  { title: 'Dark Mode', desc: 'Full dark/light mode toggle with preference saved to the browser. Every color, border, and gradient is theme-aware.' },
  { title: 'Responsive Layout', desc: 'Works on phone, tablet, and desktop browsers without a separate mobile app.' },
  { title: 'No App Store Required', desc: 'Runs entirely in the browser — no installation, no App Store approval, no update process for the user.' },
  { title: 'Progressive Loading', desc: 'Splash screen while Firebase initializes. "Checking access..." screen while subscription loads. Prevents blank/broken states.' },
];
const uw = (W-60) / 5;
uiCards.forEach(({ title, desc }, i) => {
  const ux = 24 + i*(uw+3);
  doc.rect(ux, 62, uw, 298).fill(WHITE);
  doc.rect(ux, 62, uw, 5).fill(ORANGE);
  doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(8.5).text(title, ux+10, 82, { width: uw-20 });
  doc.fillColor(MGRAY).font('Helvetica').fontSize(7).text(desc, ux+10, 108, { width: uw-20, lineGap:2 });
});

footer();

// ─────────────────────────────────────────────────────────────────
// S12 — COMPETITIVE COMPARISON TABLE
// ─────────────────────────────────────────────────────────────────
doc.addPage();
slideHeader('Where This App Stands vs. Competitors', 12, ORANGE);

// Exact values from source PDF
const colHeaders = ['Feature','Vocabulary\nBuilder','Anki','Quizlet','Duolingo','Memrise'];
const colWidths = [170, 80, 70, 70, 70, 60];
const tableRows = [
  ['SM-2 Spaced Repetition',       '✅ Full',        '✅ Full',           '❌ Basic',        '❌ Gamified',     '✅ Partial'],
  ['CSV Industry Word Import',      '✅ Yes',         '✅ (complex)',      '✅ (paid tier)',  '❌',              '❌'],
  ['Auto Dictionary + Audio',       '✅ Yes',         '❌ Manual',        '✅ Limited',      '✅ Built-in',     '✅ Limited'],
  ['Synonyms / Antonyms',           '✅ Yes',         '❌',               '❌',              '❌',              '❌'],
  ['Cross-Device Cloud Sync',       '✅ Realtime',    '⚠️ AnkiWeb (paid)','✅ Yes',          '✅ Yes',          '✅ Yes'],
  ['Works in Browser (no install)', '✅ Yes',         '❌ App required',  '✅ Yes',          '✅ Yes',          '✅ Yes'],
  ['Dark Mode',                     '✅ Yes',         '✅ Yes',            '✅ Yes',          '❌',              '❌'],
  ['Vietnamese Bank Payment',       '✅ VietQR',      '❌',               '❌',              '❌',              '❌'],
  ['Admin Override / B2B Console',  '✅ Full panel',  '❌',               '❌',              '❌',              '❌'],
  ['Industry-Specific Focus',       '✅ Designed for it','⚠️ General',    '⚠️ General',     '❌ Consumer only','⚠️ General'],
  ['One-Time Bulk Team Setup',      '✅ CSV batch',   '⚠️ Manual',       '⚠️ Limited',      '❌',              '❌'],
  ['Price (6 months)',              '~$19',           'Free / $25/yr\n(sync)','$35.99/yr', '$79.99/yr',      '$59.99/yr'],
];
const rowH = 22;
let ty = 56;

// Header
let cx = 20;
colHeaders.forEach((h, i) => {
  const hbg = i === 1 ? ORANGE : NAVY;
  doc.rect(cx, ty, colWidths[i], 28).fill(hbg);
  doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(i===0?7.5:6.5).text(h, cx+4, ty+(i===0?10:3), { width: colWidths[i]-8, align: i===0?'left':'center', lineGap:1 });
  cx += colWidths[i];
});
ty += 28;

tableRows.forEach((row, ri) => {
  let rcx = 20;
  row.forEach((cell, ci) => {
    const cellBg = ci===1 ? (ri%2===0 ? '#FFF5F2' : '#FFE8E0') : (ri%2===0 ? WHITE : LGRAY);
    doc.rect(rcx, ty, colWidths[ci], rowH).fill(cellBg);
    if (ci === 0) {
      doc.fillColor(DKGRAY).font('Helvetica').fontSize(7).text(cell, rcx+6, ty+7, { width: colWidths[ci]-12 });
    } else {
      doc.fillColor(DKGRAY).font('Helvetica').fontSize(ci===1?7.5:6.5).text(cell, rcx, ty+4, { width: colWidths[ci], align:'center', lineGap:0.5 });
    }
    rcx += colWidths[ci];
  });
  ty += rowH;
});

footer();

// ─────────────────────────────────────────────────────────────────
// S13 — COMPETITIVE ARGUMENTS
// ─────────────────────────────────────────────────────────────────
doc.addPage();
bg(NAVY);
accent();
doc.rect(0,0,W,52).fill(ORANGE);
doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(17).text('The Core Competitive Argument', 28, 16, { width: W-80 });
doc.fillColor(WHITE+'20').font('Helvetica-Bold').fontSize(28).text('13', W-58, 7, { width:50, align:'right' });

const args = [
  { vs: 'Against Anki', color: '#5B6CF0', text: 'Anki requires a separate desktop app and AnkiWeb subscription for sync. It has a steep learning curve and no auto-dictionary lookup. Vocabulary Builder offers the same SM-2 algorithm in a clean browser interface with automatic definitions, synonyms, and audio — at a lower cost.' },
  { vs: 'Against Quizlet', color: '#9B5CF6', text: 'Quizlet\'s free tier is increasingly limited, and its "spaced repetition" is basic compared to true SM-2. CSV import is only on paid plans. Vocabulary Builder offers deeper SRS, automatic word enrichment, and is purpose-built for professional vocabulary — not just student flashcards.' },
  { vs: 'Against Duolingo / Babbel', color: '#10B981', text: 'Those are designed for complete language beginners following a fixed curriculum. They cannot be customized with your own industry vocabulary. Vocabulary Builder is for professionals who already know conversational English and need to master the specific vocabulary of their field.' },
  { vs: 'Against generic apps in Vietnam', color: '#F05A28', text: 'No other app combines SM-2 SRS + industry CSV import + auto-dictionary lookup + VietQR payment + a Vietnamese B2B admin console in one product.' },
];

args.forEach(({ vs, color, text }, i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const ax = 20 + col * 348;
  const ay = 62 + row * 170;
  doc.rect(ax, ay, 330, 155).fill('#FFFFFF08');
  // Badge
  const bw = doc.widthOfString(vs) + 20;
  doc.rect(ax+12, ay+12, bw, 18).fill(color);
  doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(7.5).text(vs, ax+12, ay+16, { width: bw, align:'center' });
  doc.fillColor(WHITE+'88').font('Helvetica').fontSize(8).text(text, ax+12, ay+42, { width: 306, lineGap:2 });
});

footer();

// ─────────────────────────────────────────────────────────────────
// S14 — SUMMARY
// ─────────────────────────────────────────────────────────────────
doc.addPage();
bg(NAVY);
accent();

doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(8).text('SUMMARY', 0, 60, { width: W, align:'center' });
doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(30).text('One App. Every Industry.', 0, 80, { width: W, align:'center' });
doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(30).text('Every Word.', 0, 116, { width: W, align:'center' });

const diffs = [
  { title: 'True SM-2\nSpaced Repetition', color: ORANGE },
  { title: 'CSV Bulk Import', color: '#5B6CF0' },
  { title: 'VietQR +\nPaddle Payments', color: AMBER },
  { title: 'Full Admin\nB2B Console', color: '#10B981' },
];
const dw = (W-80) / 4;
diffs.forEach(({ title, color }, i) => {
  const dx = 24 + i*(dw+8);
  doc.rect(dx, 178, dw, 162).fill('#FFFFFF08');
  doc.rect(dx, 178, dw, 5).fill(color);
  doc.rect(dx+10, 196, 30, 30).fill(color);
  doc.fillColor(color).font('Helvetica-Bold').fontSize(9).text(title, dx+8, 240, { width: dw-16 });
});

footer();

// ── Finalize ──────────────────────────────────────────────────────
doc.end();
stream.on('finish', () => { console.log('PDF written to:', outPath); });
stream.on('error', (err) => { console.error('Error:', err); process.exit(1); });
