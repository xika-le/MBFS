/**
 * Shared Component: Badge
 * Trích xuất từ Figma nodes 328:322, 328:365...
 *
 * Variants từ Figma:
 * - warning (Lưu nháp): bg #fef9c2, border #ffdf20, text #a65f00
 * - success (Đã phê duyệt): bg #dcfce7, border #7bf1a8, text #008236
 * - info: bg #dbeafe, border #8ec5ff, text #155dfc
 *
 * Shared styles: h=22.416px, borderRadius=8, borderWidth=1.224px
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

type BadgeVariant = 'warning' | 'success' | 'info' | 'primary' | 'successAlt' | 'warningAlt' | 'danger';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
}

const variantStyles: Record<BadgeVariant, { bg: string; border: string; text: string }> = {
  warning: {
    bg: colors.warningBg,         // #fef9c2
    border: colors.warningIconAlt, // #ffdf20
    text: colors.warningText,     // #a65f00
  },
  success: {
    bg: colors.successBg,         // #dcfce7
    border: colors.successAccent, // #7bf1a8
    text: colors.successText,     // #008236
  },
  info: {
    bg: colors.infoBg,            // #dbeafe
    border: colors.infoAccent,    // #8ec5ff
    text: colors.link,            // #155dfc
  },
  primary: {
    bg: colors.primary,           // #8b1a1a
    border: colors.transparent,   // transparent
    text: '#ffffff',              // white
  },
  successAlt: {
    bg: colors.successAltBg,      // #d0fae5
    border: colors.successAltAccent, // #5ee9b5
    text: colors.successAltText,  // #007a55
  },
  warningAlt: {
    bg: colors.warningAltBg,      // #ffedd4
    border: colors.warningAltAccent, // #ffb86a
    text: colors.warningAltText,  // #ca3500
  },
  danger: {
    bg: '#ffe2e2',                // Red badge background (Figma UC 80)
    border: '#fca5a5',            // Red border accent
    text: '#c10007',              // Red badge text (Figma UC 80)
  },
};

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'warning',
  style,
}) => {
  const v = variantStyles[variant];

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: v.bg,
          borderColor: v.border,
        },
        style,
      ]}
    >
      <Text style={[styles.text, { color: v.text }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    height: 22,                               // ~22.416px
    paddingHorizontal: spacing.sm,            // 8px
    borderRadius: spacing.borderRadius.md,    // 8px
    borderWidth: spacing.borderWidth.thin,    // ~1.224px → 1px
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: typography.fontSize.xs,         // 10px — small badge text
    fontWeight: typography.fontWeight.medium,  // 500
  },
});
