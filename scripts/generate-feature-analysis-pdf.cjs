// Standalone script — run with: node scripts/generate-feature-analysis-pdf.js
// Generates: downloads/VB-Feature-Analysis.pdf
// No web app dependency. Uses only pdfkit.

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// ── Page dimensions (16:9 presentation) ──────────────────────────
const W = 720;
const H = 405;

// ── Brand colours ─────────────────────────────────────────────────
const NAVY   = '#1A1A2E';
const NAVY2  = '#16213E';
const ORANGE = '#F05A28';
const AMBER  = '#FFC107';
const LGRAY  = '#F8F9FA';
const MGRAY  = '#6B7280';
const WHITE  = '#FFFFFF';
const DKGRAY = '#374151';

// ── Output path ───────────────────────────────────────────────────
const outDir = path.join(__dirname, '..', 'downloads');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, 'VB-Feature-Analysis.pdf');

// ── Doc setup ─────────────────────────────────────────────────────
const doc = new PDFDocument({ size: [W, H], margin: 0, autoFirstPage: false });
const stream = fs.createWriteStream(outPath);
doc.pipe(stream);

// ── Helpers ───────────────────────────────────────────────────────
function hex(h) {
  const r = parseInt(h.slice(1,3),16);
  const g = parseInt(h.slice(3,5),16);
  const b = parseInt(h.slice(5,7),16);
  return [r,g,b];
}
function fill(color) { doc.fillColor(color); return doc; }
function stroke(color) { doc.strokeColor(color); return doc; }

function rect(x, y, w, h, color) {
  doc.rect(x,y,w,h).fill(color);
}

function text(str, x, y, opts, color) {
  if (color) doc.fillColor(color);
  doc.text(str, x, y, opts);
}

function slideHeader(title, num, bg = NAVY) {
  rect(0, 0, W, H, LGRAY);
  rect(0, 0, W, 56, bg);
  rect(0, 0, W, 3, ORANGE);
  doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(18).text(title, 28, 18, { width: W - 100 });
  doc.fillColor(WHITE + '40').font('Helvetica-Bold').fontSize(28).text(String(num).padStart(2,'0'), W - 60, 8, { width: 50, align: 'right' });
}

function slideFooter(text = 'ace.apps.44@gmail.com') {
  doc.fillColor(MGRAY).font('Helvetica').fontSize(7).text(text, 28, H - 16, { width: W - 56, align: 'left' });
  doc.text('Vocabulary Builder — ACE-Apps', 0, H - 16, { width: W - 28, align: 'right' });
}

function bullet(label, detail, x, y, w, color = ORANGE) {
  doc.circle(x + 5, y + 4, 3).fill(color);
  doc.fillColor(DKGRAY).font('Helvetica-Bold').fontSize(8).text(label + '  ', x + 14, y, { continued: true, width: w });
  doc.fillColor(MGRAY).font('Helvetica').fontSize(8).text(detail, { width: w - 14 });
  return doc.y;
}

function sectionBox(title, x, y, w, h, bg = WHITE) {
  doc.rect(x, y, w, h).fill(bg);
  doc.rect(x, y, w, 22).fill(NAVY);
  doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(9).text(title, x + 10, y + 7, { width: w - 20 });
}

function checkmark(x, y, color = ORANGE) {
  doc.circle(x + 5, y + 4, 4).fill(color);
  doc.moveTo(x + 2.5, y + 4).lineTo(x + 4.5, y + 6).lineTo(x + 8, y + 1.5).strokeColor(WHITE).lineWidth(1.2).stroke();
}

// ─────────────────────────────────────────────────────────────────
// SLIDE 01 — COVER
// ─────────────────────────────────────────────────────────────────
doc.addPage();
// Background gradient via two rects
doc.rect(0,0,W,H).fill(NAVY);
doc.rect(0,0,W,H).fill(NAVY2); // slight overlay
rect(0,0,W,3,ORANGE);

// Logo placeholder
doc.rect(28, 28, 32, 32).fill(ORANGE);
doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(7).text('ACE', 28, 35, { width: 32, align: 'center' });
doc.fillColor(WHITE).font('Helvetica').fontSize(5).text('APPS', 28, 45, { width: 32, align: 'center' });

// Title
doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(28).text('Vocabulary Builder', 28, 80, { width: W - 56 });
doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(22).text('Full Feature Analysis', 28, 115, { width: W - 56 });
doc.fillColor(WHITE + '99').font('Helvetica').fontSize(11).text('A technical & competitive deep-dive', 28, 148, { width: W - 56 });

// Tags
const tags = ['Science-Backed', 'B2B-Ready', 'Vietnam-Focused'];
let tx = 28;
tags.forEach(tag => {
  const tw = doc.widthOfString(tag) + 16;
  doc.rect(tx, 185, tw, 18).stroke(ORANGE).strokeColor(ORANGE).lineWidth(0.5);
  doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(7).text(tag, tx + 8, 190, { width: tw - 16 });
  tx += tw + 10;
});

