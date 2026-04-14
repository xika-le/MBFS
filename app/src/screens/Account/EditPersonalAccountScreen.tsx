import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity, StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { colors, spacing, typography } from '../../theme';
import { Header, Badge, Input, Button } from '../../components/shared';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'EditPersonalAccount'>;

const InputRow = ({ label, value, onChange, editable = true, isDropdown = false, isBadge = false, badgeText = '' }: any) => (
  <View style={styles.inputRow}>
    <Text style={styles.inputLabel}>{label}</Text>
    {isBadge ? (
      <Badge label={badgeText} variant="successAlt" style={styles.badge} />
    ) : (
      <Input
        value={value}
        onChangeText={onChange}
        editable={editable}
        variant="outline"
        rightIcon={isDropdown ? <MaterialCommunityIcons name="chevron-down" size={20} color={colors.textSecondary} /> : undefined}
      />
    )}
  </View>
);

const EditPersonalAccountScreen = ({ navigation }: Props) => {
  const [formData, setFormData] = useState({
    name: 'Lương Ngọc Hân',
    email: 'luong.ngochan@example.com',
    phone: '+84 912 345 678',
    idNumber: '001203014525',
    issueDate: '15/03/2021',
    issuePlace: 'Cục Cảnh sát quản lý hành chính về trật tự xã hội',
    taxCode: '001203014525',
    country: 'Việt Nam',
    province: 'TP. Hồ Chí Minh',
    ward: 'Gò Vấp',
    address: '123 Nguyễn Huệ',
    postalCode: '10000',
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <Header title="Tài khoản cá nhân" onBack={() => navigation.goBack()} />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* HỒ SƠ SECTION */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Hồ sơ</Text>
              <MaterialCommunityIcons name="chevron-up" size={24} color={colors.textSecondary} />
            </View>
            
            <View style={styles.sectionContent}>
              <InputRow label="Họ và tên" value={formData.name} onChange={(v: string) => setFormData({...formData, name: v})} />
              <InputRow label="Email" value={formData.email} onChange={(v: string) => setFormData({...formData, email: v})} />
              <InputRow label="Số điện thoại" value={formData.phone} onChange={(v: string) => setFormData({...formData, phone: v})} />
              <InputRow label="Loại tài khoản" isBadge badgeText="Cá nhân" />
            </View>
          </View>

          {/* THÔNG TIN SECTION */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Thông tin</Text>
              <MaterialCommunityIcons name="chevron-up" size={24} color={colors.textSecondary} />
            </View>
            
            <View style={styles.sectionContent}>
              <InputRow label="Mã định danh" value={formData.idNumber} editable={false} />
              <InputRow label="Ngày cấp" value={formData.issueDate} editable={false} />
              <InputRow label="Nơi cấp" value={formData.issuePlace} editable={false} />
              <InputRow label="Mã số thuế" value={formData.taxCode} editable={false} />
              
              <InputRow label="Quốc gia" value={formData.country} isDropdown />
              <InputRow label="Tỉnh/Thành phố" value={formData.province} isDropdown />
              <InputRow label="Phường/Xã" value={formData.ward} isDropdown />
              <InputRow label="Địa chỉ" value={formData.address} onChange={(v: string) => setFormData({...formData, address: v})} />
              <InputRow label="Mã bưu chính" value={formData.postalCode} onChange={(v: string) => setFormData({...formData, postalCode: v})} />
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button title="Lưu thay đổi" onPress={() => navigation.goBack()} type="primary" style={styles.button} />
          <Button title="Hủy" onPress={() => navigation.goBack()} type="outline" style={styles.button} />
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
    paddingBottom: spacing.xl,
  },
  sectionContainer: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight, // rgba(0,0,0,0.1)
    marginBottom: spacing.xs,
  },
  sectionHeader: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },
  sectionContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.md, 
  },
  inputRow: {
    flexDirection: 'column',
    gap: 6,
  },
  inputLabel: {
    fontSize: typography.fontSize.md, // 14px
    fontWeight: typography.fontWeight.medium,
    color: '#4a5565',
  },
  badge: {
    alignSelf: 'flex-start',
  },
  footer: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    gap: spacing.md,
  },
  button: {
    width: '100%',
  },
});

export default EditPersonalAccountScreen;
