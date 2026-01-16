import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { InsightCard } from '@/src/components/reports/InsightCard';
import { ReportsHeader } from '@/src/components/reports/ReportsHeader';
import { SubjectBreakdown } from '@/src/components/reports/SubjectBreakdown';
import { TrendChart } from '@/src/components/reports/TrendChart';
import { mockReportData } from '@/src/data/mock';

export default function ReportsScreen() {
    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <ScrollView
                className="flex-1 px-5"
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                <ReportsHeader
                    month={mockReportData.month}
                    onPrevMonth={() => { }}
                    onNextMonth={() => { }}
                />

                {/* Insight Cards Grid */}
                <View className="flex-row gap-4 mb-4">
                    <InsightCard
                        title="Total Sessions"
                        value={mockReportData.totalSessions}
                        icon="calendar"
                        statusColor="bg-muted"
                    />
                    <InsightCard
                        title="Avg Attendance"
                        value={`${mockReportData.attendancePercentage}%`}
                        trend="+2%"
                        trendDirection="up"
                        icon="pie-chart"
                        statusColor="bg-info"
                    />
                </View>
                <View className="flex-row gap-4">
                    <InsightCard
                        title="Present"
                        value={mockReportData.presentSessions}
                        icon="check-circle"
                        statusColor="bg-success"
                    />
                    <InsightCard
                        title="Absent"
                        value={mockReportData.absentSessions}
                        trend="+1"
                        trendDirection="down"
                        icon="x-circle"
                        statusColor="bg-destructive"
                    />
                </View>

                {/* Charts */}
                <TrendChart data={mockReportData.trend} />
                <SubjectBreakdown subjects={mockReportData.subjects} />

            </ScrollView>
        </SafeAreaView>
    );
}
