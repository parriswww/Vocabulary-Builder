import { useState, useEffect, useMemo } from 'react';
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  signInAnonymously, 
  signInWithCustomToken,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
  onAuthStateChanged,
  type Auth, 
  type User 
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  query,
  onSnapshot,
  type Firestore,
} from 'firebase/firestore';
import type { Word, InsertWord, UserMetadata, Subscription } from '@shared/schema';
import { privacyPolicyContent, termsOfServiceContent } from './legal/privacy-policy';

// Paddle types
declare global {
  interface Window {
    __firebase_config: any;
    __app_id: string;
    __initial_auth_token?: string;
    Paddle?: {
      Initialize: (options: { token: string; environment?: string }) => void;
      Checkout: {
        open: (options: {
          items: Array<{ priceId: string; quantity: number }>;
          customer?: { email: string };
          customData?: { userId: string };
          successCallback?: () => void;
          closeCallback?: () => void;
        }) => void;
      };
    };
  }
}

// Paddle configuration type
interface PaddleConfig {
  clientToken: string;
  environment: string;
  priceId: string;
}

// Inline SVG Icons
const Icons = {
  List: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  Plus: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  Cards: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  Quiz: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Fire: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2c1.37 2.83 2.5 5.33 2.5 8 0 3.31-2.69 6-6 6s-6-2.69-6-6c0-2.67 1.13-5.17 2.5-8 0 0 .5 2 2 2s2-2 2-2c.87 1.67 1.5 3.33 1.5 5 0 1.66-1.34 3-3 3s-3-1.34-3-3c0-1.1.45-2.1 1.17-2.83C6.94 5.42 8 4.58 8 3c0 0 2 1 2 3s-1 3-1 3c2.21 0 4-1.79 4-4 0 0 1.5 1.5 1.5 4s-1.79 4-4 4-4-1.79-4-4c0-.74.2-1.43.54-2.03C8.15 6.4 9 5.3 9 4c0 0 3 2 3 5 0 2.21-1.79 4-4 4s-4-1.79-4-4c0-1.48.81-2.77 2-3.47V5c-1.66.55-3 2.03-3 3.83C3 12.42 6.58 16 11.17 16S19 12.42 19 8.83c0-1.8-1.34-3.28-3-3.83z" />
    </svg>
  ),
  Speaker: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
    </svg>
  ),
  Edit: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  Trash: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Search: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  X: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  ChevronLeft: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  ),
  ChevronRight: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  ),
  Book: () => (
    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  Check: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Chart: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Moon: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  ),
  Sun: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  HelpCircle: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  User: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Logout: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
  Mail: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Lock: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  Crown: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-1h14v1z" />
    </svg>
  ),
  Star: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  ),
  XCircle: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Settings: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  ExternalLink: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  ),
};

// Translations
const TRANSLATIONS = {
  en: {
    trialBadge: '7-DAY FREE TRIAL',
    paywallSubtitle: '7-day free trial, then 130,000 ₫/month',
    perMonthAfterTrial: 'per month after trial',
    perMonth: 'per month',
    startTrial: 'Start your 7-day free trial',
    trialDisclaimer: 'No credit card required during trial. After 7 days: $4.95 USD/month. Cancel anytime.',
    trialBannerActive: (days: number) => `Free trial: ${days} day${days === 1 ? '' : 's'} remaining`,
    trialBannerAdmin: 'Complimentary access granted by admin',
    subscribeNow: 'Subscribe now',
    upgradeNow: 'Subscribe now',
    maybeLater: 'Maybe later',
    securePaddle: 'Secure payment via Paddle. Cancel anytime.',
    dialogTitle: 'Get Full Access',
    dialogSubtitle: 'Remove all limitations and support development',
  },
  vi: {
    trialBadge: '7 ngày dùng thử MIỄN PHÍ',
    paywallSubtitle: 'Dùng thử miễn phí 7 ngày, sau đó 130.000 ₫/tháng',
    perMonthAfterTrial: 'mỗi tháng sau thời gian thử',
    perMonth: 'mỗi tháng',
    startTrial: 'Bắt đầu dùng thử miễn phí 7 ngày',
    trialDisclaimer: 'Không cần thẻ tín dụng trong thời gian thử. Sau 7 ngày: $4.95 USD/tháng. Hủy bất cứ lúc nào.',
    trialBannerActive: (days: number) => `Dùng thử miễn phí: còn ${days} ngày`,
    trialBannerAdmin: 'Tài khoản được cấp miễn phí bởi admin',
    subscribeNow: 'Đăng ký ngay',
    upgradeNow: 'Đăng ký · $4.95 USD/tháng',
    maybeLater: 'Để sau',
    securePaddle: 'Thanh toán an toàn qua Paddle. Hủy bất cứ lúc nào.',
    dialogTitle: 'Mở khóa toàn bộ ứng dụng',
    dialogSubtitle: 'Học từ vựng hiệu quả với flashcard, quiz và lặp lại ngắt quãng',
  },
} as const;

type Language = 'en' | 'vi';

type View = 'list' | 'add' | 'flashcards' | 'quiz' | 'stats' | 'privacy' | 'terms' | 'settings';

