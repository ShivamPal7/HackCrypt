import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { cn } from '../../lib/utils';
import { CourseDetails } from '../../types/domain';

interface AttendanceHeatmapProps {
    data: CourseDetails['heatmap'];
}

export function AttendanceHeatmap({ data }: AttendanceHeatmapProps) {
    // Default to October 2023 as per mock data context
    const [currentDate, setCurrentDate] = useState(new Date(2023, 9, 1));

    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const monthLabel = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    const daysInMonth = getDaysInMonth(currentDate);
    const startDay = getFirstDayOfMonth(currentDate); // 0 = Sunday

    // Generate grid items
    const gridItems = [];

    // Padding
    for (let i = 0; i < startDay; i++) {
        gridItems.push({ type: 'padding', key: `pad-${i}` });
    }

    // Days
    for (let i = 1; i <= daysInMonth; i++) {
        // Find status from props
        let status = 'none';

        // Construct date string for the current cell "YYYY-MM-DD"
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth(); // 0-indexed

        // Ensure month/day padding matches data format
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

        // Find matching data point
        const dayData = data.find(d => d.date === dateStr);
        if (dayData) status = dayData.status;

        gridItems.push({ type: 'day', day: i, status, key: `day-${i}` });
    }

    return (
        <View className="bg-card rounded-[24px] p-5 mb-6 border border-border">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-6">
                <Text className="text-foreground font-inter-bold text-base">Attendance Heatmap</Text>
                <View className="flex-row items-center gap-1">
                    <Text className="text-muted-foreground text-[10px] font-inter-bold uppercase mr-1">Low</Text>
                    {/* Legend */}
                    <View className="h-2 w-2 rounded-sm bg-card-foreground/10" />
                    <View className="h-2 w-2 rounded-sm bg-success/30" />
                    <View className="h-2 w-2 rounded-sm bg-success/60" />
                    <View className="h-2 w-2 rounded-sm bg-success" />
                    <Text className="text-muted-foreground text-[10px] font-inter-bold uppercase ml-1">High</Text>
                </View>
            </View>

            {/* Month Nav */}
            <View className="flex-row justify-between items-center mb-4 px-4">
                <TouchableOpacity onPress={handlePrevMonth} className="p-1">
                    <Feather name="chevron-left" size={20} color="#9AA4B2" />
                </TouchableOpacity>

                <Text className="text-foreground font-inter-bold text-sm">{monthLabel}</Text>

                <TouchableOpacity onPress={handleNextMonth} className="p-1">
                    <Feather name="chevron-right" size={20} color="#9AA4B2" />
                </TouchableOpacity>
            </View>

            {/* Grid */}
            <View>
                {/* Days Header */}
                <View className="flex-row mb-2">
                    {daysOfWeek.map((d, i) => (
                        <View key={i} className="w-[14.28%] items-center">
                            <Text className="text-muted-foreground font-inter-bold text-xs">
                                {d}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Days Grid */}
                <View className="flex-row flex-wrap">
                    {gridItems.map((item) => {
                        if (item.type === 'padding') {
                            return <View key={item.key} className="w-[14.28%]" />;
                        }

                        // Day Item
                        let bgClass = "bg-transparent";
                        let textClass = "text-foreground";
                        let borderClass = "";
                        const status = (item as any).status;

                        if (status === 'present') {
                            bgClass = "bg-success";
                            textClass = "text-white shadow-sm shadow-success/50";
                        }
                        else if (status === 'late') {
                            bgClass = "bg-warning/10";
                            textClass = "text-warning";
                            borderClass = "border border-warning/50";
                        }
                        else if (status === 'absent') {
                            bgClass = "bg-destructive";
                            textClass = "text-white";
                        }
                        else {
                            // status === 'none'
                            bgClass = "bg-muted/30";
                            textClass = "text-muted-foreground";
                        }

                        return (
                            <View
                                key={item.key}
                                className="w-[14.28%] items-center justify-center mb-3"
                            >
                                <View
                                    className={cn("h-9 w-9 items-center justify-center rounded-[10px]", bgClass, borderClass)}
                                >
                                    <Text className={cn("font-inter-bold text-xs", textClass)}>{(item as any).day}</Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </View>
        </View>
    );
}
