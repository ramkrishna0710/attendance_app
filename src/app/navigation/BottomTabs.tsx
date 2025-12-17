import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '../../core/common_widget/Icon';
import HomeScreen from '../module/home/presentation/home_screen';
import ProfileScreen from '../module/profile/presentation/profile_screen';
import { useTheme } from '../../core/theme/ThemeContext';

export type RootTabParamList = {
  Home: undefined;
  Attendance: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabs() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.lightText,
        tabBarStyle: {
          backgroundColor: colors.tertiary,
          borderTopColor: colors.border,
        },
        tabBarIcon: ({ color, size, focused }) => {
          if (route.name === 'Home') {
            return (
              <Icon
                iconFamily="Ionicons"
                name={focused ? 'home' : 'home-outline'}
                size={size}
                color={color}
              />
            );
          }

          if (route.name === 'Profile') {
            return (
              <Icon
                iconFamily="MaterialIcons"
                name={focused ? 'person' : 'person-outline'}
                size={size}
                color={color}
              />
            );
          }

          return null;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
