import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TextInput,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { Input } from '../../components/shared';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export const VNeIDLoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const [identityId, setIdentityId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [timer, setTimer] = useState(298); // 4:58
  const passwordRef = useRef<TextInput>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const handleLogin = () => {
    if (identityId === 'admin') {
      // @ts-ignore
      navigation.navigate('MainApp');
    } else {
      console.log('VNeID Login:', identityId);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView bounces={false} contentContainerStyle={styles.scrollContent}>
          {/* Custom VNeID Banner */}
          <View style={[styles.bannerContainer, { height: width * 0.75 }]}>
            <LinearGradient
              colors={['#A50D25', '#C8102E']}
              style={styles.bannerGradient}
            >
              <SafeAreaView style={styles.safeArea}>
                <TouchableOpacity 
                  style={styles.backButton} 
                  onPress={() => navigation.goBack()}
                >
                  <Feather name="chevron-left" size={28} color={colors.surface} />
                </TouchableOpacity>

                <View style={styles.emblemSection}>
                  <View style={styles.emblemInner}>
                    <Image 
                      source={{ uri: 'https://vneid.gov.vn/static/media/logo_vneid.b037042a.png' }} 
                      style={styles.vneidLogo}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={styles.govTitle}>BỘ CÔNG AN</Text>
                  <Text style={styles.govSubtitle}>Trung tâm dữ liệu Quốc gia về dân cư</Text>
                </View>
              </SafeAreaView>
            </LinearGradient>
          </View>

          {/* Login Card */}
          <View style={styles.mainCard}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>Đăng nhập VNeID</Text>
              <View style={styles.titleUnderline} />
            </View>

            {/* Manual Form */}
            <View style={styles.form}>
              <Input
                placeholder="Số định danh cá nhân"
                value={identityId}
                onChangeText={setIdentityId}
                leftIcon={<Feather name="user" size={18} color={colors.textTertiary} />}
                variant="outline"
                style={styles.input}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
                autoCapitalize="none"
              />
              <Input
                ref={passwordRef}
                placeholder="Mật khẩu"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                leftIcon={<Feather name="lock" size={18} color={colors.textTertiary} />}
                variant="outline"
                returnKeyType="go"
                onSubmitEditing={handleLogin}
                rightIcon={
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Feather 
                      name={showPassword ? "eye-off" : "eye"} 
                      size={18} 
                      color={colors.textTertiary} 
                    />
                  </TouchableOpacity>
                }
                style={styles.input}
              />
              
            <TouchableOpacity 
              style={styles.loginBtn} 
              activeOpacity={0.8}
              onPress={handleLogin}
            >
              <Text style={styles.loginBtnText}>Đăng nhập</Text>
            </TouchableOpacity>

              <TouchableOpacity style={styles.helpLink}>
                <Text style={styles.helpLinkText}>
                  Trường hợp không đăng nhập được, vui lòng <Text style={styles.helpLinkHighlight}>xem hướng dẫn</Text>
                </Text>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Hoặc</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* QR Code Section */}
            <View style={styles.qrSection}>
              <View style={styles.qrWrapper}>
                <View style={styles.qrPlaceholder}>
                  {/* Real VNeID designs have a QR code here */}
                  <MaterialCommunityIcons name="qrcode-scan" size={120} color="#111" />
                  {timer === 0 && (
                    <View style={styles.qrOverlay}>
                      <TouchableOpacity style={styles.refreshBtn}>
                        <Feather name="refresh-cw" size={24} color={colors.surface} />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
              
              <View style={styles.timerRow}>
                <View style={styles.timerDot} />
                <Text style={styles.timerText}>Mã hết hạn sau <Text style={styles.timerBold}>{formatTime(timer)}</Text></Text>
              </View>

              <Text style={styles.qrInstruction}>
                Hoặc quét mã QR bằng ứng dụng <Text style={styles.vneidText}>VNeID</Text> để đăng nhập.
              </Text>

              <TouchableOpacity style={styles.downloadLink}>
                <Text style={styles.downloadLinkText}>
                  Chưa có ứng dụng? <Text style={styles.downloadLinkHighlight}>Tải VNeID →</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  bannerContainer: {
    width: '100%',
  },
  bannerGradient: {
    flex: 1,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  safeArea: {
    flex: 1,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 10,
  },
  emblemSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingBottom: 40,
  },
  emblemInner: {
    width: 120,
    height: 120,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vneidLogo: {
    width: '100%',
    height: '100%',
  },
  govTitle: {
    fontSize: 20,
    fontWeight: typography.fontWeight.semiBold,
    color: '#FFD700',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  govSubtitle: {
    fontSize: 12,
    color: colors.surface,
    opacity: 0.9,
    textAlign: 'center',
  },
  mainCard: {
    backgroundColor: colors.surface,
    marginTop: -40,
    marginHorizontal: 16,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  titleSection: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },
  titleUnderline: {
    width: 40,
    height: 3,
    backgroundColor: '#C8102E',
    marginTop: 6,
    borderRadius: 2,
  },
  form: {
    gap: 16,
  },
  input: {
    height: 52,
    borderRadius: 12,
  },
  loginBtn: {
    height: 52,
    backgroundColor: '#C8102E',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    shadowColor: '#C8102E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  loginBtnText: {
    fontSize: 16,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.surface,
  },
  helpLink: {
    marginTop: 4,
    alignItems: 'center',
  },
  helpLinkText: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  helpLinkHighlight: {
    color: '#C8102E',
    fontWeight: typography.fontWeight.medium,
    textDecorationLine: 'underline',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.borderLight,
  },
  dividerText: {
    fontSize: 12,
    color: colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  qrSection: {
    alignItems: 'center',
  },
  qrWrapper: {
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: 16,
  },
  qrPlaceholder: {
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  qrOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  refreshBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#C8102E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  timerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  timerText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  timerBold: {
    fontWeight: typography.fontWeight.semiBold,
    color: '#10B981',
  },
  qrInstruction: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  vneidText: {
    fontWeight: typography.fontWeight.semiBold,
    color: '#C8102E',
  },
  downloadLink: {
    paddingVertical: 10,
  },
  downloadLinkText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  downloadLinkHighlight: {
    fontWeight: typography.fontWeight.semiBold,
    color: '#D1122E',
  },
});
