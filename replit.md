# Vocabulary Builder

## Overview

A mobile-styled vocabulary learning web application built with React, TypeScript, and Firebase. It aims to provide a native mobile app feel with a vibrant gradient UI, featuring flashcards, quizzes, daily practice streak tracking, spaced repetition (SM-2 algorithm), mastery levels, and a statistics dashboard. The project vision is to offer an engaging and effective platform for language learners to expand their vocabulary, with a focus on user experience and intuitive design. It integrates with a free Dictionary API (proxied through the backend) for automatic word definitions, the Datamuse API for synonyms/antonyms, and Paddle for subscription management. Users can also bulk-import vocabulary from CSV files.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The frontend is built with React 18 and TypeScript, using Vite for development. UI components are developed with `shadcn/ui` (based on Radix UI) and styled with Tailwind CSS, supporting a mobile-first, responsive design with light/dark modes. State management primarily uses React hooks and Firebase Firestore real-time listeners for data synchronization, with TanStack Query configured for server state.

### Backend Architecture

The backend utilizes an Express.js server with TypeScript, employing a middleware pattern. Data models are defined for words and user metadata, with Zod for runtime validation. RESTful APIs are provided, with an abstract `IStorage` interface allowing for flexible data storage implementations, currently using an in-memory solution but designed for persistence. Security features include Helmet.js, rate limiting, and webhook signature verification.

### Data Storage Solutions

The primary database is Firebase Firestore, a real-time NoSQL cloud database. It stores user-specific vocabulary entries and metadata for streak tracking, with real-time listeners ensuring UI updates. Firebase Authentication v11 handles user authentication, primarily anonymous login, with support for custom tokens and session persistence. Browser localStorage is used for client-side preferences.

**Admin Subscriber Registry**: The admin panel's subscriber registry is stored in Replit's built-in PostgreSQL database (`subscribers` table). This persists subscriber data, admin activations, trial extensions, and payment status across deployments and server restarts. The `server/db.ts` module provides the DB connection and typed helper functions (`dbGetSubscriber`, `dbUpsertSubscriber`, `dbGetAllSubscribers`, `dbFindSubscriberByEmail`). Data previously stored in `server/data/subscribers.json` (file-backed, wiped on redeploy) has been fully migrated to the database.

### System Design Choices

The application features a mobile-first design with a vertical navigation pattern. The UI incorporates vibrant gradient elements, 3D rounded navigation buttons, and a consistent spacing system. It includes a combined landing and login page, a settings view, and a comprehensive help dialog. Monetization is handled through a paywall model with a 7-day free trial, integrated with Paddle for subscriptions and a dedicated admin dashboard for management. Legal pages (Privacy Policy, Terms of Service, Refund Policy) are also included.

## External Dependencies

### Third-Party Services

1.  **Firebase (v11)**: Used for Authentication (anonymous sign-in, custom tokens), Firestore (real-time NoSQL database), and secure configuration via environment variables.
2.  **Free Dictionary API** (dictionaryapi.dev): Fetches word definitions and example sentences, proxied through the Express backend at `GET /api/dictionary/:word` to avoid browser CSP restrictions.
3.  **Datamuse API**: Fetches synonyms and antonyms to enhance vocabulary word definitions.
4.  **Paddle**: Integrated for subscription payments, customer portal management, and webhook processing.

### UI Component Libraries

1.  **Radix UI**: Provides accessible, headless UI primitives for foundational components.
2.  **shadcn/ui**: Offers pre-built, styled components based on Radix UI and Tailwind CSS, configured with a "new-york" style variant.

### Development Tools

1.  **Drizzle ORM**: Used for database schema definition and type generation (currently configured for PostgreSQL but not actively used with Firebase).
2.  **Vite**: The build tool and development server.
3.  **esbuild**: Used for server-side bundling in production.
4.  **PostCSS with Autoprefixer**: For CSS processing.

### Utility Libraries

-   **date-fns**: Date manipulation and formatting.
-   **clsx & tailwind-merge**: For conditional className composition.
-   **class-variance-authority**: Type-safe variant-based component styling.
-   **react-hook-form with Zod resolvers**: For form validation and management.
-   **embla-carousel-react**: For touch-friendly carousel implementation.