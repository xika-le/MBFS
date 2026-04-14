import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native';
import * as theme from '../../theme';
import { Header } from '../../components/shared';

const featuredData = {
  id: 'featured',
  badge: 'Dịch vụ công',
  title: 'Xóa bỏ 100% hồ sơ giấy trong cấp phép đầu tư trực tuyến',
  excerpt: 'Bộ Kế hoạch và Đầu tư phát động chiến dịch "No Paper" trong các thủ tục xúc tiến...',
  date: '14/04/2026',
  author: 'Cổng DVCQG',
  image: 'https://placehold.co/600x400/4682b4/ffffff?text=E-Government',
};

const listData = [
  {
    id: '1',
    category: 'Thủ tục',
    title: 'Hướng dẫn nộp hồ sơ xin cấp giấy chứng nhận đăng ký đầu tư điện tử',
    excerpt: 'Các bước chi tiết để hoàn tất quy trình xin cấp...',
    date: '11/04/2026',
    author: 'Hệ thống DVC',
    image: 'https://placehold.co/150x150/d2b48c/ffffff?text=Document',
  },
];

export default function PublicServiceNewsScreen({ navigation }: any) {
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('PublicServiceNewsDetail')}>
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
      <Text style={styles.sectionTitle}>Cập nhật mới nhất</Text>
    </View>
  );

  const renderItem = ({ item }: { item: typeof listData[0] }) => (
    <TouchableOpacity activeOpacity={0.7} style={styles.listCard} onPress={() => navigation.navigate('PublicServiceNewsDetail')}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.categoryBadge}><Text style={styles.categoryBadgeText}>{item.category}</Text></View>
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
      <Header title="Tin tức Dịch vụ công" onBack={() => navigation.goBack()} />
      <FlatList
        data={listData}
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
  featuredBadge: { backgroundColor: theme.colors.infoBg, alignSelf: 'flex-start', paddingHorizontal: theme.spacing.sm, paddingVertical: 4, borderRadius: theme.spacing.borderRadius.sm },
  featuredBadgeText: { color: theme.colors.link, fontSize: theme.typography.fontSize.xs, fontWeight: 'bold' },
  featuredContent: { width: '100%' },
  featuredTitle: { color: '#fff', fontSize: theme.typography.fontSize.lg, fontWeight: 'bold', marginBottom: theme.spacing.xs, textShadowColor: 'rgba(0,0,0,0.7)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 },
  featuredExcerpt: { color: '#eee', fontSize: theme.typography.fontSize.sm, marginBottom: theme.spacing.md, lineHeight: 20 },
  metaRow: { flexDirection: 'row', gap: theme.spacing.lg },
  metaText: { color: '#ccc', fontSize: 11 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.textPrimary },
  listCard: { flexDirection: 'row', backgroundColor: theme.colors.surface, borderRadius: theme.spacing.borderRadius.md, marginBottom: theme.spacing.md, padding: theme.spacing.md, borderWidth: 1, borderColor: theme.colors.borderLight, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 4, elevation: 1 },
  cardImage: { width: 80, height: 80, borderRadius: theme.spacing.borderRadius.sm, backgroundColor: theme.colors.borderLight },
  cardContent: { flex: 1, marginLeft: theme.spacing.md, justifyContent: 'center' },
  categoryBadge: { backgroundColor: '#e0f2fe', alignSelf: 'flex-start', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginBottom: 6 },
  categoryBadgeText: { color: '#0284c7', fontSize: 10, fontWeight: '600' },
  cardTitle: { fontSize: theme.typography.fontSize.sm, fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: 4, lineHeight: 18 },
  cardExcerpt: { fontSize: 11, color: theme.colors.textSecondary, marginBottom: 8, lineHeight: 16 },
  metaRowDark: { flexDirection: 'row', gap: theme.spacing.md },
  metaTextDark: { color: theme.colors.textMuted, fontSize: 10 },
});
