export default function Slide15_BusinessAnecdote() {
  return (
    <div className="slide-root flex flex-col" style={{ background: 'linear-gradient(160deg, #1A1A2E 0%, #16213E 100%)' }}>
      {/* Module banner */}
      <div className="bg-amber-500 flex items-center justify-between" style={{ padding: '1.2vh 5vw' }}>
        <div className="flex items-center gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
          <span className="text-white font-bold text-sm uppercase tracking-wider">Module A — For Businesses</span>
        </div>
        <span className="text-white/70 text-xs">Slide 15 of 21</span>
      </div>

      <div className="flex-1 flex gap-8" style={{ padding: '4vh 6vw' }}>
        {/* Left: Profile */}
        <div className="flex flex-col justify-center" style={{ width: '28vw' }}>
          <div className="rounded-2xl text-center"
            style={{ background: 'linear-gradient(135deg, #F05A28 0%, #C43F10 100%)', padding: '4vh 3vw' }}>
            <div className="w-16 h-16 rounded-full bg-white/20 mx-auto flex items-center justify-center mb-4"
              style={{ width: '5vw', height: '5vw', minWidth: 60, minHeight: 60 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" style={{ width: '2.5vw' }}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div className="text-white font-black" style={{ fontSize: '1.6vw' }}>Nguyen Van Minh</div>
            <div className="text-white/70 text-xs mt-1">Procurement Manager</div>
            <div className="text-white/50 text-xs">Logistics Company · Ho Chi Minh City</div>

            <div className="mt-5 pt-4 border-t border-white/20 grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="text-accent font-black" style={{ fontSize: '1.8vw' }}>3 mo</div>
                <div className="text-white/60 text-xs">using the app</div>
              </div>
              <div className="text-center">
                <div className="text-accent font-black" style={{ fontSize: '1.8vw' }}>320+</div>
                <div className="text-white/60 text-xs">words learned</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Story */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-amber-400 font-bold uppercase tracking-wider mb-3" style={{ fontSize: '0.85vw' }}>
            Customer Story
          </div>
          <div className="text-white/30" style={{ fontSize: '4vw', lineHeight: 1 }}>"</div>
          <blockquote className="text-white font-medium leading-relaxed" style={{ fontSize: '1.4vw', marginTop: '-1vh' }}>
            I was losing deals because I couldn't express contract terms confidently in English.
            After three months with Vocabulary Builder — focusing on procurement and legal vocabulary —
            I closed our largest international contract. The client commented on how professional
            our communication was.
          </blockquote>
          <p className="text-white/40 italic mt-3" style={{ fontSize: '0.95vw' }}>
            Tôi từng mất hợp đồng vì không thể diễn đạt điều khoản hợp đồng tự tin bằng tiếng Anh.
            Sau 3 tháng dùng Vocabulary Builder — tập trung vào từ vựng mua sắm và pháp lý —
            tôi đã ký hợp đồng quốc tế lớn nhất của mình.
          </p>

          <div className="mt-6 flex gap-4">
            <div className="flex-1 rounded-xl bg-white/5 border border-white/10" style={{ padding: '2vh 2vw' }}>
              <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Before</div>
              <div className="text-white font-medium" style={{ fontSize: '1vw' }}>Hesitant in English meetings. Generic word lists. Slow progress.</div>
            </div>
            <div className="flex-1 rounded-xl bg-amber-500/15 border border-amber-500/30" style={{ padding: '2vh 2vw' }}>
              <div className="text-amber-400 text-xs uppercase tracking-wider mb-1">After 3 months</div>
              <div className="text-white font-medium" style={{ fontSize: '1vw' }}>Confident negotiations. Industry vocabulary mastered. Contract won.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
