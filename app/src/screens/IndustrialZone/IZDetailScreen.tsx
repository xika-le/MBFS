/**
 * IZDetailScreen — Chi tiết khu (generic cho 10 loại)
 * Features: 1.1-1.10, Functions: 3-7
 *
 * Nhận route param `zoneType` để hiển thị mock data tương ứng.
 * UI layout giống hệt cho mọi loại khu, chỉ khác data.
 *
 * Tabs: Hồ sơ KCN | Kinh tế - XH - MT | Kêu gọi đầu tư | Dự án đầu tư | Lịch sử cập nhật
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { Card } from '../../components/shared/Card';
import { TabBar } from '../../components/shared/TabBar';
import { Badge } from '../../components/shared/Badge';
import {
  ZONE_CONFIG,
  getZoneMockData,
  ZoneDetail,
  ZoneHistoryItem,
  ZoneHistoryDetail,
  ZoneEconomyItem,
  ZoneSocialItem,
  ZoneEnvironmentItem,
  ZoneInvestmentCallItem,
  ZoneProjectItem,
  ZoneInvestmentDetail,
} from '../../data/zoneTypes';

type Props = NativeStackScreenProps<RootStackParamList, 'IZDetail'>;

// Tabs
const TABS = [
  { key: 'hoSo', label: 'Hồ sơ KCN' },
  { key: 'kinhTe', label: 'Kinh tế - XH - MT' },
  { key: 'keuGoi', label: 'Kêu gọi đầu tư' },
  { key: 'duAn', label: 'Dự án đầu tư' },
  { key: 'lichSu', label: 'Lịch sử cập nhật' },
];

// ============================================================
// Reusable sub-components
// ============================================================

const InfoRow: React.FC<{ label: string; value: string; valueColor?: string }> = ({
  label,
  value,
  valueColor,
}) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={[styles.infoValue, valueColor ? { color: valueColor } : undefined]}>
      {value}
    </Text>
  </View>
);

const DataField: React.FC<{
  label: string;
  value: string;
  valueColor?: string;
  italic?: boolean;
}> = ({ label, value, valueColor, italic }) => (
  <View style={styles.dataField}>
    <Text style={styles.dataLabel}>{label}</Text>
    <Text
      style={[
        styles.dataValue,
        valueColor ? { color: valueColor } : undefined,
        italic ? { fontStyle: 'italic', color: colors.textTertiary } : undefined,
      ]}
    >
      {value}
    </Text>
  </View>
);

const DataFieldRow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.dataFieldRow}>{children}</View>
);

const InfoBanner: React.FC<{ text: string }> = ({ text }) => (
  <View style={styles.infoBanner}>
    <Text style={styles.infoBannerText}>{text}</Text>
  </View>
);

const ViewDetailButton: React.FC<{ onPress?: () => void; text?: string }> = ({ onPress, text }) => (
  <View style={styles.viewDetailSection}>
    <TouchableOpacity style={styles.viewDetailButton} onPress={onPress}>
      <Text style={styles.viewDetailText}>{text ?? 'Xem chi tiết'}</Text>
    </TouchableOpacity>
  </View>
);

const SubTabBar: React.FC<{
  tabs: { key: string; label: string }[];
  activeKey: string;
  onTabPress: (key: string) => void;
}> = ({ tabs, activeKey, onTabPress }) => (
  <View style={styles.subTabContainer}>
    {tabs.map((tab) => {
      const isActive = tab.key === activeKey;
      return (
        <TouchableOpacity
          key={tab.key}
          onPress={() => onTabPress(tab.key)}
          style={[styles.subTab, isActive && styles.subTabActive]}
        >
          <Text style={[styles.subTabText, isActive && styles.subTabTextActive]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

// ============================================================
// Dialog sub-components (modals)
// ============================================================

const DialogField: React.FC<{
  label: string;
  value: string;
  italic?: boolean;
}> = ({ label, value, italic }) => (
  <View style={styles.dialogField}>
    <Text style={styles.dialogFieldLabel}>{label}</Text>
    <Text
      style={[
        styles.dialogFieldValue,
        italic ? { fontStyle: 'italic' } : undefined,
      ]}
    >
      {value}
    </Text>
  </View>
);

const DialogFieldRow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.dialogFieldRow}>{children}</View>
);

// ============================================================
// TAB: Hồ sơ KCN
// ============================================================
const HoSoTab: React.FC<{ data: ZoneDetail; shortLabel: string }> = ({ data, shortLabel }) => (
  <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
    <Card title="Thông tin chung" style={styles.card}>
      <InfoRow label={`Mã ${shortLabel} *`} value={data.code} />
      <InfoRow label="Tên viết tắt" value={data.shortName} />
      <InfoRow label={`Tên ${shortLabel} *`} value={data.name} />
      <InfoRow label="Tên tiếng Anh" value={data.nameEn} />
    </Card>

    <Card title="Địa chỉ" style={styles.card}>
      <InfoRow label="Tỉnh/Thành phố *" value={data.province} />
      <InfoRow label="Địa chỉ" value={data.address} />
      <InfoRow label="Xã/phường" value={data.ward} />
      <InfoRow label="Thuộc KKT" value={data.kkt} />
    </Card>

    <Card title="Trình trạng" style={styles.card}>
      <InfoRow label="Trình trạng" value={data.statusText} />
      <InfoRow label="Năm thành lập" value={data.yearEstablished} />
      <InfoRow label="Loại vốn ĐT" value={data.investmentType} />
      <InfoRow label="Tổng vốn CT đăng ký" value={data.totalCapital} />
      <InfoRow label="Hiệu đàng" value={data.efficiency} />
      <InfoRow label="Dân số" value={data.population} />
    </Card>

    <Card title="Chủ đầu tư hạ tầng" style={styles.card}>
      {data.investors.map((investor, idx) => (
        <View key={idx}>
          {idx > 0 && <View style={styles.divider} />}
          <Text style={styles.investorName}>{investor.name}</Text>
          <InfoRow label="Mã số thuế" value={investor.taxCode} />
          <InfoRow label="Người đại diện" value={investor.representative} />
          <InfoRow label="Địa chỉ" value={investor.address} />
          <InfoRow label="Điện thoại" value={investor.phone} />
          <InfoRow label="Email" value={investor.email} />
        </View>
      ))}
    </Card>

    <Card title="Hồ sơ đính kèm" style={styles.card}>
      {data.attachments.map((doc, index) => (
        <View key={index} style={styles.attachmentItem}>
          <Text style={styles.attachmentTitle}>{doc.title}</Text>
          <Badge label={doc.type} variant="info" />
          <InfoRow label="Số văn bản" value={doc.docNumber} />
          <InfoRow label="Ngày cấp" value={doc.date} />
          <TouchableOpacity>
            <Text style={styles.downloadLink}>{`Tải xuống (${doc.file})`}</Text>
          </TouchableOpacity>
          {index < data.attachments.length - 1 && <View style={styles.divider} />}
        </View>
      ))}
    </Card>

    <View style={styles.bottomPadding} />
  </ScrollView>
);

// ============================================================
// TAB: Lịch sử cập nhật
// ============================================================
const LichSuTab: React.FC<{
  data: ZoneHistoryItem[];
  onViewDetail?: () => void;
}> = ({ data, onViewDetail }) => (
  <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
    <InfoBanner text="Theo dõi lịch sử cập nhật hồ sơ này bằng công nghiệp" />
    {data.map((item, index) => (
      <Card key={index} style={styles.card}>
        <View style={styles.badgeRow}>
          <Badge label={item.actionType} variant="info" />
        </View>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={styles.dataSection}>
          <DataFieldRow>
            <DataField label="Ngày điều chỉnh" value={item.date} />
            <DataField label="Người điều chỉnh" value={item.person} />
          </DataFieldRow>
          <DataField label="Người duyệt" value={item.approver} italic={item.approverItalic} />
        </View>
        <ViewDetailButton onPress={onViewDetail} />
      </Card>
    ))}
    <View style={styles.bottomPadding} />
  </ScrollView>
);

// ============================================================
// TAB: Kinh tế - XH - MT
// ============================================================
const SUB_TABS = [
  { key: 'kinhTe', label: 'Kinh tế' },
  { key: 'xaHoi', label: 'Xã hội' },
  { key: 'moiTruong', label: 'Môi trường' },
];

const KinhTeContent: React.FC<{ data: ZoneEconomyItem[] }> = ({ data }) => (
  <>
    {data.map((item, index) => (
      <Card key={index} style={styles.card}>
        <Badge label={item.quarter} variant="primary" style={styles.quarterBadge} />
        <View style={styles.dataSection}>
          <DataFieldRow>
            <DataField label="Doanh thu" value={item.doanhThu.value} valueColor={item.doanhThu.color} />
            <DataField label="Giá trị SX CII" value={item.giaTriSX.value} valueColor={item.giaTriSX.color} />
          </DataFieldRow>
          <DataFieldRow>
            <DataField label="Kim ngạch XK" value={item.kimNgachXK.value} valueColor={item.kimNgachXK.color} />
            <DataField label="Kim ngạch NK" value={item.kimNgachNK.value} valueColor={item.kimNgachNK.color} />
          </DataFieldRow>
        </View>
        <ViewDetailButton />
      </Card>
    ))}
  </>
);

const XaHoiContent: React.FC<{ data: ZoneSocialItem[] }> = ({ data }) => (
  <>
    {data.map((item, index) => (
      <Card key={index} style={styles.card}>
        <Badge label={item.quarter} variant="primary" style={styles.quarterBadge} />
        <View style={styles.dataSection}>
          <DataField label="Tổng số lao động" value={item.tongLaoDong.value} valueColor={item.tongLaoDong.color} />
          <DataFieldRow>
            <DataField label="Tổng số lao động NN" value={item.laoDongNN.value} valueColor={item.laoDongNN.color} />
            <DataField label="Tổng số lao động nữ" value={item.laoDongNu.value} valueColor={item.laoDongNu.color} />
          </DataFieldRow>
          <DataField label="Thu nhập BQ (Triệu đồng)" value={item.thuNhapBQ.value} valueColor={item.thuNhapBQ.color} />
        </View>
        <ViewDetailButton />
      </Card>
    ))}
  </>
);

const MoiTruongContent: React.FC<{ data: ZoneEnvironmentItem[] }> = ({ data }) => (
  <>
    {data.map((item, index) => (
      <Card key={index} style={styles.card}>
        <Badge label={item.quarter} variant="primary" style={styles.quarterBadge} />
        <View style={styles.dataSection}>
          <DataFieldRow>
            <DataField label="Nhà máy XLNT" value={item.nhaMayXLNT.value} valueColor={item.nhaMayXLNT.color} />
            <DataField label="Chất lượng XLNT" value={item.chatLuongXLNT.value} valueColor={item.chatLuongXLNT.color} />
          </DataFieldRow>
          <DataFieldRow>
            <DataField label="Chứng nhận xanh" value={item.chungNhanXanh.value} valueColor={item.chungNhanXanh.color} />
            <DataField label="Tổng nước thải của khu" value={item.tongNuocThai.value} valueColor={item.tongNuocThai.color} />
          </DataFieldRow>
        </View>
        <ViewDetailButton />
      </Card>
    ))}
  </>
);

const KinhTeXHMTTab: React.FC<{
  economy: ZoneEconomyItem[];
  social: ZoneSocialItem[];
  environment: ZoneEnvironmentItem[];
}> = ({ economy, social, environment }) => {
  const [activeSubTab, setActiveSubTab] = useState('kinhTe');

  const renderSubTabContent = () => {
    switch (activeSubTab) {
      case 'kinhTe':
        return <KinhTeContent data={economy} />;
      case 'xaHoi':
        return <XaHoiContent data={social} />;
      case 'moiTruong':
        return <MoiTruongContent data={environment} />;
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <SubTabBar tabs={SUB_TABS} activeKey={activeSubTab} onTabPress={setActiveSubTab} />
      {renderSubTabContent()}
      <View style={styles.bottomPadding} />
    </ScrollView>
  );
};

// ============================================================
// TAB: Kêu gọi đầu tư
// ============================================================
const KeuGoiTab: React.FC<{
  data: ZoneInvestmentCallItem[];
  onViewDetail?: () => void;
}> = ({ data, onViewDetail }) => (
  <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
    {data.map((item, index) => (
      <Card key={index} style={styles.card}>
        <View style={styles.badgeRow}>
          <Badge
            label={item.typeBadge}
            variant={item.typeBadge === 'Trong nước' ? 'info' : 'success'}
          />
        </View>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.projectCode}>{item.code}</Text>
        <View style={styles.dataSection}>
          <DataFieldRow>
            <DataField label="Ngành kinh tế" value={item.nganhKinhTe} />
            <DataField label="Quy mô vốn" value={item.quyMoVon.value} valueColor={item.quyMoVon.color} />
          </DataFieldRow>
        </View>
        <ViewDetailButton onPress={onViewDetail} />
      </Card>
    ))}
    <View style={styles.bottomPadding} />
  </ScrollView>
);

// ============================================================
// TAB: Dự án đầu tư
// ============================================================
const getTypeBadgeVariant = (type: string): 'success' | 'info' => {
  return type === 'FDI' ? 'success' : 'info';
};

const getStatusBadgeVariant = (status: string): 'successAlt' | 'warningAlt' => {
  return status === 'Đang hoạt động' ? 'successAlt' : 'warningAlt';
};

const DuAnDauTuTab: React.FC<{
  data: ZoneProjectItem[];
  onViewDetail?: () => void;
}> = ({ data, onViewDetail }) => (
  <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
    {data.map((project, index) => (
      <Card key={index} style={styles.card}>
        <Text style={styles.cardTitle}>{project.name}</Text>
        <Text style={styles.projectCode}>{`Mã: ${project.code}`}</Text>
        <View style={styles.badgeRow}>
          <Badge label={project.typeBadge} variant={getTypeBadgeVariant(project.typeBadge)} />
          <Badge label={project.statusBadge} variant={getStatusBadgeVariant(project.statusBadge)} />
        </View>
        <View style={styles.dataSection}>
          <DataFieldRow>
            <DataField label="Loại dự án" value={project.loaiDuAn} />
            <DataField label="Vốn đầu tư" value={project.vonDauTu} valueColor={colors.primary} />
          </DataFieldRow>
          <DataFieldRow>
            <DataField label="Diện tích" value={project.dienTich} />
            <DataField label="Ngày cấp GP" value={project.ngayCapGP} />
          </DataFieldRow>
          <DataField label="Chủ đầu tư" value={project.chuDauTu} />
          <DataField label="Số GPDĐT" value={project.soGPDDT} />
        </View>
        <ViewDetailButton onPress={onViewDetail} text="Xem chi tiết dự án" />
      </Card>
    ))}
    <View style={styles.bottomPadding} />
  </ScrollView>
);

// ============================================================
// DIALOG: Chi tiết lịch sử cập nhật
// ============================================================
const HistoryDetailModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  data: ZoneHistoryDetail;
}> = ({ visible, onClose, data }) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <View style={styles.modalBackdrop}>
      <View style={styles.modalCard}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalHeaderTitle}>Chi tiết lịch sử cập nhật</Text>
          <TouchableOpacity onPress={onClose} style={styles.modalCloseIcon}>
            <Text style={styles.modalCloseIconText}>✕</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.modalContent}
          contentContainerStyle={styles.modalContentInner}
          showsVerticalScrollIndicator={false}
        >
          <DialogField label="Tên khu" value={data.tenKhu} />
          <DialogFieldRow>
            <DialogField label="Mã hồ sơ" value={data.maHoSo} />
            <DialogField label="Loại điều chỉnh" value={data.loaiDieuChinh} />
          </DialogFieldRow>
          <DialogField label="Nội dung điều chỉnh" value={data.noiDungDieuChinh} />
          <View style={styles.modalDivider} />
          <DialogFieldRow>
            <DialogField label="Ngày điều chỉnh" value={data.ngayDieuChinh} />
            <DialogField label="Thời gian" value={data.thoiGian} />
          </DialogFieldRow>
          <DialogFieldRow>
            <DialogField label="Người điều chỉnh" value={data.nguoiDieuChinh} />
            <DialogField label="Người duyệt" value={data.nguoiDuyet} italic={data.nguoiDuyetItalic} />
          </DialogFieldRow>
          <View style={styles.modalDivider} />
          <View style={styles.dialogField}>
            <Text style={styles.dialogFieldLabel}>Ghi chú</Text>
            <View style={styles.noteBox}>
              <Text style={styles.dialogFieldValue}>{data.ghiChu}</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.modalFooter}>
          <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
            <Text style={styles.modalCloseButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

// ============================================================
// DIALOG: Chi tiết dự án kêu gọi đầu tư
// ============================================================
const InvestmentDetailModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  data: ZoneInvestmentDetail;
}> = ({ visible, onClose, data }) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <View style={styles.modalBackdrop}>
      <View style={styles.modalCard}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalHeaderTitle}>Chi tiết dự án kêu gọi đầu tư</Text>
          <TouchableOpacity onPress={onClose} style={styles.modalCloseIcon}>
            <Text style={styles.modalCloseIconText}>✕</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.modalContent}
          contentContainerStyle={styles.modalContentInner}
          showsVerticalScrollIndicator={false}
        >
          <DialogField label="Tên khu" value={data.tenKhu} />
          <DialogFieldRow>
            <DialogField label="Mã dự án" value={data.maDuAn} />
            <DialogField label="Loại dự án" value={data.loaiDuAn} />
          </DialogFieldRow>
          <DialogField label="Tên dự án" value={data.tenDuAn} />
          <View style={styles.modalDivider} />
          <DialogFieldRow>
            <DialogField label="Lĩnh vực" value={data.linhVuc} />
            <DialogField label="Công nghệ cao" value={data.congNgheCao} />
          </DialogFieldRow>
          <DialogFieldRow>
            <DialogField label="Địa bàn ưu đãi" value={data.diaBanUuDai} />
            <DialogField label="Quốc gia" value={data.quocGia} />
          </DialogFieldRow>
        </ScrollView>
        <View style={styles.modalFooter}>
          <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
            <Text style={styles.modalCloseButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

// ============================================================
// MAIN SCREEN
// ============================================================
export const IZDetailScreen: React.FC<Props> = ({ route }) => {
  const zoneType = route.params?.zoneType ?? 'kcn';
  const config = ZONE_CONFIG[zoneType];
  const mockData = getZoneMockData(zoneType);

  const [activeTab, setActiveTab] = useState('hoSo');
  const [historyModalVisible, setHistoryModalVisible] = useState(false);
  const [investmentModalVisible, setInvestmentModalVisible] = useState(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'hoSo':
        return <HoSoTab data={mockData.detail} shortLabel={config.shortLabel} />;
      case 'duAn':
        return <DuAnDauTuTab data={mockData.projects} onViewDetail={() => setInvestmentModalVisible(true)} />;
      case 'kinhTe':
        return (
          <KinhTeXHMTTab
            economy={mockData.economy}
            social={mockData.social}
            environment={mockData.environment}
          />
        );
      case 'lichSu':
        return <LichSuTab data={mockData.history} onViewDetail={() => setHistoryModalVisible(true)} />;
      case 'keuGoi':
        return <KeuGoiTab data={mockData.investmentCall} onViewDetail={() => setInvestmentModalVisible(true)} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TabBar tabs={TABS} activeKey={activeTab} onTabPress={setActiveTab} />
      {renderTabContent()}
      <HistoryDetailModal
        visible={historyModalVisible}
        onClose={() => setHistoryModalVisible(false)}
        data={mockData.historyDetail}
      />
      <InvestmentDetailModal
        visible={investmentModalVisible}
        onClose={() => setInvestmentModalVisible(false)}
        data={mockData.investmentDetail}
      />
    </SafeAreaView>
  );
};

// ============================================================
// STYLES
// ============================================================
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  tabContent: {
    flex: 1,
    paddingHorizontal: spacing.container.paddingHorizontal,
    paddingTop: spacing.lg,
  },
  card: {
    marginBottom: spacing.md,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: spacing.sm,
  },
  infoLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    flex: 1,
  },
  infoValue: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    flex: 1.5,
    textAlign: 'right',
  },

  dataField: {
    flex: 1,
    gap: 2,
  },
  dataLabel: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.xs,
  },
  dataValue: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    lineHeight: typography.lineHeight.sm,
  },
  dataFieldRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  dataSection: {
    gap: spacing.sm,
  },

  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },

  cardTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    lineHeight: typography.lineHeight.md,
    marginBottom: spacing.sm,
  },

  quarterBadge: {
    marginBottom: spacing.md,
  },

  projectCode: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.regular,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.xs,
    marginBottom: spacing.md,
  },

  infoBanner: {
    backgroundColor: '#eff6ff',
    borderLeftWidth: 4,
    borderLeftColor: '#2b7fff',
    borderRadius: spacing.borderRadius.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  infoBannerText: {
    fontSize: typography.fontSize.sm,
    color: colors.linkDark,
    lineHeight: typography.lineHeight.sm,
  },

  viewDetailSection: {
    borderTopWidth: spacing.borderWidth.thin,
    borderTopColor: colors.surfaceAlt,
    paddingTop: spacing.md,
    marginTop: spacing.md,
  },
  viewDetailButton: {
    height: 28,
    borderWidth: spacing.borderWidth.thin,
    borderColor: colors.borderMedium,
    borderRadius: spacing.borderRadius.md,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewDetailText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textDark,
  },

  subTabContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  subTab: {
    height: 32,
    paddingHorizontal: spacing.md,
    borderRadius: spacing.borderRadius.md,
    borderWidth: spacing.borderWidth.thin,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTabActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  subTabText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textDark,
  },
  subTabTextActive: {
    color: colors.surface,
  },

  investorName: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },

  attachmentItem: {
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  attachmentTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },
  downloadLink: {
    fontSize: typography.fontSize.sm,
    color: colors.link,
    fontWeight: typography.fontWeight.medium,
    marginTop: spacing.xs,
  },
  divider: {
    height: spacing.borderWidth.thin,
    backgroundColor: colors.borderLight,
    marginVertical: spacing.sm,
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  modalCard: {
    width: '100%',
    maxHeight: '75%',
    backgroundColor: colors.surface,
    borderRadius: 10,
    borderWidth: spacing.borderWidth.thin,
    borderColor: colors.border,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  modalHeader: {
    backgroundColor: colors.primary,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  modalHeaderTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.surface,
    lineHeight: typography.lineHeight.md,
  },
  modalCloseIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseIconText: {
    fontSize: 16,
    color: colors.surface,
    opacity: 0.7,
  },
  modalContent: {
    flexGrow: 1,
    flexShrink: 1,
  },
  modalContentInner: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
    gap: spacing.lg,
  },
  modalDivider: {
    height: spacing.borderWidth.thin,
    backgroundColor: colors.borderLight,
  },
  modalFooter: {
    borderTopWidth: spacing.borderWidth.thin,
    borderTopColor: colors.borderLight,
    paddingHorizontal: spacing.lg,
    paddingTop: 17,
    paddingBottom: spacing.lg,
  },
  modalCloseButton: {
    height: 44,
    backgroundColor: colors.primary,
    borderRadius: spacing.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.surface,
    lineHeight: typography.lineHeight.md,
  },

  dialogField: {
    flex: 1,
    gap: 6,
  },
  dialogFieldLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.sm,
  },
  dialogFieldValue: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.regular,
    color: colors.textPrimary,
    lineHeight: typography.lineHeight.md,
  },
  dialogFieldRow: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  noteBox: {
    backgroundColor: colors.background,
    borderWidth: spacing.borderWidth.thin,
    borderColor: colors.borderLight,
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingTop: 13,
    paddingBottom: spacing.xs,
  },

  bottomPadding: {
    height: spacing.xxl,
  },
});
