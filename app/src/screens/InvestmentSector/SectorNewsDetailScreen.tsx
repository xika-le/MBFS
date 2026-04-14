import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import * as theme from '../../theme';
import { Header, RelatedNews } from '../../components/shared';

export default function SectorNewsDetailScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Lĩnh vực đầu tư" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        
        <Text style={styles.title}>Đẩy mạnh thu hút FDI vào lĩnh vực Nông nghiệp công nghệ cao</Text>
        
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>📅 14/04/2026</Text>
          <Text style={styles.metaText}>👀 1,205 lượt xem</Text>
        </View>

        <Image 
          source={{ uri: 'https://placehold.co/800x500/2e8b57/ffffff?text=N%C3%B4ng+Nghi%E1%BB%87p' }} 
          style={styles.heroImage} 
        />

        <Text style={styles.leadParagraph}>
          Năm 2026, lĩnh vực nông nghiệp công nghệ cao đang được ưu tiên hàng đầu tại vùng Đồng bằng Sông Cửu Long nhằm thích ứng với biến đổi khí hậu và tối ưu sản lượng.
        </Text>

        <Text style={styles.paragraph}>
          Theo báo cáo từ Bộ Kế hoạch và Đầu tư, nguồn vốn FDI đổ vào lĩnh vực này dự kiến sẽ tăng 15% so với cùng kỳ năm ngoái. Các địa phương như An Giang, Đồng Tháp đang tung ra nhiều cơ chế ưu đãi đặc biệt về hỗ trợ hạ tầng và miễn giảm thuế đất cho các doanh nghiệp đầu tư vào chuỗi chế biến sâu.
        </Text>
        
        <Text style={styles.paragraph}>
          Chính phủ đang kỳ vọng việc áp dụng IOT, nhà màng tự động, và các công cụ quản lý chất lượng nông sản bằng Blockchain sẽ là tiền đề để các doanh nghiệp đưa nông sản Việt Nam vươn xa hơn tới các thị trường khó tính như EU và Nhật Bản.
        </Text>

        <View style={styles.tagsContainer}>
          <Text style={styles.tagText}>#NongNghiepCNC</Text>
          <Text style={styles.tagText}>#FDI</Text>
        </View>

        <RelatedNews />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: theme.colors.background 
  },
  content: { 
    padding: theme.spacing.lg, 
    paddingBottom: theme.spacing.xxl 
  },
  title: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: theme.colors.textPrimary,
    lineHeight: 28,
    marginBottom: theme.spacing.sm 
  },
  metaRow: { 
    flexDirection: 'row', 
    gap: theme.spacing.md, 
    marginBottom: theme.spacing.md 
  },
  metaText: { 
    fontSize: theme.typography.fontSize.xs, 
    color: theme.colors.textMuted 
  },
  heroImage: { 
    width: '100%', 
    height: 200, 
    borderRadius: theme.spacing.borderRadius.md, 
    marginBottom: theme.spacing.md 
  },
  leadParagraph: { 
    fontSize: theme.typography.fontSize.md, 
    fontWeight: '600', 
    color: theme.colors.textPrimary,
    lineHeight: 24, 
    marginBottom: theme.spacing.md 
  },
  paragraph: { 
    fontSize: theme.typography.fontSize.sm, 
    color: theme.colors.textSecondary,
    lineHeight: 22, 
    marginBottom: theme.spacing.md,
    textAlign: 'justify' 
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
  tagText: {
    color: theme.colors.link,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '500'
  }
});
