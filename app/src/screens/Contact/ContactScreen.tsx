/**
 * Screen: UC 114 - Liên hệ
 * Figma Node: 830:3
 * 
 * Layout:
 * - Header: Red with back button
 * - TabBar: Địa chỉ / Văn phòng đại diện
 * - Content: ScrollView with Cards
 */

import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header, Card, Icon } from '../../components/shared';
import { TabBar } from '../../components/shared/TabBar';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

const TABS = [
  { key: 'address', label: 'Địa chỉ' },
  { key: 'representatives', label: 'Văn phòng đại diện' },
];

export const ContactScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('address');

  const renderAddressTab = () => (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.content}>
      {/* Cục Đầu tư nước ngoài Info */}
      <Card style={styles.infoCard}>
        <View style={styles.agencyContainer}>
          <View style={styles.iconCircle}>
             <Icon name="briefcase" size={28} color={colors.primary} />
          </View>
          <View style={styles.agencyContent}>
            <Text style={styles.agencyTitle}>Cục Đầu tư nước ngoài</Text>
            <Text style={styles.agencySubtitle}>Bộ Kế hoạch và Đầu tư</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <ContactItem icon="map-pin" label="Địa chỉ" value="Số 6B Hoàng Diệu, Phường Quán Thánh, Quận Ba Đình, Hà Nội, Việt Nam" />
        <ContactItem 
          icon="phone" 
          label="Điện thoại" 
          value="+84 24 3845 5298" 
          onPress={() => Linking.openURL('tel:+842438455298')}
          isLink 
        />
        <ContactItem 
          icon="mail" 
          label="Email" 
          value="fid@mpi.gov.vn" 
          onPress={() => Linking.openURL('mailto:fid@mpi.gov.vn')}
          isLink 
        />
        <ContactItem 
          icon="globe" 
          label="Website" 
          value="dautunuocngoai.gov.vn" 
          onPress={() => Linking.openURL('https://dautunuocngoai.gov.vn')}
          isLink 
        />
      </Card>

      {/* Bản đồ vị trí */}
      <Card style={styles.mapCard}>
        <View style={styles.mapPlaceholder}>
          <Icon name="map" size={40} color={colors.textSecondary} />
          <Text style={styles.mapLabel}>Bản đồ vị trí</Text>
          <Text style={styles.mapAddress}>Số 6B Hoàng Diệu, Ba Đình, Hà Nội</Text>
        </View>
      </Card>

      {/* Giờ làm việc */}
      <Card style={styles.hoursCard}>
        <View style={styles.sectionHeader}>
           <Text style={styles.cardTitle}>Giờ làm việc</Text>
        </View>
        <View style={styles.workHoursContainer}>
          <HourRow day="Thứ 2 - Thứ 6" time="8:00 - 17:00" />
          <HourRow day="Thứ 7 - Chủ nhật" time="Nghỉ" isRest />
          <HourRow day="Giờ nghỉ trưa" time="12:00 - 13:30" />
        </View>
      </Card>
      
      <View style={{ height: spacing.xl }} />
    </ScrollView>
  );

  const renderRepresentativesTab = () => (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.content}>
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          <Text style={styles.infoBoxTitle}>Văn phòng đại diện trên thế giới</Text>
          {` - Hỗ trợ nhà đầu tư quốc tế tìm hiểu về môi trường đầu tư và cơ hội kinh doanh tại Việt Nam.`}
        </Text>
      </View>

      <RepresentativeCard 
        name="Văn phòng Bắc Mỹ" 
        location="New York, Hoa Kỳ" 
        phone="+1 (212) 555-0123" 
        email="northamerica@investment.gov.vn" 
      />
      
      <RepresentativeCard 
        name="Văn phòng Châu Âu" 
        location="Brussels, Bỉ" 
        phone="+32 2 555 0123" 
        email="europe@investment.gov.vn" 
      />
      
      <RepresentativeCard 
        name="Văn phòng Đông Bắc Á" 
        location="Tokyo, Nhật Bản" 
        phone="+81 3 5555 0123" 
        email="eastasia@investment.gov.vn" 
      />
      
      <RepresentativeCard 
        name="Văn phòng Đông Nam Á" 
        location="Singapore" 
        phone="+65 6555 0123" 
        email="asean@investment.gov.vn" 
      />

      <View style={{ height: spacing.xl }} />
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <Header title="Liên hệ" onBack={() => navigation.goBack()} />
      <TabBar tabs={TABS} activeKey={activeTab} onTabPress={setActiveTab} />
      {activeTab === 'address' ? renderAddressTab() : renderRepresentativesTab()}
    </View>
  );
};