// Stats boxes
const stats = [['14','Slides'],['5','Competitors'],['12','Feature categories']];
stats.forEach(([num, lbl], i) => {
  const bx = 28 + i * 110;
  doc.rect(bx, 225, 95, 50).fill('#FFFFFF0F');
  doc.fillColor(AMBER).font('Helvetica-Bold').fontSize(22).text(num, bx, 230, { width: 95, align: 'center' });
  doc.fillColor(WHITE + '66').font('Helvetica').fontSize(7).text(lbl, bx, 255, { width: 95, align: 'center' });
});


slideFooter();

// ─────────────────────────────────────────────────────────────────
// SLIDE 02 — SM-2 ALGORITHM
// ─────────────────────────────────────────────────────────────────
doc.addPage();
slideHeader('The SM-2 Spaced Repetition Engine', 2);

const boxData = [
  { title: 'Ease Factor', value: '2.5', sub: 'Starting value', desc: 'Multiplier applied to the review interval after each successful recall. Increases with strong recall, decreases with poor recall. Range: 1.3 – 2.5+.' },
  { title: 'Review Interval', value: 'Days', sub: 'Until next review', desc: 'Days before the word is shown again. Starts at 1 day and grows exponentially: 1 → 3 → 7 → 14 → 30 → 60+ as recall improves.' },
  { title: 'Review Count', value: 'N+', sub: 'Per word', desc: 'Number of times a word has been reviewed. Combined with accuracy to determine mastery level promotion: Learning → Reviewing → Mastered.' },
];

const bw = (W - 72) / 3;
boxData.forEach(({ title, value, sub, desc }, i) => {
  const bx = 24 + i * (bw + 12);
  const by = 72;
  doc.rect(bx, by, bw, 170).fill(WHITE);
  doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(11).text(title, bx + 10, by + 10, { width: bw - 20 });
  doc.fillColor(MGRAY).font('Helvetica').fontSize(7).text(sub, bx + 10, by + 26, { width: bw - 20 });
  doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(26).text(value, bx + 10, by + 42, { width: bw - 20, align: 'right' });
  doc.rect(bx + 10, by + 80, bw - 20, 78).fill(LGRAY);
  doc.fillColor(DKGRAY).font('Helvetica').fontSize(7.5).text(desc, bx + 16, by + 88, { width: bw - 32, lineGap: 1 });
});

// Bottom callout
doc.rect(24, 256, W - 48, 30).fill(NAVY);
doc.fillColor(WHITE).font('Helvetica').fontSize(8.5).text('Poor recall ', 34, 264, { continued: true });
doc.fillColor(ORANGE).font('Helvetica-Bold').text('resets the interval', { continued: true });
doc.fillColor(WHITE).font('Helvetica').text('; strong recall ', { continued: true });
doc.fillColor(AMBER).font('Helvetica-Bold').text('extends it exponentially', { continued: true });
doc.fillColor(WHITE).font('Helvetica').text(' — optimizing long-term retention while minimizing study time.', { width: W - 88 });

// Review timeline
const days = ['Day 1','Day 3','Day 7','Day 14','Day 30+'];
const dayColors = [ORANGE,ORANGE,'#5B6CF0','#5B6CF0','#10B981'];
days.forEach((d, i) => {
  const dx = 24 + i * 134;
  doc.rect(dx, 300, 120, 28).fill(dayColors[i] + '22');
  doc.fillColor(dayColors[i]).font('Helvetica-Bold').fontSize(9).text(d, dx, 307, { width: 120, align: 'center' });
  doc.fillColor(MGRAY).font('Helvetica').fontSize(6.5).text('Review ' + (i+1), dx, 318, { width: 120, align: 'center' });
});

slideFooter();

// ─────────────────────────────────────────────────────────────────
// SLIDE 03 — MASTERY LEVELS + FLASHCARD MODE
// ─────────────────────────────────────────────────────────────────
doc.addPage();
slideHeader('Three Mastery Levels & Flashcard Mode', 3, ORANGE);

const levels = [
  { name: 'Learning', color: '#6B7280', req: 'Default — every new word starts here.' },
  { name: 'Reviewing', color: ORANGE, req: '3+ reviews · ≥70% accuracy' },
  { name: 'Mastered', color: '#10B981', req: '10+ reviews · ≥90% accuracy · ≥30-day interval' },
];
levels.forEach(({ name, color, req }, i) => {
  const ly = 74 + i * 58;
  doc.rect(24, ly, 310, 46).fill(WHITE);
  doc.circle(50, ly + 23, 14).fill(color + '22');
  doc.circle(50, ly + 23, 6).fill(color);
  doc.fillColor(color).font('Helvetica-Bold').fontSize(12).text(name, 74, ly + 8, { width: 200 });
  doc.fillColor(MGRAY).font('Helvetica').fontSize(7.5).text(req, 74, ly + 25, { width: 230 });
  const badge = name === 'Learning' ? 'Start' : name === 'Reviewing' ? 'Progressing' : 'Complete';
  const bw2 = doc.widthOfString(badge) + 14;
  doc.rect(280, ly + 13, bw2, 16).fill(color);
  doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(6.5).text(badge, 280, ly + 18, { width: bw2, align: 'center' });
});

// Flashcard column
const fc = 360;
doc.rect(fc, 62, W - fc - 24, 280).fill(NAVY);
doc.rect(fc, 62, 3, 280).fill(ORANGE);
doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(8).text('FLASHCARD MODE', fc + 14, 74);

