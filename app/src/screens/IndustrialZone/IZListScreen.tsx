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
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { Input } from '../../components/shared/Input';
import { Badge } from '../../components/shared/Badge';
import { ZoneListItem, ZONE_CONFIG, getZoneMockData } from '../../data/zoneTypes';

type Props = NativeStackScreenProps<RootStackParamList, 'IZList'>;

export const IZListScreen: React.FC<Props> = ({ navigation, route }) => {
  const zoneType = route.params?.zoneType ?? 'kcn';
  const config = ZONE_CONFIG[zoneType];
  const mockData = getZoneMockData(zoneType);

  const [searchText, setSearchText] = useState('');

  const filteredData = mockData.list.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase()),
  );

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
    gap: spacing.sm,                             // 8px
    marginBottom: spacing.lg,                    // 16px
  },
  searchInput: {
    flex: 1,
  },
  filterButton: {
    width: 40,                                   // ~39.993px
    height: 40,
    backgroundColor: colors.surface,             // white
    borderWidth: spacing.borderWidth.thin,        // 1px
    borderColor: colors.border,                  // rgba(0,0,0,0.1)
    borderRadius: spacing.borderRadius.md,        // 8px
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIcon: {
    fontSize: spacing.icon.sm,                   // 16px
    color: colors.textPrimary,
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
    padding: spacing.lg,                         // 16px
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
});
