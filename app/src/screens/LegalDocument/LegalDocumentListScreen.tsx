import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { Badge, Input, Header, Card, Button } from '../../components/shared';

/**
 * UC 98 - Tra cứu văn bản pháp luật
 * Layout: Giữ nguyên layout cũ (Card style ban đầu)
 * Add: Advanced Filter, View Mode Toggle, Full Text Area
 */

interface LegalDoc {
  id: string;
  type: string;
  status: string;
  title: string;
  symbol: string;
  publishDate: string;
  effectiveDate: string;
  agency: string;
  fullText?: string;
}

const MOCK_DATA: LegalDoc[] = [
  {
    id: '1',
    type: 'Quyết định',
    status: 'Còn hiệu lực',
    title: 'Quyết định về việc ban hành Quy chế quản lý đầu tư',
    symbol: '50/2020/QĐ-TTg',
    publishDate: '21/09/2020',
    effectiveDate: '21/09/2020',
    agency: 'Thủ tướng Chính phủ',
    fullText: `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc\n----------\nSố: 155/2025/NĐ-CP      Hà Nội, ngày 16 tháng 6 năm 2025\n\nNGHỊ ĐỊNH\nQUY ĐỊNH TIÊU CHUẨN, ĐỊNH MỨC SỬ DỤNG TRỤ SỞ LÀM VIỆC, CƠ SỞ HOẠT ĐỘNG SỰ NGHIỆP...`,
  },
  {
    id: '2',
    type: 'Nghị định',
    status: 'Còn hiệu lực',
    title: 'Nghị định về đầu tư theo phương thức đối tác công',
    symbol: '31/2021/NĐ-CP',
    publishDate: '26/03/2021',
    effectiveDate: '15/05/2021',
    agency: 'Chính phủ',
    fullText: `Nội dung toàn văn Nghị định về đầu tư theo phương thức đối tác công tư (PPP)...`,
  },
  {
    id: '3',
    type: 'Nghị định',
    status: 'Còn hiệu lực',
    title: 'Nghị định về thực hiện thủ tục hành chính trên môi trường điện tử',
    symbol: '61/2020/NĐ-CP',
    publishDate: '27/05/2020',
    effectiveDate: '15/07/2020',
    agency: 'Chính phủ',
  }
];

