/**
 * IZListScreen — Danh sách khu (generic cho 10 loại)
 * Figma node: 328:293 (UC 2: List View)
 * Features: 1.1-1.10
 *
 * Nhận route param `zoneType` để hiển thị mock data tương ứng.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
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
import { Input, Badge, Header } from '../../components/shared';
import { ZoneListItem, ZONE_CONFIG, getZoneMockData } from '../../data/zoneTypes';

type Props = NativeStackScreenProps<RootStackParamList, 'IZList'>;

export const IZListScreen: React.FC<Props> = ({ navigation, route }) => {
  const zoneType = route.params?.zoneType ?? 'kcn';
  const config = ZONE_CONFIG[zoneType];
  const mockData = getZoneMockData(zoneType);

  const [searchText, setSearchText] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  
  // Filter states
  const [province, setProvince] = useState('');
  const [areaFrom, setAreaFrom] = useState('');
  const [areaTo, setAreaTo] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleReset = () => {
    setProvince('');
    setAreaFrom('');
    setAreaTo('');
    setName('');
    setAddress('');
  };

  const handleSearch = () => {
    // Logic search could be implemented here or using filteredData
    setIsFilterVisible(false);
  };

  const filteredData = mockData.list.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
    return matchesSearch;
  });

  const renderCard = ({ item }: { item: ZoneListItem }) => (
    <View style={styles.card}>
      {/* Row: Code + Badge */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardCode}>{item.code}</Text>
        <Badge
          label={item.status === 'draft' ? 'Lưu nháp' : 'Đã duyệt'}
          variant={item.status === 'draft' ? 'warning' : 'success'}
        />
      </View>

      {/* Name */}
      <Text style={styles.cardName}>{item.name}</Text>

      {/* Info rows */}
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Tỉnh/TP:</Text>
        <Text style={styles.infoValue}>{item.province}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Năm thành lập:</Text>
        <Text style={styles.infoValue}>{item.year}</Text>
      </View>
      {item.area && (
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Diện tích:</Text>
          <Text style={styles.infoValue}>{item.area}</Text>
        </View>
      )}

      {/* View detail button */}
      <TouchableOpacity
        style={styles.detailButton}
        onPress={() => navigation.navigate('IZDetail', { id: item.id, zoneType })}
      >
        <Text style={styles.detailButtonText}>Xem chi tiết</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title={config.listTitle} onBack={() => navigation.goBack()} />
      <View style={styles.container}>
        {/* Search row: Input + Filter button */}
        <View style={styles.searchRow}>
          <View style={styles.searchInput}>
            <Input
              value={searchText}
              onChangeText={setSearchText}
              placeholder={`Tìm kiếm tên ${config.shortLabel}...`}
            />
          </View>
          <TouchableOpacity 
            style={styles.filterBtn}
            onPress={() => setIsFilterVisible(true)}
          >
            <Ionicons name="filter" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Filter Modal */}
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
              style={styles.filterModal}
            >
              <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.modalScrollContent}
              >
                {/* Tỉnh/thành */}
                <View style={styles.filterField}>
                  <Text style={styles.filterLabel}>Tỉnh/thành</Text>
                  <TouchableOpacity style={styles.dropdownInput}>
                    <Text style={styles.dropdownPlaceholder}>{province || '- Chọn -'}</Text>
                    <Ionicons name="chevron-down" size={18} color={colors.textTertiary} />
                  </TouchableOpacity>
                </View>

                {/* Diện tích */}
                <View style={styles.filterField}>
                  <Text style={styles.filterLabel}>Diện tích (hectata)</Text>
                  <View style={styles.rangeRow}>
                    <TextInput
                      style={styles.rangeInput}
                      placeholder="Từ"
                      value={areaFrom}
                      onChangeText={setAreaFrom}
                      keyboardType="numeric"
                    />
                    <TextInput
                      style={styles.rangeInput}
                      placeholder="Đến"
                      value={areaTo}
                      onChangeText={setAreaTo}
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                {/* Tên KCN */}
                <View style={styles.filterField}>
                  <Text style={styles.filterLabel}>Tên {config.shortLabel}</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder={`Nhập tên ${config.shortLabel.toLowerCase()}`}
                    value={name}
                    onChangeText={setName}
                  />
                </View>

                {/* Địa chỉ */}
                <View style={styles.filterField}>
                  <Text style={styles.filterLabel}>Địa chỉ</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Nhập địa chỉ"
                    value={address}
                    onChangeText={setAddress}
                  />
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
          ListFooterComponent={
            <Text style={styles.footer}>
              {`Hiển thị ${filteredData.length} trong tổng số ${mockData.list.length} ${config.label.toLowerCase()}`}
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,         // #f9fafb
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.container.paddingHorizontal, // 16px
    paddingTop: spacing.lg,                      // 16px
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
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // === List ===
  listContent: {
    gap: spacing.lg,                             // ~15.989px → 16px
    paddingBottom: spacing.xl,
  },

  // === Card ===
  card: {
    backgroundColor: colors.surface,             // white
    borderWidth: spacing.borderWidth.thin,        // ~1.224px → 1px
    borderColor: colors.border,                  // rgba(0,0,0,0.1)
    borderRadius: spacing.borderRadius.lg,        // 14px
    padding: spacing.md,                         // 12px
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    gap: spacing.sm,                             // 8px between items
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardCode: {
    fontSize: typography.fontSize.sm,            // 12px
    fontWeight: typography.fontWeight.medium,     // 500
    color: colors.textSecondary,                 // #6a7282
  },
  cardName: {
    fontSize: typography.fontSize.md,            // 14px
    fontWeight: typography.fontWeight.semiBold,   // 600
    color: colors.textPrimary,                   // #101828
  },

  // === Info rows ===
  infoRow: {
    flexDirection: 'row',
    gap: spacing.xs,                             // 4px
  },
  infoLabel: {
    fontSize: typography.fontSize.sm,            // 12px
    color: colors.textSecondary,                 // #6a7282
  },
  infoValue: {
    fontSize: typography.fontSize.sm,            // 12px
    fontWeight: typography.fontWeight.medium,     // 500
    color: colors.textPrimary,                   // #101828
  },

  // === Detail Button ===
  detailButton: {
    height: 32,                                  // ~31.998px
    backgroundColor: colors.surface,             // white
    borderWidth: spacing.borderWidth.thin,
    borderColor: colors.border,                  // rgba(0,0,0,0.1)
    borderRadius: spacing.borderRadius.md,        // 8px
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xs,                       // 4px
  },
  detailButtonText: {
    fontSize: typography.fontSize.sm,            // 12px
    fontWeight: typography.fontWeight.medium,     // 500
    color: colors.primary,                       // #8b1a1a
  },

  // === Footer ===
  footer: {
    fontSize: typography.fontSize.sm,            // 12px
    color: colors.textSecondary,                 // #6a7282
    textAlign: 'center',
    paddingVertical: spacing.lg,
  },

  // === Modal Styles ===
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  filterModal: {
    backgroundColor: 'white',
    borderRadius: 20,
    maxHeight: '80%',
    width: '100%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  modalScrollContent: {
    padding: 20,
  },
  filterField: {
    marginBottom: spacing.md,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  dropdownInput: {
    height: 44,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
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
  rangeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  rangeInput: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    fontSize: 14,
  },
  textInput: {
    height: 44,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    fontSize: 14,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
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
