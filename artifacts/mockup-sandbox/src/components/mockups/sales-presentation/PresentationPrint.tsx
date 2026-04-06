import './_group.css';
import { useState, useEffect, useRef } from 'react';
import { SLIDES, SLIDE_TITLES } from './Presentation';

const SLIDE_W = 1280;
const SLIDE_H = 720;

export function PresentationPrint() {
  const handlePrint = () => window.print();

  return (
    <>
      <style>{`
        /* ── Reset ── */
        *, *::before, *::after { box-sizing: border-box; }

        /* ── Print ── */
        @media print {
          @page {
            size: ${SLIDE_W}px ${SLIDE_H}px landscape;
            margin: 0;
          }

          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            width: ${SLIDE_W}px !important;
          }

          .no-print { display: none !important; }

          .slides-container {
            display: block !important;
            padding: 0 !important;
            margin: 0 !important;
            background: transparent !important;
          }

          .slide-block {
            display: block !important;
            width: ${SLIDE_W}px !important;
            height: ${SLIDE_H}px !important;
            overflow: hidden !important;
            page-break-after: always !important;
            break-after: page !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            position: relative !important;
          }

          .slide-block:last-child {
            page-break-after: avoid !important;
            break-after: avoid !important;
          }

          .slide-frame {
            width: ${SLIDE_W}px !important;
            height: ${SLIDE_H}px !important;
            position: relative !important;
            overflow: hidden !important;
            transform: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }

          .slide-frame-inner {
            width: ${SLIDE_W}px !important;
            height: ${SLIDE_H}px !important;
            transform: none !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }

        /* ── Screen ── */
        @media screen {
          html, body { margin: 0; padding: 0; background: #111; }

          .slides-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0;
            padding: 80px 0 60px;
            background: #111;
            min-height: 100vh;
          }

          .slide-block {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0;
            margin-bottom: 40px;
          }

          .slide-label {
            color: rgba(255,255,255,0.35);
            font-family: Inter, sans-serif;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            margin-bottom: 8px;
            text-align: center;
          }

          .slide-frame {
            position: relative;
            overflow: hidden;
            box-shadow: 0 8px 40px rgba(0,0,0,0.7);
            border-radius: 6px;
            flex-shrink: 0;
          }

          .slide-frame-inner {
            position: absolute;
            top: 0;
            left: 0;
            width: ${SLIDE_W}px;
            height: ${SLIDE_H}px;
            transform-origin: top left;
          }
        }
      `}</style>

      {/* Toolbar — hidden when printing */}
      <Toolbar onPrint={handlePrint} count={SLIDES.length} />

      {/* All slides */}
      <div className="slides-container">
        {SLIDES.map((SlideComp, i) => (
          <SlideBlock key={i} index={i} title={SLIDE_TITLES[i]} total={SLIDES.length}>
            <SlideComp />
          </SlideBlock>
        ))}
      </div>
    </>
  );
}

function SlideBlock({
  children,
  index,
  title,
  total,
}: {
  children: React.ReactNode;
  index: number;
  title: string;
  total: number;
}) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const available = Math.min(window.innerWidth - 48, SLIDE_W);
      setScale(available / SLIDE_W);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const frameW = SLIDE_W * scale;
  const frameH = SLIDE_H * scale;

  return (
    <div className="slide-block">
      <div
        className="slide-label no-print"
        style={{ width: frameW }}
      >
        {index + 1} / {total} — {title}
      </div>
      <div
        className="slide-frame"
        style={{ width: frameW, height: frameH }}
      >
        <div
          className="slide-frame-inner"
          style={{ transform: `scale(${scale})` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function Toolbar({ onPrint, count }: { onPrint: () => void; count: number }) {
  return (
    <div
      className="no-print"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        background: 'rgba(17,17,17,0.96)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        height: 60,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            background: '#F05A28',
            borderRadius: 8,
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="18" height="18">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <div style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>
            ACE-Apps · Vocabulary Builder
          </div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>
            Sales Presentation — {count} slides · Print layout
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
          Use{' '}
          <kbd
            style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 4,
              padding: '2px 6px',
              fontSize: 12,
              fontFamily: 'monospace',
            }}
          >
            Ctrl+P
          </kbd>{' '}
          or click →
        </div>
        <button
          onClick={onPrint}
          style={{
            background: '#F05A28',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            padding: '10px 22px',
            fontWeight: 700,
            fontSize: 14,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: 'Inter, sans-serif',
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
