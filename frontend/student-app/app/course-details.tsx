import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AttendanceHeatmap } from '../src/components/details/AttendanceHeatmap';
import { DetailsHeader } from '../src/components/details/DetailsHeader';
import { HistoryTab } from '../src/components/details/HistoryTab';
import { RecentActivity } from '../src/components/details/RecentActivity';
import { StatsGrid } from '../src/components/details/StatsGrid';
import { cs101Details } from '../src/data/mock';
import { cn } from '../src/lib/utils';

export default function CourseDetailsScreen() {
    const [activeTab, setActiveTab] = useState<'Stats' | 'History'>('Stats');

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <ScrollView
                className="flex-1 px-5"
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                <DetailsHeader />

                {/* Tabs */}
                <View className="flex-row bg-card p-1 rounded-xl mb-6 border border-input">
                    {['Stats', 'History'].map((tab) => {
                        const isActive = activeTab === tab;
                        return (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setActiveTab(tab as any)}
                                className={cn(
                                    "flex-1 h-10 items-center justify-center rounded-lg",
                                    isActive ? "bg-info" : "bg-transparent"
                                )}
                            >
                                <Text
                                    className={cn(
                                        "font-inter-bold text-sm",
                                        isActive ? "text-white" : "text-muted-foreground"
                                    )}
                                >
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {activeTab === 'Stats' ? (
                    <>
                        <StatsGrid stats={cs101Details.stats} />
                        <AttendanceHeatmap data={cs101Details.heatmap} />
                        <RecentActivity logs={cs101Details.activityLog} />
                    </>
                ) : (
                    <HistoryTab logs={cs101Details.activityLog} />
                )}

            </ScrollView>

            {/* FAB Removed */}
        </SafeAreaView>
    );
}
