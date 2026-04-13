/**
 * Design Tokens: Typography
 * Trích xuất TỰ ĐỘNG từ Figma — Section 8:2 (UC 2-7)
 * Nodes tham chiếu: 328:293 (List), 328:583 (Detail)
 * Ngày trích xuất: 2026-04-11
 */

export const typography = {
  // === Font Family ===
  fontFamily: 'System',  // React Native default system font

  // === Font Sizes (từ Figma reference code) ===
  fontSize: {
    xs: 10,               // Small labels, tab text
    sm: 12,               // Body text, card info, badge text
    md: 14,               // Titles, headings, button text
    lg: 16,               // Screen headers, input text
  },

  // === Line Heights ===
  lineHeight: {
    xs: 14,               // For fontSize.xs
    sm: 16,               // For fontSize.sm
    md: 20,               // For fontSize.md
    lg: 24,               // For fontSize.lg
  },

  // === Font Weights (từ Figma: font-normal, font-medium, font-semibold) ===
  fontWeight: {
    regular: '400' as const,     // font-normal — body text, labels
    medium: '500' as const,      // font-medium — card titles, buttons
    semiBold: '600' as const,    // font-semibold — headers, emphasis
  },
} as const;

export type FontSizeToken = keyof typeof typography.fontSize;
export type FontWeightToken = keyof typeof typography.fontWeight;
