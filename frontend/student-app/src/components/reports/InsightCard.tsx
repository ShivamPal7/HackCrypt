import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { cn } from '../../lib/utils';

interface InsightCardProps {
    title: string;
    value: string | number;
    trend?: string;
    trendDirection?: 'up' | 'down' | 'neutral';
    icon: keyof typeof Feather.glyphMap;
    statusColor?: string; // Tailwind class prefix like "bg-success"
}

export function InsightCard({ title, value, trend, trendDirection = 'neutral', icon, statusColor = "bg-primary" }: InsightCardProps) {
    let trendColor = "text-muted-foreground";
    if (trendDirection === 'up') trendColor = "text-success";
    if (trendDirection === 'down') trendColor = "text-destructive";

    return (
        <View className="flex-1 bg-card p-4 rounded-2xl border border-border min-w-[45%]">
            <View className="flex-row justify-between items-start mb-2">
                <View className={cn("h-8 w-8 rounded-lg items-center justify-center opacity-80", statusColor.replace('bg-', 'bg-').replace('text-', '') + '/10')}>
                    {/* Note: In a real app we'd construct dynamic bg classes carefully or use inline styles for arbitary colors */}
                    <Feather name={icon} size={16} color={statusColor === 'bg-info' ? '#3B82F6' : statusColor === 'bg-success' ? '#22C55E' : '#FFFFFF'} />
                </View>
                {trend && (
                    <View className="flex-row items-center bg-background/50 px-1.5 py-0.5 rounded-md">
                        <Feather
                            name={trendDirection === 'up' ? 'trending-up' : trendDirection === 'down' ? 'trending-down' : 'minus'}
                            size={12}
                            color={trendDirection === 'up' ? '#22C55E' : trendDirection === 'down' ? '#EF4444' : '#9AA4B2'}
                        />
                        <Text className={cn("text-[10px] font-inter-bold ml-1", trendColor)}>{trend}</Text>
                    </View>
                )}
            </View>
            <Text className="text-muted-foreground text-xs font-inter-bold uppercase tracking-wider mb-1">{title}</Text>
            <Text className="text-foreground text-2xl font-inter-bold">{value}</Text>
        </View>
    );
}
