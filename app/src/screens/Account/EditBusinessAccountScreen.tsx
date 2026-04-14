import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity, StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { colors, spacing, typography } from '../../theme';
import { Header, Input, Button } from '../../components/shared';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'EditBusinessAccount'>;

const InputRow = ({ label, value, onChange, editable = true, isDropdown = false }: any) => (
  <View style={styles.inputRow}>
    <Text style={styles.inputLabel}>{label}</Text>
    <Input
      value={value}
      onChangeText={onChange}
      editable={editable}
      variant="outline"
      rightIcon={isDropdown ? <MaterialCommunityIcons name="chevron-down" size={20} color={colors.textSecondary} /> : undefined}
    />
  </View>
);

const FileCard = ({ name, size }: { name: string, size: string }) => (
  <View style={styles.fileCard}>
    <View style={styles.fileIconWrapper}>
      <MaterialCommunityIcons name="file-document-outline" size={24} color={colors.textSecondary} />
    </View>
    <View style={styles.fileInfo}>
      <Text style={styles.fileName}>{name}</Text>
      <Text style={styles.fileSize}>{size}</Text>
    </View>
    <TouchableOpacity style={styles.deleteButton}>
      <MaterialCommunityIcons name="trash-can-outline" size={20} color={colors.primary} />
    </TouchableOpacity>
  </View>
);

const EditBusinessAccountScreen = ({ navigation }: Props) => {
  const [formData, setFormData] = useState({
    companyName: 'Công ty TNHH Đầu tư Phát triển ABC',
    taxCode: '0123456789',
    businessType: 'Công ty TNHH',
    industry: 'Công nghệ thông tin',
    website: 'https://abc-company.vn',
    repName: 'Nguyễn Văn A',
    repTitle: 'Giám đốc',
    repEmail: 'nguyen.vana@abc-company.vn',
    repPhone: '+84 901 234 567',
    country: 'Việt Nam',
    province: 'TP. Hồ Chí Minh',
    ward: 'Gò Vấp',
    address: '45 Lê Lợi, Quận 1',
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <Header title="Quản lý doanh nghiệp" onBack={() => navigation.goBack()} />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* THÔNG TIN CÔNG TY */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Thông tin công ty</Text>
            </View>
            
            <View style={styles.sectionContent}>
              <InputRow label="Tên doanh nghiệp" value={formData.companyName} onChange={(v: string) => setFormData({...formData, companyName: v})} />
              <InputRow label="Mã số thuế" value={formData.taxCode} editable={false} />
              <InputRow label="Loại hình doanh nghiệp" value={formData.businessType} isDropdown />
              <InputRow label="Ngành nghề chính" value={formData.industry} isDropdown />
              <InputRow label="Website" value={formData.website} onChange={(v: string) => setFormData({...formData, website: v})} />
            </View>
          </View>

          {/* NGƯỜI ĐẠI DIỆN */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Người đại diện</Text>
            </View>
            
            <View style={styles.sectionContent}>
              <InputRow label="Người đại diện" value={formData.repName} onChange={(v: string) => setFormData({...formData, repName: v})} />
              <InputRow label="Chức vụ" value={formData.repTitle} onChange={(v: string) => setFormData({...formData, repTitle: v})} />
              <InputRow label="Email" value={formData.repEmail} onChange={(v: string) => setFormData({...formData, repEmail: v})} />
              <InputRow label="Số điện thoại" value={formData.repPhone} onChange={(v: string) => setFormData({...formData, repPhone: v})} />
            </View>
          </View>

          {/* ĐỊA CHỈ */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Địa chỉ</Text>
            </View>
            
            <View style={styles.sectionContent}>
              <InputRow label="Quốc gia" value={formData.country} isDropdown />
              <InputRow label="Tỉnh/Thành phố" value={formData.province} isDropdown />
              <InputRow label="Phường/Xã" value={formData.ward} isDropdown />
              <InputRow label="Địa chỉ" value={formData.address} onChange={(v: string) => setFormData({...formData, address: v})} />
            </View>
          </View>

          {/* GIẤY TỜ */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Giấy tờ</Text>
              <MaterialCommunityIcons name="chevron-up" size={24} color={colors.textSecondary} />
            </View>
            
            <View style={styles.sectionContent}>
              <Text style={styles.inputLabel}>Giấy phép và chứng từ</Text>
              
              <FileCard name="giay-phep-dkkd.pdf" size="2.3 MB" />
              <FileCard name="giay-to-phap-nhan.pdf" size="1.8 MB" />
              
              <TouchableOpacity style={styles.uploadButton}>
                <MaterialCommunityIcons name="upload" size={20} color={colors.textPrimary} />
                <Text style={styles.uploadButtonText}>Tải tệp lên</Text>
              </TouchableOpacity>
              <Text style={styles.uploadHelperText}>Chấp nhận: PDF, DOC, DOCX, JPG, PNG (Tối đa 10MB mỗi file)</Text>
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
  fileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eaecf0',
    borderRadius: spacing.borderRadius.md,
    padding: spacing.md,
    backgroundColor: colors.surface,
  },
  fileIconWrapper: {
    marginRight: spacing.md,
  },
  fileInfo: {
    flex: 1,
    gap: 2,
  },
  fileName: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },
  fileSize: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  deleteButton: {
    padding: spacing.xs,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eaecf0',
    borderRadius: spacing.borderRadius.md,
    padding: spacing.md,
    marginTop: spacing.xs,
    gap: spacing.sm,
  },
  uploadButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },
  uploadHelperText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
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

export default EditBusinessAccountScreen;
