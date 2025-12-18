import { ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import CustomSafeAreaView from '../../../../core/common_widget/custom_safe_area_view'
import AppBar from './widget/app_bar'
import TodaysPlanWidget from './widget/todays_plan_widget'
import Spacer from '../../../../core/common_widget/spacer'
import CustomText from '../../../../core/common_widget/custom_text'
import { rf } from '../../../../core/utils/size'
import { useTheme } from '../../../../core/theme/ThemeContext'
import TodaysSceduleWidget from './widget/todays_scedule_widget'
import { navigate } from '../../../../core/utils/NavigationUtils'

const HomeScreen = () => {
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

        <TodaysSceduleWidget onViewMore={() => {
          navigate('Scedule', { isAll: true });
        }} />
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})