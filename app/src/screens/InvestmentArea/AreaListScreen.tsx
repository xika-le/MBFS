import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../theme';
import { Header, Card, Badge, Input } from '../../components/shared';

const REGION_TABS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'north', label: 'Miền Bắc' },
  { id: 'central', label: 'Miền Trung' },
  { id: 'south', label: 'Miền Nam' },
];

const AREA_MOCK_DATA = [
  {
    id: '1',
    name: 'Bình Dương',
    region: 'south',
    status: 'Sẵn sàng',
    icon: 'location',
    color: '#0ea5e9', // Blue
  },
  {
    id: '2',
    name: 'Bắc Ninh',
    region: 'north',
    status: 'Đang hoạt động',
    icon: 'location',
    color: '#f59e0b', // Orange
  },
  {
    id: '3',
    name: 'Đà Nẵng',
    region: 'central',
    status: 'Sẵn sàng',
    icon: 'location',
    color: '#10b981', // Emerald
  },
  {
    id: '4',
    name: 'Long An',
    region: 'south',
    status: 'Sẵn sàng',
    icon: 'location',
    color: '#3b82f6', // Blue
  },
  {
    id: '5',
    name: 'Hải Phòng',
    region: 'north',
    status: 'Đang hoạt động',
    icon: 'location',
    color: '#ec4899', // Pink
  },
  {
    id: '6',
    name: 'Đồng Nai',
    region: 'south',
    status: 'Đang hoạt động',
    icon: 'location',
    color: '#8b5cf6', // Violet
  },
  {
    id: '7',
    name: 'Quảng Ninh',
    region: 'north',
    status: 'Sẵn sàng',
    icon: 'location',
    color: '#f43f5e', // Rose
  },
  {
    id: '8',
    name: 'Khánh Hòa',
    region: 'central',
    status: 'Sẵn sàng',
    icon: 'location',
    color: '#f59e0b', // Orange
  },
];

export default function AreaListScreen({ navigation }: any) {
  const [search, setSearch] = useState('');
  const [activeRegion, setActiveRegion] = useState('all');

  const filteredData = AREA_MOCK_DATA.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = activeRegion === 'all' || item.region === activeRegion;
    return matchesSearch && matchesRegion;
  });

  const renderAreaCard = ({ item }: { item: typeof AREA_MOCK_DATA[0] }) => (
    <TouchableOpacity 
      activeOpacity={0.7}
      onPress={() => navigation.navigate('AreaDetail', { areaId: item.id })}
    >
      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Text style={styles.areaName}>{item.name}</Text>
            <Text style={styles.regionLabel}>
              {item.region === 'north' ? 'Miền Bắc' : item.region === 'central' ? 'Miền Trung' : 'Miền Nam'}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header 
        title="Khu vực đầu tư" 
        onBack={() => navigation.goBack()} 
      />

      <View style={styles.topSection}>
        <View style={styles.searchContainer}>
          <Input
            placeholder="Tìm kiếm tỉnh, thành phố..."
            value={search}
            onChangeText={setSearch}
            leftIcon={<Feather name="search" size={18} color={colors.textSecondary} />}
          />
        </View>

        <View style={styles.tabContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
            {REGION_TABS.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveRegion(tab.id)}
                style={[
                  styles.tab,
                  activeRegion === tab.id && styles.activeTab
                ]}
              >
                <Text style={[
                  styles.tabLabel,
                  activeRegion === tab.id && styles.activeTabLabel
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderAreaCard}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8FAFC' 
  },
  topSection: {
    backgroundColor: colors.surface,
    paddingTop: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  searchContainer: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  tabContainer: {
    paddingBottom: spacing.xs,
  },
  tabScroll: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeTab: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  activeTabLabel: {
    color: 'white',
  },
  list: { 
    padding: spacing.md, 
    paddingBottom: 40,
  },
  card: { 
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  areaName: { 
    fontSize: 15,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },
  regionLabel: {
    fontSize: 12,
    color: colors.textTertiary,
    marginTop: 2,
  },
});
