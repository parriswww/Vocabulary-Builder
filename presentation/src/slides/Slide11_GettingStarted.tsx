const steps = [
  {
    num: 1,
    title: 'Sign up — free',
    vi: 'Đăng ký miễn phí',
    detail: 'Create an account at the web app. No app store needed — works in any browser.',
    time: '30 seconds',
  },
  {
    num: 2,
    title: 'Add your first words',
    vi: 'Thêm những từ đầu tiên của bạn',
    detail: 'Type in words you\'ve encountered this week, or import from a CSV file instantly.',
    time: '2 minutes',
  },
  {
    num: 3,
    title: 'Do your first quiz',
    vi: 'Làm bài kiểm tra đầu tiên',
    detail: 'Flashcards and multiple-choice quizzes test your recall immediately.',
    time: '5 minutes',
  },
  {
    num: 4,
    title: 'Build your daily habit',
    vi: 'Xây dựng thói quen hàng ngày',
    detail: 'Come back each day — the streak tracker keeps you motivated and consistent.',
    time: 'Daily 5 min',
  },
  {
    num: 5,
    title: 'Upgrade after 7 days',
    vi: 'Nâng cấp sau 7 ngày',
    detail: 'If you love it (you will), unlock full access for 500,000 ₫ / 6 months.',
    time: 'Day 7',
  },
]

export default function Slide11_GettingStarted() {
  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
      {/* Header */}
      <div className="bg-navy flex items-end justify-between" style={{ padding: '3vh 5vw 2.5vh' }}>
        <div>
          <h2 className="text-white font-black" style={{ fontSize: '3vw' }}>Up and Running in Under 10 Minutes</h2>
          <p className="text-white/50 italic font-light" style={{ fontSize: '1.1vw', marginTop: '0.3vh' }}>Bắt đầu và hoạt động trong chưa đến 10 phút</p>
        </div>
        <div className="text-white/20 font-black" style={{ fontSize: '5vw' }}>11</div>
      </div>

      <div className="flex-1 flex items-center" style={{ padding: '3vh 5vw' }}>
        <div className="w-full flex gap-4">
          {steps.map(({ num, title, vi, detail, time }) => (
            <div key={num} className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col"
              style={{ padding: '3vh 2vw' }}>
              {/* Step number */}
              <div className="flex items-center justify-between mb-4">
                <div className="bg-brand text-white font-black rounded-xl flex items-center justify-center"
                  style={{ width: '3vw', height: '3vw', minWidth: 40, minHeight: 40, fontSize: '1.3vw' }}>
                  {num}
                </div>
                <span className="text-xs font-semibold text-brand bg-brand/10 px-2 py-0.5 rounded-full">{time}</span>
              </div>

              <div className="text-navy font-bold" style={{ fontSize: '1.2vw' }}>{title}</div>
              <div className="text-muted italic text-xs mt-0.5">{vi}</div>
              <div className="text-gray-500 leading-relaxed mt-3 flex-1" style={{ fontSize: '0.88vw' }}>{detail}</div>

              {/* Progress dot */}
              <div className="mt-4 flex items-center gap-1">
                {steps.map((_, i) => (
                  <div key={i} className="h-1 flex-1 rounded-full"
                    style={{ background: i < num ? '#F05A28' : '#E5E7EB' }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
