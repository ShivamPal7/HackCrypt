import { Text, View } from 'react-native';
import { cn } from '../../lib/utils';
import { CourseDetails } from '../../types/domain';

interface StatsGridProps {
    stats: CourseDetails['stats'];
}

export function StatsGrid({ stats }: StatsGridProps) {
    const Card = ({ label, value, trend, type }: { label: string, value: number, trend: string, type: 'present' | 'late' | 'absent' }) => {
        let bgClass = "bg-card border-border";
        let trendColor = "text-success"; // default

        // Logic for trend coloring can be refined, image shows:
        // Present: +5% (Green)
        // Late: -1% (Orange) (Actually image shows orange text for trend -1%)
        // Absent: 0% (Gray)

        if (type === 'late') trendColor = "text-warning";
        if (type === 'absent') trendColor = "text-muted-foreground";

        return (
            <View className={cn("flex-1 p-4 rounded-2xl border", bgClass)}>
                <Text className="text-muted-foreground font-inter-medium text-xs mb-1">{label}</Text>
                <View className="flex-row items-end gap-1.5">
                    <Text className="text-foreground font-inter-bold text-2xl">{value}</Text>
                    <Text className={cn("font-inter-bold text-xs mb-1.5", trendColor)}>{trend}</Text>
                </View>
            </View>
        );
    };

    return (
        <View className="flex-row gap-3 mb-6">
            <Card label="Present" value={stats.present} trend={stats.presentTrend} type="present" />
            <Card label="Late" value={stats.late} trend={stats.lateTrend} type="late" />
            <Card label="Absent" value={stats.absent} trend={stats.absentTrend} type="absent" />
        </View>
    );
}
