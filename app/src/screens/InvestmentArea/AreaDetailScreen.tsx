import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, ImageBackground, Image } from 'react-native';
import * as theme from '../../theme';
import { Header, Card } from '../../components/shared';

export default function AreaDetailScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="An Giang" onBack={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Cover Image Placeholder */}
        <ImageBackground 
          source={{ uri: 'https://placehold.co/800x400/2f4f4f/ffffff?text=AN+GIANG\nTrung+tâm+nông+nghiệp' }} 
          style={styles.cover}
        >
          <View style={styles.coverOverlay}>
            <Text style={styles.coverTitle}>AN GIANG</Text>
            <Text style={styles.coverSubtitle}>"Trung tâm nông nghiệp và kinh tế biên giới"</Text>
          </View>
        </ImageBackground>

        {/* Stats Row */}
        <View style={styles.statsRow}>
           <View style={styles.statBox}>
             <Text style={[styles.statValue, { color: theme.colors.green }]}>6.2%</Text>
             <Text style={styles.statLabel}>TĂNG TRƯỞNG GRDP</Text>
           </View>
           <View style={styles.statBox}>
             <Text style={[styles.statValue, { color: theme.colors.linkDark }]}>2.2M</Text>
             <Text style={styles.statLabel}>DÂN SỐ</Text>
           </View>
           <View style={styles.statBox}>
             <Text style={[styles.statValue, { color: theme.colors.warningIcon }]}>$6.5B</Text>
             <Text style={styles.statLabel}>VỐN ĐẦU TƯ</Text>
           </View>
           <View style={styles.statBox}>
             <Text style={[styles.statValue, { color: theme.colors.primary }]}>3,536</Text>
             <Text style={styles.statLabel}>DIỆN TÍCH (km²)</Text>
           </View>
        </View>

        {/* Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>| Tổng quan đầu tư</Text>
          <Card>
            <Text style={styles.bodyText}>
              An Giang là tỉnh đầu nguồn sông Mekong, có lợi thế lớn về nông nghiệp công nghệ cao, chế biến thủy sản, thương mại biên giới và du lịch sinh thái - tâm linh.
            </Text>
          </Card>
        </View>

        {/* Sectors */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>| Lĩnh vực khuyến khích</Text>
          <View style={styles.chipRow}>
            {['Nông nghiệp công nghệ cao', 'Chế biến thủy sản', 'Logistics biên mậu', 'Du lịch sinh thái'].map(chip => (
              <View key={chip} style={styles.chip}>
                <Text style={styles.chipText}>{chip}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Infrastructure */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>| Hạ tầng KCN</Text>
          <Card style={styles.tableCard}>
            <View style={[styles.tableRow, styles.tableHeader]}>
               <Text style={[styles.tableCell, styles.tableHeaderText, { flex: 2 }]}>Tên KCN</Text>
               <Text style={[styles.tableCell, styles.tableHeaderText]}>Diện tích (ha)</Text>
               <Text style={[styles.tableCell, styles.tableHeaderText]}>Trạng thái</Text>
            </View>
            <View style={styles.tableRow}>
               <Text style={[styles.tableCell, { flex: 2, fontWeight: 'bold' }]}>Bình Hòa</Text>
               <Text style={styles.tableCell}>350</Text>
               <Text style={[styles.tableCell, { color: theme.colors.green }]}>• Sẵn sàng</Text>
            </View>
            <View style={styles.tableRow}>
               <Text style={[styles.tableCell, { flex: 2, fontWeight: 'bold' }]}>Hội An</Text>
               <Text style={styles.tableCell}>100</Text>
               <Text style={[styles.tableCell, { color: theme.colors.warningText }]}>• Đang quy hoạch</Text>
            </View>
          </Card>
        </View>

        {/* Location & Contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>| Vị trí địa lý & Liên hệ</Text>
          <Card style={styles.contactCard}>
            <Image source={{ uri: 'https://placehold.co/600x200/e2e8f0/64748b?text=Map+An+Giang+Vietnam' }} style={styles.mapImage} />
            <View style={styles.contactInfo}>
              <Text style={styles.contactText}>📍 Giáp Campuchia: 100 km</Text>
              <Text style={styles.contactText}>🚢 Cách cảng Cần Thơ: 60 km</Text>
              <View style={styles.contactDivider} />
              <Text style={styles.contactHighlight}>📞 +84 296 385 1212</Text>
              <Text style={styles.contactHighlight}>✉ xtdt@angiang.gov.vn</Text>
            </View>
          </Card>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xxl,
  },
  cover: {
    width: '100%',
    height: 220,
    justifyContent: 'flex-end',
  },
  coverOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  coverTitle: {
    color: '#fff',
    fontSize: theme.typography.fontSize.lg * 1.5,
    fontWeight: 'bold',
  },
  coverSubtitle: {
    color: '#eee',
    fontSize: theme.typography.fontSize.sm,
    fontStyle: 'italic',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.xl,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: theme.spacing.container.paddingHorizontal,
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semiBold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  bodyText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textPrimary,
    lineHeight: theme.typography.lineHeight.lg,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  chip: {
    backgroundColor: theme.colors.surfaceAlt,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 6,
    borderRadius: theme.spacing.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  chipText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  tableCard: {
    padding: 0,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceAlt,
  },
  tableHeader: {
    backgroundColor: theme.colors.surfaceAlt2,
  },
  tableCell: {
    flex: 1,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textPrimary,
  },
  tableHeaderText: {
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  contactCard: {
    padding: 0,
    overflow: 'hidden',
  },
  mapImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  contactInfo: {
    padding: theme.spacing.md,
    gap: 8,
  },
  contactText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textPrimary,
  },
  contactDivider: {
    height: 1,
    backgroundColor: theme.colors.borderLight,
    marginVertical: 4,
  },
  contactHighlight: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary,
    fontWeight: '600',
  }
});
