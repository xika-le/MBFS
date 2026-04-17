/**
 * DossierListScreen — Quản lý hồ sơ trên mobile
 * Feature 2.2 — Figma section: 113:640 (UC 76-81)
 *
 * 6 tabs: Tất cả / Chờ tiếp nhận / Yêu cầu bổ sung / Đã tiếp nhận / Từ chối / Hoàn thành
 * UC 76 (113:2):    Tab "Tất cả" — mixed status badges
 * UC 77 (113:641):  Tab "Chờ tiếp nhận" — blue badge #dbeafe/#1447e6
 * UC 78 (113:734):  Tab "Yêu cầu bổ sung" — yellow badge + reason box
 * UC 79 (113:834):  Tab "Đã tiếp nhận" — blue badge
 * UC 80 (113:927):  Tab "Từ chối" — red badge #ffe2e2/#c10007 + reason box
 * UC 81 (113:1027): Tab "Hoàn thành" — green badge #dcfce7/#008236
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
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { Input, TabBar, Badge, Header } from '../../components/shared';
import {
  DossierItem,
  DossierTabKey,
  DOSSIER_TABS,
  DOSSIER_STATUS_CONFIG,
  getDossiersByTab,
} from '../../data/dossierMocks';

type Props = NativeStackScreenProps<RootStackParamList, 'DossierList'>;

export const DossierListScreen: React.FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<string>('tat_ca');
  const [searchText, setSearchText] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  
  // Filter states
  const [status, setStatus] = useState('');
  const [submittedDateFrom, setSubmittedDateFrom] = useState('');
  const [submittedDateTo, setSubmittedDateTo] = useState('');
  const [dueDateFrom, setDueDateFrom] = useState('');
  const [dueDateTo, setDueDateTo] = useState('');

  const currentData = getDossiersByTab(activeTab as DossierTabKey);
  const filteredData = currentData.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchText.toLowerCase()) ||
                         item.hsCode.toLowerCase().includes(searchText.toLowerCase());
    return matchesSearch;
  });

  const handleReset = () => {
    setStatus('');
    setSubmittedDateFrom('');
    setSubmittedDateTo('');
    setDueDateFrom('');
    setDueDateTo('');
  };

  const handleSearch = () => {
    setIsFilterVisible(false);
  };

  const handleView = (item: DossierItem) => {
    navigation.navigate('DossierDetail', { id: item.id });
  };

  const renderCard = ({ item }: { item: DossierItem }) => {
    const statusConfig = DOSSIER_STATUS_CONFIG[item.status];
    const hasReason = !!item.reason;

    return (
      <View style={styles.card}>
        {/* Row: HS Code + Badge */}
        <View style={styles.cardHeader}>
          <Text style={styles.hsCode}>{item.hsCode}</Text>
          <Badge label={statusConfig.label} variant={statusConfig.badgeVariant} />
        </View>

        {/* Type code */}
        <Text style={styles.typeCode}>{item.typeCode}</Text>

        {/* Title */}
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>

        {/* Info rows */}
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Người nộp:</Text>
          <Text style={styles.infoValue}>{item.applicantName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Ngày nộp:</Text>
          <Text style={styles.infoValue}>{item.submittedDate}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Cơ quan:</Text>
          <Text style={styles.infoValue} numberOfLines={1}>{item.agency}</Text>
        </View>
        {item.completedDate && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Ngày hoàn thành:</Text>
            <Text style={styles.infoValue}>{item.completedDate}</Text>
          </View>
        )}

        {/* Reason box (UC 78: Yêu cầu bổ sung, UC 80: Từ chối) */}
        {hasReason && (
          <View style={[
            styles.reasonBox,
            item.status === 'tu_choi' ? styles.reasonBoxDanger : styles.reasonBoxWarning,
          ]}>
            <Text style={[
              styles.reasonLabel,
              item.status === 'tu_choi' ? styles.reasonLabelDanger : styles.reasonLabelWarning,
            ]}>
              {item.status === 'tu_choi' ? 'Lý do từ chối:' : 'Lý do yêu cầu bổ sung:'}
            </Text>
            <Text style={[
              styles.reasonText,
              item.status === 'tu_choi' ? styles.reasonTextDanger : styles.reasonTextWarning,
            ]}>
              {item.reason}
            </Text>
          </View>
        )}

        {/* Action buttons */}
        <View style={styles.actionRow}>
          {item.status === 'cho_tiep_nhan' && (
            <>
              <TouchableOpacity
                style={[styles.smallActionButton, styles.stopBtn]}
                onPress={() => Alert.alert('Yêu cầu dừng', `Mã HS: ${item.hsCode}`)}
              >
                <Text style={styles.stopBtnText}>Yêu cầu dừng</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.smallActionButton, styles.withdrawBtn]}
                onPress={() => Alert.alert('Yêu cầu rút', `Mã HS: ${item.hsCode}`)}
              >
                <Text style={styles.withdrawBtnText}>Yêu cầu rút</Text>
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity
            style={[styles.viewButton, item.status === 'cho_tiep_nhan' ? { flex: 1, marginTop: 0 } : { width: '100%' }]}
            onPress={() => handleView(item)}
          >
            <Text style={styles.viewButtonText}>Xem chi tiết</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      
      {/* Header — Standardized shared component */}
      <Header title="Quản lý hồ sơ" onBack={() => navigation.goBack()} />

      <View style={styles.container}>
        {/* Search row - Now on top */}
        <View style={styles.searchRow}>
          <View style={styles.searchInput}>
            <Input
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Tìm kiếm hồ sơ..."
            />
          </View>
          <TouchableOpacity 
            style={styles.filterBtn}
            onPress={() => setIsFilterVisible(true)}
          >
            <Ionicons name="filter" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Tab Bar — 6 tabs, horizontal scroll, moved below search */}
        <TabBar
          tabs={DOSSIER_TABS.map((t) => ({ key: t.key, label: t.label }))}
          activeKey={activeTab}
          onTabPress={setActiveTab}
        />

        {/* Filter Modal — Image 2 */}
        <Modal
          visible={isFilterVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setIsFilterVisible(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay} 
            activeOpacity={1} 
            onPress={() => setIsFilterVisible(false)}
          >
            <TouchableOpacity 
              activeOpacity={1} 
              style={styles.filterContainer}
            >
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Trạng thái */}
                <View style={styles.filterField}>
                  <Text style={styles.filterLabel}>Trạng thái</Text>
                  <TouchableOpacity style={styles.dropdownInput}>
                    <Text style={styles.dropdownPlaceholder}>{status || 'Chọn trạng thái'}</Text>
                    <Ionicons name="chevron-down" size={18} color={colors.textTertiary} />
                  </TouchableOpacity>
                </View>

                {/* Ngày tiếp nhận */}
                <View style={styles.filterField}>
                  <Text style={styles.filterLabel}>Ngày tiếp nhận (từ - đến)</Text>
                  <View style={styles.dateRangeInput}>
                    <TextInput
                      style={styles.dateInput}
                      placeholder="Từ ngày"
                      value={submittedDateFrom}
                      onChangeText={setSubmittedDateFrom}
                    />
                    <Text style={styles.dateSeparator}>→</Text>
                    <TextInput
                      style={styles.dateInput}
                      placeholder="Đến ngày"
                      value={submittedDateTo}
                      onChangeText={setSubmittedDateTo}
                    />
                    <Ionicons name="calendar-outline" size={20} color={colors.textTertiary} />
                  </View>
                </View>

                {/* Ngày hẹn trả */}
                <View style={styles.filterField}>
                  <Text style={styles.filterLabel}>Ngày hẹn trả (từ - đến)</Text>
                  <View style={styles.dateRangeInput}>
                    <TextInput
                      style={styles.dateInput}
                      placeholder="Từ ngày"
                      value={dueDateFrom}
                      onChangeText={setDueDateFrom}
                    />
                    <Text style={styles.dateSeparator}>→</Text>
                    <TextInput
                      style={styles.dateInput}
                      placeholder="Đến ngày"
                      value={dueDateTo}
                      onChangeText={setDueDateTo}
                    />
                    <Ionicons name="calendar-outline" size={20} color={colors.textTertiary} />
                  </View>
                </View>
              </ScrollView>

              {/* Action Buttons */}
              <View style={styles.modalFooter}>
                <TouchableOpacity 
                  style={styles.modalFooterBtn} 
                  onPress={handleReset}
                >
                  <View style={styles.iconWrapper}>
                    <Ionicons name="reload" size={16} color="#8B1A1A" />
                  </View>
                  <Text style={styles.modalFooterBtnText}>Nhập lại</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.modalFooterBtn} 
                  onPress={() => setIsFilterVisible(false)}
                >
                  <View style={styles.iconWrapper}>
                    <Ionicons name="close" size={20} color="#8B1A1A" />
                  </View>
                  <Text style={styles.modalFooterBtnText}>Đóng</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.modalFooterBtn, styles.modalFooterBtnPrimary]} 
                  onPress={handleSearch}
                >
                  <View style={styles.iconWrapper}>
                    <Ionicons name="search" size={18} color="white" />
                  </View>
                  <Text style={[styles.modalFooterBtnText, { color: 'white' }]}>Tìm</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
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
              <Text style={styles.emptyText}>Không có hồ sơ nào</Text>
            </View>
          }
          ListFooterComponent={
            filteredData.length > 0 ? (
              <Text style={styles.footer}>
                {`Hiển thị ${filteredData.length} trong tổng số ${currentData.length} hồ sơ`}
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
    backgroundColor: '#F9FAFB',
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.container.paddingHorizontal,
    paddingTop: spacing.lg,
  },

  // === Search Row ===
  searchRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: spacing.md,
    paddingHorizontal: 2,
  },
  searchInput: {
    flex: 1,
  },
  filterBtn: {
    width: 44,
    height: 44,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // === List Content ===
  listContent: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  hsCode: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
  },
  typeCode: {
    fontSize: 12,
    color: colors.textTertiary,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E2939',
    marginBottom: 12,
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  infoLabel: {
    width: 120,
    fontSize: 13,
    color: colors.textTertiary,
  },
  infoValue: {
    flex: 1,
    fontSize: 13,
    color: '#334155',
    fontWeight: '500',
  },

  // === Reason Box ===
  reasonBox: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  reasonBoxWarning: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FEF3C7',
  },
  reasonBoxDanger: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FEE2E2',
  },
  reasonLabel: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  reasonLabelWarning: {
    color: '#D97706',
  },
  reasonLabelDanger: {
    color: '#DC2626',
  },
  reasonText: {
    fontSize: 13,
    lineHeight: 18,
  },
  reasonTextWarning: {
    color: '#92400E',
  },
  reasonTextDanger: {
    color: '#991B1B',
  },

  // === Action Buttons ===
  actionRow: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 8,
  },
  smallActionButton: {
    flex: 1,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  stopBtn: {
    backgroundColor: '#FFF1F2',
    borderColor: '#FECDD3',
  },
  stopBtnText: {
    fontSize: 12,
    color: '#E11D48',
    fontWeight: '600',
  },
  withdrawBtn: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
  },
  withdrawBtnText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  viewButton: {
    height: 36,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },

  // === Empty & Footer ===
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textTertiary,
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.textTertiary,
    marginTop: 8,
  },

  // === Filter Modal ===
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  filterContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  filterField: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E2939',
    marginBottom: 8,
  },
  dropdownInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  dropdownPlaceholder: {
    fontSize: 14,
    color: colors.textTertiary,
  },
  dateRangeInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 12,
    gap: 8,
  },
  dateInput: {
    flex: 1,
    fontSize: 14,
  },
  dateSeparator: {
    color: colors.textTertiary,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: 'white',
    marginTop: 10,
  },
  modalFooterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    backgroundColor: 'white',
    gap: 8,
    minWidth: 110,
  },
  modalFooterBtnPrimary: {
    backgroundColor: '#8B1A1A',
    borderColor: '#8B1A1A',
  },
  modalFooterBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#8B1A1A',
  },
  iconWrapper: {
    width: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
