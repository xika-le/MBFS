/**
 * Shared Component: Card
 * Trích xuất từ Figma nodes 328:306, 328:349, 328:392...
 *
 * Figma styles:
 * - bg: white
 * - border: 1.224px solid rgba(0,0,0,0.1)
 * - borderRadius: 14px
 * - shadow: 0px 1px 3px rgba(0,0,0,0.1), 0px 1px 2px rgba(0,0,0,0.1)
 * - padding: 1.224px (outer) + 15.989px (content padding)
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  style?: StyleProp<ViewStyle>;
}

export const Card: React.FC<CardProps> = ({ children, title, style }) => {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.cardContent}>
        {title && <Text style={styles.title}>{title}</Text>}
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,             // white
    borderWidth: spacing.borderWidth.thin,        // ~1.224px → 1px
    borderColor: colors.border,                   // rgba(0,0,0,0.1)
    borderRadius: spacing.borderRadius.lg,        // 14px từ Figma
    // Shadow từ Figma: 0px 1px 3px rgba(0,0,0,0.1), 0px 1px 2px rgba(0,0,0,0.1)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardContent: {
    padding: spacing.md,                          // ~11.992px → 12px
  },
  title: {
    fontSize: typography.fontSize.md,             // 14px
    fontWeight: typography.fontWeight.semiBold,    // 600
    color: colors.textPrimary,                    // #101828
    marginBottom: spacing.sm,                     // 8px
  },
});
