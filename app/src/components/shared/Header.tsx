/**
 * Shared Component: Header
 * Trích xuất từ Figma node 328:569 (IndustrialParkList header), 328:871 (Detail header)
 *
 * Figma styles:
 * - height: 63.977px → 64px
 * - bg: #8b1a1a (primary)
 * - title text: white, 16px, semibold
 * - back button: 40x40, rounded 8px
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, onBack, rightAction }) => {
  return (
    <View style={styles.header}>
      {onBack ? (
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>{'‹'}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      {rightAction ? rightAction : <View style={styles.placeholder} />}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: spacing.header.height,                // 64px
    backgroundColor: colors.primary,              // #8b1a1a
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,                // 16px
  },
  backButton: {
    width: 40,                                    // ~39.993px
    height: 40,
    borderRadius: spacing.borderRadius.md,        // 8px
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    color: colors.surface,                        // white
    fontSize: 24,
    fontWeight: typography.fontWeight.semiBold,
  },
  title: {
    flex: 1,
    color: colors.surface,                        // white
    fontSize: typography.fontSize.lg,             // 16px
    fontWeight: typography.fontWeight.semiBold,    // 600
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
});
