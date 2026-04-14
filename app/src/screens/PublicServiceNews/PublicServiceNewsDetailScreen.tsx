import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import * as theme from '../../theme';
import { Header, RelatedNews } from '../../components/shared';

export default function PublicServiceNewsDetailScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Chi tiết bản tin DVC" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Xóa bỏ 100% hồ sơ giấy trong cấp phép đầu tư trực tuyến</Text>
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>📅 14/04/2026</Text>
        </View>
        <Image source={{ uri: 'https://placehold.co/800x500/4682b4/ffffff?text=No+Paper' }} style={styles.heroImage} />
        <Text style={styles.paragraph}>
          Kể từ quý III năm 2026, toàn bộ hệ thống cấp phép đầu tư trực tuyến sẽ chính thức áp dụng mô hình "No Paper" (Không giấy tờ). Đây là bước chuyển mình quan trọng nhằm cắt giảm 40% thời gian xử lý hồ sơ hành chính, đồng thời tạo ra một môi trường làm việc thông minh, hiện đại và minh bạch nhất từ trước tới nay.
        </Text>
        <Text style={styles.paragraph}>
          Cụ thể, nhà đầu tư chỉ cần kê khai thông tin qua hệ thống mã số định danh điện tử, mọi giấy tờ liên quan phòng cháy chữa cháy, môi trường, thành lập doanh nghiệp sẽ tự động được thu thập từ Hệ sinh thái Dữ liệu Dân cư Quốc gia và chia sẻ liên thông giữa các bộ ban ngành. Ngay cả xác thực hợp đồng cũng sẽ áp dụng toàn bộ chữ ký số công cộng. 
        </Text>
        <Text style={styles.paragraph}>
          Ngoài ra, hệ thống tự động kiểm tra tính hợp lệ của tài liệu gốc thông qua trí tuệ nhân tạo (AI), cho phép phản hồi ngay lập tức 24/7 đối với mọi lỗi sai chuẩn định dạng hoặc thông tin chưa khớp với cơ sở dữ liệu quốc gia. Các cơ quan quản lý đầu tư cũng không cần kho lưu trữ vật lý mà chuyển toàn bộ sang hệ thống lưu trữ Cloud chuyên dụng của chính phủ.
        </Text>
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
  paragraph: { fontSize: theme.typography.fontSize.sm, color: theme.colors.textSecondary, lineHeight: 22 },
});
