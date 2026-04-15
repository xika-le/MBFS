import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export default function CreateComplaintScreen() {
  const navigation = useNavigation();
  const [targetType, setTargetType] = useState<'individual' | 'organization'>('individual');
  const [sections, setSections] = useState({
    personal: true,
    content: false,
    attachments: false,
  });

  const toggleSection = (key: keyof typeof sections) => {
    setSections({ ...sections, [key]: !sections[key] });
  };

  const renderInputField = (label: string, placeholder: string, required = false, isSelect = false) => (
    <View style={styles.formField}>
      <Text style={styles.fieldLabel}>
        {label}
        {required && <Text style={{ color: '#FB2C36' }}>*</Text>}
      </Text>
      <TouchableOpacity 
        style={styles.inputContainer} 
        disabled={!isSelect}
        activeOpacity={0.7}
      >
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.textTertiary}
          editable={!isSelect}
        />
        {isSelect && (
          <Ionicons name="chevron-down" size={16} color={colors.textSecondary} />
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header — Simple style */}
      <View style={styles.header}>
        <View style={styles.navRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Gửi phản ánh kiến nghị</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Step 1: Target Type */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>ĐỐI TƯỢNG PHẢN ÁNH</Text>
          <View style={styles.targetTypeRow}>
            <TouchableOpacity 
              style={[
                styles.targetTypeButton, 
                targetType === 'individual' && styles.activeTargetButton
              ]}
              onPress={() => setTargetType('individual')}
            >
              <View style={[
                styles.radio, 
                targetType === 'individual' && styles.activeRadio
              ]}>
                {targetType === 'individual' && <View style={styles.radioInner} />}
              </View>
              <View style={styles.targetIconRow}>
                <Ionicons 
                  name="person-outline" 
                  size={14} 
                  color={targetType === 'individual' ? colors.primary : colors.textSecondary} 
                />
                <Text style={[
                  styles.targetTypeText,
                  targetType === 'individual' && styles.activeTargetText
                ]}>Cá nhân</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.targetTypeButton, 
                targetType === 'organization' && styles.activeTargetButton
              ]}
              onPress={() => setTargetType('organization')}
            >
              <View style={[
                styles.radio, 
                targetType === 'organization' && styles.activeRadio
              ]}>
                {targetType === 'organization' && <View style={styles.radioInner} />}
              </View>
              <View style={styles.targetIconRow}>
                <Ionicons 
                  name="business-outline" 
                  size={14} 
                  color={targetType === 'organization' ? colors.primary : colors.textSecondary} 
                />
                <Text style={[
                  styles.targetTypeText,
                  targetType === 'organization' && styles.activeTargetText
                ]}>Tổ chức / DN</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Step 2: Personal Info */}
        <View style={styles.collapseCard}>
          <TouchableOpacity 
            style={styles.collapseHeader} 
            onPress={() => toggleSection('personal')}
          >
            <View style={styles.collapseHeaderLeft}>
              <View style={styles.circleIcon}>
                <Feather name="user" size={14} color={colors.primary} />
              </View>
              <Text style={styles.collapseTitle}>
                {targetType === 'individual' ? 'Thông tin cá nhân' : 'Thông tin tổ chức'}
              </Text>
              <View style={styles.requiredBadge}>
                <Text style={styles.requiredText}>Bắt buộc</Text>
              </View>
            </View>
            <Ionicons 
              name={sections.personal ? "chevron-up" : "chevron-down"} 
              size={18} 
              color={colors.textTertiary} 
            />
          </TouchableOpacity>
          
          {sections.personal && (
            <View style={styles.collapseContent}>
              {targetType === 'individual' ? (
                <>
                  {renderInputField("Họ và tên", "Nhập họ và tên đầy đủ", true)}
                  <View style={styles.rowFields}>
                    <View style={{ flex: 1, marginRight: spacing.sm }}>
                      {renderInputField("Tỉnh/Thành phố", "Chọn tỉnh/thành phố", true, true)}
                    </View>
                    <View style={{ flex: 1 }}>
                      {renderInputField("Xã/Phường", "Chọn xã/phường", true, true)}
                    </View>
                  </View>
                  {renderInputField("Địa chỉ", "Số nhà, đường phố...", true)}
                  <View style={styles.formField}>
                    <Text style={styles.fieldLabel}>Số điện thoại<Text style={{ color: '#FB2C36' }}>*</Text></Text>
                    <View style={styles.phoneInputRow}>
                      <TouchableOpacity style={styles.flagPicker}>
                        <Text style={styles.flagIcon}>🇻🇳</Text>
                        <Text style={styles.countryCode}>+84</Text>
                        <Ionicons name="chevron-down" size={10} color={colors.textSecondary} />
                      </TouchableOpacity>
                      <View style={styles.phoneInputContainer}>
                        <TextInput 
                          style={styles.input} 
                          placeholder="Số điện thoại" 
                          placeholderTextColor={colors.textTertiary}
                          keyboardType="phone-pad"
                        />
                      </View>
                    </View>
                  </View>
                  {renderInputField("Email", "Nhập địa chỉ email", true)}
                </>
              ) : (
                <>
                  {renderInputField("Tên tổ chức / Doanh nghiệp", "Nhập tên tổ chức, doanh nghiệp", true)}
                  {renderInputField("Người đại diện", "Họ và tên", true)}
                  {renderInputField("Chức vụ", "Chức vụ", true)}
                  <View style={styles.rowFields}>
                    <View style={{ flex: 1, marginRight: spacing.sm }}>
                      {renderInputField("Tỉnh/Thành phố", "Chọn tỉnh/thành phố", true, true)}
                    </View>
                    <View style={{ flex: 1 }}>
                      {renderInputField("Xã/Phường", "Chọn xã/phường", true, true)}
                    </View>
                  </View>
                  {renderInputField("Địa chỉ", "Số nhà, đường phố...", true)}
                  <View style={styles.formField}>
                    <Text style={styles.fieldLabel}>Số điện thoại<Text style={{ color: '#FB2C36' }}>*</Text></Text>
                    <View style={styles.phoneInputRow}>
                      <TouchableOpacity style={styles.flagPicker}>
                        <Text style={styles.flagIcon}>🇻🇳</Text>
                        <Text style={styles.countryCode}>+84</Text>
                        <Ionicons name="chevron-down" size={10} color={colors.textSecondary} />
                      </TouchableOpacity>
                      <View style={styles.phoneInputContainer}>
                        <TextInput 
                          style={styles.input} 
                          placeholder="Số điện thoại" 
                          placeholderTextColor={colors.textTertiary}
                          keyboardType="phone-pad"
                        />
                      </View>
                    </View>
                  </View>
                </>
              )}
            </View>
          )}
        </View>

        {/* Step 3: Content */}
        <View style={styles.collapseCard}>
          <TouchableOpacity 
            style={styles.collapseHeader}
            onPress={() => toggleSection('content')}
          >
            <View style={styles.collapseHeaderLeft}>
              <View style={styles.circleIcon}>
                <Feather name="edit-3" size={14} color={colors.primary} />
              </View>
              <Text style={styles.collapseTitle}>Nội dung phản ánh</Text>
              <View style={styles.requiredBadge}>
                <Text style={styles.requiredText}>Bắt buộc</Text>
              </View>
            </View>
            <Ionicons 
              name={sections.content ? "chevron-up" : "chevron-down"} 
              size={18} 
              color={colors.textTertiary} 
            />
          </TouchableOpacity>
          
          {sections.content && (
            <View style={styles.collapseContent}>
              {renderInputField("Chủ đề phản ánh", "Chọn chủ đề", true, true)}
              {renderInputField("Đơn vị tiếp nhận", "Chọn đơn vị tiếp nhận", true, true)}
              {renderInputField("Tiêu đề phản ánh", "Nhập tiêu đề phản ánh kiến nghị", true)}
              
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Loại nội dung</Text>
                <View style={styles.radioGroup}>
                  <TouchableOpacity style={styles.radioItem} activeOpacity={0.7}>
                    <View style={[styles.customRadio, styles.activeCustomRadio]}>
                      <View style={styles.customRadioInner} />
                    </View>
                    <Text style={styles.radioLabel}>Quy định hành chính</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.radioItem} activeOpacity={0.7}>
                    <View style={styles.customRadio} />
                    <Text style={styles.radioLabel}>Hành vi hành chính</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Nội dung<Text style={{ color: '#FB2C36' }}>*</Text></Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Nhập nội dung phản ánh kiến nghị..."
                  placeholderTextColor={colors.textTertiary}
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                />
                <Text style={styles.hintText}>* Vui lòng không ghi thông tin cá nhân nhạy cảm</Text>
              </View>
            </View>
          )}
        </View>

        {/* Step 4: Attachments */}
        <View style={[styles.collapseCard, { marginBottom: 40 }]}>
          <TouchableOpacity 
            style={styles.collapseHeader}
            onPress={() => toggleSection('attachments')}
          >
            <View style={styles.collapseHeaderLeft}>
              <View style={styles.circleIcon}>
                <Feather name="paperclip" size={14} color={colors.primary} />
              </View>
              <Text style={styles.collapseTitle}>Tài liệu đính kèm</Text>
            </View>
            <Ionicons 
              name={sections.attachments ? "chevron-up" : "chevron-down"} 
              size={18} 
              color={colors.textTertiary} 
            />
          </TouchableOpacity>
          
          {sections.attachments && (
            <View style={styles.collapseContent}>
              <TouchableOpacity style={styles.uploadContainer} activeOpacity={0.7}>
                <View style={styles.uploadButtonFull}>
                  <Feather name="upload" size={16} color="#364153" style={{ marginRight: 8 }} />
                  <Text style={styles.uploadButtonFullText}>Tải tệp lên</Text>
                </View>
                <Text style={styles.uploadSubHint}>
                  Chấp nhận: PDF, DOC, DOCX, JPG, PNG.{"\n"}Tối đa 10MB mỗi file
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Footer Actions */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.draftButton}>
          <Text style={styles.draftButtonText}>Lưu nháp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton}>
          <Ionicons name="send" size={14} color="white" style={{ marginRight: 8 }} />
          <Text style={styles.submitButtonText}>Gửi phản ánh</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F7',
  },
  header: {
    backgroundColor: colors.primary,
    paddingBottom: spacing.sm,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    height: 56,
    gap: 12,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.semiBold,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContainer: {
    padding: spacing.md,
  },
  sectionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.semiBold,
    letterSpacing: 1,
    marginBottom: 12,
  },
  targetTypeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  targetTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    padding: 12,
    marginHorizontal: 4,
  },
  activeTargetButton: {
    backgroundColor: '#FEF2F2',
    borderColor: colors.primary,
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#D1D5DC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  activeRadio: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  targetIconRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  targetTypeText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.medium,
    marginTop: 2,
  },
  activeTargetText: {
    color: colors.primary,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.semiBold,
  },
  collapseCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    overflow: 'hidden',
  },
  collapseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  collapseHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(139, 26, 26, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  collapseTitle: {
    fontSize: 13,
    color: '#1E2939',
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.semiBold,
  },
  requiredBadge: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  requiredText: {
    fontSize: 9,
    color: '#FB2C36',
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.medium,
  },
  collapseContent: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#F9FAFB',
  },
  formField: {
    marginTop: 12,
  },
  fieldLabel: {
    fontSize: 11,
    color: '#4A5565',
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.medium,
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 44,
  },
  input: {
    flex: 1,
    fontSize: 12,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.regular,
  },
  textArea: {
    height: 120,
    paddingTop: 12,
  },
  hintText: {
    fontSize: 10,
    color: colors.textTertiary,
    marginTop: 6,
    fontStyle: 'italic',
  },
  rowFields: {
    flexDirection: 'row',
  },
  uploadContainer: {
    alignItems: 'center',
    marginTop: 12,
  },
  uploadButtonFull: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: 'white',
  },
  uploadButtonFullText: {
    fontSize: 13,
    color: '#1E2939',
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.medium,
  },
  uploadSubHint: {
    fontSize: 10,
    color: colors.textTertiary,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 14,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    paddingVertical: 8,
  },
  customRadio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#D1D5DC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  activeCustomRadio: {
    borderColor: colors.primary,
  },
  customRadioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  radioLabel: {
    fontSize: 11,
    color: '#4A5565',
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.medium,
  },
  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  flagPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingHorizontal: 8,
    height: 44,
    marginRight: 8,
  },
  flagIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  countryCode: {
    fontSize: 11,
    color: colors.textPrimary,
    marginRight: 4,
    fontFamily: typography.fontFamily,
  },
  phoneInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 44,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    elevation: 10,
  },
  draftButton: {
    flex: 1,
    height: 48,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  draftButtonText: {
    color: colors.primary,
    fontSize: 13,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.semiBold,
  },
  submitButton: {
    flex: 2,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 13,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.semiBold,
  },
});
