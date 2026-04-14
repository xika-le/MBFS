import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { colors, spacing, typography } from '../../theme';
import { Header } from '../../components/shared';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'AccountSettings'>;

const AccountSettingsScreen = ({ navigation }: Props) => {
  const [systemNotification, setSystemNotification] = useState(true);
  const [resultNotification, setResultNotification] = useState(true);
  const [faceIdLogin, setFaceIdLogin] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <Header title="Cấu hình tài khoản" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* CÀI ĐẶT THÔNG BÁO */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Cài đặt thông báo</Text>
          </View>

          <View style={styles.sectionContent}>
            {/* Nhận thông báo đẩy */}
            <TouchableOpacity style={styles.row}>
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>Nhận thông báo</Text>
                <Text style={styles.rowSubtitle}>Nhận thông báo đẩy trên thiết bị</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textSecondary} />
            </TouchableOpacity>

            {/* Nhận thông báo hệ thống */}
            <View style={styles.row}>
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>Nhận thông báo hệ thống</Text>
                <Text style={styles.rowSubtitle}>Thông báo chung được phát hành từ hệ thống</Text>
              </View>
              <Switch
                value={systemNotification}
                onValueChange={setSystemNotification}
                trackColor={{ false: '#cbced4', true: '#030213' }}
                thumbColor="#ffffff"
              />
            </View>

            {/* Nhận thông báo kết quả xử lý */}
            <View style={styles.row}>
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>Nhận thông báo kết quả xử lý hồ sơ</Text>
                <Text style={styles.rowSubtitle}>Thông báo khi có kết quả xử lý hồ sơ được phát hành từ hệ thống</Text>
              </View>
              <Switch
                value={resultNotification}
                onValueChange={setResultNotification}
                trackColor={{ false: '#cbced4', true: '#030213' }}
                thumbColor="#ffffff"
              />
            </View>

            {/* Warning Box */}
            <View style={styles.warningBox}>
              <Text style={styles.warningText}>
                Khi tắt thông báo đẩy từ hệ thống sẽ không nhận được thông báo ngoài màn hình điện thoại nhưng vẫn có thể xem tại chức năng Thông báo trên ứng dụng Cổng đầu tư Quốc Gia.
              </Text>
            </View>
          </View>
        </View>

        {/* CÀI ĐẶT ĐĂNG NHẬP */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Cài đặt đăng nhập</Text>
          </View>

          <View style={styles.sectionContent}>
            {/* Đăng nhập khuôn mặt */}
            <View style={styles.row}>
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>Đăng nhập bằng khuôn mặt</Text>
              </View>
              <Switch
                value={faceIdLogin}
                onValueChange={setFaceIdLogin}
                trackColor={{ false: '#cbced4', true: '#030213' }}
                thumbColor="#ffffff"
              />
            </View>

            {/* Quản lý thiết bị */}
            <TouchableOpacity style={styles.cardBtn}>
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>Quản lý thiết bị</Text>
                <Text style={styles.rowSubtitle}>Xem và quản lý thiết bị đã đăng nhập</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* ỨNG DỤNG */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Ứng dụng</Text>
          </View>

          <View style={styles.sectionContent}>
            {/* Điều khoản sử dụng */}
            <TouchableOpacity style={styles.cardBtn}>
              <View style={styles.cardIconWrapper}>
                <MaterialCommunityIcons name="file-document-outline" size={20} color={colors.textPrimary} />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>Điều khoản sử dụng</Text>
                <Text style={styles.rowSubtitle}>Quy định và điều khoản dịch vụ</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textSecondary} />
            </TouchableOpacity>

            {/* Chính sách bảo mật */}
            <TouchableOpacity style={styles.cardBtn}>
              <View style={styles.cardIconWrapper}>
                <MaterialCommunityIcons name="shield-outline" size={20} color={colors.textPrimary} />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>Chính sách bảo mật</Text>
                <Text style={styles.rowSubtitle}>Bảo vệ dữ liệu cá nhân</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textSecondary} />
            </TouchableOpacity>

            {/* Phiên bản ứng dụng */}
            <View style={styles.versionRow}>
              <Text style={styles.rowTitle}>Phiên bản ứng dụng</Text>
              <Text style={styles.versionText}>1.0.0</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background, // #f9fafb
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
    gap: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  cardBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background, // #f9fafb
    borderRadius: spacing.borderRadius.md,
    padding: spacing.md,
    gap: spacing.md,
  },
  cardIconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  versionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  rowText: {
    flex: 1,
    gap: 4,
  },
  rowTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },
  rowSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  versionText: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  warningBox: {
    backgroundColor: 'rgba(139, 26, 26, 0.1)',
    borderRadius: spacing.borderRadius.md,
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  warningText: {
    fontSize: typography.fontSize.md,
    color: '#000000',
    lineHeight: 20,
  },
});

export default AccountSettingsScreen;
