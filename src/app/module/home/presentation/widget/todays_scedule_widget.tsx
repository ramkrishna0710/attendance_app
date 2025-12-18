import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';
import CustomText from '../../../../../core/common_widget/custom_text';
import { useTheme } from '../../../../../core/theme/ThemeContext';
import { fakeScheduleJson } from '../../data/dummyData';
import CachedImage from '../../../../../core/common_widget/cache_image';
import { screenHeight } from '../../../../../core/utils/size';

interface Props {
    isAll?: boolean;
    onViewMore?: () => void;
}

const TodaysScheduleWidget: React.FC<Props> = ({
    isAll = false,
    onViewMore,
}) => {
    const { colors } = useTheme();

    const visibleData = isAll
        ? fakeScheduleJson
        : fakeScheduleJson.slice(0, 3);

    const remainingCount =
        fakeScheduleJson.length - visibleData.length;

    return (
        <View style={styles.container}>
            {visibleData.map((item, index) => {
                const hasImage = !!item.meetingImg;
                const isImageLeft = index % 2 !== 0;

                return (
                    <View
                        key={item.id}
                        style={[
                            styles.card,
                            {
                                backgroundColor: item.bgColor,
                                flexDirection: hasImage ? 'row' : 'column',
                                alignItems: hasImage ? 'center' : 'flex-start',
                            },
                        ]}
                    >
                        {/* IMAGE LEFT */}
                        {hasImage && isImageLeft && (
                            <CachedImage
                                uri={item.meetingImg}
                                height={screenHeight * 0.12}
                            />
                        )}

                        {/* TEXT */}
                        <View style={hasImage ? styles.textContainer : undefined}>
                            <CustomText
                                fontFamily="Okra-Bold"
                                fontSize={14}
                                color={colors.text}
                            >
                                {item.title}
                            </CustomText>

                            <CustomText
                                fontFamily="Okra-Regular"
                                fontSize={12}
                                color={colors.text}
                            >
                                {item.time}
                            </CustomText>
                        </View>

                        {hasImage && !isImageLeft && (
                            <CachedImage
                                uri={item.meetingImg}
                                height={screenHeight * 0.12}
                            />
                        )}
                    </View>
                );
            })}

            {/* VIEW MORE CARD */}
            {!isAll && remainingCount > 0 && (
                <TouchableOpacity
                    onPress={onViewMore}
                    activeOpacity={0.8}
                    style={[
                        styles.card,
                        styles.viewMoreCard,
                        { backgroundColor: colors.primary },
                    ]}
                >
                    <CustomText
                        fontFamily="Okra-Bold"
                        fontSize={14}
                        color={colors.background}
                        style={{ textAlign: 'center' }}
                    >
                        Click to{'\n'}view more
                    </CustomText>

                    <CustomText
                        fontFamily="Okra-Regular"
                        fontSize={12}
                        color={colors.background}
                        style={{ marginTop: 6 }}
                    >
                        +{remainingCount} schedule
                    </CustomText>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default TodaysScheduleWidget;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },

    card: {
        width: '48%',
        padding: 16,
        borderRadius: 18,
        marginBottom: 16,
    },

    textContainer: {
        flex: 1,
    },

    image: {
        width: '40%',
        marginHorizontal: 8,
        borderRadius: 12,
    },

    viewMoreCard: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
