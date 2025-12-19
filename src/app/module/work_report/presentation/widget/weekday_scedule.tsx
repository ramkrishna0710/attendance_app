import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomText from '../../../../../core/common_widget/custom_text';
import { useTheme } from '../../../../../core/theme/ThemeContext';
import TeamPreview from './team_preview';

const fakeSchedule = [
    { id: '1', title: 'Zoom meet with client from New York', start: '08:00', end: '10:00', color: '#FFE9D6' },
    { id: '2', title: 'Explore Design App', start: '11:00', end: '12:00', color: '#EAF6F6' },
    { id: '3', title: 'Lunch Break', start: '13:00', end: '14:00', color: '#F3F0FF' },
    { id: '4', title: 'Team Sync Meeting', start: '15:00', end: '16:00', color: '#FFF1F1' },
    { id: '5', title: 'Project Review', start: '17:00', end: '20:00', color: '#EAF2FF' },
];

const startHour = 8;
const endHour = 20;
const hourHeight = 50;

const WeeklySchedule = () => {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <CustomText
                varient="h4"
                fontFamily="Okra-Bold"
                color={colors.active}
                style={styles.header}
            >
                Friday, 24th
            </CustomText>

            <View style={styles.timeline}>
                {/* Time Column */}
                <View style={styles.timeColumn}>
                    {Array.from({ length: endHour - startHour + 1 }, (_, i) => {
                        const hour = startHour + i;
                        return (
                            <View key={hour} style={[styles.timeSlot, { height: hourHeight }]}>
                                <CustomText varient="h6" color={colors.lightText} style={styles.timeText}>
                                    {hour.toString().padStart(2, '0')}:00
                                </CustomText>
                            </View>
                        );
                    })}
                </View>

                {/* Events Column */}
                <View style={[styles.eventsColumn, { minHeight: (endHour - startHour + 1) * hourHeight }]}>
                    {fakeSchedule.map((event, index) => {
                        const [startHourNum, startMinuteNum] = event.start.split(':').map(Number);
                        const [endHourNum, endMinuteNum] = event.end.split(':').map(Number);

                        const top = (startHourNum - startHour + startMinuteNum / 60) * hourHeight + 8;
                        const height = endHourNum - startHourNum * hourHeight;
                        // const durationInHours = (endHourNum + endMinuteNum / 60) - (startHourNum + startMinuteNum / 60);
                        const durationInHours = endHourNum - startHourNum;

                        return (
                            <View key={event.id} style={[styles.eventWrapper, { top, height }]}>
                                {index !== 0 && (
                                    <View
                                        style={[
                                            styles.divider,
                                            {
                                                backgroundColor: colors.primary,
                                                position: 'absolute',
                                                top: 0,
                                                left: -55,
                                                right: 0,
                                                width: '117%',
                                                overflow: 'visible',
                                            },
                                        ]}
                                    >
                                        <View
                                            style={{
                                                position: 'absolute',
                                                left: 0,
                                                top: -4,
                                                height: 10,
                                                width: 10,
                                                borderRadius: 5,
                                                borderWidth: 2,
                                                borderColor: colors.primary,
                                                backgroundColor: colors.background,
                                            }}
                                        />
                                    </View>
                                )}

                                {/* Event Card */}
                                <View style={[styles.eventCard, { backgroundColor: event.color, marginTop: durationInHours == 2 ? 25 : durationInHours >= 3 ? 35 : 10 }]}>
                                    <CustomText
                                        varient="h6"
                                        fontFamily="Okra-Bold"
                                        color={colors.text}
                                        style={styles.eventTitle}
                                    >
                                        {event.title}
                                    </CustomText>
                                    <CustomText varient="h6" color={colors.lightText} style={styles.eventTime}>
                                        {event.start} - {event.end}
                                    </CustomText>
                                    {durationInHours >= 2 && <TeamPreview />}

                                </View>
                            </View>
                        );
                    })}
                </View>
            </View>
        </View>
    );
};

export default WeeklySchedule;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 20,
        letterSpacing: 0.5,
    },
    timeline: {
        flexDirection: 'row',
        position: 'relative',
        minHeight: (endHour - startHour + 1) * hourHeight,
        gap: 20
    },
    timeColumn: {
        justifyContent: 'flex-start',
    },
    timeSlot: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 6,
    },
    timeText: {
        textAlignVertical: 'center',
        fontSize: 12,
    },
    eventsColumn: {
        flex: 1,
        paddingLeft: 12,
        position: 'relative',
    },
    eventWrapper: {
        position: 'absolute',
        left: 0,
        right: 0,
    },
    divider: {
        height: 1.2,
        width: '100%',
        opacity: 1.5,
    },
    eventCard: {
        padding: 14,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        marginTop: 14,
    },
    eventTitle: {
        fontSize: 14,
        marginBottom: 4,
    },
    eventTime: {
        fontSize: 12,
        marginBottom: 8,
    },
});
