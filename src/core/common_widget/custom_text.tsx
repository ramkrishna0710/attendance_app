import { View, Text, TextStyle, Platform, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from '../theme/ThemeContext';

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
        android: 24,
        ios: 22
    },
    h2: {
        android: 22,
        ios: 20
    },
    h3: {
        android: 20,
        ios: 18
    },
    h4: {
        android: 18,
        ios: 16
    },
    h5: {
        android: 16,
        ios: 14
    },
    h6: {
        android: 12,
        ios: 10
    },
    h7: {
        android: 10,
        ios: 9
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