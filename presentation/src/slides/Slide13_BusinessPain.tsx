const pains = [
  {
    icon: '💼',
    title: 'Lost deals due to language gaps',
    vi: 'Mất hợp đồng vì rào cản ngôn ngữ',
    detail: 'Miscommunicated terms, unclear proposals, and lack of confidence in English negotiations cost businesses real revenue.',
  },
  {
    icon: '📧',
    title: 'Unprofessional emails & reports',
    vi: 'Email và báo cáo thiếu chuyên nghiệp',
    detail: 'Vocabulary gaps make written communication seem junior to international partners and clients.',
  },
  {
    icon: '🤝',
    title: 'Hesitation in meetings & presentations',
    vi: 'Ngần ngại trong họp và thuyết trình',
    detail: 'When your team can\'t confidently articulate ideas, your brand suffers.',
  },
  {
    icon: '📈',
    title: 'Slower career growth for high-potential staff',
    vi: 'Thăng tiến chậm hơn cho nhân viên tiềm năng',
    detail: 'Your best people can\'t reach senior or international roles without strong English vocabulary.',
  },
]

export default function Slide13_BusinessPain() {
  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
      {/* Module banner */}
      <div className="bg-amber-500 flex items-center justify-between" style={{ padding: '1.2vh 5vw' }}>
        <div className="flex items-center gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
          <span className="text-white font-bold text-sm uppercase tracking-wider">Module A — For Businesses</span>
        </div>
        <span className="text-white/70 text-xs">Slide 13 of 21</span>
      </div>

      {/* Header */}
      <div className="bg-navy flex items-end justify-between" style={{ padding: '2.5vh 5vw 2vh' }}>
        <div>
          <h2 className="text-white font-black" style={{ fontSize: '2.8vw' }}>
            When Your Team's English{' '}
            <span className="text-amber-400">Holds Business Back</span>
          </h2>
          <p className="text-white/50 italic font-light" style={{ fontSize: '1.1vw', marginTop: '0.3vh' }}>
            Khi vốn tiếng Anh của đội ngũ cản trở hoạt động kinh doanh
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
              <div className="text-amber-600 italic text-xs mt-0.5">{vi}</div>
              <div className="text-muted leading-relaxed mt-2" style={{ fontSize: '0.9vw' }}>{detail}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="bg-amber-500" style={{ padding: '1.8vh 5vw' }}>
        <p className="text-white font-bold text-center" style={{ fontSize: '1.3vw' }}>
          The good news: vocabulary is a skill that improves quickly with the right tool.
        </p>
      </div>
    </div>
  )
}
