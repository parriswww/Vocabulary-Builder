const benefits = [
  { title: 'Industry-specific word lists', detail: 'Import CSV vocabulary sets for logistics, finance, tech, or HR — tailored to your business domain.', icon: '📋' },
  { title: 'Each employee\'s own account', detail: 'Personal vocabulary libraries reflect each person\'s role, gaps, and progress independently.', icon: '👤' },
  { title: 'Track team engagement', detail: 'Use the admin dashboard to see who\'s active and which vocabulary areas need attention.', icon: '📊' },
  { title: 'Mobile-first — no training required', detail: 'Your team can start during their lunch break. No installation, no IT department needed.', icon: '📱' },
]

export default function Slide14_BusinessSolution() {
  return (
    <div className="slide-root flex" style={{ background: 'linear-gradient(160deg, #1A1A2E 0%, #16213E 100%)' }}>
      <div className="flex-1 flex flex-col" style={{ padding: '0' }}>
        {/* Module banner */}
        <div className="bg-amber-500 flex items-center justify-between" style={{ padding: '1.2vh 5vw' }}>
          <div className="flex items-center gap-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
            <span className="text-white font-bold text-sm uppercase tracking-wider">Module A — For Businesses</span>
          </div>
          <span className="text-white/70 text-xs">Slide 14 of 21</span>
        </div>

        <div className="flex-1 flex gap-6" style={{ padding: '4vh 5vw' }}>
          {/* Left: headline */}
          <div className="flex flex-col justify-center" style={{ width: '40vw' }}>
            <h2 className="text-white font-black leading-tight" style={{ fontSize: '3.2vw' }}>
              Vocabulary Builder<br />
              <span className="text-amber-400">for Your Team</span>
            </h2>
            <p className="text-white/40 italic mt-2" style={{ fontSize: '1.1vw' }}>
              Vocabulary Builder dành cho đội ngũ của bạn
            </p>
            <p className="text-white/70 leading-relaxed mt-5" style={{ fontSize: '1.1vw' }}>
              Give each team member a personalized vocabulary practice tool,
              tuned to your industry. Track progress without micromanaging.
              See results in weeks, not months.
            </p>
            <p className="text-white/40 italic mt-2" style={{ fontSize: '0.9vw' }}>
              Trao cho mỗi thành viên công cụ luyện từ vựng cá nhân hóa, phù hợp với ngành của bạn.
            </p>

            <div className="mt-6 rounded-xl bg-amber-500/20 border border-amber-500/30" style={{ padding: '2.5vh 2.5vw' }}>
              <div className="text-amber-400 font-black" style={{ fontSize: '2vw' }}>500,000 ₫</div>
              <div className="text-white/60 text-xs">per person / 6 months · +10% VAT</div>
              <div className="text-white/50 text-xs mt-1">Volume pricing available — contact us</div>
            </div>
          </div>

          {/* Right: benefit cards */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            {benefits.map(({ title, detail, icon }) => (
              <div key={title} className="rounded-xl flex flex-col gap-2"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', padding: '2.5vh 2vw' }}>
                <div style={{ fontSize: '2vw' }}>{icon}</div>
                <div className="text-white font-bold" style={{ fontSize: '1.05vw' }}>{title}</div>
                <div className="text-white/50" style={{ fontSize: '0.85vw' }}>{detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
