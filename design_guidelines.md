# Vocabulary Builder - Design Guidelines

## Design Approach

**Selected Approach:** Mobile-First Native App Experience

**Justification:** This is a mobile-styled web application designed to feel like a native app. The design prioritizes touch-friendly interactions, vertical navigation, vibrant gradients, and a full-screen experience without browser chrome. Inspired by modern mobile learning apps (Duolingo, Quizlet) with emphasis on colorful, engaging UI.

**Key Design Principles:**
- **Mobile-First:** Designed primarily for mobile/touch interactions with vertical navigation
- **App-Like Experience:** Full-screen with hidden browser controls, splash screen, native feel
- **Vibrant & Engaging:** Orange branding, gradient cards, white text on colored backgrounds
- **Touch-Optimized:** Large tap targets, rounded rectangles, 3D visual effects
- **Local Storage:** User preferences (dark mode) saved locally

---

## Typography

**Font Family:**
- Primary: Inter (via Google Fonts CDN) for all UI elements
- Display: Inter for headings with adjusted letter-spacing

**Type Scale:**
- **App Header:** text-xl font-semibold (streak, app title)
- **Section Headers:** text-lg font-semibold
- **Word (Primary):** text-2xl font-bold (in cards and flashcards)
- **Definitions/Content:** text-base leading-relaxed
- **Tags/Labels:** text-sm font-medium
- **Helper Text:** text-xs
- **Button Text:** text-sm font-medium

**Line Height:**
- Headings: leading-tight
- Body text: leading-relaxed (improves readability for definitions)
- Lists: leading-normal

---

## Layout System

**Spacing Primitives:**
We will use Tailwind units of **2, 3, 4, 6, 8, and 12** consistently throughout the application (e.g., p-4, gap-6, mb-8, space-y-3).

**Container Strategy:**
- App wrapper: max-w-4xl mx-auto px-4
- Mobile-first with breakpoints at md (768px) and lg (1024px)
- Word cards: Full-width on mobile, grid on desktop
- Forms: max-w-2xl for optimal readability

**Grid Patterns:**
- Word List: Single column on mobile, 2 columns on md, potentially 3 columns on lg for compact card view
- Navigation tabs: Horizontal scroll on mobile, full display on desktop
- Quiz options: 2x2 grid on all viewports

---

## Component Library

### Navigation
**Vertical Mobile Navigation:**
- Orange gradient header background (from-orange-500 to-orange-600)
- Orange title "📚 Vocabulary Builder" in white text
- Vertical button stack navigation
- 3D rounded rectangles (rounded-2xl)
- Active state: white background with orange text, shadow-xl, scale-105
- Inactive state: white/10 semi-transparent with backdrop blur
- Full-width buttons with icons and labels
- Streak counter and dark mode toggle in header
- Touch-optimized spacing (gap-2, py-3, px-4)

### Word Cards (List View)
**Card Structure - Vibrant Bubble Design:**
- Gradient backgrounds: from-blue-500 to-purple-600
- Rounded corners: rounded-2xl (more rounded than standard)
- Shadow: shadow-xl for depth
- Padding: p-6
- **All text in WHITE** for maximum contrast on colored background
- **Header:** Word in white (text-2xl font-bold) + Audio button with white/20 backdrop
- **Tags:** White text on white/20 semi-transparent backdrop (rounded-full)
- **Definitions:** White text (text-white), section header text-white/80
- **Sentences:** White text with slight transparency (text-white/90), italic
- **Actions Footer:** White text on semi-transparent backgrounds
  - Edit: bg-white/10, hover:bg-white/20
  - Delete: bg-red-500/30, hover:bg-red-500/50
  - Border separator: border-white/20

### Search & Filter Bar
- **WHITE interior background** (bg-white, not following theme)
- Dark gray text (text-gray-900) for readability
- Border: border-gray-300
- Rounded: rounded-xl
- Focus ring: focus:ring-orange-500
- Search icon: text-gray-400
- Shadow: shadow-sm for subtle elevation

### Add/Edit Form
**Layout:**
- Single column form with clear section breaks (space-y-8)
- **Field Groups:** space-y-4 between individual fields
- **Word Input:** Large, prominent (text-lg input)
- **Tags Input:** Regular input with helper text explaining comma separation
- **Dynamic Lists (Definitions/Sentences):**
  - Each item has remove button (× icon button on right)
  - Add button below list (+ icon, text-sm, secondary style)
  - Textarea for multi-line entries with auto-resize
