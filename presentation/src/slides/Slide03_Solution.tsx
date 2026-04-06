const features = [
  { color: '#F05A28', label: 'Add your own words', vi: 'Thêm từ của bạn' },
  { color: '#5B6CF0', label: 'Real sentence context', vi: 'Ngữ cảnh câu thực tế' },
  { color: '#9B5CF6', label: 'Smart spaced repetition', vi: 'Lặp lại theo khoa học' },
  { color: '#FFC107', label: 'Track daily streaks', vi: 'Theo dõi chuỗi ngày học' },
  { color: '#10B981', label: 'Sync across all devices', vi: 'Đồng bộ mọi thiết bị' },
]

export default function Slide03_Solution() {
  return (
    <div className="slide-root flex" style={{ background: 'linear-gradient(160deg, #1A1A2E 0%, #16213E 100%)' }}>
      {/* Left: headline */}
      <div className="flex flex-col justify-center" style={{ width: '48vw', padding: '6vh 6vw' }}>
        <div className="text-brand font-bold uppercase tracking-wider mb-4" style={{ fontSize: '0.85vw' }}>
          Introducing
        </div>
        <h2 className="text-white font-black leading-tight" style={{ fontSize: '4vw' }}>
          Vocabulary Builder<br />
          <span className="text-brand">Your Words.</span><br />
          Your Way.
        </h2>
        <p className="text-white/50 italic font-light mt-3" style={{ fontSize: '1.2vw' }}>
          Từ vựng của bạn. Theo cách của bạn.
        </p>

        <p className="text-white/70 leading-relaxed mt-6" style={{ fontSize: '1.2vw' }}>
          A vocabulary learning app built around <strong className="text-white">your</strong> words,
          your context, and your schedule — powered by the same memory science used
          by language learners worldwide.
        </p>
        <p className="text-white/40 italic mt-2" style={{ fontSize: '0.9vw' }}>
          Ứng dụng học từ vựng xây dựng xung quanh từ của bạn, ngữ cảnh của bạn, lịch trình của bạn.
        </p>

        {/* CTA badge */}
        <div className="mt-8 inline-flex items-center gap-2 bg-brand rounded-lg text-white font-bold" style={{ padding: '1.2vh 2vw', fontSize: '1.1vw', alignSelf: 'flex-start' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          7-day free trial · 500,000 ₫ / 6 months
        </div>
      </div>

      {/* Right: feature stack */}
      <div className="flex-1 flex flex-col justify-center" style={{ padding: '5vh 5vw 5vh 2vw' }}>
        <div className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-5">
          Everything in one app
        </div>
        <div className="space-y-3">
          {features.map(({ color, label, vi }) => (
            <div
              key={label}
              className="flex items-center gap-4 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.06)', padding: '2vh 2vw', border: `1px solid ${color}30` }}
            >
              <div className="rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: color, width: '2.5vw', height: '2.5vw', minWidth: 32, minHeight: 32 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div>
                <div className="text-white font-semibold" style={{ fontSize: '1.15vw' }}>{label}</div>
                <div className="text-white/40 text-xs italic">{vi}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
