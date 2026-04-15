import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  useWindowDimensions,
  ImageBackground,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { colors, spacing, typography } from '../../theme';
import { Icon, Badge, ConfirmModal } from '../../components/shared';
import { LinearGradient } from 'expo-linear-gradient';

type Props = NativeStackScreenProps<RootStackParamList, 'PersonalAccount'>;

const InfoCard = ({ title, icon, value, isBadge = false, badgeText = '', badgeVariant = 'successAlt' as any }: any) => (
  <View style={styles.infoCard}>
    <View style={styles.infoIconBox}>
      <Icon name={icon} size={24} color={colors.primary} />
    </View>
    <View style={styles.infoContent}>
      <Text style={styles.infoLabel}>{title}</Text>
      {isBadge ? (
        <Badge label={badgeText} variant={badgeVariant} style={styles.badge} />
      ) : (
        <Text style={styles.infoValue}>{value || '--'}</Text>
      )}
    </View>
  </View>
);

export const PersonalAccountScreen = ({ navigation }: Props) => {
  const { width } = useWindowDimensions();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    navigation.navigate('LoginMethod');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Header Section */}
        <ImageBackground 
          source={{ uri: 'https://picsum.photos/800/600?grayscale&blur=2' }}
          style={styles.profileHeader}
        >
          <LinearGradient
            colors={['rgba(139, 26, 43, 0.9)', 'rgba(139, 26, 43, 0.7)']}
            style={styles.headerGradient}
          >
            <View style={styles.navBar}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navBtn}>
                <Icon name="arrow-left" size={24} color={colors.surface} />
              </TouchableOpacity>
              <Text style={styles.navTitle}>Tài khoản cá nhân</Text>
              <TouchableOpacity 
                onPress={() => navigation.navigate('EditPersonalAccount')} 
                style={styles.navBtn}
              >
                <Icon name="edit-3" size={22} color={colors.surface} />
              </TouchableOpacity>
            </View>

            <View style={styles.profileInfoArea}>
              <View style={styles.avatarWrapper}>
                <View style={styles.avatarMain}>
                  <Text style={styles.avatarInitial}>H</Text>
                </View>
                <View style={styles.verifiedBadge}>
                  <Icon name="check" size={12} color={colors.surface} />
                </View>
              </View>
              <Text style={styles.profileName}>Lương Ngọc Hân</Text>
            </View>
          </LinearGradient>
        </ImageBackground>

        {/* Content Section */}
        <View style={styles.contentBody}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Thông tin liên hệ</Text>
          </View>

          <View style={styles.cardsGrid}>
            <InfoCard title="Email" icon="mail" value="luong.ngochan@example.com" />
            <InfoCard title="Số điện thoại" icon="phone" value="+84 912 345 678" />
            <InfoCard title="Loại tài khoản" icon="user" isBadge badgeText="Cá nhân" />
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Thông tin pháp lý</Text>
          </View>
          
          <View style={styles.cardsGrid}>
            <InfoCard title="Mã định danh" icon="credit-card" value="001203014525" />
            <InfoCard title="Mã số thuế" icon="hash" value="001203014525" />
            <InfoCard title="Ngày cấp" icon="calendar" value="15/03/2021" />
            <InfoCard title="Nơi cấp" icon="map-pin" value="Cục Cảnh sát quản lý hành chính về trật tự xã hội" />
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Địa chỉ thường chú</Text>
          </View>

          <View style={styles.cardsGrid}>
            <InfoCard title="Quốc gia" icon="globe" value="Việt Nam" />
            <InfoCard title="Địa chỉ chi tiết" icon="map" value="123 Nguyễn Huệ, Gò Vấp, TP. Hồ Chí Minh" />
            <InfoCard title="Mã bưu chính" icon="package" value="700000" />
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsBox}>
            <TouchableOpacity 
              style={styles.actionItem}
              onPress={() => navigation.navigate('ChangePassword')}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#eff6ff' }]}>
                <Icon name="lock" size={20} color="#2563eb" />
              </View>
              <Text style={styles.actionText}>Đổi mật khẩu</Text>
              <Icon name="chevron-right" size={18} color={colors.textSecondary} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionItem}
              onPress={() => navigation.navigate('AccountSettings')}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#f5f5f5' }]}>
                <Icon name="settings" size={20} color="#4b5563" />
              </View>
              <Text style={styles.actionText}>Cấu hình tài khoản</Text>
              <Icon name="chevron-right" size={18} color={colors.textSecondary} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionItem}
              onPress={() => navigation.navigate('ComplaintList')}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#fff7ed' }]}>
                <Icon name="message-square" size={20} color="#ea580c" />
              </View>
              <Text style={styles.actionText}>Phản ánh kiến nghị</Text>
              <Icon name="chevron-right" size={18} color={colors.textSecondary} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.logoutBtn}
              onPress={handleLogout}
            >
              <Icon name="log-out" size={20} color="#e53935" />
              <Text style={styles.logoutText}>Đăng xuất</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <ConfirmModal
        visible={showLogoutModal}
        title="Xác nhận đăng xuất"
        message="Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?"
        confirmText="Đăng xuất"
        cancelText="Hủy"
        isDestructive
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    flexGrow: 1,
  },
  profileHeader: {
    height: 320,
    width: '100%',
  },
  headerGradient: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 44,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    height: 56,
  },
  navBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitle: {
    color: colors.surface,
    fontWeight: typography.fontWeight.semiBold,
    fontSize: typography.fontSize.md,
  },
  profileInfoArea: {
    alignItems: 'center',
    marginTop: 30,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarMain: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  avatarInitial: {
    fontSize: 40,
    fontWeight: '800',
    color: colors.primary,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: '#10B981',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.surface,
  },
  profileName: {
    color: colors.surface,
    fontWeight: '800',
    fontSize: 22,
    marginBottom: 4,
  },
  contentBody: {
    backgroundColor: '#F8F9FA',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: spacing.lg,
  },
  sectionHeader: {
    marginTop: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontWeight: typography.fontWeight.semiBold,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    fontSize: 12,
    opacity: 0.6,
  },
  cardsGrid: {
    gap: 12,
    marginBottom: 16,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  infoIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: `${colors.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 2,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  badge: {
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  actionsBox: {
    marginTop: 20,
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  actionText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    justifyContent: 'center',
    gap: 8,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#e53935',
  },
});

export default PersonalAccountScreen;
