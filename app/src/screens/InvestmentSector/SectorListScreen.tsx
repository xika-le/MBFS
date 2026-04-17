import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Modal,
  ScrollView,
  TextInput,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../theme';
import { Header, Card, Input } from '../../components/shared';

const SECTOR_MOCK_DATA = [
  { id: '1', title: 'Tin tức ngành', icon: 'file-text' },
  { id: '2', title: 'Công nghiệp hàng không vũ trụ', icon: 'send' },
  { id: '3', title: 'Công nghiệp pin', icon: 'battery' },
  { id: '4', title: 'Công nghiệp sáng tạo', icon: 'zap' },
  { id: '5', title: 'Dịch vụ tài chính', icon: 'dollar-sign' },
  { id: '6', title: 'Công nghệ thông tin và truyền thông (ICT)', icon: 'cpu' },
  { id: '7', title: 'Máy móc', icon: 'settings' },
  { id: '8', title: 'Công nghiệp năng lượng tái tạo', icon: 'sun' },
  { id: '9', title: 'Chất bán dẫn', icon: 'layers' },
  { id: '10', title: 'Du lịch', icon: 'map' },
  { id: '11', title: 'Khởi nghiệp', icon: 'rocket' },
  { id: '12', title: 'Phụ tùng ô tô', icon: 'package' },
  { id: '13', title: 'Doanh nghiệp tiêu dùng', icon: 'shopping-bag' },
  { id: '14', title: 'Công nghiệp hiển thị', icon: 'monitor' },
  { id: '15', title: 'Hóa chất tốt', icon: 'flask' },
  { id: '16', title: 'Hậu cần', icon: 'truck' },
  { id: '17', title: 'Dược phẩm & Công nghệ sinh học', icon: 'activity' },
  { id: '18', title: 'Người máy', icon: 'terminal' },
  { id: '19', title: 'Đóng tàu', icon: 'anchor' },
];

export default function SectorListScreen({ navigation }: any) {
  const [search, setSearch] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const filteredData = SECTOR_MOCK_DATA.filter(item => {
    return item.title.toLowerCase().includes(search.toLowerCase());
  });

  const renderSectorCard = ({ item }: { item: typeof SECTOR_MOCK_DATA[0] }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate('SectorNews', { sectorId: item.id, title: item.title })}
    >
      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <View style={[styles.iconContainer, { backgroundColor: `${colors.primary}10` }]}>
            <Feather name={item.icon as any} size={22} color={colors.primary} />
          </View>
          <Text style={styles.sectorTitle}>{item.title}</Text>
          <Feather name="chevron-right" size={18} color={colors.textTertiary} />
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header
        title="Lĩnh vực đầu tư"
        onBack={() => navigation.goBack()}
      />

      <View style={styles.topSection}>
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Input
              placeholder="Tìm kiếm lĩnh vực..."
              value={search}
              onChangeText={setSearch}
              leftIcon={<Feather name="search" size={18} color={colors.textSecondary} />}
            />
          </View>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => setIsFilterVisible(true)}
          >
            <Ionicons name="filter" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderSectorCard}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      // ListHeaderComponent={
      //   <Text style={styles.listHeader}>Danh sách lĩnh vực</Text>
      // }
      />

      {/* Filter Modal — Image 2 Style */}
      <Modal visible={isFilterVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsFilterVisible(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={styles.filterModal}
          >
            <ScrollView showsVerticalScrollIndicator={false} style={styles.modalBody}>
              <View style={styles.dateRangeRow}>
                <View style={[styles.filterCol, { marginRight: spacing.md }]}>
                  <Text style={styles.inputLabel}>Từ ngày</Text>
                  <View style={styles.dateInputWrapper}>
                    <TextInput
                      style={styles.dateInput}
                      placeholder="Chọn thời điểm"
                      placeholderTextColor="#999"
                      value={fromDate}
                      onChangeText={setFromDate}
                    />
                    <Ionicons name="calendar-outline" size={18} color="#999" />
                  </View>
                </View>
                <View style={styles.filterCol}>
                  <Text style={styles.inputLabel}>Đến ngày</Text>
                  <View style={styles.dateInputWrapper}>
                    <TextInput
                      style={styles.dateInput}
                      placeholder="Chọn thời điểm"
                      placeholderTextColor="#999"
                      value={toDate}
                      onChangeText={setToDate}
                    />
                    <Ionicons name="calendar-outline" size={18} color="#999" />
                  </View>
                </View>
              </View>
            </ScrollView>

              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={styles.modalFooterBtn}
                  onPress={() => {
                    setFromDate('');
                    setToDate('');
                  }}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC'
  },
  topSection: {
    backgroundColor: colors.surface,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  searchBox: {
    flex: 1,
  },
  filterBtn: {
    width: 44,
    height: 44,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  list: {
    padding: spacing.md,
    paddingBottom: 40,
  },
  listHeader: {
    fontSize: 14,
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectorTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  filterModal: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    maxHeight: '80%',
    width: '100%',
    overflow: 'hidden',
  },
  modalBody: {
    padding: spacing.lg,
  },
  dateRangeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterCol: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  dateInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 4,
    paddingHorizontal: 12,
    height: 44,
    backgroundColor: '#fff',
  },
  dateInput: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
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
