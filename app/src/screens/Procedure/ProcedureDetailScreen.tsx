/**
 * ProcedureDetailScreen — UC 99: Chi tiết thủ tục hành chính
 * Figma nodes: 1477:177 (Thông tin chung), 1477:318 (Trình tự thực hiện),
 *              1477:716 (Thành phần hồ sơ), 1477:888 (Cách thức thực hiện),
 *              1477:1065 (Căn cứ pháp lý)
 *
 * Layout: Header (primary + back + bell) → Title + Badge + Code → 5-tab ScrollView
 * Each tab has its own content rendered as white cards in ScrollView
 */

import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

// --- Types ---
type ProcedureDetailParams = {
  ProcedureDetail: {
    id: string;
    title: string;
    code: string;
    field: string;
    agency: string;
    level: string;
  };
};

type TabKey =
  | 'general'
  | 'process'
  | 'documents'
  | 'method'
  | 'legal';

interface TabItem {
  key: TabKey;
  label: string;
}

const TABS: TabItem[] = [
  { key: 'general', label: 'Thông tin chung' },
  { key: 'process', label: 'Trình tự thực hiện' },
  { key: 'documents', label: 'Thành phần hồ sơ' },
  { key: 'method', label: 'Cách thức thực hiện' },
  { key: 'legal', label: 'Căn cứ pháp lý' },
];

// --- Mock detail data ---
const MOCK_GENERAL = {
  procedureName: 'Thủ tục đăng ký đầu tư dự án mới',
  code: 'TT-001-2024',
  level: 'Trung ương',
  field: 'Đầu tư từ Việt Nam ra nước ngoài',
  procedureGroup:
    'TTHC không được luật giao cho địa phương quy định hoặc quy định chi tiết',
  executingAgency: 'Bộ Tài chính',
  target: 'Tổ chức, cá nhân có nhu cầu đầu tư',
  result: 'Giấy chứng nhận đăng ký đầu tư',
  dossierCount: '-',
  formName: 'Không có mẫu đơn cụ thể',
  requirements:
    '- Quốc hội chấp thuận chủ trương đầu tư ra nước ngoài đối với các dự án đầu tư sau đây:\n+ Dự án có vốn đầu tư ra nước ngoài từ 20.000 tỷ đồng trở lên;\n+ Dự án yêu cầu áp dụng cơ chế, chính sách đặc biệt cần được Quốc hội quyết định.',
  overviewAgency: 'Bộ Kế hoạch và Đầu tư',
  overviewDuration: '15 ngày làm việc',
};

const MOCK_PROCESS_STEPS = [
  'Nhà đầu tư nộp hồ sơ dự án đầu tư cho Bộ Tài chính; đồng thời đăng ký thông tin đầu tư trên Hệ thống thông tin quốc gia về đầu tư.',
  'Khi nhận được đủ hồ sơ dự án đầu tư, Bộ Tài chính báo cáo Thủ tướng Chính phủ thành lập Hội đồng thẩm định nhà nước.',
  'Hội đồng thẩm định nhà nước tổ chức thẩm định và lập báo cáo thẩm định gồm các nội dung quy định tại khoản 3 Điều 57 của Luật Đầu tư.',
  'Chính phủ gửi Hồ sơ chấp thuận chủ trương đầu tư ra nước ngoài đến cơ quan chủ trì thẩm tra của Quốc hội.',
  'Quốc hội xem xét, chấp thuận chủ trương đầu tư ra nước ngoài bao gồm các nội dung quy định tại khoản 8 Điều 57 của Luật Đầu tư.',
  'Bộ Tài chính cấp Giấy chứng nhận đăng ký đầu tư ra nước ngoài cho nhà đầu tư khi nhận được văn bản chấp thuận chủ trương đầu tư ra nước ngoài của Quốc hội.',
];

interface DocumentItem {
  name: string;
  original?: number;
  copy?: number;
  hasTemplate?: boolean;
}

