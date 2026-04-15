import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

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

const getStatusStyles = (status: string) => {
  switch (status) {
    case 'processing':
      return { bg: '#FEFCE8', text: '#A65F00', border: '#FFF085', icon: 'time-outline' };
    case 'replied':
      return { bg: '#F0FDF4', text: '#008236', border: '#B9F8CF', icon: 'checkmark-circle-outline' };
    case 'closed':
      return { bg: '#F3F4F6', text: '#4A5565', border: '#E5E7EB', icon: 'close-circle-outline' };
    case 'rejected':
      return { bg: '#FEF2F2', text: '#C10007', border: '#FFC9C9', icon: 'alert-circle-outline' };
    default:
      return { bg: '#F3F4F6', text: '#4A5565', border: '#E5E7EB', icon: 'document-outline' };
  }
};

export default function ComplaintListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [activeTab, setActiveTab] = useState('all');
  const [searchText, setSearchText] = useState('');

  const renderItem = ({ item }: { item: Complaint }) => {
    const statusStyle = getStatusStyles(item.status);

    return (
      <TouchableOpacity 
        style={styles.card}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('ComplaintDetail', { id: item.id })}
      >
        <View style={styles.cardHeader}>
          <View style={styles.codeBadge}>
            <Text style={styles.codeText}>{item.code}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg, borderColor: statusStyle.border }]}>
            <Ionicons name={statusStyle.icon as any} size={12} color={statusStyle.text} style={styles.statusIcon} />
            <Text style={[styles.statusText, { color: statusStyle.text }]}>{item.statusText}</Text>
          </View>
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header section */}
      <View style={styles.header}>
        <View style={styles.navRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Phản ánh kiến nghị</Text>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="white" />
            <View style={styles.notifBadge} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Feather name="search" size={16} color={colors.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Nhập mã PAKN"
              placeholderTextColor={colors.textMuted}
              value={searchText}
              onChangeText={setSearchText}
            />
            <TouchableOpacity>
              <MaterialIcons name="tune" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={TABS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setActiveTab(item.id)}
                style={[
                  styles.tabItem,
                  activeTab === item.id && styles.activeTabItem,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === item.id && styles.activeTabText,
                  ]}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.tabList}
          />
        </View>
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.countText}>5 phản ánh kiến nghị</Text>
        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.sortText}>Mới nhất</Text>
          <Ionicons name="arrow-down" size={12} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={COMPLAINTS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* FAB - Floating Action Button */}
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
  container: {
    flex: 1,
    backgroundColor: '#F4F5F7',
  },
  header: {
    backgroundColor: colors.primary,
    paddingTop: spacing.xs,
    paddingBottom: spacing.sm,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    height: 48,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 16,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.semiBold,
  },
  notifBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FDC700',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  searchContainer: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.sm,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 13,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
  },
  tabContainer: {
    marginTop: spacing.sm,
  },
  tabList: {
    paddingHorizontal: spacing.md,
  },
  tabItem: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabItem: {
    borderBottomColor: '#FDC700',
  },
  tabText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 13,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.medium,
  },
  activeTabText: {
    color: '#FFDF20',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  countText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    fontSize: 12,
    color: colors.primary,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.medium,
    marginRight: 4,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: 100, // Space for FAB
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  codeBadge: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  codeText: {
    fontSize: 10,
    color: colors.primary,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.medium,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
    borderWidth: 1,
  },
  statusIcon: {
    marginRight: 4,
  },
  statusText: {
    fontSize: 10,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.medium,
  },
  complaintTitle: {
    fontSize: 14,
    color: '#1E2939',
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.medium,
    lineHeight: 20,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#F9FAFB',
    paddingTop: 12,
  },
  footerInfo: {
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.medium,
    marginLeft: 6,
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
