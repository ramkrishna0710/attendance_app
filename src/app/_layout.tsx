import { View } from 'react-native';
import CustomText from '../core/common_widget/custom_text';
import { useTheme } from '../core/theme/ThemeContext';

export default function RootLayout() {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
      <CustomText varient="h2" fontFamily="Okra-ExtraBold">
        This uses Okra Bold
      </CustomText>
      <CustomText varient="h2" fontFamily="Okra-Bold" color={colors.primary}>
        This uses Okra Bold
      </CustomText>
    </View>
  );
}