const MOCK_DOCUMENTS: DocumentItem[] = [
  { name: 'Văn bản đăng ký đầu tư ra nước ngoài', original: 1, copy: 19, hasTemplate: true },
  {
    name: 'Tài liệu xác nhận địa điểm thực hiện dự án đầu tư đối với các dự án đầu tư sau đây:\na) Dự án thuộc diện Thủ tướng Chính phủ hoặc Quốc hội chấp thuận chủ trương đầu tư ra nước ngoài\nb) Dự án năng lượng\nc) Dự án chăn nuôi trồng trọt trồng rừng nuôi trồng thủy sản\nd) Dự án khảo sát thăm dò khai thác và chế biến khoáng sản\nđ) Dự án có xây dựng nhà máy cơ sở sản xuất chế biến chế tạo\ne) Dự án đầu tư xây dựng công trình cơ sở hạ tầng dự án đầu tư kinh doanh bất động sản',
    original: 1,
    copy: 1,
  },
  { name: 'Giấy tờ chứng minh năng lực tài chính', copy: 1 },
  { name: 'Đề án đầu tư', original: 1, copy: 19, hasTemplate: true },
];

const MOCK_METHODS = [
  {
    title: 'Nộp trực tiếp',
    description: 'Nhà đầu tư nộp hồ sơ trực tiếp tại Bộ phận tiếp nhận và trả kết quả của Bộ Kế hoạch và Đầu tư.',
  },
  {
    title: 'Nộp qua bưu điện',
    description: 'Nhà đầu tư gửi hồ sơ qua dịch vụ bưu chính đến Bộ Kế hoạch và Đầu tư.',
  },
  {
    title: 'Nộp trực tuyến',
    description: 'Nhà đầu tư nộp hồ sơ trực tuyến tại Cổng dịch vụ công quốc gia hoặc Hệ thống thông tin quốc gia về đầu tư.',
  },
];

const MOCK_LEGAL_REFS = [
  {
    title: 'Luật Đầu tư số 61/2020/QH14',
    date: '17/06/2020',
    type: 'Luật',
  },
  {
    title: 'Nghị định số 31/2021/NĐ-CP hướng dẫn Luật Đầu tư',
    date: '26/03/2021',
    type: 'Nghị định',
  },
  {
    title: 'Thông tư số 03/2021/TT-BKHĐT hướng dẫn biểu mẫu',
    date: '09/04/2021',
    type: 'Thông tư',
  },
  {
    title: 'Luật Doanh nghiệp số 59/2020/QH14',
    date: '17/06/2020',
    type: 'Luật',
  },
];

