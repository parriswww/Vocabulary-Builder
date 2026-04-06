export default function Slide07_Progress() {
  const masteryData = [
    { level: 'New',       count: 12, pct: 16, color: '#6B7280' },
    { level: 'Learning',  count: 18, pct: 24, color: '#5B6CF0' },
    { level: 'Reviewing', count: 22, pct: 29, color: '#FFC107' },
    { level: 'Known',     count: 14, pct: 19, color: '#F05A28' },
    { level: 'Master',    count: 9,  pct: 12, color: '#10B981' },
  ]

  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
      {/* Header */}
      <div className="bg-brand flex items-end justify-between" style={{ padding: '3vh 5vw 2.5vh' }}>
        <div>
          <p className="text-white/70 font-medium uppercase tracking-wider" style={{ fontSize: '0.85vw' }}>Feature 4 of 5</p>
          <h2 className="text-white font-black" style={{ fontSize: '3vw' }}>Track Every Step Forward</h2>
          <p className="text-white/60 italic font-light" style={{ fontSize: '1.1vw', marginTop: '0.3vh' }}>Theo dõi từng bước tiến bộ của bạn</p>
        </div>
        <div className="text-white/20 font-black" style={{ fontSize: '5vw' }}>07</div>
      </div>

      <div className="flex-1 flex gap-6" style={{ padding: '4vh 5vw' }}>
        {/* Left: mastery levels */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-navy font-bold mb-4" style={{ fontSize: '1.3vw' }}>Your vocabulary by mastery level</div>
          <div className="space-y-3">
            {masteryData.map(({ level, count, pct, color }) => (
              <div key={level} className="flex items-center gap-4">
                <div className="text-right font-semibold text-gray-600 flex-shrink-0" style={{ width: '5vw', fontSize: '0.9vw' }}>
                  {level}
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden relative">
                  <div className="h-6 rounded-full flex items-center justify-end pr-2 transition-all"
                    style={{ width: `${pct}%`, background: color }}>
                    <span className="text-white text-xs font-bold">{count}</span>
                  </div>
                </div>
                <div className="text-muted text-xs flex-shrink-0" style={{ width: '3vw' }}>{pct}%</div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100" style={{ padding: '2.5vh 2.5vw' }}>
            <div className="text-muted text-xs uppercase tracking-wider mb-3">Daily streak</div>
            <div className="flex items-end gap-1">
              {[3,5,4,6,5,7,6,8,7,9,8,10,9,11].map((h, i) => (
                <div key={i} className="rounded-sm flex-1"
                  style={{ height: `${h * 5}px`, background: i === 13 ? '#F05A28' : '#5B6CF030' }} />
              ))}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <div className="bg-brand/10 rounded-lg" style={{ padding: '0.8vh 1.2vw' }}>
                <span className="text-brand font-black" style={{ fontSize: '1.8vw' }}>14</span>
                <span className="text-brand font-bold text-xs ml-1">day streak</span>
              </div>
              <div className="text-muted text-xs">Keep it going — you're building a habit!</div>
            </div>
          </div>
        </div>

        {/* Right: stat cards */}
        <div className="flex flex-col gap-4 justify-center" style={{ width: '35vw' }}>
          {[
            { val: '75', unit: 'words', label: 'Total in your library', color: '#5B6CF0' },
            { val: '23', unit: 'today', label: 'Words reviewed this session', color: '#F05A28' },
            { val: '92%', unit: '', label: 'Correct answers this week', color: '#10B981' },
            { val: '14', unit: 'days', label: 'Current learning streak', color: '#FFC107' },
          ].map(({ val, unit, label, color }) => (
            <div key={label} className="rounded-xl flex items-center gap-4"
              style={{ background: `${color}15`, border: `1px solid ${color}30`, padding: '2.5vh 2.5vw' }}>
              <div>
                <div className="font-black leading-none" style={{ color, fontSize: '2.5vw' }}>
                  {val} <span style={{ fontSize: '1vw', color: `${color}BB` }}>{unit}</span>
                </div>
                <div className="text-navy text-xs font-medium mt-1">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
