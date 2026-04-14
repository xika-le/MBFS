import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { colors, spacing, typography } from '../../theme';
import { Header, Badge } from '../../components/shared';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'PersonalAccount'>;

const InfoRow = ({ label, value, isBadge = false, badgeText = '' }: { label: string, value?: string, isBadge?: boolean, badgeText?: string }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    {isBadge ? (
      <Badge label={badgeText} variant="successAlt" style={styles.badge} />
    ) : (
      <Text style={styles.infoValue}>{value || '--'}</Text>
    )}
  </View>
);

const PersonalAccountScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <Header
        title="Tài khoản cá nhân"
        onBack={() => navigation.goBack()}
        rightAction={
          <TouchableOpacity onPress={() => navigation.navigate('EditPersonalAccount')} style={styles.editButton}>
            <MaterialCommunityIcons name="pencil-outline" size={20} color="#fff" />
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* HỒ SƠ SECTION */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Hồ sơ</Text>
          </View>
          
          <View style={styles.sectionContent}>
            <InfoRow label="Họ và tên" value="Lương Ngọc Hân" />
            <InfoRow label="Email" value="luong.ngochan@example.com" />
            <InfoRow label="Số điện thoại" value="+84 912 345 678" />
            <InfoRow label="Loại tài khoản" isBadge badgeText="Cá nhân" />
          </View>
        </View>

        {/* THÔNG TIN SECTION */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Thông tin</Text>
          </View>
          
          <View style={styles.sectionContent}>
            <InfoRow label="Mã định danh" value="001203014525" />
            <InfoRow label="Ngày cấp" value="15/03/2021" />
            <InfoRow label="Nơi cấp" value="Cục Cảnh sát quản lý hành chính về trật tự xã hội" />
            <InfoRow label="Mã số thuế" value="001203014525" />
            <InfoRow label="Quốc gia" value="Việt Nam" />
            <InfoRow label="Tỉnh/Thành phố" value="TP. Hồ Chí Minh" />
            <InfoRow label="Phường/Xã" value="Gò Vấp" />
            <InfoRow label="Địa chỉ" value="123 Nguyễn Huệ" />
            <InfoRow label="Mã bưu chính" value="10000" />
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
  badge: {
    alignSelf: 'flex-start',
  },
});

export default PersonalAccountScreen;
