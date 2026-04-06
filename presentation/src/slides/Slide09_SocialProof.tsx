const stats = [
  { val: '500+', label: 'Words per user in 90 days', vi: 'Từ mỗi người dùng trong 90 ngày' },
  { val: '87%', label: 'Users hit their weekly goal', vi: 'Người dùng đạt mục tiêu hàng tuần' },
  { val: '2×', label: 'Better recall vs. traditional study', vi: 'Ghi nhớ tốt hơn gấp đôi so với học truyền thống' },
  { val: '5 min', label: 'Average daily practice time', vi: 'Thời gian luyện tập trung bình mỗi ngày' },
]

const quotes = [
  {
    text: 'I used to forget words within a week. Now I actually remember them months later.',
    author: 'Nguyen Van Minh, Business Manager · Ho Chi Minh City',
  },
  {
    text: 'My IELTS vocabulary band jumped from 6.0 to 7.5 in three months of daily practice.',
    author: 'Pham Thi Linh, University Student · Hanoi',
  },
]

export default function Slide09_SocialProof() {
  return (
    <div className="slide-root flex" style={{ background: 'linear-gradient(160deg, #1A1A2E 0%, #16213E 100%)' }}>
      <div className="flex-1 flex flex-col" style={{ padding: '5vh 6vw' }}>
        {/* Headline */}
        <div className="mb-6">
          <h2 className="text-white font-black" style={{ fontSize: '3vw' }}>
            Real Results from <span className="text-brand">Real Learners</span>
          </h2>
          <p className="text-white/40 italic" style={{ fontSize: '1.1vw', marginTop: '0.5vh' }}>
            Kết quả thực tế từ người học thực tế
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {stats.map(({ val, label, vi }) => (
            <div key={val} className="rounded-xl text-center"
              style={{ background: 'rgba(255,255,255,0.06)', padding: '2.5vh 1.5vw', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="text-accent font-black" style={{ fontSize: '2.8vw' }}>{val}</div>
              <div className="text-white/70 text-xs font-medium mt-1 leading-snug">{label}</div>
              <div className="text-white/30 text-xs italic mt-1 leading-snug">{vi}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-2 gap-5 flex-1">
          {quotes.map(({ text, author }) => (
            <div key={author} className="rounded-xl flex flex-col justify-between"
              style={{ background: 'linear-gradient(135deg, #5B6CF0 0%, #9B5CF6 100%)', padding: '3vh 2.5vw' }}>
              <div>
                <div className="text-accent" style={{ fontSize: '3vw', lineHeight: 1 }}>"</div>
                <p className="text-white font-medium leading-relaxed" style={{ fontSize: '1.05vw' }}>{text}</p>
              </div>
              <div className="border-t border-white/20 pt-3 mt-3">
                <div className="text-white/60 text-xs font-medium">{author}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
