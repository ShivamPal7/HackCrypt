import { Feather } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

interface ReportsHeaderProps {
    month: string;
    onPrevMonth: () => void;
    onNextMonth: () => void;
}

export function ReportsHeader({ month, onPrevMonth, onNextMonth }: ReportsHeaderProps) {
    const newLocal = <Text className="text-muted-foreground font-inter text-sm">Overview & Insights</Text>;
    return (
        <View className="flex-row items-center justify-between mb-6 pt-4">
            <View>
                <Text className="text-foreground font-inter-bold text-2xl">Report</Text>
                {newLocal}
            </View>

            <View className="flex-row items-center bg-card border border-border rounded-lg p-1">
                <TouchableOpacity onPress={onPrevMonth} className="p-2">
                    <Feather name="chevron-left" size={20} color="#9AA4B2" />
                </TouchableOpacity>
                <Text className="text-foreground font-inter-bold px-2">{month}</Text>
                <TouchableOpacity onPress={onNextMonth} className="p-2">
                    <Feather name="chevron-right" size={20} color="#9AA4B2" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
