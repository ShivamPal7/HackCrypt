import { useState } from 'react';
import { LayoutChangeEvent, Text, View } from 'react-native';
import { G, Rect, Svg, Text as SvgText } from 'react-native-svg';
import { AttendanceTrend } from '../../types/domain';

interface TrendChartProps {
    data: AttendanceTrend[];
}

export function TrendChart({ data }: TrendChartProps) {
    const [width, setWidth] = useState(0);
    const height = 180;
    const padding = 20;

    const onLayout = (event: LayoutChangeEvent) => {
        setWidth(event.nativeEvent.layout.width);
    };

    if (width === 0) {
        return <View onLayout={onLayout} className="h-[180px] w-full" />;
    }

    const maxVal = Math.max(...data.map(d => d.present + d.absent), 10); // Standardize scale
    const chartWidth = width - (padding * 2);
    const barWidth = 12;
    const gap = (chartWidth - (data.length * barWidth)) / (data.length - 1);

    return (
        <View className="bg-card p-5 rounded-2xl border border-border mt-6">
            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-foreground font-inter-bold text-lg">Weekly Trend</Text>
                <View className="flex-row gap-3">
                    <View className="flex-row items-center gap-1">
                        <View className="w-3 h-3 rounded-full bg-info" />
                        <Text className="text-muted-foreground text-xs">Present</Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                        <View className="w-3 h-3 rounded-full bg-destructive" />
                        <Text className="text-muted-foreground text-xs">Absent</Text>
                    </View>
                </View>
            </View>

            <View onLayout={onLayout}>
                <Svg width={width} height={height}>
                    {data.map((item, index) => {
                        const x = index * (barWidth + gap);
                        const totalHeight = (item.present + item.absent) / maxVal * (height - 30);
                        const presentHeight = (item.present / maxVal) * (height - 30);
                        const absentHeight = (item.absent / maxVal) * (height - 30);

                        return (
                            <G key={index}>
                                {/* Present Bar (Bottom) */}
                                <Rect
                                    x={x}
                                    y={height - 20 - presentHeight}
                                    width={barWidth}
                                    height={presentHeight}
                                    rx={4}
                                    fill="#3B82F6"
                                />
                                {/* Absent Bar (Stacked on top, slightly detached visually or just simpler stacked) */}
                                <Rect
                                    x={x}
                                    y={height - 20 - presentHeight - absentHeight - 2} // -2 for small gap
                                    width={barWidth}
                                    height={absentHeight}
                                    rx={4}
                                    fill="#EF4444"
                                />
                                {/* Label */}
                                <SvgText
                                    x={x + barWidth / 2}
                                    y={height}
                                    fill="#9AA4B2"
                                    fontSize="10"
                                    fontFamily="Inter-Medium"
                                    textAnchor="middle"
                                >
                                    {item.day}
                                </SvgText>
                            </G>
                        );
                    })}
                </Svg>
            </View>
        </View>
    );
}
