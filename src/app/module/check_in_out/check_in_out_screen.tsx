import { ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '../../../core/theme/ThemeContext';
import CustomSafeAreaView from '../../../core/common_widget/custom_safe_area_view';
import AppBar from '../home/presentation/widget/app_bar';
import Spacer from '../../../core/common_widget/spacer';
import TodaysPlanWidget from '../home/presentation/widget/todays_plan_widget';
import CustomText from '../../../core/common_widget/custom_text';
import { rf } from '../../../core/utils/size';
import TodaysScheduleWidget from '../home/presentation/widget/todays_scedule_widget';
import { navigate } from '../../../core/utils/NavigationUtils';

const CheckInOutScreen = () => {
  const { colors } = useTheme();

  return (
    <CustomSafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }} >
        <AppBar isNotifications={true} />

        <Spacer h={20} />

        <TodaysPlanWidget />

        <Spacer h={12} />

        <CustomText fontSize={rf(14)} style={{ fontWeight: '900' }} color={colors.active} >
          Today&apos;s Scedule
        </CustomText>

        <Spacer h={8} />

        <TodaysScheduleWidget onViewMore={() => {
          navigate('Scedule', { isAll: true });
        }} />
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default CheckInOutScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})