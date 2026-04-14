import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import * as theme from '../../theme';
import { Header, Card, Badge, Button } from '../../components/shared';

const InfoField: React.FC<{ label: string; value: React.ReactNode; valueColor?: string; isBold?: boolean }> = ({ label, value, valueColor, isBold }) => (
  <View style={detailsStyles.item}>
    <Text style={detailsStyles.label}>{label}</Text>
    <View style={detailsStyles.valueContainer}>
      {typeof value === 'string' ? (
        <Text style={[detailsStyles.value, valueColor ? { color: valueColor } : undefined, isBold ? { fontWeight: 'bold' } : undefined]}>
          {value}
        </Text>
      ) : (
        value
      )}
    </View>
  </View>
);

export default function LegalDocumentDetailScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Chi tiết văn bản" onBack={() => navigation.goBack()} />
      
      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Card: Thông tin văn bản */}
        <Card>
          <Text style={styles.title}>Quyết định về việc ban hành Quy chế quản lý đầu tư</Text>
          
          <View style={detailsStyles.container}>
            <InfoField label="Số ký hiệu:" value="20/2026/TT-BNNMT-test" isBold />
            <InfoField label="Loại văn bản:" value="Thông tư" />
            <InfoField label="Ngày ban hành:" value="03/04/2026" />
            <InfoField label="Ngày có hiệu lực:" value="03/04/2026" />
            <InfoField label="Tình trạng hiệu lực:" value={<Badge label="HẾT HIỆU LỰC" variant="danger" style={{ alignSelf: 'flex-end' }} />} />
            <InfoField label="Cơ quan ban hành:" value="Chính phủ" />
            <InfoField label="Người ký:" value="-" />
            <InfoField label="Đơn vị soạn thảo:" value="-" />
            <InfoField label="Lĩnh vực:" value="Quản lý tài chính doanh nghiệp" />
            <InfoField label="Hiệu lực không gian:" value="Toàn quốc" />
          </View>

          <View style={styles.actionRow}>
            <Button title="Tải văn bản" style={styles.primaryBtn} onPress={() => {}} />
            <Button title="Xem PDF" type="outline" style={styles.secondaryBtn} onPress={() => {}} />
          </View>
        </Card>

        {/* Card: Văn bản liên quan */}
        <Card style={{ marginTop: theme.spacing.md }}>
          <Text style={styles.sectionTitle}>Văn bản liên quan</Text>
          
          <View style={styles.relatedDoc}>
            <Text style={styles.relatedDocSymbol}>08/2022/TT-BKHĐT</Text>
            <Text style={styles.relatedDocTitle}>Thông tư hướng dẫn thực hiện Nghị định 31/2021/NĐ-CP</Text>
          </View>
          
          <View style={[styles.relatedDoc, styles.noBorder]}>
            <Text style={styles.relatedDocSymbol}>05/2021/TT-BKHĐT</Text>
            <Text style={styles.relatedDocTitle}>Thông tư về báo cáo tình hình thực hiện dự án đầu tư</Text>
          </View>
        </Card>

      </ScrollView>
    </SafeAreaView>
  );
}

const detailsStyles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 4,
  },
  label: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    flex: 1,
  },
  valueContainer: {
    flex: 1.5,
    alignItems: 'flex-end',
  },
  value: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textPrimary,
    textAlign: 'right',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    lineHeight: 26,
    marginBottom: theme.spacing.md,
  },
  actionRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  primaryBtn: {
    flex: 1,
  },
  secondaryBtn: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  relatedDoc: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
    paddingBottom: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  noBorder: {
    borderBottomWidth: 0,
    paddingBottom: 0,
    marginBottom: 0,
  },
  relatedDocSymbol: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.link,
    fontWeight: '600',
    marginBottom: 4,
  },
  relatedDocTitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  }
});
