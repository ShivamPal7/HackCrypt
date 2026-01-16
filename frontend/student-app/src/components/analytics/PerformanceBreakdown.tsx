import { Text, View } from 'react-native';
import { SubjectPerformance } from '../../types/analytics';

interface PerformanceBreakdownProps {
    subjects: SubjectPerformance[];
}

export const PerformanceBreakdown = ({ subjects }: PerformanceBreakdownProps) => {
    return (
        <View className="mb-6">
            <Text className="text-foreground font-inter-bold text-lg mb-4">Subject Performance</Text>
            <View className="gap-3">
                {subjects.map((subject, index) => (
                    <View key={subject.subjectId} className="bg-card border border-border p-4 rounded-xl">
                        <View className="flex-row justify-between items-center mb-2">
                            <View>
                                <Text className="text-foreground font-inter-bold text-sm">{subject.subjectName}</Text>
                                <Text className="text-muted-foreground font-inter-medium text-xs">{subject.courseCode}</Text>
                            </View>
                            <Text className={`font-inter-bold text-base ${subject.attendanceRate >= 80 ? 'text-primary' :
                                    subject.attendanceRate >= 60 ? 'text-yellow-500' : 'text-red-500'
                                }`}>
                                {subject.attendanceRate}%
                            </Text>
                        </View>

                        {/* Progress Bar */}
                        <View className="h-2 bg-secondary rounded-full overflow-hidden">
                            <View
                                className={`h-full rounded-full ${subject.attendanceRate >= 80 ? 'bg-primary' :
                                        subject.attendanceRate >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}
                                style={{ width: `${subject.attendanceRate}%` }}
                            />
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};
