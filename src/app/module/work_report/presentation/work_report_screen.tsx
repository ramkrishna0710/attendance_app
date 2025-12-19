import React from 'react';
import CustomSafeAreaView from '../../../../core/common_widget/custom_safe_area_view';
import AppBar from '../../../../core/common_widget/app_bar';
import { ScrollView, StyleSheet } from 'react-native';
import WeeklyCalender from './widget/weekly_calender';
import WeeklyScedule from './widget/weekday_scedule';
import Spacer from '../../../../core/common_widget/spacer';
import TeamPreview from './widget/team_preview';

const WorkReportScreen = () => {


  return (
    <CustomSafeAreaView style={styles.container}>
      <AppBar />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150 }}
      >

        <WeeklyCalender />

        <Spacer h={12} />

        <WeeklyScedule />
      </ScrollView>
    </CustomSafeAreaView>
  );
};

export default React.memo(WorkReportScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});