// --- Info Row Component ---
const InfoRow: React.FC<{
  label: string;
  value: string;
  isFirst?: boolean;
}> = ({ label, value, isFirst }) => (
  <View style={[styles.infoRow, !isFirst && styles.infoRowBorder]}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

// --- Tab Content Components ---

const GeneralTab: React.FC = () => (
  <View style={styles.tabContent}>
    {/* Chi tiết thủ tục */}
    <View style={styles.contentCard}>
      <Text style={styles.cardSectionTitle}>Chi tiết thủ tục</Text>
      <View style={styles.infoList}>
        <InfoRow label="Tên thủ tục" value={MOCK_GENERAL.procedureName} isFirst />
        <InfoRow label="Mã thủ tục" value={MOCK_GENERAL.code} />
        <InfoRow label="Cấp thực hiện" value={MOCK_GENERAL.level} />
        <InfoRow label="Lĩnh vực" value={MOCK_GENERAL.field} />
        <InfoRow label="Nhóm thủ tục" value={MOCK_GENERAL.procedureGroup} />
        <InfoRow label="Cơ quan thực hiện" value={MOCK_GENERAL.executingAgency} />
        <InfoRow label="Đối tượng thực hiện" value={MOCK_GENERAL.target} />
        <InfoRow label="Kết quả thực hiện" value={MOCK_GENERAL.result} />
        <InfoRow label="Số bộ hồ sơ" value={MOCK_GENERAL.dossierCount} />
        <InfoRow label="Tên mẫu đơn" value={MOCK_GENERAL.formName} />
        <View style={[styles.infoRow, styles.infoRowBorder]}>
          <Text style={styles.infoLabel}>Yêu cầu & điều kiện</Text>
          <Text style={styles.infoValue}>{MOCK_GENERAL.requirements}</Text>
        </View>
      </View>
    </View>

    {/* Tổng quan */}
    <View style={styles.contentCard}>
      <Text style={styles.cardSectionTitle}>Tổng quan</Text>
      <View style={styles.overviewRow}>
        <Text style={styles.overviewLabel}>Cơ quan</Text>
        <Text style={styles.overviewValue}>{MOCK_GENERAL.overviewAgency}</Text>
      </View>
      <View style={styles.overviewRow}>
        <Text style={styles.overviewLabel}>Thời hạn</Text>
        <Text style={styles.overviewValue}>{MOCK_GENERAL.overviewDuration}</Text>
      </View>
    </View>

    {/* Hỗ trợ */}
    <View style={styles.contentCard}>
      <Text style={styles.cardSectionTitle}>Hỗ trợ</Text>
      <TouchableOpacity style={styles.supportButton} onPress={() => Linking.openURL('tel:19001234')}>
        <Ionicons name="call-outline" size={16} color="#0a0a0a" />
        <Text style={styles.supportButtonText}>Hotline</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.supportButton}>
        <Ionicons name="help-circle-outline" size={16} color="#0a0a0a" />
        <Text style={styles.supportButtonText}>FAQ</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const ProcessTab: React.FC = () => (
  <View style={styles.tabContent}>
    <View style={styles.contentCard}>
      <View style={styles.processContent}>
        {MOCK_PROCESS_STEPS.map((step, index) => (
          <Text key={index} style={styles.processStep}>
            - {step}
          </Text>
        ))}
      </View>
    </View>
  </View>
);

const DocumentsTab: React.FC = () => (
  <View style={styles.tabContent}>
    {MOCK_DOCUMENTS.map((doc, index) => (
      <View key={index} style={styles.contentCard}>
        <Text style={styles.docName}>{doc.name}</Text>

        <View style={styles.docBadges}>
          {doc.original != null && (
            <View style={styles.badgeBlue}>
              <Text style={styles.badgeBlueText}>Bản chính: {doc.original}</Text>
            </View>
          )}
          {doc.copy != null && (
            <View style={styles.badgeGreen}>
              <Text style={styles.badgeGreenText}>Bản sao: {doc.copy}</Text>
            </View>
          )}
        </View>

        {doc.hasTemplate && (
          <TouchableOpacity style={styles.downloadLink}>
            <Ionicons name="download-outline" size={16} color={colors.primary} />
            <Text style={styles.downloadText}>Tải mẫu đơn</Text>
          </TouchableOpacity>
        )}
      </View>
    ))}
  </View>
);

const MethodTab: React.FC = () => (
  <View style={styles.tabContent}>
    {MOCK_METHODS.map((method, index) => (
      <View key={index} style={styles.contentCard}>
        <Text style={styles.cardSectionTitle}>{method.title}</Text>
        <Text style={styles.methodDescription}>{method.description}</Text>
      </View>
    ))}
  </View>
);

const LegalTab: React.FC = () => (
  <View style={styles.tabContent}>
    {MOCK_LEGAL_REFS.map((ref, index) => (
      <View key={index} style={styles.contentCard}>
        <View style={styles.legalBadge}>
          <Text style={styles.legalBadgeText}>{ref.type}</Text>
        </View>
        <Text style={styles.legalTitle}>{ref.title}</Text>
        <Text style={styles.legalDate}>Ngày ban hành: {ref.date}</Text>
      </View>
    ))}
  </View>
);

// --- Main Screen ---
const ProcedureDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ProcedureDetailParams, 'ProcedureDetail'>>();
  const { title, code, level } = route.params;
  const [activeTab, setActiveTab] = useState<TabKey>('general');
  const tabScrollRef = useRef<ScrollView>(null);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralTab />;
      case 'process':
        return <ProcessTab />;
      case 'documents':
        return <DocumentsTab />;
      case 'method':
        return <MethodTab />;
      case 'legal':
        return <LegalTab />;
    }
  };

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
          <Text style={styles.headerTitle} numberOfLines={1}>
            {title}
          </Text>
        </View>
        <TouchableOpacity style={styles.headerBellBtn}>
          <Ionicons name="notifications-outline" size={20} color="#fff" />
          <View style={styles.bellDot} />
        </TouchableOpacity>
      </View>

      {/* Procedure Info Bar */}
      <View style={styles.infoBar}>
        <Text style={styles.infoBarTitle} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.infoBarMeta}>
          <View style={styles.levelBadge}>
            <Text style={styles.levelBadgeText}>{level}</Text>
          </View>
          <Text style={styles.codeText}>{code}</Text>
        </View>
      </View>

      {/* Tab Bar */}
      <View style={styles.tabBarContainer}>
        <ScrollView
          ref={tabScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabBarContent}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={styles.tabItem}
                onPress={() => setActiveTab(tab.key)}
              >
                <Text
                  style={[
                    styles.tabLabel,
                    isActive && styles.tabLabelActive,
                  ]}
                >
                  {tab.label}
                </Text>
                {isActive && <View style={styles.tabIndicator} />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Tab Content */}
      <ScrollView
        style={styles.contentScroll}
        contentContainerStyle={styles.contentScrollInner}
        showsVerticalScrollIndicator={false}
      >
        {renderTabContent()}
        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProcedureDetailScreen;

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },

  // Header
  header: {
    height: 64,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  headerLeft: {
    flex: 1,
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
    flex: 1,
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

  // Info Bar (below header)
  infoBar: {
    backgroundColor: '#fff',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
  },
  infoBarTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.medium,
    color: '#0a0a0a',
    lineHeight: 24,
    letterSpacing: -0.3125,
    marginBottom: spacing.xs,
  },
  infoBarMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  levelBadge: {
    backgroundColor: colors.primary,
    height: 24,
    borderRadius: 9999,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelBadgeText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    color: '#fff',
    lineHeight: 16,
  },
  codeText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    color: '#4a5565',
    lineHeight: 16,
  },

  // Tab Bar
  tabBarContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tabBarContent: {
    paddingHorizontal: spacing.lg,
  },
  tabItem: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.xs,
    position: 'relative',
  },
  tabLabel: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: '#4a5565',
    letterSpacing: -0.15,
    paddingHorizontal: spacing.md,
  },
  tabLabelActive: {
    color: colors.primary,
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.primary,
  },

  // Content Scroll
  contentScroll: {
    flex: 1,
  },
  contentScrollInner: {
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg,
  },

  // Tab Content wrapper
  tabContent: {
    gap: spacing.md,
  },

  // Content Card
  contentCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardSectionTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: '#0a0a0a',
    lineHeight: 20,
    letterSpacing: -0.15,
    marginBottom: spacing.md,
  },

  // Info rows (General tab)
  infoList: {},
  infoRow: {
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  infoRowBorder: {
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 13,
  },
  infoLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    color: '#4a5565',
    lineHeight: 16,
  },
  infoValue: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    color: '#101828',
    lineHeight: 16,
  },

  // Overview rows
  overviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 16,
    marginBottom: spacing.sm,
  },
  overviewLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    color: '#4a5565',
    lineHeight: 16,
  },
  overviewValue: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    color: '#101828',
    lineHeight: 16,
  },

  // Support buttons (General tab)
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6f6f6',
    borderRadius: 10,
    height: 40,
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  supportButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: '#0a0a0a',
    letterSpacing: -0.15,
  },

  // Process tab
  processContent: {
    padding: 10,
  },
  processStep: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    color: '#364153',
    lineHeight: 16,
    marginBottom: spacing.sm,
  },

  // Documents tab
  docName: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.regular,
    color: '#0a0a0a',
    lineHeight: 20,
    letterSpacing: -0.15,
    marginBottom: spacing.md,
  },
  docBadges: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginBottom: spacing.md,
  },
  badgeBlue: {
    backgroundColor: '#dbeafe',
    height: 24,
    borderRadius: 9999,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeBlueText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    color: '#1447e6',
    lineHeight: 16,
  },
  badgeGreen: {
    backgroundColor: '#dcfce7',
    height: 24,
    borderRadius: 9999,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeGreenText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    color: '#008236',
    lineHeight: 16,
  },
  downloadLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  downloadText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.primary,
    lineHeight: 16,
  },

  // Method tab
  methodDescription: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    color: '#364153',
    lineHeight: 16,
  },

  // Legal tab
  legalBadge: {
    backgroundColor: '#dbeafe',
    height: 24,
    borderRadius: 9999,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  legalBadgeText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    color: '#1447e6',
    lineHeight: 16,
  },
  legalTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: '#0a0a0a',
    lineHeight: 20,
    letterSpacing: -0.15,
    marginBottom: spacing.xs,
  },
  legalDate: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    color: '#4a5565',
    lineHeight: 16,
  },
});
