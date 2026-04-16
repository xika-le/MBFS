import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { TabBar, Badge, Input, Header } from '../../components/shared';

type RootStackParamList = {
  ComplaintList: undefined;
  CreateComplaint: undefined;
  ComplaintDetail: { id: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Complaint {
  id: string;
  code: string;
  title: string;
  agency: string;
  date: string;
  status: 'processing' | 'replied' | 'closed' | 'rejected' | 'draft';
  statusText: string;
}

const COMPLAINTS: Complaint[] = [
  {
    id: '1',
    code: 'PAKN-2024-001234',
    title: 'Kiến nghị về thủ tục cấp phép đầu tư tại Hà Nội',
    agency: 'Cục Đầu tư nước ngoài',
    date: '15/03/2024',
    status: 'processing',
    statusText: 'Đang xử lý',
  },
  {
    id: '2',
    code: 'PAKN-2024-001198',
    title: 'Phản ánh về chính sách ưu đãi thuế doanh nghiệp FDI',
    agency: 'Cục Đầu tư nước ngoài',
    date: '10/03/2024',
    status: 'replied',
    statusText: 'Đã trả lời',
  },
  {
    id: '3',
    code: 'PAKN-2024-001055',
    title: 'Góp ý quy định về điều kiện kinh doanh có điều kiện',
    agency: 'Bộ công thương',
    date: '01/03/2024',
    status: 'closed',
    statusText: 'Đã đóng',
  },
  {
    id: '4',
    code: 'PAKN-2024-000987',
    title: 'Kiến nghị về thủ tục hải quan hàng hóa xuất nhập khẩu',
    agency: 'Cục Đầu tư nước ngoài',
    date: '22/02/2024',
    status: 'rejected',
    statusText: 'Từ chối',
  },
  {
    id: '5',
    code: 'PAKN-2024-000876',
    title: 'Phản ánh hành vi hành chính của cơ quan cấp phép đầu tư',
    agency: 'UBND TP. HCM',
    date: '14/02/2024',
    status: 'processing',
    statusText: 'Đang xử lý',
  },
];

const TABS = [
  { id: 'all', title: 'Tất cả' },
  { id: 'processing', title: 'Đang xử lý' },
  { id: 'replied', title: 'Đã trả lời' },
  { id: 'closed', title: 'Đã đóng' },
  { id: 'draft', title: 'Nháp' },
];

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'processing': return 'Đang xử lý';
    case 'replied': return 'Đã trả lời';
    case 'closed': return 'Đã đóng';
    case 'rejected': return 'Từ chối';
    case 'draft': return 'Nháp';
    default: return 'Gửi mới';
  }
};

const getBadgeVariant = (status: string): 'info' | 'success' | 'warning' | 'danger' | 'warningAlt' => {
  switch (status) {
    case 'processing': return 'info';
    case 'replied': return 'success';
    case 'closed': return 'info';
    case 'rejected': return 'danger';
    case 'draft': return 'warning';
    default: return 'info';
  }
};

export default function ComplaintListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [activeTab, setActiveTab] = useState('all');
  const [searchText, setSearchText] = useState('');

  const filteredData = COMPLAINTS.filter(item => {
    const matchSearch = item.code.toLowerCase().includes(searchText.toLowerCase()) || 
                      item.title.toLowerCase().includes(searchText.toLowerCase());
    const matchTab = activeTab === 'all' || item.status === activeTab;
    return matchSearch && matchTab;
  });

  const renderItem = ({ item }: { item: Complaint }) => {
    return (
      <TouchableOpacity 
        style={styles.card}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('ComplaintDetail', { id: item.id })}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.codeText}>{item.code}</Text>
          <Badge label={getStatusLabel(item.status)} variant={getBadgeVariant(item.status)} />
        </View>

        <Text style={styles.complaintTitle} numberOfLines={2}>
          {item.title}
        </Text>

        <View style={styles.cardFooter}>
          <View style={styles.footerInfo}>
            <View style={styles.infoRow}>
              <Ionicons name="business" size={12} color={colors.textSecondary} />
              <Text style={styles.footerText}>{item.agency}</Text>
            </View>
            <View style={[styles.infoRow, { marginTop: 4 }]}>
              <Ionicons name="calendar-outline" size={12} color={colors.textTertiary} />
              <Text style={[styles.footerText, { color: colors.textTertiary }]}>{item.date}</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.textTertiary} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      
      {/* Header — Standardized shared component */}
      <Header title="Phản ánh kiến nghị" onBack={() => navigation.goBack()} />

      <View style={styles.container}>
        {/* Search row - Now on top */}
        <View style={styles.searchRow}>
          <View style={styles.searchInput}>
            <Input
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Tìm kiếm phản ánh..."
            />
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <Feather name="filter" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Tab Bar below search bar */}
        <TabBar
          tabs={TABS.map(t => ({ key: t.id, label: t.title }))}
          activeKey={activeTab}
          onTabPress={setActiveTab}
        />

        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Không tìm thấy phản ánh nào</Text>
            </View>
          }
        />
      </View>

      {/* FAB - Floating Action Button for creation */}
      <TouchableOpacity 
        style={styles.fab}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('CreateComplaint')}
      >
        <Ionicons name="add" size={24} color="white" />
        <Text style={styles.fabText}>Gửi phản ánh</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

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
  listContent: {
    paddingBottom: 100, // Space for FAB
    gap: spacing.md,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
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
    marginBottom: 12,
  },
  codeText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.primary,
  },
  complaintTitle: {
    fontSize: typography.fontSize.sm + 1,
    fontWeight: typography.fontWeight.semiBold,
    color: '#1E2939',
    marginBottom: 12,
    lineHeight: 18,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
  },
  footerInfo: {
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyText: {
    marginTop: 12,
    fontSize: typography.fontSize.sm,
    color: colors.textTertiary,
    fontFamily: typography.fontFamily,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 16,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 48,
    borderRadius: 24,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  fabText: {
    color: 'white',
    fontSize: 13,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.semiBold,
    marginLeft: 8,
  },
});
