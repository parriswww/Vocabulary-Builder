import { useState, useCallback } from "react";
import {
  privacyPolicyContent,
  termsOfServiceContent,
  refundPolicyContent,
} from "../legal/privacy-policy";

type LegalType = "privacy" | "terms" | "refund";

function renderMarkdown(md: string) {
  const lines = md.split("\n");
  const result: React.ReactNode[] = [];
  let key = 0;
  for (const line of lines) {
    if (line.startsWith("## ")) {
      result.push(
        <h2 key={key++} className="text-lg font-semibold mt-6 mb-2 text-gray-800">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("# ")) {
      result.push(
        <h1 key={key++} className="text-xl font-bold mt-4 mb-3 text-gray-900">
          {line.slice(2)}
        </h1>
      );
    } else if (line.startsWith("**") && line.endsWith("**")) {
      result.push(
        <p key={key++} className="font-semibold text-gray-800 mt-2">
          {line.slice(2, -2)}
        </p>
      );
    } else if (line.trim() === "") {
      result.push(<div key={key++} className="h-2" />);
    } else {
      const formatted = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      result.push(
        <p
          key={key++}
          className="text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formatted }}
        />
      );
    }
  }
  return result;
}

function LegalModal({
  type,
  onClose,
}: {
  type: LegalType;
  onClose: () => void;
}) {
  const content =
    type === "privacy"
      ? privacyPolicyContent
      : type === "refund"
      ? refundPolicyContent
      : termsOfServiceContent;
  const title =
    type === "privacy"
      ? "Privacy Policy"
      : type === "refund"
      ? "Refund Policy"
      : "Terms of Service";

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      data-testid="legal-modal-overlay"
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-colors rounded-lg p-1"
            data-testid="button-legal-close"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-6 py-4 overflow-y-auto flex-1 text-sm">
          {renderMarkdown(content)}
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    en: "Spaced Repetition Flashcards",
    vi: "Thẻ Ghi Nhớ Lặp Lại Theo Khoa Học",
    enSub: "Words taught at the right time, so they stick long-term.",
    viSub: "Từ vựng được ôn tập đúng lúc, giúp nhớ lâu hơn.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    en: "Interactive Quizzes",
    vi: "Bài Kiểm Tra Tương Tác",
    enSub: "Multiple choice and fill-in-the-blank to reinforce recall.",
    viSub: "Trắc nghiệm và điền vào ô trống để củng cố trí nhớ.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    en: "Daily Streak Tracking",
    vi: "Theo Dõi Chuỗi Học Hàng Ngày",
    enSub: "Consistent daily habit is the key to lasting vocabulary growth.",
    viSub: "Thói quen học mỗi ngày là chìa khóa để mở rộng từ vựng bền vững.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
      </svg>
    ),
    en: "Cross-Device Sync",
    vi: "Đồng Bộ Đa Thiết Bị",
    enSub: "Start on your phone, continue on your laptop — progress is always saved.",
    viSub: "Bắt đầu trên điện thoại, tiếp tục trên máy tính — tiến độ luôn được lưu.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    en: "Progress Dashboard",
    vi: "Bảng Thống Kê Tiến Độ",
    enSub: "See words learned, mastery levels, and study streaks at a glance.",
    viSub: "Xem số từ đã học, mức độ thành thạo và chuỗi học tập chỉ trong tích tắc.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    en: "Auto-Lookup Definitions",
    vi: "Tra Cứu Nghĩa Tự Động",
    enSub: "Add any word and get its definition, pronunciation, and examples instantly.",
    viSub: "Thêm bất kỳ từ nào và nhận ngay nghĩa, phát âm và ví dụ tức thì.",
  },
];

