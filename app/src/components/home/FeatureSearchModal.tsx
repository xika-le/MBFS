import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  SectionList,
  SafeAreaView,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { Icon } from '../shared';

interface FeatureItem {
  label: string;
  route: string;
  params?: any;
  category: string;
  icon: string;
}

const SEARCHABLE_FEATURES: FeatureItem[] = [
    // Giới thiệu
    { label: 'Cục Đầu tư nước ngoài', icon: 'info', route: 'About', category: 'Giới thiệu' },
    { label: 'Lĩnh vực đầu tư', icon: 'grid', route: 'SectorList', category: 'Giới thiệu' },
    { label: 'Khu vực đầu tư', icon: 'map', route: 'AreaList', category: 'Giới thiệu' },
    { label: 'Chính sách đầu tư', icon: 'file-text', route: 'PolicyNews', category: 'Giới thiệu' },
    { label: 'Liên hệ', icon: 'phone', route: 'Contact', category: 'Giới thiệu' },

    // Dịch vụ
    { label: 'Thủ tục về đầu tư', icon: 'clipboard', route: 'ProcedureList', category: 'Dịch vụ' },
    { label: 'Quản lý hồ sơ', icon: 'folder', route: 'DossierList', category: 'Dịch vụ' },
    { label: 'Quản lý đặt lịch', icon: 'calendar', route: 'AppointmentList', category: 'Dịch vụ' },
    { label: 'Phản ánh kiến nghị', icon: 'message-square', route: 'ComplaintList', category: 'Dịch vụ' },

    // Khu công nghiệp / KKT
    { label: 'Khu công nghiệp', icon: 'layers', route: 'IZList', params: { zoneType: 'kcn' }, category: 'Khu công nghiệp / KKT' },
    { label: 'KCN sinh thái', icon: 'wind', route: 'IZList', params: { zoneType: 'kcnst' }, category: 'Khu công nghiệp / KKT' },
    { label: 'Khu thương mại tự do', icon: 'refresh-cw', route: 'IZList', params: { zoneType: 'ktmtd' }, category: 'Khu công nghiệp / KKT' },
    { label: 'Khu kinh tế', icon: 'globe', route: 'IZList', params: { zoneType: 'kkt' }, category: 'Khu công nghiệp / KKT' },
    { label: 'Mô hình khu khác', icon: 'grid', route: 'IZList', params: { zoneType: 'mhk' }, category: 'Khu công nghiệp / KKT' },
    { label: 'Khu phi thuế quan', icon: 'shield', route: 'IZList', params: { zoneType: 'kptq' }, category: 'Khu công nghiệp / KKT' },
    { label: 'Thông tin quỹ đất', icon: 'map', route: 'LandFundList', category: 'Khu công nghiệp / KKT' },
    { label: 'Quản lý cho thuê đất', icon: 'clipboard', route: 'RentalList', category: 'Khu công nghiệp / KKT' },

    // Tin tức & Tra cứu
    { label: 'Tin tức đầu tư', icon: 'globe', route: 'InvestmentNews', category: 'Tin tức & Tra cứu' },
    { label: 'Văn bản pháp luật', icon: 'book-open', route: 'LegalDocumentList', category: 'Tin tức & Tra cứu' },
    { label: 'Câu chuyện thành công', icon: 'award', route: 'SuccessStory', category: 'Tin tức & Tra cứu' },
    { label: 'FAQ - Câu hỏi thường gặp', icon: 'help-circle', route: 'FAQHome', category: 'Tin tức & Tra cứu' },
    { label: 'Hướng dẫn sử dụng', icon: 'book', route: 'HelpGuide', category: 'Tin tức & Tra cứu' },
];

const CATEGORY_ICONS: Record<string, string> = {
  'Giới thiệu': 'info',
  'Dịch vụ': 'briefcase',
  'Khu công nghiệp / KKT': 'layers',
  'Tin tức & Tra cứu': 'globe',
};

interface FeatureSection {
  title: string;
  icon: string;
  data: FeatureItem[];
}

function buildSections(features: FeatureItem[]): FeatureSection[] {
  const categoryOrder = ['Giới thiệu', 'Dịch vụ', 'Khu công nghiệp / KKT', 'Tin tức & Tra cứu'];
  const grouped: Record<string, FeatureItem[]> = {};
  for (const f of features) {
    if (!grouped[f.category]) grouped[f.category] = [];
    grouped[f.category].push(f);
  }
  return categoryOrder
    .filter((cat) => grouped[cat]?.length)
    .map((cat) => ({
      title: cat,
      icon: CATEGORY_ICONS[cat] || 'folder',
      data: grouped[cat],
    }));
}

interface FeatureSearchModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectFeature: (route: string, params?: any) => void;
}

export const FeatureSearchModal: React.FC<FeatureSearchModalProps> = ({
  visible,
  onClose,
  onSelectFeature,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFeatures = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return SEARCHABLE_FEATURES;
    return SEARCHABLE_FEATURES.filter(
      (f) =>
        f.label.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  const sections = useMemo(() => buildSections(filteredFeatures), [filteredFeatures]);

  const handleSelect = (item: FeatureItem) => {
    onSelectFeature(item.route, item.params);
    onClose();
    setSearchQuery('');
  };

  const renderItem = ({ item }: { item: FeatureItem }) => (
    <TouchableOpacity style={styles.featureRow} onPress={() => handleSelect(item)}>
      <View style={styles.iconContainer}>
        <Icon name={item.icon as any} size={20} color={colors.primary} />
      </View>
      <Text style={styles.featureLabel} numberOfLines={1}>{item.label}</Text>
      <Icon name="chevron-right" size={16} color={colors.textTertiary} />
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section }: { section: FeatureSection }) => (
    <View style={styles.sectionHeader}>
      <Icon name={section.icon as any} size={16} color={colors.primary} />
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <Text style={styles.sectionCount}>{section.data.length}</Text>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <View style={styles.searchInputWrapper}>
            <View style={styles.searchIconWrapper}>
              <Icon name="search" size={20} color={colors.textTertiary} />
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm kiếm tính năng..."
              placeholderTextColor={colors.textTertiary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Icon name="x-circle" size={18} color={colors.textTertiary} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {searchQuery.trim().length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <Icon name="search" size={48} color={colors.textTertiary} />
            </View>
            <Text style={styles.emptyTitle}>Tìm kiếm tính năng</Text>
            <Text style={styles.emptySubtitle}>
              Nhập từ khóa để tìm danh mục, dịch vụ...
            </Text>
          </View>
        ) : filteredFeatures.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <Icon name="search" size={48} color={colors.textTertiary} />
            </View>
            <Text style={styles.emptyTitle}>Không tìm thấy kết quả</Text>
            <Text style={styles.emptySubtitle}>
              Thử tìm với từ khóa khác
            </Text>
          </View>
        ) : (
          <SectionList
            sections={sections}
            keyExtractor={(item, index) => `${item.route}-${index}`}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            contentContainerStyle={styles.listContent}
            stickySectionHeadersEnabled={false}
          />
        )}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    gap: 12,
  },
  backButton: {
    padding: 4,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIconWrapper: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: colors.textPrimary,
  },
  listContent: {
    padding: spacing.md,
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionCount: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textTertiary,
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: `${colors.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 120,
  },
  emptyIconContainer: {
    marginBottom: 16,
    opacity: 0.4,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textTertiary,
  },
});
