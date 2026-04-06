export default function Slide21_IndividualAnecdote() {
  return (
    <div className="slide-root flex flex-col" style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 60%, #0F3460 100%)' }}>
      {/* Module banner */}
      <div className="bg-emerald-600 flex items-center justify-between" style={{ padding: '1.2vh 5vw' }}>
        <div className="flex items-center gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <span className="text-white font-bold text-sm uppercase tracking-wider">Module C — For Individuals</span>
        </div>
        <span className="text-white/70 text-xs">Slide 21 of 21</span>
      </div>

      <div className="flex-1 flex gap-8" style={{ padding: '4vh 6vw' }}>
        {/* Left: Profile */}
        <div className="flex flex-col justify-center" style={{ width: '28vw' }}>
          <div className="rounded-2xl text-center"
            style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', padding: '4vh 3vw' }}>
            <div className="rounded-full bg-white/20 mx-auto flex items-center justify-center mb-4"
              style={{ width: '5vw', height: '5vw', minWidth: 60, minHeight: 60 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" style={{ width: '2.5vw' }}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div className="text-white font-black" style={{ fontSize: '1.6vw' }}>Tran Thi Hoa</div>
            <div className="text-white/70 text-xs mt-1">Marketing Executive</div>
            <div className="text-white/50 text-xs">Da Nang · 31 years old</div>

            <div className="mt-5 pt-4 border-t border-white/20 grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="text-emerald-200 font-black" style={{ fontSize: '1.6vw' }}>4 mo</div>
                <div className="text-white/60 text-xs">using the app</div>
              </div>
              <div className="text-center">
                <div className="text-emerald-200 font-black" style={{ fontSize: '1.6vw' }}>280+</div>
                <div className="text-white/60 text-xs">words mastered</div>
              </div>
            </div>
          </div>

          {/* Final CTA card */}
          <div className="mt-4 rounded-xl bg-brand text-white text-center" style={{ padding: '2.5vh 2vw' }}>
            <div className="font-black" style={{ fontSize: '1.1vw' }}>Start your free trial</div>
            <div className="text-white/70 text-xs mt-1">7 days · No card needed</div>
            <div className="mt-2 text-xs text-white/60">500,000 ₫ / 6 months after</div>
          </div>
        </div>

        {/* Right: Story */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-emerald-400 font-bold uppercase tracking-wider mb-3" style={{ fontSize: '0.85vw' }}>
            Individual Story
          </div>
          <div className="text-white/30" style={{ fontSize: '4vw', lineHeight: 1 }}>"</div>
          <blockquote className="text-white font-medium leading-relaxed" style={{ fontSize: '1.4vw', marginTop: '-1vh' }}>
            I used to translate every sentence in my head before speaking. After four months of
            building vocabulary my way — words I actually use at work, words I hear in podcasts —
            I stopped translating. English started flowing naturally. My colleagues noticed.
            My manager noticed. That was worth every dong.
          </blockquote>
          <p className="text-white/40 italic mt-3" style={{ fontSize: '0.95vw' }}>
            Tôi từng phải dịch từng câu trong đầu trước khi nói. Sau 4 tháng xây dựng vốn từ
            theo cách của mình, tôi ngừng dịch. Tiếng Anh bắt đầu trôi chảy tự nhiên.
          </p>

          <div className="mt-6 flex gap-4">
            <div className="flex-1 rounded-xl bg-white/5 border border-white/10" style={{ padding: '2vh 2vw' }}>
              <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Before</div>
              <div className="text-white font-medium" style={{ fontSize: '1vw' }}>Translating in her head. Hesitant to speak. Generic word lists that didn't connect.</div>
            </div>
            <div className="flex-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30" style={{ padding: '2vh 2vw' }}>
              <div className="text-emerald-400 text-xs uppercase tracking-wider mb-1">After 4 months</div>
              <div className="text-white font-medium" style={{ fontSize: '1vw' }}>Speaks without translating. Promoted. Confident in international client calls.</div>
            </div>
          </div>

          {/* Final message */}
          <div className="mt-5 text-center border-t border-white/10 pt-4">
            <div className="text-white/40 text-xs uppercase tracking-wider">ACE-Apps · Vocabulary Builder · ace.apps.44@gmail.com</div>
          </div>
        </div>
      </div>
    </div>
  )
}
