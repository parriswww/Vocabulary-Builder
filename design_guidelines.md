# Vocabulary Builder - Design Guidelines

## Design Approach

**Selected Approach:** Design System with Learning App References

**Justification:** This is a utility-focused productivity tool where efficiency, clarity, and ease of learning are paramount. We'll draw inspiration from modern learning platforms (Quizlet, Duolingo) and productivity tools (Notion, Linear) that excel at presenting information-dense content in accessible, scannable formats.

**Key Design Principles:**
- **Clarity First:** Information hierarchy must be immediately obvious
- **Learning-Optimized:** Design supports memory retention and focus
- **Frictionless Interaction:** Minimize cognitive load during study sessions
- **Progressive Disclosure:** Show information when needed, hide complexity when not

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
**Primary Tab Navigation:**
- Fixed position at top with app header
- Horizontally scrollable tabs on mobile
- Pills/underline indicator for active state
- Icons + labels for each tab (Word List, Add New, Flashcards, Quiz)
- Streak counter integrated in header: Icon + number in a pill/badge

### Word Cards (List View)
**Card Structure:**
- Rounded corners (rounded-lg), shadow (shadow-md)
- Padding: p-6
- Sections separated with dividers or spacing
- **Header:** Word in large text + Audio button (inline)
- **Tags:** Horizontal flex-wrap of pill badges (rounded-full, px-3 py-1, text-xs)
- **Definitions:** Ordered list with consistent spacing (space-y-2)
- **Sentences:** Styled differently from definitions (perhaps italic or with quote styling)
- **Actions Footer:** Flex justify-end with Edit and Delete buttons (gap-2)

### Search & Filter Bar
- Sticky or fixed below navigation
- **Search:** Input with search icon (leading icon pattern)
- **Tag Filter:** Dropdown/select or pills for active filters
- Compact on mobile, expanded on desktop
- Clear filters button when active

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

## Responsive Behavior

**Mobile (< 768px):**
- Single column layouts
- Full-width cards
- Stacked form fields
- Bottom-fixed action buttons where appropriate
- Horizontal scrolling tabs
- Simplified navigation

**Tablet/Desktop (≥ 768px):**
- Multi-column word list
- Inline form actions
- Wider flashcard format
- More generous spacing (scale up from base units)

---

## Accessibility

- All interactive elements have sufficient touch targets (min 44x44px)
- Focus states clearly visible on all interactive elements
- Form inputs have visible labels (not just placeholders)
- Skip-to-content link for keyboard navigation
- Color is never the sole indicator of state (use icons, text, patterns)
- Screen reader announcements for dynamic content (quiz feedback, streak updates)