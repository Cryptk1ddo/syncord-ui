// Design System Constants based on Golden Ratio and Swiss Grid

export const GOLDEN_RATIO = 1.618;

// Layout Dimensions (in pixels)
export const LAYOUT = {
  serverSidebar: 72,
  channelSidebar: 240,
  membersSidebar: 240,
  headerHeight: 60,
  userBarHeight: 52,
  messageInputHeight: 68,
} as const;

// Spacing Scale (based on 4px base unit)
export const SPACING = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  '3xl': 32,
  '4xl': 48,
  '5xl': 64,
} as const;

// Typography Scale
export const FONT_SIZE = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem',// 30px
} as const;

// Border Radius
export const RADIUS = {
  sm: '0.25rem',  // 4px
  md: '0.375rem', // 6px
  lg: '0.5rem',   // 8px
  xl: '0.75rem',  // 12px
  '2xl': '1rem',  // 16px
  full: '9999px',
} as const;

// Animation Durations
export const DURATION = {
  fast: 150,
  normal: 200,
  slow: 300,
} as const;

// Z-Index Scale
export const Z_INDEX = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  modal: 1300,
  popover: 1400,
  tooltip: 1500,
} as const;
