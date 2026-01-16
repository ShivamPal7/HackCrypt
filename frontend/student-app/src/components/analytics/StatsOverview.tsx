import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { AnalyticsSummary } from '../../types/analytics';

interface StatsOverviewProps {
    summary: AnalyticsSummary;
}

export const StatsOverview = ({ summary }: StatsOverviewProps) => {
    return (
        <View className="flex-row gap-3 mb-6">
            {/* Primary Stat: Attendance Rate */}
            <View className="flex-1 bg-card border border-border p-4 rounded-2xl items-start justify-between min-h-[120px]">
                <View className="p-2 bg-primary/10 rounded-full mb-2">
                    <Feather name="users" size={18} color="#6CFFC4" />
                </View>
                <View>
                    <Text className="text-muted-foreground font-inter-medium text-xs mb-1">Avg. Attendance</Text>
                    <Text className="text-foreground font-inter-bold text-3xl">{summary.attendanceRate}%</Text>
                </View>
            </View>

            {/* Secondary Stats Column */}
            <View className="flex-1 gap-3">
                <View className="flex-1 bg-card border border-border p-3 rounded-2xl flex-row items-center gap-3">
                    <View className="p-2 bg-blue-500/10 rounded-full">
                        <Feather name="book-open" size={16} color="#3B82F6" />
                    </View>
                    <View>
                        <Text className="text-foreground font-inter-bold text-lg">{summary.totalLectures}</Text>
                        <Text className="text-muted-foreground font-inter-medium text-[10px]">Lectures</Text>
                    </View>
                </View>

                <View className="flex-1 bg-card border border-border p-3 rounded-2xl flex-row items-center gap-3">
                    <View className="p-2 bg-purple-500/10 rounded-full">
                        <Feather name="user-check" size={16} color="#A855F7" />
                    </View>
                    <View>
                        <Text className="text-foreground font-inter-bold text-lg">{summary.avgStudentsPresent}</Text>
                        <Text className="text-muted-foreground font-inter-medium text-[10px]">Avg Present</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};
