import { useEffect, useCallback, useState } from 'react'
import { Routes, Route, useNavigate, useParams, Navigate, useSearchParams } from 'react-router-dom'
import { getSlideComponent, getAllSlides } from './slideLoader'
import SlideManager from './components/SlideManager'

// ── Helpers ──────────────────────────────────────────────────────────────────
function getHiddenIds(): string[] {
  try {
    return JSON.parse(localStorage.getItem('hidden-slides') || '[]')
  } catch {
    return []
  }
}

// ── Slide View ────────────────────────────────────────────────────────────────
function SlideView() {
  const { num } = useParams<{ num: string }>()
  const navigate = useNavigate()
  const [managerOpen, setManagerOpen] = useState(false)
  const [hiddenIds, setHiddenIds] = useState<string[]>(getHiddenIds)

  const all = getAllSlides()
  const currentNum = parseInt(num || '1', 10)
  const slide = all[currentNum - 1]
  const Component = slide ? getSlideComponent(slide.filepath) : null

  const goNext = useCallback(() => {
    if (currentNum < all.length) navigate(`/slide/${currentNum + 1}`)
  }, [currentNum, all.length, navigate])

  const goPrev = useCallback(() => {
    if (currentNum > 1) navigate(`/slide/${currentNum - 1}`)
  }, [currentNum, navigate])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext()
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goPrev()
      if (e.key === 'm' || e.key === 'M') setManagerOpen(v => !v)
      if (e.key === 'Escape') setManagerOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goPrev])

  // Click anywhere on the slide body (but not manager) advances
  const handleSlideClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-manager]')) return
    goNext()
  }

  const handleHiddenChange = (ids: string[]) => {
    setHiddenIds(ids)
    localStorage.setItem('hidden-slides', JSON.stringify(ids))
  }

  if (!slide || !Component) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-navy text-white text-2xl">
        Slide {currentNum} not found
      </div>
    )
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden" onClick={handleSlideClick}>
      <Component />

      {/* Slide counter badge */}
      <div className="no-print absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 text-white text-xs px-3 py-1 rounded-full pointer-events-none select-none">
        {currentNum} / {all.length} &nbsp;·&nbsp; {slide.title}
        <span className="ml-2 opacity-50">← → navigate &nbsp;·&nbsp; M = manage</span>
      </div>

      {/* Prev / Next click zones (invisible) */}
      <button
        className="no-print absolute left-0 top-0 w-1/6 h-full opacity-0 cursor-w-resize"
        onClick={e => { e.stopPropagation(); goPrev() }}
        aria-label="Previous slide"
      />
      <button
        className="no-print absolute right-0 top-0 w-1/6 h-full opacity-0 cursor-e-resize"
        onClick={e => { e.stopPropagation(); goNext() }}
        aria-label="Next slide"
      />

      {/* Slide Manager */}
      <div data-manager>
        <SlideManager
          open={managerOpen}
          onToggle={() => setManagerOpen(v => !v)}
          currentSlide={currentNum}
          hiddenIds={hiddenIds}
          onHiddenChange={handleHiddenChange}
          onNavigate={n => { setManagerOpen(false); navigate(`/slide/${n}`) }}
        />
      </div>
    </div>
  )
}

// ── Print View ────────────────────────────────────────────────────────────────
function PrintView() {
  const [searchParams] = useSearchParams()
  const hiddenParam = searchParams.get('hidden') || ''
  const hiddenIds = hiddenParam ? hiddenParam.split(',') : []

  const all = getAllSlides()
  const visible = all.filter(s => !hiddenIds.includes(s.id))

  useEffect(() => {
    // Give fonts & images a moment to load, then print
    const timer = setTimeout(() => window.print(), 800)
    return () => clearTimeout(timer)
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

// ── Router ────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/slide/1" replace />} />
      <Route path="/slide/:num" element={<SlideView />} />
      <Route path="/print" element={<PrintView />} />
      <Route path="*" element={<Navigate to="/slide/1" replace />} />
    </Routes>
  )
}
