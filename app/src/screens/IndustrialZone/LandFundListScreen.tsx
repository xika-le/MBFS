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
import { typography } from '../../theme/typography';
import { Icon } from '../../components/shared';
import { Header, Input } from '../../components/shared';
import { LAND_FUND_LIST, LandFundItem } from '../../data/landFundMockData';
import { Ionicons } from '@expo/vector-icons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'LandFundList'>;

export const LandFundListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // Filter states
  const [selectedZone, setSelectedZone] = useState('');
  const [areaFrom, setAreaFrom] = useState('');
  const [areaTo, setAreaTo] = useState('');

  const handleReset = () => {
    setSelectedZone('');
    setAreaFrom('');
    setAreaTo('');
  };

  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return LAND_FUND_LIST;
    return LAND_FUND_LIST.filter(
      item =>
        item.name.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.zoneName.toLowerCase().includes(q)
    );
  }, [searchQuery]);

const LandFundCard: React.FC<{ item: LandFundItem; navigation: any }> = ({ item, navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const statusColor = item.status === 'empty' ? colors.green : colors.primary;
  const statusBg = item.status === 'empty' ? colors.successBg : colors.primaryLight;
  const statusText = item.status === 'empty' ? 'Còn trống' : 'Đã cho thuê';

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('LandFundDetail', { id: item.id })}
        activeOpacity={0.9}
      >
        <View style={styles.cardHeader}>
          <View style={{ flex: 1, marginRight: 12 }}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSubtitle}>{item.zoneName}</Text>
          </View>
          <View style={styles.statusGroup}>
            <View style={[styles.statusBadge, { backgroundColor: statusBg }]}>
              <Text style={[styles.statusText, { color: statusColor }]}>{statusText}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: '#F1F5F9', marginTop: 4 }]}>
              <Text style={[styles.statusText, { color: colors.textSecondary, fontSize: 10 }]}>
                {item.publishStatus === 'published' ? 'Đã công bố' : 'Chưa công bố'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.infoRow}>
            <Icon name="map-pin" size={14} color={colors.textSecondary} />
            <Text style={styles.infoText}>Vị trí: {item.location}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="maximize" size={14} color={colors.textSecondary} />
            <Text style={styles.infoText}>Diện tích: {item.area} m²</Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <TouchableOpacity 
            style={styles.actionItem} 
            onPress={() => navigation.navigate('LandFundDetail', { id: item.id })}
          >
            <Icon name="eye" size={16} color={colors.primary} />
            <Text style={styles.actionText}>Xem chi tiết</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <Icon name="clock" size={16} color={colors.primary} />
            <Text style={styles.actionText}>Lịch sử</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.moreActionBtn}
            onPress={() => setMenuVisible(!menuVisible)}
          >
            <Ionicons 
              name={menuVisible ? 'close' : 'ellipsis-horizontal'} 
              size={20} 
              color={menuVisible ? colors.primary : colors.textSecondary} 
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {/* Conditional Menu */}
      {menuVisible && (
        <View style={styles.popoverMenu}>
          {item.publishStatus === 'published' ? (
            <TouchableOpacity style={styles.menuItem}>
              <Icon name="eye-off" size={16} color={colors.primary} />
              <Text style={styles.menuText}>Hủy công bố</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.menuItem}>
              <Icon name="globe" size={16} color={colors.primary} />
              <Text style={styles.menuText}>Công bố</Text>
            </TouchableOpacity>
          )}

          {item.status === 'empty' && (
            <>
              <TouchableOpacity style={styles.menuItem}>
                <Icon name="edit-2" size={16} color={colors.primary} />
                <Text style={styles.menuText}>Chỉnh sửa</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <Icon name="trash-2" size={16} color="#dc2626" />
                <Text style={[styles.menuText, { color: '#dc2626' }]}>Xóa</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </View>
  );
};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      <Header title="Thông tin quỹ đất" onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        {/* Search row: Input + Filter button */}
        <View style={styles.searchRow}>
          <View style={styles.searchInputWrapper}>
            <Input
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Tìm kiếm tên lô đất, KCN..."
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
          renderItem={({ item }) => <LandFundCard item={item} navigation={navigation} />}
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
          <TouchableOpacity 
            activeOpacity={1} 
            style={styles.filterModal}
          >
            <ScrollView 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.modalScrollContent}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Bộ lọc nâng cao</Text>
                <TouchableOpacity onPress={() => setIsFilterVisible(false)}>
                  <Icon name="x" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.filterField}>
                <Text style={styles.filterLabel}>Khu công nghiệp</Text>
                <TouchableOpacity style={styles.dropdownInput}>
                  <Text style={styles.dropdownPlaceholder}>{selectedZone || '- Chọn -'}</Text>
                  <Ionicons name="chevron-down" size={18} color={colors.textTertiary} />
                </TouchableOpacity>
              </View>

              <View style={styles.filterField}>
                <Text style={styles.filterLabel}>Diện tích (Từ - Đến)</Text>
                <View style={styles.rangeRow}>
                  <TextInput 
                    style={styles.rangeInput} 
                    placeholder="Từ" 
                    value={areaFrom}
                    onChangeText={setAreaFrom}
                    placeholderTextColor={colors.textTertiary} 
                    keyboardType="numeric"
                  />
                  <TextInput 
                    style={styles.rangeInput} 
                    placeholder="Đến" 
                    value={areaTo}
                    onChangeText={setAreaTo}
                    placeholderTextColor={colors.textTertiary} 
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={styles.filterField}>
                <Text style={styles.filterLabel}>Tình trạng quỹ đất</Text>
                <TouchableOpacity style={styles.dropdownInput}>
                  <Text style={styles.dropdownPlaceholder}>- Chọn -</Text>
                  <Ionicons name="chevron-down" size={18} color={colors.textTertiary} />
                </TouchableOpacity>
              </View>

              <View style={styles.filterField}>
                <Text style={styles.filterLabel}>Tình trạng công bố</Text>
                <TouchableOpacity style={styles.dropdownInput}>
                  <Text style={styles.dropdownPlaceholder}>- Chọn -</Text>
                  <Ionicons name="chevron-down" size={18} color={colors.textTertiary} />
                </TouchableOpacity>
              </View>
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.modalFooterBtn} onPress={handleReset}>
                <View style={styles.iconWrapper}>
                  <Ionicons name="reload" size={16} color="#8B1A1A" />
                </View>
                <Text style={styles.modalFooterBtnText}>Nhập lại</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.modalFooterBtn} onPress={() => setIsFilterVisible(false)}>
                <View style={styles.iconWrapper}>
                  <Ionicons name="close" size={20} color="#8B1A1A" />
                </View>
                <Text style={styles.modalFooterBtnText}>Đóng</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.modalFooterBtn, styles.modalFooterBtnPrimary]}
                onPress={() => setIsFilterVisible(false)}
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
  cardContainer: {
    marginBottom: spacing.lg,
    position: 'relative',
    zIndex: 1,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: spacing.borderRadius.lg,
    padding: spacing.md,
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
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  statusGroup: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardBody: {
    marginBottom: 12,
    gap: 6,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 13,
    color: colors.textMuted,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  viewDetailText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '500',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    gap: 6,
  },
  actionText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.primary,
  },
  moreActionBtn: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popoverMenu: {
    position: 'absolute',
    bottom: 54,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 100,
    minWidth: 160,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 10,
  },
  menuText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
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
