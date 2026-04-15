import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  StatusBar,
} from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { Header, Card } from '../../components/shared';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const GUIDE_CATEGORIES = [
  {
    id: '100',
    title: 'Đăng nhập, đăng ký tài khoản',
    desc: 'Hướng dẫn đăng nhập, đăng ký tài khoản',
    icon: 'login',
  },
  {
    id: '101',
    title: 'Dịch vụ công trực tuyến',
    desc: 'Hướng dẫn sử dụng dịch vụ công và nộp hồ sơ',
    icon: 'file-document-outline',
  },
  {
    id: '102a',
    title: 'Tra cứu Văn bản Pháp luật',
    desc: 'Hướng dẫn tra cứu văn bản quy phạm pháp luật',
    icon: 'magnify',
  },
  {
    id: '102b',
    title: 'Tra cứu Thủ tục Hành chính',
    desc: 'Hướng dẫn tra cứu thủ tục, biểu mẫu',
    icon: 'clipboard-text-outline',
  },
  {
    id: '103',
    title: 'Kết nối đối tác',
    desc: 'Hướng dẫn sử dụng hệ thống kết nối đối tác',
    icon: 'sitemap-outline',
  },
];

const GuideCard = ({ title, desc, icon, onPress, cardWidth }: any) => (
  <TouchableOpacity style={[styles.cardWrapper, { width: cardWidth }]} onPress={onPress} activeOpacity={0.8}>
    <Card style={styles.guideCard}>
      <View style={styles.iconBox}>
        <MaterialCommunityIcons name={icon} size={24} color={colors.primary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDesc} numberOfLines={2}>
          {desc}
        </Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.readMore}>Xem ngay</Text>
        <MaterialCommunityIcons name="arrow-right" size={16} color={colors.primary} />
      </View>
    </Card>
  </TouchableOpacity>
);

const HelpGuideScreen = ({ navigation }: any) => {
  const { width } = useWindowDimensions();
  const cardWidth = (width - spacing.lg * 2 - spacing.md) / 2;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header 
        title="Hướng dẫn sử dụng" 
        onBack={() => navigation.goBack()}
      />
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Khu vực hướng dẫn</Text>
          <Text style={styles.welcomeDesc}>
            Lựa chọn chủ đề bạn đang quan tâm để xem hướng dẫn chi tiết về các tính năng trên hệ thống FIA.
          </Text>
        </View>

        <View style={styles.grid}>
          {GUIDE_CATEGORIES.map((item) => (
            <GuideCard
              key={item.id}
              {...item}
              cardWidth={cardWidth}
              onPress={() => navigation.navigate('HelpDetail', { guideId: item.id, title: item.title })}
            />
          ))}
        </View>

        <View style={styles.communitySection}>
          <View style={styles.commCard}>
            <View style={styles.commHeader}>
              <MaterialCommunityIcons name="message-question-outline" size={24} color={colors.primary} />
              <Text style={styles.commTitle}>Vẫn cần trợ giúp?</Text>
            </View>
            <Text style={styles.commDesc}>
              Tham khảo các câu hỏi thường gặp hoặc gửi phản ánh kiến nghị để được hỗ trợ trực tiếp.
            </Text>
            <View style={styles.commButtons}>
              <TouchableOpacity 
                style={[styles.commBtn, styles.primaryBtn]}
                onPress={() => navigation.navigate('FAQHome')}
              >
                <Text style={styles.primaryBtnText}>Xem FAQ</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.commBtn, styles.secondaryBtn]}>
                <Text style={styles.secondaryBtnText}>Liên hệ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  welcomeSection: {
    padding: spacing.xl,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF0F5',
  },
  welcomeTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  welcomeDesc: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.lg,
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  cardWrapper: {
    // Width is dynamic from props
  },
  guideCard: {
    padding: spacing.md,
    height: 180,
    justifyContent: 'space-between',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: `${colors.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.xs,
  },
  readMore: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
    marginRight: 4,
  },
  communitySection: {
    paddingHorizontal: spacing.xl,
    marginTop: spacing.md,
  },
  commCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#EDF0F5',
  },
  commHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  commTitle: {
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    fontWeight: '700',
    marginLeft: spacing.sm,
  },
  commDesc: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  commButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  commBtn: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBtn: {
    backgroundColor: colors.primary,
  },
  primaryBtnText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.surface,
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: colors.primary,
  },
  secondaryBtnText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.primary,
  },
});

export default HelpGuideScreen;
