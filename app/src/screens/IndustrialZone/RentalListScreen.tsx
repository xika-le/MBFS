import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Modal,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { Icon, Header, Input } from '../../components/shared';
import { RENTAL_LIST, RENTAL_STATUS_CONFIG, RentalItem } from '../../data/rentalMockData';
import { Ionicons } from '@expo/vector-icons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'RentalList'>;

const RentalCard: React.FC<{ item: RentalItem; navigation: NavigationProp }> = ({ item, navigation }) => {
  const statusCfg = RENTAL_STATUS_CONFIG[item.status];

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('RentalDetail', { id: item.id })}
      activeOpacity={0.9}
    >
      {/* Header: contract code + status badge + chevron */}
      <View style={styles.cardHeader}>
        <Text style={styles.contractCode}>{item.contractCode}</Text>
        <View style={styles.cardHeaderRight}>
          <View style={[styles.statusBadge, { backgroundColor: statusCfg.bg }]}>
            <Text style={[styles.statusText, { color: statusCfg.color }]}>{statusCfg.label}</Text>
          </View>
          <Icon name="chevron-right" size={20} color={colors.textTertiary} />
        </View>
      </View>

      {/* Body rows */}
      <View style={styles.cardBody}>
        <View style={styles.bodyRow}>
          <Text style={styles.bodyLabel}>Tên lô:</Text>
          <Text style={styles.bodyValue}>{item.lotName}</Text>
        </View>
        <View style={styles.bodyRow}>
          <Text style={styles.bodyLabel}>Diện tích:</Text>
          <Text style={styles.bodyValue}>{item.area}</Text>
        </View>
        <View style={styles.rentalPeriodRow}>
          <View style={styles.rentalPeriodIcon}>
            <Icon name="calendar" size={14} color={colors.textSecondary} />
            <Text style={styles.bodyLabel}>Thời gian thuê:</Text>
          </View>
          <Text style={styles.rentalPeriodValue}>{item.rentalPeriod}</Text>
        </View>
        <View style={styles.bodyRow}>
          <Text style={styles.bodyLabel}>Ngày ký:</Text>
          <Text style={styles.bodyValue}>{item.signDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const RentalListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // Filter states
  const [selectedInvestor, setSelectedInvestor] = useState('');
  const [selectedContractStatus, setSelectedContractStatus] = useState('');
  const [selectedZone, setSelectedZone] = useState('');
  const [signDateFrom, setSignDateFrom] = useState('');
  const [signDateTo, setSignDateTo] = useState('');
  const [endDateFrom, setEndDateFrom] = useState('');
  const [endDateTo, setEndDateTo] = useState('');

  const handleReset = () => {
    setSelectedInvestor('');
    setSelectedContractStatus('');
    setSelectedZone('');
    setSignDateFrom('');
    setSignDateTo('');
    setEndDateFrom('');
    setEndDateTo('');
  };

  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return RENTAL_LIST;
    return RENTAL_LIST.filter(
      item =>
        item.contractCode.toLowerCase().includes(q) ||
        item.lotName.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <Header title="Quản lý cho thuê đất" onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        {/* Search row */}
        <View style={styles.searchRow}>
          <View style={styles.searchInputWrapper}>
            <Input
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Tìm kiếm số hợp đồng, tên lô..."
            />
          </View>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => setIsFilterVisible(true)}
          >
            <Ionicons name="filter" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* List */}
        <FlatList
          data={filteredData}
          renderItem={({ item }) => <RentalCard item={item} navigation={navigation} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listPadding}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon name="search" size={48} color={colors.textTertiary} />
              <Text style={styles.emptyText}>Không tìm thấy dữ liệu</Text>
            </View>
          }
        />
      </View>

      {/* Filter Modal */}
      <Modal
        visible={isFilterVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsFilterVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsFilterVisible(false)}
        >
          <TouchableOpacity activeOpacity={1} style={styles.filterModal}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.modalScrollContent}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Bộ lọc tìm kiếm</Text>
                <TouchableOpacity onPress={() => setIsFilterVisible(false)}>
                  <Icon name="x" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
              </View>

              {/* Nhà đầu tư thuê đất */}
              <View style={styles.filterField}>
                <Text style={styles.filterLabel}>Nhà đầu tư thuê đất</Text>
                <TouchableOpacity style={styles.dropdownInput}>
                  <Text style={styles.dropdownPlaceholder}>
                    {selectedInvestor || 'Chọn nhà đầu tư thuê đất'}
                  </Text>
                  <Ionicons name="chevron-down" size={18} color={colors.textTertiary} />
                </TouchableOpacity>
              </View>

              {/* Tình trạng hợp đồng */}
              <View style={styles.filterField}>
                <Text style={styles.filterLabel}>Tình trạng hợp đồng</Text>
                <TouchableOpacity style={styles.dropdownInput}>
                  <Text style={styles.dropdownPlaceholder}>
                    {selectedContractStatus || 'Chọn tình trạng hợp đồng'}
                  </Text>
                  <Ionicons name="chevron-down" size={18} color={colors.textTertiary} />
                </TouchableOpacity>
              </View>

              {/* Khu công nghiệp */}
              <View style={styles.filterField}>
                <Text style={styles.filterLabel}>Khu công nghiệp</Text>
                <TouchableOpacity style={styles.dropdownInput}>
                  <Text style={styles.dropdownPlaceholder}>
                    {selectedZone || 'Chọn khu công nghiệp'}
                  </Text>
                  <Ionicons name="chevron-down" size={18} color={colors.textTertiary} />
                </TouchableOpacity>
              </View>

              {/* Ngày ký hợp đồng */}
              <View style={styles.filterField}>
                <Text style={styles.filterLabel}>Ngày ký hợp đồng</Text>
                <View style={styles.rangeRow}>
                  <TextInput
                    style={styles.rangeInput}
                    placeholder="Từ"
                    value={signDateFrom}
                    onChangeText={setSignDateFrom}
                    placeholderTextColor={colors.textTertiary}
                  />
                  <Text style={styles.rangeSeparator}>-</Text>
                  <TextInput
                    style={styles.rangeInput}
                    placeholder="Đến"
                    value={signDateTo}
                    onChangeText={setSignDateTo}
                    placeholderTextColor={colors.textTertiary}
                  />
                </View>
              </View>

              {/* Ngày kết thúc hợp đồng */}
              <View style={styles.filterField}>
                <Text style={styles.filterLabel}>Ngày kết thúc hợp đồng</Text>
                <View style={styles.rangeRow}>
                  <TextInput
                    style={styles.rangeInput}
                    placeholder="Từ"
                    value={endDateFrom}
                    onChangeText={setEndDateFrom}
                    placeholderTextColor={colors.textTertiary}
                  />
                  <Text style={styles.rangeSeparator}>-</Text>
                  <TextInput
                    style={styles.rangeInput}
                    placeholder="Đến"
                    value={endDateTo}
                    onChangeText={setEndDateTo}
                    placeholderTextColor={colors.textTertiary}
                  />
                </View>
              </View>
            </ScrollView>

            {/* Footer buttons */}
            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.modalFooterBtn} onPress={handleReset}>
                <View style={styles.iconWrapper}>
                  <Ionicons name="reload" size={16} color="#8B1A1A" />
                </View>
                <Text style={styles.modalFooterBtnText}>Nhập lại</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalFooterBtn, styles.modalFooterBtnPrimary]}
                onPress={() => setIsFilterVisible(false)}
              >
                <Text style={[styles.modalFooterBtnText, { color: 'white' }]}>Áp dụng</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.container.paddingHorizontal,
    paddingTop: spacing.lg,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: spacing.md,
  },
  searchInputWrapper: {
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
  listPadding: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: spacing.borderRadius.lg,
    padding: 17,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  contractCode: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  cardHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 13,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  cardBody: {
    gap: 8,
  },
  bodyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bodyLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  bodyValue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  rentalPeriodRow: {
    gap: 4,
  },
  rentalPeriodIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rentalPeriodValue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
    marginLeft: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    opacity: 0.5,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: colors.textSecondary,
  },
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
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  filterField: {
    marginBottom: spacing.lg,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  dropdownInput: {
    height: 48,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  dropdownPlaceholder: {
    color: colors.textTertiary,
    fontSize: 14,
  },
  rangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rangeSeparator: {
    fontSize: 16,
    color: colors.textTertiary,
  },
  rangeInput: {
    flex: 1,
    height: 46,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
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
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  modalFooterBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
  },
  iconWrapper: {
    width: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
