import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import * as theme from '../../theme';
import { Header, RelatedNews } from '../../components/shared';

export default function InvestmentNewsDetailScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Chi tiết bản tin" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Thủ tướng chủ trì hội nghị xúc tiến đầu tư toàn quốc 2026</Text>
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>📅 14/04/2026</Text>
          <Text style={styles.metaText}>👀 2,845 lượt xem</Text>
        </View>
        <Image source={{ uri: 'https://placehold.co/800x500/2f4f4f/ffffff?text=H%E1%BB%99i+Ngh%E1%BB%8B' }} style={styles.heroImage} />
        <Text style={styles.leadParagraph}>Thông điệp cao nhất luôn lấy nhà đầu tư làm đối tác phát triển lâu dài.</Text>
        <Text style={styles.paragraph}>
          Bức tranh kinh tế đầu năm nay cho thấy sự khởi sắc mạnh mẽ nhờ dòng vốn đầu tư nước ngoài (FDI) tiếp tục đổ dồn vào lĩnh vực công nghệ cao và sản xuất chíp bán dẫn. Các lãnh đạo cấp cao nhấn mạnh việc hoàn thiện hạ tầng cứng và mềm là nhiệm vụ trọng tâm để thu hút thế hệ nhà đầu tư mới có hàm lượng chất xám cao.
        </Text>
        <Text style={styles.paragraph}>
          Tại hội nghị, Phó Thủ tướng cũng đưa ra chỉ đạo yêu cầu các bộ ngành liên quan phải đảm bảo cam kết "3 Không" với nhà đầu tư: Không gây khó khăn phiền hà, không phát sinh chi phí di chuyển không cần thiết, và không chậm trễ trong việc giải quyết thủ tục hành chính. Đây được xem là thông điệp quyết liệt từ chính phủ.
        </Text>
        <View style={styles.tagsContainer}>
          <Text style={styles.tagText}>#HoiNghiTrucTuyen</Text>
          <Text style={styles.tagText}>#FDI</Text>
        </View>
        <RelatedNews />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: theme.spacing.lg, paddingBottom: theme.spacing.xxl },
  title: { fontSize: 20, fontWeight: 'bold', color: theme.colors.textPrimary, lineHeight: 28, marginBottom: theme.spacing.sm },
  metaRow: { flexDirection: 'row', gap: theme.spacing.md, marginBottom: theme.spacing.md },
  metaText: { fontSize: theme.typography.fontSize.xs, color: theme.colors.textMuted },
  heroImage: { width: '100%', height: 200, borderRadius: theme.spacing.borderRadius.md, marginBottom: theme.spacing.md },
  leadParagraph: { fontSize: theme.typography.fontSize.md, fontWeight: '600', color: theme.colors.textPrimary, lineHeight: 24, marginBottom: theme.spacing.md },
  paragraph: { fontSize: theme.typography.fontSize.sm, color: theme.colors.textSecondary, lineHeight: 22, textAlign: 'justify' },
  tagsContainer: { flexDirection: 'row', gap: theme.spacing.sm, marginTop: theme.spacing.md },
  tagText: { color: theme.colors.link, fontSize: theme.typography.fontSize.sm, fontWeight: '500' }
});
