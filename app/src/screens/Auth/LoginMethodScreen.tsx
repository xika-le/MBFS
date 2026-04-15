import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  useWindowDimensions,
  Modal,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const LoginMethodScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<NavigationProp>();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [currentLang, setCurrentLang] = useState('VI');

  const languages = [
    { code: 'VI', name: 'Tiếng Việt' },
    { code: 'EN', name: 'English' },
    { code: 'ZH', name: '中文' },
    { code: 'JA', name: '日本語' },
    { code: 'KO', name: '한국어' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        style={styles.scrollView}
        bounces={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header with Gradient */}
        <LinearGradient
          colors={['#c8102e', '#a50d25']}
          style={[styles.header, { width }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <SafeAreaView style={styles.safeArea}>
            {/* Top Bar: Language & Close */}
            <View style={styles.topBar}>
              <TouchableOpacity
                style={styles.langButton}
                onPress={() => setShowLanguageModal(true)}
              >
                <Feather name="globe" size={16} color={colors.surface} />
                <Text style={styles.langText}>{currentLang}</Text>
                <Feather name="chevron-down" size={14} color={colors.surface} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => navigation.goBack()}
              >
                <Feather name="x" size={24} color={colors.surface} />
              </TouchableOpacity>
            </View>

            <View style={styles.headerContent}>
              {/* Brand Section */}
              <View style={styles.brandSection}>
                <View style={styles.emblemContainer}>
                  <View style={styles.emblemBg}>
                    <Feather name="shield" size={28} color="#FFD700" />
                  </View>
                </View>
                <Text style={styles.brandTitle}>
                  Cổng Thông Tin{'\n'}Đầu Tư Quốc Gia
                </Text>
              </View>

              {/* Welcome Text */}
              <View style={styles.welcomeSection}>
                <Text style={styles.welcomeTitle}>Đăng nhập</Text>
                <Text style={styles.welcomeSubtitle}>Chọn phương thức đăng nhập</Text>
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>

        {/* Content Area */}
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.methodCard}
            onPress={() => navigation.navigate('IdentityLogin' as any)}
          >
            <View style={[styles.iconBox, { backgroundColor: '#fceced' }]}>
              <Feather name="user" size={22} color="#c8102e" />
            </View>
            <View style={styles.methodInfo}>
              <Text style={styles.methodName}>Đăng nhập</Text>
              <Text style={styles.methodDesc}>Sử dụng mã định danh và mật khẩu</Text>
            </View>
            <Feather name="chevron-right" size={18} color={colors.textTertiary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.methodCard}
            onPress={() => navigation.navigate('VNeIDLogin' as any)}
          >
            <View style={[styles.iconBox, { backgroundColor: '#eff6ff' }]}>
              <Feather name="shield" size={22} color="#1447e6" />
            </View>
            <View style={styles.methodInfo}>
              <Text style={styles.methodName}>Đăng nhập với VNeID</Text>
              <Text style={styles.methodDesc}>
                Sử dụng tài khoản định danh VNeID để truy cập các dịch vụ công trực tuyến nhanh chóng và an toàn.
              </Text>
            </View>
            <Feather name="chevron-right" size={18} color={colors.textTertiary} />
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>hoặc</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Bottom Actions */}
          <View style={styles.bottomActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Đăng ký tài khoản</Text>
            </TouchableOpacity>
            <View style={styles.verticalDivider} />
            <TouchableOpacity style={styles.actionButton}>
              <Text style={[styles.actionButtonText, { color: colors.textSecondary }]}>Quên mật khẩu</Text>
            </TouchableOpacity>
          </View>

          {/* System Info */}
          <View style={styles.infoBox}>
            <Feather name="info" size={16} color={colors.textSecondary} />
            <Text style={styles.infoText}>
              Nhanh, an toàn và bảo mật — sử dụng tài khoản Cổng Một Cửa Đầu Tư Quốc Gia ở mọi dịch vụ.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Language Modal */}
      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowLanguageModal(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Chọn ngôn ngữ</Text>
              <TouchableOpacity onPress={() => setShowLanguageModal(false)}>
                <Feather name="x" size={24} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>
            <View style={styles.langList}>
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  style={styles.langItem}
                  onPress={() => {
                    setCurrentLang(lang.code);
                    setShowLanguageModal(false);
                  }}
                >
                  <Text style={[
                    styles.langItemText,
                    currentLang === lang.code && styles.langItemTextActive
                  ]}>
                    {lang.name}
                  </Text>
                  {currentLang === lang.code && (
                    <Feather name="check" size={20} color={colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 20,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingBottom: 60, // Extra space for overlapping content
  },
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerContent: {
    marginTop: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  langButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  langText: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: typography.fontWeight.semiBold,
  },
  closeButton: {
    padding: 4,
  },
  brandSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    gap: 12,
  },
  emblemContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  emblemBg: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  brandTitle: {
    color: colors.surface,
    fontSize: 18,
    fontWeight: typography.fontWeight.semiBold,
    lineHeight: 22,
  },
  welcomeSection: {
    marginTop: 25,
    gap: 4,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.surface,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: -40,
    paddingBottom: 40,
  },
  methodCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodInfo: {
    flex: 1,
    marginHorizontal: 16,
  },
  methodName: {
    fontSize: 16,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  methodDesc: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.borderLight,
  },
  dividerText: {
    fontSize: 13,
    color: colors.textTertiary,
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: typography.fontWeight.semiBold,
    color: '#c8102e',
  },
  verticalDivider: {
    width: 1,
    height: 16,
    backgroundColor: colors.borderLight,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.02)',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },
  langList: {
    gap: 8,
  },
  langItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  langItemText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  langItemTextActive: {
    color: colors.primary,
    fontWeight: typography.fontWeight.semiBold,
  },
});
