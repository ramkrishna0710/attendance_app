import { View, Text, TextStyle, Platform, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from '../theme/ThemeContext';
import { rf } from '../utils/size';

type Varient = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7'
type PlatFormType = "android" | "ios";

interface CustomTextProps {
    varient?: Varient;
    fontFamily?: "Okra-Bold" | "Okra-Regular" | "Okra-ExtraBold" | "Okra-MediumLight" | "Okra-Medium";
    fontSize?: number;
    color?: string;
    style?: TextStyle | TextStyle[];
    children?: React.ReactNode;
    numberOfLines?: number;
    onLayout?: (event: any) => void;
}

const fontSizeMap: Record<Varient, Record<PlatFormType, number>> = {
    h1: {
        android: rf(24),
        ios: rf(22)
    },
    h2: {
        android: 22,
        ios: rf(20)
    },
    h3: {
        android: 20,
        ios: rf(18)
    },
    h4: {
        android: rf(18),
        ios: rf(16)
    },
    h5: {
        android: rf(16),
        ios: rf(14)
    },
    h6: {
        android: rf(12),
        ios: rf(10)
    },
    h7: {
        android: rf(10),
        ios: rf(9)
    }
}

const CustomText: FC<CustomTextProps> = ({
    varient,
    fontFamily = 'Okra-Regular',
    fontSize,
    style,
    color,
    children,
    numberOfLines,
    onLayout,
    ...props
}) => {

    const { colors } = useTheme();
    let computedFontSize: number = Platform.OS === 'android' ? RFValue(fontSize || 12) : RFValue(fontSize || 10);

    if (varient && fontSizeMap[varient]) {
        const defaultsize = fontSizeMap[varient][Platform.OS as PlatFormType]
        computedFontSize = RFValue(fontSize || defaultsize);
    }

    const fontFamilyStyle = {
        fontFamily,
    };

    return (
        <Text
            numberOfLines={numberOfLines !== undefined ? numberOfLines : undefined}
            onLayout={onLayout}
            allowFontScaling={false}
            style={[
                styles.text,
                { color: color || colors.text, fontSize: computedFontSize },
                fontFamilyStyle,
                style,
            ]}
            {...props}
        >
            {children}
        </Text>
    )
}

export default CustomText

const styles = StyleSheet.create({
    text: {
        textAlign: 'left',
    }
})