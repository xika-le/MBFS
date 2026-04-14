import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { colors, spacing, typography } from '../../theme';
import { Header, Card } from '../../components/shared';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CATEGORY_DATA: Record<string, { badgeColor: string, icon: string, questions: any[] }> = {
  general: {
    badgeColor: '#E11D48',
    icon: 'help-circle',
    questions: [
      {
        id: 'g1',
        isPopular: true,
        question: 'Cổng thông tin FIA cung cấp những dịch vụ gì cho nhà đầu tư nước ngoài?',
        answer: 'Cổng thông tin FIA cung cấp các dịch vụ chính bao gồm: tra cứu thông tin đầu tư, nộp hồ sơ trực tuyến, tra cứu văn bản pháp luật, kết nối đối tác, và hỗ trợ thủ tục hành chính cho nhà đầu tư nước ngoài tại Việt Nam.',
      },
      {
        id: 'g2',
        question: 'Làm thế nào để tạo tài khoản trên hệ thống?',
        answer: 'Để tạo tài khoản, bạn truy cập vào mục "Đăng ký" tại màn hình chính, điền đầy đủ thông tin cá nhân/tổ chức và xác thực qua email hoặc số điện thoại.',
      },
      {
        id: 'g3',
        question: 'Ngôn ngữ nào được hỗ trợ trên cổng thông tin?',
        answer: 'Hệ thống hiện tại hỗ trợ Tiếng Việt và Tiếng Anh.',
      },
      {
        id: 'g4',
        question: 'Tôi có thể liên hệ hỗ trợ kỹ thuật qua kênh nào?',
        answer: 'Bạn có thể liên hệ hotline hoặc gửi yêu cầu qua trang "Liên hệ" trong ứng dụng.',
      },
    ],
  },
  legal: {
    badgeColor: '#6366F1',
    icon: 'scale-balance',
    questions: [
      {
        id: 'l1',
        isPopular: true,
        question: 'Nhà đầu tư nước ngoài cần những loại giấy phép nào để hoạt động tại Việt Nam?',
        answer: 'Nhà đầu tư nước ngoài thường cần: (1) Giấy chứng nhận đăng ký đầu tư (IRC), (2) Giấy chứng nhận đăng ký doanh nghiệp (ERC), và các giấy phép chuyên ngành tùy theo lĩnh vực hoạt động.',
      },
      {
        id: 'l2',
        question: 'Thời hạn hiệu lực của Giấy chứng nhận đăng ký đầu tư là bao lâu?',
        answer: 'Thời hạn hoạt động của dự án đầu tư được ghi trong Giấy chứng nhận đăng ký đầu tư, thường không quá 50 năm (hoặc 70 năm tùy trường hợp cụ thể).',
      },
    ],
  },
  finance: {
    badgeColor: '#F59E0B',
    icon: 'cash-multiple',
    questions: [
      {
        id: 'f1',
        isPopular: true,
        question: 'Các loại thuế doanh nghiệp FDI phải nộp tại Việt Nam?',
        answer: 'Doanh nghiệp FDI tại Việt Nam phải nộp các loại thuế chính: Thuế thu nhập doanh nghiệp (TNDN) - thông thường 20%; Thuế giá trị gia tăng (GTGT) - 10% hoặc 5%; Thuế nhà thầu (nếu có); và các loại thuế khác theo quy định.',
      },
    ],
  },
};

type Props = NativeStackScreenProps<RootStackParamList, 'FAQCategory'>;

const FAQCategoryScreen = ({ route, navigation }: Props) => {
  const { categoryId, categoryName } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const data = CATEGORY_DATA[categoryId] || CATEGORY_DATA['general'];

  const filteredQuestions = data.questions.filter(q => 
    q.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Header title={categoryName} onBack={() => navigation.goBack()} />
      
      <View style={styles.content}>
        <View style={[styles.categoryBadge, { backgroundColor: data.badgeColor }]}>
          <MaterialCommunityIcons name={data.icon as any} size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.badgeText}>{categoryName} • {data.questions.length} câu hỏi</Text>
        </View>

        <View style={styles.searchBar}>
          <MaterialCommunityIcons name="magnify" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder={`Tìm kiếm trong ${categoryName.toLowerCase()}...`}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        <FlatList
          data={filteredQuestions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AccordionItem item={item} categoryColor={data.badgeColor} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Không tìm thấy câu hỏi phù hợp.</Text>
          }
        />
      </View>
    </View>
  );
};

const AccordionItem = ({ item, categoryColor }: { item: any, categoryColor: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card style={styles.accordionCard}>
      <TouchableOpacity
        onPress={() => setIsExpanded(!isExpanded)}
        style={styles.accordionHeader}
        activeOpacity={0.7}
      >
        <View style={styles.headerContent}>
          <View style={styles.metaRow}>
            {item.isPopular && (
              <View style={styles.popularBadge}>
                <MaterialCommunityIcons name="star" size={12} color="#F59E0B" style={{ marginRight: 4 }} />
                <Text style={styles.popularText}>Phổ biến</Text>
              </View>
            )}
            <View style={styles.topicBadge}>
              <MaterialCommunityIcons name="help-circle-outline" size={12} color={categoryColor} style={{ marginRight: 4 }} />
              <Text style={[styles.topicText, { color: categoryColor }]}>Câu hỏi chung</Text>
            </View>
          </View>
          <Text style={styles.questionText}>{item.question}</Text>
        </View>
        <MaterialCommunityIcons
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={colors.textSecondary}
        />
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.accordionContent}>
          <View style={styles.divider} />
          <Text style={styles.answerText}>{item.answer}</Text>
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
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 99,
    alignSelf: 'flex-start',
    marginBottom: spacing.md,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: typography.fontWeight.semiBold,
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
    marginBottom: spacing.lg,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: 14,
    color: colors.textPrimary,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  accordionCard: {
    padding: 0,
    marginBottom: spacing.md,
    borderRadius: 16,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  headerContent: {
    flex: 1,
    paddingRight: 10,
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  popularBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  popularText: {
    fontSize: 10,
    color: '#D97706',
    fontWeight: typography.fontWeight.semiBold,
  },
  topicBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  topicText: {
    fontSize: 10,
    fontWeight: typography.fontWeight.semiBold,
  },
  questionText: {
    fontSize: 15,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  accordionContent: {
    padding: spacing.md,
    backgroundColor: '#FFF1F215',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: spacing.md,
  },
  answerText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textSecondary,
    marginTop: spacing.xl,
  },
});

export default FAQCategoryScreen;
