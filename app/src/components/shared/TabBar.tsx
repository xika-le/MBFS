/**
 * Shared Component: TabBar (Horizontal Scrollable — Pill Style)
 * Trích xuất từ Figma nodes 328:988 (Tab List)
 *
 * Figma styles:
 * - Tab List: horizontal scroll, height=50px
 * - Active tab: bg #8b1a1a, text white, border #8b1a1a, rounded-full (pill)
 * - Inactive tab: bg white, text #0a0a0a, border #e5e7eb, rounded-full (pill)
 * - Tab pill height: ~34px, paddingHorizontal: 17px, paddingVertical: 9px
 * - Font: Inter Medium 12px
 */

import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

interface TabItem {
  key: string;
  label: string;
}

interface TabBarProps {
  tabs: TabItem[];
  activeKey: string;
  onTabPress: (key: string) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ tabs, activeKey, onTabPress }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {tabs.map((tab) => {
          const isActive = tab.key === activeKey;
          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => onTabPress(tab.key)}
              style={[styles.tab, isActive && styles.tabActive]}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,                                     // ~50.42px from Figma
    backgroundColor: colors.surface,                // white
    borderBottomWidth: spacing.borderWidth.thin,
    borderBottomColor: colors.borderLight,           // #e5e7eb
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,                  // 16px
    gap: spacing.sm,                                // 8px gap between pills
  },
  tab: {
    height: 34,                                     // ~34.43px from Figma
    paddingHorizontal: 17,                          // ~17.224px from Figma
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: spacing.borderRadius.full,        // pill shape (rounded-full)
    borderWidth: spacing.borderWidth.thin,          // ~1.224px → 1px
    borderColor: colors.borderLight,                // #e5e7eb
    backgroundColor: colors.surface,                // white
  },
  tabActive: {
    backgroundColor: colors.primary,                // #8b1a1a
    borderColor: colors.primary,                    // #8b1a1a
  },
  tabText: {
    fontSize: typography.fontSize.sm,               // 12px
    fontWeight: typography.fontWeight.medium,        // 500 (Inter Medium)
    color: colors.textDark,                         // #0a0a0a
  },
  tabTextActive: {
    color: colors.surface,                          // white
  },
});
