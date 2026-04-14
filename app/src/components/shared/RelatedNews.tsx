import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native';
import * as theme from '../../theme';

interface RelatedNewsItem {
  id: string;
  type: 'cover' | 'standard';
  badge: string;
  badgeStyle?: 'primary' | 'secondary' | 'accent';
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
}

const DUMMY_RELATED_NEWS: RelatedNewsItem[] = [
  {
    id: '1',
    type: 'cover',
    badge: 'Tin nổi bật',
    badgeStyle: 'primary',
    title: 'Quý I/2026: 96 nghìn doanh nghiệp thành lập mới và tái gia nhập',
    excerpt: 'Trong quý I năm nay, tổng số doanh nghiệp thành lập mới và quay trở lại...',
    date: '07/04/2026',
    author: 'Trần Văn Nam',
    image: 'https://placehold.co/400x500/2f4f4f/ffffff?text=Business',
  },
  {
    id: '2',
    type: 'standard',
    badge: 'Công nghệ cao',
    badgeStyle: 'secondary',
    title: 'Xu hướng công nghệ xanh năm 2027',
    excerpt: 'Tổng quan các công nghệ thân thiện với môi trường...',
    date: '07/04/2026',
    author: 'J.K. Rowling',
    image: 'https://placehold.co/200x200/d2b48c/ffffff?text=AI',
  },
  {
    id: '3',
    type: 'standard',
    badge: 'Chính sách đầu tư',
    badgeStyle: 'secondary',
    title: 'Luật Sửa đổi, bổ sung một số điều của Luật',
    excerpt: 'Chiều 9-12, Quốc hội đã tiến hành thảo luận tại...',
    date: '23/01/2026',
    author: 'Phạm Đức Hải',
    image: 'https://placehold.co/200x200/4682b4/ffffff?text=Law',
  },
];

export function RelatedNews({ data = DUMMY_RELATED_NEWS }: { data?: RelatedNewsItem[] }) {
  const getBadgeStyle = (styleType: string) => {
    switch (styleType) {
      case 'primary':
        return { bg: theme.colors.primary, text: '#fff' };
      case 'secondary':
        return { bg: '#ffe4e6', text: theme.colors.primary };
      case 'accent':
      default:
        return { bg: theme.colors.infoBg, text: theme.colors.link };
    }
  };

  const renderItem = ({ item }: { item: RelatedNewsItem }) => {
    const badgeStyle = getBadgeStyle(item.badgeStyle || 'primary');

    if (item.type === 'cover') {
      return (
        <TouchableOpacity activeOpacity={0.8} style={styles.coverCardContainer}>
          <ImageBackground source={{ uri: item.image }} style={styles.coverCard} imageStyle={{ borderRadius: 12 }}>
            <View style={styles.coverOverlay}>
              <View style={[styles.badge, { backgroundColor: badgeStyle.bg }]}>
                <Text style={[styles.badgeText, { color: badgeStyle.text }]}>{item.badge}</Text>
              </View>
              <View style={styles.coverContent}>
                <Text style={styles.coverTitle} numberOfLines={3}>{item.title}</Text>
                <Text style={styles.coverExcerpt} numberOfLines={2}>{item.excerpt}</Text>
                <View style={styles.metaRow}>
                  <Text style={styles.metaTextCover}>🕒 {item.date}</Text>
                  <Text style={styles.metaTextCover}>👤 {item.author}</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.standardCard}>
        <Image source={{ uri: item.image }} style={styles.standardCardImage} />
        <View style={styles.standardCardContent}>
          <View style={[styles.badge, { backgroundColor: badgeStyle.bg, alignSelf: 'flex-start' }]}>
            <Text style={[styles.badgeText, { color: badgeStyle.text }]}>{item.badge}</Text>
          </View>
          <Text style={styles.standardTitle} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.standardExcerpt} numberOfLines={2}>{item.excerpt}</Text>
          <View style={styles.metaRowDark}>
            <Text style={styles.metaTextDark}>🕒 {item.date}</Text>
            <Text style={styles.metaTextDark} numberOfLines={1}>👤 {item.author}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Tin liên quan</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        snapToInterval={256} // 240 width + 16 gap
        decelerationRate="fast"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  listContainer: {
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: theme.spacing.sm,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  // Cover Card Styles
  coverCardContainer: {
    width: 240,
    height: 280,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  coverCard: {
    width: '100%',
    height: '100%',
  },
  coverOverlay: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: theme.spacing.md,
    justifyContent: 'space-between',
  },
  coverContent: {
    width: '100%',
  },
  coverTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 6,
    lineHeight: 20,
  },
  coverExcerpt: {
    color: '#ddd',
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  metaTextCover: {
    color: '#ccc',
    fontSize: 10,
  },
  // Standard Card Styles
  standardCard: {
    width: 240,
    height: 280,
    alignSelf: 'center',
    flexDirection: 'column',
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  standardCardImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    backgroundColor: theme.colors.borderLight,
  },
  standardCardContent: {
    flex: 1,
    marginTop: theme.spacing.sm,
    justifyContent: 'space-between',
  },
  standardTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 4,
    lineHeight: 18,
  },
  standardExcerpt: {
    fontSize: 11,
    color: theme.colors.textSecondary,
    lineHeight: 16,
    marginBottom: 4,
  },
  metaRowDark: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaTextDark: {
    color: theme.colors.textMuted,
    fontSize: 9,
  },
});
