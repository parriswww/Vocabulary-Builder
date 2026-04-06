const problems = [
  {
    icon: '📚',
    en: 'Studying hard, forgetting fast',
    vi: 'Học nhiều nhưng quên nhanh',
    detail: 'Traditional flashcard apps repeat the wrong words at the wrong time.',
  },
  {
    icon: '🔀',
    en: 'Generic word lists that don\'t stick',
    vi: 'Danh sách từ chung chung không phù hợp',
    detail: 'Someone else\'s vocabulary is not your vocabulary — context matters.',
  },
  {
    icon: '⏱',
    en: 'No time for long study sessions',
    vi: 'Không có thời gian học dài',
    detail: 'Busy schedules make it hard to commit to structured study programs.',
  },
  {
    icon: '📵',
    en: 'Progress disappears between devices',
    vi: 'Tiến độ không đồng bộ giữa các thiết bị',
    detail: 'Switching phone/tablet/laptop means losing your streak and context.',
  },
]

export default function Slide02_Problem() {
  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
      {/* Header bar */}
      <div className="bg-navy flex items-center justify-between" style={{ padding: '2.5vh 5vw' }}>
        <div>
          <h2 className="text-white font-black" style={{ fontSize: '2.8vw' }}>
            Most People Study Hard.{' '}
            <span className="text-brand">But Still Forget.</span>
          </h2>
          <p className="text-white/50 font-light italic" style={{ fontSize: '1.1vw', marginTop: '0.5vh' }}>
            Hầu hết mọi người học chăm chỉ — nhưng vẫn quên từ vựng
          </p>
        </div>
        <div className="text-white/20 font-black" style={{ fontSize: '5vw' }}>02</div>
      </div>

      {/* Problem cards */}
      <div className="flex-1 grid grid-cols-2 gap-5" style={{ padding: '4vh 5vw' }}>
        {problems.map(({ icon, en, vi, detail }) => (
          <div key={en} className="bg-white rounded-xl shadow-sm border border-gray-100 flex gap-4 items-start" style={{ padding: '3vh 2.5vw' }}>
            <div className="text-3xl flex-shrink-0" style={{ fontSize: '2.5vw' }}>{icon}</div>
            <div>
              <div className="text-navy font-bold" style={{ fontSize: '1.3vw' }}>{en}</div>
              <div className="text-muted italic" style={{ fontSize: '1vw', marginTop: '0.3vh' }}>{vi}</div>
              <div className="text-gray-500 leading-relaxed" style={{ fontSize: '0.9vw', marginTop: '1vh' }}>{detail}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom callout */}
      <div className="bg-brand" style={{ padding: '2vh 5vw' }}>
        <p className="text-white font-bold text-center" style={{ fontSize: '1.4vw' }}>
          The problem is not effort — it's the method. There's a better way.
        </p>
        <p className="text-white/60 text-center italic" style={{ fontSize: '0.95vw', marginTop: '0.3vh' }}>
          Vấn đề không phải là sự cố gắng — mà là phương pháp. Có một cách tốt hơn.
        </p>
      </div>
    </div>
  )
}
