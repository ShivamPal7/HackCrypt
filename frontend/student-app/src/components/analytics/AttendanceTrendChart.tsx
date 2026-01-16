import { Dimensions, Text, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { AnalyticsTrend } from '../../types/analytics';

interface AttendanceTrendChartProps {
    data: AnalyticsTrend[];
}

export const AttendanceTrendChart = ({ data }: AttendanceTrendChartProps) => {
    const screenWidth = Dimensions.get('window').width;
    const chartWidth = screenWidth - 40; // padding
    const chartHeight = 180;

    if (!data || data.length === 0) return null;

    // Calculate scaling
    const maxVal = 100; // Attendance is % usually
    const minVal = 0;

    // Generate Path
    const stepX = chartWidth / (data.length - 1);
    const stepY = chartHeight / (maxVal - minVal);

    const points = data.map((d, i) => {
        const x = i * stepX;
        const y = chartHeight - (d.value * stepY);
        return `${x},${y}`;
    }).join(' ');

    // Smooth curve (simple polyline for now, can be bezier)
    // For simplicity using straight lines which is clearer for data points
    // To make it an area chart, we close the path
    const pathD = `M ${points}`;
    const areaD = `M ${points} L ${chartWidth},${chartHeight} L 0,${chartHeight} Z`;

    return (
        <View className="bg-card border border-border rounded-3xl p-5 mb-6">
            <View className="flex-row items-center justify-between mb-6">
                <Text className="text-foreground font-inter-bold text-base">Attendance Trend</Text>
                <View className="flex-row items-center gap-2">
                    <View className="w-2 h-2 rounded-full bg-primary" />
                    <Text className="text-muted-foreground text-xs font-inter-medium">Participation</Text>
                </View>
            </View>

            <View style={{ height: chartHeight + 30 }}>
                <Svg width={chartWidth} height={chartHeight}>
                    <Defs>
                        <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                            <Stop offset="0" stopColor="#6CFFC4" stopOpacity="0.3" />
                            <Stop offset="1" stopColor="#6CFFC4" stopOpacity="0" />
                        </LinearGradient>
                    </Defs>

                    {/* Grid Lines (Simple) */}
                    {[0, 25, 50, 75, 100].map(val => {
                        const y = chartHeight - (val * stepY);
                        return (
                            <Path
                                key={val}
                                d={`M 0 ${y} L ${chartWidth} ${y}`}
                                stroke="#1F2937"
                                strokeWidth="1"
                                strokeDasharray="4 4"
                            />
                        );
                    })}

                    {/* Area */}
                    <Path d={areaD} fill="url(#grad)" />

                    {/* Line */}
                    <Path d={pathD} stroke="#6CFFC4" strokeWidth="3" fill="none" />

                </Svg>

                {/* X-Axis Labels */}
                <View className="flex-row justify-between mt-2 absolute bottom-0 w-full">
                    {data.map((d, i) => (
                        <Text key={i} className="text-muted-foreground text-[10px] font-inter-medium w-8 text-center" numberOfLines={1}>
                            {d.label}
                        </Text>
                    ))}
                </View>
            </View>
        </View>
    );
};