// Front card
doc.rect(fc + 14, 90, W - fc - 52, 72).fill('#FFFFFF10');
doc.fillColor(WHITE + '66').font('Helvetica').fontSize(6.5).text('Front of card', fc + 22, 98);
doc.fillColor(AMBER).font('Helvetica-Bold').fontSize(16).text('procurement', fc + 22, 110);
doc.fillColor(WHITE + '66').font('Helvetica').fontSize(7).text('noun  ·  /prəˈkjʊərmənt/', fc + 22, 132);

// Back card
doc.rect(fc + 14, 172, W - fc - 52, 100).fill('#FFFFFF08');
doc.fillColor(WHITE + '66').font('Helvetica').fontSize(6.5).text('Back of card (after flip)', fc + 22, 180);
doc.fillColor(WHITE).font('Helvetica').fontSize(7.5).text('The process of obtaining goods or services for a business.', fc + 22, 192, { width: W - fc - 76 });
doc.fillColor(WHITE + '55').font('Helvetica').fontSize(6.5).text('"The procurement team reduced costs by 30%."', fc + 22, 216, { width: W - fc - 76 });

// Flash features
const flashFeat = ['Front/back review with manual flip','Audio pronunciation from Dictionary API','Example sentences on back of card','SM-2 score recorded on every card flip'];
flashFeat.forEach((f, i) => {
  const fy = 282 + i * 18;
  checkmark(fc + 14, fy, ORANGE);
  doc.fillColor(WHITE + '88').font('Helvetica').fontSize(7.5).text(f, fc + 28, fy + 1, { width: W - fc - 56 });
});

slideFooter();

// ─────────────────────────────────────────────────────────────────
// SLIDE 04 — QUIZ MODE + DAILY STREAK
// ─────────────────────────────────────────────────────────────────
doc.addPage();
slideHeader('Quiz Mode & Daily Streak', 4);

// Quiz box
doc.rect(24, 66, 330, 290).fill(WHITE);
doc.rect(24, 66, 330, 28).fill(ORANGE);
doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(11).text('Quiz Mode', 54, 74);
doc.fillColor(WHITE + '88').font('Helvetica').fontSize(7).text('Multiple-choice knowledge testing', 54, 87);

const quizItems = [
  ['Format', 'Multiple choice — 4 options per question'],
  ['Session size', 'Up to 10 words per quiz session'],
  ['Question type', 'Definition shown → pick the correct word'],
  ['Scoring', 'Score + percentage displayed at end'],
  ['SM-2 impact', 'Quiz results feed back into the spaced repetition engine'],
  ['Distractor pool', 'Wrong options drawn from the user\'s own word library'],
];
quizItems.forEach(([lbl, val], i) => {
  const qy = 108 + i * 36;
  doc.rect(36, qy, 306, 28).fill(LGRAY);
  doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(7.5).text(lbl, 44, qy + 5, { width: 80 });
  doc.fillColor(DKGRAY).font('Helvetica').fontSize(7.5).text(val, 134, qy + 5, { width: 200 });
});

// Streak box
doc.rect(368, 66, W - 392, 290).fill(NAVY2);
doc.rect(368, 66, 3, 290).fill(AMBER);
doc.fillColor(AMBER).font('Helvetica-Bold').fontSize(11).text('Daily Streak', 382, 74);
doc.fillColor(WHITE + '66').font('Helvetica').fontSize(7).text('Consistency measurement & motivation', 382, 89);

// Streak grid
const days2 = ['M','T','W','T','F','S','S'];
days2.forEach((d, i) => {
  const sx = 382 + i * 34;
  doc.fillColor(WHITE + '55').font('Helvetica').fontSize(6).text(d, sx, 112, { width: 28, align: 'center' });
  doc.rect(sx, 122, 26, 20).fill(i < 5 ? AMBER : '#FFFFFF15');
});

// Streak count
doc.rect(382, 156, W - 410, 40).fill(AMBER + '22');
doc.rect(382, 156, 2, 40).fill(AMBER);
doc.fillColor(AMBER).font('Helvetica-Bold').fontSize(26).text('5', 392, 160, { width: 40 });
doc.fillColor(WHITE + '88').font('Helvetica').fontSize(7.5).text('Day streak — keep going!', 438, 172);

const streakFeat = [
  'Increments on consecutive practice days',
  'Resets if a day is missed',
  'Tracked per user account',
  'A proven motivational mechanic for habit-building',
];
streakFeat.forEach((f, i) => {
  const sfy = 212 + i * 22;
  checkmark(382, sfy, AMBER);
  doc.fillColor(WHITE + '88').font('Helvetica').fontSize(7.5).text(f, 396, sfy + 1, { width: W - 424 });
});

slideFooter();

// ─────────────────────────────────────────────────────────────────
// SLIDE 05 — WORD & CONTENT MANAGEMENT
// ─────────────────────────────────────────────────────────────────
doc.addPage();
slideHeader('Word & Content Management', 5, ORANGE);

// Manual entry
doc.rect(24, 66, 318, 278).fill(WHITE);
doc.rect(24, 66, 318, 26).fill(NAVY);
doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(10).text('Manual Word Entry', 36, 74);

