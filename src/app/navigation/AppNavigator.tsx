import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { navigationRef, replace } from '../../core/utils/NavigationUtils';
import RootLayout from '../_layout';
import BottomTabs from './BottomTabs';
import LoginScreen from '../module/auth/presentation/login_screen';

export type RootStackParamList = {
  Splash: undefined;
  LoginScreen: undefined;
  MainTabs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function SplashScreenWrapper() {
  useEffect(() => {
    const timer = setTimeout(() => {
      // replace('LoginScreen');
      replace('MainTabs');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return <RootLayout />;
}

export default function AppNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreenWrapper} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={BottomTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
