import { Text, View } from 'react-native';
import { cn } from '../../lib/utils';
import { SubjectAttendance } from '../../types/domain';

interface SubjectBreakdownProps {
    subjects: SubjectAttendance[];
}

export function SubjectBreakdown({ subjects }: SubjectBreakdownProps) {
    return (
        <View className="bg-card p-5 rounded-2xl border border-border mt-6">
            <Text className="text-foreground font-inter-bold text-lg mb-4">Subject Breakdown</Text>

            <View className="gap-6">
                {subjects.map((subject) => (
                    <View key={subject.id}>
                        <View className="flex-row justify-between mb-2">
                            <Text className="text-foreground font-inter-medium text-sm">{subject.subjectName}</Text>
                            <Text className={cn("font-inter-bold text-sm",
                                subject.percentage >= 80 ? 'text-success' :
                                    subject.percentage >= 70 ? 'text-warning' : 'text-destructive'
                            )}>
                                {subject.percentage}%
                            </Text>
                        </View>
                        <View className="h-2 bg-muted/20 rounded-full overflow-hidden">
                            <View
                                className="h-full rounded-full"
                                style={{
                                    width: `${subject.percentage}%`,
                                    backgroundColor: subject.color
                                }}
                            />
                        </View>
                        <Text className="text-muted-foreground text-[10px] mt-1 text-right">
                            {subject.attendedClasses}/{subject.totalClasses} Classes
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
}