const entryFields = [
  ['Word', 'The target vocabulary word'],
  ['Definition', 'Auto-fetched or manually entered'],
  ['Example sentence', 'From dictionary API or your own'],
  ['Custom tags', 'e.g. "finance", "Q3-review", "medical"'],
];
entryFields.forEach(([field, note], i) => {
  const ey = 104 + i * 42;
  doc.rect(36, ey, 294, 32).fill(LGRAY);
  doc.fillColor(DKGRAY).font('Helvetica-Bold').fontSize(8.5).text(field, 46, ey + 6, { width: 120 });
  doc.fillColor(MGRAY).font('Helvetica').fontSize(7.5).text(note, 46, ey + 19, { width: 240 });
});
doc.rect(36, 278, 294, 24).fill(ORANGE + '18');
doc.rect(36, 278, 2, 24).fill(ORANGE);
doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(7.5).text('All words are editable and deletable at any time.', 46, 285, { width: 282 });

// Search & filter
doc.rect(358, 66, W - 382, 278).fill(WHITE);
doc.rect(358, 66, W - 382, 26).fill(NAVY);
doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(10).text('Search, Filter & Tag System', 370, 74);

const filterItems = [
  ['Live search', 'Searches across word text and definition in real time.'],
  ['Filter by mastery', 'Show only Learning, Reviewing, or Mastered words.'],
  ['Filter by tag', 'Narrow to a specific topic, project, or batch.'],
  ['Custom tags per word', 'Attach one or more tags to any word at any time.'],
  ['Batch tag on import', 'Apply a single tag to the entire CSV import batch.'],
];
filterItems.forEach(([cap, detail], i) => {
  const fy = 104 + i * 42;
  doc.rect(370, fy, W - 406, 32).fill(LGRAY);
  checkmark(376, fy + 6, NAVY);
  doc.fillColor(DKGRAY).font('Helvetica-Bold').fontSize(8).text(cap, 394, fy + 6, { width: W - 446 });
  doc.fillColor(MGRAY).font('Helvetica').fontSize(7).text(detail, 394, fy + 19, { width: W - 446 });
});

slideFooter();

// ─────────────────────────────────────────────────────────────────
// SLIDE 06 — AUTOMATIC DICTIONARY LOOKUP
// ─────────────────────────────────────────────────────────────────
doc.addPage();
slideHeader('Automatic Dictionary Lookup', 6);

// Two API boxes
[
  { source: 'Free Dictionary API', items: ['Word definition','Phonetic pronunciation (IPA)','Audio pronunciation file','Example sentences'] },
  { source: 'Datamuse API', items: ['Synonyms for the word','Antonyms for the word','Related word associations','Triggered automatically on add'] },
].forEach(({ source, items }, i) => {
  const bx = 24 + i * 242;
  doc.rect(bx, 66, 218, 170).fill(WHITE);
  doc.rect(bx, 66, 218, 24).fill(NAVY);
  doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(8).text(source, bx + 12, bx === 24 ? 74 : 74, { width: 194 });
  items.forEach((item, j) => {
    const iy = 100 + j * 28;
    checkmark(bx + 12, iy, ORANGE);
    doc.fillColor(DKGRAY).font('Helvetica').fontSize(8).text(item, bx + 28, iy + 1, { width: 190 });
  });
});

// Zero-friction callout
doc.rect(24, 248, 460, 36).fill(ORANGE + '18');
doc.rect(24, 248, 3, 36).fill(ORANGE);
doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(8.5).text('Zero friction word capture', 34, 254);
doc.fillColor(DKGRAY).font('Helvetica').fontSize(7.5).text('Type a word → definitions, examples, audio, synonyms, and antonyms populate automatically.', 34, 267, { width: 440 });

// Mock card
doc.rect(500, 66, W - 524, 300).fill('#5B6CF0');
doc.fillColor(WHITE + '77').font('Helvetica').fontSize(6).text('AUTO-POPULATED CARD', 512, 76);
doc.fillColor(AMBER).font('Helvetica-Bold').fontSize(16).text('catalyst', 512, 90);
doc.fillColor(WHITE + '77').font('Helvetica').fontSize(7).text('noun  ·  /ˈkætəlɪst/', 512, 112);
doc.rect(512, 122, W - 548, 56).fill('#FFFFFF15');
doc.fillColor(WHITE + '77').font('Helvetica').fontSize(6).text('DEFINITION', 520, 130);
doc.fillColor(WHITE).font('Helvetica').fontSize(7.5).text('A person or thing that precipitates an event or change.', 520, 142, { width: W - 568 });
doc.rect(512, 184, W - 548, 48).fill('#FFFFFF10');
doc.fillColor(WHITE + '77').font('Helvetica').fontSize(6).text('SYNONYMS', 520, 192);
doc.fillColor(AMBER).font('Helvetica').fontSize(7.5).text('stimulus · trigger · impetus', 520, 204);
doc.rect(512, 238, W - 548, 40).fill('#FFFFFF10');
doc.fillColor(WHITE + '77').font('Helvetica').fontSize(6).text('EXAMPLE', 520, 246);
doc.fillColor(WHITE + '88').font('Helvetica').fontSize(7).text('"The new manager was the catalyst for\nthe team\'s transformation."', 520, 258, { width: W - 568 });

