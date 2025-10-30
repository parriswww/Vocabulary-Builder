# Vocabulary Builder

## Overview

A mobile-styled vocabulary learning web application built with React, TypeScript, and Firebase. Designed to feel like a native mobile app with vertical navigation, vibrant gradient UI, and no browser chrome. Features include flashcards, quizzes, daily practice streak tracking, spaced repetition (SM-2 algorithm), mastery levels, statistics dashboard, and integration with the Datamuse API.

## Recent Changes (October 30, 2025)

**Mobile App Transformation:**
- Redesigned UI to look like a native mobile app with vertical navigation
- Orange gradient header (from-orange-500 to-orange-600)
- Orange "📚 Vocabulary Builder" title in white text
- Vertical 3D rounded rectangle navigation buttons with scale/shadow effects
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