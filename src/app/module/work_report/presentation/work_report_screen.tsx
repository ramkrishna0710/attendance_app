import React from 'react';
import CustomSafeAreaView from '../../../../core/common_widget/custom_safe_area_view';
import AppBar from '../../../../core/common_widget/app_bar';
import { StyleSheet } from 'react-native';
import WeeklyCalender from './widget/weekly_calender';

const WorkReportScreen = () => {


  return (
    <CustomSafeAreaView style={styles.container}>
      <AppBar />

      <WeeklyCalender />
    </CustomSafeAreaView>
  );
};

export default React.memo(WorkReportScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});