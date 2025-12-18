import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '../../core/common_widget/Icon';
import HomeScreen from '../module/home/presentation/home_screen';
import ProfileScreen from '../module/profile/presentation/profile_screen';
import WorkReportScreen from '../module/calender/work_report_screen';
import CheckInOutScreen from '../module/check_in_out/check_in_out_screen';
import TodaySceduleScreen from '../module/scedule/today_scedule_screen';
import { useTheme } from '../../core/theme/ThemeContext';
import { BOTTOM_TAB_HEIGHT, rf } from '../../core/utils/size';

export type RootTabParamList = {
  Home: undefined;
  CheckInOut: undefined;
  Calender: undefined;
  Scedule: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabs() {
  const { colors } = useTheme();

  const tabs: { name: string; iconFamily: 'Ionicons' | 'MaterialIcons' | 'MaterialCommunityIcons'; activeIcon?: string; inactiveIcon?: string }[] = [
    { name: 'Home', iconFamily: 'Ionicons', activeIcon: 'home', inactiveIcon: 'home-outline' },
    { name: 'Calender', iconFamily: 'Ionicons', activeIcon: 'calendar', inactiveIcon: 'calendar-outline' },
    { name: 'CheckInOut', iconFamily: 'MaterialIcons', activeIcon: 'touch-app', inactiveIcon: 'touch-app' }, // center
    { name: 'Scedule', iconFamily: 'Ionicons', activeIcon: 'list', inactiveIcon: 'list-outline' },
    { name: 'Profile', iconFamily: 'MaterialIcons', activeIcon: 'person', inactiveIcon: 'person-outline' },
  ];

  const CustomTabBar = ({ state, navigation }: any) => {
    return (
      <View style={[styles.tabBar, { backgroundColor: colors.background, height: BOTTOM_TAB_HEIGHT }]}>
        {tabs.map((tab, index) => {
          const focused = state.index === index;
          const scale = tab.name === 'CheckInOut' ? 1.2 : 0.6; // bigger center icon
          const color = focused ? colors.active : colors.lightText;

          return (
            <TouchableOpacity
              key={tab.name}
              onPress={() => navigation.navigate(tab.name)}
              style={styles.tabButton}
              activeOpacity={0.8}
            >
              <Icon
                iconFamily={tab.iconFamily}
                name={focused ? tab.activeIcon : tab.inactiveIcon}
                size={tab.name === 'CheckInOut' ? rf(22) : rf(18)}
                color={color}
                style={{ transform: [{ scale }] }}
              />
              {focused && tab.name !== 'CheckInOut' && (
                <View style={[styles.dot, { backgroundColor: colors.active }]} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Calender" component={WorkReportScreen} />
      <Tab.Screen name="CheckInOut" component={CheckInOutScreen} />
      <Tab.Screen name="Scedule" component={TodaySceduleScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopColor: 'transparent',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 4,
  },
});