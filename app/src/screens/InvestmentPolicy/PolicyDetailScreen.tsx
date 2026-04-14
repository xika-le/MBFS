import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import * as theme from '../../theme';
import { Header, RelatedNews } from '../../components/shared';

export default function PolicyDetailScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Chính sách ưu đãi" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        
        <Text style={styles.title}>Nghị định 15/2026/NĐ-CP: Hướng dẫn ưu đãi đầu tư đối với khu công nghiệp sinh thái</Text>
        
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>Ban hành: 10/04/2026</Text>
          <Text style={styles.metaText}>Cơ quan: Chính phủ</Text>
        </View>

        <Image 
          source={{ uri: 'https://placehold.co/800x400/8b1a1a/ffffff?text=Ch%C3%ADnh+S%C3%A1ch+%C6%AFu+%C4%90%C3%A3i' }} 
          style={styles.heroImage} 
        />

        <View style={styles.highlightBox}>
          <Text style={styles.highlightText}>
            Tóm tắt: Nghị định mang đến sự thay đổi toàn diện trong chính sách hỗ trợ phát triển các mô hình KCN sinh thái, với việc giảm 100% thuế TNDN trong 4 năm đầu.
          </Text>
        </View>

        <Text style={styles.heading}>Chương I: Quy định chung</Text>
        <Text style={styles.paragraph}>
          Nghị định này định nghĩa rõ tiêu chí KCN sinh thái, theo đó phải đạt tối thiểu 70% doanh nghiệp trong khu áp dụng quy trình sản xuất sạch và tuân thủ tuyệt đối chuẩn mực xả thải.
        </Text>
        
        <Text style={styles.heading}>Chương II: Các hạng mục hỗ trợ</Text>
        <Text style={styles.paragraph}>
          Quỹ Bảo vệ Môi trường Việt Nam sẽ hỗ trợ vay vốn với lãi suất 0% trong năm đầu tiên cho mọi khoản vay chuyển đổi hệ thống xử lý nước thải đạt tiêu chuẩn KCN Sinh thái. Bên cạnh đó, ngân sách hỗ trợ đến 50% chi phí xây dựng phòng nghiên cứu R&D trong khu vực này.
        </Text>
        
        <View style={styles.downloadSection}>
          <Text style={styles.downloadTitle}>Tài liệu đính kèm:</Text>
          <View style={styles.fileCard}>
             <Text style={styles.fileIcon}>📄</Text>
             <View style={{ flex: 1 }}>
               <Text style={styles.fileName}>NghiDinh_15_2026_ND_CP.pdf</Text>
               <Text style={styles.fileSize}>1.2 MB</Text>
             </View>
             <Text style={styles.downloadBtn}>Tải về</Text>
          </View>
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
    color: '#8b1a1a',
    lineHeight: 28,
    marginBottom: theme.spacing.sm 
  },
  metaRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight
  },
  metaText: { 
    fontSize: theme.typography.fontSize.xs, 
    color: theme.colors.textSecondary,
    fontWeight: '500'
  },
  heroImage: { 
    width: '100%', 
    height: 160, 
    borderRadius: theme.spacing.borderRadius.md, 
    marginBottom: theme.spacing.lg 
  },
  highlightBox: {
    backgroundColor: theme.colors.infoBg,
    padding: theme.spacing.md,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.link,
    marginBottom: theme.spacing.lg
  },
  highlightText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textDark,
    lineHeight: 22,
    fontStyle: 'italic'
  },
  heading: { 
    fontSize: theme.typography.fontSize.md, 
    fontWeight: 'bold', 
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.xs 
  },
  paragraph: { 
    fontSize: theme.typography.fontSize.sm, 
    color: theme.colors.textSecondary,
    lineHeight: 22, 
    marginBottom: theme.spacing.lg,
  },
  downloadSection: {
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight
  },
  downloadTitle: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm
  },
  fileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    padding: theme.spacing.md,
    borderRadius: 8,
    gap: theme.spacing.md
  },
  fileIcon: {
    fontSize: 24,
  },
  fileName: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.textPrimary
  },
  fileSize: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textMuted
  },
  downloadBtn: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: theme.typography.fontSize.sm
  }
});
