import { View, ViewStyle, StyleSheet } from 'react-native';
import React, { FC, ReactNode } from 'react';
import { useTheme } from '../theme/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

interface CustomSafeAreaViewProps {
  children: ReactNode;
  style?: ViewStyle;
  padding?: number;
}

const CustomSafeAreaView: FC<CustomSafeAreaViewProps> = ({
  children,
  style,
  padding = 20,
}) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background, padding },
        style,
      ]}
    >
      <StatusBar style="auto" />
      <SafeAreaView />
      {children}
    </View>
  );
};

export default CustomSafeAreaView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});