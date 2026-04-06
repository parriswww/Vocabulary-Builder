export default function Slide06_SpacedRepetition() {
  const intervals = [
    { day: 'Day 1', label: 'First review', color: '#F05A28' },
    { day: 'Day 3', label: '2nd review',  color: '#F05A28' },
    { day: 'Day 7', label: '3rd review',  color: '#5B6CF0' },
    { day: 'Day 14', label: '4th review', color: '#5B6CF0' },
    { day: 'Day 30', label: '5th review', color: '#9B5CF6' },
    { day: 'Day 60', label: 'Long-term',  color: '#10B981' },
  ]

  return (
    <div className="slide-root flex" style={{ background: 'linear-gradient(160deg, #1A1A2E 0%, #16213E 100%)' }}>
      {/* Left */}
      <div className="flex flex-col justify-center" style={{ width: '50vw', padding: '6vh 6vw' }}>
        <p className="text-brand font-medium uppercase tracking-wider" style={{ fontSize: '0.85vw' }}>Feature 3 of 5</p>
        <h2 className="text-white font-black leading-tight mt-2" style={{ fontSize: '3.5vw' }}>
          The Science of<br />
          <span className="text-brand">Remembering</span>
        </h2>
        <p className="text-white/40 italic mt-2" style={{ fontSize: '1.1vw' }}>Khoa học của việc ghi nhớ</p>

        <p className="text-white/70 leading-relaxed mt-6" style={{ fontSize: '1.1vw' }}>
          We use the <strong className="text-accent">SM-2 spaced repetition algorithm</strong> — the same method
          used by millions of language learners worldwide. You only review a word
          exactly when your brain is about to forget it, making each session maximally
          efficient.
        </p>
        <p className="text-white/40 italic mt-2" style={{ fontSize: '0.9vw' }}>
          Chúng tôi dùng thuật toán lặp lại ngắt quãng SM-2 — đưa từ vựng đúng lúc bạn sắp quên.
        </p>

        <div className="grid grid-cols-2 gap-4 mt-8">
          {[
            { val: '2×', desc: 'Faster long-term retention' },
            { val: '80%', desc: 'Less review time vs. traditional study' },
          ].map(({ val, desc }) => (
            <div key={val} className="bg-white/5 rounded-xl" style={{ padding: '2vh 2vw' }}>
              <div className="text-accent font-black" style={{ fontSize: '2.5vw' }}>{val}</div>
              <div className="text-white/60 text-xs mt-1">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: interval timeline */}
      <div className="flex-1 flex flex-col justify-center" style={{ padding: '5vh 4vw 5vh 2vw' }}>
        <div className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-6">Review schedule for one word</div>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-white/10" />
          <div className="space-y-4">
            {intervals.map(({ day, label, color }) => (
              <div key={day} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                  style={{ background: color, width: '2.5vw', height: '2.5vw', minWidth: 36, minHeight: 36 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div className="flex-1 rounded-xl flex items-center justify-between"
                  style={{ background: 'rgba(255,255,255,0.06)', padding: '1.5vh 2vw', border: `1px solid ${color}30` }}>
                  <div>
                    <div className="text-white font-bold" style={{ fontSize: '1.1vw' }}>{label}</div>
                  </div>
                  <div className="font-black" style={{ color, fontSize: '1.1vw' }}>{day}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 text-white/30 text-xs">
          Mastery level increases with each successful review — 5 levels from New to Master
        </div>
      </div>
    </div>
  )
}
