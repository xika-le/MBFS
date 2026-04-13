/**
 * Design Tokens: Spacing & Sizing
 * Trích xuất TỰ ĐỘNG từ Figma — Section 8:2 (UC 2-7)
 * Nodes tham chiếu: 328:293 (List), 328:583 (Detail)
 *
 * Figma dùng base unit ≈ 3.997px → quy tròn về hệ 4px
 * Gap/padding thực tế: 3.997, 7.995, 11.992, 15.989 → 4, 8, 12, 16
 * Ngày trích xuất: 2026-04-11
 */

export const spacing = {
  // === Spacing Scale (4px base) ===
  xs: 4,                 // ~3.997px — tight gaps
  sm: 8,                 // ~7.995px — small gaps between elements
  md: 12,                // ~11.992px — card internal gaps
  lg: 16,                // ~15.989px — container padding, section gaps
  xl: 24,                // Large section spacing
  xxl: 32,               // Screen-level spacing

  // === Border Radius (từ Figma) ===
  borderRadius: {
    sm: 4,               // 4px — small chips, badges
    md: 8,               // 8px — buttons, inputs
    lg: 14,              // 14px — cards
    full: 9999,          // Fully rounded (pill)
  },

  // === Border Width ===
  borderWidth: {
    thin: 1,             // ~1.224px → 1px — card borders, input borders
    medium: 2,           // Medium borders
  },

  // === Icon Sizes ===
  icon: {
    xs: 12,              // Tiny icons
    sm: 16,              // ~15.989px — inline icons, card icons
    md: 20,              // Medium icons
    lg: 24,              // Navigation icons, action icons
    xl: 40,              // ~39.993px — large icons, buttons
  },

  // === Container ===
  container: {
    paddingHorizontal: 16,  // ~15.989px — screen horizontal padding
    paddingVertical: 16,    // ~15.989px — screen vertical padding
  },

  // === Header ===
  header: {
    height: 64,             // ~63.977px — header/navbar height
  },
} as const;

export type SpacingToken = keyof typeof spacing;
