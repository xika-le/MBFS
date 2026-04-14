import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import * as theme from '../../theme';
import { Header, RelatedNews } from '../../components/shared';

export default function SuccessStoryDetailScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Câu chuyện thành công" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Apple mở rộng chuỗi cung ứng</Text>
        <Image source={{ uri: 'https://placehold.co/800x500/8b4513/ffffff?text=Apple+Supplier' }} style={styles.heroImage} />
        <Text style={styles.paragraph}>
          Bài viết kể về quá trình Apple thiết lập và mở rộng chuỗi cung ứng tại khu vực phía Bắc Việt Nam, đặc biệt là Bắc Giang và Bắc Ninh. Ban đầu chỉ là các nhà máy quy mô nhỏ chuyên lắp ráp phụ kiện, nhưng sau vài năm, khu vực này đã trở thành thung lũng sản xuất khổng lồ của một trong những tập đoàn công nghệ lớn nhất thế giới.
        </Text>
        <Text style={styles.paragraph}>
          Chìa khóa cho sự thành công này không chỉ đến từ nhân công giá rẻ mà chính là sự hỗ trợ toàn diện từ chính quyền địa phương trong việc giải phóng mặt bằng, xây dựng cơ sở hạ tầng giao thông và điện lưới ổn định. Sự cam kết đầu tư dài hạn của Apple còn kéo theo một hệ sinh thái FDI các nhà thầu phụ cấp 1, cấp 2 từ Hàn Quốc, Nhật Bản ồ ạt đổ bộ vào Việt Nam.
        </Text>
        <Text style={styles.paragraph}>
          Thành công của dự án này đã tạo ra hơn 100,000 việc làm mới thúc đẩy kinh tế địa phương và quan trọng hơn là nâng cao kỹ năng cho lực lượng lao động công nghiệp nước nhà để đáp ứng tiêu chuẩn kỹ thuật nghiêm ngặt của chuỗi giá trị toàn cầu.
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
  heroImage: { width: '100%', height: 200, borderRadius: theme.spacing.borderRadius.md, marginBottom: theme.spacing.md },
  paragraph: { fontSize: theme.typography.fontSize.sm, color: theme.colors.textSecondary, lineHeight: 22 },
});
