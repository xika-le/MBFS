import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../theme';
import { Header, Icon, RegisterStepIndicator } from '../../components/shared';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'IdentityLogin'>;

export const RegisterTypeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const accountTypes = [
    {
      id: 'VN_INDIVIDUAL',
      title: 'Cá nhân Việt Nam',
      desc: 'Đăng ký bằng CCCD/Số định danh',
      icon: 'user',
      color: colors.primary,
      bgColor: '#FCECED',
    },
    {
      id: 'BUSINESS',
      title: 'Tổ chức / Doanh nghiệp',
      desc: 'Đăng ký bằng mã số doanh nghiệp',
      icon: 'briefcase',
      color: '#1447e6',
      bgColor: '#eff6ff',
    },
    {
      id: 'FOREIGN_INDIVIDUAL',
      title: 'Cá nhân nước ngoài',
      desc: 'Đăng ký bằng hộ chiếu',
      icon: 'globe',
      color: '#10b981',
      bgColor: '#ecfdf5',
    },
  ];

  const handleSelectType = (typeId: string) => {
    // @ts-ignore
    navigation.navigate('RegisterForm', { type: typeId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title="Đăng ký tài khoản" onBack={() => navigation.goBack()} />
      <RegisterStepIndicator currentStep={1} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.welcomeSection}>
          <Text style={styles.title}>Chọn loại tài khoản</Text>
          <Text style={styles.subtitle}>Chọn loại phù hợp với đối tượng đăng ký của bạn</Text>
        </View>

        <View style={styles.list}>
          {accountTypes.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.7}
              onPress={() => handleSelectType(item.id)}
            >
              <View style={[styles.iconBox, { backgroundColor: item.bgColor }]}>
                <Feather name={item.icon as any} size={24} color={item.color} />
              </View>
              <View style={styles.info}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDesc}>{item.desc}</Text>
              </View>
              <Feather name="chevron-right" size={20} color={colors.textTertiary} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 30,
  },
  welcomeSection: {
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  list: {
    gap: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    marginLeft: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  cardDesc: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});
