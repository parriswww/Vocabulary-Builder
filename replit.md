# Vocabulary Builder

## Overview

A mobile-styled vocabulary learning web application built with React, TypeScript, and Firebase. Designed to feel like a native mobile app with vertical navigation, vibrant gradient UI, and no browser chrome. Features include flashcards, quizzes, daily practice streak tracking, spaced repetition (SM-2 algorithm), mastery levels, statistics dashboard, and integration with the Datamuse API.

## Recent Changes (March 9, 2026)

**7-Day Free Trial:**
- New users automatically get a 7-day free trial on first login (no credit card needed)
- Trial stored in Firestore at `artifacts/{appId}/users/{uid}/metadata/subscription` with `trialStartDate` and `trialEndDate`
- Users with active trials bypass the paywall and see an amber banner: "Dùng thử miễn phí: còn X ngày"
- The banner includes an "Đăng ký ngay" (subscribe now) link to start paid subscription
- Paywall shows "7 ngày dùng thử MIỄN PHÍ" badge and updated CTAs

**Admin Dashboard:**
- Admin panel accessible at `/admin` path
- Authentication via `ADMIN_PASSWORD` environment secret (POST `/api/admin/auth`)
- Admin session tokens stored in-memory with 24-hour TTL
- Features: subscriber list with stats summary, extend trial by N days, grant 30-day free access
- In-memory subscriber registry updated by webhooks + user login events
- Backend endpoints: `GET /api/admin/subscribers`, `POST /api/admin/extend-trial`, `POST /api/admin/grant-free-month`, `POST /api/admin/logout`
- Admin grants also persisted to Firestore via REST API so they survive server restarts
- `GET /api/subscription/override/:uid` allows frontend to fetch server-side overrides

**Settings View:**
- New "Settings" tab in main app navigation
- Shows: profile info (avatar, name, email, user ID), subscription status/plan badge, trial end date, billing management button, legal links, support email
- Accessible via `data-testid="button-view-settings"` and `data-testid="view-settings"`

**Refund Policy:**
- Added detailed refund policy section to Terms of Service (Section 5)
- 14-day full refund window on first paid month
- No partial refunds after 14 days; cancellation ends access at period end
- Refunds processed through Paddle (5–10 business days)

**Paywall Model (replaced ad-supported model):**
- Removed all Google AdSense ad banners entirely
- Changed monetization from "free with ads / pay to remove ads" to full site paywall
- After login, non-premium/non-trial users see a paywall screen with "Get Full Access" heading
- Paywall shows price primarily in VND (130.000 ₫/tháng) with USD ($4.95/month) in small text below
- All billing charged in USD via Paddle; VND display is for Vietnamese users
- Premium users (post-payment) get full access to all app features
- Legal links (Privacy Policy, Terms of Service) accessible from paywall
- `subscriptionChecked` state prevents flash of paywall for existing premium users

**Bug Fixes:**
- Fixed quiz: `options` were generated once via `useState` after conditional returns (React rules violation); replaced with `useMemo` at top of component so options refresh per question
- Fixed audio playback: Chrome bug where `speechSynthesis.cancel()` immediately before `speak()` causes silent failure; fixed with 100ms `setTimeout` delay

**Previous Changes (December 3, 2025):**

**Privacy Policy & Terms of Service:**
- Added Privacy Policy and Terms of Service pages
- Legal links appear in footer on login page (GDPR/CCPA compliant placement)
- Legal links also appear in footer of main app content
- Full Privacy Policy covers data collection, third-party services (Paddle, Firebase)
- Terms of Service covers user accounts, payments, acceptable use
- Contact email: ace.apps.44@gmail.com
- Legal content stored in `client/src/legal/privacy-policy.ts`

**Paddle Payments:**
- Paddle payment integration for $5 one-time site access
- Subscription status stored in Firestore at `users/{userId}/metadata/subscription`
- Paddle webhook handler at `/api/webhooks/paddle` for subscription events
- Customer portal integration for subscription management
- See PADDLE_SETUP.md for configuration instructions

**Previous Updates (November 18, 2025):**

**Password Reset Feature:**
- Added "Forgot password?" link on login screen for easy password recovery
- Users can request password reset email by entering their email address
- Firebase sends secure password reset link directly to user's inbox
- Success and error messages provide clear feedback during reset process
- Seamless integration with existing login/signup flow
- Updated FIREBASE_SECURITY_RULES.md with password reset documentation

**Previous Updates (November 9, 2025):**

**Help Dialog & Horizontal Navigation:**
- Added help button (question mark icon) in header to the left of streak counter
- Comprehensive help dialog explaining all app features and icons:
  * Header icons (Help, Daily Streak Counter, Dark Mode Toggle)
  * Navigation buttons (Word List, Add New Word, Flashcards, Quiz, Statistics)
  * Word actions (Audio/Speaker, Edit, Delete, Search)
  * Learning features (Spaced Repetition, Mastery Levels, Cross-Device Sync)
- Converted navigation from vertical to horizontal scrollable layout
- Navigation buttons now arranged in a row with horizontal scroll on narrow screens
- Sticky navigation behavior preserved with improved mobile touch-friendliness

