/**
 * App Navigator — Stack Navigator
 * Features 1.1-1.10: 10 loại khu công nghiệp / kinh tế
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PlaceholderScreen } from '../screens/PlaceholderScreen';
import { IZListScreen } from '../screens/IndustrialZone/IZListScreen';
import { IZDetailScreen } from '../screens/IndustrialZone/IZDetailScreen';
import { AppointmentListScreen } from '../screens/Appointment/AppointmentListScreen';
import { DossierListScreen } from '../screens/Dossier/DossierListScreen';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { ZoneType, ZONE_CONFIG } from '../data/zoneTypes';

export type RootStackParamList = {
  Home: undefined;
  // Features 1.1-1.10: List + Detail cho mỗi loại khu
  IZList: { zoneType: ZoneType };
  IZDetail: { id: string; zoneType: ZoneType };
  // Feature 2.1: Quản lý đặt lịch nộp thủ tục
  AppointmentList: undefined;
  // Feature 2.2: Quản lý hồ sơ
  DossierList: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
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
          component={PlaceholderScreen}
          options={{ title: 'Cổng Đầu Tư Quốc Gia' }}
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
          options={{ title: 'Quản lý hồ sơ' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