slideFooter();

// ─────────────────────────────────────────────────────────────────
// SLIDE 07 — CSV BULK IMPORT
// ─────────────────────────────────────────────────────────────────
doc.addPage();
slideHeader('CSV Bulk Import — The Enterprise Accelerator', 7, ORANGE);

const csvBullets = [
  ['Auto-detect header row', 'Intelligently detects whether the first row is a header and skips it automatically.'],
  ['Recognizes field variations', 'Accepts "word", "term", "vocab", "definition", "meaning" — flexible column naming.'],
  ['Skips duplicate words', 'If a word already exists in the user\'s library, it is silently skipped — no duplicates created.'],
  ['Skips invalid rows', 'Rows missing a word or definition are excluded and reported after import.'],
  ['Preview before commit', 'Users see a full preview of parsed words with counts before confirming the import.'],
  ['Apply tag to entire batch', 'One tag applied to all words in a single import — instant category organization.'],
];

csvBullets.forEach(([title, detail], i) => {
  const col = i < 3 ? 0 : 1;
  const row = i % 3;
  const bx = 24 + col * 348;
  const by = 72 + row * 88;
  doc.rect(bx, by, 330, 72).fill(WHITE);
  doc.rect(bx, by, 330, 72).stroke('#F05A2830').strokeColor('#F05A2830').lineWidth(0.5);
  doc.rect(bx + 12, by + 14, 28, 28).fill(ORANGE);
  doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(12).text(String(i+1), bx + 12, by + 18, { width: 28, align: 'center' });
  doc.fillColor(DKGRAY).font('Helvetica-Bold').fontSize(8.5).text(title, bx + 50, by + 12, { width: 270 });
  doc.fillColor(MGRAY).font('Helvetica').fontSize(7.5).text(detail, bx + 50, by + 28, { width: 270, lineGap: 1 });
});

// Footer callout
doc.rect(24, 352, W - 48, 28).fill(ORANGE);
doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(9).text('This is the key feature for businesses loading industry-specific word lists.', 36, 359, { width: W - 72, align: 'center' });

slideFooter();

// ─────────────────────────────────────────────────────────────────
// SLIDE 08 — DATA & SYNC
// ─────────────────────────────────────────────────────────────────
doc.addPage();
slideHeader('Data Storage & Cross-Device Sync', 8);

[
  { title: 'Firebase Firestore — Cloud Vocabulary Storage', color: '#FF6D00', items: [
    ['Real-time NoSQL database', 'Writes sync instantly across all devices without polling.'],
    ['Synced across every device', 'Phone, tablet, laptop — one account, one library.'],
    ['No manual backup needed', 'Firebase handles redundancy and durability automatically.'],
    ['Data persists across reinstalls', 'Log back in to restore all words, tags, and mastery levels.'],
    ['Per-UID security rules', 'Each user can only read and write their own data.'],
  ]},
  { title: 'PostgreSQL — Subscriber Registry', color: ORANGE, items: [
    ['Subscription status tracking', 'Active, trial, expired, or admin-granted — stored server-side.'],
    ['Trial start and end dates', 'Precise timestamps for 7-day trial enforcement.'],
    ['Admin manual activation', 'Admins can grant or extend access from the dashboard.'],
    ['Payment event records', 'Paddle webhook events stored and linked to user accounts.'],
    ['Survives server restarts', 'Unlike file-backed storage, data persists across redeployments.'],
  ]},
].forEach(({ title, color, items }, col) => {
  const bx = 24 + col * 342;
  doc.rect(bx, 66, 318, 280).fill(WHITE);
  doc.rect(bx, 66, 318, 26).fill(NAVY);
  doc.rect(bx, 66, 3, 26).fill(color);
  doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(9).text(title, bx + 14, bx === 24 ? 74 : 74, { width: 300 });
  items.forEach(([cap, detail], i) => {
    const iy = 104 + i * 44;
    doc.rect(bx + 12, iy, 294, 32).fill(LGRAY);
    checkmark(bx + 18, iy + 6, color);
    doc.fillColor(DKGRAY).font('Helvetica-Bold').fontSize(8).text(cap, bx + 36, iy + 6, { width: 262 });
    doc.fillColor(MGRAY).font('Helvetica').fontSize(7).text(detail, bx + 36, iy + 19, { width: 262 });
  });
});

slideFooter();

// ─────────────────────────────────────────────────────────────────
// SLIDE 09 — AUTHENTICATION + SECURITY
// ─────────────────────────────────────────────────────────────────
doc.addPage();
slideHeader('Authentication & Security Architecture', 9, ORANGE);