// Premium Upgrade Dialog Component
function UpgradeDialog({ 
  isOpen, 
  onClose, 
  onUpgrade, 
  isReady,
  lang,
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onUpgrade: () => void; 
  isReady: boolean;
  lang: typeof TRANSLATIONS['en'];
}) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      data-testid="dialog-upgrade-overlay"
    >
      <div 
        className="bg-card border border-card-border rounded-2xl max-w-md w-full overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        data-testid="dialog-upgrade"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-3">
            <Icons.Crown />
          </div>
          <h2 className="text-2xl font-bold text-white">{lang.dialogTitle}</h2>
          <p className="text-white/80 mt-1">{lang.dialogSubtitle}</p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="inline-block bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-semibold px-3 py-1 rounded-full mb-3">{lang.trialBadge}</div>
            <div className="text-4xl font-bold text-foreground">130,000 ₫</div>
            <div className="text-muted-foreground text-sm">{lang.perMonthAfterTrial}</div>
            <div className="text-muted-foreground/70 text-xs">($4.95 USD/month)</div>
          </div>

          <ul className="space-y-3 mb-6">
            {[
              'Flashcards with spaced repetition',
              'Quizzes to test your knowledge',
              'Daily streak tracking',
              'Word mastery levels',
              'Cross-device sync via cloud',
              'Statistics dashboard',
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-foreground">
                <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Icons.Check />
                </div>
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={onUpgrade}
            disabled={!isReady}
            data-testid="button-upgrade-confirm"
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-xl font-semibold text-lg hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isReady ? lang.startTrial : 'Loading...'}
          </button>

          <button
            onClick={onClose}
            data-testid="button-upgrade-cancel"
            className="w-full mt-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {lang.maybeLater}
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [firebaseApp, setFirebaseApp] = useState<FirebaseApp | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);
  const [db, setDb] = useState<Firestore | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>('list');
  const [words, setWords] = useState<Word[]>([]);
  const [metadata, setMetadata] = useState<UserMetadata>({ 
    streak: 0, 
    lastVisit: null,
    totalReviews: 0,
    totalCorrect: 0,
    wordsLearned: 0,
    wordsMastered: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [editingWord, setEditingWord] = useState<Word | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'reset'>('login');
  const [authError, setAuthError] = useState<string>('');
  const [authSuccess, setAuthSuccess] = useState<string>('');
  
  // Subscription state for premium features
  const [subscription, setSubscription] = useState<Subscription>({
    isPremium: false,
    subscriptionId: null,
    customerId: null,
    status: 'none',
    priceId: null,
    currentPeriodEnd: null,
    cancelAtPeriodEnd: false,
    updatedAt: null,
    trialStartDate: null,
    trialEndDate: null,
    adminGrantedFreeUntil: null,
  });
  const [paddleConfig, setPaddleConfig] = useState<PaddleConfig | null>(null);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [paddleInitialized, setPaddleInitialized] = useState(false);
  const [subscriptionChecked, setSubscriptionChecked] = useState(false);
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('language') as Language) || 'en';
  });
  const lang = TRANSLATIONS[language];

  const toggleLanguage = () => {
    const next: Language = language === 'en' ? 'vi' : 'en';
    setLanguage(next);
    localStorage.setItem('language', next);
  };

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Hide splash screen when done loading
  useEffect(() => {
    if (!loading) {
      const splash = document.getElementById('splash');
      if (splash) {
        splash.style.opacity = '0';
        splash.style.transition = 'opacity 0.3s ease-out';
        setTimeout(() => {
          splash.remove();
        }, 300);
      }
    }
  }, [loading]);

  // Initialize Firebase
  useEffect(() => {
    const initFirebase = async () => {
      try {
        // Fetch Firebase config from server
        let config;
        let appId;
        
        try {
          const response = await fetch('/api/firebase-config');
          const data = await response.json();
          config = data.config;
          appId = data.appId;
        } catch (fetchError) {
          console.warn('Could not fetch Firebase config from server, using fallback');
          // Fallback to window config or demo config
          config = window.__firebase_config || {
            apiKey: "demo-api-key",
            authDomain: "demo-project.firebaseapp.com",
            projectId: "demo-project",
            storageBucket: "demo-project.appspot.com",
            messagingSenderId: "000000000000",
            appId: "1:000000000000:web:0000000000000000000000"
          };
          appId = window.__app_id || 'demo-app';
        }
        
        // Store appId globally for later use
        window.__app_id = appId;

        const app = initializeApp(config);
        const authInstance = getAuth(app);
        const dbInstance = getFirestore(app);

        setFirebaseApp(app);
        setAuth(authInstance);
        setDb(dbInstance);

        // Listen to auth state changes
        const unsubscribe = onAuthStateChanged(authInstance, (user) => {
          setUser(user);
          setLoading(false);
        });

        return unsubscribe;
      } catch (error) {
        console.error('Firebase initialization error:', error);
        console.warn('App will run in demo mode without Firebase persistence');
        // Set loading to false to allow app to render
        setLoading(false);
      }
    };

    initFirebase();
  }, []);

  // Initialize Paddle for payments
  useEffect(() => {
    const initPaddle = async () => {
      try {
        const response = await fetch('/api/paddle-config');
        const config = await response.json();
        
        if (config.clientToken) {
          setPaddleConfig(config);
          
          // Initialize Paddle.js when it's loaded
          const checkPaddle = setInterval(() => {
            if (window.Paddle) {
              window.Paddle.Initialize({
                token: config.clientToken,
                environment: config.environment || 'sandbox',
              });
              setPaddleInitialized(true);
              clearInterval(checkPaddle);
            }
          }, 100);

          // Clear interval after 10 seconds if Paddle doesn't load
          setTimeout(() => clearInterval(checkPaddle), 10000);
        }
      } catch (error) {
        console.warn('Could not fetch Paddle config:', error);
      }
    };

    initPaddle();
  }, []);

  // Load subscription status from Firestore + trial initialization
  useEffect(() => {
    setSubscriptionChecked(false);
    if (!db || !user) return;

    const appId = window.__app_id;
    const subscriptionRef = doc(db, `artifacts/${appId}/users/${user.uid}/metadata/subscription`);

    const initTrial = async () => {
      // First-time user: create a 7-day trial
      try {
        const now = Date.now();
        const trialStartDate = now;
        const trialEndDate = now + 7 * 24 * 60 * 60 * 1000;
        await setDoc(subscriptionRef, {
          isPremium: false,
          status: 'trialing',
          trialStartDate,
          trialEndDate,
          updatedAt: now,
          subscriptionId: null,
          customerId: null,
          priceId: null,
          currentPeriodEnd: null,
          cancelAtPeriodEnd: false,
          adminGrantedFreeUntil: null,
        });
        // Register with backend
        try {
          await fetch('/api/admin/register-subscriber', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              status: 'trialing',
              trialStartDate,
              trialEndDate,
              isPremium: false,
            }),
          });
        } catch (e) {
          console.warn('Failed to register trial with backend:', e);
        }
      } catch (err) {
        console.warn('Failed to initialize trial:', err);
      }
    };

    const unsubscribe = onSnapshot(
      subscriptionRef,
      async (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          // Fetch admin overrides from server
          let adminOverride: { trialEndDate?: number | null; adminGrantedFreeUntil?: number | null } = {};
          try {
            const overrideRes = await fetch(`/api/subscription/override/${user.uid}`);
            const overrideData = await overrideRes.json();
            if (overrideData.override) adminOverride = overrideData.override;
          } catch (e) {
            // ignore - server may not have this user yet
          }
          setSubscription({
            isPremium: data.isPremium || false,
            subscriptionId: data.subscriptionId || null,
            customerId: data.customerId || null,
            status: data.status || 'none',
            priceId: data.priceId || null,
            currentPeriodEnd: data.currentPeriodEnd || null,
            cancelAtPeriodEnd: data.cancelAtPeriodEnd || false,
            updatedAt: data.updatedAt || null,
            trialStartDate: data.trialStartDate || null,
            trialEndDate: adminOverride.trialEndDate ?? data.trialEndDate ?? null,
            adminGrantedFreeUntil: adminOverride.adminGrantedFreeUntil ?? data.adminGrantedFreeUntil ?? null,
          });
          // Register with backend so admin panel can see this user
          try {
            await fetch('/api/admin/register-subscriber', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                status: data.status || 'none',
                trialStartDate: data.trialStartDate || null,
                trialEndDate: adminOverride.trialEndDate ?? data.trialEndDate ?? null,
                isPremium: data.isPremium || false,
                subscriptionId: data.subscriptionId || null,
                customerId: data.customerId || null,
                currentPeriodEnd: data.currentPeriodEnd || null,
              }),
            });
          } catch (e) { /* non-critical */ }
        } else {
          // No subscription doc → first-time user, start trial
          await initTrial();
        }
        setSubscriptionChecked(true);
      },
      (error) => {
        console.warn('Error loading subscription:', error);
        setSubscriptionChecked(true);
      }
    );

    return unsubscribe;
  }, [db, user]);

  // Handle Paddle checkout
  const handleUpgrade = () => {
    if (!paddleInitialized || !paddleConfig?.priceId || !user) {
      console.error('Paddle not ready or missing config');
      return;
    }

    window.Paddle?.Checkout.open({
      items: [{ priceId: paddleConfig.priceId, quantity: 1 }],
      customer: { email: user.email || '' },
      customData: { userId: user.uid },
      successCallback: async () => {
        // Update subscription in Firestore after successful checkout
        if (db && user) {
          const appId = window.__app_id;
          const subscriptionRef = doc(db, `artifacts/${appId}/users/${user.uid}/metadata/subscription`);
          await setDoc(subscriptionRef, {
            isPremium: true,
            status: 'active',
            updatedAt: Date.now(),
          }, { merge: true });
        }
        setShowUpgradeDialog(false);
      },
      closeCallback: () => {
        setShowUpgradeDialog(false);
      },
    });
  };

  // Handle manage subscription (opens Paddle customer portal)
  const handleManageSubscription = async () => {
    if (!subscription.customerId) return;

    try {
      const response = await fetch('/api/subscription/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: subscription.customerId,
          subscriptionId: subscription.subscriptionId,
        }),
      });

      const data = await response.json();
      if (data.portalUrl) {
        window.open(data.portalUrl, '_blank');
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
    }
  };

  // Load user data and update streak
  useEffect(() => {
    if (!db || !user) return;

    const appId = window.__app_id;
    const userPath = `artifacts/${appId}/users/${user.uid}`;

    // Listen to words collection
    const wordsRef = collection(db, `${userPath}/words`);
    const unsubscribeWords = onSnapshot(
      wordsRef, 
      (snapshot) => {
        const wordsData: Word[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          // Ensure backward compatibility with existing words
          wordsData.push({ 
            id: doc.id, 
            ...data,
            reviewCount: data.reviewCount ?? 0,
            correctCount: data.correctCount ?? 0,
            masteryLevel: data.masteryLevel ?? 'learning',
            nextReviewDate: data.nextReviewDate ?? Date.now(),
            lastReviewedAt: data.lastReviewedAt ?? null,
            easeFactor: data.easeFactor ?? 2.5,
            interval: data.interval ?? 1,
          } as Word);
        });
        setWords(wordsData.sort((a, b) => b.createdAt - a.createdAt));
        setLoading(false);
      },
      (error) => {
        console.warn('Firebase permission error - Security Rules not configured yet:', error);
        console.info('Please configure Firebase Security Rules to enable data persistence.');
        console.info('See FIREBASE_SECURITY_RULES.md for instructions.');
        // Still set loading to false so the app can render
        setLoading(false);
      }
    );

    // Load and update metadata (streak)
    const loadMetadata = async () => {
      try {
        const metadataRef = doc(db, `${userPath}/metadata/profile`);
        const metadataSnap = await getDoc(metadataRef);

        const today = new Date().toDateString();
        let currentMetadata: UserMetadata = { 
          streak: 0, 
          lastVisit: null,
          totalReviews: 0,
          totalCorrect: 0,
          wordsLearned: 0,
          wordsMastered: 0,
        };

        if (metadataSnap.exists()) {
          const data = metadataSnap.data();
          currentMetadata = {
            streak: data.streak || 0,
            lastVisit: data.lastVisit || null,
            totalReviews: data.totalReviews || 0,
            totalCorrect: data.totalCorrect || 0,
            wordsLearned: data.wordsLearned || 0,
            wordsMastered: data.wordsMastered || 0,
          };
        }

        // Update streak logic
        if (currentMetadata.lastVisit) {
          const lastVisitDate = new Date(currentMetadata.lastVisit).toDateString();
          const yesterday = new Date(Date.now() - 86400000).toDateString();

          if (lastVisitDate === today) {
            // Same day, no change
          } else if (lastVisitDate === yesterday) {
            // Consecutive day, increment streak
            currentMetadata.streak += 1;
            currentMetadata.lastVisit = today;
            await setDoc(metadataRef, currentMetadata);
          } else {
            // Streak broken, reset
            currentMetadata.streak = 1;
            currentMetadata.lastVisit = today;
            await setDoc(metadataRef, currentMetadata);
          }
        } else {
          // First visit
          currentMetadata.streak = 1;
          currentMetadata.lastVisit = today;
          await setDoc(metadataRef, currentMetadata);
        }

        setMetadata(currentMetadata);
      } catch (error: any) {
        console.warn('Firebase permission error loading metadata:', error);
        // Set default metadata
        setMetadata({
          streak: 0,
          lastVisit: null,
          totalReviews: 0,
          totalCorrect: 0,
          wordsLearned: 0,
          wordsMastered: 0,
        });
      }
    };

    loadMetadata();

    return () => {
      unsubscribeWords();
    };
  }, [db, user]);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    words.forEach((word) => {
      word.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [words]);

  // Filter words based on search and tag
  const filteredWords = useMemo(() => {
    return words.filter((word) => {
      const matchesSearch =
        searchQuery === '' ||
        word.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
        word.definitions.some((def) => def.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag = selectedTag === '' || word.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [words, searchQuery, selectedTag]);

  // Add or update word
  const saveWord = async (wordData: InsertWord) => {
    if (!db || !user) return;

    const appId = window.__app_id;
    const userPath = `artifacts/${appId}/users/${user.uid}`;
    const wordsRef = collection(db, `${userPath}/words`);

    try {
      if (editingWord) {
        // Update existing word
        const wordRef = doc(db, `${userPath}/words/${editingWord.id}`);
        await updateDoc(wordRef, {
          ...wordData,
          updatedAt: Date.now(),
        });
      } else {
        // Add new word with spaced repetition defaults
        await addDoc(wordsRef, {
          ...wordData,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          reviewCount: 0,
          correctCount: 0,
          masteryLevel: 'learning',
          nextReviewDate: Date.now(), // Available for review immediately
          lastReviewedAt: null,
          easeFactor: 2.5,
          interval: 1,
        });
      }

      setEditingWord(null);
      setCurrentView('list');
    } catch (error) {
      console.error('Error saving word:', error);
    }
  };

  // SM-2 Algorithm for spaced repetition
  const updateWordProgress = async (wordId: string, quality: number) => {
    if (!db || !user) return;

    const appId = window.__app_id;
    const userPath = `artifacts/${appId}/users/${user.uid}`;
    const wordRef = doc(db, `${userPath}/words/${wordId}`);

    try {
      const wordSnap = await getDoc(wordRef);
      if (!wordSnap.exists()) return;

      const data = wordSnap.data();
      const word = { 
        id: wordSnap.id, 
        ...data,
        reviewCount: data.reviewCount ?? 0,
        correctCount: data.correctCount ?? 0,
        masteryLevel: data.masteryLevel ?? 'learning',
        easeFactor: data.easeFactor ?? 2.5,
        interval: data.interval ?? 1,
      } as Word;
      
      // SM-2 algorithm implementation
      let { easeFactor, interval, reviewCount, correctCount } = word;
      
      reviewCount += 1;
      if (quality >= 3) {
        correctCount += 1;
      }

      // Update ease factor
      easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

      // Calculate next interval
      if (quality < 3) {
        interval = 1; // Reset if answer was poor
      } else {
        if (reviewCount === 1) {
          interval = 1;
        } else if (reviewCount === 2) {
          interval = 6;
        } else {
          interval = Math.round(interval * easeFactor);
        }
      }

      // Determine mastery level
      let masteryLevel: 'learning' | 'reviewing' | 'mastered' = 'learning';
      const accuracy = correctCount / reviewCount;
      
      if (reviewCount >= 10 && accuracy >= 0.9 && interval >= 30) {
        masteryLevel = 'mastered';
      } else if (reviewCount >= 3 && accuracy >= 0.7) {
        masteryLevel = 'reviewing';
      }

      // Calculate next review date
      const nextReviewDate = Date.now() + (interval * 24 * 60 * 60 * 1000);

      await updateDoc(wordRef, {
        reviewCount,
        correctCount,
        easeFactor,
        interval,
        masteryLevel,
        nextReviewDate,
        lastReviewedAt: Date.now(),
      });

      // Update user metadata
      const metadataRef = doc(db, `${userPath}/metadata/profile`);
      const metadataSnap = await getDoc(metadataRef);
      
      if (metadataSnap.exists()) {
        const currentMeta = metadataSnap.data();
        await updateDoc(metadataRef, {
          totalReviews: (currentMeta.totalReviews || 0) + 1,
          totalCorrect: quality >= 3 ? (currentMeta.totalCorrect || 0) + 1 : currentMeta.totalCorrect,
          wordsLearned: masteryLevel !== 'learning' ? Math.max(currentMeta.wordsLearned || 0, words.filter(w => w.masteryLevel !== 'learning').length) : currentMeta.wordsLearned,
          wordsMastered: masteryLevel === 'mastered' ? Math.max(currentMeta.wordsMastered || 0, words.filter(w => w.masteryLevel === 'mastered').length) : currentMeta.wordsMastered,
        });
      }
    } catch (error) {
      console.error('Error updating word progress:', error);
    }
  };

  // Delete word
  const deleteWord = async (wordId: string) => {
    if (!db || !user) return;

    const appId = window.__app_id;
    const userPath = `artifacts/${appId}/users/${user.uid}`;

    try {
      const wordRef = doc(db, `${userPath}/words/${wordId}`);
      await deleteDoc(wordRef);
    } catch (error) {
      console.error('Error deleting word:', error);
    }
  };

  // Text-to-speech
  const speakWord = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Small delay needed after cancel() to avoid Chrome bug where speech silently fails
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
      }, 100);
    }
  };

  if (loading) {
    return null; // Splash screen is shown from HTML
  }

  // Authentication handlers
  const handleSignup = async (email: string, password: string, displayName: string) => {
    if (!auth) return;
    
    setAuthError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      
      // Store user profile in Firestore (merge to preserve existing streak/stats)
      if (db) {
        const appId = window.__app_id;
        const userPath = `artifacts/${appId}/users/${userCredential.user.uid}`;
        await setDoc(doc(db, `${userPath}/metadata/profile`), {
          displayName,
          email,
          createdAt: Date.now(),
        }, { merge: true });
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      setAuthError(error.message || 'Failed to create account');
    }
  };

  const handleLogin = async (email: string, password: string) => {
    if (!auth) return;
    
    setAuthError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error('Login error:', error);
      setAuthError(error.message || 'Failed to log in');
    }
  };

  const handleLogout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handlePasswordReset = async (email: string) => {
    if (!auth) return;
    
    setAuthError('');
    setAuthSuccess('');
    try {
      await sendPasswordResetEmail(auth, email);
      setAuthSuccess('Password reset email sent! Check your inbox.');
    } catch (error: any) {
      console.error('Password reset error:', error);
      setAuthError(error.message || 'Failed to send password reset email');
    }
  };

  // Show login/signup screen if not authenticated
  if (!user) {
    // Show legal pages on auth screen
    if (authMode === 'privacy' as any || authMode === 'terms' as any) {
      const legalType = authMode as unknown as 'privacy' | 'terms';
      const content = legalType === 'privacy' ? privacyPolicyContent : termsOfServiceContent;
      const title = legalType === 'privacy' ? 'Privacy Policy' : 'Terms of Service';
      
      return (
        <div className="h-screen flex flex-col bg-background">
          {/* Header */}
          <header className="flex-shrink-0 bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setAuthMode('login')}
                  className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                  data-testid="button-legal-back-auth"
                >
                  <Icons.ChevronLeft />
                </button>
                <h1 className="text-xl font-bold text-white">{title}</h1>
              </div>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                data-testid="button-dark-mode-auth"
                className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Icons.Sun /> : <Icons.Moon />}
              </button>
            </div>
          </header>

          {/* Legal Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="max-w-2xl mx-auto bg-card border border-card-border rounded-lg p-6">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {content.split('\n').map((line, index) => {
                  if (line.startsWith('# ')) {
                    return <h1 key={index} className="text-2xl font-bold text-foreground mb-4">{line.slice(2)}</h1>;
                  }
                  if (line.startsWith('## ')) {
                    return <h2 key={index} className="text-xl font-semibold text-foreground mt-6 mb-3">{line.slice(3)}</h2>;
                  }
                  if (line.startsWith('### ')) {
                    return <h3 key={index} className="text-lg font-medium text-foreground mt-4 mb-2">{line.slice(4)}</h3>;
                  }
                  if (line.includes('**')) {
                    const parts = line.split('**');
                    return (
                      <p key={index} className="text-muted-foreground mb-2">
                        {parts.map((part, i) => 
                          i % 2 === 1 ? <strong key={i} className="text-foreground">{part}</strong> : part
                        )}
                      </p>
                    );
                  }
                  if (line.startsWith('- ')) {
                    return (
                      <li key={index} className="text-muted-foreground ml-4 mb-1">
                        {line.slice(2)}
                      </li>
                    );
                  }
                  if (line.includes('[') && line.includes('](')) {
                    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
                    const parts: (string | JSX.Element)[] = [];
                    let lastIndex = 0;
                    let match;
                    while ((match = linkRegex.exec(line)) !== null) {
                      if (match.index > lastIndex) {
                        parts.push(line.slice(lastIndex, match.index));
                      }
                      parts.push(
                        <a 
                          key={match.index}
                          href={match[2]} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-primary hover:underline"
                        >
                          {match[1]}
                        </a>
                      );
                      lastIndex = match.index + match[0].length;
                    }
                    if (lastIndex < line.length) {
                      parts.push(line.slice(lastIndex));
                    }
                    return <p key={index} className="text-muted-foreground mb-2">{parts}</p>;
                  }
                  if (line.trim() === '') {
                    return <div key={index} className="h-2" />;
                  }
                  return <p key={index} className="text-muted-foreground mb-2">{line}</p>;
                })}
              </div>
            </div>

            {/* Contact and Back Button */}
            <div className="max-w-2xl mx-auto mt-6 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Questions? Contact us at{' '}
                <a href="mailto:ace.apps.44@gmail.com" className="text-primary hover:underline">
                  ace.apps.44@gmail.com
                </a>
              </p>
              <button
                onClick={() => setAuthMode('login')}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover-elevate"
                data-testid="button-back-to-login"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="h-screen flex flex-col bg-background">
        {/* Header */}
        <header className="flex-shrink-0 bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-4 shadow-lg">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">
              Vocabulary Builder
            </h1>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleLanguage}
                data-testid="button-toggle-language-auth"
                className="px-2.5 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors text-xs font-bold tracking-wide"
                aria-label="Toggle language"
                title={language === 'en' ? 'Switch to Vietnamese' : 'Switch to English'}
              >
                {language === 'en' ? 'VI' : 'EN'}
              </button>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                data-testid="button-dark-mode-auth"
                className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Icons.Sun /> : <Icons.Moon />}
              </button>
            </div>
          </div>
        </header>

        {/* Auth Form */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="bg-card border border-card-border rounded-lg p-6 shadow-xl">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">📚</div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {authMode === 'login' ? 'Welcome Back' : authMode === 'signup' ? 'Create Account' : 'Reset Password'}
                </h2>
                <p className="text-muted-foreground">
                  {authMode === 'login' 
                    ? 'Log in to access your vocabulary' 
                    : authMode === 'signup'
                    ? 'Start building your vocabulary today'
                    : 'Enter your email to receive a password reset link'}
                </p>
              </div>

              {authError && (
                <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm" data-testid="auth-error">
                  {authError}
                </div>
              )}

              {authSuccess && (
                <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600 dark:text-green-400 text-sm" data-testid="auth-success">
                  {authSuccess}
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const email = formData.get('email') as string;
                  const password = formData.get('password') as string;
                  const displayName = formData.get('displayName') as string;

                  if (authMode === 'reset') {
                    handlePasswordReset(email);
                  } else if (authMode === 'signup') {
                    handleSignup(email, password, displayName);
                  } else {
                    handleLogin(email, password);
                  }
                }}
                className="space-y-4"
              >
                {authMode === 'signup' && (
                  <div>
                    <label htmlFor="displayName" className="block text-sm font-medium text-foreground mb-1">
                      Display Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                        <Icons.User />
                      </div>
                      <input
                        type="text"
                        id="displayName"
                        name="displayName"
                        required
                        data-testid="input-display-name"
                        className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                        placeholder="Your name"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                      <Icons.Mail />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      data-testid="input-email"
                      className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {authMode !== 'reset' && (
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                        <Icons.Lock />
                      </div>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        minLength={6}
                        data-testid="input-password"
                        className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                        placeholder="••••••••"
                      />
                    </div>
                    {authMode === 'signup' && (
                      <p className="mt-1 text-xs text-muted-foreground">Must be at least 6 characters</p>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  data-testid="button-auth-submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg"
                >
                  {authMode === 'login' ? 'Log In' : authMode === 'signup' ? 'Create Account' : 'Send Reset Email'}
                </button>
              </form>

              {authMode === 'login' && (
                <div className="mt-3 text-center">
                  <button
                    onClick={() => {
                      setAuthMode('reset');
                      setAuthError('');
                      setAuthSuccess('');
                    }}
                    data-testid="button-forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <div className="mt-4 text-center">
                <button
                  onClick={() => {
                    if (authMode === 'reset') {
                      setAuthMode('login');
                    } else {
                      setAuthMode(authMode === 'login' ? 'signup' : 'login');
                    }
                    setAuthError('');
                    setAuthSuccess('');
                  }}
                  data-testid="button-auth-toggle"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {authMode === 'reset' ? (
                    <>
                      Remember your password? <span className="text-primary font-medium">Log in</span>
                    </>
                  ) : authMode === 'login' ? (
                    <>
                      Don't have an account? <span className="text-primary font-medium">Sign up</span>
                    </>
                  ) : (
                    <>
                      Already have an account? <span className="text-primary font-medium">Log in</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Your account will sync across all your devices
            </p>

            {/* Legal Links Footer */}
            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setAuthMode('privacy' as any)}
                    className="hover:text-foreground transition-colors"
                    data-testid="link-privacy-policy-auth"
                  >
                    Privacy Policy
                  </button>
                  <span className="text-muted">|</span>
                  <button
                    onClick={() => setAuthMode('terms' as any)}
                    className="hover:text-foreground transition-colors"
                    data-testid="link-terms-of-service-auth"
                  >
                    Terms of Service
                  </button>
                </div>
                <p className="text-xs text-muted-foreground/70">
                  © {new Date().getFullYear()} ACE-Apps. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Compute trial/admin access
  const now = Date.now();
  const isOnTrial = !subscription.isPremium && 
    subscription.status === 'trialing' && 
    subscription.trialEndDate !== null && 
    subscription.trialEndDate > now;
  const hasAdminGrant = !subscription.isPremium && 
    subscription.adminGrantedFreeUntil !== null && 
    subscription.adminGrantedFreeUntil > now;
  const hasFullAccess = subscription.isPremium || isOnTrial || hasAdminGrant;
  const trialDaysLeft = isOnTrial && subscription.trialEndDate 
    ? Math.ceil((subscription.trialEndDate - now) / (24 * 60 * 60 * 1000)) 
    : 0;

  // Show paywall for logged-in users who have not purchased access
  if (!subscriptionChecked) {
    return (
      <div className="h-screen flex flex-col bg-background">
        <header className="flex-shrink-0 bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-4 shadow-lg">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Vocabulary Builder</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleLanguage}
                data-testid="button-toggle-language-loading"
                className="px-2.5 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors text-xs font-bold tracking-wide"
                aria-label="Toggle language"
              >
                {language === 'en' ? 'VI' : 'EN'}
              </button>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Icons.Sun /> : <Icons.Moon />}
              </button>
            </div>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-muted-foreground text-sm">Checking access...</div>
        </div>
      </div>
    );
  }

  if (!hasFullAccess) {
    return (
      <div className="h-screen flex flex-col bg-background overflow-y-auto">
        <header className="flex-shrink-0 bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-4 shadow-lg">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Vocabulary Builder</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleLanguage}
                data-testid="button-toggle-language-paywall"
                className="px-2.5 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors text-xs font-bold tracking-wide"
                aria-label="Toggle language"
                title={language === 'en' ? 'Switch to Vietnamese' : 'Switch to English'}
              >
                {language === 'en' ? 'VI' : 'EN'}
              </button>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Icons.Sun /> : <Icons.Moon />}
              </button>
              <button
                onClick={handleLogout}
                data-testid="button-logout-paywall"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                aria-label="Logout"
              >
                <Icons.Logout />
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-6 text-center text-white mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-3">
                <Icons.Crown />
              </div>
              <h2 className="text-2xl font-bold mb-1">Get Full Access</h2>
              <p className="text-white/80 text-sm">{lang.paywallSubtitle}</p>
            </div>

            <div className="bg-card border border-card-border rounded-2xl p-6 shadow-xl">
              <div className="text-center mb-6">
                <div className="inline-block bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-semibold px-3 py-1 rounded-full mb-3">{lang.trialBadge}</div>
                <div className="text-5xl font-bold text-foreground">130,000 ₫</div>
                <div className="text-muted-foreground mt-1 text-sm">{lang.perMonthAfterTrial}</div>
                <div className="text-muted-foreground/70 text-xs">($4.95 USD/month)</div>
              </div>

              <ul className="space-y-3 mb-6">
                {[
                  'Flashcards with spaced repetition',
                  'Quizzes to test your knowledge',
                  'Daily streak tracking',
                  'Word mastery levels',
                  'Cross-device sync via cloud',
                  'Statistics dashboard',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-foreground">
                    <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <Icons.Check />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={handleUpgrade}
                disabled={!paddleInitialized}
                data-testid="button-get-access"
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-xl font-semibold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {paddleInitialized ? lang.startTrial : 'Loading...'}
              </button>

              <p className="text-xs text-muted-foreground text-center mt-3">
                {lang.trialDisclaimer}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <button onClick={() => setCurrentView('privacy')} className="hover:text-foreground transition-colors" data-testid="link-privacy-paywall">Privacy Policy</button>
                  <span>|</span>
                  <button onClick={() => setCurrentView('terms')} className="hover:text-foreground transition-colors" data-testid="link-terms-paywall">Terms of Service</button>
                </div>
                <p className="text-xs text-muted-foreground/70">© {new Date().getFullYear()} ACE-Apps. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal pages accessible from paywall */}
        {(currentView === 'privacy' || currentView === 'terms') && (
          <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
            <div className="flex flex-col h-full">
              <header className="flex-shrink-0 bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCurrentView('list')}
                    className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                    data-testid="button-legal-back-paywall"
                  >
                    <Icons.ChevronLeft />
                  </button>
                  <h1 className="text-xl font-bold text-white">
                    {currentView === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
                  </h1>
                </div>
              </header>
              <div className="flex-1 overflow-y-auto p-4">
                <LegalView type={currentView as 'privacy' | 'terms'} onBack={() => setCurrentView('list')} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Mobile Header */}
      <header className="flex-shrink-0 bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white" data-testid="text-title">
            📚 Vocabulary Builder
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={handleManageSubscription}
              data-testid="button-premium-badge"
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-md"
              title="Manage subscription"
            >
              <Icons.Crown />
              <span className="text-xs font-semibold hidden sm:inline">Premium</span>
            </button>
            <button
              onClick={() => setShowHelpDialog(true)}
              data-testid="button-help"
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
              aria-label="Help"
            >
              <Icons.HelpCircle />
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white">
              <Icons.Fire />
              <span className="font-semibold" data-testid="text-streak">{metadata.streak}</span>
            </div>
            <button
              onClick={toggleLanguage}
              data-testid="button-toggle-language"
              className="px-2.5 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors text-xs font-bold tracking-wide"
              aria-label="Toggle language"
              title={language === 'en' ? 'Switch to Vietnamese' : 'Switch to English'}
            >
              {language === 'en' ? 'VI' : 'EN'}
            </button>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              data-testid="button-dark-mode"
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Icons.Sun /> : <Icons.Moon />}
            </button>
            <button
              onClick={handleLogout}
              data-testid="button-logout"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
              aria-label="Logout"
              title={`Logged in as ${user?.displayName || user?.email || 'User'}`}
            >
              <Icons.User />
              <span className="text-sm font-medium hidden sm:inline">{user?.displayName || 'User'}</span>
              <Icons.Logout />
            </button>
          </div>
        </div>
      </header>

      {/* Trial / Admin Grant Banner */}
      {(isOnTrial || hasAdminGrant) && !subscription.isPremium && (
        <div className="flex-shrink-0 bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex items-center justify-between gap-3">
          <span className="text-sm text-amber-700 dark:text-amber-400">
            {isOnTrial
              ? lang.trialBannerActive(trialDaysLeft)
              : lang.trialBannerAdmin}
          </span>
          <button
            onClick={handleUpgrade}
            disabled={!paddleInitialized}
            className="text-xs font-semibold text-amber-700 dark:text-amber-400 underline underline-offset-2 disabled:opacity-50 whitespace-nowrap"
            data-testid="button-upgrade-banner"
          >
            {lang.subscribeNow}
          </button>
        </div>
      )}

      {/* Premium Upgrade Dialog */}
      <UpgradeDialog
        isOpen={showUpgradeDialog}
        onClose={() => setShowUpgradeDialog(false)}
        onUpgrade={handleUpgrade}
        isReady={paddleInitialized}
        lang={lang}
      />

      {/* Help Dialog */}
      {showHelpDialog && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowHelpDialog(false)}
          data-testid="dialog-help-overlay"
        >
          <div 
            className="bg-card border border-card-border rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-xl"
            onClick={(e) => e.stopPropagation()}
            data-testid="dialog-help"
          >
            <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">App Guide</h2>
              <button
                onClick={() => setShowHelpDialog(false)}
                data-testid="button-close-help"
                className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                aria-label="Close help"
              >
                <Icons.X />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Header Icons */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Icons.Book />
                  Header Icons
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3 p-3 bg-secondary/20 rounded-lg">
                    <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm flex-shrink-0">
                      <Icons.HelpCircle />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Help Button</div>
                      <div className="text-muted-foreground">Opens this guide to explain all features</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-secondary/20 rounded-lg">
                    <div className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm flex-shrink-0 flex items-center gap-2">
                      <Icons.Fire />
                      <span className="font-semibold">{metadata.streak}</span>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Daily Streak Counter</div>
                      <div className="text-muted-foreground">Shows how many consecutive days you've practiced. Visit daily to keep your streak alive!</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-secondary/20 rounded-lg">
                    <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm flex-shrink-0">
                      {isDarkMode ? <Icons.Sun /> : <Icons.Moon />}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Dark Mode Toggle</div>
                      <div className="text-muted-foreground">Switch between light and dark theme for comfortable reading</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Icons.List />
                  Navigation Buttons
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3 p-3 bg-secondary/20 rounded-lg">
                    <div className="p-2 bg-white/20 rounded-lg flex-shrink-0">
                      <Icons.List />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Word List</div>
                      <div className="text-muted-foreground">Browse all your saved words with search and filtering options</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-secondary/20 rounded-lg">
                    <div className="p-2 bg-white/20 rounded-lg flex-shrink-0">
                      <Icons.Plus />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Add New Word</div>
                      <div className="text-muted-foreground">Add vocabulary words with definitions, tags, and example sentences</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-secondary/20 rounded-lg">
                    <div className="p-2 bg-white/20 rounded-lg flex-shrink-0">
                      <Icons.Cards />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Flashcards</div>
                      <div className="text-muted-foreground">Review words with interactive flashcards. Click to flip and rate your memory (uses spaced repetition)</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-secondary/20 rounded-lg">
                    <div className="p-2 bg-white/20 rounded-lg flex-shrink-0">
                      <Icons.Quiz />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Quiz</div>
                      <div className="text-muted-foreground">Test yourself with multiple-choice questions to reinforce learning</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-secondary/20 rounded-lg">
                    <div className="p-2 bg-white/20 rounded-lg flex-shrink-0">
                      <Icons.Chart />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Statistics</div>
                      <div className="text-muted-foreground">Track your progress with detailed stats and mastery levels</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Word Actions */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Icons.Cards />
                  Word Actions
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3 p-3 bg-secondary/20 rounded-lg">
                    <div className="p-2 bg-white/20 rounded-lg flex-shrink-0">
                      <Icons.Speaker />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Audio/Speaker Button</div>
                      <div className="text-muted-foreground">Click to hear the word pronounced using text-to-speech</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-secondary/20 rounded-lg">
                    <div className="p-2 bg-white/20 rounded-lg flex-shrink-0">
                      <Icons.Edit />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Edit Button</div>
                      <div className="text-muted-foreground">Modify word details, definitions, tags, or example sentences</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-secondary/20 rounded-lg">
                    <div className="p-2 bg-white/20 rounded-lg flex-shrink-0">
                      <Icons.Trash />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Delete Button</div>
                      <div className="text-muted-foreground">Remove a word from your vocabulary list</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-secondary/20 rounded-lg">
                    <div className="p-2 bg-white/20 rounded-lg flex-shrink-0">
                      <Icons.Search />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Search Bar</div>
                      <div className="text-muted-foreground">Find words quickly by typing in the search box on the Word List page</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Learning Features */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Learning Features</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-start gap-2">
                    <Icons.Check />
                    <span><strong className="text-foreground">Spaced Repetition:</strong> Words are scheduled for review based on how well you remember them</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <Icons.Check />
                    <span><strong className="text-foreground">Mastery Levels:</strong> Track progress from "Learning" → "Reviewing" → "Mastered"</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <Icons.Check />
                    <span><strong className="text-foreground">Cross-Device Sync:</strong> Your words automatically sync across all your devices via Firebase</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
        {/* Sticky Navigation Container */}
        <div className="sticky top-0 z-50 bg-gradient-to-r from-orange-500 to-orange-600 px-4 pt-2 pb-4 shadow-lg">
          <nav className="flex items-stretch gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} data-testid="nav-horizontal">
            <button
              onClick={() => setCurrentView('list')}
              data-testid="button-view-list"
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-medium transition-all transform whitespace-nowrap ${
                currentView === 'list'
                  ? 'bg-white text-orange-600 shadow-xl scale-105'
                  : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
              }`}
              style={{
                transform: currentView === 'list' ? 'translateZ(20px)' : 'translateZ(0)',
              }}
            >
              <Icons.List />
              <span>Word List</span>
            </button>
            <button
              onClick={() => {
                setEditingWord(null);
                setCurrentView('add');
              }}
              data-testid="button-view-add"
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-medium transition-all transform whitespace-nowrap ${
                currentView === 'add'
                  ? 'bg-white text-orange-600 shadow-xl scale-105'
                  : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
              }`}
              style={{
                transform: currentView === 'add' ? 'translateZ(20px)' : 'translateZ(0)',
              }}
            >
              <Icons.Plus />
              <span>Add New Word</span>
            </button>
            <button
              onClick={() => setCurrentView('flashcards')}
              data-testid="button-view-flashcards"
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-medium transition-all transform whitespace-nowrap ${
                currentView === 'flashcards'
                  ? 'bg-white text-orange-600 shadow-xl scale-105'
                  : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
              }`}
              style={{
                transform: currentView === 'flashcards' ? 'translateZ(20px)' : 'translateZ(0)',
              }}
            >
              <Icons.Cards />
              <span>Flashcards</span>
            </button>
            <button
              onClick={() => setCurrentView('quiz')}
              data-testid="button-view-quiz"
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-medium transition-all transform whitespace-nowrap ${
                currentView === 'quiz'
                  ? 'bg-white text-orange-600 shadow-xl scale-105'
                  : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
              }`}
              style={{
                transform: currentView === 'quiz' ? 'translateZ(20px)' : 'translateZ(0)',
              }}
            >
              <Icons.Quiz />
              <span>Quiz</span>
            </button>
            <button
              onClick={() => setCurrentView('stats')}
              data-testid="button-view-stats"
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-medium transition-all transform whitespace-nowrap ${
                currentView === 'stats'
                  ? 'bg-white text-orange-600 shadow-xl scale-105'
                  : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
              }`}
              style={{
                transform: currentView === 'stats' ? 'translateZ(20px)' : 'translateZ(0)',
              }}
            >
              <Icons.Chart />
              <span>Statistics</span>
            </button>
            <button
              onClick={() => setCurrentView('settings')}
              data-testid="button-view-settings"
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-medium transition-all transform whitespace-nowrap ${
                currentView === 'settings'
                  ? 'bg-white text-orange-600 shadow-xl scale-105'
                  : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
              }`}
              style={{
                transform: currentView === 'settings' ? 'translateZ(20px)' : 'translateZ(0)',
              }}
            >
              <Icons.Settings />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="px-4 py-6">
          {currentView === 'list' && (
            <WordListView
              words={filteredWords}
              allWords={words}
              allTags={allTags}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
              onEdit={(word) => {
                setEditingWord(word);
                setCurrentView('add');
              }}
              onDelete={deleteWord}
              onSpeak={speakWord}
            />
          )}

          {currentView === 'add' && (
            <AddEditWordView
              editingWord={editingWord}
              onSave={saveWord}
              onCancel={() => {
                setEditingWord(null);
                setCurrentView('list');
              }}
            />
          )}

          {currentView === 'flashcards' && (
            <FlashcardsView words={filteredWords} onSpeak={speakWord} onReview={updateWordProgress} />
          )}

          {currentView === 'quiz' && <QuizView words={filteredWords} />}

          {currentView === 'stats' && <StatisticsView words={words} metadata={metadata} />}

          {currentView === 'privacy' && (
            <LegalView type="privacy" onBack={() => setCurrentView('list')} />
          )}

          {currentView === 'terms' && (
            <LegalView type="terms" onBack={() => setCurrentView('list')} />
          )}

          {currentView === 'settings' && (
            <SettingsView
              user={user}
              subscription={subscription}
              isOnTrial={isOnTrial}
              hasAdminGrant={hasAdminGrant}
              trialDaysLeft={trialDaysLeft}
              paddleInitialized={paddleInitialized}
              onUpgrade={handleUpgrade}
              onManageSubscription={handleManageSubscription}
              onViewPrivacy={() => setCurrentView('privacy')}
              onViewTerms={() => setCurrentView('terms')}
            />
          )}

          {/* Footer with Legal Links */}
          <footer className="mt-8 pt-6 border-t border-border">
            <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentView('privacy')}
                  className="hover:text-foreground transition-colors"
                  data-testid="link-privacy-policy"
                >
                  Privacy Policy
                </button>
                <span className="text-muted">|</span>
                <button
                  onClick={() => setCurrentView('terms')}
                  className="hover:text-foreground transition-colors"
                  data-testid="link-terms-of-service"
                >
                  Terms of Service
                </button>
              </div>
              <p className="text-xs text-muted-foreground/70">
                © {new Date().getFullYear()} ACE-Apps. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

// Settings View Component
function SettingsView({
  user,
  subscription,
  isOnTrial,
  hasAdminGrant,
  trialDaysLeft,
  paddleInitialized,
  onUpgrade,
  onManageSubscription,
  onViewPrivacy,
  onViewTerms,
}: {
  user: any;
  subscription: Subscription;
  isOnTrial: boolean;
  hasAdminGrant: boolean;
  trialDaysLeft: number;
  paddleInitialized: boolean;
  onUpgrade: () => void;
  onManageSubscription: () => void;
  onViewPrivacy: () => void;
  onViewTerms: () => void;
}) {
  const getStatusLabel = () => {
    if (subscription.isPremium) return { label: 'Premium', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-500/10' };
    if (isOnTrial) return { label: `Free Trial (${trialDaysLeft} days left)`, color: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-500/10' };
    if (hasAdminGrant) return { label: 'Complimentary Access', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10' };
    return { label: 'Free', color: 'text-muted-foreground', bg: 'bg-secondary/20' };
  };

  const status = getStatusLabel();
  const periodEndDate = subscription.currentPeriodEnd 
    ? new Date(subscription.currentPeriodEnd).toLocaleDateString('vi-VN')
    : null;
  const trialEndDate = subscription.trialEndDate 
    ? new Date(subscription.trialEndDate).toLocaleDateString('vi-VN')
    : null;

  return (
    <div className="space-y-6 max-w-lg mx-auto" data-testid="view-settings">
      <h2 className="text-xl font-bold text-foreground">Account & Settings</h2>

      {/* Profile Section */}
      <div className="bg-card border border-card-border rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Profile</h3>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
            {(user?.displayName || user?.email || 'U').charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            {user?.displayName && (
              <div className="font-semibold text-foreground truncate" data-testid="text-settings-name">{user.displayName}</div>
            )}
            <div className="text-sm text-muted-foreground truncate" data-testid="text-settings-email">{user?.email || 'Anonymous user'}</div>
            <div className="text-xs text-muted-foreground/70 mt-0.5">User ID: {user?.uid?.slice(0, 12)}...</div>
          </div>
        </div>
      </div>

      {/* Subscription Section */}
      <div className="bg-card border border-card-border rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Subscription</h3>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">Current Plan</span>
          <span className={`text-sm font-semibold px-3 py-1 rounded-full ${status.bg} ${status.color}`} data-testid="text-settings-plan">
            {status.label}
          </span>
        </div>

        {subscription.isPremium && periodEndDate && (
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">{subscription.cancelAtPeriodEnd ? 'Access until' : 'Next billing date'}</span>
            <span className="text-sm text-foreground" data-testid="text-settings-period">{periodEndDate}</span>
          </div>
        )}

        {isOnTrial && trialEndDate && (
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Trial ends</span>
            <span className="text-sm text-foreground" data-testid="text-settings-trial-end">{trialEndDate}</span>
          </div>
        )}

        {subscription.cancelAtPeriodEnd && (
          <div className="mb-4 text-sm text-amber-700 dark:text-amber-400 bg-amber-500/10 px-3 py-2 rounded-lg">
            Your subscription is set to cancel at the end of the current period.
          </div>
        )}

        <div className="space-y-2">
          {!subscription.isPremium && (
            <button
              onClick={onUpgrade}
              disabled={!paddleInitialized}
              data-testid="button-settings-upgrade"
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2.5 rounded-xl font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {paddleInitialized ? (isOnTrial ? 'Upgrade to Premium' : 'Start Free Trial') : 'Loading...'}
            </button>
          )}
          {subscription.isPremium && subscription.customerId && (
            <button
              onClick={onManageSubscription}
              data-testid="button-settings-manage-subscription"
              className="w-full border border-border text-foreground py-2.5 rounded-xl font-semibold text-sm hover:bg-secondary/20 transition-colors"
            >
              Manage Subscription
            </button>
          )}
        </div>
      </div>

      {/* Legal Section */}
      <div className="bg-card border border-card-border rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Legal</h3>
        <div className="space-y-2">
          <button
            onClick={onViewPrivacy}
            data-testid="button-settings-privacy"
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-secondary/20 transition-colors text-left"
          >
            <span className="text-sm text-foreground">Privacy Policy</span>
            <Icons.ExternalLink />
          </button>
          <button
            onClick={onViewTerms}
            data-testid="button-settings-terms"
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-secondary/20 transition-colors text-left"
          >
            <span className="text-sm text-foreground">Terms of Service &amp; Refund Policy</span>
            <Icons.ExternalLink />
          </button>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-card border border-card-border rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Support</h3>
        <div className="text-sm text-muted-foreground">
          <p>Questions or refund requests? Contact us at:</p>
          <a
            href="mailto:ace.apps.44@gmail.com"
            className="text-orange-600 dark:text-orange-400 font-medium hover:underline"
            data-testid="link-settings-email"
          >
            ace.apps.44@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}

// Word List View Component
function WordListView({
  words,
  allWords,
  allTags,
  searchQuery,
  setSearchQuery,
  selectedTag,
  setSelectedTag,
  onEdit,
  onDelete,
  onSpeak,
}: {
  words: Word[];
  allWords: Word[];
  allTags: string[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  onEdit: (word: Word) => void;
  onDelete: (wordId: string) => void;
  onSpeak: (text: string) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="space-y-3">
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icons.Search />
          </div>
          <input
            type="search"
            placeholder="Search words and definitions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="input-search"
            className="w-full pl-10 pr-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
          />
        </div>

        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag('')}
              data-testid="button-tag-all"
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedTag === ''
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover-elevate'
              }`}
            >
              All Tags
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                data-testid={`button-tag-${tag}`}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedTag === tag
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover-elevate'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Word Cards */}
      {words.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-block text-muted-foreground mb-4">
            <Icons.Book />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {allWords.length === 0
              ? 'Start Building Your Vocabulary'
              : 'No words match your filters'}
          </h3>
          <p className="text-muted-foreground mb-6">
            {allWords.length === 0
              ? 'Add your first word to begin your learning journey'
              : 'Try adjusting your search or tag filter'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {words.map((word) => (
            <div
              key={word.id}
              data-testid={`card-word-${word.id}`}
              className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 shadow-xl space-y-4"
            >
              {/* Word Header */}
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl font-bold text-white" data-testid={`text-word-${word.id}`}>{word.word}</h3>
                <button
                  onClick={() => onSpeak(word.word)}
                  data-testid={`button-audio-${word.id}`}
                  className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                  aria-label="Pronounce word"
                >
                  <Icons.Speaker />
                </button>
              </div>

              {/* Tags */}
              {word.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {word.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      data-testid={`tag-${word.id}-${idx}`}
                      className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Definitions */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wide">
                  Definitions
                </h4>
                <ol className="list-decimal list-inside space-y-1">
                  {word.definitions.map((def, idx) => (
                    <li key={idx} className="text-base leading-relaxed text-white" data-testid={`text-definition-${word.id}-${idx}`}>
                      {def}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Example Sentences */}
              {word.sentences.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wide">
                    Example Sentences
                  </h4>
                  <div className="space-y-1">
                    {word.sentences.map((sentence, idx) => (
                      <p key={idx} className="text-sm italic text-white/90 leading-relaxed" data-testid={`text-sentence-${word.id}-${idx}`}>
                        "{sentence}"
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-2 border-t border-white/20">
                <button
                  onClick={() => onEdit(word)}
                  data-testid={`button-edit-${word.id}`}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Icons.Edit />
                  Edit
                </button>
                <button
                  onClick={() => onDelete(word.id)}
                  data-testid={`button-delete-${word.id}`}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-500/30 rounded-lg hover:bg-red-500/50 transition-colors"
                >
                  <Icons.Trash />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Add/Edit Word Form Component
function AddEditWordView({
  editingWord,
  onSave,
  onCancel,
}: {
  editingWord: Word | null;
  onSave: (wordData: InsertWord) => void;
  onCancel: () => void;
}) {
  const [word, setWord] = useState(editingWord?.word || '');
  const [tags, setTags] = useState(editingWord?.tags.join(', ') || '');
  const [definitions, setDefinitions] = useState<string[]>(
    editingWord?.definitions.length ? editingWord.definitions : ['']
  );
  const [sentences, setSentences] = useState<string[]>(
    editingWord?.sentences.length ? editingWord.sentences : ['']
  );
  const [synonyms, setSynonyms] = useState<string[]>([]);
  const [antonyms, setAntonyms] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSynonyms = async () => {
    if (!word.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(`https://api.datamuse.com/words?rel_syn=${encodeURIComponent(word)}`);
      const data = await response.json();
      setSynonyms(data.slice(0, 10).map((item: any) => item.word));
    } catch (error) {
      console.error('Error fetching synonyms:', error);
    }
    setLoading(false);
  };

  const fetchAntonyms = async () => {
    if (!word.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(`https://api.datamuse.com/words?rel_ant=${encodeURIComponent(word)}`);
      const data = await response.json();
      setAntonyms(data.slice(0, 10).map((item: any) => item.word));
    } catch (error) {
      console.error('Error fetching antonyms:', error);
    }
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!word.trim() || definitions.filter((d) => d.trim()).length === 0) {
      alert('Please provide a word and at least one definition');
      return;
    }

    const wordData: InsertWord = {
      word: word.trim(),
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t),
      definitions: definitions.filter((d) => d.trim()),
      sentences: sentences.filter((s) => s.trim()),
    };

    onSave(wordData);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground">
          {editingWord ? 'Edit Word' : 'Add New Word'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Word Input */}
        <div className="space-y-2">
          <label htmlFor="word" className="block text-sm font-medium text-foreground">
            Word
          </label>
          <input
            id="word"
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            data-testid="input-word"
            placeholder="Enter the word"
            className="w-full px-4 py-3 text-lg bg-card border border-card-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            required
          />
        </div>

        {/* Tags Input */}
        <div className="space-y-2">
          <label htmlFor="tags" className="block text-sm font-medium text-foreground">
            Tags
          </label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            data-testid="input-tags"
            placeholder="e.g., work, science, academic"
            className="w-full px-4 py-3 bg-card border border-card-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <p className="text-xs text-muted-foreground">Separate tags with commas</p>
        </div>

        {/* Definitions */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-foreground">Definitions</label>
          {definitions.map((def, index) => (
            <div key={index} className="flex gap-2">
              <textarea
                value={def}
                onChange={(e) => {
                  const newDefs = [...definitions];
                  newDefs[index] = e.target.value;
                  setDefinitions(newDefs);
                }}
                data-testid={`input-definition-${index}`}
                placeholder={`Definition ${index + 1}`}
                rows={2}
                className="flex-1 px-4 py-3 bg-card border border-card-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
              {definitions.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    setDefinitions(definitions.filter((_, i) => i !== index));
                  }}
                  data-testid={`button-remove-definition-${index}`}
                  className="p-3 text-destructive hover-elevate active-elevate-2 rounded-md"
                  aria-label="Remove definition"
                >
                  <Icons.X />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => setDefinitions([...definitions, ''])}
            data-testid="button-add-definition"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover-elevate active-elevate-2 rounded-md"
          >
            <Icons.Plus />
            Add Definition
          </button>
        </div>

        {/* Example Sentences */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-foreground">
            Example Sentences (Optional, max 30)
          </label>
          {sentences.map((sentence, index) => (
            <div key={index} className="flex gap-2">
              <textarea
                value={sentence}
                onChange={(e) => {
                  const newSentences = [...sentences];
                  newSentences[index] = e.target.value;
                  setSentences(newSentences);
                }}
                data-testid={`input-sentence-${index}`}
                placeholder={`Example sentence ${index + 1}`}
                rows={2}
                className="flex-1 px-4 py-3 bg-card border border-card-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
              {sentences.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    setSentences(sentences.filter((_, i) => i !== index));
                  }}
                  data-testid={`button-remove-sentence-${index}`}
                  className="p-3 text-destructive hover-elevate active-elevate-2 rounded-md"
                  aria-label="Remove sentence"
                >
                  <Icons.X />
                </button>
              )}
            </div>
          ))}
          {sentences.length < 30 && (
            <button
              type="button"
              onClick={() => setSentences([...sentences, ''])}
              data-testid="button-add-sentence"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover-elevate active-elevate-2 rounded-md"
            >
              <Icons.Plus />
              Add Sentence
            </button>
          )}
        </div>

        {/* Datamuse API Section */}
        <div className="space-y-4 p-4 bg-muted rounded-lg">
          <h3 className="text-sm font-semibold text-foreground">Word Relations</h3>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={fetchSynonyms}
              data-testid="button-fetch-synonyms"
              disabled={loading || !word.trim()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover-elevate active-elevate-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : 'Get Synonyms'}
            </button>
            <button
              type="button"
              onClick={fetchAntonyms}
              data-testid="button-fetch-antonyms"
              disabled={loading || !word.trim()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover-elevate active-elevate-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : 'Get Antonyms'}
            </button>
          </div>

          {synonyms.length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-muted-foreground mb-2">Synonyms:</h4>
              <div className="flex flex-wrap gap-2">
                {synonyms.map((syn, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-background text-foreground rounded-full text-xs"
                  >
                    {syn}
                  </span>
                ))}
              </div>
            </div>
          )}

          {antonyms.length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-muted-foreground mb-2">Antonyms:</h4>
              <div className="flex flex-wrap gap-2">
                {antonyms.map((ant, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-background text-foreground rounded-full text-xs"
                  >
                    {ant}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex gap-3 pt-6 border-t border-border">
          <button
            type="submit"
            data-testid="button-save-word"
            className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover-elevate active-elevate-2"
          >
            {editingWord ? 'Update Word' : 'Save Word'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            data-testid="button-cancel"
            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover-elevate active-elevate-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

// Flashcards View Component with Spaced Repetition
function FlashcardsView({ words, onSpeak, onReview }: { words: Word[]; onSpeak: (text: string) => void; onReview: (wordId: string, quality: number) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showRating, setShowRating] = useState(false);

  // Sort words by spaced repetition priority
  const sortedWords = useMemo(() => {
    const now = Date.now();
    return [...words].sort((a, b) => {
      const aDue = (a.nextReviewDate || 0) - now;
      const bDue = (b.nextReviewDate || 0) - now;
      // Prioritize overdue cards, then by difficulty (lower ease factor = harder)
      if (aDue <= 0 && bDue > 0) return -1;
      if (bDue <= 0 && aDue > 0) return 1;
      if (aDue <= 0 && bDue <= 0) {
        return (a.easeFactor || 2.5) - (b.easeFactor || 2.5);
      }
      return aDue - bDue;
    });
  }, [words]);

  if (words.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-block text-muted-foreground mb-4">
          <Icons.Cards />
        </div>
        <h3 className="text-lg font-semibold mb-2">No Words Available</h3>
        <p className="text-muted-foreground">Add some words to start studying with flashcards</p>
      </div>
    );
  }

  const currentWord = sortedWords[currentIndex];
  const masteryColor = 
    currentWord.masteryLevel === 'mastered' ? 'text-green-600' :
    currentWord.masteryLevel === 'reviewing' ? 'text-blue-600' :
    'text-orange-600';

  const handleRating = async (quality: number) => {
    await onReview(currentWord.id, quality);
    setShowRating(false);
    setFlipped(false);
    // Move to next card
    if (currentIndex + 1 < sortedWords.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to start
    }
  };

  const handleNext = () => {
    setFlipped(false);
    setShowRating(false);
    setCurrentIndex((prev) => (prev + 1) % sortedWords.length);
  };

  const handlePrevious = () => {
    setFlipped(false);
    setShowRating(false);
    setCurrentIndex((prev) => (prev - 1 + sortedWords.length) % sortedWords.length);
  };

  const handleFlip = () => {
    setFlipped(!flipped);
    if (!flipped) {
      setShowRating(true);
    } else {
      setShowRating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Card Counter & Stats */}
      <div className="flex items-center justify-between text-sm">
        <div className="text-muted-foreground" data-testid="text-card-counter">
          Card {currentIndex + 1} of {sortedWords.length}
        </div>
        <div className={`font-medium ${masteryColor}`} data-testid="text-mastery-level">
          {currentWord.masteryLevel === 'learning' && '📚 Learning'}
          {currentWord.masteryLevel === 'reviewing' && '📖 Reviewing'}
          {currentWord.masteryLevel === 'mastered' && '🏆 Mastered'}
        </div>
      </div>

      {/* Flashcard */}
      <div
        className="relative cursor-pointer"
        onClick={handleFlip}
        data-testid="flashcard"
        style={{ perspective: '1000px', minHeight: '400px' }}
      >
        <div
          className={`relative w-full transition-transform duration-600 ${
            flipped ? 'rotate-y-180' : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front of Card */}
          <div
            className={`absolute w-full bg-card border-2 border-card-border rounded-lg p-12 shadow-lg ${
              flipped ? 'invisible' : 'visible'
            }`}
            style={{ backfaceVisibility: 'hidden', minHeight: '400px' }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <h2 className="text-4xl font-bold text-foreground text-center" data-testid="text-flashcard-word">{currentWord.word}</h2>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSpeak(currentWord.word);
                }}
                data-testid="button-flashcard-audio"
                className="p-3 rounded-full bg-primary text-primary-foreground hover-elevate active-elevate-2"
                aria-label="Pronounce word"
              >
                <Icons.Speaker />
              </button>
              <p className="text-sm text-muted-foreground">Click to reveal definition</p>
              {currentWord.reviewCount > 0 && (
                <div className="text-xs text-muted-foreground">
                  Reviewed {currentWord.reviewCount} times • {Math.round((currentWord.correctCount / currentWord.reviewCount) * 100)}% accuracy
                </div>
              )}
            </div>
          </div>

          {/* Back of Card */}
          <div
            className={`absolute w-full bg-card border-2 border-card-border rounded-lg p-12 shadow-lg ${
              flipped ? 'visible' : 'invisible'
            }`}
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              minHeight: '400px',
            }}
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground text-center" data-testid="text-flashcard-word-back">{currentWord.word}</h3>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Definitions
                </h4>
                <ol className="list-decimal list-inside space-y-2">
                  {currentWord.definitions.map((def, idx) => (
                    <li key={idx} className="text-base leading-relaxed text-foreground" data-testid={`text-flashcard-definition-${idx}`}>
                      {def}
                    </li>
                  ))}
                </ol>
              </div>

              {currentWord.sentences.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Examples
                  </h4>
                  <div className="space-y-2">
                    {currentWord.sentences.slice(0, 2).map((sentence, idx) => (
                      <p key={idx} className="text-sm italic text-muted-foreground leading-relaxed" data-testid={`text-flashcard-sentence-${idx}`}>
                        "{sentence}"
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Difficulty Rating Buttons (shown when card is flipped) */}
      {showRating && (
        <div className="space-y-3">
          <p className="text-center text-sm font-medium text-foreground">How well did you know this?</p>
          <div className="grid grid-cols-5 gap-2">
            <button
              onClick={() => handleRating(0)}
              data-testid="button-rating-0"
              className="px-3 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover-elevate active-elevate-2"
            >
              Again
            </button>
            <button
              onClick={() => handleRating(1)}
              data-testid="button-rating-1"
              className="px-3 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover-elevate active-elevate-2"
            >
              Hard
            </button>
            <button
              onClick={() => handleRating(3)}
              data-testid="button-rating-3"
              className="px-3 py-2 bg-yellow-500 text-white rounded-lg text-sm font-medium hover-elevate active-elevate-2"
            >
              Good
            </button>
            <button
              onClick={() => handleRating(4)}
              data-testid="button-rating-4"
              className="px-3 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover-elevate active-elevate-2"
            >
              Easy
            </button>
            <button
              onClick={() => handleRating(5)}
              data-testid="button-rating-5"
              className="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover-elevate active-elevate-2"
            >
              Perfect
            </button>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handlePrevious}
          data-testid="button-previous"
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover-elevate active-elevate-2"
        >
          <Icons.ChevronLeft />
          Previous
        </button>
        <button
          onClick={handleNext}
          data-testid="button-next"
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover-elevate active-elevate-2"
        >
          Next
          <Icons.ChevronRight />
        </button>
      </div>
    </div>
  );
}

// Quiz View Component
function QuizView({ words }: { words: Word[] }) {
  const [started, setStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizWords, setQuizWords] = useState<Word[]>([]);

  useEffect(() => {
    if (started && words.length >= 4) {
      const shuffled = [...words].sort(() => Math.random() - 0.5);
      setQuizWords(shuffled.slice(0, Math.min(10, shuffled.length)));
    }
  }, [started]);

  // Generate options with useMemo at the top level - depends on current question
  const options = useMemo(() => {
    if (!started || quizWords.length === 0 || currentQuestionIndex >= quizWords.length) {
      return [];
    }
    const currentWord = quizWords[currentQuestionIndex];
    const correct = [currentWord];
    const others = words.filter((w) => w.id !== currentWord.id).sort(() => Math.random() - 0.5);
    for (let i = 0; i < 3 && i < others.length; i++) {
      correct.push(others[i]);
    }
    return correct.sort(() => Math.random() - 0.5);
  }, [currentQuestionIndex, quizWords, started]);

  if (words.length < 4) {
    return (
      <div className="text-center py-16">
        <div className="inline-block text-muted-foreground mb-4">
          <Icons.Quiz />
        </div>
        <h3 className="text-lg font-semibold mb-2">Not Enough Words</h3>
        <p className="text-muted-foreground">
          You need at least 4 words to take a quiz. Add more words to get started!
        </p>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="text-center py-16 max-w-md mx-auto">
        <div className="inline-block text-primary mb-4">
          <Icons.Quiz />
        </div>
        <h3 className="text-lg font-semibold mb-2">Ready to Test Your Knowledge?</h3>
        <p className="text-muted-foreground mb-6">
          You'll be shown definitions and need to select the correct word. Good luck!
        </p>
        <button
          onClick={() => setStarted(true)}
          data-testid="button-start-quiz"
          className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover-elevate active-elevate-2"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  if (showResult) {
    const percentage = quizWords.length > 0 ? Math.round((score / quizWords.length) * 100) : 0;
    return (
      <div className="text-center py-16 max-w-md mx-auto">
        <div className="mb-6">
          <div className="text-6xl font-bold text-primary mb-2" data-testid="text-quiz-score">{percentage}%</div>
          <p className="text-muted-foreground" data-testid="text-quiz-result">
            You got {score} out of {quizWords.length} correct!
          </p>
        </div>
        <div className="space-y-3">
          <button
            onClick={() => {
              setStarted(false);
              setCurrentQuestionIndex(0);
              setSelectedAnswer(null);
              setScore(0);
              setShowResult(false);
              setQuizWords([]);
            }}
            data-testid="button-retry-quiz"
            className="w-full px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover-elevate active-elevate-2"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Guard: quizWords may be empty while useEffect runs
  if (quizWords.length === 0 || options.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-muted-foreground text-sm">Loading quiz...</div>
      </div>
    );
  }

  const currentWord = quizWords[currentQuestionIndex];
  const currentDefinition = currentWord.definitions[0];

  const handleAnswer = (word: Word) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(word.word);

    if (word.id === currentWord.id) {
      setScore((s) => s + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex + 1 < quizWords.length) {
        setCurrentQuestionIndex((i) => i + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress */}
      <div className="text-center text-sm text-muted-foreground" data-testid="text-quiz-progress">
        Question {currentQuestionIndex + 1} of {quizWords.length}
      </div>

      {/* Question */}
      <div className="bg-card border border-card-border rounded-lg p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-muted-foreground mb-4">
          Select the correct word:
        </h3>
        <p className="text-lg leading-relaxed text-foreground" data-testid="text-quiz-question">{currentDefinition}</p>
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-2 gap-4">
        {options.map((option, idx) => {
          const isSelected = selectedAnswer === option.word;
          const isCorrect = option.id === currentWord.id;
          const showFeedback = selectedAnswer !== null;

          return (
            <button
              key={option.id}
              onClick={() => handleAnswer(option)}
              data-testid={`button-answer-${idx}`}
              disabled={selectedAnswer !== null}
              className={`min-h-16 p-4 rounded-lg text-base font-medium transition-all ${
                showFeedback && isSelected && isCorrect
                  ? 'bg-green-500 text-white border-2 border-green-600'
                  : showFeedback && isSelected && !isCorrect
                  ? 'bg-red-500 text-white border-2 border-red-600'
                  : showFeedback && isCorrect
                  ? 'bg-green-500 text-white border-2 border-green-600'
                  : 'bg-card border-2 border-card-border hover-elevate active-elevate-2'
              } ${selectedAnswer ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center justify-center gap-2">
                {showFeedback && isSelected && isCorrect && <Icons.Check />}
                {showFeedback && isSelected && !isCorrect && <Icons.X />}
                <span>{option.word}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Statistics View Component
function StatisticsView({ words, metadata }: { words: Word[]; metadata: UserMetadata }) {
  // Calculate statistics
  const totalWords = words.length;
  const wordsByMastery = {
    learning: words.filter(w => w.masteryLevel === 'learning').length,
    reviewing: words.filter(w => w.masteryLevel === 'reviewing').length,
    mastered: words.filter(w => w.masteryLevel === 'mastered').length,
  };

  const wordsByTag = useMemo(() => {
    const tagCounts: Record<string, number> = {};
    words.forEach(word => {
      word.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10); // Top 10 tags
  }, [words]);

  const reviewAccuracy = metadata.totalReviews > 0 
    ? Math.round((metadata.totalCorrect / metadata.totalReviews) * 100) 
    : 0;

  const maxMasteryCount = Math.max(wordsByMastery.learning, wordsByMastery.reviewing, wordsByMastery.mastered, 1);
  const maxTagCount = Math.max(...wordsByTag.map(([, count]) => count), 1);

  if (totalWords === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-block text-muted-foreground mb-4">
          <Icons.Chart />
        </div>
        <h3 className="text-lg font-semibold mb-2">No Statistics Available</h3>
        <p className="text-muted-foreground">Add some words to see your learning progress</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Your Learning Statistics</h2>
        <p className="text-muted-foreground">Track your vocabulary building progress</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-card-border rounded-lg p-4 text-center" data-testid="stat-total-words">
          <div className="text-3xl font-bold text-primary mb-1">{totalWords}</div>
          <div className="text-sm text-muted-foreground">Total Words</div>
        </div>
        <div className="bg-card border border-card-border rounded-lg p-4 text-center" data-testid="stat-streak">
          <div className="text-3xl font-bold text-orange-600 mb-1">{metadata.streak}</div>
          <div className="text-sm text-muted-foreground">Day Streak</div>
        </div>
        <div className="bg-card border border-card-border rounded-lg p-4 text-center" data-testid="stat-reviews">
          <div className="text-3xl font-bold text-blue-600 mb-1">{metadata.totalReviews}</div>
          <div className="text-sm text-muted-foreground">Total Reviews</div>
        </div>
        <div className="bg-card border border-card-border rounded-lg p-4 text-center" data-testid="stat-accuracy">
          <div className="text-3xl font-bold text-green-600 mb-1">{reviewAccuracy}%</div>
          <div className="text-sm text-muted-foreground">Accuracy</div>
        </div>
      </div>

      {/* Mastery Level Distribution */}
      <div className="bg-card border border-card-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Words by Mastery Level</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-orange-600">📚 Learning</span>
              <span className="text-sm text-muted-foreground" data-testid="stat-learning-count">{wordsByMastery.learning}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className="bg-orange-500 h-3 rounded-full transition-all"
                style={{ width: `${(wordsByMastery.learning / maxMasteryCount) * 100}%` }}
                data-testid="bar-learning"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-600">📖 Reviewing</span>
              <span className="text-sm text-muted-foreground" data-testid="stat-reviewing-count">{wordsByMastery.reviewing}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className="bg-blue-500 h-3 rounded-full transition-all"
                style={{ width: `${(wordsByMastery.reviewing / maxMasteryCount) * 100}%` }}
                data-testid="bar-reviewing"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-green-600">🏆 Mastered</span>
              <span className="text-sm text-muted-foreground" data-testid="stat-mastered-count">{wordsByMastery.mastered}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className="bg-green-500 h-3 rounded-full transition-all"
                style={{ width: `${(wordsByMastery.mastered / maxMasteryCount) * 100}%` }}
                data-testid="bar-mastered"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Words by Tag */}
      {wordsByTag.length > 0 && (
        <div className="bg-card border border-card-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Top Tags</h3>
          <div className="space-y-3">
            {wordsByTag.map(([tag, count], idx) => (
              <div key={tag}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground capitalize" data-testid={`tag-name-${idx}`}>{tag}</span>
                  <span className="text-sm text-muted-foreground" data-testid={`tag-count-${idx}`}>{count} {count === 1 ? 'word' : 'words'}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${(count / maxTagCount) * 100}%` }}
                    data-testid={`tag-bar-${idx}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Learning Progress Summary */}
      <div className="bg-card border border-card-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Learning Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground" data-testid="stat-words-learned">{metadata.wordsLearned}</div>
              <div className="text-sm text-muted-foreground">Words Learned</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground" data-testid="stat-words-mastered">{metadata.wordsMastered}</div>
              <div className="text-sm text-muted-foreground">Words Mastered</div>
            </div>
          </div>
        </div>
      </div>

      {/* Motivational Message */}
      {metadata.streak > 0 && (
        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-6 text-center">
          <div className="text-4xl mb-2">🔥</div>
          <h4 className="text-lg font-semibold text-foreground mb-2">Keep it up!</h4>
          <p className="text-sm text-muted-foreground">
            You've studied for {metadata.streak} {metadata.streak === 1 ? 'day' : 'days'} in a row. 
            {metadata.streak < 7 && " You're building a great habit!"}
            {metadata.streak >= 7 && metadata.streak < 30 && " You're on fire!"}
            {metadata.streak >= 30 && " You're a vocabulary champion!"}
          </p>
        </div>
      )}
    </div>
  );
}

// Legal Page View Component
function LegalView({ 
  type, 
  onBack 
}: { 
  type: 'privacy' | 'terms'; 
  onBack: () => void;
}) {
  const content = type === 'privacy' ? privacyPolicyContent : termsOfServiceContent;
  const title = type === 'privacy' ? 'Privacy Policy' : 'Terms of Service';

  return (
    <div className="space-y-6" data-testid={`legal-${type}`}>
      {/* Header with back button */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 hover-elevate rounded-lg"
          data-testid="button-legal-back"
        >
          <Icons.ChevronLeft />
        </button>
        <h1 className="text-xl font-bold text-foreground">{title}</h1>
      </div>

      {/* Content */}
      <div className="bg-card border border-card-border rounded-lg p-6">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          {content.split('\n').map((line, index) => {
            // Handle headers
            if (line.startsWith('# ')) {
              return <h1 key={index} className="text-2xl font-bold text-foreground mb-4">{line.slice(2)}</h1>;
            }
            if (line.startsWith('## ')) {
              return <h2 key={index} className="text-xl font-semibold text-foreground mt-6 mb-3">{line.slice(3)}</h2>;
            }
            if (line.startsWith('### ')) {
              return <h3 key={index} className="text-lg font-medium text-foreground mt-4 mb-2">{line.slice(4)}</h3>;
            }
            // Handle bold text with **
            if (line.includes('**')) {
              const parts = line.split('**');
              return (
                <p key={index} className="text-muted-foreground mb-2">
                  {parts.map((part, i) => 
                    i % 2 === 1 ? <strong key={i} className="text-foreground">{part}</strong> : part
                  )}
                </p>
              );
            }
            // Handle list items
            if (line.startsWith('- ')) {
              return (
                <li key={index} className="text-muted-foreground ml-4 mb-1">
                  {line.slice(2)}
                </li>
              );
            }
            // Handle links (basic markdown link parsing)
            if (line.includes('[') && line.includes('](')) {
              const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
              const parts = [];
              let lastIndex = 0;
              let match;
              while ((match = linkRegex.exec(line)) !== null) {
                if (match.index > lastIndex) {
                  parts.push(line.slice(lastIndex, match.index));
                }
                parts.push(
                  <a 
                    key={match.index}
                    href={match[2]} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary hover:underline"
                  >
                    {match[1]}
                  </a>
                );
                lastIndex = match.index + match[0].length;
              }
              if (lastIndex < line.length) {
                parts.push(line.slice(lastIndex));
              }
              return <p key={index} className="text-muted-foreground mb-2">{parts}</p>;
            }
            // Empty lines
            if (line.trim() === '') {
              return <div key={index} className="h-2" />;
            }
            // Regular text
            return <p key={index} className="text-muted-foreground mb-2">{line}</p>;
          })}
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-muted/30 rounded-lg p-4 text-center">
        <p className="text-sm text-muted-foreground">
          Questions? Contact us at{' '}
          <a 
            href="mailto:ace.apps.44@gmail.com" 
            className="text-primary hover:underline"
            data-testid="link-contact-email"
          >
            ace.apps.44@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
