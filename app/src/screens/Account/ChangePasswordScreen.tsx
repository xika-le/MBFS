import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity, StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { colors, spacing, typography } from '../../theme';
import { Header, Input, Button } from '../../components/shared';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'ChangePassword'>;

const PasswordInput = ({ label, placeholder, value, onChange }: any) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.inputRow}>
      <Text style={styles.inputLabel}>
        {label} <Text style={styles.requiredAsterisk}>*</Text>
      </Text>
      <Input
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        variant="outline"
        secureTextEntry={!showPassword}
        rightIcon={
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <MaterialCommunityIcons 
              name={showPassword ? 'eye-outline' : 'eye-off-outline'} 
              size={20} 
              color={colors.textSecondary} 
            />
          </TouchableOpacity>
        }
      />
    </View>
  );
};

const ChangePasswordScreen = ({ navigation }: Props) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const isFormValid = formData.currentPassword.length > 0 && formData.newPassword.length > 0 && formData.confirmPassword === formData.newPassword;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <Header title="Đổi mật khẩu" onBack={() => navigation.goBack()} />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <PasswordInput 
              label="Mật khẩu hiện tại" 
              placeholder="Nhập mật khẩu hiện tại" 
              value={formData.currentPassword}
              onChange={(v: string) => setFormData({...formData, currentPassword: v})}
            />
            
            <PasswordInput 
              label="Mật khẩu mới" 
              placeholder="Nhập mật khẩu mới" 
              value={formData.newPassword}
              onChange={(v: string) => setFormData({...formData, newPassword: v})}
            />
            
            <PasswordInput 
              label="Xác nhận mật khẩu mới" 
              placeholder="Nhập lại mật khẩu mới" 
              value={formData.confirmPassword}
              onChange={(v: string) => setFormData({...formData, confirmPassword: v})}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button 
            title="Cập nhật mật khẩu" 
            onPress={() => navigation.goBack()} 
            type="primary" 
            style={styles.button}
            disabled={!isFormValid} 
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background, // #f9fafb
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: spacing.borderRadius.lg,
    padding: spacing.lg,
    gap: spacing.lg,
    borderWidth: 1,
    borderColor: '#eaecf0',
  },
  inputRow: {
    flexDirection: 'column',
    gap: 6,
  },
  inputLabel: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: '#101828',
  },
  requiredAsterisk: {
    color: colors.primary, // Red *
  },
  footer: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  button: {
    width: '100%',
  },
});

export default ChangePasswordScreen;
