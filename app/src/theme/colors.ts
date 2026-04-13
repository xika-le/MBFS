/**
 * Design Tokens: Colors
 * Trích xuất TỰ ĐỘNG từ Figma — Section 8:2 (UC 2-7)
 * Nodes tham chiếu: 328:293 (List), 328:583 (Detail)
 * Ngày trích xuất: 2026-04-11
 */

export const colors = {
  // === Primary ===
  primary: '#8b1a1a',               // Dark red — header, icons, brand
  primaryLight: 'rgba(139,26,26,0.1)', // Primary background tint

  // === Backgrounds ===
  background: '#f9fafb',            // Main background (screens)
  surface: '#ffffff',               // Card, input backgrounds
  surfaceAlt: '#f3f4f6',            // Alternate surface (dividers, chips)
  surfaceAlt2: '#f3f3f5',           // Secondary alternate surface

  // === Text ===
  textPrimary: '#101828',           // Main body text
  textSecondary: '#6a7282',         // Subtitle, label, hint text
  textTertiary: '#99a1af',          // Placeholder, disabled text
  textDark: '#0a0a0a',              // High-contrast text
  textMuted: '#717182',             // Muted text

  // === Accent: Green (positive values, green metrics) ===
  green: '#00a63e',                 // Positive metric values (Kim ngạch XK, Thu nhập, etc.)

  // === Links ===
  link: '#155dfc',                  // Hyperlink text
  linkDark: '#1447e6',              // Hyperlink hover/active

  // === Status: Warning (Lưu nháp) ===
  warningBg: '#fef9c2',            // Badge background
  warningText: '#a65f00',          // Badge text
  warningIcon: '#fdc700',          // Icon/indicator
  warningIconAlt: '#ffdf20',       // Alternate icon

  // === Status: Success (Đã phê duyệt) ===
  successBg: '#dcfce7',            // Badge background
  successText: '#008236',          // Badge text
  successAccent: '#7bf1a8',        // Accent/indicator

  // === Status: Success Alt (Đang hoạt động) ===
  successAltBg: '#d0fae5',         // Badge background — teal green
  successAltText: '#007a55',       // Badge text — teal
  successAltAccent: '#5ee9b5',     // Border accent

  // === Status: Warning Alt (Chuẩn bị triển khai) ===
  warningAltBg: '#ffedd4',         // Badge background — orange
  warningAltText: '#ca3500',       // Badge text — dark orange
  warningAltAccent: '#ffb86a',     // Border accent

  // === Status: Info ===
  infoBg: '#dbeafe',               // Info badge background
  infoAccent: '#8ec5ff',           // Info border/accent

  // === Borders ===
  border: 'rgba(0,0,0,0.1)',       // Default border (cards, inputs)
  borderLight: '#e5e7eb',          // Light border (dividers)
  borderMedium: '#d1d5dc',         // Medium border (tabs, separators)
  borderPrimary: '#8b1a1a',        // Active/selected border

  // === Transparent ===
  transparent: 'rgba(0,0,0,0)',    // Transparent
} as const;

export type ColorToken = keyof typeof colors;