export default function LegalDocumentListScreen() {
  const navigation: any = useNavigation();
  const [viewMode, setViewMode] = useState<'summary' | 'fulltext'>('summary');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Filter states
  const [agency, setAgency] = useState('');
  const [docType, setDocType] = useState('');

  const renderItem = ({ item }: { item: LegalDoc }) => (
    <Card style={styles.card}>
      <View style={styles.badgeRow}>
        <Badge label={item.type} variant="info" />
        <Badge label={item.status} variant="success" />
      </View>
      
      <Text style={styles.cardTitle}>{item.title}</Text>
      
      <View style={styles.infoRow}>
        <Text style={styles.infoText}>Trích yếu: {item.symbol}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoText}>Ban hành: {item.publishDate} | Hiệu lực: {item.effectiveDate}</Text>
      </View>
      
      <View style={styles.cardFooter}>
        <Text style={styles.agencyText}>{item.agency}</Text>
        <Button 
          title="Xem chi tiết →" 
          type="outline" 
          onPress={() => navigation.navigate('LegalDocumentDetail')} 
          style={styles.detailButton} 
          textStyle={styles.detailButtonText}
        />
      </View>

      {/* NEW: Full Text Area when mode is 'fulltext' */}
      {viewMode === 'fulltext' && item.fullText && (
        <View style={styles.fullTextContainer}>
          <View style={styles.fullTextHeader}>
            <Text style={styles.fullTextSubtitle}>Nội dung toàn văn</Text>
          </View>
          <ScrollView style={styles.fullTextScroll} nestedScrollEnabled>
            <Text style={styles.fullTextContent}>{item.fullText}</Text>
          </ScrollView>
        </View>
      )}
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header — Standardized shared component */}
      <Header title="Văn bản pháp luật" onBack={() => navigation.goBack()} />

      <View style={styles.mainContent}>
        {/* Search & Filter Bar - Now on top */}
        <View style={styles.searchRow}>
          <View style={styles.searchInputWrapper}>
            <Input 
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Nhập điều kiện tìm kiếm..."
            />
          </View>
          <TouchableOpacity style={styles.filterBtn} onPress={() => setIsFilterVisible(true)}>
            <Ionicons name="filter" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Type Selection (Tabs) - Now below search */}
        <View style={styles.typeSwitchRow}>
          <TouchableOpacity 
            style={styles.radioItem} 
            onPress={() => setViewMode('summary')}
          >
            <View style={styles.radioOuter}>
              {viewMode === 'summary' && <View style={styles.radioInner} />}
            </View>
            <Text style={[styles.radioLabel, viewMode === 'summary' && styles.radioLabelActive]}>
              Số hiệu, Trích yếu
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.radioItem} 
            onPress={() => setViewMode('fulltext')}
          >
            <View style={styles.radioOuter}>
              {viewMode === 'fulltext' && <View style={styles.radioInner} />}
            </View>
            <Text style={[styles.radioLabel, viewMode === 'fulltext' && styles.radioLabelActive]}>
              Toàn văn
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={MOCK_DATA}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>

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
            <ScrollView 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.modalScrollContent}
            >
              <View style={styles.filterGrid}>
                <View style={styles.filterCol}>
                  <Text style={styles.modalLabel}>Cơ quan ban hành</Text>
                  <TextInput style={styles.modalInput} placeholder="Cơ quan ban hành" value={agency} onChangeText={setAgency} />
                </View>
                <View style={styles.filterCol}>
                  <Text style={styles.modalLabel}>Khoảng ngày ban hành</Text>
                  <View style={styles.dateRangePicker}>
                    <Text style={styles.dateRangeText}>Từ ngày → Đến ngày</Text>
                    <Ionicons name="calendar-outline" size={18} color="#999" />
                  </View>
                </View>
                <View style={styles.filterCol}>
                  <Text style={styles.modalLabel}>Loại văn bản</Text>
                  <View style={styles.modalPicker}>
                    <Text style={styles.pickerPlaceholder}>{docType || 'Chọn loại văn bản'}</Text>
                    <Ionicons name="chevron-down" size={16} color="#999" />
                  </View>
                </View>
                <View style={styles.filterCol}>
                  <Text style={styles.modalLabel}>Trạng thái</Text>
                  <View style={styles.modalPicker}>
                    <Text style={styles.pickerPlaceholder}>Chọn trạng thái</Text>
                    <Ionicons name="chevron-down" size={16} color="#999" />
                  </View>
                </View>
              </View>
            </ScrollView>
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalFooterBtn}
                onPress={() => {
                  setAgency('');
                  setDocType('');
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
    backgroundColor: '#F7F8F9',
  },
  mainContent: {
    flex: 1,
    padding: spacing.md,
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
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeSwitchRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: spacing.md,
    paddingLeft: 4,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#94A3B8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  radioLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  radioLabelActive: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
  listContent: {
    paddingBottom: spacing.xxl,
  },
  card: {
    marginBottom: spacing.md,
    padding: spacing.md,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1E293B',
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  infoRow: {
    marginBottom: spacing.sm,
  },
  infoText: {
    fontSize: 13,
    color: '#64748B',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  agencyText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  detailButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    height: 32,
    borderRadius: 6,
  },
  detailButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  // Full Text Style
  fullTextContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginTop: 16,
    padding: 12,
  },
  fullTextHeader: {
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  fullTextSubtitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  fullTextScroll: {
    maxHeight: 250,
  },
  fullTextContent: {
    fontSize: 13,
    lineHeight: 20,
    color: '#334155',
    textAlign: 'justify',
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
  },
  // Modal Filter
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
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
    padding: 24,
  },
  filterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  filterCol: {
    width: '47%',
  },
  modalLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 6,
  },
  modalInput: {
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 10,
    fontSize: 13,
  },
  dateRangePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 10,
  },
  dateRangeText: {
    fontSize: 11,
    color: '#94A3B8',
  },
  modalPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 10,
  },
  pickerPlaceholder: {
    fontSize: 13,
    color: '#94A3B8',
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
