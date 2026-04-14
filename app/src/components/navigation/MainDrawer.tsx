import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { Icon } from '../shared';

interface NavItem {
  label: string;
  icon: any;
  route: string;
  params?: any;
}

export const MainDrawer: React.FC<DrawerContentComponentProps> = (props) => {
  const { navigation } = props;

  const sections: { title: string; items: NavItem[] }[] = [
    {
      title: 'Giới thiệu',
      items: [
        { label: 'Cục Đầu tư nước ngoài', icon: 'info' as const, route: 'About' },
        { label: 'Lĩnh vực đầu tư', icon: 'grid' as const, route: 'SectorList' },
        { label: 'Khu vực đầu tư', icon: 'map' as const, route: 'AreaList' },
        { label: 'Chính sách đầu tư', icon: 'file-text' as const, route: 'PolicyNews' },
        { label: 'Liên hệ', icon: 'phone' as const, route: 'Contact' },
      ],
    },
    {
      title: 'Dịch vụ',
      items: [
        { label: 'Thủ tục về đầu tư', icon: 'clipboard' as const, route: 'ProcedureList' },
        { label: 'Quản lý hồ sơ', icon: 'folder' as const, route: 'DossierList' },
        { label: 'Quản lý đặt lịch', icon: 'calendar' as const, route: 'AppointmentList' },
        { label: 'Báo cáo đầu tư', icon: 'activity' as const, route: 'Placeholder' },
      ],
    },
    {
      title: 'Khu công nghiệp / KKT',
      items: [
        { label: 'KCN / KKT ven biển', icon: 'layers' as const, route: 'IZList', params: { zoneType: 'kcn' } },
        { label: 'Khu chế xuất', icon: 'box' as const, route: 'IZList', params: { zoneType: 'kcx' } },
        { label: 'KCN công nghệ cao', icon: 'cpu' as const, route: 'IZList', params: { zoneType: 'kcnctc' } },
      ],
    },
    {
      title: 'Tin tức & Tra cứu',
      items: [
        { label: 'Tin tức đầu tư', icon: 'globe' as const, route: 'InvestmentNews' },
        { label: 'Văn bản pháp luật', icon: 'book-open' as const, route: 'LegalDocumentList' },
        { label: 'Câu chuyện thành công', icon: 'award' as const, route: 'SuccessStory' },
        { label: 'FAQ', icon: 'help-circle' as const, route: 'FAQHome' },
        { label: 'Hướng dẫn sử dụng', icon: 'book' as const, route: 'HelpGuide' },
      ],
    },
  ];

  const handleNavigate = (route: string, params?: any) => {
    if (route === 'Placeholder') return;
    // @ts-ignore
    navigation.navigate('MainStack', {
      screen: route,
      params: params,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Drawer Header - User Info */}
      <View style={styles.header}>
        <View style={styles.userInfoRow}>
          <TouchableOpacity 
            style={styles.avatar}
            onPress={() => handleNavigate('PersonalAccount')}
          >
            <Icon name="user" size={24} color={colors.surface} />
          </TouchableOpacity>
          <View style={styles.userNameContainer}>
            <Text style={styles.userName}>Nguyễn Văn A</Text>
            <Text style={styles.userEmail}>nguyenvana@example.com</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.viewProfileBtn}
          onPress={() => handleNavigate('PersonalAccount')}
        >
          <Text style={styles.viewProfileText}>Xem hồ sơ</Text>
        </TouchableOpacity>
      </View>

      <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
        {sections.map((section, sIndex) => (
          <View key={sIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title.toUpperCase()}</Text>
            <View style={styles.itemsContainer}>
              {section.items.map((item, iIndex) => (
                <TouchableOpacity
                  key={iIndex}
                  style={styles.item}
                  onPress={() => handleNavigate(item.route, item.params)}
                >
                  <Icon name={item.icon} size={18} color={colors.textPrimary} />
                  <Text style={styles.itemLabel}>{item.label}</Text>
                  <Icon name="chevron-right" size={16} color={colors.textSecondary} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </DrawerContentScrollView>

      {/* Drawer Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.footerItem}
          onPress={() => handleNavigate('AccountSettings')}
        >
          <Icon name="settings" size={18} color={colors.textPrimary} />
          <Text style={styles.footerItemLabel}>Cấu hình tài khoản</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Icon name="log-out" size={18} color="#e53935" />
          <Text style={[styles.footerItemLabel, { color: '#e53935' }]}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139,26,26,0.1)',
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userNameContainer: {
    flex: 1,
  },
  userName: {
    fontWeight: typography.fontWeight.medium,
    fontSize: 14,
    color: '#111',
  },
  userEmail: {
    fontWeight: typography.fontWeight.regular,
    fontSize: 12,
    color: 'rgba(139,26,26,0.7)',
  },
  viewProfileBtn: {
    marginTop: 4,
  },
  viewProfileText: {
    fontWeight: typography.fontWeight.medium,
    fontSize: 12,
    color: colors.primary,
  },
  drawerContent: {
    paddingTop: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: typography.fontWeight.medium,
    fontSize: 12,
    color: 'rgba(139,26,26,0.5)',
    letterSpacing: 0.6,
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  itemsContainer: {
    paddingHorizontal: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 12,
  },
  itemLabel: {
    flex: 1,
    fontWeight: typography.fontWeight.medium,
    fontSize: 14,
    color: '#111',
    letterSpacing: -0.15,
  },
  footer: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(139,26,26,0.1)',
    gap: 4,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 12,
  },
  footerItemLabel: {
    fontWeight: typography.fontWeight.medium,
    fontSize: 14,
    color: '#111',
    letterSpacing: -0.15,
  },
});
