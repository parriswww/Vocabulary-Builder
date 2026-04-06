const pains = [
  {
    icon: '📝',
    title: 'Vocabulary is the #1 IELTS barrier',
    vi: 'Từ vựng là rào cản số 1 trong IELTS',
    detail: 'Band 7+ in Reading and Writing requires precise vocabulary — a single wrong word choice lowers your score.',
  },
  {
    icon: '😓',
    title: 'Generic textbook lists don\'t prepare you',
    vi: 'Danh sách từ trong sách giáo khoa không chuẩn bị đủ',
    detail: 'Academic word lists miss the context and depth examiners look for in top-band responses.',
  },
  {
    icon: '🔁',
    title: 'You cram before exams and forget after',
    vi: 'Học nhồi nhét trước kỳ thi và quên sau đó',
    detail: 'Intensive pre-exam study produces short-term recall. Exams test long-term retention.',
  },
  {
    icon: '⏳',
    title: 'Full-time students have limited spare time',
    vi: 'Sinh viên toàn thời gian có ít thời gian rảnh',
    detail: 'University workloads mean vocabulary study gets squeezed out — unless it\'s effortless and fast.',
  },
]

export default function Slide16_StudentPain() {
  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
      {/* Module banner */}
      <div className="bg-blue-600 flex items-center justify-between" style={{ padding: '1.2vh 5vw' }}>
        <div className="flex items-center gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
          <span className="text-white font-bold text-sm uppercase tracking-wider">Module B — For Students</span>
        </div>
        <span className="text-white/70 text-xs">Slide 16 of 21</span>
      </div>

      {/* Header */}
      <div className="bg-navy flex items-end justify-between" style={{ padding: '2.5vh 5vw 2vh' }}>
        <div>
          <h2 className="text-white font-black" style={{ fontSize: '2.8vw' }}>
            Vocabulary is the{' '}
            <span className="text-blue-400">Exam Differentiator</span>
          </h2>
          <p className="text-white/50 italic font-light" style={{ fontSize: '1.1vw', marginTop: '0.3vh' }}>
            Từ vựng là yếu tố phân biệt trong kỳ thi
          </p>
        </div>
      </div>

      {/* Pain cards */}
      <div className="flex-1 grid grid-cols-2 gap-5" style={{ padding: '3vh 5vw' }}>
        {pains.map(({ icon, title, vi, detail }) => (
          <div key={title} className="bg-white rounded-xl shadow-sm border border-gray-100 flex gap-4"
            style={{ padding: '2.5vh 2.5vw' }}>
            <div style={{ fontSize: '2.5vw' }} className="flex-shrink-0">{icon}</div>
            <div>
              <div className="text-navy font-bold" style={{ fontSize: '1.2vw' }}>{title}</div>
              <div className="text-blue-600 italic text-xs mt-0.5">{vi}</div>
              <div className="text-muted leading-relaxed mt-2" style={{ fontSize: '0.9vw' }}>{detail}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="bg-blue-600" style={{ padding: '1.8vh 5vw' }}>
        <p className="text-white font-bold text-center" style={{ fontSize: '1.3vw' }}>
          Smart vocabulary study — not more hours — is what separates Band 6 from Band 7+.
        </p>
      </div>
    </div>
  )
}
