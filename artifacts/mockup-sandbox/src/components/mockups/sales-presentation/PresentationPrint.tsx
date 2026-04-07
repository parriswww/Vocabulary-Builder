import './_group.css';
import { useState, useEffect, useRef } from 'react';
import { SLIDES, SLIDE_TITLES } from './Presentation';

const SLIDE_W = 1280;
const SLIDE_H = 720;
const DEFAULT_FILENAME = 'Vocabulary Builder — Sales Presentation';

export function PresentationPrint() {
  const [screenScale, setScreenScale] = useState(1);
  const [filename, setFilename] = useState(DEFAULT_FILENAME);
  const prevTitle = useRef(document.title);

  // Screen scale: fit slides to viewport width
  useEffect(() => {
    const update = () => {
      setScreenScale(Math.min(1, (window.innerWidth - 32) / SLIDE_W));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // afterprint: restore slide inline styles and document title
  useEffect(() => {
    const after = () => {
      document.title = prevTitle.current;
      document.querySelectorAll<HTMLElement>('.print-slide-block, .print-slide-inner')
        .forEach(el => el.removeAttribute('style'));
      setScreenScale(s => s);
    };
    window.addEventListener('afterprint', after);
    return () => window.removeEventListener('afterprint', after);
  }, []);

  const handlePrint = () => {
    // 1. Set the document title to the user's chosen filename.
    //    Chrome reads this SYNCHRONOUSLY before opening the print dialog,
    //    so both the suggested filename and the PDF metadata title will match.
    const name = filename.trim() || DEFAULT_FILENAME;
    prevTitle.current = document.title;
    document.title = name;

    // 2. Force exact pixel dimensions on every slide so Chrome doesn't
    //    rescale the content to fit the paper.
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

    // 3. Open the print dialog.
    window.print();
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; }

        /* ── Print ── */
        @media print {
          @page { size: ${SLIDE_W}px ${SLIDE_H}px; margin: 0; }
          html, body {
            width:  ${SLIDE_W}px !important;
            height: ${SLIDE_H}px !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: visible !important;
            background: transparent !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          .no-print { display: none !important; }
          .print-slides-wrap {
            display: block !important;
            padding: 0 !important;
            margin: 0 !important;
            background: transparent !important;
          }
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
          }
          .print-slide-label { display: none !important; }
        }

        /* ── Screen ── */
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

      <Toolbar
        count={SLIDES.length}
        filename={filename}
        onFilenameChange={setFilename}
        onPrint={handlePrint}
      />

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

function Toolbar({
  count,
  filename,
  onFilenameChange,
  onPrint,
}: {
  count: number;
  filename: string;
  onFilenameChange: (v: string) => void;
  onPrint: () => void;
}) {
  return (
    <div
      className="no-print"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: 64,
        background: 'rgba(15,15,15,0.97)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center',
        gap: 16,
        padding: '0 20px',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <div style={{
          background: '#F05A28', borderRadius: 8,
          width: 32, height: 32,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="18" height="18">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <div style={{ color: 'white', fontWeight: 700, fontSize: 13 }}>ACE-Apps</div>
          <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11 }}>{count} slides</div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.1)', flexShrink: 0 }} />

      {/* Filename input */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
        <label style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, flexShrink: 0 }}>
          Save as:
        </label>
        <input
          type="text"
          value={filename}
          onChange={e => onFilenameChange(e.target.value)}
          placeholder="Enter PDF filename…"
          style={{
            flex: 1,
            minWidth: 0,
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 6,
            color: 'white',
            fontSize: 13,
            padding: '6px 12px',
            fontFamily: 'Inter, sans-serif',
            outline: 'none',
          }}
          onFocus={e => (e.target.style.borderColor = '#F05A28')}
          onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
        />
        <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12, flexShrink: 0 }}>.pdf</span>
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.1)', flexShrink: 0 }} />

      {/* Hint */}
      <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, flexShrink: 0, lineHeight: 1.4 }}>
        Enable <strong style={{ color: 'rgba(255,255,255,0.6)' }}>Background graphics</strong><br />
        + Margins: <strong style={{ color: 'rgba(255,255,255,0.6)' }}>None</strong>
      </div>

      {/* Save button */}
      <button
        onClick={onPrint}
        style={{
          background: '#F05A28', color: 'white', border: 'none',
          borderRadius: 8, padding: '10px 20px',
          fontWeight: 700, fontSize: 13, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: 'Inter, sans-serif', flexShrink: 0,
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 6 2 18 2 18 9" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <rect x="6" y="14" width="12" height="8" />
        </svg>
        Save as PDF
      </button>
    </div>
  );
}
