import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Header } from '../../components/shared/Header';
import { Input } from '../../components/shared/Input';
import { Icon } from '../../components/shared/Icon';
import { ReportCard } from './components/ReportCard';
import { useNavigation } from '@react-navigation/native';

const mockReports = [
  {
    id: 'BC-2026-001',
    status: 'Đã duyệt',
    projectName: 'Dự án Khu công nghiệp Tân Phú',
    investorName: 'Công ty TNHH Đầu tư Phát triển ABC',
    period: 'Q1/2026',
    submitDate: '15/03/2026',
    location: 'TP. Hồ Chí Minh',
  },
  {
    id: 'BC-2026-002',
    status: 'Đang xử lý',
    projectName: 'Dự án Nhà máy sản xuất linh kiện điện tử',
    investorName: 'Samsung Electronics Vietnam Co., Ltd.',
    period: 'Q1/2026',
    submitDate: '10/03/2026',
    location: 'Bắc Ninh',
  },
  {
    id: 'BC-2026-003',
    status: 'Yêu cầu bổ sung',
    projectName: 'Dự án Khu đô thị mới Phương Đông',
    investorName: 'Tập đoàn Vingroup JSC',
    period: 'Q4/2025',
    submitDate: '28/02/2026',
    location: 'Hà Nội',
  },
  {
    id: 'BC-2026-004',
    status: 'Đã nộp',
    projectName: 'Dự án Nhà máy xi măng Long Sơn',
    investorName: 'Công ty CP Xi măng Long Sơn',
    period: 'Q1/2026',
    submitDate: '05/03/2026',
    location: 'Thanh Hóa',
  },
  {
    id: 'BC-2025-089',
    status: 'Từ chối',
    projectName: 'Dự án Trung tâm thương mại Metropole',
    investorName: 'Lotte Vietnam Shopping Co., Ltd.',
    period: 'Q4/2025',
    submitDate: '20/12/2025',
    location: 'Đà Nẵng',
  },
];

import { Modal } from 'react-native';

