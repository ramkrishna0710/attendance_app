import React, { useMemo } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import CustomText from '../../../../../core/common_widget/custom_text';
import { useTheme } from '../../../../../core/theme/ThemeContext';
import { fakeScheduleJson } from '../../data/dummyData';
import CachedImage from '../../../../../core/common_widget/cache_image';
import { screenHeight } from '../../../../../core/utils/size';
import Spacer from '../../../../../core/common_widget/spacer';

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

    const { leftColumn, rightColumn } = useMemo(() => {
        const left: typeof visibleData = [];
        const right: typeof visibleData = [];

        visibleData.forEach((item, index) => {
            index % 2 === 0 ? left.push(item) : right.push(item);
        });

        return { leftColumn: left, rightColumn: right };
    }, [visibleData]);

    const renderCard = (item: any) => {
        const hasImage = !!item.meetingImg;

        return (
            <View
                key={item.id}
                style={[
                    styles.card,
                    { backgroundColor: item.bgColor },
                ]}
            >
                <View style={{
                    alignItems: hasImage ? 'flex-start' : 'center',
                    justifyContent: hasImage ? 'flex-start' : 'center',
                    flex: 1,
                }}>
                    <CustomText
                        fontFamily='Okra-ExtraBold'
                        varient='h6'
                        color={colors.text}
                        style={{
                            textAlign: hasImage ? 'left' : 'center',
                        }}
                    >
                        {item.title}
                    </CustomText>

                    <Spacer h={8} />

                    <CustomText
                        fontFamily="Okra-Medium"
                        varient='h7'
                        color={colors.text}
                    >
                        {item.time}
                    </CustomText>
                </View>

                <Spacer h={6} />

                {hasImage && (
                    <>
                        <Spacer h={6} />
                        <CachedImage
                            uri={item.meetingImg}
                            height={screenHeight * 0.15}
                            style={{ borderRadius: 16 }}
                        />
                    </>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>

            <View style={styles.column}>
                {leftColumn.map(renderCard)}
            </View>


            <View style={styles.column}>
                {rightColumn.map(renderCard)}

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
        </View>
    );
};

export default TodaysScheduleWidget;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },

    column: {
        flex: 1,
    },

    card: {
        margin: 8,
        padding: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 4,
    },

    viewMoreCard: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
