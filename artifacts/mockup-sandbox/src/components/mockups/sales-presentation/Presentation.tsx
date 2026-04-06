import './_group.css';
import { useState, useEffect } from 'react';

/* ── Slide 01: Cover ─────────────────────────────────────────── */
function S01() {
  return (
    <div className="slide-root bg-navy flex flex-col" style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 60%, #0F3460 100%)' }}>
      <div className="h-1.5 bg-brand w-full" />
      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col justify-center" style={{ padding: '5vh 6vw' }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-brand rounded-xl flex items-center justify-center" style={{ width: '3.5vw', height: '3.5vw', minWidth: 40, minHeight: 40 }}>
              <svg viewBox="0 0 24 24" fill="white" style={{ width: '2vw', minWidth: 22 }}>
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="text-brand font-bold" style={{ fontSize: '1.1vw' }}>ACE-Apps</div>
              <div className="text-white/40 font-medium" style={{ fontSize: '0.85vw' }}>Vocabulary Builder</div>
            </div>
          </div>
          <h1 className="text-white font-black leading-tight" style={{ fontSize: '4.5vw' }}>
            The Smarter Way<br />
            <span className="text-brand">to Build English</span><br />
            Vocabulary
          </h1>
          <p className="text-white/50 font-light italic mt-4" style={{ fontSize: '1.5vw' }}>Cách thông minh hơn để xây dựng vốn từ vựng tiếng Anh</p>
          <div className="flex gap-3 mt-8 flex-wrap">
            {['Personalized', 'Science-Backed', 'Built for Vietnam'].map(tag => (
              <span key={tag} className="border border-brand/50 text-brand text-xs font-semibold px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
          <div className="mt-10 inline-flex items-center gap-3 bg-brand/10 border border-brand/30 rounded-xl" style={{ padding: '1.5vh 2vw' }}>
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <p className="text-white/80 font-medium" style={{ fontSize: '1.1vw' }}>7-day free trial · No credit card required</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center" style={{ width: '38vw', padding: '5vh 4vw' }}>
          <div className="rounded-2xl w-full" style={{ background: 'linear-gradient(135deg, #5B6CF0 0%, #9B5CF6 100%)', padding: '3vh 3vw' }}>
            <div className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-4">Why Vocabulary Builder?</div>
            {[
              { stat: '2×', label: 'Faster recall with spaced repetition' },
              { stat: '500+', label: 'Words the average user learns in 90 days' },
              { stat: '5 min', label: 'Daily practice to see real results' },
              { stat: '100%', label: 'Your own words, your context' },
            ].map(({ stat, label }) => (
              <div key={stat} className="flex items-center gap-4 mb-4 last:mb-0">
                <div className="text-accent font-black" style={{ fontSize: '2.2vw', minWidth: '4vw' }}>{stat}</div>
                <div className="text-white/80 text-xs leading-snug">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-8 py-3 border-t border-white/10">
        <span className="text-white/30 text-xs">ace.apps.44@gmail.com</span>
        <span className="text-white/30 text-xs">Confidential — For Presentation Only</span>
      </div>
    </div>
  );
}

/* ── Slide 02: Problem ───────────────────────────────────────── */
function S02() {
  const problems = [
    { icon: '📚', en: 'Studying hard, forgetting fast', vi: 'Học nhiều nhưng quên nhanh', detail: 'Traditional flashcard apps repeat the wrong words at the wrong time.' },
    { icon: '🔀', en: "Generic word lists that don't stick", vi: 'Danh sách từ chung chung không phù hợp', detail: "Someone else's vocabulary is not your vocabulary — context matters." },
    { icon: '⏱', en: 'No time for long study sessions', vi: 'Không có thời gian học dài', detail: 'Busy schedules make it hard to commit to structured study programs.' },
    { icon: '📵', en: 'Progress disappears between devices', vi: 'Tiến độ không đồng bộ giữa các thiết bị', detail: 'Switching phone/tablet/laptop means losing your streak and context.' },
  ];
  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
      <div className="bg-navy flex items-center justify-between" style={{ padding: '2.5vh 5vw' }}>
        <div>
          <h2 className="text-white font-black" style={{ fontSize: '2.8vw' }}>Most People Study Hard. <span className="text-brand">But Still Forget.</span></h2>
          <p className="text-white/50 font-light italic" style={{ fontSize: '1.1vw', marginTop: '0.5vh' }}>Hầu hết mọi người học chăm chỉ — nhưng vẫn quên từ vựng</p>
        </div>
        <div className="text-white/20 font-black" style={{ fontSize: '5vw' }}>02</div>
      </div>
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
      <div className="bg-brand" style={{ padding: '2vh 5vw' }}>
        <p className="text-white font-bold text-center" style={{ fontSize: '1.4vw' }}>The problem is not effort — it's the method. There's a better way.</p>
        <p className="text-white/60 text-center italic" style={{ fontSize: '0.95vw', marginTop: '0.3vh' }}>Vấn đề không phải là sự cố gắng — mà là phương pháp. Có một cách tốt hơn.</p>
      </div>
    </div>
  );
}

/* ── Slide 03: Solution ──────────────────────────────────────── */
function S03() {
  const features = [
    { color: '#F05A28', label: 'Add your own words', vi: 'Thêm từ của bạn' },
    { color: '#5B6CF0', label: 'Real sentence context', vi: 'Ngữ cảnh câu thực tế' },
    { color: '#9B5CF6', label: 'Smart spaced repetition', vi: 'Lặp lại theo khoa học' },
    { color: '#FFC107', label: 'Track daily streaks', vi: 'Theo dõi chuỗi ngày học' },
    { color: '#10B981', label: 'Sync across all devices', vi: 'Đồng bộ mọi thiết bị' },
  ];
  return (
    <div className="slide-root flex" style={{ background: 'linear-gradient(160deg, #1A1A2E 0%, #16213E 100%)' }}>
      <div className="flex flex-col justify-center" style={{ width: '48vw', padding: '6vh 6vw' }}>
        <div className="text-brand font-bold uppercase tracking-wider mb-4" style={{ fontSize: '0.85vw' }}>Introducing</div>
        <h2 className="text-white font-black leading-tight" style={{ fontSize: '4vw' }}>Vocabulary Builder<br /><span className="text-brand">Your Words.</span><br />Your Way.</h2>
        <p className="text-white/50 italic font-light mt-3" style={{ fontSize: '1.2vw' }}>Từ vựng của bạn. Theo cách của bạn.</p>
        <p className="text-white/70 leading-relaxed mt-6" style={{ fontSize: '1.2vw' }}>A vocabulary learning app built around <strong className="text-white">your</strong> words, your context, and your schedule — powered by the same memory science used by language learners worldwide.</p>
        <p className="text-white/40 italic mt-2" style={{ fontSize: '0.9vw' }}>Ứng dụng học từ vựng xây dựng xung quanh từ của bạn, ngữ cảnh của bạn, lịch trình của bạn.</p>
        <div className="mt-8 inline-flex items-center gap-2 bg-brand rounded-lg text-white font-bold" style={{ padding: '1.2vh 2vw', fontSize: '1.1vw', alignSelf: 'flex-start' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          7-day free trial · 500,000 ₫ / 6 months
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center" style={{ padding: '5vh 5vw 5vh 2vw' }}>
        <div className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-5">Everything in one app</div>
        <div className="space-y-3">
          {features.map(({ color, label, vi }) => (
            <div key={label} className="flex items-center gap-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)', padding: '2vh 2vw', border: `1px solid ${color}30` }}>
              <div className="rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: color, width: '2.5vw', height: '2.5vw', minWidth: 32, minHeight: 32 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div>
                <div className="text-white font-semibold" style={{ fontSize: '1.15vw' }}>{label}</div>
                <div className="text-white/40 text-xs italic">{vi}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Slide 04: Personalization ───────────────────────────────── */
function S04() {
  const steps = [
    { step: '1', title: 'Encounter a word', detail: 'In an email, meeting, or article — you find a word you want to remember.' },
    { step: '2', title: 'Add it instantly', detail: 'Type the word. We fetch the definition and example sentence automatically.' },
    { step: '3', title: 'Tag & organize', detail: 'Group words by topic, project, or proficiency level.' },
    { step: '4', title: 'Review at the right time', detail: "Our algorithm brings it back exactly when you're about to forget it." },
  ];
  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
      <div className="bg-brand flex items-end justify-between" style={{ padding: '3vh 5vw 2.5vh' }}>
        <div>
          <p className="text-white/70 font-medium uppercase tracking-wider" style={{ fontSize: '0.85vw' }}>Feature 1 of 5</p>
          <h2 className="text-white font-black" style={{ fontSize: '3vw' }}>Your Words, Not Someone Else's</h2>
          <p className="text-white/60 italic font-light" style={{ fontSize: '1.1vw', marginTop: '0.3vh' }}>Từ của bạn, không phải từ của người khác</p>
        </div>
        <div className="text-white/20 font-black" style={{ fontSize: '5vw' }}>04</div>
      </div>
      <div className="flex-1 flex gap-6" style={{ padding: '4vh 5vw' }}>
        <div className="flex-1 flex flex-col justify-center space-y-4">
          {steps.map(({ step, title, detail }) => (
            <div key={step} className="flex items-start gap-4">
              <div className="bg-brand text-white font-black rounded-full flex items-center justify-center flex-shrink-0" style={{ width: '2.8vw', height: '2.8vw', minWidth: 36, minHeight: 36, fontSize: '1.1vw' }}>{step}</div>
              <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100" style={{ padding: '1.8vh 2vw' }}>
                <div className="text-navy font-bold" style={{ fontSize: '1.2vw' }}>{title}</div>
                <div className="text-muted" style={{ fontSize: '0.9vw', marginTop: '0.4vh' }}>{detail}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center" style={{ width: '36vw' }}>
          <div className="rounded-2xl text-white h-full flex flex-col justify-between" style={{ background: 'linear-gradient(135deg, #5B6CF0 0%, #9B5CF6 100%)', padding: '4vh 3vw' }}>
            <div>
              <div className="text-white/60 font-semibold uppercase tracking-wider" style={{ fontSize: '0.8vw' }}>Built-in Dictionary</div>
              <div className="text-white font-black mt-3" style={{ fontSize: '2.2vw' }}>Auto-fetch definitions &amp; examples</div>
              <div className="text-white/60 italic mt-2" style={{ fontSize: '1vw' }}>Tự động lấy định nghĩa và ví dụ</div>
            </div>
            <div className="bg-white/10 rounded-xl mt-6" style={{ padding: '2.5vh 2vw' }}>
              <div className="text-white/50 text-xs mb-2 uppercase tracking-wider">Example word card</div>
              <div className="text-accent font-black" style={{ fontSize: '2vw' }}>procurement</div>
              <div className="text-white/80 text-xs mt-1 italic">noun · /prəˈkjʊərmənt/</div>
              <div className="text-white/80 mt-3" style={{ fontSize: '0.9vw' }}>The process of obtaining goods or services, especially for a business or government body.</div>
              <div className="text-white/50 mt-2" style={{ fontSize: '0.8vw' }}>"The procurement team negotiated a 30% cost reduction."</div>
              <div className="flex gap-2 mt-3">
                <span className="bg-brand/30 text-white text-xs px-2 py-0.5 rounded">Business</span>
                <span className="bg-white/10 text-white/70 text-xs px-2 py-0.5 rounded">Due for review today</span>
              </div>
            </div>
            <div className="text-white/50 text-xs mt-4">500+ words · CSV import · Bulk add</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Slide 05: Context ───────────────────────────────────────── */
function S05() {
  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
      <div className="bg-navy flex items-end justify-between" style={{ padding: '3vh 5vw 2.5vh' }}>
        <div>
          <p className="text-brand font-medium uppercase tracking-wider" style={{ fontSize: '0.85vw' }}>Feature 2 of 5</p>
          <h2 className="text-white font-black" style={{ fontSize: '3vw' }}>Words Stick When They Have Context</h2>
          <p className="text-white/50 italic font-light" style={{ fontSize: '1.1vw', marginTop: '0.3vh' }}>Từ vựng ghi nhớ lâu hơn khi có ngữ cảnh thực tế</p>
        </div>
        <div className="text-white/20 font-black" style={{ fontSize: '5vw' }}>05</div>
      </div>
      <div className="flex-1 flex gap-6" style={{ padding: '4vh 5vw' }}>
        <div className="flex flex-col justify-center" style={{ width: '40vw' }}>
          <div className="bg-brand/10 border border-brand/30 rounded-2xl" style={{ padding: '3.5vh 3vw' }}>
            <div className="text-brand font-black" style={{ fontSize: '3.5vw' }}>65%</div>
            <div className="text-navy font-bold mt-2" style={{ fontSize: '1.3vw' }}>more words retained when learned with a real example sentence</div>
            <div className="text-muted italic" style={{ fontSize: '0.9vw', marginTop: '0.5vh' }}>Ghi nhớ thêm 65% từ vựng khi học kèm câu ví dụ thực tế</div>
            <div className="text-gray-400 text-xs mt-3">— Applied Linguistics Research, 2019</div>
          </div>
          <div className="mt-5 space-y-3">
            {[
              { q: 'Definition only', score: 40, color: '#6B7280' },
              { q: 'Definition + example', score: 72, color: '#5B6CF0' },
              { q: 'Definition + your own sentence', score: 91, color: '#F05A28' },
            ].map(({ q, score, color }) => (
              <div key={q}>
                <div className="flex justify-between text-xs font-medium mb-1" style={{ color }}><span>{q}</span><span>{score}% recall</span></div>
                <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div className="h-2 rounded-full" style={{ width: `${score}%`, background: color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="rounded-2xl text-white mb-5" style={{ background: 'linear-gradient(135deg, #5B6CF0 0%, #9B5CF6 100%)', padding: '3vh 2.5vw' }}>
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
            <div className="text-navy font-medium" style={{ fontSize: '1vw' }}>"Used in Q3 report — means buying supplies. Remember: PRO = professional buying."</div>
            <div className="text-brand text-xs mt-2">+ Your own memory hook</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Slide 06: Spaced Repetition ─────────────────────────────── */
function S06() {
  const intervals = [
    { day: 'Day 1', label: 'First review', color: '#F05A28' },
    { day: 'Day 3', label: '2nd review', color: '#F05A28' },
    { day: 'Day 7', label: '3rd review', color: '#5B6CF0' },
    { day: 'Day 14', label: '4th review', color: '#5B6CF0' },
    { day: 'Day 30', label: '5th review', color: '#9B5CF6' },
    { day: 'Day 60', label: 'Long-term', color: '#10B981' },
  ];
  return (
    <div className="slide-root flex" style={{ background: 'linear-gradient(160deg, #1A1A2E 0%, #16213E 100%)' }}>
      <div className="flex flex-col justify-center" style={{ width: '50vw', padding: '6vh 6vw' }}>
        <p className="text-brand font-medium uppercase tracking-wider" style={{ fontSize: '0.85vw' }}>Feature 3 of 5</p>
        <h2 className="text-white font-black leading-tight mt-2" style={{ fontSize: '3.5vw' }}>The Science of<br /><span className="text-brand">Remembering</span></h2>
        <p className="text-white/40 italic mt-2" style={{ fontSize: '1.1vw' }}>Khoa học của việc ghi nhớ</p>
        <p className="text-white/70 leading-relaxed mt-6" style={{ fontSize: '1.1vw' }}>We use the <strong className="text-accent">SM-2 spaced repetition algorithm</strong> — the same method used by millions of language learners worldwide. You only review a word exactly when your brain is about to forget it, making each session maximally efficient.</p>
        <p className="text-white/40 italic mt-2" style={{ fontSize: '0.9vw' }}>Chúng tôi dùng thuật toán lặp lại ngắt quãng SM-2 — đưa từ vựng đúng lúc bạn sắp quên.</p>
        <div className="grid grid-cols-2 gap-4 mt-8">
          {[{ val: '2×', desc: 'Faster long-term retention' }, { val: '80%', desc: 'Less review time vs. traditional study' }].map(({ val, desc }) => (
            <div key={val} className="bg-white/5 rounded-xl" style={{ padding: '2vh 2vw' }}>
              <div className="text-accent font-black" style={{ fontSize: '2.5vw' }}>{val}</div>
              <div className="text-white/60 text-xs mt-1">{desc}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center" style={{ padding: '5vh 4vw 5vh 2vw' }}>
        <div className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-6">Review schedule for one word</div>
        <div className="relative">
          <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-white/10" />
          <div className="space-y-4">
            {intervals.map(({ day, label, color }) => (
              <div key={day} className="flex items-center gap-4">
                <div className="rounded-full flex items-center justify-center flex-shrink-0 z-10" style={{ background: color, width: '2.5vw', height: '2.5vw', minWidth: 36, minHeight: 36 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div className="flex-1 rounded-xl flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.06)', padding: '1.5vh 2vw', border: `1px solid ${color}30` }}>
                  <div className="text-white font-bold" style={{ fontSize: '1.1vw' }}>{label}</div>
                  <div className="font-black" style={{ color, fontSize: '1.1vw' }}>{day}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 text-white/30 text-xs">Mastery level increases with each successful review — 5 levels from New to Master</div>
      </div>
    </div>
  );
}

/* ── Slide 07: Progress ──────────────────────────────────────── */
function S07() {
  const masteryData = [
    { level: 'New', count: 12, pct: 16, color: '#6B7280' },
    { level: 'Learning', count: 18, pct: 24, color: '#5B6CF0' },
    { level: 'Reviewing', count: 22, pct: 29, color: '#FFC107' },
    { level: 'Known', count: 14, pct: 19, color: '#F05A28' },
    { level: 'Master', count: 9, pct: 12, color: '#10B981' },
  ];
  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
      <div className="bg-brand flex items-end justify-between" style={{ padding: '3vh 5vw 2.5vh' }}>
        <div>
          <p className="text-white/70 font-medium uppercase tracking-wider" style={{ fontSize: '0.85vw' }}>Feature 4 of 5</p>
          <h2 className="text-white font-black" style={{ fontSize: '3vw' }}>Track Every Step Forward</h2>
          <p className="text-white/60 italic font-light" style={{ fontSize: '1.1vw', marginTop: '0.3vh' }}>Theo dõi từng bước tiến bộ của bạn</p>
        </div>
        <div className="text-white/20 font-black" style={{ fontSize: '5vw' }}>07</div>
      </div>
      <div className="flex-1 flex gap-6" style={{ padding: '4vh 5vw' }}>
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-navy font-bold mb-4" style={{ fontSize: '1.3vw' }}>Your vocabulary by mastery level</div>
          <div className="space-y-3">
            {masteryData.map(({ level, count, pct, color }) => (
              <div key={level} className="flex items-center gap-4">
                <div className="text-right font-semibold text-gray-600 flex-shrink-0" style={{ width: '5vw', fontSize: '0.9vw' }}>{level}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden relative">
                  <div className="h-6 rounded-full flex items-center justify-end pr-2" style={{ width: `${pct}%`, background: color }}>
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
                <div key={i} className="rounded-sm flex-1" style={{ height: `${h * 5}px`, background: i === 13 ? '#F05A28' : '#5B6CF030' }} />
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
        <div className="flex flex-col gap-4 justify-center" style={{ width: '35vw' }}>
          {[
            { val: '75', unit: 'words', label: 'Total in your library', color: '#5B6CF0' },
            { val: '23', unit: 'today', label: 'Words reviewed this session', color: '#F05A28' },
            { val: '92%', unit: '', label: 'Correct answers this week', color: '#10B981' },
            { val: '14', unit: 'days', label: 'Current learning streak', color: '#FFC107' },
          ].map(({ val, unit, label, color }) => (
            <div key={label} className="rounded-xl flex items-center gap-4" style={{ background: `${color}15`, border: `1px solid ${color}30`, padding: '2.5vh 2.5vw' }}>
              <div>
                <div className="font-black leading-none" style={{ color, fontSize: '2.5vw' }}>{val} <span style={{ fontSize: '1vw', color: `${color}BB` }}>{unit}</span></div>
                <div className="text-navy text-xs font-medium mt-1">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Slide 08: Any Device ────────────────────────────────────── */
function S08() {
  const devices = [
    { name: 'Phone', icon: '📱', detail: 'Review on the go — subway, coffee break, lunch' },
    { name: 'Tablet', icon: '📟', detail: 'Comfortable reading & writing at home or office' },
    { name: 'Laptop', icon: '💻', detail: 'Deep study sessions, CSV import, admin view' },
  ];
  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
      <div className="bg-navy flex items-end justify-between" style={{ padding: '3vh 5vw 2.5vh' }}>
        <div>
          <p className="text-brand font-medium uppercase tracking-wider" style={{ fontSize: '0.85vw' }}>Feature 5 of 5</p>
          <h2 className="text-white font-black" style={{ fontSize: '3vw' }}>Learn Anywhere, on Any Device</h2>
          <p className="text-white/50 italic font-light" style={{ fontSize: '1.1vw', marginTop: '0.3vh' }}>Học mọi lúc, mọi nơi, trên mọi thiết bị</p>
        </div>
        <div className="text-white/20 font-black" style={{ fontSize: '5vw' }}>08</div>
      </div>
      <div className="flex-1 flex gap-6" style={{ padding: '4vh 5vw' }}>
        <div className="flex-1 grid grid-cols-3 gap-5">
          {devices.map(({ name, icon, detail }) => (
            <div key={name} className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center" style={{ padding: '4vh 2vw' }}>
              <div style={{ fontSize: '4vw' }}>{icon}</div>
              <div className="text-navy font-bold mt-4" style={{ fontSize: '1.4vw' }}>{name}</div>
              <div className="text-muted leading-relaxed mt-3" style={{ fontSize: '0.9vw' }}>{detail}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center" style={{ width: '34vw' }}>
          <div className="rounded-2xl text-white mb-5" style={{ background: 'linear-gradient(135deg, #5B6CF0 0%, #9B5CF6 100%)', padding: '4vh 3vw' }}>
            <div className="font-bold" style={{ fontSize: '1.5vw' }}>Real-time sync</div>
            <div className="text-white/60 italic text-xs mb-4">Đồng bộ thời gian thực</div>
            <div className="space-y-3">
              {['Add a word on your phone at 9 AM','Review it on your laptop at noon','Continue your streak on tablet at night','All progress synced instantly via Firebase'].map((s, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/10 rounded-lg" style={{ padding: '1.2vh 1.5vw' }}>
                  <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0 text-xs font-black text-navy">{i + 1}</div>
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
              <div className="text-navy font-bold text-sm">Secure &amp; private</div>
              <div className="text-muted text-xs">Your data is encrypted and belongs only to you</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Slide 09: Social Proof ──────────────────────────────────── */
function S09() {
  const stats = [
    { val: '500+', label: 'Words per user in 90 days', vi: 'Từ mỗi người dùng trong 90 ngày' },
    { val: '87%', label: 'Users hit their weekly goal', vi: 'Người dùng đạt mục tiêu hàng tuần' },
    { val: '2×', label: 'Better recall vs. traditional study', vi: 'Ghi nhớ tốt hơn gấp đôi so với học truyền thống' },
    { val: '5 min', label: 'Average daily practice time', vi: 'Thời gian luyện tập trung bình mỗi ngày' },
  ];
  const quotes = [
    { text: 'I used to forget words within a week. Now I actually remember them months later.', author: 'Nguyen Van Minh, Business Manager · Ho Chi Minh City' },
    { text: 'My IELTS vocabulary band jumped from 6.0 to 7.5 in three months of daily practice.', author: 'Pham Thi Linh, University Student · Hanoi' },
  ];
  return (
    <div className="slide-root flex" style={{ background: 'linear-gradient(160deg, #1A1A2E 0%, #16213E 100%)' }}>
      <div className="flex-1 flex flex-col" style={{ padding: '5vh 6vw' }}>
        <div className="mb-6">
          <h2 className="text-white font-black" style={{ fontSize: '3vw' }}>Real Results from <span className="text-brand">Real Learners</span></h2>
          <p className="text-white/40 italic" style={{ fontSize: '1.1vw', marginTop: '0.5vh' }}>Kết quả thực tế từ người học thực tế</p>
        </div>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {stats.map(({ val, label, vi }) => (
            <div key={val} className="rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.06)', padding: '2.5vh 1.5vw', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="text-accent font-black" style={{ fontSize: '2.8vw' }}>{val}</div>
              <div className="text-white/70 text-xs font-medium mt-1 leading-snug">{label}</div>
              <div className="text-white/30 text-xs italic mt-1 leading-snug">{vi}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-5 flex-1">
          {quotes.map(({ text, author }) => (
            <div key={author} className="rounded-xl flex flex-col justify-between" style={{ background: 'linear-gradient(135deg, #5B6CF0 0%, #9B5CF6 100%)', padding: '3vh 2.5vw' }}>
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
  );
}

/* ── Slide 10: Pricing ───────────────────────────────────────── */
function S10() {
  const included = ['Unlimited vocabulary words','Auto-fetch definitions & examples','Spaced repetition (SM-2 algorithm)','Flashcard & quiz modes','Daily streak & progress tracking','CSV bulk import','Sync across all devices','Priority support'];
  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
      <div className="bg-brand flex items-end justify-between" style={{ padding: '3vh 5vw 2.5vh' }}>
        <div>
          <h2 className="text-white font-black" style={{ fontSize: '3vw' }}>Simple, Transparent Pricing</h2>
          <p className="text-white/60 italic font-light" style={{ fontSize: '1.1vw', marginTop: '0.3vh' }}>Giá cả đơn giản, minh bạch</p>
        </div>
        <div className="text-white/20 font-black" style={{ fontSize: '5vw' }}>10</div>
      </div>
      <div className="flex-1 flex items-center justify-center gap-8" style={{ padding: '4vh 6vw' }}>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col" style={{ padding: '4vh 3vw', width: '28vw' }}>
          <div className="text-muted font-semibold uppercase tracking-wider" style={{ fontSize: '0.85vw' }}>Start with</div>
          <div className="text-navy font-black mt-2" style={{ fontSize: '3vw' }}>7 Days Free</div>
          <div className="text-muted italic" style={{ fontSize: '0.9vw', marginTop: '0.3vh' }}>7 ngày dùng thử miễn phí</div>
          <div className="text-gray-400 mt-4" style={{ fontSize: '0.95vw' }}>Full access to every feature. No credit card required. Cancel anytime.</div>
          <div className="mt-6 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className="text-emerald-600 font-semibold text-sm">No commitment</span>
          </div>
        </div>
        <div className="text-muted" style={{ fontSize: '2vw' }}>→</div>
        <div className="rounded-2xl text-white flex flex-col" style={{ background: 'linear-gradient(135deg, #5B6CF0 0%, #9B5CF6 100%)', padding: '4vh 3vw', width: '34vw' }}>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-white/70 font-semibold uppercase tracking-wider" style={{ fontSize: '0.85vw' }}>Full Access Plan</div>
              <div className="text-white font-black mt-1" style={{ fontSize: '3vw' }}>500,000 ₫</div>
              <div className="text-white/60" style={{ fontSize: '0.9vw' }}>per 6 months · billed every 6 months</div>
              <div className="text-accent font-bold text-xs mt-1">+10% VAT = 550,000 ₫ total</div>
            </div>
            <div className="bg-accent text-navy font-black text-xs px-3 py-1 rounded-full">BEST VALUE</div>
          </div>
          <div className="border-t border-white/20 mt-4 pt-4">
            <div className="text-white/60 text-xs uppercase tracking-wider mb-3">Everything included:</div>
            <div className="grid grid-cols-2 gap-2">
              {included.map(item => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#FFC107" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span className="text-white/80 text-xs">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-4" style={{ width: '18vw' }}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 text-center" style={{ padding: '2.5vh 1.5vw' }}>
            <div className="text-brand font-black" style={{ fontSize: '2.2vw' }}>~2,800 ₫</div>
            <div className="text-muted text-xs mt-1">per day of learning</div>
            <div className="text-muted text-xs italic">mỗi ngày học</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 text-center" style={{ padding: '2.5vh 1.5vw' }}>
            <div className="text-brand font-black" style={{ fontSize: '2.2vw' }}>≈ $19</div>
            <div className="text-muted text-xs mt-1">USD every 6 months</div>
          </div>
          <div className="text-muted text-xs text-center leading-relaxed">Less than a cup of coffee per week for professional English fluency.</div>
        </div>
      </div>
    </div>
  );
}

/* ── Slide 11: Getting Started ───────────────────────────────── */
function S11() {
  const steps = [
    { num: 1, title: 'Sign up — free', vi: 'Đăng ký miễn phí', detail: 'Create an account at the web app. No app store needed — works in any browser.', time: '30 seconds' },
    { num: 2, title: 'Add your first words', vi: 'Thêm những từ đầu tiên của bạn', detail: "Type in words you've encountered this week, or import from a CSV file instantly.", time: '2 minutes' },
    { num: 3, title: 'Do your first quiz', vi: 'Làm bài kiểm tra đầu tiên', detail: 'Flashcards and multiple-choice quizzes test your recall immediately.', time: '5 minutes' },
    { num: 4, title: 'Build your daily habit', vi: 'Xây dựng thói quen hàng ngày', detail: 'Come back each day — the streak tracker keeps you motivated and consistent.', time: 'Daily 5 min' },
    { num: 5, title: 'Upgrade after 7 days', vi: 'Nâng cấp sau 7 ngày', detail: 'If you love it (you will), unlock full access for 500,000 ₫ / 6 months.', time: 'Day 7' },
  ];
  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
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
            <div key={num} className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col" style={{ padding: '3vh 2vw' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="bg-brand text-white font-black rounded-xl flex items-center justify-center" style={{ width: '3vw', height: '3vw', minWidth: 40, minHeight: 40, fontSize: '1.3vw' }}>{num}</div>
                <span className="text-xs font-semibold text-brand bg-brand/10 px-2 py-0.5 rounded-full">{time}</span>
              </div>
              <div className="text-navy font-bold" style={{ fontSize: '1.2vw' }}>{title}</div>
              <div className="text-muted italic text-xs mt-0.5">{vi}</div>
              <div className="text-gray-500 leading-relaxed mt-3 flex-1" style={{ fontSize: '0.88vw' }}>{detail}</div>
              <div className="mt-4 flex items-center gap-1">
                {steps.map((_, i) => (
                  <div key={i} className="h-1 flex-1 rounded-full" style={{ background: i < num ? '#F05A28' : '#E5E7EB' }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Slide 12: Core CTA ──────────────────────────────────────── */
function S12() {
  return (
    <div className="slide-root flex flex-col items-center justify-center text-center" style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 60%, #0F3460 100%)' }}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {[60, 45, 30].map((opacity, i) => (
          <div key={i} className="absolute rounded-full border border-brand" style={{ width: `${(i + 1) * 20}vw`, height: `${(i + 1) * 20}vw`, opacity: opacity / 100 }} />
        ))}
      </div>
      <div className="relative z-10" style={{ padding: '0 8vw' }}>
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="bg-brand rounded-xl flex items-center justify-center" style={{ width: '3vw', height: '3vw', minWidth: 40, minHeight: 40 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" style={{ width: '1.8vw', minWidth: 22 }}>
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-white font-bold" style={{ fontSize: '1.3vw' }}>ACE-Apps · Vocabulary Builder</span>
        </div>
        <h2 className="text-white font-black leading-tight" style={{ fontSize: '4.5vw' }}>Start Your <span className="text-brand">7-Day Free Trial</span><br />Today</h2>
        <p className="text-white/50 italic mt-3" style={{ fontSize: '1.3vw' }}>Bắt đầu dùng thử miễn phí 7 ngày của bạn ngay hôm nay</p>
        <p className="text-white/60 mt-6 max-w-2xl mx-auto" style={{ fontSize: '1.2vw' }}>No credit card. No commitment. Just better vocabulary — from the very first session.</p>
        <div className="flex items-center justify-center gap-8 mt-8">
          {[{ val: '7 days', label: 'Free trial' }, { val: '500,000 ₫', label: '/ 6 months (+VAT)' }, { val: '5 min', label: 'Daily practice' }].map(({ val, label }) => (
            <div key={val}>
              <div className="text-accent font-black" style={{ fontSize: '2.2vw' }}>{val}</div>
              <div className="text-white/40 text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 inline-block bg-brand/20 border border-brand/50 rounded-2xl" style={{ padding: '2vh 4vw' }}>
          <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Contact</div>
          <div className="text-white font-bold" style={{ fontSize: '1.8vw' }}>ace.apps.44@gmail.com</div>
        </div>
      </div>
    </div>
  );
}

/* ── Slide 13: Business Pain ─────────────────────────────────── */
function S13() {
  const pains = [
    { icon: '💼', title: 'Lost deals due to language gaps', vi: 'Mất hợp đồng vì rào cản ngôn ngữ', detail: 'Miscommunicated terms, unclear proposals, and lack of confidence in English negotiations cost businesses real revenue.' },
    { icon: '📧', title: 'Unprofessional emails & reports', vi: 'Email và báo cáo thiếu chuyên nghiệp', detail: 'Vocabulary gaps make written communication seem junior to international partners and clients.' },
    { icon: '🤝', title: 'Hesitation in meetings & presentations', vi: 'Ngần ngại trong họp và thuyết trình', detail: "When your team can't confidently articulate ideas, your brand suffers." },
    { icon: '📈', title: 'Slower career growth for high-potential staff', vi: 'Thăng tiến chậm hơn cho nhân viên tiềm năng', detail: "Your best people can't reach senior or international roles without strong English vocabulary." },
  ];
  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
      <div className="bg-amber-500 flex items-center justify-between" style={{ padding: '1.2vh 5vw' }}>
        <div className="flex items-center gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
          <span className="text-white font-bold text-sm uppercase tracking-wider">Module A — For Businesses</span>
        </div>
        <span className="text-white/70 text-xs">Slide 13 of 21</span>
      </div>
      <div className="bg-navy flex items-end justify-between" style={{ padding: '2.5vh 5vw 2vh' }}>
        <div>
          <h2 className="text-white font-black" style={{ fontSize: '2.8vw' }}>When Your Team's English <span className="text-amber-400">Holds Business Back</span></h2>
          <p className="text-white/50 italic font-light" style={{ fontSize: '1.1vw', marginTop: '0.3vh' }}>Khi vốn tiếng Anh của đội ngũ cản trở hoạt động kinh doanh</p>
        </div>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-5" style={{ padding: '3vh 5vw' }}>
        {pains.map(({ icon, title, vi, detail }) => (
          <div key={title} className="bg-white rounded-xl shadow-sm border border-gray-100 flex gap-4" style={{ padding: '2.5vh 2.5vw' }}>
            <div style={{ fontSize: '2.5vw' }} className="flex-shrink-0">{icon}</div>
            <div>
              <div className="text-navy font-bold" style={{ fontSize: '1.2vw' }}>{title}</div>
              <div className="text-amber-600 italic text-xs mt-0.5">{vi}</div>
              <div className="text-muted leading-relaxed mt-2" style={{ fontSize: '0.9vw' }}>{detail}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-amber-500" style={{ padding: '1.8vh 5vw' }}>
        <p className="text-white font-bold text-center" style={{ fontSize: '1.3vw' }}>The good news: vocabulary is a skill that improves quickly with the right tool.</p>
      </div>
    </div>
  );
}

/* ── Slide 14: Business Solution ─────────────────────────────── */
function S14() {
  const benefits = [
    { title: 'Industry-specific word lists', detail: 'Import CSV vocabulary sets for logistics, finance, tech, or HR — tailored to your business domain.', icon: '📋' },
    { title: "Each employee's own account", detail: 'Personal vocabulary libraries reflect each person\'s role, gaps, and progress independently.', icon: '👤' },
    { title: 'Track team engagement', detail: 'Use the admin dashboard to see who\'s active and which vocabulary areas need attention.', icon: '📊' },
    { title: 'Mobile-first — no training required', detail: 'Your team can start during their lunch break. No installation, no IT department needed.', icon: '📱' },
  ];
  return (
    <div className="slide-root flex" style={{ background: 'linear-gradient(160deg, #1A1A2E 0%, #16213E 100%)' }}>
      <div className="flex-1 flex flex-col">
        <div className="bg-amber-500 flex items-center justify-between" style={{ padding: '1.2vh 5vw' }}>
          <div className="flex items-center gap-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
            <span className="text-white font-bold text-sm uppercase tracking-wider">Module A — For Businesses</span>
          </div>
          <span className="text-white/70 text-xs">Slide 14 of 21</span>
        </div>
        <div className="flex-1 flex gap-6" style={{ padding: '4vh 5vw' }}>
          <div className="flex flex-col justify-center" style={{ width: '40vw' }}>
            <h2 className="text-white font-black leading-tight" style={{ fontSize: '3.2vw' }}>Vocabulary Builder<br /><span className="text-amber-400">for Your Team</span></h2>
            <p className="text-white/40 italic mt-2" style={{ fontSize: '1.1vw' }}>Vocabulary Builder dành cho đội ngũ của bạn</p>
            <p className="text-white/70 leading-relaxed mt-5" style={{ fontSize: '1.1vw' }}>Give each team member a personalized vocabulary practice tool, tuned to your industry. Track progress without micromanaging. See results in weeks, not months.</p>
            <div className="mt-6 rounded-xl bg-amber-500/20 border border-amber-500/30" style={{ padding: '2.5vh 2.5vw' }}>
              <div className="text-amber-400 font-black" style={{ fontSize: '2vw' }}>500,000 ₫</div>
              <div className="text-white/60 text-xs">per person / 6 months · +10% VAT</div>
              <div className="text-white/50 text-xs mt-1">Volume pricing available — contact us</div>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            {benefits.map(({ title, detail, icon }) => (
              <div key={title} className="rounded-xl flex flex-col gap-2" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', padding: '2.5vh 2vw' }}>
                <div style={{ fontSize: '2vw' }}>{icon}</div>
                <div className="text-white font-bold" style={{ fontSize: '1.05vw' }}>{title}</div>
                <div className="text-white/50" style={{ fontSize: '0.85vw' }}>{detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Slide 15: Business Anecdote ─────────────────────────────── */
function S15() {
  return (
    <div className="slide-root flex flex-col" style={{ background: 'linear-gradient(160deg, #1A1A2E 0%, #16213E 100%)' }}>
      <div className="bg-amber-500 flex items-center justify-between" style={{ padding: '1.2vh 5vw' }}>
        <div className="flex items-center gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
          <span className="text-white font-bold text-sm uppercase tracking-wider">Module A — For Businesses</span>
        </div>
        <span className="text-white/70 text-xs">Slide 15 of 21</span>
      </div>
      <div className="flex-1 flex gap-8" style={{ padding: '4vh 6vw' }}>
        <div className="flex flex-col justify-center" style={{ width: '28vw' }}>
          <div className="rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, #F05A28 0%, #C43F10 100%)', padding: '4vh 3vw' }}>
            <div className="rounded-full bg-white/20 mx-auto flex items-center justify-center mb-4" style={{ width: '5vw', height: '5vw', minWidth: 60, minHeight: 60 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" style={{ width: '2.5vw' }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div className="text-white font-black" style={{ fontSize: '1.6vw' }}>Nguyen Van Minh</div>
            <div className="text-white/70 text-xs mt-1">Procurement Manager</div>
            <div className="text-white/50 text-xs">Logistics Company · Ho Chi Minh City</div>
            <div className="mt-5 pt-4 border-t border-white/20 grid grid-cols-2 gap-3">
              <div className="text-center"><div className="text-accent font-black" style={{ fontSize: '1.8vw' }}>3 mo</div><div className="text-white/60 text-xs">using the app</div></div>
              <div className="text-center"><div className="text-accent font-black" style={{ fontSize: '1.8vw' }}>320+</div><div className="text-white/60 text-xs">words learned</div></div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-amber-400 font-bold uppercase tracking-wider mb-3" style={{ fontSize: '0.85vw' }}>Customer Story</div>
          <div className="text-white/30" style={{ fontSize: '4vw', lineHeight: 1 }}>"</div>
          <blockquote className="text-white font-medium leading-relaxed" style={{ fontSize: '1.4vw', marginTop: '-1vh' }}>I was losing deals because I couldn't express contract terms confidently in English. After three months with Vocabulary Builder — focusing on procurement and legal vocabulary — I closed our largest international contract. The client commented on how professional our communication was.</blockquote>
          <p className="text-white/40 italic mt-3" style={{ fontSize: '0.95vw' }}>Tôi từng mất hợp đồng vì không thể diễn đạt điều khoản hợp đồng tự tin bằng tiếng Anh. Sau 3 tháng dùng Vocabulary Builder, tôi đã ký hợp đồng quốc tế lớn nhất của mình.</p>
          <div className="mt-6 flex gap-4">
            <div className="flex-1 rounded-xl bg-white/5 border border-white/10" style={{ padding: '2vh 2vw' }}>
              <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Before</div>
              <div className="text-white font-medium" style={{ fontSize: '1vw' }}>Hesitant in English meetings. Generic word lists. Slow progress.</div>
            </div>
            <div className="flex-1 rounded-xl bg-amber-500/15 border border-amber-500/30" style={{ padding: '2vh 2vw' }}>
              <div className="text-amber-400 text-xs uppercase tracking-wider mb-1">After 3 months</div>
              <div className="text-white font-medium" style={{ fontSize: '1vw' }}>Confident negotiations. Industry vocabulary mastered. Contract won.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Slide 16: Student Pain ──────────────────────────────────── */
function S16() {
  const pains = [
    { icon: '📝', title: 'Vocabulary is the #1 IELTS barrier', vi: 'Từ vựng là rào cản số 1 trong IELTS', detail: 'Band 7+ in Reading and Writing requires precise vocabulary — a single wrong word choice lowers your score.' },
    { icon: '😓', title: "Generic textbook lists don't prepare you", vi: 'Danh sách từ trong sách giáo khoa không chuẩn bị đủ', detail: 'Academic word lists miss the context and depth examiners look for in top-band responses.' },
    { icon: '🔁', title: 'You cram before exams and forget after', vi: 'Học nhồi nhét trước kỳ thi và quên sau đó', detail: 'Intensive pre-exam study produces short-term recall. Exams test long-term retention.' },
    { icon: '⏳', title: 'Full-time students have limited spare time', vi: 'Sinh viên toàn thời gian có ít thời gian rảnh', detail: "University workloads mean vocabulary study gets squeezed out — unless it's effortless and fast." },
  ];
  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
      <div className="bg-blue-600 flex items-center justify-between" style={{ padding: '1.2vh 5vw' }}>
        <div className="flex items-center gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
          <span className="text-white font-bold text-sm uppercase tracking-wider">Module B — For Students</span>
        </div>
        <span className="text-white/70 text-xs">Slide 16 of 21</span>
      </div>
      <div className="bg-navy flex items-end justify-between" style={{ padding: '2.5vh 5vw 2vh' }}>
        <div>
          <h2 className="text-white font-black" style={{ fontSize: '2.8vw' }}>Vocabulary is the <span className="text-blue-400">Exam Differentiator</span></h2>
          <p className="text-white/50 italic font-light" style={{ fontSize: '1.1vw', marginTop: '0.3vh' }}>Từ vựng là yếu tố phân biệt trong kỳ thi</p>
        </div>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-5" style={{ padding: '3vh 5vw' }}>
        {pains.map(({ icon, title, vi, detail }) => (
          <div key={title} className="bg-white rounded-xl shadow-sm border border-gray-100 flex gap-4" style={{ padding: '2.5vh 2.5vw' }}>
            <div style={{ fontSize: '2.5vw' }} className="flex-shrink-0">{icon}</div>
            <div>
              <div className="text-navy font-bold" style={{ fontSize: '1.2vw' }}>{title}</div>
              <div className="text-blue-600 italic text-xs mt-0.5">{vi}</div>
              <div className="text-muted leading-relaxed mt-2" style={{ fontSize: '0.9vw' }}>{detail}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-blue-600" style={{ padding: '1.8vh 5vw' }}>
        <p className="text-white font-bold text-center" style={{ fontSize: '1.3vw' }}>Smart vocabulary study — not more hours — is what separates Band 6 from Band 7+.</p>
      </div>
    </div>
  );
}

/* ── Slide 17: Student Solution ──────────────────────────────── */
function S17() {
  const features = [
    { title: 'IELTS Academic word lists', detail: 'Import the Academic Word List as CSV — then personalize it with your own encountered words.' },
    { title: 'Reading & Writing vocabulary focus', detail: 'Tag words by skill (Reading / Writing / Speaking) and filter your review sessions accordingly.' },
    { title: 'Spaced repetition = long-term retention', detail: 'Stop cramming. Words reviewed at optimal intervals stay in your memory for exam day and beyond.' },
    { title: 'Quiz modes for exam practice', detail: 'Multiple-choice and definition-matching quizzes mirror actual exam question formats.' },
  ];
  return (
    <div className="slide-root flex" style={{ background: 'linear-gradient(160deg, #1A1A2E 0%, #16213E 100%)' }}>
      <div className="flex-1 flex flex-col">
        <div className="bg-blue-600 flex items-center justify-between" style={{ padding: '1.2vh 5vw' }}>
          <div className="flex items-center gap-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            <span className="text-white font-bold text-sm uppercase tracking-wider">Module B — For Students</span>
          </div>
          <span className="text-white/70 text-xs">Slide 17 of 21</span>
        </div>
        <div className="flex-1 flex gap-6" style={{ padding: '4vh 5vw' }}>
          <div className="flex flex-col justify-center" style={{ width: '40vw' }}>
            <h2 className="text-white font-black leading-tight" style={{ fontSize: '3.2vw' }}>Built for IELTS,<br /><span className="text-blue-400">Cambridge & School Exams</span></h2>
            <p className="text-white/40 italic mt-2" style={{ fontSize: '1.1vw' }}>Được xây dựng cho IELTS, Cambridge và các kỳ thi trường học</p>
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
                    <div className="h-5 rounded-full flex items-center justify-end pr-2" style={{ width: `${(weeks / 16) * 100 + 20}%`, background: color }}>
                      <span className="text-white text-xs font-bold">{band}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-white/30 text-xs mt-2">Based on consistent 5 min/day practice</div>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center space-y-4">
            {features.map(({ title, detail }) => (
              <div key={title} className="rounded-xl flex gap-4 items-start" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(59,130,246,0.2)', padding: '2.5vh 2vw' }}>
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
  );
}

/* ── Slide 18: Student Anecdote ──────────────────────────────── */
function S18() {
  return (
    <div className="slide-root flex flex-col" style={{ background: 'linear-gradient(160deg, #1A1A2E 0%, #16213E 100%)' }}>
      <div className="bg-blue-600 flex items-center justify-between" style={{ padding: '1.2vh 5vw' }}>
        <div className="flex items-center gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
          <span className="text-white font-bold text-sm uppercase tracking-wider">Module B — For Students</span>
        </div>
        <span className="text-white/70 text-xs">Slide 18 of 21</span>
      </div>
      <div className="flex-1 flex gap-8" style={{ padding: '4vh 6vw' }}>
        <div className="flex flex-col justify-center" style={{ width: '28vw' }}>
          <div className="rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #5B6CF0 100%)', padding: '4vh 3vw' }}>
            <div className="rounded-full bg-white/20 mx-auto flex items-center justify-center mb-4" style={{ width: '5vw', height: '5vw', minWidth: 60, minHeight: 60 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" style={{ width: '2.5vw' }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div className="text-white font-black" style={{ fontSize: '1.6vw' }}>Pham Thi Linh</div>
            <div className="text-white/70 text-xs mt-1">Final Year Student</div>
            <div className="text-white/50 text-xs">Foreign Trade University · Hanoi</div>
            <div className="mt-5 pt-4 border-t border-white/20 grid grid-cols-2 gap-3">
              <div className="text-center"><div className="text-blue-200 font-black" style={{ fontSize: '1.6vw' }}>6.0 → 7.5</div><div className="text-white/60 text-xs">IELTS band score</div></div>
              <div className="text-center"><div className="text-blue-200 font-black" style={{ fontSize: '1.6vw' }}>3 mo</div><div className="text-white/60 text-xs">to achieve it</div></div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-blue-400 font-bold uppercase tracking-wider mb-3" style={{ fontSize: '0.85vw' }}>Student Story</div>
          <div className="text-white/30" style={{ fontSize: '4vw', lineHeight: 1 }}>"</div>
          <blockquote className="text-white font-medium leading-relaxed" style={{ fontSize: '1.4vw', marginTop: '-1vh' }}>I needed a 7.0 for my scholarship application. My vocabulary was my weakest point — I kept using simple words when the examiner expected sophisticated ones. Three months of Vocabulary Builder later, I scored 7.5. The scholarship was mine. I reviewed words during my commute. Just 5 minutes each morning.</blockquote>
          <p className="text-white/40 italic mt-3" style={{ fontSize: '0.95vw' }}>Tôi cần điểm 7.0 cho đơn học bổng của mình. Sau 3 tháng dùng Vocabulary Builder, tôi đạt 7.5. Học bổng đã thuộc về tôi.</p>
          <div className="mt-6 flex gap-4">
            <div className="flex-1 rounded-xl bg-white/5 border border-white/10" style={{ padding: '2vh 2vw' }}>
              <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Before</div>
              <div className="text-white font-medium" style={{ fontSize: '1vw' }}>Band 6.0. Using simple, basic vocabulary. Lost marks on Writing Task 2.</div>
            </div>
            <div className="flex-1 rounded-xl bg-blue-500/15 border border-blue-500/30" style={{ padding: '2vh 2vw' }}>
              <div className="text-blue-400 text-xs uppercase tracking-wider mb-1">After 3 months</div>
              <div className="text-white font-medium" style={{ fontSize: '1vw' }}>Band 7.5. Sophisticated, precise vocabulary. Scholarship awarded.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Slide 19: Individual Aspiration ─────────────────────────── */
function S19() {
  const personas = [
    { icon: '🌍', name: 'The Traveler', vi: 'Người đi du lịch', aspiration: 'Wants to connect authentically with people in English-speaking countries.', pain: "Knows grammar well but doesn't have the words when it matters.", color: '#F05A28' },
    { icon: '💼', name: 'The Career Climber', vi: 'Người thăng tiến sự nghiệp', aspiration: 'Wants to impress international colleagues and get that promotion.', pain: "Holds back in meetings because the right word doesn't come fast enough.", color: '#5B6CF0' },
    { icon: '📺', name: 'The Content Consumer', vi: 'Người tiêu thụ nội dung', aspiration: 'Wants to understand Netflix, YouTube, and podcasts without subtitles.', pain: 'Missing vocabulary makes media exhausting instead of enjoyable.', color: '#9B5CF6' },
  ];
  return (
    <div className="slide-root bg-[#F8F9FA] flex flex-col">
      <div className="bg-emerald-600 flex items-center justify-between" style={{ padding: '1.2vh 5vw' }}>
        <div className="flex items-center gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <span className="text-white font-bold text-sm uppercase tracking-wider">Module C — For Individuals</span>
        </div>
        <span className="text-white/70 text-xs">Slide 19 of 21</span>
      </div>
      <div className="bg-navy flex items-end justify-between" style={{ padding: '2.5vh 5vw 2vh' }}>
        <div>
          <h2 className="text-white font-black" style={{ fontSize: '2.8vw' }}>The Confident English Speaker <span className="text-emerald-400">You're Becoming</span></h2>
          <p className="text-white/50 italic font-light" style={{ fontSize: '1.1vw', marginTop: '0.3vh' }}>Người nói tiếng Anh tự tin mà bạn đang trở thành</p>
        </div>
      </div>
      <div className="flex-1 flex gap-5" style={{ padding: '3vh 5vw' }}>
        {personas.map(({ icon, name, vi, aspiration, pain, color }) => (
          <div key={name} className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col" style={{ padding: '3.5vh 2.5vw' }}>
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
            <div className="mt-4 text-xs font-bold" style={{ color }}>Vocabulary Builder solves this →</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Slide 20: Individual Fit ────────────────────────────────── */
function S20() {
  const moments = [
    { time: '7:00 AM', activity: 'Morning commute', action: 'Review 5 words on your phone — during the bus or Grab ride.' },
    { time: '12:00 PM', activity: 'Lunch break', action: 'Add 2 new words you heard in a meeting or read in an email.' },
    { time: '8:00 PM', activity: 'Evening wind-down', action: "Quick 10-word quiz — 5 minutes before your favourite show." },
  ];
  return (
    <div className="slide-root flex" style={{ background: 'linear-gradient(160deg, #1A1A2E 0%, #16213E 100%)' }}>
      <div className="flex-1 flex flex-col">
        <div className="bg-emerald-600 flex items-center justify-between" style={{ padding: '1.2vh 5vw' }}>
          <div className="flex items-center gap-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span className="text-white font-bold text-sm uppercase tracking-wider">Module C — For Individuals</span>
          </div>
          <span className="text-white/70 text-xs">Slide 20 of 21</span>
        </div>
        <div className="flex-1 flex gap-8" style={{ padding: '4vh 5vw' }}>
          <div className="flex flex-col justify-center" style={{ width: '42vw' }}>
            <h2 className="text-white font-black leading-tight" style={{ fontSize: '3.2vw' }}>5 Minutes a Day.<br /><span className="text-emerald-400">Real Results.</span></h2>
            <p className="text-white/40 italic mt-2" style={{ fontSize: '1.1vw' }}>5 phút mỗi ngày. Kết quả thực sự.</p>
            <p className="text-white/70 leading-relaxed mt-5" style={{ fontSize: '1.1vw' }}>You don't need to carve out study sessions. Vocabulary Builder fits into the small gaps that already exist in your day — making it the most sustainable way to build fluency.</p>
            <div className="mt-6 space-y-3">
              {moments.map(({ time, activity, action }) => (
                <div key={time} className="flex gap-4 items-start rounded-xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(52,211,153,0.2)', padding: '2vh 2vw' }}>
                  <div className="flex-shrink-0 text-right" style={{ width: '4.5vw' }}>
                    <div className="text-emerald-400 font-bold" style={{ fontSize: '1vw' }}>{time}</div>
                    <div className="text-white/30 text-xs">{activity}</div>
                  </div>
                  <div className="text-white/70" style={{ fontSize: '0.95vw' }}>{action}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-4">
            {[
              { val: '365', unit: 'days of 5 min', label: 'Equals 30 hours of focused study', color: '#10B981' },
              { val: '500+', unit: 'words', label: 'Average learned in 90 days of daily use', color: '#F05A28' },
              { val: '0', unit: 'apps', label: 'No installation needed — runs in any browser', color: '#5B6CF0' },
            ].map(({ val, unit, label, color }) => (
              <div key={val} className="rounded-2xl" style={{ background: `${color}15`, border: `1px solid ${color}30`, padding: '3vh 3vw' }}>
                <div className="flex items-end gap-2">
                  <div className="font-black" style={{ color, fontSize: '3vw', lineHeight: 1 }}>{val}</div>
                  <div className="font-bold mb-1" style={{ color: `${color}99`, fontSize: '1vw' }}>{unit}</div>
                </div>
                <div className="text-white/60 mt-1" style={{ fontSize: '0.9vw' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Slide 21: Individual Anecdote ───────────────────────────── */
function S21() {
  return (
    <div className="slide-root flex flex-col" style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 60%, #0F3460 100%)' }}>
      <div className="bg-emerald-600 flex items-center justify-between" style={{ padding: '1.2vh 5vw' }}>
        <div className="flex items-center gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <span className="text-white font-bold text-sm uppercase tracking-wider">Module C — For Individuals</span>
        </div>
        <span className="text-white/70 text-xs">Slide 21 of 21</span>
      </div>
      <div className="flex-1 flex gap-8" style={{ padding: '4vh 6vw' }}>
        <div className="flex flex-col justify-center" style={{ width: '28vw' }}>
          <div className="rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', padding: '4vh 3vw' }}>
            <div className="rounded-full bg-white/20 mx-auto flex items-center justify-center mb-4" style={{ width: '5vw', height: '5vw', minWidth: 60, minHeight: 60 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" style={{ width: '2.5vw' }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div className="text-white font-black" style={{ fontSize: '1.6vw' }}>Tran Thi Hoa</div>
            <div className="text-white/70 text-xs mt-1">Marketing Executive</div>
            <div className="text-white/50 text-xs">Da Nang · 31 years old</div>
            <div className="mt-5 pt-4 border-t border-white/20 grid grid-cols-2 gap-3">
              <div className="text-center"><div className="text-emerald-200 font-black" style={{ fontSize: '1.6vw' }}>4 mo</div><div className="text-white/60 text-xs">using the app</div></div>
              <div className="text-center"><div className="text-emerald-200 font-black" style={{ fontSize: '1.6vw' }}>280+</div><div className="text-white/60 text-xs">words mastered</div></div>
            </div>
          </div>
          <div className="mt-4 rounded-xl bg-brand text-white text-center" style={{ padding: '2.5vh 2vw' }}>
            <div className="font-black" style={{ fontSize: '1.1vw' }}>Start your free trial</div>
            <div className="text-white/70 text-xs mt-1">7 days · No card needed</div>
            <div className="mt-2 text-xs text-white/60">500,000 ₫ / 6 months after</div>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-emerald-400 font-bold uppercase tracking-wider mb-3" style={{ fontSize: '0.85vw' }}>Individual Story</div>
          <div className="text-white/30" style={{ fontSize: '4vw', lineHeight: 1 }}>"</div>
          <blockquote className="text-white font-medium leading-relaxed" style={{ fontSize: '1.4vw', marginTop: '-1vh' }}>I used to translate every sentence in my head before speaking. After four months of building vocabulary my way — words I actually use at work, words I hear in podcasts — I stopped translating. English started flowing naturally. My colleagues noticed. My manager noticed. That was worth every dong.</blockquote>
          <p className="text-white/40 italic mt-3" style={{ fontSize: '0.95vw' }}>Tôi từng phải dịch từng câu trong đầu trước khi nói. Sau 4 tháng xây dựng vốn từ theo cách của mình, tôi ngừng dịch. Tiếng Anh bắt đầu trôi chảy tự nhiên.</p>
          <div className="mt-6 flex gap-4">
            <div className="flex-1 rounded-xl bg-white/5 border border-white/10" style={{ padding: '2vh 2vw' }}>
              <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Before</div>
              <div className="text-white font-medium" style={{ fontSize: '1vw' }}>Translating in her head. Hesitant to speak. Generic word lists that didn't connect.</div>
            </div>
            <div className="flex-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30" style={{ padding: '2vh 2vw' }}>
              <div className="text-emerald-400 text-xs uppercase tracking-wider mb-1">After 4 months</div>
              <div className="text-white font-medium" style={{ fontSize: '1vw' }}>Speaks without translating. Promoted. Confident in international client calls.</div>
            </div>
          </div>
          <div className="mt-5 text-center border-t border-white/10 pt-4">
            <div className="text-white/40 text-xs uppercase tracking-wider">ACE-Apps · Vocabulary Builder · ace.apps.44@gmail.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Presentation viewer ─────────────────────────────────────── */
const SLIDES = [S01,S02,S03,S04,S05,S06,S07,S08,S09,S10,S11,S12,S13,S14,S15,S16,S17,S18,S19,S20,S21];

const SLIDE_TITLES = [
  'Cover','Problem','Solution','Personalization','Context',
  'Spaced Repetition','Progress','Any Device','Social Proof','Pricing',
  'Getting Started','Core CTA',
  'Business Pain','Business Solution','Business Story',
  'Student Pain','Student Solution','Student Story',
  'Individual Aspiration','Individual Fit','Individual Story',
];

export function Presentation() {
  const [cur, setCur] = useState(0);
  const total = SLIDES.length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        setCur(c => Math.min(c + 1, total - 1));
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setCur(c => Math.max(c - 1, 0));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [total]);

  const SlideComp = SLIDES[cur];

  return (
    <div className="flex flex-col bg-black" style={{ width: '100vw', height: '100vh', fontFamily: 'Inter, sans-serif' }}>
      {/* Slide area */}
      <div className="flex-1 relative overflow-hidden">
        <SlideComp />
      </div>

      {/* Navigation bar */}
      <div className="flex items-center justify-between bg-gray-950 border-t border-white/10" style={{ padding: '0 20px', height: 48, flexShrink: 0 }}>
        {/* Prev */}
        <button
          onClick={() => setCur(c => Math.max(c - 1, 0))}
          disabled={cur === 0}
          className="flex items-center gap-2 text-sm font-semibold text-white/60 disabled:text-white/20 hover:text-white transition-colors"
          style={{ background: 'none', border: 'none', cursor: cur === 0 ? 'not-allowed' : 'pointer', padding: '8px 12px' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          Prev
        </button>

        {/* Center: dots + title */}
        <div className="flex flex-col items-center gap-1">
          <div className="text-white/40 text-xs font-medium">{SLIDE_TITLES[cur]}</div>
          <div className="flex items-center gap-1">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCur(i)}
                style={{
                  width: i === cur ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: i === cur ? '#F05A28' : 'rgba(255,255,255,0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.2s',
                }}
              />
            ))}
          </div>
          <div className="text-white/30 text-xs">{cur + 1} / {total}</div>
        </div>

        {/* Next */}
        <button
          onClick={() => setCur(c => Math.min(c + 1, total - 1))}
          disabled={cur === total - 1}
          className="flex items-center gap-2 text-sm font-semibold text-white/60 disabled:text-white/20 hover:text-white transition-colors"
          style={{ background: 'none', border: 'none', cursor: cur === total - 1 ? 'not-allowed' : 'pointer', padding: '8px 12px' }}
        >
          Next
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  );
}

export { S01,S02,S03,S04,S05,S06,S07,S08,S09,S10,S11,S12,S13,S14,S15,S16,S17,S18,S19,S20,S21,SLIDES,SLIDE_TITLES };
