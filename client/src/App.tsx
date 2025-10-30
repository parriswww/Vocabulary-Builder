import { useState, useEffect, useMemo } from 'react';
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, type Auth, type User } from 'firebase/auth';
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
import type { Word, InsertWord, UserMetadata } from '@shared/schema';

// Global Firebase configuration from window
declare global {
  interface Window {
    __firebase_config: any;
    __app_id: string;
    __initial_auth_token?: string;
  }
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
};

type View = 'list' | 'add' | 'flashcards' | 'quiz' | 'stats';

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

        // Sign in with provided token or anonymously
        const authToken = window.__initial_auth_token;
        let userCredential;
        
        if (authToken) {
          try {
            userCredential = await signInWithCustomToken(authInstance, authToken);
          } catch (tokenError) {
            console.warn('Custom token sign-in failed, falling back to anonymous:', tokenError);
            userCredential = await signInAnonymously(authInstance);
          }
        } else {
          userCredential = await signInAnonymously(authInstance);
        }
        
        setUser(userCredential.user);
      } catch (error) {
        console.error('Firebase initialization error:', error);
        console.warn('App will run in demo mode without Firebase persistence');
        // Set loading to false to allow app to render
        setLoading(false);
      }
    };

    initFirebase();
  }, []);

  // Load user data and update streak
  useEffect(() => {
    if (!db || !user) return;

    const appId = window.__app_id;
    const userPath = `artifacts/${appId}/users/${user.uid}`;

    // Listen to words collection
    const wordsRef = collection(db, `${userPath}/words`);
    const unsubscribeWords = onSnapshot(wordsRef, (snapshot) => {
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
    });

    // Load and update metadata (streak)
    const loadMetadata = async () => {
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
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  if (loading) {
    return null; // Splash screen is shown from HTML
  }

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Mobile Header */}
      <header className="flex-shrink-0 bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white" data-testid="text-title">
            📚 Vocabulary Builder
          </h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white">
              <Icons.Fire />
              <span className="font-semibold" data-testid="text-streak">{metadata.streak}</span>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              data-testid="button-dark-mode"
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Icons.Sun /> : <Icons.Moon />}
            </button>
          </div>
        </div>

        {/* Vertical Navigation */}
        <nav className="mt-4 space-y-2" data-testid="nav-vertical">
          <button
            onClick={() => setCurrentView('list')}
            data-testid="button-view-list"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all transform ${
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
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all transform ${
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
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all transform ${
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
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all transform ${
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
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all transform ${
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
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 py-6" style={{ WebkitOverflowScrolling: 'touch' }}>
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
      </main>
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
    if (!flipped) {
      setFlipped(true);
      setShowRating(true);
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
      // Shuffle and select words for quiz
      const shuffled = [...words].sort(() => Math.random() - 0.5);
      setQuizWords(shuffled.slice(0, Math.min(10, shuffled.length)));
    }
  }, [started, words]);

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
    const percentage = Math.round((score / quizWords.length) * 100);
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

  const currentWord = quizWords[currentQuestionIndex];
  const currentDefinition = currentWord.definitions[0];

  // Generate answer options
  const generateOptions = () => {
    const options = [currentWord];
    const otherWords = words.filter((w) => w.id !== currentWord.id);
    const shuffledOthers = otherWords.sort(() => Math.random() - 0.5);

    for (let i = 0; i < 3 && i < shuffledOthers.length; i++) {
      options.push(shuffledOthers[i]);
    }

    return options.sort(() => Math.random() - 0.5);
  };

  const [options] = useState(generateOptions());

  const handleAnswer = (word: Word) => {
    setSelectedAnswer(word.word);

    if (word.id === currentWord.id) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex + 1 < quizWords.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
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
              key={idx}
              onClick={() => !selectedAnswer && handleAnswer(option)}
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

export default App;
