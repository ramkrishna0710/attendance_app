import { View } from 'react-native';
import CustomText from '../core/common_widget/custom_text';
import { useTheme } from '../core/theme/ThemeContext';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const { colors } = useTheme();

  const [fontsLoaded] = useFonts({
    'Okra-Regular': require('../../assets/fonts/Okra-Regular.ttf'),
    'Okra-Bold': require('../../assets/fonts/Okra-Bold.ttf'),
    'Okra-ExtraBold': require('../../assets/fonts/Okra-ExtraBold.ttf'),
    'Okra-Medium': require('../../assets/fonts/Okra-Medium.ttf'),
    'Okra-MediumLight': require('../../assets/fonts/Okra-MediumLight.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);


  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
      }}
    >
      <CustomText fontFamily="Okra-Bold" fontSize={20}>
        Hi! RAM HERE.. 
      </CustomText>
    </View>
  );
}
