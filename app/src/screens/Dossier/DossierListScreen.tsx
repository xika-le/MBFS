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
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { Input } from '../../components/shared/Input';
import { TabBar } from '../../components/shared/TabBar';
import { Badge } from '../../components/shared/Badge';
import {
  DossierItem,
  DossierTabKey,
  DOSSIER_TABS,
  DOSSIER_STATUS_CONFIG,
  getDossiersByTab,
} from '../../data/dossierMocks';

type Props = NativeStackScreenProps<RootStackParamList, 'DossierList'>;

export const DossierListScreen: React.FC<Props> = () => {
  const [activeTab, setActiveTab] = useState<string>('tat_ca');
  const [searchText, setSearchText] = useState('');

  const currentData = getDossiersByTab(activeTab as DossierTabKey);
  const filteredData = currentData.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase()) ||
    item.hsCode.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleView = (item: DossierItem) => {
    Alert.alert('Chi tiết hồ sơ', `Mã: ${item.hsCode}\n${item.title}`);
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

        {/* View detail button */}
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
      {/* Tab Bar — 6 tabs, horizontal scroll */}
      <TabBar
        tabs={DOSSIER_TABS.map((t) => ({ key: t.key, label: t.label }))}
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
              placeholder="Tìm kiếm hồ sơ..."
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterIcon}>☰</Text>
          </TouchableOpacity>
        </View>

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
    padding: spacing.lg,
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
  hsCode: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.primary,                        // #8b1a1a (Figma)
  },
  typeCode: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,                  // #4a5565 (Figma)
  },
  cardTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,                    // #101828
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
    borderRadius: spacing.borderRadius.md,
    padding: spacing.sm,
    gap: spacing.xs,
  },
  reasonBoxWarning: {
    backgroundColor: colors.warningAltBg,         // #ffedd4 (Figma UC 78)
  },
  reasonBoxDanger: {
    backgroundColor: '#ffe2e2',                   // Red bg (Figma UC 80)
  },
  reasonLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semiBold,
  },
  reasonLabelWarning: {
    color: colors.warningAltText,                 // #ca3500
  },
  reasonLabelDanger: {
    color: '#c10007',                             // Red text (Figma UC 80)
  },
  reasonText: {
    fontSize: typography.fontSize.sm,
    lineHeight: typography.lineHeight.sm,
  },
  reasonTextWarning: {
    color: colors.warningAltText,                 // #ca3500
  },
  reasonTextDanger: {
    color: '#c10007',                             // Red text (Figma UC 80)
  },

  // === View Button ===
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
});
