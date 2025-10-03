# Design System Documentation

## Overview
Syncord's design system is built on three core principles:
1. **Golden Ratio** for proportions and spacing
2. **Swiss Grid System** for layout structure
3. **Grok-like Aesthetic** for visual style

---

## Color Palette

### Monochrome System
Our design uses a strict black and white palette with carefully calibrated grays.

#### Dark Mode (Default)
- **Background**: `oklch(0.08 0 0)` - Deep black (#141414)
- **Foreground**: `oklch(0.95 0 0)` - Off white (#F2F2F2)
- **Card**: `oklch(0.12 0 0)` - Dark gray (#1F1F1F)
- **Muted**: `oklch(0.18 0 0)` - Medium gray (#2E2E2E)
- **Border**: `oklch(0.22 0 0)` - Subtle border (#383838)

#### Light Mode
- **Background**: `oklch(0.98 0 0)` - Off white (#FAFAFA)
- **Foreground**: `oklch(0.12 0 0)` - Near black (#1F1F1F)
- **Card**: `oklch(1 0 0)` - Pure white (#FFFFFF)
- **Muted**: `oklch(0.93 0 0)` - Light gray (#EDEDED)
- **Border**: `oklch(0.88 0 0)` - Subtle border (#E0E0E0)

### Color Usage Guidelines
- **Primary**: High contrast black/white for CTAs
- **Muted**: Backgrounds for secondary elements
- **Border**: Subtle separation between elements
- **Accent**: Same as primary for consistency

---

## Typography

### Font Family
- **UI Text**: Geist Sans
- **Code/Mono**: Geist Mono

### Type Scale
\`\`\`
xs:   12px / 0.75rem  - Timestamps, metadata
sm:   14px / 0.875rem - UI text, labels
base: 16px / 1rem     - Body text, messages
lg:   18px / 1.125rem - Headings
xl:   20px / 1.25rem  - Section titles
2xl:  24px / 1.5rem   - Page titles
\`\`\`

### Font Weights
- **Regular (400)**: Body text
- **Medium (500)**: UI elements
- **Semibold (600)**: Emphasized text
- **Bold (700)**: Headings

### Line Height
- Tight: 1.25 (headings)
- Normal: 1.5 (body text)
- Relaxed: 1.625 (long-form content)

---

## Spacing System

### Base Unit: 4px (0.25rem)

### Scale (following 4px increments)
\`\`\`
0   →  0px
1   →  4px   (0.25rem)
2   →  8px   (0.5rem)
3   →  12px  (0.75rem)
4   →  16px  (1rem)
6   →  24px  (1.5rem)
8   →  32px  (2rem)
12  →  48px  (3rem)
16  →  64px  (4rem)
\`\`\`

### Golden Ratio Applications
- Sidebar width ratio: 240px / 148px ≈ 1.618
- Header to content ratio
- Padding progressions

---

## Layout Grid

### Main Layout Structure
\`\`\`
┌─────┬──────────┬─────────────────┬──────────┐
│ 72  │   240    │      flex-1     │   240    │
│px   │    px    │                 │    px    │
│     │          │                 │          │
│Srvr │ Channels │   Chat Area     │ Members  │
│     │          │                 │          │
└─────┴──────────┴─────────────────┴──────────┘
\`\`\`

### Component Heights (Golden Ratio derived)
- **Header**: 60px
- **User Bar**: 52px (60 / 1.15)
- **Message Input**: 68px (52 × 1.3)

### Responsive Breakpoints
\`\`\`
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
\`\`\`

---

## Components

### Buttons
- **Height**: 32px (sm), 40px (default), 44px (lg)
- **Padding**: 12px horizontal, 8px vertical
- **Border Radius**: 6px (md)
- **Hover**: Background opacity +10%, radius +2px

### Input Fields
- **Height**: 40px
- **Padding**: 12px
- **Border**: 1px solid border color
- **Focus**: Ring with 2px offset

### Cards
- **Padding**: 16px (md), 24px (lg)
- **Border**: 1px solid border color
- **Border Radius**: 8px (lg)
- **Shadow**: None (flat design)

### Avatars
- **Sizes**: 32px (sm), 40px (default), 48px (lg)
- **Border Radius**: 50% (full)
- **Status Indicator**: 12px circle, absolute bottom-right

---

## Icons

### Lucide React
- **Default Size**: 16px (h-4 w-4)
- **Large**: 20px (h-5 w-5)
- **Stroke Width**: 2 (default)
- **Color**: Inherits from parent

### Icon Usage
- **Navigation**: 20px
- **Actions**: 16px
- **Status**: 12px

---

## Animations & Transitions

### Timing
- **Fast**: 150ms - Micro-interactions (hover)
- **Normal**: 200ms - Standard transitions
- **Slow**: 300ms - Complex state changes

### Easing
- **Default**: ease-in-out
- **Enter**: ease-out
- **Exit**: ease-in

### Common Transitions
\`\`\`css
transition: all 200ms ease-in-out;
\`\`\`

### Hover Effects
- Background color change
- Border radius morphing (24px → 16px)
- Opacity adjustments

---

## Swiss Grid Principles

### Alignment
- **Left-aligned text** for readability
- **Vertical rhythm** using consistent line heights
- **Grid-based layouts** with defined columns

### White Space
- Generous padding between sections
- Breathing room around elements
- Clear visual separation

### Hierarchy
1. Size (typography scale)
2. Weight (font weights)
3. Color (foreground vs muted)
4. Position (layout order)

---

## Golden Ratio Examples

### Sidebar Proportions
\`\`\`
Server Sidebar: 72px
Channel Sidebar: 240px
Ratio: 240 / 148 = 1.621 ≈ φ
\`\`\`

### Vertical Spacing
\`\`\`
Header: 60px
Content: 60 × φ ≈ 97px (flex)
Footer: 60 / φ ≈ 37px
\`\`\`

### Component Sizing
\`\`\`
Small: 32px
Medium: 32 × φ ≈ 52px
Large: 52 × φ ≈ 84px
\`\`\`

---

## Accessibility

### Contrast Ratios
- **Normal text**: Minimum 4.5:1
- **Large text**: Minimum 3:1
- **Interactive elements**: Minimum 3:1

### Focus States
- Visible focus ring (2px)
- High contrast indicator
- Keyboard navigation support

### Screen Readers
- Semantic HTML
- ARIA labels where needed
- Descriptive alt text

---

## Best Practices

### Do's ✓
- Maintain consistent spacing using the scale
- Use semantic color names
- Follow the type scale
- Respect the golden ratio proportions
- Keep animations subtle and purposeful

### Don'ts ✗
- Don't use arbitrary spacing values
- Avoid mixing color systems
- Don't break the grid structure
- Avoid excessive animations
- Don't compromise contrast for aesthetics

---

## Implementation Examples

### Component Spacing
\`\`\`tsx
<div className="p-4">        {/* 16px padding */}
  <div className="space-y-2"> {/* 8px vertical gap */}
    <h2 className="text-lg font-semibold mb-3"> {/* 12px margin-bottom */}
      Title
    </h2>
  </div>
</div>
\`\`\`

### Responsive Layout
\`\`\`tsx
<div className="hidden md:flex md:w-[240px]">
  {/* Visible on md+ screens, 240px width */}
</div>
\`\`\`

### Theme-Aware Styling
\`\`\`tsx
<div className="bg-background text-foreground border-border">
  {/* Adapts to light/dark mode */}
</div>
\`\`\`

---

## Resources

- [Golden Ratio Calculator](https://grtcalculator.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Swiss Design Principles](https://www.smashingmagazine.com/2009/07/lessons-from-swiss-style-graphic-design/)
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

Last updated: October 2, 2025
