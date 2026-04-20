import React, { useState } from 'react';
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
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../theme';
import { Header, Input, Button, RegisterStepIndicator } from '../../components/shared';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';

type RegisterFormRouteProp = RouteProp<RootStackParamList, any>;

export const RegisterFormScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RegisterFormRouteProp>();
  const { type } = route.params as { type: 'VN_INDIVIDUAL' | 'BUSINESS' | 'FOREIGN_INDIVIDUAL' };

  const [formData, setFormData] = useState({
    fullName: '',
    organizationName: '',
    identityId: '',
    issueDate: '',
    issuePlace: '',
    taxId: '',
    nationality: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getTitle = () => {
    switch (type) {
      case 'VN_INDIVIDUAL': return 'Đăng ký cá nhân VN';
      case 'BUSINESS': return 'Đăng ký doanh nghiệp';
      case 'FOREIGN_INDIVIDUAL': return 'Đăng ký cá nhân nước ngoài';
      default: return 'Đăng ký tài khoản';
    }
  };

  const getIdentityLabel = () => {
    switch (type) {
      case 'VN_INDIVIDUAL': return 'Số CCCD/Số định danh*';
      case 'BUSINESS': return 'Mã số doanh nghiệp*';
      case 'FOREIGN_INDIVIDUAL': return 'Số hộ chiếu*';
      default: return 'Mã định danh*';
    }
  };

  const getIdentityPlaceholder = () => {
    switch (type) {
      case 'VN_INDIVIDUAL': return 'Nhập số CCCD/Số định danh';
      case 'BUSINESS': return 'Nhập mã số doanh nghiệp';
      case 'FOREIGN_INDIVIDUAL': return 'Nhập số hộ chiếu';
      default: return 'Nhập mã định danh';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title={getTitle()} onBack={() => navigation.goBack()} />
      <RegisterStepIndicator currentStep={2} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
          {/* Section 1: Basic Info */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Feather name="user" size={18} color={colors.primary} />
              <Text style={styles.sectionTitle}>Thông tin hồ sơ</Text>
            </View>

            {type === 'BUSINESS' && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Tên tổ chức/doanh nghiệp*</Text>
                <Input
                  placeholder="Nhập tên tổ chức"
                  value={formData.organizationName}
                  onChangeText={(val) => setFormData({ ...formData, organizationName: val })}
                  variant="outline"
                />
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Họ và tên người đại diện/cá nhân*</Text>
              <Input
                placeholder="Nhập họ và tên đầy đủ"
                value={formData.fullName}
                onChangeText={(val) => setFormData({ ...formData, fullName: val })}
                variant="outline"
              />
            </View>

            {type === 'FOREIGN_INDIVIDUAL' && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Quốc tịch*</Text>
                <Input
                  placeholder="Chọn quốc tịch"
                  value={formData.nationality}
                  onChangeText={(val) => setFormData({ ...formData, nationality: val })}
                  variant="outline"
                  rightIcon={<Feather name="chevron-down" size={18} color={colors.textTertiary} />}
                />
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{getIdentityLabel()}</Text>
              <Input
                placeholder={getIdentityPlaceholder()}
                value={formData.identityId}
                onChangeText={(val) => setFormData({ ...formData, identityId: val })}
                variant="outline"
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>Ngày cấp*</Text>
                <Input
                  placeholder="dd/mm/yyyy"
                  value={formData.issueDate}
                  onChangeText={(val) => setFormData({ ...formData, issueDate: val })}
                  variant="outline"
                  rightIcon={<Feather name="calendar" size={18} color={colors.textTertiary} />}
                />
              </View>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>Nơi cấp*</Text>
                <Input
                  placeholder="Nhập nơi cấp"
                  value={formData.issuePlace}
                  onChangeText={(val) => setFormData({ ...formData, issuePlace: val })}
                  variant="outline"
                />
              </View>
            </View>

            {type !== 'FOREIGN_INDIVIDUAL' && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Mã số thuế*</Text>
                <Input
                  placeholder="Nhập mã số thuế"
                  value={formData.taxId}
                  onChangeText={(val) => setFormData({ ...formData, taxId: val })}
                  variant="outline"
                />
              </View>
            )}
          </View>

          {/* Section 2: Contact Info */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Feather name="phone" size={18} color={colors.primary} />
              <Text style={styles.sectionTitle}>Thông tin liên hệ</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Số điện thoại*</Text>
              <View style={styles.phoneInputRow}>
                <View style={styles.callingCode}>
                  <Text style={styles.callingCodeText}>🇻🇳 +84</Text>
                  <Feather name="chevron-down" size={14} color={colors.textTertiary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Input
                    placeholder="Nhập số điện thoại"
                    value={formData.phone}
                    onChangeText={(val) => setFormData({ ...formData, phone: val })}
                    variant="outline"
                  />
                </View>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email*</Text>
              <Input
                placeholder="example@email.com"
                value={formData.email}
                onChangeText={(val) => setFormData({ ...formData, email: val })}
                variant="outline"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Section 3: Password */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Feather name="lock" size={18} color={colors.primary} />
              <Text style={styles.sectionTitle}>Tạo mật khẩu</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mật khẩu*</Text>
              <Input
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChangeText={(val) => setFormData({ ...formData, password: val })}
                secureTextEntry={!showPassword}
                variant="outline"
                rightIcon={
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Feather name={showPassword ? "eye" : "eye-off"} size={18} color={colors.textTertiary} />
                  </TouchableOpacity>
                }
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nhập lại mật khẩu*</Text>
              <Input
                placeholder="Xác nhận mật khẩu"
                value={formData.confirmPassword}
                onChangeText={(val) => setFormData({ ...formData, confirmPassword: val })}
                secureTextEntry={!showConfirmPassword}
                variant="outline"
                rightIcon={
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Feather name={showConfirmPassword ? "eye" : "eye-off"} size={18} color={colors.textTertiary} />
                  </TouchableOpacity>
                }
              />
            </View>
          </View>

          {/* Terms */}
          <View style={styles.termsWrapper}>
            <TouchableOpacity 
              style={styles.checkbox} 
              onPress={() => setFormData({...formData, agreeTerms: !formData.agreeTerms})}
            >
              <View style={[styles.checkOuter, formData.agreeTerms && styles.checkOuterActive]}>
                {formData.agreeTerms && <Feather name="check" size={12} color={colors.surface} />}
              </View>
            </TouchableOpacity>
            <Text style={styles.termsText}>
              Tôi đồng ý với <Text style={styles.termsLink}>Điều khoản sử dụng</Text> và <Text style={styles.termsLink}>Chính sách bảo mật</Text> của hệ thống
            </Text>
          </View>

          {/* Actions */}
          <View style={styles.footer}>
            <Button
              title="Đăng ký tài khoản"
              onPress={() => {}}
              disabled={!formData.agreeTerms}
              style={styles.submitBtn}
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
    backgroundColor: colors.surfaceAlt,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },
  inputGroup: {
    marginBottom: 16,
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  phoneInputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  callingCode: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.borderLight,
    paddingHorizontal: 12,
    borderRadius: 12,
    gap: 6,
    height: 52,
  },
  callingCodeText: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  termsWrapper: {
    flexDirection: 'row',
    marginBottom: 30,
    paddingHorizontal: 4,
    gap: 12,
  },
  checkbox: {
    paddingTop: 2,
  },
  checkOuter: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  checkOuterActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  termsText: {
    flex: 1,
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  termsLink: {
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
  },
  footer: {
    marginTop: 10,
  },
  submitBtn: {
    height: 52,
    borderRadius: 12,
  },
});
