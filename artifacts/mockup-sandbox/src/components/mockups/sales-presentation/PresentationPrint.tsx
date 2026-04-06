import './_group.css';
import { type ReactNode } from 'react';
import { SLIDES, SLIDE_TITLES } from './Presentation';

const PRINT_W = 1280;
const PRINT_H = 720;

export function PresentationPrint() {
  const handlePrint = () => window.print();

  return (
    <>
      <style>{`
        /* ── Print page setup ── */
        @media print {
          @page {
            size: ${PRINT_W}px ${PRINT_H}px landscape;
            margin: 0;
          }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }
          .no-print { display: none !important; }
          .print-scaler { transform: none !important; margin: 0 !important; }
          .slide-page {
            width: ${PRINT_W}px !important;
            height: ${PRINT_H}px !important;
            page-break-after: always !important;
            break-after: page !important;
            overflow: hidden !important;
            position: relative !important;
            transform: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            margin: 0 !important;
          }
          .slide-page:last-child {
            page-break-after: avoid !important;
            break-after: avoid !important;
          }
          .slides-container {
            padding: 0 !important;
            gap: 0 !important;
            background: white !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }

        /* ── Screen styles ── */
        @media screen {
          body, html { margin: 0; padding: 0; background: #111; }
          .slides-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 24px;
            padding: 80px 24px 40px;
            background: #111;
            min-height: 100vh;
          }
          .slide-page {
            width: ${PRINT_W}px;
            height: ${PRINT_H}px;
            position: relative;
            overflow: hidden;
            flex-shrink: 0;
            box-shadow: 0 8px 40px rgba(0,0,0,0.6);
            border-radius: 6px;
          }
          .print-scaler {
            transform-origin: top center;
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
            width: ${PRINT_W}px;
          }
        }
      `}</style>

      {/* Top toolbar — hidden when printing */}
      <div className="no-print" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
        background: 'rgba(17,17,17,0.95)', backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: 60, fontFamily: 'Inter, sans-serif',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ background: '#F05A28', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="18" height="18">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>ACE-Apps · Vocabulary Builder</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>Sales Presentation — {SLIDES.length} slides · Print layout</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
            Use <kbd style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 4, padding: '2px 6px', fontSize: 12, fontFamily: 'monospace' }}>Ctrl+P</kbd> or click →
          </div>
          <button
            onClick={handlePrint}
            style={{
              background: '#F05A28', color: 'white', border: 'none', borderRadius: 8,
              padding: '10px 20px', fontWeight: 700, fontSize: 14, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Inter, sans-serif',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
              <rect x="6" y="14" width="12" height="8"/>
            </svg>
            Save as PDF (all {SLIDES.length} slides)
          </button>
        </div>
      </div>

      {/* All slides */}
      <ScaledSlides />
    </>
  );
}

function ScaledSlides() {
  return (
    <div className="slides-container">
      <ScaleWrapper>
        {SLIDES.map((SlideComp, i) => (
          <div key={i}>
            <div className="slide-label no-print">{i + 1} / {SLIDES.length} — {SLIDE_TITLES[i]}</div>
            <div className="slide-page">
              <SlideComp />
            </div>
          </div>
        ))}
      </ScaleWrapper>
    </div>
  );
}

function ScaleWrapper({ children }: { children: ReactNode }) {
  const scale = Math.min(1, (typeof window !== 'undefined' ? window.innerWidth - 48 : PRINT_W) / PRINT_W);
  return (
    <div
      className="print-scaler"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
        width: PRINT_W,
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
      }}
    >
      {children}
    </div>
  );
}
