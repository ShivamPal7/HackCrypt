import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { cn } from '../../lib/utils'; // Assuming this utility exists from previous steps
import { Course } from '../../types/domain';

import { Link } from 'expo-router';

interface CourseCardProps {
    course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
    const getIcon = () => {
        switch (course.iconName) {
            case 'function': return <MaterialCommunityIcons name="sigma" size={24} color="#38BDF8" />;
            case 'laptop': return <MaterialCommunityIcons name="xml" size={24} color="#C084FC" />; // xml icon looks like >_
            case 'code': return <MaterialCommunityIcons name="xml" size={24} color="#C084FC" />;
            case 'history': return <Feather name="feather" size={24} color="#FB923C" />;
            default: return <Feather name="book" size={24} color="#9AA4B2" />;
        }
    };

    const getIconBg = () => {
        // If we provided a themeColor in mock, use it, but for consistent tailwind classes we might map:
        if (course.iconName === 'function') return "bg-info/10"; // Blueish
        if (course.iconName === 'code' || course.iconName === 'laptop') return 'bg-purple-500/10';
        if (course.iconName === 'history') return 'bg-orange-500/10';
        return 'bg-muted';
    };

    // Determine attendance color
    const getAttendanceColor = () => {
        if (course.percentage >= 90) return 'text-success bg-success/10 border-success/20';
        if (course.percentage >= 80) return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
        if (course.percentage >= 70) return 'text-warning bg-warning/10 border-warning/20';
        return 'text-destructive bg-destructive/10 border-destructive/20';
    };

    const attStyle = getAttendanceColor().split(' ');

    return (
        <View className="bg-card rounded-[24px] p-5 mb-4 border border-border">
            {/* Header: Icon and Attendance Badge */}
            <View className="flex-row justify-between items-start mb-4">
                <View className={cn("h-12 w-12 rounded-2xl items-center justify-center", getIconBg())}>
                    {getIcon()}
                </View>
                <View className={cn("px-3 py-1.5 rounded-full border", attStyle[1], attStyle[2])}>
                    <Text className={cn("font-inter-bold text-[10px] uppercase", attStyle[0])}>
                        {course.percentage}% Attendance
                    </Text>
                </View>
            </View>

            {/* Course Info */}
            <View className="mb-6">
                <Text className="text-foreground font-inter-bold text-xl mb-1.5">
                    {course.title}
                </Text>
                <Text className="text-muted-foreground font-inter text-sm">
                    {course.professor} • {course.location}
                </Text>
            </View>

            <View className="h-[1px] bg-border mb-4" />

            {/* Footer: Avatars + View Details */}
            <View className="flex-row justify-between items-center">
                {/* Face Pile */}
                <View className="flex-row items-center pl-2">
                    {course.studentAvatars.map((url, index) => (
                        <View
                            key={index}
                            className="h-8 w-8 rounded-full border-2 border-card -ml-2 overflow-hidden bg-muted"
                        >
                            <Image
                                source={{ uri: url }}
                                className="h-full w-full"
                                resizeMode="cover"
                            />
                        </View>
                    ))}
                    <View className="h-8 w-8 rounded-full border-2 border-card -ml-2 bg-secondary items-center justify-center">
                        <Text className="text-white text-[10px] font-inter-bold">
                            +{course.totalStudents}
                        </Text>
                    </View>
                </View>

                {/* Link */}
                <TouchableOpacity
                    className="flex-row items-center gap-1"
                    onPress={() => {
                        // In a real app we'd pass the ID, but for this demo:
                        // We need to navigate to standard non-tab route
                        // Assuming using 'push' or just href if typed
                        // But since I don't have the router hook here, I might need to import it or use Link
                        // Let's use Link or router from expo-router
                    }}
                >
                    <Link href="/course-details" asChild>
                        <TouchableOpacity className="flex-row items-center gap-1">
                            <Text className="text-info font-inter-bold text-sm">View Details</Text>
                            <Feather name="chevron-right" size={16} color="#38BDF8" />
                        </TouchableOpacity>
                    </Link>
                </TouchableOpacity>
            </View>
        </View>
    );
}
