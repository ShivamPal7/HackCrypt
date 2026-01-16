import { Text, TouchableOpacity, View } from 'react-native';
import { DateRange } from '../../types/analytics';

interface DateRangeSelectorProps {
    selectedRange: DateRange;
    onSelectRange: (range: DateRange) => void;
}

const RANGES: DateRange[] = ['Today', 'Week', 'Month'];

export const DateRangeSelector = ({ selectedRange, onSelectRange }: DateRangeSelectorProps) => {
    return (
        <View className="flex-row bg-card border border-border rounded-xl p-1 mb-6">
            {RANGES.map((range) => {
                const isSelected = selectedRange === range;
                return (
                    <TouchableOpacity
                        key={range}
                        onPress={() => onSelectRange(range)}
                        className={`flex-1 py-2 items-center justify-center rounded-lg ${isSelected ? 'bg-primary' : 'bg-transparent'
                            }`}
                    >
                        <Text
                            className={`font-inter-bold text-xs ${isSelected ? 'text-primary-foreground' : 'text-muted-foreground'
                                }`}
                        >
                            {range}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};
