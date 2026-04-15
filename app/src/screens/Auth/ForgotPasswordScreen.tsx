import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../theme';
import { Input, Button } from '../../components/shared';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation();
  const [identityId, setIdentityId] = useState('');

  const handleSendEmail = () => {
    // Navigate to ResetPassword for demo
    // @ts-ignore
    navigation.navigate('ResetPassword');
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
            <Text style={styles.subtitle}>CỔNG MỘT CỬA ĐẦU TƯ QUỐC GIA HỖ TRỢ KHÔI PHỤC</Text>
            <Text style={styles.title}>Quên mật khẩu?</Text>
            <Text style={styles.description}>
              Vui lòng nhập mã định danh bạn đã đăng ký. Chúng tôi sẽ gửi đường dẫn khởi tạo mật khẩu mới vào email của bạn.
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mã định danh <Text style={{ color: colors.primary }}>*</Text></Text>
              <Input
                placeholder="Nhập mã định danh"
                value={identityId}
                onChangeText={setIdentityId}
                variant="outline"
              />
            </View>

            <Button
              title="Gửi email"
              onPress={handleSendEmail}
              style={styles.submitBtn}
            />

            <TouchableOpacity 
              style={styles.loginLink} 
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.loginLinkText}>Quay lại đăng nhập</Text>
            </TouchableOpacity>
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
    marginTop: 80,
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
  inputGroup: {
    marginBottom: 24,
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
});
