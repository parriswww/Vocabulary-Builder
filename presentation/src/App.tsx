import { useState, useEffect, useCallback, useRef } from 'react'
import { Routes, Route, useNavigate, useParams, Navigate, useSearchParams } from 'react-router-dom'
import { getSlideComponent, getAllSlides, SlideEntry } from './slideLoader'

// ─── Constants ───────────────────────────────────────────────────────────────
const THUMB_W = 200
const THUMB_H = Math.round(THUMB_W * (9 / 16)) // 113

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getHiddenIds(): string[] {
  try { return JSON.parse(localStorage.getItem('hidden-slides') || '[]') } catch { return [] }
}

function saveHiddenIds(ids: string[]) {
  localStorage.setItem('hidden-slides', JSON.stringify(ids))
}

// ─── Slide Thumbnail (renders actual slide content, scaled down) ──────────────
function SlideThumbnail({
  slide, isActive, isHidden, onClick, onToggleHide,
}: {
  slide: SlideEntry
  isActive: boolean
  isHidden: boolean
  onClick: () => void
  onToggleHide: (e: React.MouseEvent) => void
}) {
  const Component = getSlideComponent(slide.filepath)
  const [scale, setScale] = useState(() => THUMB_W / window.innerWidth)

  useEffect(() => {
    const update = () => setScale(THUMB_W / window.innerWidth)
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <div
      data-slide={slide.position}
      onClick={onClick}
      className={`group relative cursor-pointer select-none transition-colors ${
        isActive ? 'bg-orange-50' : 'hover:bg-gray-50'
      }`}
      style={{ padding: '10px 12px 8px' }}
    >
      <div className="flex items-start gap-2">
        {/* Slide number */}
        <div
          className={`text-[11px] font-semibold mt-0.5 w-5 text-right flex-shrink-0 ${
            isActive ? 'text-brand' : 'text-gray-400'
          }`}
        >
          {slide.position}
        </div>

        {/* Thumbnail frame */}
        <div
          className={`relative rounded overflow-hidden flex-shrink-0 transition-all ${
            isActive ? 'ring-2 ring-brand shadow-md' : 'ring-1 ring-gray-200 shadow-sm'
          } ${isHidden ? 'opacity-40' : ''}`}
          style={{ width: THUMB_W, height: THUMB_H }}
        >
          {/* Actual slide rendered at full size and scaled down */}
          <div
            style={{
              width: '100vw',
              height: '100vh',
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              pointerEvents: 'none',
            }}
          >
            {Component && <Component />}
          </div>

          {/* Hide overlay */}
          {isHidden && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            </div>
          )}
        </div>

        {/* Eye toggle — appears on hover */}
        <button
          onClick={onToggleHide}
          title={isHidden ? 'Show in PDF' : 'Hide from PDF'}
          className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1 text-gray-400 hover:text-gray-700"
        >
          {isHidden ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
              <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
              <line x1="1" y1="1" x2="23" y2="23"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          )}
        </button>
      </div>

      {/* Slide title */}
      <div className="pl-7 mt-1.5">
        <span
          className={`text-[10px] font-medium block truncate ${
            isActive ? 'text-brand' : 'text-gray-500'
          }`}
          style={{ maxWidth: THUMB_W }}
        >
          {slide.title}
        </span>
        {slide.module !== 'Core' && (
          <span className="text-[9px] text-gray-400">{slide.module}</span>
        )}
      </div>
    </div>
  )
}

