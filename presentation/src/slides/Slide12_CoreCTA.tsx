export default function Slide12_CoreCTA() {
  return (
    <div className="slide-root flex flex-col items-center justify-center text-center"
      style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 60%, #0F3460 100%)' }}>
      {/* Decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {[60, 45, 30].map((opacity, i) => (
          <div key={i} className="absolute rounded-full border border-brand"
            style={{ width: `${(i + 1) * 20}vw`, height: `${(i + 1) * 20}vw`, opacity: opacity / 100 }} />
        ))}
      </div>

      <div className="relative z-10" style={{ padding: '0 8vw' }}>
        {/* Brand */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="bg-brand rounded-xl flex items-center justify-center"
            style={{ width: '3vw', height: '3vw', minWidth: 40, minHeight: 40 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" style={{ width: '1.8vw', minWidth: 22 }}>
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-white font-bold" style={{ fontSize: '1.3vw' }}>ACE-Apps · Vocabulary Builder</span>
        </div>

        <h2 className="text-white font-black leading-tight" style={{ fontSize: '4.5vw' }}>
          Start Your <span className="text-brand">7-Day Free Trial</span><br />
          Today
        </h2>
        <p className="text-white/50 italic mt-3" style={{ fontSize: '1.3vw' }}>
          Bắt đầu dùng thử miễn phí 7 ngày của bạn ngay hôm nay
        </p>

        <p className="text-white/60 mt-6 max-w-2xl mx-auto" style={{ fontSize: '1.2vw' }}>
          No credit card. No commitment. Just better vocabulary — from the very first session.
        </p>

        {/* Key details */}
        <div className="flex items-center justify-center gap-8 mt-8">
          {[
            { val: '7 days', label: 'Free trial' },
            { val: '500,000 ₫', label: '/ 6 months (+VAT)' },
            { val: '5 min', label: 'Daily practice' },
          ].map(({ val, label }) => (
            <div key={val}>
              <div className="text-accent font-black" style={{ fontSize: '2.2vw' }}>{val}</div>
              <div className="text-white/40 text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* URL */}
        <div className="mt-10 inline-block bg-brand/20 border border-brand/50 rounded-2xl" style={{ padding: '2vh 4vw' }}>
          <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Get started at</div>
          <div className="text-white font-bold" style={{ fontSize: '1.8vw' }}>ace.apps.44@gmail.com</div>
        </div>

        <div className="mt-6 text-white/30 text-xs">
          Questions? Contact us at ace.apps.44@gmail.com
        </div>
      </div>
    </div>
  )
}
