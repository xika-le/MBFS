/**
 * Home Screen — Landing page với 10 loại khu
 * Features 1.1-1.10
 */

import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { ALL_ZONE_TYPES, ZONE_CONFIG, ZoneType } from '../data/zoneTypes';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const ZONE_ICONS: Record<ZoneType, string> = {
  kcn: '🏭',
  kcx: '📦',
  kcnht: '🔧',
  kcncn: '⚙️',
  kcnst: '🌿',
  kcnctc: '🔬',
  kktvb: '🌊',
  kktck: '🚪',
  kktcb: '⭐',
  ktmtd: '🛒',
};

export const PlaceholderScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Cổng Đầu Tư Quốc Gia</Text>
      <Text style={styles.subtitle}>Khai thác thông tin các khu</Text>

      <View style={styles.grid}>
        {ALL_ZONE_TYPES.map((type) => {
          const config = ZONE_CONFIG[type];
          return (
            <TouchableOpacity
              key={type}
              style={styles.zoneCard}
              onPress={() => navigation.navigate('IZList', { zoneType: type })}
              activeOpacity={0.7}
            >
              <Text style={styles.zoneIcon}>{ZONE_ICONS[type]}</Text>
              <Text style={styles.zoneBadge}>{config.shortLabel}</Text>
              <Text style={styles.zoneLabel} numberOfLines={2}>
                {config.label}
              </Text>
              <Text style={styles.zoneFeature}>Feature {config.featureId}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* === Module 2: Quản lý thủ tục & hồ sơ === */}
      <Text style={styles.sectionTitle}>Quản lý thủ tục & hồ sơ</Text>

      <TouchableOpacity
        style={styles.menuCard}
        onPress={() => navigation.navigate('AppointmentList')}
        activeOpacity={0.7}
      >
        <Text style={styles.menuIcon}>📅</Text>
        <View style={styles.menuInfo}>
          <Text style={styles.menuLabel}>Quản lý đặt lịch nộp thủ tục</Text>
          <Text style={styles.menuDesc}>Tra cứu lịch hẹn chờ xác nhận, đã xác nhận, đã hủy</Text>
        </View>
        <Text style={styles.menuArrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuCard}
        onPress={() => navigation.navigate('DossierList')}
        activeOpacity={0.7}
      >
        <Text style={styles.menuIcon}>📋</Text>
        <View style={styles.menuInfo}>
          <Text style={styles.menuLabel}>Quản lý hồ sơ</Text>
          <Text style={styles.menuDesc}>Theo dõi trạng thái hồ sơ: tiếp nhận, bổ sung, từ chối, hoàn thành</Text>
        </View>
        <Text style={styles.menuArrow}>›</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.primary,
    textAlign: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  zoneCard: {
    width: '47%',
    backgroundColor: colors.surface,
    borderWidth: spacing.borderWidth.thin,
    borderColor: colors.border,
    borderRadius: spacing.borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.xs,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  zoneIcon: {
    fontSize: 28,
    marginBottom: spacing.xs,
  },
  zoneBadge: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.surface,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: spacing.borderRadius.sm,
    overflow: 'hidden',
  },
  zoneLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: typography.lineHeight.sm,
  },
  zoneFeature: {
    fontSize: typography.fontSize.xs,
    color: colors.textTertiary,
  },

  // === Module 2: Menu Cards ===
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.primary,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: spacing.borderWidth.thin,
    borderColor: colors.border,
    borderRadius: spacing.borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    gap: spacing.md,
  },
  menuIcon: {
    fontSize: 28,
  },
  menuInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  menuLabel: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },
  menuDesc: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.sm,
  },
  menuArrow: {
    fontSize: 24,
    color: colors.textTertiary,
  },
});
