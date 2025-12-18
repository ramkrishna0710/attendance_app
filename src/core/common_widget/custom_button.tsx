import React, { FC } from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  ViewStyle,
  DimensionValue,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';

import { useTheme } from '../theme/ThemeContext';
import Icon from './Icon';
import CustomText from './custom_text';

type IconFamily =
  | 'Ionicons'
  | 'MaterialIcons'
  | 'MaterialCommunityIcons';

interface CommonButtonProps {
  btnText: string;
  btnTextSize?: number;
  onPress?: () => void;

  height?: number;
  width?: DimensionValue;
  borderRadius?: number;

  bgColor?: string;
  borderColor?: string;
  textColor?: string;

  suffixIconName?: string;
  suffixIconFamily?: IconFamily;
  suffixIconColor?: string;
  suffixIconSize?: number;

  iconName?: string;
  iconFamily?: IconFamily;
  iconColor?: string;

  gradientColors?: readonly [string, string, ...string[]];
}

const CommonButton: FC<CommonButtonProps> = ({
  btnText,
  btnTextSize = RFValue(14),
  onPress,

  height = 48,
  width = '100%',
  borderRadius = 12,

  bgColor,
  borderColor,
  textColor,

  suffixIconName,
  suffixIconFamily = 'MaterialCommunityIcons',
  suffixIconColor,
  suffixIconSize = RFValue(16),

  iconName,
  iconFamily = 'MaterialIcons',
  iconColor,

  gradientColors,
}) => {
  const { colors } = useTheme();

  const showGradient = gradientColors || !bgColor;

  const defaultGradient: readonly [string, string, string, string] = [
    `${colors.primary}B3`,
    `${colors.primary}E6`,
    `${colors.primary}F2`,
    colors.primary,
  ];

  const contentColor = textColor ?? colors.background;

  const leftIconVisible = Boolean(suffixIconName);
  const rightIconVisible = Boolean(iconName);

  const ButtonContent = () => (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: 'rgba(255,255,255,0.15)' }}
      style={styles.pressable}
    >
      <View style={styles.row}>
        {leftIconVisible && (
          <>
            <Icon
              iconFamily={suffixIconFamily}
              name={suffixIconName!}
              size={suffixIconSize}
              color={suffixIconColor ?? contentColor}
            />
            <View style={styles.space} />
          </>
        )}

        <CustomText
          color={contentColor}
          varient="h3"
          fontFamily="Okra-Bold"
          fontSize={btnTextSize}
          style={{ fontWeight: 'bold' }}
        >
          {btnText}
        </CustomText>

        {rightIconVisible && (
          <>
            <View style={styles.space} />
            <Icon
              iconFamily={iconFamily}
              name={iconName!}
              size={RFValue(20)}
              color={iconColor ?? contentColor}
            />
          </>
        )}
      </View>
    </Pressable>
  );

  return (
    <View style={styles.wrapper}>
      {showGradient ? (
        <LinearGradient
          colors={gradientColors ?? defaultGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[
            styles.container,
            {
              height,
              width,
              borderRadius,
              borderColor: borderColor ?? 'transparent',
            },
          ]}
        >
          <ButtonContent />
        </LinearGradient>
      ) : (
        <View
          style={[
            styles.container,
            {
              height,
              width,
              borderRadius,
              backgroundColor: bgColor ?? colors.primary,
              borderColor: borderColor ?? 'transparent',
            },
          ]}
        >
          <ButtonContent />
        </View>
      )}
    </View>
  );
};

export default CommonButton;

const styles = StyleSheet.create<{
  wrapper: ViewStyle;
  container: ViewStyle;
  pressable: ViewStyle;
  row: ViewStyle;
  space: ViewStyle;
}>({
  wrapper: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  container: {
    borderWidth: 1.4,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  pressable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  space: {
    width: 13,
  },
});
