import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native';
import * as theme from '../../theme';
import { Header } from '../../components/shared';

const NEWS_CATEGORIES = [
  { id: 'all', label: 'Tất cả' },
  { id: 'policy', label: 'Chính sách đầu tư' },
  { id: 'success', label: 'Câu chuyện thành công' },
  { id: 'sector', label: 'Lĩnh vực đầu tư' },
  { id: 'investment', label: 'Đầu tư' },
  { id: 'public-service', label: 'Dịch vụ công' },
];

const featuredData = {
  id: 'featured',
  badge: 'Tin nổi bật',
  title: 'Thủ tướng chủ trì hội nghị xúc tiến đầu tư toàn quốc 2026',
  excerpt: 'Nhiều thông điệp quan trọng được đưa ra nhằm thu hút dòng vốn xanh và bền vững...',
  date: '14/04/2026',
  author: 'Báo Chính phủ',
  image: 'https://placehold.co/600x400/2f4f4f/ffffff?text=Investment+News',
  category: 'policy',
};

const listData = [
  {
    id: '1',
    category: 'policy',
    categoryName: 'Chính sách đầu tư',
    title: 'Hàng loạt tập đoàn FDI quan tâm vào công nghiệp bán dẫn tại thủ đô',
    excerpt: 'Các ưu đãi đặc biệt về thuế thu nhập doanh nghiệp sẽ được áp dụng cho ngành bán dẫn...',
    date: '12/04/2026',
    author: 'Tuổi Trẻ',
    image: 'https://placehold.co/150x150/d2b48c/ffffff?text=Semiconductor',
  },
  {
    id: '2',
    category: 'investment',
    categoryName: 'Tin đầu tư',
    title: 'Dòng vốn mạo hiểm quay trở lại thị trường startup Việt Nam',
    excerpt: 'Lượng vốn rót vào quý I tăng vọt so với cùng kỳ năm trước...',
    date: '10/04/2026',
    author: 'VnExpress',
    image: 'https://placehold.co/150x150/5f9ea0/ffffff?text=Startup',
  },
  {
    id: '3',
    category: 'success',
    categoryName: 'Câu chuyện thành công',
    title: 'VinFast niêm yết thành công trên sàn Nasdaq',
    excerpt: 'Một cột mốc lịch sử của ngành công nghiệp ô tô Việt Nam vươn tầm thế giới...',
    date: '08/04/2026',
    author: 'Forbes VN',
    image: 'https://placehold.co/150x150/ff7f50/ffffff?text=Success',
  },
  {
    id: '4',
    category: 'sector',
    categoryName: 'Lĩnh vực đầu tư',
    title: 'Năng lượng tái tạo trở thành thỏi nam châm thu hút vốn',
    excerpt: 'Việt Nam đang dần trở thành trung tâm sản xuất tấm pin mặt trời...',
    date: '06/04/2026',
    author: 'Đầu Tư Online',
    image: 'https://placehold.co/150x150/20b2aa/ffffff?text=Green+Energy',
  },
  {
    id: '5',
    category: 'public-service',
    categoryName: 'Dịch vụ công',
    title: 'Số hóa 100% thủ tục cấp phép đầu tư trực tuyến',
    excerpt: 'Thời gian cấp giấy chứng nhận đầu tư sẽ rút ngắn xuống còn 24 giờ...',
    date: '04/04/2026',
    author: 'Chính Phủ',
    image: 'https://placehold.co/150x150/4169e1/ffffff?text=E-gov',
  },
  {
    id: '6',
    category: 'policy',
    categoryName: 'Luật đầu tư',
    title: 'Sửa đổi Luật Đầu tư 2024: Thông thoáng hơn cho nhà đầu tư',
    excerpt: 'Cắt giảm hàng loạt thủ tục hành chính không cần thiết...',
    date: '05/04/2026',
    author: 'Sài Gòn Giải Phóng',
    image: 'https://placehold.co/150x150/4682b4/ffffff?text=Law',
  },
];

