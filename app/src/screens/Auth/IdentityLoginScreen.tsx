import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TextInput,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { Header, Input, Button } from '../../components/shared';
import { useNavigation } from '@react-navigation/native';

export const IdentityLoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const [identityId, setIdentityId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const passwordRef = useRef<TextInput>(null);

  const handleLogin = () => {
    if (identityId === 'admin' && password === 'admin') {
      // @ts-ignore
      navigation.navigate('MainApp');
    } else {
      Alert.alert(
        'Đăng nhập thất bại',
        'Vui lòng kiểm tra lại mã định danh hoặc mật khẩu.',
        [{ text: 'Đóng', style: 'default' }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header 
        title="Đăng nhập Nhà đầu tư" 
        onBack={() => navigation.goBack()}
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.form}>
            {/* Identity Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mã định danh*</Text>
              <Input
                placeholder="Nhập mã định danh của bạn"
                value={identityId}
                onChangeText={setIdentityId}
                leftIcon={<Feather name="user" size={18} color={colors.textSecondary} />}
                variant="outline"
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mật khẩu*</Text>
              <Input
                ref={passwordRef}
                placeholder="Nhập mật khẩu"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                variant="outline"
                returnKeyType="go"
                onSubmitEditing={handleLogin}
                rightIcon={
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Feather 
                      name={showPassword ? "eye-off" : "eye"} 
                      size={18} 
                      color={colors.textSecondary} 
                    />
                  </TouchableOpacity>
                }
              />
            </View>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotPass}>
              <Text style={styles.forgotPassText}>Quên mật khẩu?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <Button
              title="Đăng nhập"
              onPress={handleLogin}
              style={styles.loginButton}
            />

            {/* Biometric Option */}
            <TouchableOpacity style={styles.biometricButton}>
              <View style={styles.biometricIconBox}>
                <Feather name="aperture" size={22} color={colors.primary} />
              </View>
              <Text style={styles.biometricText}>Đăng nhập bằng vân tay / Face ID</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Chưa có tài khoản?</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Register Action */}
            <Button
              title="Đăng ký tài khoản mới"
              onPress={() => {}}
              type="outline"
              style={styles.registerButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    backgroundColor: colors.surface,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 30,
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },
  forgotPass: {
    alignSelf: 'flex-start',
    marginTop: -8,
  },
  forgotPassText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
  loginButton: {
    height: 52,
    borderRadius: 12,
    marginTop: 10,
  },
  biometricButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt2,
    padding: 12,
    borderRadius: 12,
    gap: 12,
    marginTop: 10,
  },
  biometricIconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  biometricText: {
    fontSize: 14,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
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
  registerButton: {
    height: 48,
    borderRadius: 12,
  },
});
