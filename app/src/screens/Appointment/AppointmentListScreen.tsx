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
  Modal,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  
  const [sector, setSector] = useState('');
  const [publicService, setPublicService] = useState('');

  const currentData = getAppointmentsByStatus(activeTab as AppointmentStatus);
  const filteredData = currentData.filter((item) => {
    const matchesSearch = item.procedureName.toLowerCase().includes(searchText.toLowerCase()) ||
                         item.code.toLowerCase().includes(searchText.toLowerCase());
    return matchesSearch;
  });

  const handleReset = () => {
    setSector('');
    setPublicService('');
  };

  const handleSearch = () => {
    setIsFilterVisible(false);
  };

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

        {/* Action button — Single Xem button across all tabs as requested */}
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => handleView(item)}
        >
          <Text style={styles.viewButtonText}>Xem chi tiết</Text>
        </TouchableOpacity>
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
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setIsFilterVisible(true)}
          >
            <Ionicons name="filter-outline" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Filter Modal — Image 1 */}
        <Modal
          visible={isFilterVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setIsFilterVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.filterContainer}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Lĩnh vực */}
                <View style={styles.filterField}>
                  <Text style={styles.filterLabel}>Lĩnh vực</Text>
                  <TouchableOpacity style={styles.dropdownInput}>
                    <Text style={styles.dropdownPlaceholder}>{sector || 'Nhập tên lĩnh vực...'}</Text>
                    <Ionicons name="chevron-down" size={18} color={colors.textTertiary} />
                  </TouchableOpacity>
                </View>

                {/* Dịch Vụ Công */}
                <View style={styles.filterField}>
                  <Text style={styles.filterLabel}>Dịch Vụ Công</Text>
                  <TouchableOpacity style={styles.dropdownInput}>
                    <Text style={styles.dropdownPlaceholder}>{publicService || 'Nhập tên dịch vụ công...'}</Text>
                    <Ionicons name="chevron-down" size={18} color={colors.textTertiary} />
                  </TouchableOpacity>
                </View>
              </ScrollView>

              {/* Action Buttons */}
              <View style={styles.modalFooter}>
                <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
                  <Ionicons name="refresh-outline" size={20} color={colors.primary} />
                  <Text style={styles.resetBtnText}>Nhập lại</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.closeBtn} onPress={() => setIsFilterVisible(false)}>
                  <Ionicons name="close-outline" size={20} color={colors.primary} />
                  <Text style={styles.closeBtnText}>Đóng</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
                  <Ionicons name="search-outline" size={20} color="white" />
                  <Text style={styles.searchBtnText}>Tìm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

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

  // === Modal Styles ===
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  filterContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: spacing.lg,
    maxHeight: '80%',
  },
  filterField: {
    marginBottom: spacing.md,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  dropdownInput: {
    height: 48,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  dropdownPlaceholder: {
    color: colors.textTertiary,
    fontSize: 14,
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 8,
    marginTop: spacing.lg,
    justifyContent: 'flex-end',
  },
  resetBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    gap: 6,
  },
  resetBtnText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
  closeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    gap: 6,
  },
  closeBtnText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
  searchBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    backgroundColor: colors.primary,
    borderRadius: 8,
    gap: 6,
  },
  searchBtnText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
});