export default function InvestmentNewsScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredNews = useMemo(() => {
    if (activeTab === 'all') return listData;
    return listData.filter(item => item.category === activeTab);
  }, [activeTab]);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.tabsWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsList}>
          {NEWS_CATEGORIES.map((tab) => (
            <TouchableOpacity 
              key={tab.id} 
              style={[styles.tabItem, activeTab === tab.id && styles.activeTabItem]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text style={[styles.tabLabel, activeTab === tab.id && styles.activeTabLabel]}>{tab.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('InvestmentNewsDetail')}>
        <ImageBackground source={{ uri: featuredData.image }} style={styles.featuredCard} imageStyle={{ borderRadius: 16 }}>
          <View style={styles.featuredOverlay}>
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredBadgeText}>{featuredData.badge}</Text>
            </View>
            <View style={styles.featuredContent}>
              <Text style={styles.featuredTitle} numberOfLines={2}>{featuredData.title}</Text>
              <Text style={styles.featuredExcerpt} numberOfLines={2}>{featuredData.excerpt}</Text>
              <View style={styles.metaRow}>
                <Text style={styles.metaText}>🕒 {featuredData.date}</Text>
                <Text style={styles.metaText}>👤 {featuredData.author}</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Tin tức mới nhất</Text>
    </View>
  );

  const renderItem = ({ item }: { item: typeof listData[0] }) => (
    <TouchableOpacity activeOpacity={0.7} style={styles.listCard} onPress={() => navigation.navigate('InvestmentNewsDetail')}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.categoryBadge}><Text style={styles.categoryBadgeText}>{item.categoryName}</Text></View>
        <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.cardExcerpt} numberOfLines={2}>{item.excerpt}</Text>
        <View style={styles.metaRowDark}>
          <Text style={styles.metaTextDark}>🕒 {item.date}</Text>
          <Text style={styles.metaTextDark}>👤 {item.author}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Tin tức" onBack={() => navigation.goBack()} />
      <FlatList
        data={filteredNews}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  listContainer: { padding: theme.spacing.lg, paddingBottom: theme.spacing.xxl },
  headerContainer: { marginBottom: theme.spacing.lg },
  featuredCard: { width: '100%', height: 320, marginBottom: theme.spacing.xl, elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
  featuredOverlay: { flex: 1, borderRadius: 16, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'space-between', padding: theme.spacing.md },
  featuredBadge: { backgroundColor: theme.colors.primary, alignSelf: 'flex-start', paddingHorizontal: theme.spacing.sm, paddingVertical: 4, borderRadius: theme.spacing.borderRadius.sm },
  featuredBadgeText: { color: '#fff', fontSize: theme.typography.fontSize.xs, fontWeight: 'bold' },
  featuredContent: { width: '100%' },
  featuredTitle: { color: '#fff', fontSize: theme.typography.fontSize.lg, fontWeight: 'bold', marginBottom: theme.spacing.xs, textShadowColor: 'rgba(0,0,0,0.7)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 },
  featuredExcerpt: { color: '#eee', fontSize: theme.typography.fontSize.sm, marginBottom: theme.spacing.md, lineHeight: 20 },
  metaRow: { flexDirection: 'row', gap: theme.spacing.lg },
  metaText: { color: '#ccc', fontSize: 11 },
  
  tabsWrapper: { marginBottom: theme.spacing.lg },
  tabsList: { gap: 8 },
  tabItem: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.borderLight },
  activeTabItem: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  tabLabel: { fontSize: 13, color: theme.colors.textSecondary, fontWeight: '500' },
  activeTabLabel: { color: '#fff' },

  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: theme.spacing.md },
  listCard: { flexDirection: 'row', backgroundColor: theme.colors.surface, borderRadius: theme.spacing.borderRadius.md, marginBottom: theme.spacing.md, padding: theme.spacing.md, borderWidth: 1, borderColor: theme.colors.borderLight, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 4, elevation: 1 },
  cardImage: { width: 80, height: 80, borderRadius: theme.spacing.borderRadius.sm, backgroundColor: theme.colors.borderLight },
  cardContent: { flex: 1, marginLeft: theme.spacing.md, justifyContent: 'center' },
  categoryBadge: { backgroundColor: '#FFE4E1', alignSelf: 'flex-start', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginBottom: 6 },
  categoryBadgeText: { color: '#B22222', fontSize: 10, fontWeight: '600' },
  cardTitle: { fontSize: theme.typography.fontSize.sm, fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: 4, lineHeight: 18 },
  cardExcerpt: { fontSize: 11, color: theme.colors.textSecondary, marginBottom: 8, lineHeight: 16 },
  metaRowDark: { flexDirection: 'row', gap: theme.spacing.md },
  metaTextDark: { color: theme.colors.textMuted, fontSize: 10 },
});
