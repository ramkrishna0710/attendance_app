import { View, ViewStyle, StyleSheet, SafeAreaView } from 'react-native';
import React, { FC, ReactNode } from 'react';
import { useTheme } from '../theme/ThemeContext';

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