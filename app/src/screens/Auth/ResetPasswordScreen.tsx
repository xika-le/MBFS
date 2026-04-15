import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../theme';
import { Input, Button } from '../../components/shared';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export const ResetPasswordScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleResetPassword = () => {
    // Show success notice or navigate back to login
    // For now, go back to login method
    // @ts-ignore
    navigation.navigate('LoginMethod');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#991020', '#7a0e1e', '#5e0a16']}
        style={styles.background}
      >
        <SafeAreaView style={styles.safeArea}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Feather name="chevron-left" size={28} color={colors.surface} />
          </TouchableOpacity>

          <View style={styles.card}>
            <Text style={styles.subtitle}>CỔNG MỘT CỬA ĐẦU TƯ QUỐC GIA HỖ TRỢ ĐẶT LẠI MẬT KHẨU</Text>
            <Text style={styles.title}>Đặt lại mật khẩu</Text>
            <Text style={styles.description}>
              Nhập mật khẩu mới để tiếp tục sử dụng hệ thống.
            </Text>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Mật khẩu mới <Text style={{ color: colors.primary }}>*</Text>
                </Text>
                <Input
                  placeholder="Nhập mật khẩu mới"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry={!showNewPassword}
                  variant="outline"
                  rightIcon={
                    <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                      <Feather name={showNewPassword ? "eye-off" : "eye"} size={20} color={colors.textTertiary} />
                    </TouchableOpacity>
                  }
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Nhập lại mật khẩu <Text style={{ color: colors.primary }}>*</Text>
                </Text>
                <Input
                  placeholder="Nhập lại mật khẩu"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  variant="outline"
                  rightIcon={
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                      <Feather name={showConfirmPassword ? "eye-off" : "eye"} size={20} color={colors.textTertiary} />
                    </TouchableOpacity>
                  }
                />
              </View>
            </View>

            <Button
              title="Đặt lại mật khẩu"
              onPress={handleResetPassword}
              style={styles.submitBtn}
            />

            <TouchableOpacity 
              style={styles.loginLink} 
              onPress={() => navigation.navigate('LoginMethod' as any)}
            >
              <Text style={styles.loginLinkText}>Quay lại đăng nhập</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Nhanh, an toàn và bảo mật — sử dụng tài khoản Cổng Một Cửa Đầu Tư Quốc Gia ở mọi dịch vụ.
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  backButton: {
    marginTop: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    marginTop: 40,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.35,
    shadowRadius: 60,
    elevation: 10,
  },
  subtitle: {
    fontSize: 10,
    fontWeight: typography.fontWeight.semiBold,
    color: '#9ca3af',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: typography.fontWeight.semiBold,
    color: '#7a0e1e',
    marginBottom: 12,
  },
  description: {
    fontSize: 13.5,
    color: '#6b7280',
    lineHeight: 21.6,
    marginBottom: 24,
  },
  form: {
    gap: 16,
    marginBottom: 24,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: typography.fontWeight.medium,
    color: '#374151',
  },
  submitBtn: {
    height: 50,
    borderRadius: 8,
    backgroundColor: colors.primary,
    shadowColor: '#780a1e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 5,
  },
  loginLink: {
    marginTop: 16,
    alignItems: 'flex-start',
  },
  loginLinkText: {
    fontSize: 14,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.primary,
  },
  footer: {
    marginTop: 'auto',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.65)',
    textAlign: 'center',
    lineHeight: 19.2,
  },
});