// ─── Main Slide Preview ───────────────────────────────────────────────────────
function MainPreview({ slide }: { slide: SlideEntry }) {
  const Component = getSlideComponent(slide.filepath)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState({ scale: 1, scaledW: 0, scaledH: 0, offsetX: 0, offsetY: 0 })

  useEffect(() => {
    const update = () => {
      const el = wrapRef.current
      if (!el) return
      const { width, height } = el.getBoundingClientRect()
      const PAD = 40
      const availW = width - PAD * 2
      const availH = height - PAD * 2
      const s = Math.min(availW / window.innerWidth, availH / window.innerHeight)
      const sw = window.innerWidth * s
      const sh = window.innerHeight * s
      setState({ scale: s, scaledW: sw, scaledH: sh, offsetX: (width - sw) / 2, offsetY: (height - sh) / 2 })
    }
    update()
    const ro = new ResizeObserver(update)
    if (wrapRef.current) ro.observe(wrapRef.current)
    window.addEventListener('resize', update)
    return () => { ro.disconnect(); window.removeEventListener('resize', update) }
  }, [])

  const { scale, scaledW, scaledH, offsetX, offsetY } = state

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden" style={{ background: '#374151' }}>
      {Component && scaledW > 0 && (
        <div
          style={{
            position: 'absolute',
            left: offsetX,
            top: offsetY,
            width: scaledW,
            height: scaledH,
            boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: '100vw',
              height: '100vh',
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          >
            <Component />
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Editor View (main layout) ────────────────────────────────────────────────
function EditorView() {
  const all = getAllSlides()
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(1)
  const [hiddenIds, setHiddenIds] = useState<string[]>(getHiddenIds)
  const thumbStripRef = useRef<HTMLDivElement>(null)

  const current = all[currentSlide - 1]

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') setCurrentSlide(n => Math.min(n + 1, all.length))
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') setCurrentSlide(n => Math.max(n - 1, 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [all.length])

  // Scroll active thumbnail into view
  useEffect(() => {
    const strip = thumbStripRef.current
    if (!strip) return
    const el = strip.querySelector(`[data-slide="${currentSlide}"]`) as HTMLElement
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [currentSlide])

  const toggleHide = useCallback((id: string) => {
    setHiddenIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      saveHiddenIds(next)
      return next
    })
  }, [])

  const openExport = () => {
    const params = hiddenIds.length ? `?hidden=${hiddenIds.join(',')}` : ''
    window.open(`/print${params}`, '_blank')
  }

  const openPresent = () => {
    navigate(`/present/${currentSlide}`)
  }

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden" style={{ background: '#1A1A2E' }}>
      {/* ── Top bar ── */}
      <div
        className="flex items-center justify-between flex-shrink-0 border-b"
        style={{ padding: '10px 20px', background: '#16213E', borderColor: 'rgba(255,255,255,0.08)' }}
      >
        {/* Left: brand */}
        <div className="flex items-center gap-3">
          <div className="bg-brand rounded-lg flex items-center justify-center" style={{ width: 32, height: 32 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="18" height="18">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div className="text-white font-bold text-sm leading-tight">Vocabulary Builder</div>
            <div className="text-white/40 text-xs leading-tight">Sales Presentation</div>
          </div>
        </div>

        {/* Center: slide info */}
        <div className="flex items-center gap-3">
          <span className="text-white/30 text-sm">
            Slide {currentSlide} of {all.length}
          </span>
          <span className="text-white/20 text-xs">·</span>
          <span className="text-white/50 text-xs truncate max-w-xs">{current?.title}</span>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2">
          {/* Hidden count badge */}
          {hiddenIds.length > 0 && (
            <span className="text-white/40 text-xs">{hiddenIds.length} hidden</span>
          )}

          {/* Export button */}
          <button
            onClick={openExport}
            className="flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white border border-white/20 hover:border-white/40 rounded-lg transition-colors"
            style={{ padding: '6px 14px' }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export
          </button>

          {/* Present button */}
          <button
            onClick={openPresent}
            className="flex items-center gap-1.5 text-sm font-bold text-white rounded-lg transition-colors"
            style={{ padding: '6px 16px', background: '#F05A28' }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            Present
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: thumbnail strip */}
        <div
          ref={thumbStripRef}
          className="overflow-y-auto flex-shrink-0 border-r"
          style={{ width: 256, background: '#F9FAFB', borderColor: '#E5E7EB' }}
        >
          {/* Module section headers */}
          {(() => {
            const modules = Array.from(new Set(all.map(s => s.module)))
            return modules.map(mod => (
              <div key={mod}>
                <div
                  className="sticky top-0 z-10 text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-200"
                  style={{ padding: '8px 12px 6px', background: '#F9FAFB' }}
                >
                  {mod}
                </div>
                {all
                  .filter(s => s.module === mod)
                  .map(slide => (
                    <SlideThumbnail
                      key={slide.id}
                      slide={slide}
                      isActive={slide.position === currentSlide}
                      isHidden={hiddenIds.includes(slide.id)}
                      onClick={() => setCurrentSlide(slide.position)}
                      onToggleHide={e => { e.stopPropagation(); toggleHide(slide.id) }}
                    />
                  ))}
              </div>
            ))
          })()}

          {/* Export hint */}
          <div className="p-3 border-t border-gray-200 mt-2">
            <p className="text-[10px] text-gray-400 leading-relaxed">
              Click the eye icon on any slide to hide it from the PDF export.
              Use ← → arrow keys to navigate.
            </p>
          </div>
        </div>

        {/* Right: main preview */}
        <div className="flex-1 relative overflow-hidden">
          {current && <MainPreview key={current.id} slide={current} />}

          {/* Prev / Next click zones */}
          <div className="absolute inset-0 pointer-events-none">
            <button
              className="pointer-events-auto absolute left-2 top-1/2 -translate-y-1/2 w-8 h-12 flex items-center justify-center rounded-lg bg-black/30 hover:bg-black/50 text-white/70 hover:text-white transition-all"
              onClick={() => setCurrentSlide(n => Math.max(n - 1, 1))}
              style={{ display: currentSlide <= 1 ? 'none' : undefined }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button
              className="pointer-events-auto absolute right-2 top-1/2 -translate-y-1/2 w-8 h-12 flex items-center justify-center rounded-lg bg-black/30 hover:bg-black/50 text-white/70 hover:text-white transition-all"
              onClick={() => setCurrentSlide(n => Math.min(n + 1, all.length))}
              style={{ display: currentSlide >= all.length ? 'none' : undefined }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Present View (full-screen, click to advance) ─────────────────────────────
function PresentView() {
  const { num } = useParams<{ num: string }>()
  const navigate = useNavigate()
  const [showHint, setShowHint] = useState(true)
  const all = getAllSlides()
  const currentNum = parseInt(num || '1', 10)
  const slide = all[currentNum - 1]
  const Component = slide ? getSlideComponent(slide.filepath) : null

  const goNext = useCallback(() => {
    if (currentNum < all.length) navigate(`/present/${currentNum + 1}`)
  }, [currentNum, all.length, navigate])

  const goPrev = useCallback(() => {
    if (currentNum > 1) navigate(`/present/${currentNum - 1}`)
  }, [currentNum, navigate])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') goNext()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev()
      if (e.key === 'Escape') navigate('/')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goPrev, navigate])

  // Auto-hide hint
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 3000)
    return () => clearTimeout(t)
  }, [currentNum])

  if (!slide || !Component) return <Navigate to="/" replace />

  return (
    <div
      className="relative w-screen h-screen overflow-hidden cursor-pointer"
      onClick={goNext}
    >
      <Component />

      {/* Slide counter */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs rounded-full transition-opacity"
        style={{ padding: '4px 14px', opacity: showHint ? 1 : 0 }}
      >
        {currentNum} / {all.length} &nbsp;·&nbsp; Click or → to advance &nbsp;·&nbsp; Esc to exit
      </div>

      {/* Hidden prev zone */}
      <button
        className="absolute left-0 top-0 w-16 h-full opacity-0 cursor-default"
        onClick={e => { e.stopPropagation(); goPrev() }}
      />
    </div>
  )
}

// ─── Print View ───────────────────────────────────────────────────────────────
function PrintView() {
  const [searchParams] = useSearchParams()
  const hiddenParam = searchParams.get('hidden') || ''
  const hiddenIds = hiddenParam ? hiddenParam.split(',') : []
  const all = getAllSlides()
  const visible = all.filter(s => !hiddenIds.includes(s.id))

  useEffect(() => {
    const t = setTimeout(() => window.print(), 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <div>
      {visible.map(slide => {
        const Component = getSlideComponent(slide.filepath)
        return Component ? (
          <div key={slide.id} className="slide-root">
            <Component />
          </div>
        ) : null
      })}
    </div>
  )
}

// ─── Router ───────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<EditorView />} />
      <Route path="/present/:num" element={<PresentView />} />
      <Route path="/print" element={<PrintView />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
