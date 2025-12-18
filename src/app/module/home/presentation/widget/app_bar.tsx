import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import CustomText from '../../../../../core/common_widget/custom_text';
import Icon from '../../../../../core/common_widget/Icon';
import { useTheme } from '../../../../../core/theme/ThemeContext';
import { rf } from '../../../../../core/utils/size';

interface AppBarProps {
    isNotifications?: boolean;
}

const AppBar: FC<AppBarProps> = ({ isNotifications = false }) => {
    const { colors } = useTheme();

    return (
        <View style={styles.appBarContainer}>
            <CustomText fontSize={rf(18)} fontFamily="Okra-Bold" color={colors.active} style={{ fontWeight: 'bold' }}>
                Let&apos;s become{'\n'}more{' '}
                <CustomText
                    color={colors.primary}
                    fontSize={rf(18)}
                    fontFamily="Okra-ExtraBold"
                >
                    Productive
                </CustomText>
            </CustomText>

            <View style={styles.iconWrapper}>
                <Icon
                    name="notifications"
                    size={rf(24)}
                    iconFamily="Ionicons"
                    color={colors.dark}
                />

                {isNotifications && (
                    <View
                        style={[
                            styles.notificationDot,
                            { backgroundColor: colors.primary },
                        ]}
                    />
                )}
            </View>
        </View>
    );
};

export default AppBar;

const styles = StyleSheet.create({
    appBarContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },

    iconWrapper: {
        position: 'relative',
    },

    notificationDot: {
        position: 'absolute',
        top: -2,
        right: 2,
        width: 14,
        height: 14,
        borderRadius: 8,
        borderColor: '#fff',
        borderWidth: 2,
    },
});
