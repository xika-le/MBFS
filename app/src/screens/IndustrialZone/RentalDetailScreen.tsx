import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { Icon, Header } from '../../components/shared';
import { getRentalDetail, RENTAL_STATUS_CONFIG } from '../../data/rentalMockData';

type RouteProps = RouteProp<RootStackParamList, 'RentalDetail'>;

const DetailRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const SectionCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <View style={styles.sectionCard}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    <View style={styles.sectionBody}>{children}</View>
  </View>
);

export const RentalDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProps>();
  const { id } = route.params;
  const data = getRentalDetail(id);
  const statusCfg = RENTAL_STATUS_CONFIG[data.status];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <Header title="Chi tiết thông tin cho thuê đất" onBack={() => navigation.goBack()} />

      <ScrollView bounces={false} contentContainerStyle={styles.scrollContent}>
        {/* Section 1: Thông tin lô đất */}
        <SectionCard title="Thông tin lô đất">
          <DetailRow label="Khu công nghiệp" value={data.zoneName} />
          <DetailRow label="Lô đất" value={data.lotName} />
          <DetailRow label="Vị trí" value={data.location} />
          <DetailRow label="Tổng diện tích" value={data.totalArea} />
          <DetailRow label="Nhà đầu tư thuê đất" value={data.investor} />
        </SectionCard>

        {/* Section 2: Thông tin hợp đồng */}
        <SectionCard title="Thông tin hợp đồng">
          <DetailRow label="Số hợp đồng" value={data.contractCode} />
          <DetailRow label="Ngày ký hợp đồng" value={data.signDate} />
          <DetailRow label="Thời gian hiệu lực" value={data.effectivePeriod} />
          <DetailRow label="Mục đích thuê" value={data.purpose} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tình trạng</Text>
            <View style={[styles.statusBadge, { backgroundColor: statusCfg.bg }]}>
              <Text style={[styles.statusBadgeText, { color: statusCfg.color }]}>
                {statusCfg.label}
              </Text>
            </View>
          </View>
        </SectionCard>

        {/* Section 3: Thông tin tài chính */}
        <SectionCard title="Thông tin tài chính">
          <DetailRow label="Đơn giá thuê trước VAT" value={data.priceBeforeVAT} />
          <DetailRow label="VAT" value={data.vat} />
          <DetailRow label="Đơn giá sau VAT" value={data.priceAfterVAT} />
          <DetailRow label="Kỳ thanh toán" value={data.paymentCycle} />
        </SectionCard>

        {/* Section 4: Thông tin bổ sung */}
        <SectionCard title="Thông tin bổ sung">
          <DetailRow label="Ghi chú" value={data.note} />
        </SectionCard>

        {/* Section 5: Tệp đính kèm */}
        <SectionCard title="Tệp đính kèm">
          {data.attachments.map(file => (
            <TouchableOpacity key={file.id} style={styles.fileRow} activeOpacity={0.7}>
              <Icon name="file-text" size={20} color={colors.textSecondary} />
              <Text style={styles.fileName} numberOfLines={1}>{file.name}</Text>
            </TouchableOpacity>
          ))}
        </SectionCard>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: 40,
  },
  sectionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  sectionHeader: {
    paddingHorizontal: 17,
    paddingVertical: 17,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  sectionBody: {
    paddingHorizontal: 17,
    paddingVertical: 8,
  },
  detailRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  detailLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 13,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusBadgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    gap: 12,
  },
  fileName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
  },
});
