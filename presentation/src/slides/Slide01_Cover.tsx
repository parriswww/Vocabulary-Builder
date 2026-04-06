export default function Slide01_Cover() {
  return (
    <div className="slide-root bg-navy flex flex-col" style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 60%, #0F3460 100%)' }}>
      {/* Top accent bar */}
      <div className="h-1.5 bg-brand w-full" />

      <div className="flex-1 flex">
        {/* Left content */}
        <div className="flex-1 flex flex-col justify-center" style={{ padding: '5vh 6vw' }}>
          {/* Logo / brand */}
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-brand rounded-xl flex items-center justify-center" style={{ width: '3.5vw', height: '3.5vw', minWidth: 40, minHeight: 40 }}>
              <svg viewBox="0 0 24 24" fill="white" style={{ width: '2vw', minWidth: 22 }}>
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="text-brand font-bold" style={{ fontSize: '1.1vw' }}>ACE-Apps</div>
              <div className="text-white/40 font-medium" style={{ fontSize: '0.85vw' }}>Vocabulary Builder</div>
            </div>
          </div>

          {/* Main headline */}
          <h1 className="text-white font-black leading-tight" style={{ fontSize: '4.5vw' }}>
            The Smarter Way<br />
            <span className="text-brand">to Build English</span><br />
            Vocabulary
          </h1>

          {/* Vietnamese */}
          <p className="text-white/50 font-light italic mt-4" style={{ fontSize: '1.5vw' }}>
            Cách thông minh hơn để xây dựng vốn từ vựng tiếng Anh
          </p>

          {/* Tagline pills */}
          <div className="flex gap-3 mt-8 flex-wrap">
            {['Personalized', 'Science-Backed', 'Built for Vietnam'].map(tag => (
              <span key={tag} className="border border-brand/50 text-brand text-xs font-semibold px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* Trial callout */}
          <div className="mt-10 inline-flex items-center gap-3 bg-brand/10 border border-brand/30 rounded-xl" style={{ padding: '1.5vh 2vw' }}>
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <p className="text-white/80 font-medium" style={{ fontSize: '1.1vw' }}>
              7-day free trial · No credit card required
            </p>
          </div>
        </div>

        {/* Right decorative panel */}
        <div className="flex flex-col justify-center items-center" style={{ width: '38vw', padding: '5vh 4vw' }}>
          <div className="rounded-2xl w-full" style={{ background: 'linear-gradient(135deg, #5B6CF0 0%, #9B5CF6 100%)', padding: '3vh 3vw' }}>
            <div className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-4">Why Vocabulary Builder?</div>
            {[
              { stat: '2×', label: 'Faster recall with spaced repetition' },
              { stat: '500+', label: 'Words the average user learns in 90 days' },
              { stat: '5 min', label: 'Daily practice to see real results' },
              { stat: '100%', label: 'Your own words, your context' },
            ].map(({ stat, label }) => (
              <div key={stat} className="flex items-center gap-4 mb-4 last:mb-0">
                <div className="text-accent font-black" style={{ fontSize: '2.2vw', minWidth: '4vw' }}>{stat}</div>
                <div className="text-white/80 text-xs leading-snug">{label}</div>
              </div>
            ))}
          </div>

          {/* Decorative floating circles */}
          <div className="absolute opacity-10" style={{ width: '20vw', height: '20vw', borderRadius: '50%', background: '#F05A28', bottom: '10vh', right: '-5vw', zIndex: 0 }} />
          <div className="absolute opacity-5" style={{ width: '15vw', height: '15vw', borderRadius: '50%', background: '#9B5CF6', top: '5vh', right: '5vw', zIndex: 0 }} />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-8 py-3 border-t border-white/10">
        <span className="text-white/30 text-xs">ace.apps.44@gmail.com</span>
        <span className="text-white/30 text-xs">Confidential — For Presentation Only</span>
      </div>
    </div>
  )
}