**Previous Updates (October 30, 2025):**
- Redesigned UI to look like a native mobile app
- Orange gradient header (from-orange-500 to-orange-600)
- Orange "📚 Vocabulary Builder" title in white text
- 3D rounded rectangle navigation buttons with scale/shadow effects
- White interior search bar (independent of theme)
- Gradient word cards (blue-to-purple) with white text
- Splash screen with gradient background and loading spinner
- Dark mode toggle with localStorage persistence
- PWA meta tags to hide browser controls and enable full-screen mode
- Mobile-first layout with touch-optimized spacing

**Firebase Integration for Cross-Device Sync:**
- Added `/api/firebase-config` endpoint to securely serve Firebase credentials from environment variables
- Frontend fetches configuration at runtime (no hardcoded secrets)
- Comprehensive error handling for Firebase permission errors
- Global unhandledrejection handler prevents Vite error overlay from blocking UI
- Created FIREBASE_SECURITY_RULES.md with step-by-step setup instructions
- App gracefully handles missing security rules with helpful console messages
- Data structure supports per-user isolation: `artifacts/{projectId}/users/{userId}/...`
- All Firebase operations wrapped in try-catch for graceful degradation

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR (Hot Module Replacement)
- Client-side routing handled within a single-page application structure

**UI Component System**
- shadcn/ui components built on Radix UI primitives for accessible, composable UI elements
- Tailwind CSS for utility-first styling with custom design tokens
- CSS variables system for theming (light/dark mode support)
- Custom typography scale following learning app design patterns (inspired by Quizlet/Duolingo)

**State Management**
- React hooks (useState, useEffect, useMemo) for local component state
- TanStack Query (React Query) configured for server state management (though primarily using Firebase real-time listeners)
- Real-time data synchronization through Firestore onSnapshot listeners

**Design Principles**
- Mobile-first responsive design (breakpoints at 768px and 1024px)
- Progressive disclosure pattern to minimize cognitive load
- Consistent spacing system using Tailwind units (2, 3, 4, 6, 8, 12)
- Inter font family for optimal readability

### Backend Architecture

**Server Framework**
- Express.js server with TypeScript
- Middleware pattern for request logging and JSON parsing
- Vite integration in development mode for seamless HMR

**Data Models**
- Word schema: id, word, tags (array), definitions (array), sentences (array, max 30), timestamps
- User metadata schema: streak counter, lastVisit timestamp
- Zod validation for runtime type checking and schema validation

**API Structure**
- RESTful endpoints prefixed with `/api`
- Storage interface abstraction (IStorage) for CRUD operations
- In-memory storage implementation (MemStorage) as default, designed to be swapped with persistent storage

### Data Storage Solutions

**Primary Database: Firebase Firestore**
- Real-time NoSQL cloud database
- User-specific data organization: `/artifacts/{appId}/users/{userId}/words` for vocabulary entries
- Separate metadata document: `/artifacts/{appId}/users/{userId}/metadata/profile` for streak tracking
- Real-time listeners for automatic UI updates when data changes

**Authentication**
- Firebase Authentication v11 with anonymous login as primary method
- Support for custom token authentication
- User session persistence across browser refreshes

**Client-Side Storage**
- Browser localStorage for user preferences (sidebar state, theme)
- Session-based authentication state management

### External Dependencies

**Third-Party Services**

1. **Firebase (v11)**
   - Authentication: Anonymous user sign-in and custom token support
   - Firestore: Real-time NoSQL database with automatic synchronization
   - Configuration via window.__firebase_config global variable

2. **Datamuse API**
   - Fetches synonyms and antonyms for vocabulary words
   - RESTful API integration without authentication
   - Used to enhance word definitions during add/edit operations

**UI Component Libraries**

1. **Radix UI**: Headless, accessible UI primitives
   - Accordion, Alert Dialog, Avatar, Checkbox, Dialog, Dropdown Menu, Popover, Select, Tabs, Toast, Tooltip, and more
   - Provides keyboard navigation, ARIA attributes, and focus management

2. **shadcn/ui**: Pre-built components using Radix UI and Tailwind CSS
   - Configured with "new-york" style variant
   - Custom color scheme using CSS variables
   - Component aliases for cleaner imports (@/components, @/lib, @/hooks)

**Development Tools**

1. **Drizzle ORM** (v0.39.1)
   - Database schema definition and type generation
   - PostgreSQL dialect configuration
   - Migration management via drizzle-kit
   - Note: Currently configured for PostgreSQL but not actively used with Firebase

2. **Build & Development**
   - esbuild: Server-side bundling for production
   - PostCSS with Autoprefixer: CSS processing
   - tsx: TypeScript execution for development server

**Utility Libraries**
- date-fns: Date manipulation and formatting
- clsx & tailwind-merge: Conditional className composition
- class-variance-authority: Type-safe variant-based component styling
- react-hook-form with Zod resolvers: Form validation and management
- embla-carousel-react: Touch-friendly carousel implementation

**Styling**
- Tailwind CSS v3+ with JIT compiler
- Custom design tokens for consistent spacing, colors, and typography
- Responsive breakpoints optimized for mobile-first development