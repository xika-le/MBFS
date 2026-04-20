/**
 * ProcedureListScreen — UC 99: Tra cứu thủ tục hành chính
 * Figma node: 1477:6 (List view)
 *
 * Layout: Header (primary bg) + SearchBar + ScrollView with procedure cards
 * Card: title (14px medium), key-value rows (Mã thủ tục, Lĩnh vực, Cơ quan)
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

// --- Types ---
interface Procedure {
  id: string;
  title: string;
  code: string;
  field: string;
  agency: string;
  level: string;
}

// --- Mock Data ---
const MOCK_PROCEDURES: Procedure[] = [
  {
    id: '1',
    title: 'Thủ tục đăng ký đầu tư dự án mới',
    code: 'TT-001-2024',
    field: 'Đầu tư',
    agency: 'Bộ Kế hoạch và Đầu tư',
    level: 'Trung ương',
  },
  {
    id: '2',
    title: 'Thủ tục cấp Giấy chứng nhận đăng ký doanh nghiệp',
    code: 'TT-002-2024',
    field: 'Doanh nghiệp',
    agency: 'Sở Kế hoạch và Đầu tư',
    level: 'Tỉnh',
  },
  {
    id: '3',
    title: 'Thủ tục cấp phép xây dựng công trình',
    code: 'TT-003-2024',
    field: 'Xây dựng',
    agency: 'Sở Xây dựng',
    level: 'Tỉnh',
  },
  {
    id: '4',
    title: 'Thủ tục đăng ký đầu tư ra nước ngoài',
    code: 'TT-004-2024',
    field: 'Đầu tư quốc tế',
    agency: 'Bộ Kế hoạch và Đầu tư',
    level: 'Trung ương',
  },
  {
    id: '5',
    title: 'Thủ tục cấp giấy phép môi trường',
    code: 'TT-005-2024',
    field: 'Môi trường',
    agency: 'Sở Tài nguyên và Môi trường',
    level: 'Tỉnh',
  },
];

// --- Procedure Card ---
const ProcedureCard: React.FC<{ item: Procedure; onPress: () => void }> = ({
  item,
  onPress,
}) => (
  <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress}>
    <Text style={styles.cardTitle} numberOfLines={2}>
      {item.title}
    </Text>

    <View style={styles.infoRows}>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Mã thủ tục:</Text>
        <Text style={styles.infoValue}>{item.code}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Lĩnh vực:</Text>
        <Text style={styles.infoValue}>{item.field}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Cơ quan:</Text>
        <Text style={styles.infoValue}>{item.agency}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

// --- Main Screen ---
const ProcedureListScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProcedures = MOCK_PROCEDURES.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.code.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.headerBackBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Thủ tục hành chính</Text>
        </View>
        <TouchableOpacity style={styles.headerBellBtn}>
          <Ionicons name="notifications-outline" size={20} color="#fff" />
          <View style={styles.bellDot} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons
            name="search"
            size={20}
            color="rgba(10,10,10,0.5)"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Nhập mã, tên thủ tục..."
            placeholderTextColor="rgba(10,10,10,0.5)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Procedure List */}
      <ScrollView
        style={styles.listScroll}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredProcedures.map((item) => (
          <ProcedureCard
            key={item.id}
            item={item}
            onPress={() =>
              (navigation as any).navigate('ProcedureDetail', {
                id: item.id,
                title: item.title,
                code: item.code,
                field: item.field,
                agency: item.agency,
                level: item.level,
              })
            }
          />
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProcedureListScreen;

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },

  // Header — Figma: #8b1a1a, 64px, title center-ish, bell icon right
  header: {
    height: 64,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  headerBackBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semiBold,
    color: '#fff',
    lineHeight: 24,
  },
  headerBellBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bellDot: {
    position: 'absolute',
    top: 8,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 9999,
    backgroundColor: '#fdc700',
  },

  // Search — Figma: bg #f6f6f6, rounded 10, pl 40
  searchContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: spacing.lg,
    paddingTop: 10,
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    borderRadius: 10,
    height: 44,
    paddingHorizontal: spacing.lg,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.fontSize.lg,
    color: '#0a0a0a',
    letterSpacing: -0.3125,
  },

  // List
  listScroll: {
    flex: 1,
  },
  listContent: {
    padding: spacing.lg,
    gap: spacing.md,
  },

  // Card — Figma: white bg, rounded 14, shadow
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: '#0a0a0a',
    lineHeight: 20,
    letterSpacing: -0.15,
    marginBottom: spacing.md,
  },
  infoRows: {
    gap: spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 16,
  },
  infoLabel: {
    width: 128,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    color: '#4a5565',
    lineHeight: 16,
  },
  infoValue: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    color: '#101828',
    lineHeight: 16,
  },
});
