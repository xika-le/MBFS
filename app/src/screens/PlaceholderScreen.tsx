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
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
        onPress={() => navigation.navigate('ProcedureList')}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons name="magnify" size={28} color={colors.primary} />
        <View style={styles.menuInfo}>
          <Text style={styles.menuLabel}>Tra cứu thủ tục hành chính (UC 99)</Text>
          <Text style={styles.menuDesc}>Tra cứu quy trình, thành phần hồ sơ và biểu mẫu</Text>
        </View>
        <Text style={styles.menuArrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuCard}
        onPress={() => navigation.navigate('AppointmentList')}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons name="calendar-check" size={28} color={colors.primary} />
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

      {/* === Feature 2.6: Thông tin đầu tư === */}
      <Text style={styles.sectionTitle}>Thông tin đầu tư</Text>

      <TouchableOpacity
        style={styles.menuCard}
        onPress={() => navigation.navigate('AreaList')}
        activeOpacity={0.7}
      >
        <Text style={styles.menuIcon}>🗺️</Text>
        <View style={styles.menuInfo}>
          <Text style={styles.menuLabel}>Khu vực đầu tư (UC 85)</Text>
          <Text style={styles.menuDesc}>Xem danh sách ➔ Chi tiết khu vực</Text>
        </View>
        <Text style={styles.menuArrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuCard}
        onPress={() => navigation.navigate('SectorList')}
        activeOpacity={0.7}
      >
        <Text style={styles.menuIcon}>📰</Text>
        <View style={styles.menuInfo}>
          <Text style={styles.menuLabel}>Lĩnh vực đầu tư (UC 86)</Text>
          <Text style={styles.menuDesc}>Xem danh sách ➔ Bản tin ➔ Chi tiết</Text>
        </View>
        <Text style={styles.menuArrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuCard}
        onPress={() => navigation.navigate('PolicyNews')}
        activeOpacity={0.7}
      >
        <Text style={styles.menuIcon}>📈</Text>
        <View style={styles.menuInfo}>
          <Text style={styles.menuLabel}>Chính sách đầu tư (UC 87)</Text>
          <Text style={styles.menuDesc}>Xem bản tin ➔ Chi tiết chính sách</Text>
        </View>
        <Text style={styles.menuArrow}>›</Text>
      </TouchableOpacity>

      {/* === Feature 2.6: Tin tức (UC 95, 96, 97) === */}
      <Text style={styles.sectionTitle}>Các loại Bản tin mới</Text>

      <TouchableOpacity
        style={styles.menuCard}
        onPress={() => navigation.navigate('InvestmentNews')}
        activeOpacity={0.7}
      >
        <Text style={styles.menuIcon}>📮</Text>
        <View style={styles.menuInfo}>
          <Text style={styles.menuLabel}>Tin tức đầu tư (UC 95)</Text>
          <Text style={styles.menuDesc}>Sự kiện, tình hình doanh nghiệp</Text>
        </View>
        <Text style={styles.menuArrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuCard}
        onPress={() => navigation.navigate('PublicServiceNews')}
        activeOpacity={0.7}
      >
        <Text style={styles.menuIcon}>🏛️</Text>
        <View style={styles.menuInfo}>
          <Text style={styles.menuLabel}>Tin tức Dịch vụ công (UC 96)</Text>
          <Text style={styles.menuDesc}>Tin tức chính phủ, cập nhật hành chính</Text>
        </View>
        <Text style={styles.menuArrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuCard}
        onPress={() => navigation.navigate('SuccessStory')}
        activeOpacity={0.7}
      >
        <Text style={styles.menuIcon}>🌟</Text>
        <View style={styles.menuInfo}>
          <Text style={styles.menuLabel}>Câu chuyện thành công (UC 97)</Text>
          <Text style={styles.menuDesc}>Bài học kinh nghiệm từ các dự án FDI lớn</Text>
        </View>
        <Text style={styles.menuArrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuCard}
        onPress={() => navigation.navigate('LegalDocumentList')}
        activeOpacity={0.7}
      >
        <Text style={styles.menuIcon}>⚖️</Text>
        <View style={styles.menuInfo}>
          <Text style={styles.menuLabel}>Văn bản pháp luật (UC 98)</Text>
          <Text style={styles.menuDesc}>Tra cứu các quyết định, nghị định</Text>
        </View>
        <Text style={styles.menuArrow}>›</Text>
      </TouchableOpacity>

      {/* === Tiện ích & Thông tin === */}
      <Text style={styles.sectionTitle}>Tiện ích & Thông tin</Text>

      <TouchableOpacity
        style={styles.menuCard}
        onPress={() => navigation.navigate('Contact')}
        activeOpacity={0.7}
      >
        <Text style={styles.menuIcon}>📞</Text>
        <View style={styles.menuInfo}>
          <Text style={styles.menuLabel}>Liên hệ (UC 114)</Text>
          <Text style={styles.menuDesc}>Địa chỉ, điện thoại, email, bản đồ vị trí</Text>
        </View>
        <Text style={styles.menuArrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuCard}
        onPress={() => navigation.navigate('About')}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons name="information-outline" size={28} color={colors.primary} />
        <View style={styles.menuInfo}>
          <Text style={styles.menuLabel}>Giới thiệu (UC 115)</Text>
          <Text style={styles.menuDesc}>Tổng quan về Cổng thông tin và Cục ĐTNN</Text>
        </View>
        <Text style={styles.menuArrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuCard}
        onPress={() => navigation.navigate('HelpGuide')}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons name="book-open-variant" size={28} color={colors.primary} />
        <View style={styles.menuInfo}>
          <Text style={styles.menuLabel}>Hướng dẫn sử dụng (UC 104)</Text>
          <Text style={styles.menuDesc}>Tài liệu chi tiết hướng dẫn sử dụng hệ thống</Text>
        </View>
        <Text style={styles.menuArrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuCard}
        onPress={() => navigation.navigate('FAQHome')}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons name="frequently-asked-questions" size={28} color={colors.primary} />
        <View style={styles.menuInfo}>
          <Text style={styles.menuLabel}>Câu hỏi thường gặp (UC 111)</Text>
          <Text style={styles.menuDesc}>Giải đáp các thắc mắc chung và hỗ trợ kỹ thuật</Text>
        </View>
        <Text style={styles.menuArrow}>›</Text>
      </TouchableOpacity>

      {/* === Feature 4.1: Quản lý tài khoản === */}
      <Text style={styles.sectionTitle}>Quản lý tài khoản (Feature 4.1)</Text>

      <TouchableOpacity
        style={styles.menuCard}
        onPress={() => navigation.navigate('PersonalAccount')}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons name="account-circle-outline" size={28} color={colors.primary} />
        <View style={styles.menuInfo}>
          <Text style={styles.menuLabel}>Tài khoản cá nhân (UC 171)</Text>
          <Text style={styles.menuDesc}>Xem và cập nhật thông tin nhà đầu tư cá nhân</Text>
        </View>
        <Text style={styles.menuArrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuCard}
        onPress={() => navigation.navigate('BusinessAccount')}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons name="briefcase-outline" size={28} color={colors.primary} />
        <View style={styles.menuInfo}>
          <Text style={styles.menuLabel}>Quản lý doanh nghiệp (UC 172)</Text>
          <Text style={styles.menuDesc}>Xem và cập nhật thông tin tổ chức/doanh nghiệp</Text>
        </View>
        <Text style={styles.menuArrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuCard}
        onPress={() => navigation.navigate('ChangePassword')}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons name="lock-reset" size={28} color={colors.primary} />
        <View style={styles.menuInfo}>
          <Text style={styles.menuLabel}>Đổi mật khẩu (UC 173)</Text>
          <Text style={styles.menuDesc}>Bảo mật tài khoản bằng cách thay đổi mật khẩu định kỳ</Text>
        </View>
        <Text style={styles.menuArrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuCard}
        onPress={() => navigation.navigate('AccountSettings')}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons name="cog-outline" size={28} color={colors.primary} />
        <View style={styles.menuInfo}>
          <Text style={styles.menuLabel}>Cấu hình tài khoản (UC 176)</Text>
          <Text style={styles.menuDesc}>Cài đặt thông báo, đăng nhập và bảo mật</Text>
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
