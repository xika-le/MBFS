/**
 * NotificationScreen — UC 180-181: Thông báo
 * Figma nodes: 523:4729 (Nhắc hạn / Tab Cảnh báo), 523:4908 (Nhận thông báo / Tab Thông báo)
 *
 * Layout: Header "Thông báo" + 2 segment tabs (Cảnh báo / Thông báo) + ScrollView list
 * - Tab Cảnh báo: notification cards with deadline info (quá hạn / sắp đến hạn)
 * - Tab Thông báo: notification cards with category badge (Kết quả / Hệ thống)
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

// --- Types ---
type AlertStatus = 'overdue' | 'upcoming';

interface AlertItem {
  id: string;
  title: string;
  description: string;
  status: AlertStatus;
  daysText: string;
  dueDate: string;
  icon: keyof typeof Ionicons.glyphMap;
}

type NotifCategory = 'result' | 'system';

interface NotifItem {
  id: string;
  category: NotifCategory;
  title: string;
  description: string;
  timeAgo: string;
  date: string;
  isUnread: boolean;
  icon: keyof typeof Ionicons.glyphMap;
}

// --- Mock Data ---
const MOCK_ALERTS: AlertItem[] = [
  {
    id: '1',
    title: 'Cảnh báo quá hạn',
    description: 'Quá hạn bổ sung hồ sơ giấy phép đầu tư - Samsung Display Vietnam',
    status: 'overdue',
    daysText: 'Quá hạn 2 ngày',
    dueDate: '08/04/2026',
    icon: 'alert-circle',
  },
  {
    id: '2',
    title: 'Nhắc hạn bổ sung hồ sơ',
    description: 'Yêu cầu bổ sung báo cáo tác động môi trường - Intel Products Vietnam',
    status: 'upcoming',
    daysText: 'Còn 2 ngày',
    dueDate: '12/04/2026',
    icon: 'time',
  },
  {
    id: '3',
    title: 'Nhắc hạn báo cáo định kỳ',
    description: 'Báo cáo tình hình hoạt động đầu tư quý 1/2026 - Toyota Motor Vietnam',
    status: 'upcoming',
    daysText: 'Còn 5 ngày',
    dueDate: '15/04/2026',
    icon: 'document-text',
  },
  {
    id: '4',
    title: 'Nhắc hạn nghĩa vụ tài chính',
    description: 'Thanh toán lệ phí cấp giấy chứng nhận đầu tư - Nestlé Vietnam',
    status: 'upcoming',
    daysText: 'Còn 7 ngày',
    dueDate: '17/04/2026',
    icon: 'cash',
  },
  {
    id: '5',
    title: 'Nhắc hạn điều chỉnh dự án',
    description: 'Thời hạn điều chỉnh quy mô dự án - LG Display Vietnam',
    status: 'upcoming',
    daysText: 'Còn 10 ngày',
    dueDate: '20/04/2026',
    icon: 'construct',
  },
  {
    id: '6',
    title: 'Nhắc hạn gia hạn dự án',
    description: 'Dự án cần gia hạn trước khi hết thời hạn hoạt động - Honda Vietnam',
    status: 'upcoming',
    daysText: 'Còn 15 ngày',
    dueDate: '25/04/2026',
    icon: 'calendar',
  },
  {
    id: '7',
    title: 'Nghĩa vụ pháp lý phát sinh',
    description: 'Cập nhật giấy phép môi trường mới - Canon Vietnam',
    status: 'upcoming',
    daysText: 'Còn 20 ngày',
    dueDate: '30/04/2026',
    icon: 'shield-checkmark',
  },
];

const MOCK_NOTIFICATIONS: NotifItem[] = [
  {
    id: '1',
    category: 'result',
    title: 'Hồ sơ đã được phê duyệt',
    description: 'Giấy chứng nhận đầu tư dự án Samsung Display đã được phê duyệt',
    timeAgo: '10 phút trước',
    date: '10/04/2026',
    isUnread: true,
    icon: 'checkmark-circle',
  },
  {
    id: '2',
    category: 'result',
    title: 'Hồ sơ cần bổ sung',
    description: 'Yêu cầu bổ sung báo cáo môi trường cho dự án Intel Products Vietnam',
    timeAgo: '30 phút trước',
    date: '10/04/2026',
    isUnread: true,
    icon: 'create',
  },
  {
    id: '3',
    category: 'result',
    title: 'Phản ánh đã được trả lời',
    description: 'Cơ quan nhà nước đã trả lời phản ánh của bạn về thủ tục đầu tư',
    timeAgo: '1 giờ trước',
    date: '10/04/2026',
    isUnread: false,
    icon: 'chatbubble-ellipses',
  },
  {
    id: '4',
    category: 'system',
    title: 'Hệ thống bảo trì',
    description: 'Hệ thống sẽ bảo trì từ 22:00 - 24:00 ngày 11/04/2026',
    timeAgo: '2 giờ trước',
    date: '10/04/2026',
    isUnread: false,
    icon: 'settings',
  },
  {
    id: '5',
    category: 'system',
    title: 'Cập nhật chính sách đầu tư',
    description: 'Nghị định mới về ưu đãi đầu tư công nghệ cao đã được ban hành',
    timeAgo: '3 giờ trước',
    date: '10/04/2026',
    isUnread: false,
    icon: 'newspaper',
  },
  {
    id: '6',
    category: 'system',
    title: 'Thông báo tính năng mới',
    description: 'Tính năng matching nhà đầu tư - dự án đã được cập nhật',
    timeAgo: '1 ngày trước',
    date: '09/04/2026',
    isUnread: false,
    icon: 'sparkles',
  },
  {
    id: '7',
    category: 'result',
    title: 'Hồ sơ đã được tiếp nhận',
    description: 'Hồ sơ đăng ký dự án Toyota Motor Vietnam đã được tiếp nhận',
    timeAgo: '2 ngày trước',
    date: '08/04/2026',
    isUnread: false,
    icon: 'checkmark-circle',
  },
  {
    id: '8',
    category: 'system',
    title: 'Thông báo từ Cục Đầu tư',
    description: 'Hướng dẫn mới về thủ tục báo cáo đầu tư định kỳ',
    timeAgo: '3 ngày trước',
    date: '07/04/2026',
    isUnread: false,
    icon: 'megaphone',
  },
];

// --- Alert Card (Tab Cảnh báo) ---
const AlertCard: React.FC<{ item: AlertItem }> = ({ item }) => {
  const isOverdue = item.status === 'overdue';

  return (
    <TouchableOpacity
      style={[
        styles.alertCard,
        isOverdue ? styles.alertCardOverdue : styles.alertCardUpcoming,
      ]}
      activeOpacity={0.7}
    >
      <View style={styles.alertContent}>
        <View
          style={[
            styles.alertIconContainer,
            { backgroundColor: isOverdue ? '#ffc9c9' : '#fee685' },
          ]}
        >
          <Ionicons
            name={item.icon}
            size={spacing.icon.md}
            color={isOverdue ? '#c10007' : '#bb4d00'}
          />
        </View>

        <View style={styles.alertTextContainer}>
          <View style={styles.alertTitleRow}>
            <Text style={styles.alertTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: isOverdue ? '#e7000b' : '#e17100' },
              ]}
            >
              <Text style={styles.statusBadgeText}>
                {isOverdue ? 'Quá hạn' : 'Sắp đến hạn'}
              </Text>
            </View>
          </View>

          <Text style={styles.alertDescription} numberOfLines={2}>
            {item.description}
          </Text>

          <View style={styles.alertFooter}>
            <Text
              style={[
                styles.alertDays,
                { color: isOverdue ? '#c10007' : '#bb4d00' },
              ]}
            >
              {item.daysText}
            </Text>
            <Text style={styles.alertDate}>
              Ngày đến hạn: {item.dueDate}
            </Text>
          </View>
        </View>

        <Ionicons
          name="chevron-forward"
          size={spacing.icon.sm}
          color={colors.textTertiary}
          style={styles.chevron}
        />
      </View>
    </TouchableOpacity>
  );
};

// --- Notification Card (Tab Thông báo) ---
const NotifCard: React.FC<{ item: NotifItem }> = ({ item }) => {
  const isResult = item.category === 'result';
  const badgeBg = isResult ? '#dcfce7' : '#dbeafe';
  const badgeTextColor = isResult ? '#008236' : '#1447e6';
  const badgeLabel = isResult ? 'Kết quả' : 'Hệ thống';
  const iconBg = isResult ? '#dcfce7' : '#dbeafe';

  return (
    <TouchableOpacity
      style={[
        styles.notifCard,
        item.isUnread ? styles.notifCardUnread : styles.notifCardRead,
      ]}
      activeOpacity={0.7}
    >
      <View style={styles.notifContent}>
        <View style={styles.notifIconWrapper}>
          <View style={[styles.notifIconContainer, { backgroundColor: iconBg }]}>
            <Ionicons
              name={item.icon}
              size={spacing.icon.md}
              color={badgeTextColor}
            />
          </View>
          {item.isUnread && <View style={styles.unreadDot} />}
        </View>

        <View style={styles.notifTextContainer}>
          <View style={styles.notifCategoryRow}>
            <View style={[styles.categoryBadge, { backgroundColor: badgeBg }]}>
              <Text style={[styles.categoryBadgeText, { color: badgeTextColor }]}>
                {badgeLabel}
              </Text>
            </View>
          </View>

          <Text style={styles.notifTitle} numberOfLines={1}>
            {item.title}
          </Text>

          <Text style={styles.notifDescription} numberOfLines={2}>
            {item.description}
          </Text>

          <View style={styles.notifFooter}>
            <Text style={styles.notifTime}>{item.timeAgo}</Text>
            <Text style={styles.notifDate}>{item.date}</Text>
          </View>
        </View>

        <Ionicons
          name="chevron-forward"
          size={spacing.icon.sm}
          color={colors.textTertiary}
          style={styles.chevron}
        />
      </View>
    </TouchableOpacity>
  );
};

// --- Main Screen ---
type TabKey = 'alert' | 'notification';

export const NotificationScreen: React.FC = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<TabKey>('alert');
  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => n.isUnread).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={spacing.icon.md} color="#1a0f0f" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Thông báo</Text>

        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="search" size={spacing.icon.md} color="#1a0f0f" />
        </TouchableOpacity>
      </View>

      {/* Segment Tabs */}
      <View style={styles.segmentContainer}>
        <View style={styles.segmentBar}>
          <TouchableOpacity
            style={[
              styles.segmentTab,
              activeTab === 'alert' && styles.segmentTabActive,
            ]}
            onPress={() => setActiveTab('alert')}
          >
            <Text
              style={[
                styles.segmentText,
                activeTab === 'alert' && styles.segmentTextActive,
              ]}
            >
              Cảnh báo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.segmentTab,
              activeTab === 'notification' && styles.segmentTabActive,
            ]}
            onPress={() => setActiveTab('notification')}
          >
            <Text
              style={[
                styles.segmentText,
                activeTab === 'notification' && styles.segmentTextActive,
              ]}
            >
              Thông báo
            </Text>
          </TouchableOpacity>

          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'alert'
          ? MOCK_ALERTS.map((item) => <AlertCard key={item.id} item={item} />)
          : MOCK_NOTIFICATIONS.map((item) => (
              <NotifCard key={item.id} item={item} />
            ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationScreen;

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fbf7f7',
  },

  // Header — Figma: white bg, border bottom, center title
  header: {
    height: 56,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
    borderBottomWidth: spacing.borderWidth.thin,
    borderBottomColor: '#e5d5d5',
  },
  headerButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: typography.fontWeight.medium,
    color: '#1a0f0f',
    letterSpacing: 0.07,
  },

  // Segment tabs — Figma: bg #fef2f2, rounded container with 2 pills
  segmentContainer: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xs,
    borderBottomWidth: spacing.borderWidth.thin,
    borderBottomColor: '#e5d5d5',
  },
  segmentBar: {
    height: 44,
    backgroundColor: '#fef2f2',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.xs,
  },
  segmentTab: {
    flex: 1,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: spacing.borderRadius.md,
  },
  segmentTabActive: {
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  segmentText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: '#6b5b5b',
    letterSpacing: -0.15,
  },
  segmentTextActive: {
    color: '#8b1a1a',
  },

  // Unread badge — Figma: red circle on tab bar
  unreadBadge: {
    position: 'absolute',
    right: 10,
    top: 4,
    backgroundColor: '#e53935',
    borderRadius: 9999,
    minWidth: 18,
    height: 16,
    paddingHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadBadgeText: {
    fontSize: 10,
    fontWeight: typography.fontWeight.medium,
    color: colors.surface,
    letterSpacing: 0.12,
  },

  // Content
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    gap: spacing.md,
  },

  // ===== Alert Card (Tab Cảnh báo) =====
  alertCard: {
    borderRadius: 12,
    borderWidth: 1,
  },
  alertCardOverdue: {
    backgroundColor: '#fef2f2',
    borderColor: '#ffa2a2',
  },
  alertCardUpcoming: {
    backgroundColor: '#fffbeb',
    borderColor: '#ffd230',
  },
  alertContent: {
    flexDirection: 'row',
    padding: spacing.lg,
    alignItems: 'flex-start',
  },
  alertIconContainer: {
    width: spacing.icon.xl,
    height: spacing.icon.xl,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertTextContainer: {
    flex: 1,
    marginLeft: spacing.md,
    marginRight: spacing.sm,
  },
  alertTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  alertTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: '#1a0f0f',
    letterSpacing: -0.15,
    flex: 1,
    marginRight: spacing.sm,
  },
  statusBadge: {
    height: 20,
    borderRadius: spacing.borderRadius.sm,
    paddingHorizontal: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadgeText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.surface,
  },
  alertDescription: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: '#6b5b5b',
    lineHeight: 19.5,
    marginBottom: spacing.sm,
  },
  alertFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertDays: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  alertDate: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: '#6b5b5b',
  },

  // ===== Notification Card (Tab Thông báo) =====
  notifCard: {
    borderRadius: 12,
    borderWidth: 1,
  },
  notifCardUnread: {
    backgroundColor: '#eff6ff',
    borderColor: '#bedbff',
  },
  notifCardRead: {
    backgroundColor: colors.surface,
    borderColor: '#e5d5d5',
  },
  notifContent: {
    flexDirection: 'row',
    padding: spacing.lg,
    alignItems: 'flex-start',
  },
  notifIconWrapper: {
    position: 'relative',
  },
  notifIconContainer: {
    width: spacing.icon.xl,
    height: spacing.icon.xl,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadDot: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 12,
    height: 12,
    borderRadius: 9999,
    backgroundColor: '#e7000b',
    borderWidth: 2,
    borderColor: colors.surface,
  },
  notifTextContainer: {
    flex: 1,
    marginLeft: spacing.md,
    marginRight: spacing.sm,
  },
  notifCategoryRow: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  categoryBadge: {
    height: 20,
    borderRadius: spacing.borderRadius.sm,
    paddingHorizontal: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryBadgeText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  notifTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: '#1a0f0f',
    letterSpacing: -0.15,
    marginBottom: spacing.xs,
  },
  notifDescription: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: '#6b5b5b',
    lineHeight: 19.5,
    marginBottom: spacing.sm,
  },
  notifFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notifTime: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: '#6b5b5b',
  },
  notifDate: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: '#6b5b5b',
  },

  // Shared
  chevron: {
    marginTop: spacing.xs,
  },
});
