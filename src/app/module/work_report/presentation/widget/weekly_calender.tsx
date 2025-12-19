import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { rf, screenHeight, screenWidth } from '../../../../../core/utils/size';
import { useTheme } from '../../../../../core/theme/ThemeContext';
import CommonButton from '../../../../../core/common_widget/custom_button';
import Spacer from '../../../../../core/common_widget/spacer';
import Icon from '../../../../../core/common_widget/Icon';
import CustomText from '../../../../../core/common_widget/custom_text';

const ITEM_WIDTH = screenWidth / 5 - 10;

const WeeklyCalender = () => {
    const { colors } = useTheme();
    const flatListRef = useRef<FlatList>(null);

    const today = useMemo(() => new Date(), []);

    const [currentMonthDate, setCurrentMonthDate] = useState(today);
    const [selectedDate, setSelectedDate] = useState(today.getDate());

    const monthLabel = useMemo(() =>
        currentMonthDate.toLocaleString('default', { month: 'long' }),
        [currentMonthDate]
    );

    const days = useMemo(() => {
        const year = currentMonthDate.getFullYear();
        const month = currentMonthDate.getMonth();
        const totalDays = new Date(year, month + 1, 0).getDate();

        return Array.from({ length: totalDays }, (_, i) => {
            const date = new Date(year, month, i + 1);
            return {
                day: i + 1,
                weekday: date.toLocaleString('default', { weekday: 'short' }),
            };
        });
    }, [currentMonthDate]);

    const scrollToSelectedDate = useCallback(() => {
        const index = selectedDate - 1;
        if (flatListRef.current && index >= 0 && index < days.length) {
            flatListRef.current.scrollToIndex({
                index,
                animated: false,
                viewPosition: 0.5,
            });
        }
    }, [selectedDate, days.length]);

    useEffect(() => {
        scrollToSelectedDate();
    }, [scrollToSelectedDate]);

    const changeMonth = useCallback((type: 'prev' | 'next') => {
        const newDate = new Date(currentMonthDate);
        newDate.setMonth(
            type === 'prev'
                ? currentMonthDate.getMonth() - 1
                : currentMonthDate.getMonth() + 1
        );

        setCurrentMonthDate(newDate);

        if (
            newDate.getMonth() === today.getMonth() &&
            newDate.getFullYear() === today.getFullYear()
        ) {
            setSelectedDate(today.getDate());
        } else {
            setSelectedDate(1);
        }
    }, [currentMonthDate, today]);

    const renderDayItem = useCallback(({ item }: { item: { day: number; weekday: string } }) => {
        const isSelected = item.day === selectedDate;

        return (
            <TouchableOpacity
                style={styles.dayItem}
                activeOpacity={0.8}
                onPress={() => setSelectedDate(item.day)}
            >
                <CustomText fontFamily='Okra-Medium' style={[styles.weekText, { color: colors.background }]}>{item.weekday}</CustomText>
                <Spacer h={6} />
                <View style={[styles.dateCircle, isSelected && { backgroundColor: colors.primary }]}>
                    <CustomText fontFamily={isSelected ? 'Okra-Bold' : 'Okra-Medium'} style={[styles.dateText, { color: colors.background }]}>{item.day}</CustomText>
                </View>
            </TouchableOpacity>
        );
    }, [selectedDate, colors.primary]);

    const getItemLayout = useCallback(
        (_: any, index: number) => ({
            length: ITEM_WIDTH,
            offset: ITEM_WIDTH * index,
            index,
        }),
        []
    );

    return (
        <View style={[styles.calendarContainer, { backgroundColor: colors.active }]}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => changeMonth('prev')} activeOpacity={0.7}>
                    <Icon
                        iconFamily="MaterialIcons"
                        name="keyboard-arrow-left"
                        size={rf(24)}
                        color={colors.background}
                    />
                </TouchableOpacity>

                <CustomText varient='h4' fontFamily='Okra-Bold' color={colors.background}>{monthLabel}</CustomText>

                <TouchableOpacity onPress={() => changeMonth('next')} activeOpacity={0.7}>
                    <Icon
                        iconFamily="MaterialIcons"
                        name="keyboard-arrow-right"
                        size={rf(24)}
                        color={colors.background}
                    />
                </TouchableOpacity>
            </View>

            <FlatList
                ref={flatListRef}
                data={days}
                keyExtractor={(item) => item.day.toString()}
                renderItem={renderDayItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={ITEM_WIDTH}
                snapToAlignment="center"
                decelerationRate="fast"
                getItemLayout={getItemLayout}
                initialScrollIndex={Math.max(0, selectedDate - 1)}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 50,
                }}
                removeClippedSubviews={true}
                maxToRenderPerBatch={10}
                contentContainerStyle={styles.flatListContent}
            />

            <Spacer h={25} />

            <CommonButton btnText='Set Remainder' fontStyles={{ fontSize: 20 }} bgColor={colors.primary} width={'70%'} style={{ alignItems: 'center' }} height={screenHeight * 0.075} borderRadius={screenHeight * 0.075 / 2} />
        </View>
    )
}

export default WeeklyCalender

const styles = StyleSheet.create({
    calendarContainer: {
        marginTop: 10,
        paddingVertical: 24,
        borderRadius: 30,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        marginBottom: 16,
    },
    flatListContent: {
        // paddingHorizontal: screenWidth / 2 - ITEM_WIDTH / 2,
    },
    dayItem: {
        width: ITEM_WIDTH,
        alignItems: 'center',
    },
    weekText: {
        opacity: 0.8,
        fontSize: 16,
        marginBottom: 6,
    },
    dateCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        shadowColor: '#5e5c5cff',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 4,
    },
    dateText: {
        fontSize: 16,
        fontWeight: '600',
    },
})