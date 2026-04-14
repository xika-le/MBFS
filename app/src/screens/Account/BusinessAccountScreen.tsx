import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { colors, spacing, typography } from '../../theme';
import { Header } from '../../components/shared';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'BusinessAccount'>;

const InfoRow = ({ label, value }: { label: string, value?: string }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value || '--'}</Text>
  </View>
);

const BusinessAccountScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <Header
        title="Quản lý doanh nghiệp"
        onBack={() => navigation.goBack()}
        rightAction={
          <TouchableOpacity onPress={() => navigation.navigate('EditBusinessAccount')} style={styles.editButton}>
            <MaterialCommunityIcons name="pencil-outline" size={20} color="#fff" />
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* THÔNG TIN CÔNG TY */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Thông tin công ty</Text>
          </View>
          
          <View style={styles.sectionContent}>
            <InfoRow label="Tên doanh nghiệp" value="Công ty TNHH Đầu tư Phát triển ABC" />
            <InfoRow label="Mã số thuế" value="0123456789" />
            <InfoRow label="Loại hình doanh nghiệp" value="Công ty TNHH" />
            <InfoRow label="Ngành nghề chính" value="Công nghệ thông tin" />
            <InfoRow label="Website" value="https://abc-company.vn" />
          </View>
        </View>

        {/* NGƯỜI ĐẠI DIỆN */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Người đại diện</Text>
          </View>
          
          <View style={styles.sectionContent}>
            <InfoRow label="Người đại diện" value="Nguyễn Văn A" />
            <InfoRow label="Chức vụ" value="Giám đốc" />
            <InfoRow label="Email" value="nguyen.vana@abc-company.vn" />
            <InfoRow label="Số điện thoại" value="+84 901 234 567" />
          </View>
        </View>

        {/* ĐỊA CHỈ */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Địa chỉ</Text>
          </View>
          
          <View style={styles.sectionContent}>
            <InfoRow label="Quốc gia" value="Việt Nam" />
            <InfoRow label="Tỉnh/Thành phố" value="TP. Hồ Chí Minh" />
            <InfoRow label="Phường/Xã" value="Gò Vấp" />
            <InfoRow label="Địa chỉ" value="45 Lê Lợi, Quận 1" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // #f9fafb
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  editButton: {
    padding: spacing.xs,
  },
  sectionContainer: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight, // rgba(0,0,0,0.1) matches Figma
    marginBottom: spacing.xs,
  },
  sectionHeader: {
    height: 54,
    justifyContent: 'center',
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
    gap: spacing.lg, // using gap to separate rows
  },
  infoRow: {
    flexDirection: 'column',
    gap: 8,
  },
  infoLabel: {
    fontSize: typography.fontSize.md, // 14px
    fontWeight: typography.fontWeight.medium,
    color: '#4a5565',
  },
  infoValue: {
    fontSize: typography.fontSize.lg, // 16px
    fontWeight: typography.fontWeight.medium,
    color: '#0a0a0a',
  },
});

export default BusinessAccountScreen;
