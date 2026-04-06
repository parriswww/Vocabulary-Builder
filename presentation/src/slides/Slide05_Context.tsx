export default function Slide05_Context() {
  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
      {/* Header */}
      <div className="bg-navy flex items-end justify-between" style={{ padding: '3vh 5vw 2.5vh' }}>
        <div>
          <p className="text-brand font-medium uppercase tracking-wider" style={{ fontSize: '0.85vw' }}>Feature 2 of 5</p>
          <h2 className="text-white font-black" style={{ fontSize: '3vw' }}>Words Stick When They Have Context</h2>
          <p className="text-white/50 italic font-light" style={{ fontSize: '1.1vw', marginTop: '0.3vh' }}>Từ vựng ghi nhớ lâu hơn khi có ngữ cảnh thực tế</p>
        </div>
        <div className="text-white/20 font-black" style={{ fontSize: '5vw' }}>05</div>
      </div>

      <div className="flex-1 flex gap-6" style={{ padding: '4vh 5vw' }}>
        {/* Left: research insight */}
        <div className="flex flex-col justify-center" style={{ width: '40vw' }}>
          <div className="bg-brand/10 border border-brand/30 rounded-2xl" style={{ padding: '3.5vh 3vw' }}>
            <div className="text-brand font-black" style={{ fontSize: '3.5vw' }}>65%</div>
            <div className="text-navy font-bold mt-2" style={{ fontSize: '1.3vw' }}>
              more words retained when learned with a real example sentence
            </div>
            <div className="text-muted italic" style={{ fontSize: '0.9vw', marginTop: '0.5vh' }}>
              Ghi nhớ thêm 65% từ vựng khi học kèm câu ví dụ thực tế
            </div>
            <div className="text-gray-400 text-xs mt-3">— Applied Linguistics Research, 2019</div>
          </div>

          <div className="mt-5 space-y-3">
            {[
              { q: 'Definition only', score: 40, color: '#6B7280' },
              { q: 'Definition + example', score: 72, color: '#5B6CF0' },
              { q: 'Definition + your own sentence', score: 91, color: '#F05A28' },
            ].map(({ q, score, color }) => (
              <div key={q}>
                <div className="flex justify-between text-xs font-medium mb-1" style={{ color }}>
                  <span>{q}</span><span>{score}% recall</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div className="h-2 rounded-full" style={{ width: `${score}%`, background: color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: feature details */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="rounded-2xl text-white mb-5"
            style={{ background: 'linear-gradient(135deg, #5B6CF0 0%, #9B5CF6 100%)', padding: '3vh 2.5vw' }}>
            <div className="font-bold text-white/70 text-xs uppercase tracking-wider mb-3">How it works</div>
            <div className="space-y-3">
              {[
                { icon: '🔍', label: 'Auto-fetch definition & pronunciation' },
                { icon: '📝', label: 'Add your own notes & memory hooks' },
                { icon: '💬', label: 'Save the sentence where you found it' },
                { icon: '🔗', label: 'Link synonyms & antonyms automatically' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-3 bg-white/10 rounded-lg" style={{ padding: '1.2vh 1.5vw' }}>
                  <span style={{ fontSize: '1.5vw' }}>{icon}</span>
                  <span className="text-white font-medium" style={{ fontSize: '1vw' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100" style={{ padding: '2.5vh 2.5vw' }}>
            <div className="text-muted text-xs uppercase tracking-wider font-semibold mb-2">Your note on "procurement"</div>
            <div className="text-navy font-medium" style={{ fontSize: '1vw' }}>
              "Used in Q3 report — means buying supplies. Remember: PRO = professional buying."
            </div>
            <div className="text-brand text-xs mt-2">+ Your own memory hook</div>
          </div>
        </div>
      </div>
    </div>
  )
}
