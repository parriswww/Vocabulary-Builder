const personas = [
  {
    icon: '🌍',
    name: 'The Traveler',
    vi: 'Người đi du lịch',
    aspiration: 'Wants to connect authentically with people in English-speaking countries.',
    pain: 'Knows grammar well but doesn\'t have the words when it matters.',
    color: '#F05A28',
  },
  {
    icon: '💼',
    name: 'The Career Climber',
    vi: 'Người thăng tiến sự nghiệp',
    aspiration: 'Wants to impress international colleagues and get that promotion.',
    pain: 'Holds back in meetings because the right word doesn\'t come fast enough.',
    color: '#5B6CF0',
  },
  {
    icon: '📺',
    name: 'The Content Consumer',
    vi: 'Người tiêu thụ nội dung',
    aspiration: 'Wants to understand Netflix, YouTube, and podcasts without subtitles.',
    pain: 'Missing vocabulary makes media exhausting instead of enjoyable.',
    color: '#9B5CF6',
  },
]

export default function Slide19_IndividualAspiration() {
  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
      {/* Module banner */}
      <div className="bg-emerald-600 flex items-center justify-between" style={{ padding: '1.2vh 5vw' }}>
        <div className="flex items-center gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <span className="text-white font-bold text-sm uppercase tracking-wider">Module C — For Individuals</span>
        </div>
        <span className="text-white/70 text-xs">Slide 19 of 21</span>
      </div>

      {/* Header */}
      <div className="bg-navy flex items-end justify-between" style={{ padding: '2.5vh 5vw 2vh' }}>
        <div>
          <h2 className="text-white font-black" style={{ fontSize: '2.8vw' }}>
            The Confident English Speaker{' '}
            <span className="text-emerald-400">You're Becoming</span>
          </h2>
          <p className="text-white/50 italic font-light" style={{ fontSize: '1.1vw', marginTop: '0.3vh' }}>
            Người nói tiếng Anh tự tin mà bạn đang trở thành
          </p>
        </div>
      </div>

      {/* Persona cards */}
      <div className="flex-1 flex gap-5" style={{ padding: '3vh 5vw' }}>
        {personas.map(({ icon, name, vi, aspiration, pain, color }) => (
          <div key={name} className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col"
            style={{ padding: '3.5vh 2.5vw' }}>
            <div style={{ fontSize: '3.5vw' }}>{icon}</div>
            <div className="font-black mt-3" style={{ color, fontSize: '1.5vw' }}>{name}</div>
            <div className="text-muted italic text-xs mt-0.5">{vi}</div>

            <div className="mt-4 flex-1">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Their aspiration</div>
              <div className="text-navy font-medium" style={{ fontSize: '0.95vw' }}>{aspiration}</div>
            </div>

            <div className="mt-4 rounded-lg bg-gray-50 border border-gray-100" style={{ padding: '1.5vh 1.5vw' }}>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Their challenge</div>
              <div className="text-gray-600" style={{ fontSize: '0.88vw' }}>{pain}</div>
            </div>

            <div className="mt-4 text-xs font-bold" style={{ color }}>
              Vocabulary Builder solves this →
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
