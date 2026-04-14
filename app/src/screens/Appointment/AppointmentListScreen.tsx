/**
 * AppointmentListScreen — Quản lý đặt lịch nộp thủ tục về đầu tư
 * Feature 2.1 — Figma section: 35:2 (UC 73-75)
 *
 * 3 tabs: Chờ xác nhận / Đã xác nhận / Đã hủy
 * UC 73 (37:1484): Tab "Chờ xác nhận" — 3 buttons: Xem, Sửa, Xóa
 * UC 74 (37:1633): Tab "Đã xác nhận" — 1 button: Xem
 * UC 75 (37:1770): Tab "Đã hủy" — 1 button: Xem
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { Input } from '../../components/shared/Input';
import { TabBar } from '../../components/shared/TabBar';
import { Badge } from '../../components/shared/Badge';
import {
  AppointmentItem,
  AppointmentStatus,
  APPOINTMENT_TABS,
  getAppointmentsByStatus,
} from '../../data/appointmentMocks';

type Props = NativeStackScreenProps<RootStackParamList, 'AppointmentList'>;

// Badge variant mapping per status
const STATUS_BADGE: Record<AppointmentStatus, { label: string; variant: 'info' | 'success' | 'danger' }> = {
  cho_xac_nhan: { label: 'Chờ xác nhận', variant: 'info' },
  da_xac_nhan: { label: 'Đã xác nhận', variant: 'success' },
  da_huy: { label: 'Đã hủy', variant: 'danger' },
};

export const AppointmentListScreen: React.FC<Props> = () => {
  const [activeTab, setActiveTab] = useState<string>('cho_xac_nhan');
  const [searchText, setSearchText] = useState('');

  const currentData = getAppointmentsByStatus(activeTab as AppointmentStatus);
  const filteredData = currentData.filter((item) =>
    item.procedureName.toLowerCase().includes(searchText.toLowerCase()) ||
    item.code.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleView = (item: AppointmentItem) => {
    Alert.alert('Xem chi tiết', `Mã: ${item.code}\n${item.procedureName}`);
  };

  const handleEdit = (item: AppointmentItem) => {
    Alert.alert('Sửa lịch hẹn', `Mã: ${item.code}`);
  };

  const handleDelete = (item: AppointmentItem) => {
    Alert.alert(
      'Xóa lịch hẹn',
      `Bạn có chắc chắn muốn xóa lịch hẹn ${item.code}?`,
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Xóa', style: 'destructive' },
      ],
    );
  };

  const renderCard = ({ item }: { item: AppointmentItem }) => {
    const badge = STATUS_BADGE[item.status];
    const isChoXacNhan = item.status === 'cho_xac_nhan';

    return (
      <View style={styles.card}>
        {/* Row: Code + Badge */}
        <View style={styles.cardHeader}>
          <Text style={styles.cardCode}>{item.code}</Text>
          <Badge label={badge.label} variant={badge.variant} />
        </View>

        {/* Procedure name */}
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.procedureName}
        </Text>

        {/* Info rows */}
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Người nộp:</Text>
          <Text style={styles.infoValue}>{item.applicantName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Ngày hẹn:</Text>
          <Text style={styles.infoValue}>{item.appointmentDate} - {item.appointmentTime}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Ngày đăng ký:</Text>
          <Text style={styles.infoValue}>{item.submittedDate}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Cơ quan:</Text>
          <Text style={styles.infoValue} numberOfLines={1}>{item.agency}</Text>
        </View>

        {/* Cancel reason (only for Đã hủy tab) */}
        {item.cancelReason && (
          <View style={styles.reasonBox}>
            <Text style={styles.reasonLabel}>Lý do hủy:</Text>
            <Text style={styles.reasonText}>{item.cancelReason}</Text>
          </View>
        )}

        {/* Action buttons */}
        {isChoXacNhan ? (
          // UC 73: 3 buttons — Xem, Sửa, Xóa
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonOutline]}
              onPress={() => handleView(item)}
            >
              <Text style={styles.actionButtonTextPrimary}>Xem</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonOutline]}
              onPress={() => handleEdit(item)}
            >
              <Text style={styles.actionButtonTextPrimary}>Sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonDanger]}
              onPress={() => handleDelete(item)}
            >
              <Text style={styles.actionButtonTextDanger}>Xóa</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // UC 74, 75: 1 full-width button — Xem
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => handleView(item)}
          >
            <Text style={styles.viewButtonText}>Xem chi tiết</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Tab Bar */}
      <TabBar
        tabs={APPOINTMENT_TABS.map((t) => ({ key: t.key, label: t.label }))}
        activeKey={activeTab}
        onTabPress={setActiveTab}
      />

      <View style={styles.container}>
        {/* Search row */}
        <View style={styles.searchRow}>
          <View style={styles.searchInput}>
            <Input
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Tìm kiếm thủ tục..."
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterIcon}>☰</Text>
          </TouchableOpacity>
        </View>

        {/* List */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={renderCard}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Không có dữ liệu</Text>
            </View>
          }
          ListFooterComponent={
            filteredData.length > 0 ? (
              <Text style={styles.footer}>
                {`Hiển thị ${filteredData.length} trong tổng số ${currentData.length} lịch hẹn`}
              </Text>
            ) : null
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.container.paddingHorizontal,
    paddingTop: spacing.lg,
  },

  // === Search Row ===
  searchRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  searchInput: {
    flex: 1,
  },
  filterButton: {
    width: 40,
    height: 40,
    backgroundColor: colors.surface,
    borderWidth: spacing.borderWidth.thin,
    borderColor: colors.border,
    borderRadius: spacing.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIcon: {
    fontSize: spacing.icon.sm,
    color: colors.textPrimary,
  },

  // === List ===
  listContent: {
    gap: spacing.lg,
    paddingBottom: spacing.xl,
  },

  // === Card ===
  card: {
    backgroundColor: colors.surface,
    borderWidth: spacing.borderWidth.thin,
    borderColor: colors.border,
    borderRadius: spacing.borderRadius.lg,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    gap: spacing.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardCode: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.primary,
  },
  cardTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },

  // === Info rows ===
  infoRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  infoLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    flex: 1,
  },

  // === Reason Box ===
  reasonBox: {
    backgroundColor: colors.warningAltBg,       // #ffedd4
    borderRadius: spacing.borderRadius.md,
    padding: spacing.sm,
    gap: spacing.xs,
  },
  reasonLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.warningAltText,               // #ca3500
  },
  reasonText: {
    fontSize: typography.fontSize.sm,
    color: colors.warningAltText,
    lineHeight: typography.lineHeight.sm,
  },

  // === Action Buttons (UC 73: 3 buttons row) ===
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  actionButton: {
    flex: 1,
    height: 32,
    borderRadius: spacing.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonOutline: {
    backgroundColor: colors.surface,
    borderWidth: spacing.borderWidth.thin,
    borderColor: colors.border,
  },
  actionButtonDanger: {
    backgroundColor: colors.surface,
    borderWidth: spacing.borderWidth.thin,
    borderColor: '#e7000b',
  },
  actionButtonTextPrimary: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.primary,
  },
  actionButtonTextDanger: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: '#e7000b',
  },

  // === View Button (UC 74, 75: full-width) ===
  viewButton: {
    height: 32,
    backgroundColor: colors.surface,
    borderWidth: spacing.borderWidth.thin,
    borderColor: colors.border,
    borderRadius: spacing.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  viewButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.primary,
  },

  // === Empty & Footer ===
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyText: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  footer: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingVertical: spacing.lg,
  },
});
