import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, FlatList } from 'react-native';
import * as theme from '../../theme';
import { Header, Input, Card, Badge, Button } from '../../components/shared';

const MOCK_DATA = [
  {
    id: '1',
    type: 'Quyết định',
    status: 'Còn hiệu lực',
    title: 'Quyết định về việc ban hành Quy chế quản lý đầu tư',
    symbol: '50/2020/QĐ-TTg',
    publishDate: '21/09/2020',
    effectiveDate: '21/09/2020',
    agency: 'Thủ tướng Chính phủ'
  },
  {
    id: '2',
    type: 'Nghị định',
    status: 'Còn hiệu lực',
    title: 'Nghị định về đầu tư theo phương thức đối tác công',
    symbol: '31/2021/NĐ-CP',
    publishDate: '26/03/2021',
    effectiveDate: '15/05/2021',
    agency: 'Chính phủ'
  },
  {
    id: '3',
    type: 'Nghị định',
    status: 'Còn hiệu lực',
    title: 'Nghị định về thực hiện thủ tục hành chính trên môi trường điện tử',
    symbol: '61/2020/NĐ-CP',
    publishDate: '27/05/2020',
    effectiveDate: '15/07/2020',
    agency: 'Chính phủ'
  },
  {
    id: '4',
    type: 'Nghị định',
    status: 'Còn hiệu lực',
    title: 'Nghị định về đầu tư ra nước ngoài, hợp tác đầu tư',
    symbol: '118/2015/NĐ-CP',
    publishDate: '12/11/2015',
    effectiveDate: '01/01/2016',
    agency: 'Chính phủ'
  },
  {
    id: '5',
    type: 'Nghị định',
    status: 'Còn hiệu lực',
    title: 'Nghị định về quản lý dự án đầu tư xây dựng',
    symbol: '59/2015/NĐ-CP',
    publishDate: '18/06/2015',
    effectiveDate: '15/08/2015',
    agency: 'Chính phủ'
  }
];

export default function LegalDocumentListScreen({ navigation }: any) {
  const renderItem = ({ item }: { item: any }) => (
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
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Văn bản pháp luật" onBack={() => navigation.goBack()} />
      
      <View style={styles.searchSection}>
        <Input placeholder="Nhập điều kiện tìm kiếm (số ký hiệu, tên văn bản...)" />
        <Text style={styles.description}>
          Trang này cung cấp đầy đủ văn bản pháp luật liên quan đến các hoạt động đầu tư, chính sách hỗ trợ phát triển.
        </Text>
      </View>

      <FlatList
        data={MOCK_DATA}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchSection: {
    padding: theme.spacing.lg,
    paddingBottom: 0,
  },
  description: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
    marginTop: theme.spacing.md,
    lineHeight: 20,
  },
  listContent: {
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
    paddingTop: 0,
    paddingBottom: theme.spacing.xxl,
  },
  card: {
    marginBottom: theme.spacing.md,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  cardTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    lineHeight: 22,
    marginBottom: theme.spacing.md,
  },
  infoRow: {
    marginBottom: theme.spacing.sm,
  },
  infoText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  agencyText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  detailButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    height: 'auto',
  },
  detailButtonText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '500',
  }
});
