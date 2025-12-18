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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

  const tabs: {
    name: keyof RootTabParamList;
    iconFamily: 'Ionicons' | 'MaterialIcons' | 'MaterialCommunityIcons';
    activeIcon: string;
    inactiveIcon: string;
  }[] = [
      { name: 'Home', iconFamily: 'Ionicons', activeIcon: 'home', inactiveIcon: 'home-outline' },
      { name: 'Calender', iconFamily: 'Ionicons', activeIcon: 'calendar', inactiveIcon: 'calendar-outline' },
      { name: 'CheckInOut', iconFamily: 'MaterialIcons', activeIcon: 'touch-app', inactiveIcon: 'touch-app' },
      { name: 'Scedule', iconFamily: 'Ionicons', activeIcon: 'list', inactiveIcon: 'list-outline' },
      { name: 'Profile', iconFamily: 'MaterialIcons', activeIcon: 'person', inactiveIcon: 'person-outline' },
    ];

  const CustomTabBar = ({ state, navigation }: any) => {
    const insets = useSafeAreaInsets();
    return (
      <View style={[styles.tabBar, {
        backgroundColor: colors.background,
        paddingBottom: insets.bottom,
        height: BOTTOM_TAB_HEIGHT + insets.bottom,
      }]}>
        {tabs.map((tab, index) => {
          const focused = state.index === index;
          const scale = tab.name === 'CheckInOut' ? 1.3 : 1.0;
          const color = focused ? colors.active : colors.lightText;

          return (
            <TouchableOpacity
              key={tab.name}
              onPress={() => navigation.navigate(tab.name)}
              activeOpacity={0.8}
              style={[
                styles.tabButton,
                tab.name === 'CheckInOut' && {
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: colors.primary,
                  borderColor: colors.border,
                  borderWidth: 1,
                  marginTop: -20,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}
            >
              <View style={{ transform: [{ scale }] }}>
                <Icon
                  iconFamily={tab.iconFamily}
                  name={focused ? tab.activeIcon : tab.inactiveIcon}
                  size={rf(22)}
                  color={tab.name === 'CheckInOut' ? '#fff' : color}
                />
              </View>

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
      <Tab.Screen name="Home" options={{ animation: 'shift' }} component={HomeScreen} />
      <Tab.Screen name="Calender" options={{ animation: 'shift' }} component={WorkReportScreen} />
      <Tab.Screen name="CheckInOut" options={{ animation: 'shift' }} component={CheckInOutScreen} />
      <Tab.Screen name="Scedule" options={{ animation: 'shift' }} component={TodaySceduleScreen} />
      <Tab.Screen name="Profile" options={{ animation: 'shift' }} component={ProfileScreen} />
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
    width: 8,
    height: 8,
    borderRadius: 3,
    marginTop: 4,
  },
});