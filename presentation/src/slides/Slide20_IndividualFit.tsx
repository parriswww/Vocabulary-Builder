const moments = [
  { time: '7:00 AM', activity: 'Morning commute', action: 'Review 5 words on your phone — during the bus or Grab ride.' },
  { time: '12:00 PM', activity: 'Lunch break', action: 'Add 2 new words you heard in a meeting or read in an email.' },
  { time: '8:00 PM', activity: 'Evening wind-down', action: 'Quick 10-word quiz — 5 minutes before your favourite show.' },
]

export default function Slide20_IndividualFit() {
  return (
    <div className="slide-root flex" style={{ background: 'linear-gradient(160deg, #1A1A2E 0%, #16213E 100%)' }}>
      <div className="flex-1 flex flex-col">
        {/* Module banner */}
        <div className="bg-emerald-600 flex items-center justify-between" style={{ padding: '1.2vh 5vw' }}>
          <div className="flex items-center gap-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span className="text-white font-bold text-sm uppercase tracking-wider">Module C — For Individuals</span>
          </div>
          <span className="text-white/70 text-xs">Slide 20 of 21</span>
        </div>

        <div className="flex-1 flex gap-8" style={{ padding: '4vh 5vw' }}>
          {/* Left */}
          <div className="flex flex-col justify-center" style={{ width: '42vw' }}>
            <h2 className="text-white font-black leading-tight" style={{ fontSize: '3.2vw' }}>
              5 Minutes a Day.<br />
              <span className="text-emerald-400">Real Results.</span>
            </h2>
            <p className="text-white/40 italic mt-2" style={{ fontSize: '1.1vw' }}>
              5 phút mỗi ngày. Kết quả thực sự.
            </p>
            <p className="text-white/70 leading-relaxed mt-5" style={{ fontSize: '1.1vw' }}>
              You don't need to carve out study sessions. Vocabulary Builder
              fits into the small gaps that already exist in your day —
              making it the most sustainable way to build fluency.
            </p>
            <p className="text-white/40 italic mt-2" style={{ fontSize: '0.9vw' }}>
              Bạn không cần dành riêng thời gian học. Từ vựng được xây dựng trong những khoảnh khắc nhỏ trong ngày.
            </p>

            {/* Day moments */}
            <div className="mt-6 space-y-3">
              {moments.map(({ time, activity, action }) => (
                <div key={time} className="flex gap-4 items-start rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(52,211,153,0.2)', padding: '2vh 2vw' }}>
                  <div className="flex-shrink-0 text-right" style={{ width: '4.5vw' }}>
                    <div className="text-emerald-400 font-bold" style={{ fontSize: '1vw' }}>{time}</div>
                    <div className="text-white/30 text-xs">{activity}</div>
                  </div>
                  <div className="text-white/70" style={{ fontSize: '0.95vw' }}>{action}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: stats */}
          <div className="flex-1 flex flex-col justify-center gap-4">
            {[
              { val: '365', unit: 'days of 5 min', label: 'Equals 30 hours of focused study', color: '#10B981' },
              { val: '500+', unit: 'words', label: 'Average learned in 90 days of daily use', color: '#F05A28' },
              { val: '0', unit: 'apps', label: 'No installation needed — runs in any browser', color: '#5B6CF0' },
            ].map(({ val, unit, label, color }) => (
              <div key={val} className="rounded-2xl"
                style={{ background: `${color}15`, border: `1px solid ${color}30`, padding: '3vh 3vw' }}>
                <div className="flex items-end gap-2">
                  <div className="font-black" style={{ color, fontSize: '3vw', lineHeight: 1 }}>{val}</div>
                  <div className="font-bold mb-1" style={{ color: `${color}99`, fontSize: '1vw' }}>{unit}</div>
                </div>
                <div className="text-white/60 mt-1" style={{ fontSize: '0.9vw' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
