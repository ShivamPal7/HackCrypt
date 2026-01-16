import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { TeacherLecture } from '../../../types/domain';

interface LectureCardProps {
    lecture: TeacherLecture;
}

export const LectureCard = ({ lecture }: LectureCardProps) => {
    // Status Logic
    const isLive = lecture.status === 'live';
    const isUpcoming = lecture.status === 'upcoming';
    const isCompleted = lecture.status === 'completed';

    // Badge Styles
    let badgeBg = 'bg-[#122A26]';
    let badgeBorder = 'border-[#1B4B3F]';
    let badgeText = 'text-primary';
    let dotColor = 'bg-primary';
    let label = 'LIVE NOW';

    if (isUpcoming) {
        badgeBg = 'bg-secondary';
        badgeBorder = 'border-border';
        badgeText = 'text-muted-foreground';
        dotColor = 'bg-muted-foreground';
        label = 'UPCOMING';
    } else if (isCompleted) {
        badgeBg = 'bg-muted';
        badgeBorder = 'border-border';
        badgeText = 'text-muted-foreground';
        dotColor = 'bg-muted-foreground';
        label = 'COMPLETED';
    }

    return (
        <View className="bg-card rounded-3xl p-5 border border-border mb-4">
            {/* Header */}
            <View className="flex-row items-start justify-between mb-4">
                <View>
                    <Text className="text-info font-inter-bold text-[10px] uppercase tracking-wider mb-1">
                        {lecture.courseCode}
                    </Text>
                    <Text className="text-foreground font-inter-bold text-xl">
                        {lecture.title}
                    </Text>
                    {/* Time & Location */}
                    <View className="flex-row items-center gap-2 mt-1">
                        <View className="flex-row items-center gap-1">
                            <Feather name="clock" size={12} color="#9AA4B2" />
                            <Text className="text-muted-foreground font-inter-medium text-xs">
                                {lecture.startTime} - {lecture.endTime}
                            </Text>
                        </View>
                        <View className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                        <View className="flex-row items-center gap-1">
                            <Feather name="map-pin" size={12} color="#9AA4B2" />
                            <Text className="text-muted-foreground font-inter-medium text-xs">
                                {lecture.location}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Status Badge */}
                <View className={`${badgeBg} px-3 py-1.5 rounded-full border ${badgeBorder} flex-row items-center gap-1.5`}>
                    {!isCompleted && <View className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />}
                    <Text className={`${badgeText} font-inter-bold text-[10px] tracking-wide`}>{label}</Text>
                </View>
            </View>

            {/* Attendance Info */}
            <View className="flex-row items-end justify-between">
                <View>
                    <Text className="text-muted-foreground font-inter-medium text-xs mb-1">Students Present</Text>
                    <View className="flex-row items-baseline gap-1">
                        <Text className="text-foreground font-inter-bold text-2xl">
                            {isUpcoming ? 0 : lecture.studentsPresent}
                        </Text>
                        <Text className="text-muted-foreground font-inter-medium text-sm">/ {lecture.totalStudents}</Text>
                    </View>
                </View>

                {/* Progress Bar (Hide for Upcoming?) - Req says "Show 0/student_count if lec is upcoming". Maybe hide progress bar or zero it. */}
                <View className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                    <View
                        className="h-full bg-info rounded-full"
                        style={{ width: `${isUpcoming ? 0 : (lecture.studentsPresent / lecture.totalStudents) * 100}%` }}
                    />
                </View>
            </View>
        </View>
    );
};
