import { Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { AttendanceStats } from '../../types/domain';

interface AttendanceCardProps {
    stats: AttendanceStats;
}

export function AttendanceCard({ stats }: AttendanceCardProps) {
    const size = 120;
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = stats.percentage / 100;
    const strokeDashoffset = circumference - progress * circumference;

    return (
        <View className="bg-card rounded-3xl p-5 mb-6 border border-border">
            <View className="flex-row justify-between items-start mb-4">
                <View>
                    <Text className="text-foreground font-inter-bold text-lg">Attendance</Text>
                    <Text className="text-muted-foreground font-inter text-sm mt-1">{stats.semesterLabel}</Text>
                </View>
                <View className="bg-success/10 px-3 py-1 rounded-full border border-success/20">
                    <Text className="text-success font-inter-bold text-xs">{stats.status}</Text>
                </View>
            </View>

            <View className="flex-row items-center gap-6">
                {/* Circular Progress */}
                <View className="relative items-center justify-center" style={{ width: size, height: size }}>
                    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
                        {/* Background Circle */}
                        <Circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            stroke="#1F2937"
                            strokeWidth={strokeWidth}
                            fill="none"
                        />
                        {/* Progress Circle */}
                        <Circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            stroke="#22C55E"
                            strokeWidth={strokeWidth}
                            fill="none"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                        />
                    </Svg>
                    <View className="absolute items-center justify-center">
                        <Text className="text-foreground font-inter-bold text-3xl">{stats.percentage}%</Text>
                        <Text className="text-muted-foreground font-inter-medium text-[10px] uppercase">Target {stats.targetPercentage}%</Text>
                    </View>
                </View>

                {/* Legend */}
                <View className="flex-1 gap-4">
                    <View>
                        <View className="flex-row justify-between mb-1">
                            <Text className="text-muted-foreground text-xs font-inter-medium">Present</Text>
                            <Text className="text-foreground text-xs font-inter-bold">{stats.presentDays} Days</Text>
                        </View>
                        <View className="h-1.5 bg-muted rounded-full overflow-hidden">
                            <View className="h-full bg-success rounded-full" style={{ width: '88%' }} />
                        </View>
                    </View>
                    <View>
                        <View className="flex-row justify-between mb-1">
                            <Text className="text-muted-foreground text-xs font-inter-medium">Absent</Text>
                            <Text className="text-destructive text-xs font-inter-bold">{stats.absentDays} Days</Text>
                        </View>
                        <View className="h-1.5 bg-muted rounded-full overflow-hidden">
                            <View className="h-full bg-destructive rounded-full" style={{ width: '12%' }} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