export const ReportListScreen = () => {
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  
  // Filter States
  const [reportType, setReportType] = useState('Tất cả');
  const [statusFilter, setStatusFilter] = useState('Tất cả');
  const [periodFilter, setPeriodFilter] = useState('Tất cả');
  const [provinceFilter, setProvinceFilter] = useState('');

  const handleReset = () => {
    setReportType('Tất cả');
    setStatusFilter('Tất cả');
    setPeriodFilter('Tất cả');
    setProvinceFilter('');
  };

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.id.toLowerCase().includes(search.toLowerCase()) || 
                         report.projectName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'Tất cả' || report.status === statusFilter;
    const matchesPeriod = periodFilter === 'Tất cả' || report.period === periodFilter;
    const matchesProvince = provinceFilter === '' || report.location.toLowerCase().includes(provinceFilter.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesPeriod && matchesProvince;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Báo cáo đã nộp" onBack={() => navigation.goBack()} />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Summary Sections */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.summaryContainer}>
          <View style={[styles.summaryCard, { backgroundColor: '#eff6ff' }]}>
            <View style={styles.summaryHeader}>
              <View>
                <Text style={styles.summaryLabel}>Tổng số báo cáo</Text>
                <Text style={styles.summaryValue}>145</Text>
              </View>
              <Icon name="file-text" size={24} color="#3b82f6" />
            </View>
          </View>
          
          <View style={[styles.summaryCard, { backgroundColor: '#ecfeff' }]}>
            <View style={styles.summaryHeader}>
              <View>
                <Text style={styles.summaryLabel}>Đã nộp</Text>
                <Text style={styles.summaryValue}>42</Text>
              </View>
              <Icon name="check-circle" size={24} color="#06b6d4" />
            </View>
          </View>

          <View style={[styles.summaryCard, { backgroundColor: '#fefce8' }]}>
            <View style={styles.summaryHeader}>
              <View>
                <Text style={styles.summaryLabel}>Đang xử lý</Text>
                <Text style={styles.summaryValue}>18</Text>
              </View>
              <Icon name="clock" size={24} color="#eab308" />
            </View>
          </View>
        </ScrollView>

        {/* Search & Filter */}
        <View style={styles.searchSection}>
          <View style={styles.searchInputContainer}>
            <Input
              placeholder="Tìm kiếm theo mã báo cáo"
              value={search}
              onChangeText={setSearch}
              leftIcon={<Icon name="search" size={16} color={colors.textTertiary} />}
              style={styles.input}
            />
          </View>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setIsFilterVisible(true)}
          >
            <Icon name="sliders" size={16} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* List Content */}
        <View style={styles.listContainer}>
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <ReportCard
                key={report.id}
                {...report}
                onPress={() => navigation.navigate('ReportDetail', { reportId: report.id })}
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Icon name="info" size={48} color={colors.textTertiary} />
              <Text style={styles.emptyText}>Không tìm thấy báo cáo nào</Text>
            </View>
          )}
        </View>
        
        <View style={styles.footerSpacer} />
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        visible={isFilterVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsFilterVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setIsFilterVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Bộ lọc</Text>
              <TouchableOpacity onPress={() => setIsFilterVisible(false)}>
                <Icon name="x" size={24} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.filterField}>
                <Text style={styles.filterLabel}>Loại báo cáo</Text>
                <TouchableOpacity style={styles.dropdown}>
                  <Text style={styles.dropdownText}>{reportType}</Text>
                  <Icon name="chevron-down" size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>

              <View style={styles.filterField}>
                <Text style={styles.filterLabel}>Trạng thái</Text>
                <View style={styles.chipRow}>
                  {['Tất cả', 'Đã duyệt', 'Đang xử lý', 'Đã nộp', 'Từ chối'].map(status => (
                    <TouchableOpacity 
                      key={status}
                      style={[
                        styles.chip,
                        statusFilter === status && styles.activeChip
                      ]}
                      onPress={() => setStatusFilter(status)}
                    >
                      <Text style={[
                        styles.chipText,
                        statusFilter === status && styles.activeChipText
                      ]}>{status}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.filterField}>
                <Text style={styles.filterLabel}>Kỳ báo cáo</Text>
                <View style={styles.chipRow}>
                  {['Tất cả', 'Q1/2026', 'Q4/2025', 'Năm 2026'].map(period => (
                    <TouchableOpacity 
                      key={period}
                      style={[
                        styles.chip,
                        periodFilter === period && styles.activeChip
                      ]}
                      onPress={() => setPeriodFilter(period)}
                    >
                      <Text style={[
                        styles.chipText,
                        periodFilter === period && styles.activeChipText
                      ]}>{period}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.filterField}>
                <Text style={styles.filterLabel}>Tỉnh/Thành phố</Text>
                <Input
                  placeholder="Tìm kiếm tỉnh/thành phố..."
                  value={provinceFilter}
                  onChangeText={setProvinceFilter}
                  variant="outline"
                  leftIcon={<Icon name="map-pin" size={16} color={colors.textTertiary} />}
                />
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                <Text style={styles.resetButtonText}>Đặt lại</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyButton} onPress={() => setIsFilterVisible(false)}>
                <Text style={styles.applyButtonText}>Áp dụng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
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
  },
  summaryContainer: {
    padding: 16,
    gap: 12,
  },
  summaryCard: {
    width: 140,
    height: 112,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  summaryLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: 4,
    width: 80,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },
  searchSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
  },
  input: {
    marginBottom: 0,
    backgroundColor: '#f3f3f5',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  emptyText: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  footerSpacer: {
    height: 24,
  },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },
  modalBody: {
    padding: 20,
  },
  filterField: {
    marginBottom: 24,
    gap: 12,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
    borderWidth: 1,
    borderColor: '#d1d5dc',
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  dropdownText: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surfaceAlt2,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  activeChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  activeChipText: {
    color: colors.surface,
    fontWeight: typography.fontWeight.medium,
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  resetButton: {
    flex: 1,
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d1d5dc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
  },
  applyButton: {
    flex: 1.5,
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: typography.fontWeight.medium,
    color: colors.surface,
  },
});