const ContactItem = ({ icon, label, value, onPress, isLink }: any) => (
  <View style={styles.contactItem}>
    <View style={styles.contactIconBox}>
      <Icon name={icon} size={18} color={colors.primary} />
    </View>
    <View style={styles.contactTextContainer}>
      <Text style={styles.contactLabel}>{label}</Text>
      {onPress ? (
        <TouchableOpacity onPress={onPress}>
          <Text style={[styles.contactValue, isLink && styles.linkText]}>{value}</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.contactValue}>{value}</Text>
      )}
    </View>
  </View>
);

const HourRow = ({ day, time, isRest }: any) => (
  <View style={styles.hourRow}>
    <Text style={styles.hourDay}>{day}</Text>
    <Text style={[styles.hourTime, isRest && styles.restText]}>{time}</Text>
  </View>
);

const RepresentativeCard = ({ name, location, phone, email }: any) => (
  <Card style={styles.repCard}>
    <Text style={styles.repName}>{name}</Text>
    <View style={styles.repInfoRow}>
      <View style={styles.repIconBox}>
        <Icon name="map-pin" size={14} color={colors.primary} />
      </View>
      <Text style={styles.repInfoLabel}>Địa chỉ:</Text>
      <Text style={styles.repInfoText}>{location}</Text>
    </View>
    <View style={styles.repInfoRow}>
      <View style={styles.repIconBox}>
        <Icon name="phone" size={14} color={colors.primary} />
      </View>
      <Text style={styles.repInfoLabel}>SĐT:</Text>
      <TouchableOpacity onPress={() => Linking.openURL(`tel:${phone}`)}>
        <Text style={styles.repLinkText}>{phone}</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.repInfoRow}>
      <View style={styles.repIconBox}>
        <Icon name="mail" size={14} color={colors.primary} />
      </View>
      <Text style={styles.repInfoLabel}>Email:</Text>
      <TouchableOpacity onPress={() => Linking.openURL(`mailto:${email}`)}>
        <Text style={styles.repLinkText}>{email}</Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity style={styles.repDetailButton}>
      <Text style={styles.repDetailButtonText}>Xem chi tiết</Text>
    </TouchableOpacity>
  </Card>
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
  infoCard: {
    padding: spacing.lg,
    borderRadius: spacing.borderRadius.lg,
  },
  agencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: `${colors.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  agencyContent: {
    flex: 1,
  },
  agencyTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textDark,
  },
  agencySubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: spacing.md,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  contactIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: `${colors.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  contactTextContainer: {
    flex: 1,
  },
  contactLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textDark,
    marginBottom: 2,
  },
  contactValue: {
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
    lineHeight: 18,
  },
  linkText: {
    color: colors.primary,
  },
  mapCard: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: spacing.borderRadius.lg,
    marginTop: spacing.sm,
  },
  mapPlaceholder: {
    alignItems: 'center',
  },
  mapLabel: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginBottom: 4,
    marginTop: spacing.sm,
    fontWeight: '600',
  },
  mapAddress: {
    fontSize: typography.fontSize.sm,
    color: colors.textTertiary,
    textAlign: 'center',
  },
  hoursCard: {
    marginTop: spacing.xl,
    padding: spacing.md,
  },
  sectionHeader: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textDark,
    marginBottom: spacing.md,
    marginTop: spacing.xl,
  },
  cardTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textDark,
    marginBottom: spacing.sm,
  },
  workHoursContainer: {
    marginTop: spacing.xs,
  },
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  hourDay: {
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
  },
  hourTime: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textDark,
  },
  restText: {
    color: colors.primary,
  },
  infoBox: {
    backgroundColor: '#eff6ff',
    borderColor: '#dbeafe',
    borderWidth: 1,
    borderRadius: spacing.borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  infoBoxText: {
    fontSize: typography.fontSize.sm,
    color: '#193cb8',
    lineHeight: 20,
  },
  infoBoxTitle: {
    fontWeight: typography.fontWeight.semiBold,
  },
  repCard: {
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: spacing.borderRadius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  repName: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textDark,
    marginBottom: spacing.md,
  },
  repInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  repIconBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: `${colors.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  repInfoLabel: {
    width: 60,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  repInfoText: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
  },
  repLinkText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
  },
  repDetailButton: {
    marginTop: spacing.md,
    height: 40,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  repDetailButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.primary,
  },
});

export default ContactScreen;
