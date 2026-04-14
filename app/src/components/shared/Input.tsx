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
  TextInputProps,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

interface InputProps extends TextInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  editable?: boolean;
  variant?: 'outline' | 'filled';
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  style,
  inputStyle,
  leftIcon,
  editable = true,
  variant = 'filled',
  rightIcon,
  ...rest
}) => {
  return (
    <View style={[
      styles.container, 
      variant === 'outline' ? styles.outlineContainer : styles.filledContainer,
      !editable && styles.disabledContainer,
      style
    ]}>
      {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}  // #6a7282
        style={[
          styles.input,
          leftIcon ? styles.inputWithIcon : null,
          rightIcon ? styles.inputWithRightIcon : null,
          !editable && styles.disabledInput,
          inputStyle,
        ]}
        editable={editable}
        {...rest}
      />
      {rightIcon && <View style={styles.rightIconContainer}>{rightIcon}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: spacing.borderRadius.md,        // 8px
  },
  filledContainer: {
    backgroundColor: colors.surfaceAlt2,          // #f3f3f5
    borderWidth: spacing.borderWidth.thin,        // ~1.224px → 1px
    borderColor: colors.transparent,              // transparent
  },
  outlineContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d0d5dd',
  },
  disabledContainer: {
    backgroundColor: '#f9fafb',
  },
  iconContainer: {
    width: 40,                                    // paddingLeft=40px area
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    zIndex: 1,
  },
  rightIconContainer: {
    width: 40,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: typography.fontSize.md,             // 14px
    color: colors.textPrimary,                    // #101828
    paddingHorizontal: spacing.md,                // 16px
  },
  inputWithIcon: {
    paddingLeft: 40,                              // 40px (from Figma)
  },
  inputWithRightIcon: {
    paddingRight: 40,
  },
  disabledInput: {
    color: '#667085',
  },
});
