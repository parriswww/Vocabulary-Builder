const included = [
  'Unlimited vocabulary words',
  'Auto-fetch definitions & examples',
  'Spaced repetition (SM-2 algorithm)',
  'Flashcard & quiz modes',
  'Daily streak & progress tracking',
  'CSV bulk import',
  'Sync across all devices',
  'Priority support',
]

export default function Slide10_Pricing() {
  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
      {/* Header */}
      <div className="bg-brand flex items-end justify-between" style={{ padding: '3vh 5vw 2.5vh' }}>
        <div>
          <h2 className="text-white font-black" style={{ fontSize: '3vw' }}>Simple, Transparent Pricing</h2>
          <p className="text-white/60 italic font-light" style={{ fontSize: '1.1vw', marginTop: '0.3vh' }}>Giá cả đơn giản, minh bạch</p>
        </div>
        <div className="text-white/20 font-black" style={{ fontSize: '5vw' }}>10</div>
      </div>

      <div className="flex-1 flex items-center justify-center gap-8" style={{ padding: '4vh 6vw' }}>
        {/* Free trial card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col" style={{ padding: '4vh 3vw', width: '28vw' }}>
          <div className="text-muted font-semibold uppercase tracking-wider" style={{ fontSize: '0.85vw' }}>Start with</div>
          <div className="text-navy font-black mt-2" style={{ fontSize: '3vw' }}>7 Days Free</div>
          <div className="text-muted italic" style={{ fontSize: '0.9vw', marginTop: '0.3vh' }}>7 ngày dùng thử miễn phí</div>
          <div className="text-gray-400 mt-4" style={{ fontSize: '0.95vw' }}>Full access to every feature. No credit card required. Cancel anytime.</div>
          <div className="mt-6 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className="text-emerald-600 font-semibold text-sm">No commitment</span>
          </div>
        </div>

        {/* Arrow */}
        <div className="text-muted" style={{ fontSize: '2vw' }}>→</div>

        {/* Paid plan card */}
        <div className="rounded-2xl text-white flex flex-col"
          style={{ background: 'linear-gradient(135deg, #5B6CF0 0%, #9B5CF6 100%)', padding: '4vh 3vw', width: '34vw' }}>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-white/70 font-semibold uppercase tracking-wider" style={{ fontSize: '0.85vw' }}>Full Access Plan</div>
              <div className="text-white font-black mt-1" style={{ fontSize: '3vw' }}>500,000 ₫</div>
              <div className="text-white/60" style={{ fontSize: '0.9vw' }}>per 6 months · billed every 6 months</div>
              <div className="text-accent font-bold text-xs mt-1">+10% VAT = 550,000 ₫ total</div>
            </div>
            <div className="bg-accent text-navy font-black text-xs px-3 py-1 rounded-full">
              BEST VALUE
            </div>
          </div>

          <div className="border-t border-white/20 mt-4 pt-4">
            <div className="text-white/60 text-xs uppercase tracking-wider mb-3">Everything included:</div>
            <div className="grid grid-cols-2 gap-2">
              {included.map(item => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#FFC107" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span className="text-white/80 text-xs">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Unit price breakdown */}
        <div className="flex flex-col justify-center gap-4" style={{ width: '18vw' }}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 text-center" style={{ padding: '2.5vh 1.5vw' }}>
            <div className="text-brand font-black" style={{ fontSize: '2.2vw' }}>~2,800 ₫</div>
            <div className="text-muted text-xs mt-1">per day of learning</div>
            <div className="text-muted text-xs italic">mỗi ngày học</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 text-center" style={{ padding: '2.5vh 1.5vw' }}>
            <div className="text-brand font-black" style={{ fontSize: '2.2vw' }}>≈ $19</div>
            <div className="text-muted text-xs mt-1">USD every 6 months</div>
          </div>
          <div className="text-muted text-xs text-center leading-relaxed">
            Less than a cup of coffee per week for professional English fluency.
          </div>
        </div>
      </div>
    </div>
  )
}