[
  { title: 'Authentication — Firebase Auth v11', color: NAVY, items: [
    ['Email + Password signup/login', 'Standard credentials stored securely in Firebase Auth.'],
    ['Password reset via email', 'Firebase sends a reset link — no server-side handling needed.'],
    ['Anonymous sign-in', 'Users can subscribe without creating an account first.'],
    ['Session persistence', 'Users remain logged in after closing and reopening the browser.'],
  ]},
  { title: 'Security Layers', color: ORANGE, items: [
    ['Helmet.js HTTP headers', 'Prevents XSS, clickjacking, and other common web attacks.'],
    ['API rate limiting', 'Blocks brute-force and abuse on all API endpoints.'],
    ['Paddle webhook signature', 'Every payment event is cryptographically verified before processing.'],
    ['Firebase Security Rules per UID', 'Firestore enforces row-level security — users cannot access other users\' data.'],
    ['Admin password as env secret', 'Admin credentials stored as a server environment variable — never in the codebase.'],
  ]},
].forEach(({ title, color, items }, col) => {
  const bx = 24 + col * 342;
  const bh = col === 0 ? 250 : 300;
  doc.rect(bx, 66, 318, bh).fill(WHITE);
  doc.rect(bx, 66, 318, 26).fill(NAVY);
  doc.rect(bx, 66, 3, 26).fill(color);
  doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(9).text(title, bx + 14, 74, { width: 300 });
  items.forEach(([cap, detail], i) => {
    const iy = 104 + i * (col === 0 ? 44 : 38);
    doc.rect(bx + 12, iy, 294, col === 0 ? 32 : 28).fill(LGRAY);
    checkmark(bx + 18, iy + 6, color);
    doc.fillColor(DKGRAY).font('Helvetica-Bold').fontSize(8).text(cap, bx + 36, iy + 5, { width: 262 });
    doc.fillColor(MGRAY).font('Helvetica').fontSize(7).text(detail, bx + 36, iy + 17, { width: 262 });
  });
});

slideFooter();

// ─────────────────────────────────────────────────────────────────
// SLIDE 10 — PAYMENTS & BUSINESS MODEL
// ─────────────────────────────────────────────────────────────────
doc.addPage();
doc.rect(0,0,W,H).fill(NAVY);
rect(0,0,W,3,ORANGE);
doc.rect(0,0,W,52).fill(ORANGE);
doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(18).text('Payments & Business Model', 28, 16, { width: W - 100 });
doc.fillColor(WHITE + '40').font('Helvetica-Bold').fontSize(28).text('10', W - 60, 8, { width: 50, align: 'right' });

const panels = [
  {
    title: 'Pricing Structure', x: 20,
    content: () => {
      doc.fillColor(AMBER).font('Helvetica-Bold').fontSize(22).text('500,000 ₫', 30, 95, { width: 190, align: 'center' });
      doc.fillColor(WHITE + '77').font('Helvetica').fontSize(7.5).text('per 6 months  (~$19 USD)', 30, 122, { width: 190, align: 'center' });
      [['Base price','500,000 ₫'],['+ 10% VAT','50,000 ₫'],['Total charged','550,000 ₫']].forEach(([lbl,val],i) => {
        const ry = 148 + i * 32;
        const isLast = i === 2;
        doc.rect(30, ry, 190, 24).fill(isLast ? ORANGE + '44' : '#FFFFFF10');
        doc.fillColor(isLast ? ORANGE : WHITE + '77').font('Helvetica').fontSize(7.5).text(lbl, 40, ry + 7, { width: 100 });
        doc.fillColor(isLast ? AMBER : WHITE).font('Helvetica-Bold').fontSize(8).text(val, 40, ry + 7, { width: 170, align: 'right' });
      });
      doc.fillColor(WHITE + '55').font('Helvetica').fontSize(7).text('7-day free trial  ·  Direct subscription (skip trial)', 30, 250, { width: 190, align: 'center' });
    }
  },
  {
    title: 'Paddle — International Payments', x: 240,
    content: () => {
      ['Credit & debit cards (Visa, Mastercard)','Apple Pay & Google Pay','PayPal','Global tax compliance (VAT handled by Paddle)','Recurring billing with automatic renewal','Paddle webhook — real-time payment events'].forEach((item,i) => {
        checkmark(250, 96 + i * 28, ORANGE);
        doc.fillColor(WHITE + '88').font('Helvetica').fontSize(7.5).text(item, 266, 97 + i * 28, { width: 198 });
      });
    }
  },
  {
    title: 'VietQR — Local Bank Transfer', x: 466,
    content: () => {
      ['User enters email in the paywall UI','QR code revealed after email submission','User transfers via any Vietnamese banking app','Admin manually activates the account','No Paddle subscription required for this path'].forEach((item,i) => {
        checkmark(476, 96 + i * 30, AMBER);
        doc.fillColor(WHITE + '88').font('Helvetica').fontSize(7.5).text(item, 492, 97 + i * 30, { width: 220 });
      });
      doc.rect(476, 255, 236, 28).fill(AMBER + '22');
      doc.rect(476, 255, 2, 28).fill(AMBER);
      doc.fillColor(AMBER).font('Helvetica-Bold').fontSize(7).text('Techcombank QR — the only local payment path\nfor Vietnam in a vocabulary app at this price.', 482, 259, { width: 224 });
    }
  },
];

panels.forEach(({ title, x, content }) => {
  doc.rect(x, 62, 218, 306).fill('#FFFFFF08');
  doc.rect(x, 62, 218, 26).fill('#FFFFFF15');
  doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(8.5).text(title, x + 10, 70, { width: 198 });
  content();
});

slideFooter();

