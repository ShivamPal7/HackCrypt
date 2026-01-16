import { Feather } from '@expo/vector-icons';
import { addDays, format, subDays } from 'date-fns';
import { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

// Configure Locale
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
    variant?: 'header' | 'input';
}

export const DaySelector = ({ selectedDate, onSelectDate, variant = 'header' }: DaySelectorProps) => {
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);

    const displayDate = format(selectedDate, 'MMM d, yyyy');
    const markedDates = {
        [format(selectedDate, 'yyyy-MM-dd')]: { selected: true, selectedColor: '#6CFFC4', selectedTextColor: '#0B0F14' }
    };

    const handlePrevDay = () => onSelectDate(subDays(selectedDate, 1));
    const handleNextDay = () => onSelectDate(addDays(selectedDate, 1));

    // Styles based on variant
    const containerClass = variant === 'header'
        ? "flex-row items-center bg-card border border-border rounded-lg p-1 h-12"
        : "flex-row items-center bg-input border border-border rounded-xl p-2 justify-between";

    const arrowClass = variant === 'header'
        ? "h-8 w-8 items-center justify-center rounded-lg active:bg-input"
        : "h-10 w-10 items-center justify-center rounded-lg active:bg-card"; // Larger touch target for input

    const textContainerClass = variant === 'header'
        ? "flex-row items-center justify-center px-1 min-w-[100px] gap-2"
        : "flex-row items-center justify-center flex-1 gap-2";

    return (
        <View>
            <View className={containerClass}>
                <TouchableOpacity
                    onPress={handlePrevDay}
                    className={arrowClass}
                >
                    <Feather name="chevron-left" size={20} color="#9AA4B2" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setIsCalendarVisible(true)}
                    className={textContainerClass}
                >
                    <Text className="text-foreground font-inter-medium text-sm">
                        {displayDate}
                    </Text>
                    {variant === 'input' && <Feather name="calendar" size={16} color="#6CFFC4" />}
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleNextDay}
                    className={arrowClass}
                >
                    <Feather name="chevron-right" size={20} color="#9AA4B2" />
                </TouchableOpacity>
            </View>

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
                                const newDate = new Date(day.year, day.month - 1, day.day);
                                onSelectDate(newDate);
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