export default function EmployeesPage() {
  const [legalOpen, setLegalOpen] = useState<LegalType | null>(null);
  const openLegal = useCallback((t: LegalType) => setLegalOpen(t), []);
  const closeLegal = useCallback(() => setLegalOpen(null), []);

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {legalOpen && <LegalModal type={legalOpen} onClose={closeLegal} />}

      {/* ───────────────── NAV ───────────────── */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-sm">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="font-bold text-gray-900 text-base tracking-tight">Vocabulary Builder</span>
        </div>
        <a
          href="/"
          className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
          data-testid="link-nav-main-app"
        >
          Go to App
        </a>
      </nav>

      {/* ───────────────── HERO ───────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-white pt-16 pb-20 px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-100/60 rounded-full blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-amber-100/60 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold tracking-wide text-orange-600 bg-orange-100 rounded-full uppercase">
            Dành cho doanh nghiệp &amp; nhân viên — For Businesses &amp; Their Teams
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-3">
            Build Your Team's English Vocabulary —
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500"> Smarter</span>
          </h1>
          <p className="text-base text-gray-500 mb-2 italic">
            Xây Dựng Vốn Từ Vựng Tiếng Anh Cho Nhân Viên — Thông Minh Hơn
          </p>
          <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Vocabulary Builder gives every team member a proven, science-backed system to grow their professional English, track their own progress, and stay consistent — from any device, any time.
          </p>
          <p className="mt-1 text-sm text-gray-400 max-w-2xl mx-auto italic">
            Vocabulary Builder cung cấp cho mỗi nhân viên một hệ thống học từ vựng tiếng Anh chuyên nghiệp dựa trên khoa học, theo dõi tiến độ và duy trì thói quen học tập — trên mọi thiết bị, mọi lúc.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/?checkout=direct"
              data-testid="cta-subscribe-now"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-base shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:from-orange-600 hover:to-amber-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Subscribe Now — Skip Trial
            </a>
            <a
              href="/"
              data-testid="cta-free-trial"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-base hover:border-orange-300 hover:text-orange-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 bg-white"
            >
              Start 7-Day Free Trial
            </a>
          </div>
          <p className="mt-4 text-xs text-gray-400 text-center">
            Đăng ký ngay và bắt đầu học từ vựng hôm nay. &nbsp;·&nbsp; Subscribe and start learning today.
          </p>
        </div>
      </section>

      {/* ───────────────── FEATURES ───────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">Everything They Need to Succeed</h2>
            <p className="text-gray-500 italic mt-1 text-sm">Tất Cả Những Gì Họ Cần Để Thành Công</p>
            <p className="mt-3 text-gray-500 text-base max-w-xl mx-auto">
              A complete toolkit for vocabulary mastery — no extra apps, no complicated setup.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-100 bg-gray-50 p-6 flex flex-col gap-3"
                data-testid={`feature-card-${i}`}
              >
                <div className="w-11 h-11 rounded-lg bg-orange-100 text-orange-500 flex items-center justify-center flex-shrink-0">
                  {f.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{f.en}</p>
                  <p className="text-xs text-gray-400 italic">{f.vi}</p>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{f.enSub}</p>
                  <p className="text-xs text-gray-400 italic mt-0.5">{f.viSub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── PRICING ───────────────── */}
      <section className="py-20 px-6 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-lg mx-auto">
          <div className="rounded-2xl bg-white border border-orange-100 shadow-lg shadow-orange-100/40 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-6 text-white text-center">
              <p className="text-sm font-medium uppercase tracking-wider opacity-80 mb-1">Semi-Annual Plan · Gói 6 Tháng</p>
              <div className="flex items-end justify-center gap-1">
                <span className="text-5xl font-extrabold">500,000</span>
                <span className="text-xl font-semibold pb-1">₫</span>
              </div>
              <p className="text-sm opacity-80 mt-1">every 6 months · mỗi 6 tháng</p>
            </div>
            <div className="px-8 py-7">
              <ul className="space-y-3 text-sm text-gray-600">
                {[
                  ["Full access to all features", "Truy cập đầy đủ tất cả tính năng"],
                  ["Unlimited vocabulary words", "Không giới hạn số từ vựng"],
                  ["Cross-device sync included", "Đồng bộ đa thiết bị"],
                  ["Progress tracking & statistics", "Theo dõi tiến độ & thống kê"],
                  ["Cancel any time", "Hủy bất kỳ lúc nào"],
                ].map(([en, vi], i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>
                      {en}
                      <span className="text-gray-400 italic text-xs block">{vi}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-lg bg-amber-50 border border-amber-100 px-4 py-3 text-xs text-amber-700">
                <strong>Note:</strong> +10% VAT applies for purchases in Vietnam &mdash; total <strong>550,000 ₫</strong> per 6 months.
                <span className="block text-amber-600 italic mt-0.5">Lưu ý: +10% VAT áp dụng cho giao dịch tại Việt Nam — tổng cộng <strong>550,000 ₫</strong> mỗi 6 tháng.</span>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href="/?checkout=direct"
                  data-testid="cta-pricing-subscribe"
                  className="block w-full text-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm shadow-md shadow-orange-200 hover:from-orange-600 hover:to-amber-600 transition-all duration-200"
                >
                  Subscribe Now — Skip Trial
                </a>
                <a
                  href="/"
                  data-testid="cta-pricing-trial"
                  className="block w-full text-center px-6 py-3.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:border-orange-300 hover:text-orange-600 transition-all duration-200 bg-white"
                >
                  Start Free 7-Day Trial First
                </a>
              </div>
              <p className="text-center text-xs text-gray-400 mt-3">
                ~83,000 ₫/month &nbsp;·&nbsp; Less than a cup of coffee per week
                <span className="block italic">Chưa đến 1 ly cà phê mỗi tuần</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── HOW IT WORKS ───────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">Get Started in Minutes</h2>
          <p className="text-gray-400 italic text-sm mt-1">Bắt Đầu Trong Vài Phút</p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                en: "Click Subscribe",
                vi: "Nhấp Đăng Ký",
                desc: "Use the button above to subscribe or start your free trial.",
                descVi: "Nhấn nút phía trên để đăng ký hoặc dùng thử miễn phí.",
              },
              {
                step: "2",
                en: "Add Your Words",
                vi: "Thêm Từ Của Bạn",
                desc: "Add vocabulary words manually or import a CSV — definitions auto-fill.",
                descVi: "Thêm từ vựng thủ công hoặc nhập CSV — nghĩa tự điền vào.",
              },
              {
                step: "3",
                en: "Study Daily",
                vi: "Học Mỗi Ngày",
                desc: "Flashcards, quizzes, and streaks keep you on track and improving.",
                descVi: "Thẻ ghi nhớ, bài kiểm tra và chuỗi học giúp bạn luôn tiến bộ.",
              },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-3" data-testid={`step-${i}`}>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 text-white flex items-center justify-center font-extrabold text-lg shadow-md shadow-orange-200">
                  {s.step}
                </div>
                <p className="font-semibold text-gray-900">{s.en}</p>
                <p className="text-xs text-gray-400 italic -mt-2">{s.vi}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                <p className="text-xs text-gray-400 italic">{s.descVi}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/?checkout=direct"
              data-testid="cta-howto-subscribe"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-base shadow-lg shadow-orange-200 hover:from-orange-600 hover:to-amber-600 transition-all duration-200"
            >
              Subscribe Now — Skip Trial
            </a>
            <a
              href="/"
              data-testid="cta-howto-trial"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-base hover:border-orange-300 hover:text-orange-600 transition-all duration-200 bg-white"
            >
              Start 7-Day Free Trial
            </a>
          </div>
        </div>
      </section>

      {/* ───────────────── FOOTER ───────────────── */}
      <footer className="border-t border-gray-100 bg-gray-50 px-6 py-10 text-center text-sm text-gray-400">
        <p className="font-semibold text-gray-600 mb-1">ACE-Apps · Vocabulary Builder</p>
        <p className="text-xs mb-4">vocabulary-builder.net</p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <button
            onClick={() => openLegal("privacy")}
            className="hover:text-gray-600 transition-colors underline underline-offset-2"
            data-testid="link-footer-privacy"
          >
            Privacy Policy
          </button>
          <span>·</span>
          <button
            onClick={() => openLegal("terms")}
            className="hover:text-gray-600 transition-colors underline underline-offset-2"
            data-testid="link-footer-terms"
          >
            Terms of Service
          </button>
          <span>·</span>
          <button
            onClick={() => openLegal("refund")}
            className="hover:text-gray-600 transition-colors underline underline-offset-2"
            data-testid="link-footer-refund"
          >
            Refund Policy
          </button>
        </div>
        <p className="mt-5 text-xs text-gray-300">
          &copy; {new Date().getFullYear()} ACE-Apps. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
