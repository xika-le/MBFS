import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Header } from '../../components/shared/Header';
import { Icon } from '../../components/shared/Icon';
import { Badge } from '../../components/shared/Badge';
import { useNavigation, useRoute } from '@react-navigation/native';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity 
        style={styles.accordionHeader} 
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.7}
      >
        <Text style={styles.accordionTitle}>{title}</Text>
        <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} size={20} color={colors.textSecondary} />
      </TouchableOpacity>
      {isOpen && <View style={styles.accordionContent}>{children}</View>}
    </View>
  );
};

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

export const ReportDetailScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { reportId = 'BC-2026-001' } = route.params || {};

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title={reportId} onBack={() => navigation.goBack()} />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Status Section */}
        <View style={styles.statusSection}>
          <View>
            <Text style={styles.statusContext}>Trạng thái hiện tại:</Text>
            <Text style={styles.statusDescription}>Đã gửi tổng hợp báo cáo</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: '#00c950' }]}>
            <Text style={styles.statusBadgeText}>Đã duyệt</Text>
          </View>
        </View>

        {/* History Button */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.historyButton}>
            <Icon name="clock" size={16} color={colors.surface} />
            <Text style={styles.historyButtonText}>Lịch sử báo cáo</Text>
          </TouchableOpacity>
        </View>

        {/* Info Sections */}
        <View style={styles.sectionsWrapper}>
          <AccordionItem title="Thông tin dự án">
            <InfoRow label="Tên dự án" value="Dự án Khu công nghiệp Tân Phú" />
          </AccordionItem>

          <AccordionItem title="Thông tin chung">
            <InfoRow label="Thời gian báo cáo" value="Từ tháng 01 - đến tháng 03 - năm 2026" />
            <InfoRow label="Cơ quan tiếp nhận" value="Sở Kế hoạch và Đầu tư TP. Hồ Chí Minh" />
          </AccordionItem>

          <AccordionItem title="Thông tin nhà đầu tư">
            <InfoRow label="Mã số dự án" value="BC-2026-001" />
            <InfoRow label="Ngày cấp" value="15/01/2024" />
            <InfoRow label="Ngày điều chỉnh" value="15/01/2024" />
            <InfoRow label="Thông tin nhà đầu tư" value="Công ty TNHH Đầu tư Phát triển ABC" />
          </AccordionItem>

          <AccordionItem title="Tình hình thực hiện">
            <Text style={styles.unitText}>Đơn vị: Triệu USD</Text>
            {[
              { label: 'Máy móc thiết bị', out: '45,000', in: '12,000', forecast: '50,000' },
              { label: 'Nguyên vật liệu', out: '28,000', in: '8,500', forecast: '35,000' },
              { label: 'Lợi nhuận', out: '0', in: '15,200', forecast: '20,000' },
              { label: 'Khác', out: '5,000', in: '2,300', forecast: '6,000' },
            ].map((item, idx) => (
              <View key={idx} style={styles.dataCard}>
                <Text style={styles.dataCardTitle}>{item.label}</Text>
                <View style={styles.dataGrid}>
                  <View style={styles.dataItem}>
                    <Text style={styles.dataLabel}>Vốn chuyển ra</Text>
                    <Text style={styles.dataValue}>{item.out}</Text>
                  </View>
                  <View style={styles.dataItem}>
                    <Text style={styles.dataLabel}>Tiền chuyển về</Text>
                    <Text style={styles.dataValue}>{item.in}</Text>
                  </View>
                  <View style={styles.dataItem}>
                    <Text style={styles.dataLabel}>Dự báo</Text>
                    <Text style={styles.dataValue}>{item.forecast}</Text>
                  </View>
                </View>
              </View>
            ))}
          </AccordionItem>

          <AccordionItem title="Tiến độ dự án">
            <View style={styles.progressRow}>
              <Icon name="check-circle" size={16} color={colors.green} />
              <Text style={styles.progressText}>Đúng tiến độ</Text>
            </View>
            <View style={[styles.infoRow, { marginTop: 12 }]}>
              <Text style={styles.infoLabel}>Lý do</Text>
              <View style={styles.reasonBox}>
                <Text style={styles.reasonText}>-</Text>
              </View>
            </View>
          </AccordionItem>

          <AccordionItem title="Tình hình hoạt động">
            <Text style={styles.activityText}>
              Dự án đang trong giai đoạn vận hành ổn định. Sản lượng đạt 85% công suất thiết kế. Tổng số lao động hiện tại là 1,245 người, trong đó có 89% lao động Việt Nam. Dự án đã đóng góp vào ngân sách nhà nước khoảng 45 tỷ đồng trong quý này.
            </Text>
          </AccordionItem>

          <AccordionItem title="Ký xác nhận">
            <InfoRow label="Nơi ký" value="TP. Hồ Chí Minh" />
            <InfoRow label="Ngày ký" value="15/03/2026" />
            <InfoRow label="Người ký" value="Nguyễn Văn A - Giám đốc" />
          </AccordionItem>
        </View>

        <View style={styles.footerSpacer} />
      </ScrollView>
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
  },
  statusSection: {
    backgroundColor: colors.surface,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  statusContext: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  statusDescription: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textDark,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusBadgeText: {
    fontSize: typography.fontSize.sm,
    color: colors.surface,
  },
  actionSection: {
    backgroundColor: colors.surface,
    padding: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  historyButton: {
    backgroundColor: colors.link,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: 'flex-start',
    gap: 8,
  },
  historyButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.surface,
  },
  sectionsWrapper: {
    padding: 16,
    gap: 12,
  },
  accordionContainer: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  accordionTitle: {
    fontSize: 18,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },
  accordionContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  infoRow: {
    gap: 4,
  },
  infoLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.textDark,
  },
  unitText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  dataCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    padding: 12,
    gap: 8,
  },
  dataCardTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.textDark,
  },
  dataGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dataItem: {
    gap: 2,
  },
  dataLabel: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  dataValue: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textDark,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.textDark,
  },
  reasonBox: {
    borderWidth: 1,
    borderColor: colors.borderMedium,
    borderRadius: 10,
    padding: 12,
    minHeight: 60,
  },
  reasonText: {
    fontSize: typography.fontSize.md,
    color: colors.textDark,
  },
  activityText: {
    fontSize: typography.fontSize.md,
    lineHeight: 22,
    color: '#364153',
  },
  footerSpacer: {
    height: 32,
  },
});