// ─────────────────────────────────────────────────────────────────
// SLIDE 11 — UI & USER EXPERIENCE
// ─────────────────────────────────────────────────────────────────
doc.addPage();
slideHeader('UI & User Experience', 11);

const uxCards = [
  { title: 'Mobile-First Design', color: ORANGE, detail: 'Vertical navigation, touch-friendly tap targets, and a native app feel — all in the browser. Optimised for 375px screens and up.' },
  { title: 'Dark Mode', color: '#5B6CF0', detail: 'Full theme-aware toggle with a dark navy colour palette. Light mode also supported. User preference saved to localStorage.' },
  { title: 'Responsive Layout', color: '#9B5CF6', detail: 'Scales cleanly from phone to tablet to desktop. The UI adapts its spacing, navigation, and card layout for each breakpoint.' },
  { title: 'No App Store Required', color: '#10B981', detail: 'Runs entirely in the browser — no iOS or Android download needed. Instant access from any device with a URL.' },
  { title: 'Progressive Loading', color: AMBER, detail: 'Branded splash screen during auth check. Paywall state resolved before revealing the app. 3-second safety timeout fallback.' },
];

const cw = (W - 60) / 5;
uxCards.forEach(({ title, color, detail }, i) => {
  const cx = 24 + i * (cw + 3);
  doc.rect(cx, 66, cw, 278).fill(WHITE);
  doc.rect(cx, 66, cw, 6).fill(color);
  doc.rect(cx + 12, 86, 28, 28).fill(color);
  doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(10).text('✦', cx + 12, 93, { width: 28, align: 'center' });
  doc.fillColor(DKGRAY).font('Helvetica-Bold').fontSize(8.5).text(title, cx + 8, 126, { width: cw - 16 });
  doc.fillColor(MGRAY).font('Helvetica').fontSize(7).text(detail, cx + 8, 148, { width: cw - 16, lineGap: 2 });
});

slideFooter();

// ─────────────────────────────────────────────────────────────────
// SLIDE 12 — COMPETITIVE COMPARISON TABLE
// ─────────────────────────────────────────────────────────────────
doc.addPage();
slideHeader('Competitive Comparison Table', 12, ORANGE);

const tableRows = [
  ['SM-2 Spaced Repetition',     '✅','✅','⚠️','⚠️','⚠️'],
  ['CSV Industry Word Import',    '✅','⚠️','⚠️','❌','❌'],
  ['Auto Dictionary + Audio',     '✅','⚠️','⚠️','✅','⚠️'],
  ['Synonyms / Antonyms',         '✅','❌','❌','❌','❌'],
  ['Cross-Device Cloud Sync',     '✅','⚠️','✅','✅','✅'],
  ['Works in Browser (no install)','✅','❌','✅','✅','✅'],
  ['Dark Mode',                   '✅','✅','✅','❌','❌'],
  ['Vietnamese Bank Payment',     '✅','❌','❌','❌','❌'],
  ['Admin Override / B2B Console','✅','❌','⚠️','❌','❌'],
  ['Industry-Specific Focus',     '✅','⚠️','⚠️','❌','❌'],
  ['One-Time Bulk Team Setup',    '✅','⚠️','❌','❌','❌'],
  ['Price (6 months)',            '~$19','Free/$25/yr','$35.99/yr','$79.99/yr','$59.99/yr'],
];
const colHeaders = ['Feature', 'Vocab\nBuilder', 'Anki', 'Quizlet', 'Duolingo', 'Memrise'];
const colWidths = [178, 72, 66, 68, 70, 70];
const tableLeft = 20;
const rowH = 22;
let ty = 60;

// Header
let cx2 = tableLeft;
colHeaders.forEach((h, i) => {
  const bg = i === 1 ? ORANGE : NAVY;
  doc.rect(cx2, ty, colWidths[i], 26).fill(bg);
  doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(i === 0 ? 8 : 7).text(h, cx2 + 4, ty + (i===0?9:5), { width: colWidths[i] - 8, align: i === 0 ? 'left' : 'center' });
  cx2 += colWidths[i];
});
ty += 26;

tableRows.forEach((row, ri) => {
  let rcx = tableLeft;
  row.forEach((cell, ci) => {
    const bg = ri % 2 === 0 ? WHITE : LGRAY;
    const cellBg = ci === 1 ? (ri % 2 === 0 ? '#FFF5F2' : '#FFE8E0') : bg;
    doc.rect(rcx, ty, colWidths[ci], rowH).fill(cellBg);
    if (ci === 0) {
      doc.fillColor(DKGRAY).font('Helvetica').fontSize(7.5).text(cell, rcx + 6, ty + 7, { width: colWidths[ci] - 12 });
    } else {
      doc.fillColor(DKGRAY).font('Helvetica').fontSize(ci === 1 ? 9 : 8).text(cell, rcx, ty + 6, { width: colWidths[ci], align: 'center' });
    }
    rcx += colWidths[ci];
  });
  ty += rowH;
});

// Legend
doc.fillColor(MGRAY).font('Helvetica').fontSize(6.5).text('✅ Full support   ⚠️ Partial   ❌ Not available', tableLeft, ty + 6);

slideFooter();