- **API Section:** 
  - Flex row of Synonym/Antonym buttons
  - Results display in expandable/modal area
  - Copy-to-definition helper
- **Form Actions:** Sticky bottom bar on mobile, inline on desktop (Save, Cancel)

### Flashcard Interface
**Card Design:**
- Large, centered card taking majority of viewport width (max-w-2xl)
- Aspect ratio approximately 3:2 or golden ratio
- Padding: p-8 to p-12
- **Front:** Word centered, large (text-4xl), audio button below
- **Back:** Definitions list + sentences with clear typographic hierarchy
- Tap/click anywhere on card to flip (cursor-pointer)
- Card counter above card (text-sm, muted)
- Navigation buttons below card: Previous/Next (full-width on mobile, inline on desktop)

### Quiz Interface
**Question Display:**
- Definition shown in a card/panel (p-6, rounded-lg)
- "Select the correct word:" prompt
- **Answer Grid:** 2x2 on all sizes, gap-4
- **Answer Buttons:** 
  - Large touch targets (min-h-16, p-4)
  - Rounded corners, hover states
  - Show feedback state after selection (correct/incorrect indication)
- **Feedback Panel:** Appears after answer selection showing if correct/incorrect
- **Progress:** Question counter (e.g., "5/10") at top
- **Score Screen:** Centered card with large score display, retry button

### Buttons & Controls
**Primary Actions:** Larger (px-6 py-3), rounded-lg
**Secondary Actions:** Medium (px-4 py-2), rounded-md
**Icon Buttons:** Square with padding (p-2 to p-3), rounded-full or rounded-md
**Audio Buttons:** Speaker icon, consistent size across contexts
**Danger Actions (Delete):** Visually distinct through styling only

### Icons (Heroicons via CDN)
- Search, Plus, Trash, Edit, Speaker, Fire (streak), ChevronLeft, ChevronRight, X (close)
- Consistent size: w-5 h-5 for inline, w-6 h-6 for standalone buttons
- Always inline SVGs with stroke-current for color inheritance

---

## Animations

**Minimal, Purposeful Animations:**
- **Flashcard Flip:** 3D transform (rotateY) with 0.6s duration, preserve-3d
- **Quiz Feedback:** Subtle scale or shake on incorrect, checkmark appearance on correct
- **List Updates:** Fade in new items (200ms)
- **No:** Unnecessary hover animations, complex scroll effects, or decorative motion

---

## Images

**No Large Hero Image Required**

This is a utility application, not a marketing page. Visual elements should support function:

**Decorative Accents (Optional):**
- Small illustrations or abstract patterns in empty states (when no words saved)
- Success/completion illustrations in quiz score screen
- Keep illustrations minimal, single-color or line-art style

**Empty States:**
- Center-aligned content with small illustration/icon
- Encouraging message + primary action button
- Example: Empty word list shows book/document icon + "Start building your vocabulary" message

---

## Mobile App Features

**PWA Configuration:**
- Viewport meta tags to hide browser controls (viewport-fit=cover, user-scalable=no)
- Mobile-web-app-capable and apple-mobile-web-app-capable set to "yes"
- Theme color set to orange (#f97316)
- Apple status bar style: black-translucent
- Full-screen experience on mobile devices

**Splash Screen:**
- Gradient background (135deg, #667eea to #764ba2)
- Centered logo: "📚 Vocabulary" in white
- Animated spinner during Firebase initialization
- Fade-out transition when app loads
- Prevents white flash on startup

**Local Storage:**
- Dark mode preference saved to localStorage
- Persists across sessions
- Applied on app initialization
- Toggle button in header (sun/moon icons)

## Responsive Behavior

**Mobile-First Design:**
- Vertical navigation instead of horizontal tabs
- Full-screen layout (h-screen with flex-col)
- Overflow scrolling on main content area
- Single column card layout
- Touch-optimized tap targets (min-h-9 buttons)
- -webkit-overflow-scrolling: touch for smooth iOS scrolling

**Tablet/Desktop (≥ 768px):**
- Same vertical navigation (maintains mobile app feel)
- Two-column word list (grid-cols-2)
- All other elements remain mobile-optimized

---

## Accessibility

- All interactive elements have sufficient touch targets (min 44x44px)
- Focus states clearly visible on all interactive elements
- Form inputs have visible labels (not just placeholders)
- Skip-to-content link for keyboard navigation
- Color is never the sole indicator of state (use icons, text, patterns)
- Screen reader announcements for dynamic content (quiz feedback, streak updates)