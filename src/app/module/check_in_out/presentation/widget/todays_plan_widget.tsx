import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useTheme } from '../../../../../core/theme/ThemeContext';
import CustomText from '../../../../../core/common_widget/custom_text';
import Spacer from '../../../../../core/common_widget/spacer';
import Svg, { Circle } from 'react-native-svg';
import { heightBox, rf } from '../../../../../core/utils/size';

const PROGRESS = 80;

const TodaysPlanWidget = () => {
    const { colors } = useTheme();

    const size = heightBox(72);
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progressOffset = circumference - (circumference * PROGRESS) / 100;

    return (
        <View style={[styles.taskContainer, { backgroundColor: colors.active }]}>
            <View style={styles.leftContent}>
                <CustomText
                    fontSize={rf(11)}
                    fontFamily="Okra-Medium"
                    color={colors.background}
                >
                    Great, your today's{'\n'}plan almost done
                </CustomText>

                <Spacer h={16} />

                <TouchableOpacity
                    onPress={() => { }}
                    style={[
                        styles.viewTaskContainer,
                        { backgroundColor: colors.primary },
                    ]}
                >
                    <CustomText
                        fontSize={rf(8)}
                        fontFamily="Okra-Medium"
                        color={colors.background}
                    >
                        View Task
                    </CustomText>
                </TouchableOpacity>
            </View>

            <View style={styles.progressContainer}>
                <Svg width={size} height={size}>
                    <Circle
                        stroke={colors.border}
                        fill="none"
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        strokeWidth={strokeWidth - 3.5}
                    />

                    <Circle
                        stroke={colors.primary}
                        fill="none"
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={progressOffset}
                        strokeLinecap="round"
                        rotation="70" 
                        origin={`${size / 2}, ${size / 2}`}
                    />
                </Svg>

                <View style={styles.progressText}>
                    <CustomText
                        fontFamily="Okra-ExtraBold"
                        color={colors.background}
                        fontSize={rf(12)}
                    >
                        {PROGRESS}%
                    </CustomText>
                </View>
            </View>
        </View>
    );
};

export default TodaysPlanWidget;

const styles = StyleSheet.create({
    taskContainer: {
        padding: 24,
        borderRadius: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    leftContent: {
        flex: 1,
    },

    viewTaskContainer: {
        alignSelf: 'flex-start',
        borderRadius: 16,
        paddingVertical: 6,
        paddingHorizontal: 18,
    },

    progressContainer: {
        marginLeft: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },

    progressText: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