// ─────────────────────────────────────────────────────────────────
// SLIDE 13 — COMPETITIVE ARGUMENTS
// ─────────────────────────────────────────────────────────────────
doc.addPage();
doc.rect(0,0,W,H).fill(NAVY);
rect(0,0,W,3,ORANGE);
doc.rect(0,0,W,52).fill(ORANGE);
doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(18).text('The Core Competitive Arguments', 28, 16, { width: W - 100 });
doc.fillColor(WHITE + '40').font('Helvetica-Bold').fontSize(28).text('13', W - 60, 8, { width: 50, align: 'right' });

const argCards = [
  { vs: 'vs Anki', color: '#5B6CF0', points: [
    'Anki requires manual deck setup, plugin installation, and desktop syncing.',
    'Vocabulary Builder runs in the browser — no install, no configuration.',
    'B2B CSV import and admin console have no equivalent in Anki.',
    'Anki has no Vietnamese payment option; VietQR is unique here.',
  ]},
  { vs: 'vs Quizlet', color: '#9B5CF6', points: [
    'Quizlet\'s spaced repetition does not implement the full SM-2 algorithm.',
    'Quizlet charges $35.99/year vs 500,000 ₫/6 months (~$19 USD).',
    'No VietQR payment path and no admin override console in Quizlet.',
    'Our CSV import detects headers, skips duplicates, and previews before commit.',
  ]},
  { vs: 'vs Duolingo / Babbel', color: '#10B981', points: [
    'Duolingo and Babbel teach a fixed curriculum — no custom vocabulary.',
    'Neither supports CSV import or industry-specific word lists.',
    'Duolingo is $79.99/year — more than 4× the cost of this product.',
    'No B2B admin console or bulk team onboarding in either product.',
  ]},
  { vs: 'vs Generic Vietnam Apps', color: ORANGE, points: [
    'Most local alternatives use file-backed storage wiped on redeployment.',
    'No competitor offers both Paddle international billing AND VietQR.',
    'None provide an admin dashboard with subscriber management.',
    'Auto-dictionary with audio and synonyms is unique at this price in Vietnam.',
  ]},
];

argCards.forEach(({ vs, color, points }, i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const ax = 20 + col * 346;
  const ay = 62 + row * 166;
  doc.rect(ax, ay, 330, 148).fill('#FFFFFF08');
  doc.rect(ax, ay, 330, 148).stroke(color + '40').strokeColor(color + '40').lineWidth(0.5);
  // Badge
  const bw3 = doc.widthOfString(vs) + 16;
  doc.rect(ax + 12, ay + 12, bw3, 18).fill(color);
  doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(7.5).text(vs, ax + 12, ay + 17, { width: bw3, align: 'center' });
  points.forEach((p, j) => {
    checkmark(ax + 14, ay + 44 + j * 24, color);
    doc.fillColor(WHITE + '88').font('Helvetica').fontSize(7.5).text(p, ax + 28, ay + 45 + j * 24, { width: 296, lineGap: 0 });
  });
});

slideFooter();

// ─────────────────────────────────────────────────────────────────
// SLIDE 14 — SUMMARY / CLOSING
// ─────────────────────────────────────────────────────────────────
doc.addPage();
doc.rect(0,0,W,H).fill(NAVY);
rect(0,0,W,3,ORANGE);

doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(8).text('SUMMARY', 0, 52, { width: W, align: 'center' });
doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(28).text('One App. Every Industry.', 0, 70, { width: W, align: 'center' });
doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(28).text('Every Word.', 0, 104, { width: W, align: 'center' });
doc.fillColor(WHITE + '55').font('Helvetica').fontSize(9).text('The four things no single competitor matches — all in one product.', 0, 142, { width: W, align: 'center' });

const diffs = [
  { title: 'True SM-2 Spaced Repetition', color: ORANGE, detail: 'Full algorithm — ease factor, interval, review count — not a simplified version.' },
  { title: 'CSV Bulk Import', color: '#5B6CF0', detail: 'Header detection, duplicate skipping, preview, and batch tagging at scale.' },
  { title: 'VietQR + Paddle Payments', color: AMBER, detail: 'Local Techcombank transfer for Vietnam users. International cards via Paddle.' },
  { title: 'Full Admin B2B Console', color: '#10B981', detail: 'Password-protected dashboard with subscriber management and manual activation.' },
];

const dw = (W - 80) / 4;
diffs.forEach(({ title, color, detail }, i) => {
  const dx = 24 + i * (dw + 8);
  doc.rect(dx, 172, dw, 176).fill('#FFFFFF08');
  doc.rect(dx, 172, dw, 4).fill(color);
  doc.rect(dx + 10, 188, 28, 28).fill(color);
  doc.fillColor(color).font('Helvetica-Bold').fontSize(8.5).text(title, dx + 8, 228, { width: dw - 16 });
  doc.fillColor(WHITE + '66').font('Helvetica').fontSize(7).text(detail, dx + 8, 248, { width: dw - 16, lineGap: 2 });
});

slideFooter();

// ── Finalize ───────────────────────────────────────────────────────
doc.end();
stream.on('finish', () => {
  console.log('PDF written to:', outPath);
});
stream.on('error', (err) => {
  console.error('Error:', err);
  process.exit(1);
});
