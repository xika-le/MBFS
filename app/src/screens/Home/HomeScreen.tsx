import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { Icon, Badge } from '../../components/shared';
import { RootStackParamList } from '../../navigation/AppNavigator';

type HomeScreenNavigationProp = DrawerNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { width } = useWindowDimensions();

  const itemWidth = (width - 32 - 16) / 3;

  const quickAccessItems = [
    { title: 'Hướng dẫn sử dụng', icon: 'help-circle' as const, route: 'HelpGuide' },
    { title: 'Quản lý hồ sơ', icon: 'folder' as const, route: 'DossierList' },
    { title: 'Quản lý đặt lịch', icon: 'calendar' as const, route: 'AppointmentList' },
    { title: 'Khu công nghiệp / KKT', icon: 'layers' as const, route: 'IZList', params: { zoneType: 'kcn' } },
    { title: 'Câu hỏi (FAQ)', icon: 'help-circle' as const, route: 'FAQHome' },
    { title: 'Văn bản pháp luật', icon: 'book' as const, route: 'LegalDocumentList' },
  ];

  const stats = [
    { label: 'Tổng dự án', value: '12', color: colors.link },
    { label: 'Đang xử lý', value: '3', color: colors.warningText },
    { label: 'Đã hoàn thành', value: '8', color: colors.successText },
    { label: 'Quá hạn', value: '1', color: '#e53935' },
  ];

  const suggestions = [
    { title: 'Hồ sơ Dự án ABC cần bổ sung', deadline: 'Hạn: 20/04/2026', type: 'warning' },
    { title: 'Báo cáo quý I/2026 sắp đến hạn', deadline: 'Hạn: 15/04/2026', type: 'warning' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Icon name="menu" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        
        <View style={styles.logoAndTitle}>
          <View style={styles.logoBadge}>
            <Icon name="activity" size={20} color={colors.surface} />
          </View>
          <Text style={styles.headerTitle}>Cổng Đầu Tư</Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notifyButton}>
            <Icon name="bell" size={24} color={colors.textPrimary} />
            <View style={styles.notifyBadge} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={() => navigation.navigate('LegalDocumentList')}
          >
            <Icon name="search" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* User Card */}
        <View style={styles.userCardWrapper}>
          <View style={[styles.userCard, { backgroundColor: colors.primary }]}>
            <View style={styles.userCardContent}>
              <View style={styles.avatarContainer}>
                <Icon name="user" size={24} color={colors.surface} />
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.greetingText}>Xin chào,</Text>
                <Text style={styles.userNameText}>Nguyễn Văn A</Text>
                <Text style={styles.userRoleText}>Nhà đầu tư</Text>
                <View style={styles.userStatusRow}>
                  <Icon name="file-text" size={16} color={colors.surface} />
                  <Text style={styles.userStatusText}>Bạn có 3 hồ sơ đang xử lý</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Access */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Truy cập nhanh</Text>
          <View style={styles.quickAccessGrid}>
            {quickAccessItems.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.quickAccessItem, { width: itemWidth }]}
                onPress={() => {
                  if (item.route && item.route !== 'Placeholder') {
                    // @ts-ignore
                    navigation.navigate(item.route, item.params);
                  }
                }}
              >
                <View style={styles.quickAccessIconBg}>
                  <Icon name={item.icon} size={24} color={colors.primary} />
                </View>
                <Text style={styles.quickAccessText} numberOfLines={2}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Investment Overview */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Tổng quan đầu tư</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statsScroll}>
            {stats.map((item, index) => (
              <View key={index} style={styles.statCard}>
                <Text style={[styles.statValue, { color: item.color }]}>{item.value}</Text>
                <Text style={styles.statLabel}>{item.label}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Suggestions */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Gợi ý cho bạn</Text>
          <View style={styles.suggestionList}>
            {suggestions.map((item, index) => (
              <View key={index} style={styles.suggestionItem}>
                <View style={styles.suggestionIcon}>
                  <Icon name="alert-circle" size={20} color={colors.warningText} />
                </View>
                <View style={styles.suggestionContent}>
                  <Text style={styles.suggestionTitle}>{item.title}</Text>
                  <Text style={styles.suggestionDeadline}>{item.deadline}</Text>
                </View>
                <TouchableOpacity style={styles.suggestionButton} onPress={() => navigation.navigate('DossierList')}>
                  <Text style={styles.suggestionButtonText}>Xử lý</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* News Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tin tức</Text>
            <TouchableOpacity onPress={() => navigation.navigate('InvestmentNews')}>
              <Text style={styles.seeAllText}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.newsTabs}>
            <TouchableOpacity style={[styles.newsTab, styles.activeNewsTab]}>
              <Text style={styles.activeNewsTabText}>Tin đầu tư</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.newsTab}>
              <Text style={styles.newsTabText}>Chính sách</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.newsTab}>
              <Text style={styles.newsTabText}>Thành công</Text>
            </TouchableOpacity>
          </ScrollView>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.newsScroll}>
            <TouchableOpacity 
              style={styles.newsCard}
              onPress={() => navigation.navigate('PolicyNews')}
            >
              <Image 
                source={{ uri: 'https://picsum.photos/400/200?random=1' }} 
                style={styles.newsImage} 
              />
              <View style={styles.newsContent}>
                <View style={styles.newsMeta}>
                  <Badge label="Chính sách" variant="info" />
                  <Text style={styles.newsDate}>12/04/2026</Text>
                </View>
                <Text style={styles.newsTitle} numberOfLines={2}>
                  Chính sách mới hỗ trợ nhà đầu tư nước ngoài tại Việt Nam
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.newsCard}
              onPress={() => navigation.navigate('InvestmentNews')}
            >
              <Image 
                source={{ uri: 'https://picsum.photos/400/200?random=2' }} 
                style={styles.newsImage} 
              />
              <View style={styles.newsContent}>
                <View style={styles.newsMeta}>
                  <Badge label="Tin đầu tư" variant="info" />
                  <Text style={styles.newsDate}>11/04/2026</Text>
                </View>
                <Text style={styles.newsTitle} numberOfLines={2}>
                  Khu công nghiệp công nghệ cao thu hút 500 triệu USD
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Bottom Banner */}
        <View style={styles.bannerWrapper}>
          <View style={[styles.banner, { backgroundColor: colors.link }]}>
            <Text style={styles.bannerCategory}>Cơ hội đầu tư</Text>
            <Text style={styles.bannerTitle}>Ưu đãi thuế đặc biệt cho dự án công nghệ cao</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={[styles.bannerButtonText, { color: colors.link }]}>Tìm hiểu thêm</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    height: 56,
  },
  headerButton: {
    padding: spacing.xs,
  },
  logoAndTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logoBadge: {
    backgroundColor: colors.primary,
    width: 32,
    height: 32,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: typography.fontWeight.medium,
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  notifyButton: {
    padding: spacing.xs,
    position: 'relative',
  },
  searchButton: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifyBadge: {
    position: 'absolute',
    top: 6,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e53935',
  },
  userCardWrapper: {
    padding: spacing.md,
  },
  userCard: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  userCardContent: {
    flexDirection: 'row',
    gap: 12,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  greetingText: {
    fontWeight: typography.fontWeight.regular,
    fontSize: typography.fontSize.sm,
    color: colors.surface,
    opacity: 0.9,
  },
  userNameText: {
    fontWeight: typography.fontWeight.medium,
    fontSize: typography.fontSize.lg,
    color: colors.surface,
    marginVertical: 2,
  },
  userRoleText: {
    fontWeight: typography.fontWeight.regular,
    fontSize: typography.fontSize.xs,
    color: colors.surface,
    opacity: 0.9,
  },
  userStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  userStatusText: {
    fontWeight: typography.fontWeight.regular,
    fontSize: typography.fontSize.sm,
    color: colors.surface,
  },
  sectionContainer: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontWeight: typography.fontWeight.medium,
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  seeAllText: {
    fontWeight: typography.fontWeight.medium,
    fontSize: typography.fontSize.xs,
    color: colors.primary,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickAccessItem: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    aspectRatio: 1,
  },
  quickAccessIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: `${colors.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickAccessText: {
    fontWeight: typography.fontWeight.medium,
    fontSize: 11,
    textAlign: 'center',
    color: colors.textPrimary,
  },
  statsScroll: {
    gap: 8,
  },
  statCard: {
    width: 120,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    borderRadius: 16,
    padding: 12,
  },
  statValue: {
    fontWeight: typography.fontWeight.semiBold,
    fontSize: 24,
    marginBottom: 4,
  },
  statLabel: {
    fontWeight: typography.fontWeight.regular,
    fontSize: 10,
    color: colors.textSecondary,
  },
  suggestionList: {
    gap: 8,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,152,0,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,152,0,0.2)',
    borderRadius: 16,
    padding: 12,
  },
  suggestionIcon: {
    marginRight: 12,
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionTitle: {
    fontWeight: typography.fontWeight.medium,
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
  },
  suggestionDeadline: {
    fontWeight: typography.fontWeight.regular,
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  suggestionButton: {
    backgroundColor: colors.warningText,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  suggestionButtonText: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: typography.fontWeight.medium,
  },
  newsTabs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  newsTab: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  activeNewsTab: {
    backgroundColor: colors.primary,
  },
  activeNewsTabText: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: typography.fontWeight.medium,
  },
  newsTabText: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: typography.fontWeight.medium,
  },
  newsScroll: {
    gap: 16,
  },
  newsCard: {
    width: 256,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  newsImage: {
    width: '100%',
    height: 144,
  },
  newsContent: {
    padding: 12,
  },
  newsMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  newsDate: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  newsTitle: {
    fontWeight: typography.fontWeight.medium,
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
    lineHeight: 18,
  },
  bannerWrapper: {
    paddingHorizontal: spacing.md,
  },
  banner: {
    borderRadius: 16,
    padding: 24,
    overflow: 'hidden',
  },
  bannerCategory: {
    fontWeight: typography.fontWeight.regular,
    fontSize: typography.fontSize.sm,
    color: colors.surface,
    opacity: 0.9,
    marginBottom: 8,
  },
  bannerTitle: {
    fontWeight: typography.fontWeight.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.surface,
    marginBottom: 16,
  },
  bannerButton: {
    backgroundColor: colors.surface,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    fontWeight: typography.fontWeight.medium,
    fontSize: typography.fontSize.sm,
  },
});
