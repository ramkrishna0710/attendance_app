import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useTheme } from '../../../core/theme/ThemeContext';
import TodaysScheduleWidget from '../home/presentation/widget/todays_scedule_widget';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootTabParamList } from '../../navigation/BottomTabs';
import CustomSafeAreaView from '../../../core/common_widget/custom_safe_area_view';

const TodaySceduleScreen = () => {
  const { colors } = useTheme();
  const route = useRoute<RouteProp<RootTabParamList, 'Scedule'>>();

  return (
    <CustomSafeAreaView>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={{ paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      >
        <TodaysScheduleWidget
          isAll={true}

        />
      </ScrollView>
    </CustomSafeAreaView>
  );
};

export default TodaySceduleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});