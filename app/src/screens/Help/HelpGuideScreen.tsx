import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { Header, Card } from '../../components/shared';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - spacing.lg * 2 - spacing.md) / 2;

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

const GuideCard = ({ title, desc, icon, onPress }: any) => (
  <TouchableOpacity style={styles.cardWrapper} onPress={onPress} activeOpacity={0.8}>
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
      <Text style={styles.linkText}>Xem hướng dẫn {'>'}</Text>
    </Card>
  </TouchableOpacity>
);

const HelpGuideScreen = ({ navigation }: any) => {
  const handleGuidePress = (guide: any) => {
    navigation.navigate('HelpDetail', { guideId: guide.id, title: guide.title });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <Header 
        title="Hướng dẫn sử dụng" 
        onBack={() => navigation.goBack()} 
      />
      
      <ScrollView 
        style={styles.scrollContainer} 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Hướng dẫn sử dụng</Text>
          <Text style={styles.heroSubtitle}>
            Tài liệu hướng dẫn chi tiết giúp bạn tận dụng tối đa các tính năng của hệ thống
          </Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionLabel}>DANH MỤC HƯỚNG DẪN</Text>
          <View style={styles.grid}>
            {GUIDE_CATEGORIES.map((cat) => (
              <GuideCard
                key={cat.id}
                title={cat.title}
                desc={cat.desc}
                icon={cat.icon}
                onPress={() => handleGuidePress(cat)}
              />
            ))}
          </View>
        </View>
        
        <View style={styles.footerSpace} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    paddingBottom: spacing.xl,
  },
  heroSection: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: typography.fontWeight.semiBold,
    color: '#fff',
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  heroSubtitle: {
    fontSize: typography.fontSize.sm,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 300,
  },
  sectionContainer: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  sectionLabel: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: CARD_WIDTH,
    marginBottom: spacing.md,
  },
  guideCard: {
    padding: spacing.md,
    height: 185,
    justifyContent: 'space-between',
    borderRadius: spacing.borderRadius.lg,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    lineHeight: 18,
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 15,
  },
  linkText: {
    fontSize: 12,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  footerSpace: {
    height: spacing.xl,
  },
});

export default HelpGuideScreen;
