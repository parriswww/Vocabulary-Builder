const devices = [
  { name: 'Phone', icon: '📱', detail: 'Review on the go — subway, coffee break, lunch' },
  { name: 'Tablet', icon: '📟', detail: 'Comfortable reading & writing at home or office' },
  { name: 'Laptop', icon: '💻', detail: 'Deep study sessions, CSV import, admin view' },
]

export default function Slide08_AnyDevice() {
  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
      {/* Header */}
      <div className="bg-navy flex items-end justify-between" style={{ padding: '3vh 5vw 2.5vh' }}>
        <div>
          <p className="text-brand font-medium uppercase tracking-wider" style={{ fontSize: '0.85vw' }}>Feature 5 of 5</p>
          <h2 className="text-white font-black" style={{ fontSize: '3vw' }}>Learn Anywhere, on Any Device</h2>
          <p className="text-white/50 italic font-light" style={{ fontSize: '1.1vw', marginTop: '0.3vh' }}>Học mọi lúc, mọi nơi, trên mọi thiết bị</p>
        </div>
        <div className="text-white/20 font-black" style={{ fontSize: '5vw' }}>08</div>
      </div>

      <div className="flex-1 flex gap-6" style={{ padding: '4vh 5vw' }}>
        {/* Device cards */}
        <div className="flex-1 grid grid-cols-3 gap-5">
          {devices.map(({ name, icon, detail }) => (
            <div key={name} className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center"
              style={{ padding: '4vh 2vw' }}>
              <div style={{ fontSize: '4vw' }}>{icon}</div>
              <div className="text-navy font-bold mt-4" style={{ fontSize: '1.4vw' }}>{name}</div>
              <div className="text-muted leading-relaxed mt-3" style={{ fontSize: '0.9vw' }}>{detail}</div>
            </div>
          ))}
        </div>

        {/* Sync info */}
        <div className="flex flex-col justify-center" style={{ width: '34vw' }}>
          <div className="rounded-2xl text-white mb-5"
            style={{ background: 'linear-gradient(135deg, #5B6CF0 0%, #9B5CF6 100%)', padding: '4vh 3vw' }}>
            <div className="font-bold" style={{ fontSize: '1.5vw' }}>Real-time sync</div>
            <div className="text-white/60 italic text-xs mb-4">Đồng bộ thời gian thực</div>
            <div className="space-y-3">
              {[
                'Add a word on your phone at 9 AM',
                'Review it on your laptop at noon',
                'Continue your streak on tablet at night',
                'All progress synced instantly via Firebase',
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/10 rounded-lg" style={{ padding: '1.2vh 1.5vw' }}>
                  <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0 text-xs font-black text-navy">
                    {i + 1}
                  </div>
                  <span className="text-white text-xs">{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex items-center gap-4" style={{ padding: '2vh 2.5vw' }}>
            <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F05A28" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div>
              <div className="text-navy font-bold text-sm">Secure & private</div>
              <div className="text-muted text-xs">Your data is encrypted and belongs only to you</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
