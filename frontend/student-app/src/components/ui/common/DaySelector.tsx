import { Feather } from '@expo/vector-icons';
import { addDays, format, subDays } from 'date-fns';
import { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

// Configure Locale (Optional)
LocaleConfig.locales['en'] = {
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};
LocaleConfig.defaultLocale = 'en';

interface DaySelectorProps {
    selectedDate: Date;
    onSelectDate: (date: Date) => void;
}

export const DaySelector = ({ selectedDate, onSelectDate }: DaySelectorProps) => {
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);

    // Format for display (e.g., "Oct 24")
    const displayDate = format(selectedDate, 'MMM d');
    // Format for day name (e.g., "Today", "Monday")
    const isToday = new Date().toDateString() === selectedDate.toDateString();
    const dayLabel = isToday ? 'Today' : format(selectedDate, 'EEEE');

    // Calendar marks
    const markedDates = {
        [format(selectedDate, 'yyyy-MM-dd')]: { selected: true, selectedColor: '#6CFFC4', selectedTextColor: '#0B0F14' }
    };

    const handlePrevDay = () => onSelectDate(subDays(selectedDate, 1));
    const handleNextDay = () => onSelectDate(addDays(selectedDate, 1));

    return (
        <View className="flex-row items-center gap-3">
            {/* Previous Day Arrow */}
            <TouchableOpacity
                onPress={handlePrevDay}
                className="h-8 w-8 items-center justify-center rounded-full bg-card border border-border active:bg-input"
            >
                <Feather name="chevron-left" size={16} color="#9AA4B2" />
            </TouchableOpacity>

            {/* Date Display / Trigger */}
            <TouchableOpacity
                onPress={() => setIsCalendarVisible(true)}
                className="items-end min-w-[80px]"
            >
                <Text className="text-muted-foreground font-inter-medium text-xs mb-0.5 uppercase tracking-wider text-right">
                    {dayLabel}
                </Text>
                <View className="flex-row items-center gap-1.5">
                    <Text className="text-foreground font-inter-bold text-lg">
                        {displayDate}
                    </Text>
                    <Feather name="calendar" size={14} color="#6CFFC4" />
                </View>
            </TouchableOpacity>

            {/* Next Day Arrow */}
            <TouchableOpacity
                onPress={handleNextDay}
                className="h-8 w-8 items-center justify-center rounded-full bg-card border border-border active:bg-input"
            >
                <Feather name="chevron-right" size={16} color="#9AA4B2" />
            </TouchableOpacity>

            {/* Calendar Modal */}
            <Modal
                transparent
                visible={isCalendarVisible}
                animationType="fade"
                onRequestClose={() => setIsCalendarVisible(false)}
            >
                <TouchableOpacity
                    className="flex-1 bg-black/60 justify-center px-6"
                    activeOpacity={1}
                    onPress={() => setIsCalendarVisible(false)}
                >
                    <View className="bg-card rounded-3xl border border-border overflow-hidden p-4">
                        <Calendar
                            current={format(selectedDate, 'yyyy-MM-dd')}
                            onDayPress={day => {
                                onSelectDate(new Date(day.timestamp)); // fix tz offset if needed, simple approach here
                                setIsCalendarVisible(false);
                            }}
                            markedDates={markedDates}
                            theme={{
                                backgroundColor: 'transparent',
                                calendarBackground: 'transparent',
                                textSectionTitleColor: '#6B7280',
                                selectedDayBackgroundColor: '#6CFFC4',
                                selectedDayTextColor: '#0B0F14',
                                todayTextColor: '#6CFFC4',
                                dayTextColor: '#E6EDF3',
                                textDisabledColor: '#374151',
                                arrowColor: '#6CFFC4',
                                monthTextColor: '#E6EDF3',
                                textDayFontFamily: 'Inter_500Medium',
                                textMonthFontFamily: 'Inter_700Bold',
                                textDayHeaderFontFamily: 'Inter_500Medium',
                            }}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};
