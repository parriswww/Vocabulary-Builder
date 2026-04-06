const features = [
  { title: 'IELTS Academic word lists', detail: 'Import the Academic Word List as CSV — then personalize it with your own encountered words.' },
  { title: 'Reading & Writing vocabulary focus', detail: 'Tag words by skill (Reading / Writing / Speaking) and filter your review sessions accordingly.' },
  { title: 'Spaced repetition = long-term retention', detail: 'Stop cramming. Words reviewed at optimal intervals stay in your memory for exam day and beyond.' },
  { title: 'Quiz modes for exam practice', detail: 'Multiple-choice and definition-matching quizzes mirror actual exam question formats.' },
]

export default function Slide17_StudentSolution() {
  return (
    <div className="slide-root flex" style={{ background: 'linear-gradient(160deg, #1A1A2E 0%, #16213E 100%)' }}>
      <div className="flex-1 flex flex-col">
        {/* Module banner */}
        <div className="bg-blue-600 flex items-center justify-between" style={{ padding: '1.2vh 5vw' }}>
          <div className="flex items-center gap-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            <span className="text-white font-bold text-sm uppercase tracking-wider">Module B — For Students</span>
          </div>
          <span className="text-white/70 text-xs">Slide 17 of 21</span>
        </div>

        <div className="flex-1 flex gap-6" style={{ padding: '4vh 5vw' }}>
          {/* Left: headline + score chart */}
          <div className="flex flex-col justify-center" style={{ width: '40vw' }}>
            <h2 className="text-white font-black leading-tight" style={{ fontSize: '3.2vw' }}>
              Built for IELTS,<br />
              <span className="text-blue-400">Cambridge & School Exams</span>
            </h2>
            <p className="text-white/40 italic mt-2" style={{ fontSize: '1.1vw' }}>
              Được xây dựng cho IELTS, Cambridge và các kỳ thi trường học
            </p>

            <div className="mt-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, #5B6CF0 0%, #3B82F6 100%)', padding: '3vh 2.5vw' }}>
              <div className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-4">IELTS Band score impact</div>
              {[
                { band: 'Band 5.0', weeks: 0, label: 'Start', color: '#6B7280' },
                { band: 'Band 6.0', weeks: 6, label: '6 weeks', color: '#FFC107' },
                { band: 'Band 7.0', weeks: 12, label: '12 weeks', color: '#F05A28' },
                { band: 'Band 7.5+', weeks: 16, label: '16 weeks', color: '#10B981' },
              ].map(({ band, weeks, label, color }) => (
                <div key={band} className="flex items-center gap-3 mb-2">
                  <div className="text-white/60 text-xs w-16 flex-shrink-0">{label}</div>
                  <div className="flex-1 bg-white/10 rounded-full h-5 overflow-hidden">
                    <div className="h-5 rounded-full flex items-center justify-end pr-2"
                      style={{ width: `${(weeks / 16) * 100 + 20}%`, background: color }}>
                      <span className="text-white text-xs font-bold">{band}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-white/30 text-xs mt-2">Based on consistent 5 min/day practice</div>
            </div>
          </div>

          {/* Right: features */}
          <div className="flex-1 flex flex-col justify-center space-y-4">
            {features.map(({ title, detail }) => (
              <div key={title} className="rounded-xl flex gap-4 items-start"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(59,130,246,0.2)', padding: '2.5vh 2vw' }}>
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <div className="text-white font-bold" style={{ fontSize: '1.1vw' }}>{title}</div>
                  <div className="text-white/50 mt-1" style={{ fontSize: '0.85vw' }}>{detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
