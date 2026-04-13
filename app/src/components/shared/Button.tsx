/**
 * Shared Component: Button
 * Trích xuất từ Figma node 328:296 (icon button), 328:344 (text button)
 *
 * Variants từ Figma:
 * - Icon button: 40x40, border rgba(0,0,0,0.1), rounded 8
 * - Text button: full-width, h=32, border rgba(0,0,0,0.1), rounded 8
 * - Primary: bg #8b1a1a, text white
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

type ButtonType = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'small' | 'medium';

interface ButtonProps {
  title: string;
  onPress: () => void;
  type?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  type = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.base,
        styles[type],
        styles[size],
        disabled && styles.disabled,
        style,
      ]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={type === 'primary' ? colors.surface : colors.primary}
        />
      ) : (
        <Text
          style={[
            styles.text,
            styles[`${type}Text`],
            styles[`${size}Text`],
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // === Base ===
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: spacing.borderRadius.md,   // 8px từ Figma
    borderWidth: spacing.borderWidth.thin,    // ~1.224px → 1px
  },

  // === Types ===
  primary: {
    backgroundColor: colors.primary,         // #8b1a1a
    borderColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.surface,         // white
    borderColor: colors.border,              // rgba(0,0,0,0.1)
  },
  outline: {
    backgroundColor: colors.transparent,
    borderColor: colors.border,              // rgba(0,0,0,0.1)
  },

  // === Sizes ===
  small: {
    height: 32,                              // ~31.998px từ Figma
    paddingHorizontal: spacing.md,           // 12px
  },
  medium: {
    height: 40,                              // ~39.993px từ Figma
    paddingHorizontal: spacing.lg,           // 16px
  },

  // === Text ===
  text: {
    fontSize: typography.fontSize.sm,        // 12px
    fontWeight: typography.fontWeight.medium, // 500
  },
  primaryText: {
    color: colors.surface,                   // white
  },
  secondaryText: {
    color: colors.textPrimary,               // #101828
  },
  outlineText: {
    color: colors.textPrimary,               // #101828
  },
  smallText: {
    fontSize: typography.fontSize.sm,        // 12px
  },
  mediumText: {
    fontSize: typography.fontSize.md,        // 14px
  },

  // === States ===
  disabled: {
    opacity: 0.5,
  },
});
