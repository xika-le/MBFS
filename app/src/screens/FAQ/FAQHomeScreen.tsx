import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { colors, spacing, typography } from '../../theme';
import { Header, Card } from '../../components/shared';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FAQ_CATEGORIES = [
  { id: 'all', title: 'Tất cả', count: 39, icon: 'apps', color: '#8B1A2B' },
  { id: 'human_resource', title: 'Lao động & nhân sự', count: 4, icon: 'account-group', color: '#4F46E5' },
  { id: 'location', title: 'Địa điểm & cơ sở hạ tầng', count: 4, icon: 'map-marker-radius', color: '#EC4899' },
  { id: 'finance', title: 'Thuế và tài chính', count: 9, icon: 'cash-multiple', color: '#F59E0B' },
  { id: 'procedure', title: 'Thủ tục hành chính', count: 7, icon: 'clipboard-text', color: '#10B981' },
  { id: 'legal', title: 'Pháp lý & giấy tờ', count: 11, icon: 'scale-balance', color: '#6366F1' },
  { id: 'general', title: 'Câu hỏi chung', count: 4, icon: 'help-circle', color: '#E11D48' },
  { id: 'more', title: 'Xem tất cả', count: 0, icon: 'plus', color: '#6B7280' },
];

const POPULAR_QUESTIONS = [
  {
    id: 'q1',
    question: 'Cổng thông tin FIA cung cấp những dịch vụ gì cho nhà đầu tư nước ngoài?',
    answer: 'Cổng thông tin FIA cung cấp các dịch vụ chính bao gồm: tra cứu thông tin đầu tư, nộp hồ sơ trực tuyến, tra cứu văn bản pháp luật, kết nối đối tác, và hỗ trợ thủ tục hành chính cho nhà đầu tư nước ngoài tại Việt Nam.',
  },
  {
    id: 'q2',
    question: 'Làm thế nào để tạo tài khoản trên hệ thống?',
    answer: 'Để tạo tài khoản, bạn truy cập vào mục "Đăng ký" tại màn hình chính, điền đầy đủ thông tin cá nhân/tổ chức và xác thực qua email hoặc số điện thoại.',
  },
];

type Props = NativeStackScreenProps<RootStackParamList, 'FAQHome'>;

const FAQHomeScreen = ({ navigation }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { width } = useWindowDimensions();

  const cardWidth = (width - 48) / 2;

  const renderCategoryCard = (item: typeof FAQ_CATEGORIES[0]) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.cardWrapper, { width: cardWidth }]}
      onPress={() => item.id !== 'more' && navigation.navigate('FAQCategory', { 
        categoryId: item.id,
        categoryName: item.title 
      })}
    >
      <View style={[styles.card, styles.categoryCard, item.id === 'all' && styles.activeCard]}>
        <View style={styles.cardContentInner}>
          <View style={[styles.iconBox, item.id === 'all' && styles.activeIconBox]}>
            <MaterialCommunityIcons 
              name={item.icon as any} 
              size={24} 
              color={item.id === 'all' ? colors.surface : colors.primary} 
            />
          </View>
          <Text style={[styles.cardCategory, item.id === 'all' && styles.activeText]}>{item.title}</Text>
          <Text style={[styles.cardCount, item.id === 'all' && styles.activeText]}>{item.count} câu hỏi</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Câu hỏi thường gặp" 
        onBack={() => navigation.goBack()}
      />
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Chúng tôi có thể giúp gì cho bạn?</Text>
          <View style={styles.searchContainer}>
            <MaterialCommunityIcons name="magnify" size={24} color={colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm kiếm câu hỏi..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Chủ đề phổ biến</Text>
        </View>

        <View style={styles.grid}>
          {FAQ_CATEGORIES.map(renderCategoryCard)}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Câu hỏi thường gặp</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>

        {POPULAR_QUESTIONS.map((item) => (
          <Card key={item.id} style={styles.questionCard}>
            <Text style={styles.question}>{item.question}</Text>
            <Text style={styles.answer} numberOfLines={3}>{item.answer}</Text>
            <TouchableOpacity style={styles.readMoreBtn}>
              <Text style={styles.readMoreText}>Đọc tiếp</Text>
              <MaterialCommunityIcons name="chevron-right" size={16} color={colors.primary} />
            </TouchableOpacity>
          </Card>
        ))}

        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Vẫn chưa tìm thấy câu trả lời?</Text>
          <Text style={styles.contactDesc}>
            Nếu bạn không tìm thấy thông tin mình cần, hãy liên hệ trực tiếp với chúng tôi để được hỗ trợ.
          </Text>
          <TouchableOpacity style={styles.contactBtn}>
            <Text style={styles.contactBtnText}>Gửi yêu cầu hỗ trợ</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  heroSection: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  heroTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F3F5',
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    height: 50,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.regular,
    color: colors.textPrimary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.md,
    lineHeight: typography.lineHeight.md,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  seeAllText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
  },
  cardWrapper: {
    padding: 8,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryCard: {
    height: 140,
    justifyContent: 'center',
  },
  cardContentInner: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  activeCard: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
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
  activeIconBox: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  cardCategory: {
    fontSize: typography.fontSize.sm,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
  },
  activeText: {
    color: colors.surface,
  },
  cardCount: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  questionCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    padding: spacing.lg,
  },
  question: {
    fontSize: typography.fontSize.md,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  answer: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  readMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMoreText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: '600',
    marginRight: 4,
  },
  contactSection: {
    marginTop: spacing.xl,
    padding: spacing.xl,
    backgroundColor: '#8B1A2B10',
    marginHorizontal: spacing.lg,
    borderRadius: 20,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  contactDesc: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  contactBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 12,
  },
  contactBtnText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.surface,
  },
});

export default FAQHomeScreen;
