export default function Slide04_Personalization() {
  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
      {/* Header */}
      <div className="bg-brand flex items-end justify-between" style={{ padding: '3vh 5vw 2.5vh' }}>
        <div>
          <p className="text-white/70 font-medium uppercase tracking-wider" style={{ fontSize: '0.85vw' }}>Feature 1 of 5</p>
          <h2 className="text-white font-black" style={{ fontSize: '3vw' }}>Your Words, Not Someone Else's</h2>
          <p className="text-white/60 italic font-light" style={{ fontSize: '1.1vw', marginTop: '0.3vh' }}>Từ của bạn, không phải từ của người khác</p>
        </div>
        <div className="text-white/20 font-black" style={{ fontSize: '5vw' }}>04</div>
      </div>

      <div className="flex-1 flex gap-6" style={{ padding: '4vh 5vw' }}>
        {/* Left column — the flow */}
        <div className="flex-1 flex flex-col justify-center space-y-4">
          {[
            { step: '1', title: 'Encounter a word', detail: 'In an email, meeting, or article — you find a word you want to remember.' },
            { step: '2', title: 'Add it instantly', detail: 'Type the word. We fetch the definition and example sentence automatically.' },
            { step: '3', title: 'Tag & organize', detail: 'Group words by topic, project, or proficiency level.' },
            { step: '4', title: 'Review at the right time', detail: 'Our algorithm brings it back exactly when you\'re about to forget it.' },
          ].map(({ step, title, detail }) => (
            <div key={step} className="flex items-start gap-4">
              <div className="bg-brand text-white font-black rounded-full flex items-center justify-center flex-shrink-0"
                style={{ width: '2.8vw', height: '2.8vw', minWidth: 36, minHeight: 36, fontSize: '1.1vw' }}>
                {step}
              </div>
              <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100" style={{ padding: '1.8vh 2vw' }}>
                <div className="text-navy font-bold" style={{ fontSize: '1.2vw' }}>{title}</div>
                <div className="text-muted" style={{ fontSize: '0.9vw', marginTop: '0.4vh' }}>{detail}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Right column — highlight card */}
        <div className="flex flex-col justify-center" style={{ width: '36vw' }}>
          <div className="rounded-2xl text-white h-full flex flex-col justify-between"
            style={{ background: 'linear-gradient(135deg, #5B6CF0 0%, #9B5CF6 100%)', padding: '4vh 3vw' }}>
            <div>
              <div className="text-white/60 font-semibold uppercase tracking-wider" style={{ fontSize: '0.8vw' }}>
                Built-in Dictionary
              </div>
              <div className="text-white font-black mt-3" style={{ fontSize: '2.2vw' }}>
                Auto-fetch definitions &amp; examples
              </div>
              <div className="text-white/60 italic mt-2" style={{ fontSize: '1vw' }}>
                Tự động lấy định nghĩa và ví dụ
              </div>
            </div>

            <div className="bg-white/10 rounded-xl mt-6" style={{ padding: '2.5vh 2vw' }}>
              <div className="text-white/50 text-xs mb-2 uppercase tracking-wider">Example word card</div>
              <div className="text-accent font-black" style={{ fontSize: '2vw' }}>procurement</div>
              <div className="text-white/80 text-xs mt-1 italic">noun · /prəˈkjʊərmənt/</div>
              <div className="text-white/80 mt-3" style={{ fontSize: '0.9vw' }}>
                The process of obtaining goods or services, especially for a business or government body.
              </div>
              <div className="text-white/50 mt-2" style={{ fontSize: '0.8vw' }}>
                "The procurement team negotiated a 30% cost reduction."
              </div>
              <div className="flex gap-2 mt-3">
                <span className="bg-brand/30 text-white text-xs px-2 py-0.5 rounded">Business</span>
                <span className="bg-white/10 text-white/70 text-xs px-2 py-0.5 rounded">Due for review today</span>
              </div>
            </div>

            <div className="text-white/50 text-xs mt-4">
              500+ words · CSV import · Bulk add
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
