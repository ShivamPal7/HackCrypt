import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AttendanceTrendChart } from '../../src/components/analytics/AttendanceTrendChart';
import { DateRangeSelector } from '../../src/components/analytics/DateRangeSelector';
import { PerformanceBreakdown } from '../../src/components/analytics/PerformanceBreakdown';
import { StatsOverview } from '../../src/components/analytics/StatsOverview';
import { TeacherScreenHeader } from '../../src/components/home/teacher/TeacherScreenHeader';
import { currentInstructor } from '../../src/data/mock';
import { defaultAnalytics, mockAnalyticsData } from '../../src/data/mock_analytics';
import { DateRange } from '../../src/types/analytics';

export default function AnalyticsScreen() {
    const [dateRange, setDateRange] = useState<DateRange>('Week');

    // Get data based on range (fallback to default if mock missing)
    const data = mockAnalyticsData[dateRange] || defaultAnalytics;

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <View className="flex-1 px-5">
                <TeacherScreenHeader title="Analytics" user={currentInstructor} />

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

                    {/* Range Selector */}
                    <DateRangeSelector selectedRange={dateRange} onSelectRange={setDateRange} />

                    {/* Stats Overview */}
                    <StatsOverview summary={data.summary} />

                    {/* Trend Chart */}
                    <AttendanceTrendChart data={data.trends} />

                    {/* Subject Breakdown */}
                    <PerformanceBreakdown subjects={data.subjects} />

                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
