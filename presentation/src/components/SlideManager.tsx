import { useNavigate } from 'react-router-dom'
import { getAllSlides } from '../slideLoader'

interface Props {
  open: boolean
  onToggle: () => void
  currentSlide: number
  hiddenIds: string[]
  onHiddenChange: (ids: string[]) => void
  onNavigate: (num: number) => void
}

const MODULE_COLORS: Record<string, string> = {
  Core:        'bg-brand text-white',
  Business:    'bg-amber-500 text-white',
  Students:    'bg-blue-600 text-white',
  Individuals: 'bg-emerald-600 text-white',
}

export default function SlideManager({ open, onToggle, currentSlide, hiddenIds, onHiddenChange, onNavigate }: Props) {
  const all = getAllSlides()
  const navigate = useNavigate()

  const toggleHide = (id: string) => {
    const next = hiddenIds.includes(id)
      ? hiddenIds.filter(x => x !== id)
      : [...hiddenIds, id]
    onHiddenChange(next)
  }

  const savePDF = () => {
    const params = hiddenIds.length ? `?hidden=${hiddenIds.join(',')}` : ''
    const printUrl = `${window.location.origin}/print${params}`
    window.open(printUrl, '_blank')
  }

  // Group slides by module
  const modules = Array.from(new Set(all.map(s => s.module)))

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={e => { e.stopPropagation(); onToggle() }}
        className="no-print fixed top-4 right-4 z-50 bg-brand hover:bg-brand-dk text-white rounded-full w-11 h-11 flex items-center justify-center shadow-lg transition-colors"
        title="Slide Manager (M)"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
      </button>

      {/* Panel overlay */}
      {open && (
        <div
          className="no-print fixed inset-0 z-40"
          onClick={e => { e.stopPropagation(); onToggle() }}
        >
          {/* Side panel */}
          <div
            className="absolute top-0 right-0 h-full w-80 bg-white shadow-2xl flex flex-col overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-brand text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
              <div>
                <div className="font-bold text-sm">Slide Manager</div>
                <div className="text-xs opacity-70">{all.length - hiddenIds.length} / {all.length} visible</div>
              </div>
              <button onClick={onToggle} className="text-white/70 hover:text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            {/* Slide list */}
            <div className="flex-1 overflow-y-auto py-2">
              {modules.map(mod => (
                <div key={mod}>
                  <div className="px-4 py-2 text-xs font-bold text-muted uppercase tracking-wider border-b border-gray-100">
                    {mod}
                  </div>
                  {all.filter(s => s.module === mod).map(slide => {
                    const hidden = hiddenIds.includes(slide.id)
                    const active = slide.position === currentSlide
                    return (
                      <div
                        key={slide.id}
                        className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors ${
                          active ? 'bg-orange-50 border-l-2 border-brand' : 'hover:bg-gray-50'
                        } ${hidden ? 'opacity-40' : ''}`}
                        onClick={() => onNavigate(slide.position)}
                      >
                        {/* Slide number */}
                        <span className={`text-xs font-bold w-6 flex-shrink-0 ${MODULE_COLORS[slide.module] || 'bg-gray-200 text-gray-700'} rounded px-1 py-0.5 text-center`}>
                          {slide.position}
                        </span>

                        {/* Title */}
                        <span className="flex-1 text-xs font-medium text-gray-800 truncate">
                          {slide.title}
                        </span>

                        {/* Eye toggle */}
                        <button
                          onClick={e => { e.stopPropagation(); toggleHide(slide.id) }}
                          className="flex-shrink-0 text-gray-400 hover:text-gray-700 transition-colors"
                          title={hidden ? 'Show slide' : 'Hide slide'}
                        >
                          {hidden ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                          ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                          )}
                        </button>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>

            {/* Footer actions */}
            <div className="border-t border-gray-100 p-4 flex-shrink-0 space-y-2">
              <button
                onClick={savePDF}
                className="w-full bg-brand hover:bg-brand-dk text-white font-bold text-sm py-2.5 rounded-lg transition-colors"
              >
                Save as PDF
              </button>
              <p className="text-xs text-muted text-center">
                Opens /print with visible slides · Enable "Background graphics" in print dialog
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
