/**
 * App Navigator — Drawer + Stack Navigator
 * Root is RootStack containing Auth screens and MainDrawer.
 */

import React from 'react';
import { useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Screens
import { HomeScreen } from '../screens/Home/HomeScreen';
import { MainDrawer } from '../components/navigation/MainDrawer';
import { PlaceholderScreen } from '../screens/PlaceholderScreen';
import { IZListScreen } from '../screens/IndustrialZone/IZListScreen';
import { IZDetailScreen } from '../screens/IndustrialZone/IZDetailScreen';
import { AppointmentListScreen } from '../screens/Appointment/AppointmentListScreen';
import { DossierListScreen } from '../screens/Dossier/DossierListScreen';
import AreaListScreen from '../screens/InvestmentArea/AreaListScreen';
import AreaDetailScreen from '../screens/InvestmentArea/AreaDetailScreen';
import SectorListScreen from '../screens/InvestmentSector/SectorListScreen';
import SectorNewsScreen from '../screens/InvestmentSector/SectorNewsScreen';
import SectorNewsDetailScreen from '../screens/InvestmentSector/SectorNewsDetailScreen';
import PolicyNewsScreen from '../screens/InvestmentPolicy/PolicyNewsScreen';
import PolicyDetailScreen from '../screens/InvestmentPolicy/PolicyDetailScreen';
import InvestmentNewsScreen from '../screens/InvestmentNews/InvestmentNewsScreen';
import InvestmentNewsDetailScreen from '../screens/InvestmentNews/InvestmentNewsDetailScreen';
import PublicServiceNewsScreen from '../screens/PublicServiceNews/PublicServiceNewsScreen';
import PublicServiceNewsDetailScreen from '../screens/PublicServiceNews/PublicServiceNewsDetailScreen';
import SuccessStoryScreen from '../screens/SuccessStoryNews/SuccessStoryScreen';
import SuccessStoryDetailScreen from '../screens/SuccessStoryNews/SuccessStoryDetailScreen';
import LegalDocumentListScreen from '../screens/LegalDocument/LegalDocumentListScreen';
import LegalDocumentDetailScreen from '../screens/LegalDocument/LegalDocumentDetailScreen';
import ProcedureListScreen from '../screens/Procedure/ProcedureListScreen';
import ComplaintListScreen from '../screens/Complaints/ComplaintListScreen';
import CreateComplaintScreen from '../screens/Complaints/CreateComplaintScreen';
import ComplaintDetailScreen from '../screens/Complaints/ComplaintDetailScreen';
import DossierDetailScreen from '../screens/Dossier/DossierDetailScreen';
import HelpGuideScreen from '../screens/Help/HelpGuideScreen';
import HelpDetailScreen from '../screens/Help/HelpDetailScreen';
import FAQHomeScreen from '../screens/FAQ/FAQHomeScreen';
import FAQCategoryScreen from '../screens/FAQ/FAQCategoryScreen';
import { ContactScreen } from '../screens/Contact/ContactScreen';
import { AboutScreen } from '../screens/About/AboutScreen';
import PersonalAccountScreen from '../screens/Account/PersonalAccountScreen';
import EditPersonalAccountScreen from '../screens/Account/EditPersonalAccountScreen';
import BusinessAccountScreen from '../screens/Account/BusinessAccountScreen';
import EditBusinessAccountScreen from '../screens/Account/EditBusinessAccountScreen';
import ChangePasswordScreen from '../screens/Account/ChangePasswordScreen';
import AccountSettingsScreen from '../screens/Account/AccountSettingsScreen';
import { LoginMethodScreen } from '../screens/Auth/LoginMethodScreen';
import { IdentityLoginScreen } from '../screens/Auth/IdentityLoginScreen';
import { VNeIDLoginScreen } from '../screens/Auth/VNeIDLoginScreen';
import { RegisterTypeScreen } from '../screens/Auth/RegisterTypeScreen';
import { RegisterFormScreen } from '../screens/Auth/RegisterFormScreen';
import { ForgotPasswordScreen } from '../screens/Auth/ForgotPasswordScreen';
import { ResetPasswordScreen } from '../screens/Auth/ResetPasswordScreen';

// Theme & Data
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { ZoneType, ZONE_CONFIG } from '../data/zoneTypes';

export type RootStackParamList = {
  // Auth
  LoginMethod: undefined;
  IdentityLogin: undefined;
  VNeIDLogin: undefined;
  RegisterType: undefined;
  RegisterForm: { type: 'VN_INDIVIDUAL' | 'BUSINESS' | 'FOREIGN_INDIVIDUAL' };
  ForgotPassword: undefined;
  ResetPassword: undefined;

  // Main
  MainApp: undefined;
  Home: undefined;
  IZList: { zoneType: ZoneType };
  IZDetail: { id: string; zoneType: ZoneType };
  AppointmentList: undefined;
  DossierList: undefined;
  DossierDetail: { id: string };
  AreaList: undefined;
  AreaDetail: undefined;
  SectorList: undefined;
  SectorNews: undefined;
  SectorNewsDetail: undefined;
  PolicyNews: undefined;
  PolicyDetail: undefined;
  InvestmentNews: undefined;
  InvestmentNewsDetail: undefined;
  PublicServiceNews: undefined;
  PublicServiceNewsDetail: undefined;
  SuccessStory: undefined;
  SuccessStoryDetail: undefined;
  LegalDocumentList: undefined;
  LegalDocumentDetail: undefined;
  Contact: undefined;
  About: undefined;
  ProcedureList: undefined;
  ComplaintList: undefined;
  CreateComplaint: undefined;
  ComplaintDetail: { id: string };
  HelpGuide: undefined;
  HelpDetail: { guideId: string; title: string };
  FAQHome: undefined;
  FAQCategory: { categoryId: string; categoryName: string };
  PersonalAccount: undefined;
  EditPersonalAccount: undefined;
  BusinessAccount: undefined;
  EditBusinessAccount: undefined;
  ChangePassword: undefined;
  AccountSettings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.surface,
        headerTitleStyle: {
          fontWeight: typography.fontWeight.semiBold,
          fontSize: typography.fontSize.lg,
        },
        headerBackButtonDisplayMode: 'minimal',
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="IZList"
        component={IZListScreen}
        options={({ route }) => ({
          title: ZONE_CONFIG[route.params.zoneType].listTitle,
        })}
      />
      <Stack.Screen
        name="IZDetail"
        component={IZDetailScreen}
        options={({ route }) => ({
          title: ZONE_CONFIG[route.params.zoneType].detailTitle,
        })}
      />
      <Stack.Screen
        name="AppointmentList"
        component={AppointmentListScreen}
        options={{ title: 'Quản lý đặt lịch' }}
      />
      <Stack.Screen
        name="DossierList"
        component={DossierListScreen}
        options={{ title: 'Quản lý hồ sơ', headerShown: false }}
      />
      <Stack.Screen
        name="DossierDetail"
        component={DossierDetailScreen}
        options={{ title: 'Chi tiết hồ sơ', headerShown: false }}
      />
      <Stack.Screen
        name="AreaList"
        component={AreaListScreen}
        options={{ title: 'Khu vực đầu tư', headerShown: false }}
      />
      <Stack.Screen
        name="AreaDetail"
        component={AreaDetailScreen}
        options={{ title: 'Chi tiết khu vực', headerShown: false }}
      />
      <Stack.Screen
        name="SectorList"
        component={SectorListScreen}
        options={{ title: 'Lĩnh vực đầu tư', headerShown: false }}
      />
      <Stack.Screen
        name="SectorNews"
        component={SectorNewsScreen}
        options={{ title: 'Bản tin lĩnh vực', headerShown: false }}
      />
      <Stack.Screen
        name="SectorNewsDetail"
        component={SectorNewsDetailScreen}
        options={{ title: 'Chi tiết bản tin lĩnh vực', headerShown: false }}
      />
      <Stack.Screen
        name="PolicyNews"
        component={PolicyNewsScreen}
        options={{ title: 'Chính sách đầu tư', headerShown: false }}
      />
      <Stack.Screen
        name="PolicyDetail"
        component={PolicyDetailScreen}
        options={{ title: 'Chi tiết chính sách', headerShown: false }}
      />
      <Stack.Screen
        name="InvestmentNews"
        component={InvestmentNewsScreen}
        options={{ title: 'Tin tức đầu tư', headerShown: false }}
      />
      <Stack.Screen
        name="InvestmentNewsDetail"
        component={InvestmentNewsDetailScreen}
        options={{ title: 'Chi tiết tin tức đầu tư', headerShown: false }}
      />
      <Stack.Screen
        name="PublicServiceNews"
        component={PublicServiceNewsScreen}
        options={{ title: 'Tin tức dịch vụ công', headerShown: false }}
      />
      <Stack.Screen
        name="PublicServiceNewsDetail"
        component={PublicServiceNewsDetailScreen}
        options={{ title: 'Chi tiết DVC', headerShown: false }}
      />
      <Stack.Screen
        name="SuccessStory"
        component={SuccessStoryScreen}
        options={{ title: 'Câu chuyện thành công', headerShown: false }}
      />
      <Stack.Screen
        name="SuccessStoryDetail"
        component={SuccessStoryDetailScreen}
        options={{ title: 'Chi tiết câu chuyện thành công', headerShown: false }}
      />
      <Stack.Screen
        name="LegalDocumentList"
        component={LegalDocumentListScreen}
        options={{ title: 'Văn bản pháp luật', headerShown: false }}
      />
      <Stack.Screen
        name="LegalDocumentDetail"
        component={LegalDocumentDetailScreen}
        options={{ title: 'Chi tiết văn bản', headerShown: false }}
      />
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={{ title: 'Liên hệ', headerShown: false }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{ title: 'Giới thiệu', headerShown: false }}
      />
      <Stack.Screen
        name="ProcedureList"
        component={ProcedureListScreen}
        options={{ title: 'Thủ tục hành chính', headerShown: false }}
      />
      <Stack.Screen
        name="ComplaintList"
        component={ComplaintListScreen}
        options={{ title: 'Danh sách khiếu nại', headerShown: false }}
      />
      <Stack.Screen
        name="CreateComplaint"
        component={CreateComplaintScreen}
        options={{ title: 'Gửi khiếu nại', headerShown: false }}
      />
      <Stack.Screen
        name="ComplaintDetail"
        component={ComplaintDetailScreen}
        options={{ title: 'Chi tiết phản ánh', headerShown: false }}
      />
      <Stack.Screen
        name="HelpGuide"
        component={HelpGuideScreen}
        options={{ title: 'Hướng dẫn sử dụng', headerShown: false }}
      />
      <Stack.Screen
        name="HelpDetail"
        component={HelpDetailScreen}
        options={{ title: 'Chi tiết hướng dẫn', headerShown: false }}
      />
      <Stack.Screen
        name="FAQHome"
        component={FAQHomeScreen}
        options={{ title: 'Hỏi đáp', headerShown: false }}
      />
      <Stack.Screen
        name="FAQCategory"
        component={FAQCategoryScreen}
        options={{ title: 'Chủ đề hỏi đáp', headerShown: false }}
      />
      <Stack.Screen
        name="PersonalAccount"
        component={PersonalAccountScreen}
        options={{ title: 'Tài khoản cá nhân', headerShown: false }}
      />
      <Stack.Screen
        name="EditPersonalAccount"
        component={EditPersonalAccountScreen}
        options={{ title: 'Chỉnh sửa tài khoản', headerShown: false }}
      />
      <Stack.Screen
        name="BusinessAccount"
        component={BusinessAccountScreen}
        options={{ title: 'Quản lý doanh nghiệp', headerShown: false }}
      />
      <Stack.Screen
        name="EditBusinessAccount"
        component={EditBusinessAccountScreen}
        options={{ title: 'Chỉnh sửa doanh nghiệp', headerShown: false }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ title: 'Đổi mật khẩu', headerShown: false }}
      />
      <Stack.Screen
        name="AccountSettings"
        component={AccountSettingsScreen}
        options={{ title: 'Cấu hình tài khoản', headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const AppDrawer: React.FC = () => {
  const { width } = useWindowDimensions();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <MainDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: width * 0.8,
        },
      }}
    >
      <Drawer.Screen name="MainStack" component={MainStack} />
    </Drawer.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="LoginMethod">
        {/* Auth Group */}
        <Stack.Screen name="LoginMethod" component={LoginMethodScreen} />
        <Stack.Screen name="IdentityLogin" component={IdentityLoginScreen} />
        <Stack.Screen name="VNeIDLogin" component={VNeIDLoginScreen} />
        <Stack.Screen name="RegisterType" component={RegisterTypeScreen} />
        <Stack.Screen name="RegisterForm" component={RegisterFormScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        
        {/* Main App Group */}
        <Stack.Screen name="MainApp" component={AppDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
