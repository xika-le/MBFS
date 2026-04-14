import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { colors, spacing, typography } from '../../theme';
import { Header, Card } from '../../components/shared';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

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

  const renderCategoryCard = (item: typeof FAQ_CATEGORIES[0]) => (
    <TouchableOpacity
      key={item.id}
      style={styles.cardWrapper}
      onPress={() => item.id !== 'more' && navigation.navigate('FAQCategory', { 
        categoryId: item.id,
        categoryName: item.title 
      })}
    >
      <View style={[styles.card, styles.categoryCard, item.id === 'all' && styles.activeCard]}>
        <View style={[styles.iconBox, { backgroundColor: `${item.color}15` }]}>
          <MaterialCommunityIcons name={item.icon as any} size={24} color={item.color} />
        </View>
        <Text style={styles.cardTitle}>{item.title}</Text>
        {item.count > 0 && (
          <Text style={styles.cardCount}>{item.count} câu hỏi</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Câu hỏi thường gặp" onBack={() => navigation.goBack()} />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Chọn chủ đề</Text>
        
        <View style={styles.grid}>
          {FAQ_CATEGORIES.map(renderCategoryCard)}
        </View>

        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <MaterialCommunityIcons name="magnify" size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm kiếm câu hỏi, từ khóa..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={colors.textSecondary}
            />
          </View>
        </View>

        <View style={styles.popularSection}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="star" size={20} color="#F59E0B" style={{ marginRight: 8 }} />
            <Text style={styles.sectionTitle}>Câu hỏi phổ biến nhất</Text>
          </View>

          {POPULAR_QUESTIONS.map((item) => (
            <AccordionItem key={item.id} question={item.question} answer={item.answer} />
          ))}
        </View>
        
        <View style={styles.footerSpace} />
      </ScrollView>
    </View>
  );
};

const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card style={styles.accordionCard}>
      <TouchableOpacity
        onPress={() => setIsExpanded(!isExpanded)}
        style={styles.accordionHeader}
        activeOpacity={0.7}
      >
        <Text style={styles.questionText}>{question}</Text>
        <MaterialCommunityIcons
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={colors.textSecondary}
        />
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.accordionContent}>
          <View style={styles.divider} />
          <Text style={styles.answerText}>{answer}</Text>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  cardWrapper: {
    width: '48%',
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  categoryCard: {
    padding: spacing.md,
    alignItems: 'center',
    minHeight: 110,
    justifyContent: 'center',
    borderRadius: 16,
    flex: 1,
    height: '100%',
  },
  activeCard: {
    borderColor: colors.primary,
    borderWidth: 1,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
  },
  cardCount: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  searchSection: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: spacing.md,
    borderRadius: 12,
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: 14,
    color: colors.textPrimary,
  },
  popularSection: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  accordionCard: {
    padding: 0,
    marginBottom: spacing.sm,
    borderRadius: 12,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  questionText: {
    flex: 1,
    fontSize: 14,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    paddingRight: spacing.sm,
  },
  accordionContent: {
    padding: spacing.md,
    backgroundColor: '#F9FAFB',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: spacing.md,
  },
  answerText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  footerSpace: {
    height: 40,
  },
});

export default FAQHomeScreen;
