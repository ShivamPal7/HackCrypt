import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LectureCard } from '../../src/components/home/teacher/LectureCard';
import { CreateLectureModal } from '../../src/components/lectures/CreateLectureModal';
import { DaySelector } from '../../src/components/ui/DaySelector';
import { FilterDropdown } from '../../src/components/ui/FilterDropdown';
import { todaysLectures } from '../../src/data/mock';

// Constants
const STATUS_OPTIONS = ['All', 'Live', 'Upcoming', 'Completed'];
const DEPT_OPTIONS = ['All', 'CS', 'Math', 'Design', 'Physics'];
const SUBJECT_OPTIONS = ['All', 'UI Design', 'Calculus', 'Physics II', 'History'];

export default function LecturesScreen() {
    // State
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [statusFilter, setStatusFilter] = useState('All');
    const [deptFilter, setDeptFilter] = useState('All');
    const [subjectFilter, setSubjectFilter] = useState('All');

    const [isModalVisible, setIsModalVisible] = useState(false);

    // Filtering Logic
    const filteredLectures = todaysLectures.filter(lecture => {
        const statusMatch = statusFilter === 'All' || lecture.status.toLowerCase() === statusFilter.toLowerCase();
        // Fuzzy match department code
        const deptMatch = deptFilter === 'All' || lecture.courseCode.includes(deptFilter.toUpperCase());
        // Fuzzy match title
        const subjectMatch = subjectFilter === 'All' || lecture.title.includes(subjectFilter);

        // Date match (Mock: assume mock data matches if date is today, logic can be expanded)
        const dateMatch = true; // In real app: isSameDay(new Date(lecture.startTime), selectedDate)

        return statusMatch && deptMatch && subjectMatch && dateMatch;
    });

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <View className="flex-1 px-5">
                {/* Header with Day Selector */}
                <View className="flex-row justify-between mb-6 mt-4 pt-2 items-center h-12">
                    <View className="justify-center">
                        <Text className="text-foreground font-inter-bold text-2xl">
                            Lectures
                        </Text>
                        <Text className="text-muted-foreground font-inter text-sm">
                            Class Schedule
                        </Text>
                    </View>

                    <DaySelector
                        selectedDate={selectedDate}
                        onSelectDate={setSelectedDate}
                    />
                </View>

                {/* Filters Row */}
                <View className="flex-row gap-3 mb-6 z-10">
                    <FilterDropdown
                        label="Status"
                        value={statusFilter}
                        options={STATUS_OPTIONS}
                        onSelect={setStatusFilter}
                    />
                    <FilterDropdown
                        label="Department"
                        value={deptFilter}
                        options={DEPT_OPTIONS}
                        onSelect={setDeptFilter}
                    />
                    <FilterDropdown
                        label="Subject"
                        value={subjectFilter}
                        options={SUBJECT_OPTIONS}
                        onSelect={setSubjectFilter}
                    />
                </View>

                {/* List */}
                <FlatList
                    data={filteredLectures}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <LectureCard lecture={item} />}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View className="items-center justify-center py-20">
                            <Text className="text-muted-foreground font-inter-medium">No lectures found.</Text>
                        </View>
                    }
                />
            </View>

            {/* FAB */}
            <TouchableOpacity
                onPress={() => setIsModalVisible(true)}
                className="absolute bottom-8 right-5 w-16 h-16 bg-primary rounded-full items-center justify-center shadow-lg shadow-primary/30"
            >
                <Feather name="plus" size={32} color="#0B0F14" />
            </TouchableOpacity>

            {/* Creation Modal */}
            <CreateLectureModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
            />
        </SafeAreaView>
    );
}
