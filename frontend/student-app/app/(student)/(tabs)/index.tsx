import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AttendanceCard } from '@/src/components/home/AttendanceCard';
import { ClassItem } from '@/src/components/home/ClassItem';
import { Header } from '@/src/components/home/Header';
import { QuickCheckIn } from '@/src/components/home/QuickCheckIn';
import { attendanceSummary, currentUser, todaysClasses } from '@/src/data/mock';

export default function HomeScreen() {
    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <ScrollView
                className="flex-1 px-5"
                contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
                showsVerticalScrollIndicator={false}
            >
                <Header user={currentUser} />

                <AttendanceCard stats={attendanceSummary} />

                <View className="mt-2 mb-4 flex-row justify-between items-center">
                    <Text className="text-foreground font-inter-bold text-lg">Today's Classes</Text>
                    <TouchableOpacity>
                        <Text className="text-info font-inter-bold text-sm">View Calendar</Text>
                    </TouchableOpacity>
                </View>

                <View className="gap-1">
                    {todaysClasses.map((session) => (
                        <ClassItem key={session.id} session={session} />
                    ))}
                </View>

                <QuickCheckIn />
            </ScrollView>
        </SafeAreaView>
    );
}
