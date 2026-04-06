export default function Slide18_StudentAnecdote() {
  return (
    <div className="slide-root flex flex-col" style={{ background: 'linear-gradient(160deg, #1A1A2E 0%, #16213E 100%)' }}>
      {/* Module banner */}
      <div className="bg-blue-600 flex items-center justify-between" style={{ padding: '1.2vh 5vw' }}>
        <div className="flex items-center gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
          <span className="text-white font-bold text-sm uppercase tracking-wider">Module B — For Students</span>
        </div>
        <span className="text-white/70 text-xs">Slide 18 of 21</span>
      </div>

      <div className="flex-1 flex gap-8" style={{ padding: '4vh 6vw' }}>
        {/* Left: Profile */}
        <div className="flex flex-col justify-center" style={{ width: '28vw' }}>
          <div className="rounded-2xl text-center"
            style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #5B6CF0 100%)', padding: '4vh 3vw' }}>
            <div className="rounded-full bg-white/20 mx-auto flex items-center justify-center mb-4"
              style={{ width: '5vw', height: '5vw', minWidth: 60, minHeight: 60 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" style={{ width: '2.5vw' }}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div className="text-white font-black" style={{ fontSize: '1.6vw' }}>Pham Thi Linh</div>
            <div className="text-white/70 text-xs mt-1">Final Year Student</div>
            <div className="text-white/50 text-xs">Foreign Trade University · Hanoi</div>

            <div className="mt-5 pt-4 border-t border-white/20 grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="text-blue-200 font-black" style={{ fontSize: '1.6vw' }}>6.0 → 7.5</div>
                <div className="text-white/60 text-xs">IELTS band score</div>
              </div>
              <div className="text-center">
                <div className="text-blue-200 font-black" style={{ fontSize: '1.6vw' }}>3 mo</div>
                <div className="text-white/60 text-xs">to achieve it</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Story */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-blue-400 font-bold uppercase tracking-wider mb-3" style={{ fontSize: '0.85vw' }}>
            Student Story
          </div>
          <div className="text-white/30" style={{ fontSize: '4vw', lineHeight: 1 }}>"</div>
          <blockquote className="text-white font-medium leading-relaxed" style={{ fontSize: '1.4vw', marginTop: '-1vh' }}>
            I needed a 7.0 for my scholarship application. My vocabulary was my weakest point —
            I kept using simple words when the examiner expected sophisticated ones.
            Three months of Vocabulary Builder later, I scored 7.5. The scholarship was mine.
            I reviewed words during my commute. Just 5 minutes each morning.
          </blockquote>
          <p className="text-white/40 italic mt-3" style={{ fontSize: '0.95vw' }}>
            Tôi cần điểm 7.0 cho đơn học bổng của mình. Sau 3 tháng dùng Vocabulary Builder,
            tôi đạt 7.5. Học bổng đã thuộc về tôi.
          </p>

          <div className="mt-6 flex gap-4">
            <div className="flex-1 rounded-xl bg-white/5 border border-white/10" style={{ padding: '2vh 2vw' }}>
              <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Before</div>
              <div className="text-white font-medium" style={{ fontSize: '1vw' }}>Band 6.0. Using simple, basic vocabulary. Lost marks on Writing Task 2.</div>
            </div>
            <div className="flex-1 rounded-xl bg-blue-500/15 border border-blue-500/30" style={{ padding: '2vh 2vw' }}>
              <div className="text-blue-400 text-xs uppercase tracking-wider mb-1">After 3 months</div>
              <div className="text-white font-medium" style={{ fontSize: '1vw' }}>Band 7.5. Sophisticated, precise vocabulary. Scholarship awarded.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
