/**
 * Shared Component: Input (Search)
 * Trích xuất từ Figma node 328:300
 *
 * Figma styles:
 * - bg: #f3f3f5
 * - border: 1.224px solid transparent
 * - borderRadius: 8px
 * - height: 39.993px → 40px
 * - paddingLeft: 40px (space for icon)
 * - paddingRight: 16px
 * - paddingVertical: 4px
 * - placeholder text: "Tìm kiếm tên KCN..."
 * - placeholder color: #6a7282
 */

import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

interface InputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  editable?: boolean;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  style,
  inputStyle,
  leftIcon,
  editable = true,
}) => {
  return (
    <View style={[styles.container, style]}>
      {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}  // #6a7282
        style={[
          styles.input,
          leftIcon ? styles.inputWithIcon : null,
          inputStyle,
        ]}
        editable={editable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceAlt2,          // #f3f3f5
    borderWidth: spacing.borderWidth.thin,        // ~1.224px → 1px
    borderColor: colors.transparent,              // transparent
    borderRadius: spacing.borderRadius.md,        // 8px
    height: 40,                                   // ~39.993px
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconContainer: {
    width: 40,                                    // paddingLeft=40px area
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: typography.fontSize.md,             // 14px
    color: colors.textPrimary,                    // #101828
    paddingHorizontal: spacing.lg,                // 16px
    paddingVertical: spacing.xs,                  // 4px
  },
  inputWithIcon: {
    paddingLeft: 40,                              // 40px (from Figma)
  },
});
