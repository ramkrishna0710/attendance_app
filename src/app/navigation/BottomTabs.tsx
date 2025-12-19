import React from 'react';
import { View, TouchableOpacity, StyleSheet, ToastAndroid, BackHandler } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '../../core/common_widget/Icon';
import HomeScreen from '../module/home/presentation/home_screen';
import ProfileScreen from '../module/profile/presentation/profile_screen';
import TodaySceduleScreen from '../module/scedule/today_scedule_screen';
import { useTheme } from '../../core/theme/ThemeContext';
import { BOTTOM_TAB_HEIGHT, rf, screenWidth } from '../../core/utils/size';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CheckInOutScreen from '../module/check_in_out/presentation/check_in_out_screen';
import work_report_screen from '../module/work_report/presentation/work_report_screen';
import { useFocusEffect } from '@react-navigation/native';
import { navigate, navigationRef } from '../../core/utils/NavigationUtils';

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


  useFocusEffect(
    React.useCallback(() => {
      let backPressCount = 0;

      const onBackPress = () => {
        const route = navigationRef.getCurrentRoute();
        const currentTab = route?.name;

        // 🟢 If user is on CheckInOut
        if (currentTab === 'CheckInOut') {
          if (backPressCount === 0) {
            backPressCount++;
            ToastAndroid.show(
              'Press back again to exit',
              ToastAndroid.SHORT
            );

            setTimeout(() => {
              backPressCount = 0;
            }, 2000);

            return true;
          }

          BackHandler.exitApp();
          return true;
        }

        navigate('CheckInOut');
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.addEventListener(
          'hardwareBackPress',
          onBackPress
        );
    }, [])
  );

  const tabs: {
    name: keyof RootTabParamList;
    iconFamily: 'Ionicons' | 'MaterialIcons' | 'MaterialCommunityIcons';
    activeIcon: string;
    inactiveIcon: string;
  }[] = [
      { name: 'Scedule', iconFamily: 'Ionicons', activeIcon: 'list', inactiveIcon: 'list-outline' },
      { name: 'Home', iconFamily: 'MaterialIcons', activeIcon: 'category', inactiveIcon: 'category' },
      { name: 'CheckInOut', iconFamily: 'MaterialIcons', activeIcon: 'touch-app', inactiveIcon: 'touch-app' },
      { name: 'Calender', iconFamily: 'Ionicons', activeIcon: 'calendar', inactiveIcon: 'calendar-outline' },
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
                  width: screenWidth * 0.2,
                  height: screenWidth * 0.2,
                  borderRadius: screenWidth * 0.22 / 2,
                  backgroundColor: colors.primary,
                  borderColor: colors.border,
                  borderWidth: 1,
                  marginTop: -25,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}
            >
              {tab.name === 'CheckInOut' && !focused && (
                <View
                  pointerEvents="none"
                  style={{
                    position: 'absolute',
                    width: '97%',
                    height: '97%',
                    borderRadius: screenWidth * 0.22 / 2,
                    borderWidth: 4.5,
                    borderColor: colors.border,
                  }}
                />
              )}
              <View style={{ transform: [{ scale }] }}>
                <Icon
                  iconFamily={tab.iconFamily}
                  name={focused ? tab.activeIcon : tab.inactiveIcon}
                  size={rf(22)}
                  color={tab.name === 'CheckInOut' ? colors.background : color}
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
      initialRouteName="CheckInOut"
      backBehavior="initialRoute"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Scedule" options={{ animation: 'shift' }} component={TodaySceduleScreen} />
      <Tab.Screen name="Home" options={{ animation: 'shift' }} component={HomeScreen} />
      <Tab.Screen name="CheckInOut" options={{ animation: 'shift' }} component={CheckInOutScreen} />
      <Tab.Screen name="Calender" options={{ animation: 'shift' }} component={work_report_screen} />
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
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 4,
  },
});