import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { Icon, Header } from '../../components/shared';
import { getLandFundDetail } from '../../data/landFundMockData';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

type RouteProps = RouteProp<RootStackParamList, 'LandFundDetail'>;

interface SectionProps {
  title: string;
  icon: any;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const AccordionSection: React.FC<SectionProps> = ({ title, icon, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <View style={styles.sectionCard}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.7}
      >
        <View style={styles.sectionTitleRow}>
          <Icon name={icon} size={18} color={colors.primary} />
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={colors.textTertiary}
        />
      </TouchableOpacity>
      {isOpen && <View style={styles.sectionContent}>{children}</View>}
    </View>
  );
};

export const LandFundDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProps>();
  const { id } = route.params;
  const data = getLandFundDetail(id);

  const renderInfoRow = (label: string, value: string) => (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );

  const renderInfraItem = (item: any) => {
    const icons: Record<string, string> = {
      road: 'truck',
      electric: 'zap',
      water: 'droplet',
      infra: 'layers',
    };

    return (
      <View key={item.type} style={styles.infraItem}>
        <View style={styles.infraIconBg}>
          <Icon name={icons[item.type] as any} size={20} color={colors.primary} />
        </View>
        <View style={styles.infraInfo}>
          <Text style={styles.infraLabel}>{item.label}</Text>
          <Text style={[
            styles.infraStatus,
            { color: item.status === 'available' ? colors.green : colors.textTertiary }
          ]}>
            {item.status === 'available' ? 'Đã có' : 'Chưa có'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <Header title="Chi tiết lô đất" onBack={() => navigation.goBack()} />

      <ScrollView bounces={false} contentContainerStyle={styles.scrollContent}>

        {/* Summary Card - Based on reference image */}
        <View style={styles.summaryCardWrapper}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryTop}>
              <View>
                {/* <Text style={styles.summaryLabel}>Tên lô đất</Text> */}
                <Text style={styles.summaryCode}>{data.name}</Text>
              </View>
              <View style={styles.statusGroup}>
                <View style={styles.statusBadgeWrapper}>
                  <Text style={styles.statusBadgeText}>
                    {data.status === 'empty' ? 'Còn trống' : 'Đã cho thuê'}
                  </Text>
                </View>
                <View style={[styles.statusBadgeWrapper, { backgroundColor: 'rgba(255,255,255,0.1)', marginTop: 8 }]}>
                  <Text style={[styles.statusBadgeText, { opacity: 0.9, fontSize: 11 }]}>
                    {data.publishStatus === 'published' ? 'Đã công bố' : 'Chưa công bố'}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.summaryBottom}>
              <View style={styles.summaryInfoItem}>
                <Icon name="calendar" size={14} color="white" />
                <Text style={styles.summaryInfoText}>Diện tích: {data.area} m²</Text>
              </View>
              <View style={[styles.summaryInfoItem, { marginLeft: 16 }]}>
                <Icon name="map-pin" size={14} color="white" />
                <Text style={styles.summaryInfoText}>{data.zoneName}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          {/* Images Section */}
          <Text style={styles.bodySectionTitle}>Hình ảnh thực tế</Text>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.carousel}>
            {data.images.map((img, idx) => (
              <Image
                key={idx}
                source={{ uri: img }}
                style={styles.carouselImage}
                resizeMode="cover"
              />
            ))}
          </ScrollView>

          {/* Basic Info Accordion */}
          <AccordionSection title="Thông tin chung lô đất" icon="info">
            {renderInfoRow('Tên lô đất', data.name)}
            {renderInfoRow('Khu công nghiệp', data.zoneName)}
            {renderInfoRow('Vị trí', data.location)}
            {renderInfoRow('Diện tích', `${data.area} m²`)}
            {renderInfoRow('Thời hạn thuê', data.leaseExpiry)}
            {renderInfoRow('Trạng thái công bố', data.publishStatus === 'published' ? 'Đã công bố' : 'Chưa công bố')}
          </AccordionSection>

          {/* Infrastructure Accordion */}
          <AccordionSection title="Hạ tầng kỹ thuật" icon="settings" defaultOpen={false}>
            {data.infrastructure.map(renderInfraItem)}
          </AccordionSection>

          {/* Detailed Info Accordion */}
          <AccordionSection title="Thông tin chi tiết & Mô tả" icon="list" defaultOpen={false}>
            <Text style={styles.descriptionText}>{data.description}</Text>
          </AccordionSection>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  summaryCardWrapper: {
    padding: spacing.lg,
  },
  summaryCard: {
    backgroundColor: '#8B1A1A',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  summaryTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  summaryLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    marginBottom: 4,
  },
  summaryCode: {
    color: 'white',
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
  },
  statusGroup: {
    alignItems: 'flex-end',
  },
  statusBadgeWrapper: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  statusBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  summaryBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: 16,
  },
  summaryInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  summaryInfoText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  body: {
    paddingHorizontal: spacing.lg,
  },
  bodySectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
    marginLeft: 4,
  },
  carousel: {
    borderRadius: 16,
    height: 180,
    marginBottom: 20,
  },
  carouselImage: {
    width: width - spacing.lg * 2,
    height: 180,
    borderRadius: 16,
  },
  sectionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  sectionContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  infoLabel: {
    color: '#64748B',
    fontSize: 14,
    flex: 1,
  },
  infoValue: {
    color: '#1E293B',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
    flex: 2,
  },
  infraItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infraIconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${colors.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infraInfo: {
    flex: 1,
  },
  infraLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  infraStatus: {
    fontSize: 12,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#475569',
    paddingTop: 12,
  },
});
