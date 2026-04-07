import './_group.css';
import { useState, useEffect, useCallback } from 'react';
import { SLIDES, SLIDE_TITLES } from './Presentation';

const SLIDE_W = 1280;
const SLIDE_H = 720;

export function PresentationPrint() {
  const [screenScale, setScreenScale] = useState(1);

  // Set page title so Chrome uses it as the default PDF filename
  useEffect(() => {
    document.title = 'ACE-Apps — Vocabulary Builder Sales Presentation';
    return () => { document.title = 'Mockup Canvas'; };
  }, []);

  // Screen scale: fit slides to viewport width
  useEffect(() => {
    const update = () => {
      setScreenScale(Math.min(1, (window.innerWidth - 32) / SLIDE_W));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // beforeprint: force every slide to exact pixel dimensions so Chrome
  // renders them at 1280×720 regardless of paper size.
  // Also clear the title so Chrome embeds NO title metadata in the PDF —
  // this lets the PDF viewer show the user's chosen filename instead.
  useEffect(() => {
    const before = () => {
      document.title = '';
      const blocks = document.querySelectorAll<HTMLElement>('.print-slide-block');
      blocks.forEach(b => {
        b.style.setProperty('width',  `${SLIDE_W}px`, 'important');
        b.style.setProperty('height', `${SLIDE_H}px`, 'important');
        b.style.setProperty('overflow', 'hidden', 'important');
        b.style.setProperty('position', 'relative', 'important');
        b.style.setProperty('page-break-after', 'always', 'important');
        b.style.setProperty('break-after', 'page', 'important');
      });
      const inners = document.querySelectorAll<HTMLElement>('.print-slide-inner');
      inners.forEach(el => {
        el.style.setProperty('transform', 'none', 'important');
        el.style.setProperty('width',  `${SLIDE_W}px`, 'important');
        el.style.setProperty('height', `${SLIDE_H}px`, 'important');
        el.style.setProperty('position', 'absolute', 'important');
        el.style.setProperty('top', '0', 'important');
        el.style.setProperty('left', '0', 'important');
      });
    };

    const after = () => {
      // Restore the title for the browser tab / next print session
      document.title = 'ACE-Apps — Vocabulary Builder Sales Presentation';
      // React re-renders from state, so just clear any forced inline styles
      document.querySelectorAll<HTMLElement>('.print-slide-block, .print-slide-inner')
        .forEach(el => el.removeAttribute('style'));
      // Trigger re-render to restore screen scale
      setScreenScale(s => s);
    };

    window.addEventListener('beforeprint', before);
    window.addEventListener('afterprint', after);
    return () => {
      window.removeEventListener('beforeprint', before);
      window.removeEventListener('afterprint', after);
    };
  }, []);

  const handlePrint = useCallback(() => window.print(), []);

  return (
    <>
      <style>{`
        /* ─────────── Global resets ─────────── */
        *, *::before, *::after { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; }

        /* ─────────── Print ─────────── */
        @media print {
          /* Tell Chrome the exact page size — no paper-size rescaling */
          @page {
            size: ${SLIDE_W}px ${SLIDE_H}px;
            margin: 0;
          }

          html, body {
            width:  ${SLIDE_W}px !important;
            height: ${SLIDE_H}px !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: visible !important;
            background: transparent !important;
          }

          /* Force background colours to print */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          .no-print { display: none !important; }

          .print-slides-wrap {
            display: block !important;
            padding: 0 !important;
            margin:  0 !important;
            background: transparent !important;
          }

          /* Each slide block = one page */
          .print-slide-block {
            display: block !important;
            width:  ${SLIDE_W}px !important;
            height: ${SLIDE_H}px !important;
            overflow: hidden !important;
            position: relative !important;
            page-break-after: always !important;
            break-after: page !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }
          .print-slide-block:last-child {
            page-break-after: avoid !important;
            break-after: avoid !important;
          }

          .print-slide-inner {
            position: absolute !important;
            top: 0 !important; left: 0 !important;
            width:  ${SLIDE_W}px !important;
            height: ${SLIDE_H}px !important;
            transform: none !important;
            transform-origin: top left !important;
          }

          /* Screen-only label */
          .print-slide-label { display: none !important; }
        }

        /* ─────────── Screen ─────────── */
        @media screen {
          body { background: #111; }
          .print-slides-wrap {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 48px;
            padding: 80px 16px 64px;
            min-height: 100vh;
            background: #111;
          }
          .print-slide-block {
            position: relative;
            flex-shrink: 0;
            box-shadow: 0 8px 48px rgba(0,0,0,0.7);
            border-radius: 6px;
            overflow: hidden;
          }
          .print-slide-inner {
            position: absolute;
            top: 0; left: 0;
            width: ${SLIDE_W}px;
            height: ${SLIDE_H}px;
            transform-origin: top left;
          }
          .print-slide-label {
            color: rgba(255,255,255,0.3);
            font-family: Inter, sans-serif;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.07em;
            text-transform: uppercase;
            text-align: center;
            margin-bottom: 8px;
          }
        }
      `}</style>

      {/* ── Toolbar (hidden in print) ── */}
      <Toolbar count={SLIDES.length} onPrint={handlePrint} />

      {/* ── Slides ── */}
      <div className="print-slides-wrap">
        {SLIDES.map((SlideComp, i) => {
          const outerW = SLIDE_W * screenScale;
          const outerH = SLIDE_H * screenScale;
          return (
            <div key={i}>
              <div className="print-slide-label no-print">
                {i + 1} / {SLIDES.length} — {SLIDE_TITLES[i]}
              </div>
              <div
                className="print-slide-block"
                style={{ width: outerW, height: outerH }}
              >
                <div
                  className="print-slide-inner"
                  style={{ transform: `scale(${screenScale})` }}
                >
                  <SlideComp />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────── */
function Toolbar({ count, onPrint }: { count: number; onPrint: () => void }) {
  return (
    <div
      className="no-print"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: 60,
        background: 'rgba(15,15,15,0.97)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          background: '#F05A28', borderRadius: 8,
          width: 32, height: 32, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="18" height="18">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <div style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>
            ACE-Apps · Vocabulary Builder
          </div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>
            {count} slides · print layout — 1280 × 720 px
          </div>
        </div>
      </div>

      {/* Print hints + button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, lineHeight: 1.5 }}>
          In print dialog → <strong style={{ color: 'rgba(255,255,255,0.7)' }}>More settings</strong>
          {' → '}<strong style={{ color: 'rgba(255,255,255,0.7)' }}>Background graphics ✓</strong>
          {' · '}<strong style={{ color: 'rgba(255,255,255,0.7)' }}>Margins: None</strong>
        </div>
        <button
          onClick={onPrint}
          style={{
            background: '#F05A28', color: 'white', border: 'none',
            borderRadius: 8, padding: '10px 22px',
            fontWeight: 700, fontSize: 14, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 8,
            fontFamily: 'Inter, sans-serif', flexShrink: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
          Save as PDF — all {count} slides
        </button>
      </div>
    </div>
  );
}
