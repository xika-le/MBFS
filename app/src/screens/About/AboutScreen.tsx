/**
 * Screen: UC 115 - Giới thiệu
 * Figma Node: 830:5
 * 
 * Layout:
 * - Header: Red with back button
 * - TabBar: Cổng Một Cửa / Cục Đầu tư nước ngoài
 * - Content: ScrollView with Cards and section boxes
 */

import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header, Card, Icon } from '../../components/shared';
import { TabBar } from '../../components/shared/TabBar';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

const TABS = [
  { key: 'portal', label: 'Cổng Một Cửa' },
  { key: 'agency', label: 'Cục Đầu tư nước ngoài' },
];

export const AboutScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('portal');

  const renderPortalTab = () => (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.content}>
      <Card style={styles.mainCard}>
        <View style={styles.titleSection}>
          <View style={styles.iconCircle}>
             <Icon name="globe" size={32} color={colors.primary} />
          </View>
          <View style={styles.titleTextContainer}>
            <Text style={styles.mainTitle}>CỔNG MỘT CỬA ĐẦU TƯ QUỐC GIA</Text>
            <Text style={styles.agencySubtitle}>National Investment Gateway</Text>
          </View>
        </View>

        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>TỔNG QUAN</Text>
          <Text style={styles.sectionContent}>
            Cổng Một Cửa Đầu Tư Quốc Gia là hệ thống thông tin điện tử tập trung được xây dựng và vận hành bởi Cục Đầu tư nước ngoài - Bộ Kế hoạch và Đầu tư, nhằm cung cấp thông tin toàn diện về môi trường đầu tư tại Việt Nam...
          </Text>
          <Text style={[styles.sectionContent, { marginTop: spacing.sm }]}>
            Đây là kênh giao tiếp chính thức và thống nhất giữa các nhà đầu tư với các cơ quan quản lý nhà nước về đầu tư.
          </Text>
        </View>

        <View style={styles.sectionBox}>
          <View style={styles.sectionHeader}>
            <View style={styles.smallIconCircle}>
              <Icon name="target" size={18} color={colors.primary} />
            </View>
            <Text style={styles.sectionTitle}>MỤC TIÊU VÀ SỨ MỆNH</Text>
          </View>
          <Text style={styles.sectionContent}>
            <Text style={{ fontWeight: '600' }}>Mục tiêu: </Text>
            Xây dựng hệ thống thông tin điện tử một cửa quốc gia về đầu tư, tích hợp đồng bộ các dịch vụ công trực tuyến...
          </Text>
          <Text style={[styles.sectionContent, { marginTop: spacing.sm }]}>
            <Text style={{ fontWeight: '600' }}>Sứ mệnh: </Text>
            Là cầu nối tin cậy giữa nhà đầu tư và cơ quan quản lý nhà nước, hỗ trợ xúc tiến đầu tư, cải thiện môi trường kinh doanh.
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: spacing.lg, marginLeft: spacing.sm }]}>CÁC TÍNH NĂNG CHÍNH</Text>
        <View style={styles.grid}>
          <FeatureMiniCard icon="file-text" title="Thủ tục trực tuyến" desc="Nộp hồ sơ, theo dõi tiến độ xử lý và nhận kết quả trực tuyến 24/7." />
          <FeatureMiniCard icon="target" title="Cơ hội đầu tư" desc="Tra cứu thông tin các lĩnh vực ưu tiên và địa bàn khuyến khích đầu tư." />
          <FeatureMiniCard icon="award" title="Chính sách ưu đãi" desc="Thông tin chi tiết về các chính sách ưu đãi đầu tư theo ngành, lĩnh vực." />
          <FeatureMiniCard icon="users" title="Hỗ trợ nhà đầu tư" desc="Giải đáp thắc mắc, hỗ trợ tư vấn và kết nối nhà đầu tư." />
          <FeatureMiniCard icon="globe" title="Thông tin đa ngôn ngữ" desc="Cung cấp thông tin bằng nhiều ngôn ngũ, phục vụ nhà đầu tư quốc tế." />
          <FeatureMiniCard icon="map-pin" title="Bản đồ đầu tư" desc="Tra cứu thông tin khu công nghiệp, khu kinh tế trên bản đồ tương tác." />
        </View>

        <View style={[styles.sectionBox, { marginTop: spacing.lg }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.smallIconCircle}>
              <Icon name="user-check" size={18} color={colors.primary} />
            </View>
            <Text style={styles.sectionTitle}>LỢI ÍCH KHI SỬ DỤNG</Text>
          </View>
          
          <Text style={[styles.subSectionTitle, { marginTop: spacing.sm }]}>Đối với nhà đầu tư:</Text>
          <BulletItem text="Tiếp cận thông tin đầy đủ, chính xác và cập nhật" />
          <BulletItem text="Tiết kiệm thời gian và chi phí thực hiện thủ tục" />
          <BulletItem text="Theo dõi tiến độ xử lý hồ sơ minh bạch" />
          <BulletItem text="Được hỗ trợ tư vấn chuyên nghiệp" />

          <Text style={[styles.subSectionTitle, { marginTop: spacing.md }]}>Đối với cơ quan quản lý:</Text>
          <BulletItem text="Nâng cao hiệu quả quản lý nhà nước" />
          <BulletItem text="Cải thiện chất lượng dịch vụ công" />
          <BulletItem text="Tăng cường tính minh bạch và trách nhiệm giải trình" />
          <BulletItem text="Hỗ trợ công tác thống kê, báo cáo" />
        </View>
      </Card>
      
      <View style={{ height: spacing.xl }} />
    </ScrollView>
  );

  const renderAgencyTab = () => (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.content}>
      <Card style={styles.mainCard}>
        <View style={styles.titleSection}>
          <View style={styles.iconCircle}>
             <Icon name="briefcase" size={32} color={colors.primary} />
          </View>
          <View style={styles.titleTextContainer}>
            <Text style={styles.mainTitle}>Cục Đầu tư nước ngoài</Text>
            <Text style={styles.agencySubtitle}>Bộ Kế hoạch và Đầu tư</Text>
          </View>
        </View>

        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>TỔNG QUAN</Text>
          <Text style={styles.sectionContent}>
            Cục Đầu tư nước ngoài là đơn vị trực thuộc Bộ Kế hoạch và Đầu tư, có chức năng tham mưu, giúp Bộ trưởng quản lý nhà nước về đầu tư nước ngoài tại Việt Nam và đầu tư của Việt Nam ra nước ngoài.
          </Text>
        </View>

        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>CHỨC NĂNG, NHIỆM VỤ</Text>
          <BulletItem text="Trình Bộ trưởng dự thảo văn bản quy phạm pháp luật về đầu tư nước ngoài" />
          <BulletItem text="Thẩm định, trình Bộ trưởng quyết định các dự án đầu tư theo thẩm quyền" />
          <BulletItem text="Quản lý, theo dõi tình hình đầu tư nước ngoài trên phạm vi cả nước" />
          <BulletItem text="Hợp tác quốc tế về lĩnh vực đầu tư" />
        </View>

        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>CƠ CẤU TỔ CHỨC</Text>
          <BulletItem text="Ban Lãnh đạo Cục" />
          <BulletItem text="Văn phòng Cục" />
          <BulletItem text="Các phòng chuyên môn" />
        </View>
      </Card>
      
      <View style={{ height: spacing.xl }} />
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <Header title="Giới thiệu" onBack={() => navigation.goBack()} />
      <TabBar tabs={TABS} activeKey={activeTab} onTabPress={setActiveTab} />
      {activeTab === 'portal' ? renderPortalTab() : renderAgencyTab()}
    </View>
  );
};

const BulletItem = ({ text }: { text: string }) => (
  <View style={styles.bulletRow}>
    <View style={styles.bulletDot} />
    <Text style={styles.bulletText}>{text}</Text>
  </View>
);

const FeatureMiniCard = ({ icon, title, desc }: { icon: any; title: string; desc: string }) => (
  <View style={styles.featureMiniCard}>
    <View style={styles.iconBox}>
      <Icon name={icon} size={22} color={colors.primary} />
    </View>
    <Text style={styles.featureTitle}>{title}</Text>
    <Text style={styles.featureDesc}>{desc}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
  },
  mainCard: {
    padding: spacing.md,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: `${colors.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  titleTextContainer: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 16,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textDark,
    marginBottom: 4,
  },
  agencySubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  sectionBox: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: spacing.borderRadius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  smallIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: `${colors.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.primary,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  subSectionTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  sectionContent: {
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
    lineHeight: 18,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: spacing.sm,
  },
  featureMiniCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    borderRadius: 16,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
    minHeight: 120,
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
  featureTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  featureDesc: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: spacing.sm,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginTop: 6,
    marginRight: spacing.sm,
  },
  bulletText: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
    lineHeight: 18,
  },
});

export default AboutScreen;
