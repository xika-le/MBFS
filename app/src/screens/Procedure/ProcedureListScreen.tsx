import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { Header, Card, Badge } from '../../components/shared';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const STATUS_TABS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'central', label: 'Cấp Trung ương' },
  { id: 'province', label: 'Cấp Tỉnh' },
  { id: 'district', label: 'Cấp Huyện' },
  { id: 'commune', label: 'Cấp Xã' },
];

const PROCEDURES = [
  {
    id: '1',
    title: 'Cấp Giấy chứng nhận đăng ký đầu tư',
    agency: 'Bộ KH&ĐT',
    status: 'Đang áp dụng',
    duration: '15 ngày làm việc',
    dossierCount: '8 hồ sơ',
  },
  {
    id: '2',
    title: 'Điều chỉnh Giấy chứng nhận đăng ký đầu tư',
    agency: 'Bộ KH&ĐT',
    status: 'Đang áp dụng',
    duration: '10 ngày làm việc',
    dossierCount: '6 hồ sơ',
  },
  {
    id: '3',
    title: 'Cấp lại Giấy chứng nhận đăng ký đầu tư',
    agency: 'Sở KH&ĐT',
    status: 'Đang áp dụng',
    duration: '5 ngày làm việc',
    dossierCount: '4 hồ sơ',
  },
  {
    id: '4',
    title: 'Thủ tục chấm dứt hoạt động dự án đầu tư',
    agency: 'Bộ KH&ĐT',
    status: 'Đang áp dụng',
    duration: '15 ngày làm việc',
    dossierCount: '7 hồ sơ',
  },
];

const ProcedureCard = ({ procedure, onPress }: any) => (
  <Card style={styles.card}>
    <View style={styles.badgeRow}>
      <Badge 
        label={procedure.agency} 
        variant="info" 
        style={styles.agencyBadge}
      />
      <Badge 
        label={procedure.status} 
        variant="success" 
      />
    </View>
    
    <Text style={styles.cardTitle}>{procedure.title}</Text>
    
    <View style={styles.metaRow}>
      <View style={styles.metaItem}>
        <MaterialCommunityIcons name="clock-outline" size={14} color={colors.textSecondary} style={{ marginRight: 6 }} />
        <Text style={styles.metaText}>{procedure.duration}</Text>
      </View>
      <View style={styles.metaItem}>
        <MaterialCommunityIcons name="file-document-outline" size={14} color={colors.textSecondary} style={{ marginRight: 6 }} />
        <Text style={styles.metaText}>{procedure.dossierCount}</Text>
      </View>
    </View>    
    <View style={styles.divider} />
    
    <TouchableOpacity onPress={onPress} style={styles.actionButton}>
      <Text style={styles.actionText}>Xem chi tiết</Text>
      <Text style={styles.actionArrow}>→</Text>
    </TouchableOpacity>
  </Card>
);

const ProcedureListScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <Header 
        title="Thủ tục Hành chính" 
        onBack={() => navigation.goBack()} 
      />
      
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <MaterialCommunityIcons name="magnify" size={20} color={colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm thủ tục hành chính..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={colors.textSecondary}
          />
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.tabContainer}
          contentContainerStyle={styles.tabContent}
        >
          {STATUS_TABS.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tabPill,
                activeTab === tab.id && styles.tabPillActive
              ]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text style={[
                styles.tabLabel,
                activeTab === tab.id && styles.tabLabelActive
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView 
        style={styles.listContainer} 
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {PROCEDURES.map((procedure) => (
          <ProcedureCard 
            key={procedure.id} 
            procedure={procedure}
            onPress={() => {}}
          />
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchSection: {
    backgroundColor: '#fff',
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    marginHorizontal: spacing.lg,
    paddingHorizontal: spacing.md,
    borderRadius: 12, // More rounded like Figma cards
    height: 44,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: spacing.sm,
    opacity: 0.7,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
  },
  tabContainer: {
    marginTop: spacing.md,
  },
  tabContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xs,
  },
  tabPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: spacing.sm,
  },
  tabPillActive: {
    backgroundColor: colors.primary,
  },
  tabLabel: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
  },
  tabLabelActive: {
    color: '#fff',
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: spacing.lg,
  },
  card: {
    marginBottom: spacing.md,
    padding: spacing.lg,
    borderRadius: spacing.borderRadius.lg,
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  agencyBadge: {
    marginRight: spacing.xs,
  },
  cardTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  metaIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  metaText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginBottom: spacing.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.primary,
    marginRight: 6,
  },
  actionArrow: {
    fontSize: 16,
    color: colors.primary,
    top: -1,
  },
});

export default ProcedureListScreen;
