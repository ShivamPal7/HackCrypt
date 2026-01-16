import { Feather, Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { currentInstructor, teacherStats, todaysLectures } from '../../data/mock';
import { LectureCard } from './teacher/LectureCard';
import { StatCard } from './teacher/StatCard';

const DURATION_CHIPS = [
    { label: '10 min', value: 10 },
    { label: '30 min', value: 30 },
    { label: '1 hr', value: 60 },
];

export const TeacherHome = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedLecture, setSelectedLecture] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Time State
    const [startTime, setStartTime] = useState('09:00 AM');
    const [endTime, setEndTime] = useState('10:00 AM');

    // Filter mainly upcoming lectures for the dropdown
    // (mock logic: treating all for demo, or could filter by status !== 'completed')
    const upcomingLectures = todaysLectures.filter(l => l.status !== 'completed');

    const handleOpenModal = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setIsModalVisible(true);
        // Reset or set defaults
        const now = new Date();
        setStartTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        setEndTime('');
    };

    const handleDurationSelect = (minutes: number) => {
        Haptics.selectionAsync();
        // Simple logic to add minutes to current "startTime" string is complex without full Date parsing.
        // For this demo, we'll simulate setting the text. 
        // In real app, we'd parse startTime -> Date -> add minutes -> format back.
        // Mocking the result for display purposes:
        let label = 'AM';
        let hour = 10;
        if (minutes === 30) hour = 9;
        setEndTime(`${hour}:${minutes === 60 ? '00' : minutes} ${label}`);
    };

    const handleStartSession = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        console.log("Session Started", { selectedLecture, startTime, endTime });
        setIsModalVisible(false);
    };

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="mt-4 mb-8 flex-row items-center justify-between">
                    <View>
                        <Text className="text-muted-foreground font-inter-medium text-sm mb-1">Monday, Oct 23</Text>
                        <Text className="text-foreground font-inter-bold text-2xl">Hello, {currentInstructor.name}</Text>
                    </View>
                    <TouchableOpacity
                        className="h-10 w-10 bg-card rounded-xl items-center justify-center border border-border"
                        onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
                    >
                        <Ionicons name="notifications" size={20} color="#E6EDF3" />
                        <View className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive border border-card" />
                    </TouchableOpacity>
                </View>

                {/* Stats Row */}
                <View className="flex-row mb-6 gap-4">
                    <StatCard label="Avg. Attendance" value={`${teacherStats.avgAttendance}%`} />
                    <StatCard label="Next Class" value={teacherStats.nextClassTime} />
                </View>

                {/* Start New Session Button */}
                <TouchableOpacity
                    className="w-full h-20 bg-primary rounded-3xl items-center justify-center flex-row gap-3 shadow-lg shadow-primary/20 mb-8"
                    onPress={handleOpenModal}
                >
                    <View className="bg-black/20 p-1.5 rounded-full">
                        <Feather name="plus" size={20} color="#0B0F14" />
                    </View>
                    <Text className="text-primary-foreground font-inter-bold text-lg">Start New Session</Text>
                </TouchableOpacity>

                {/* Today's Lectures Section */}
                <View className="flex-row items-center justify-between mb-4">
                    <Text className="text-foreground font-inter-bold text-xl">Today's Lectures</Text>
                    <TouchableOpacity>
                        <Text className="text-info font-inter-bold text-sm">See All</Text>
                    </TouchableOpacity>
                </View>

                {/* Courses List */}
                <View className="pb-10">
                    {todaysLectures.map((lecture) => (
                        <LectureCard key={lecture.id} lecture={lecture} />
                    ))}
                </View>
            </ScrollView>

            {/* Start Session Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View className="flex-1 bg-black/80 justify-center px-5">
                    <View className="bg-card w-full rounded-3xl p-6 border border-border">
                        {/* Modal Header */}
                        <View className="flex-row items-center justify-between mb-6">
                            <Text className="text-foreground font-inter-bold text-xl">Start New Session</Text>
                            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                                <Feather name="x" size={24} color="#9AA4B2" />
                            </TouchableOpacity>
                        </View>

                        {/* Dropdown: Select Lecture */}
                        <View className="mb-4 z-50">
                            <Text className="text-muted-foreground font-inter-medium text-xs mb-2 uppercase tracking-wider">Select Lecture</Text>
                            <TouchableOpacity
                                className="bg-input p-4 rounded-xl border border-border flex-row justify-between items-center"
                                onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <Text className={selectedLecture ? "text-foreground font-inter-medium" : "text-muted-foreground font-inter-medium"}>
                                    {selectedLecture ? upcomingLectures.find(l => l.id === selectedLecture)?.title : "Select upcoming lecture"}
                                </Text>
                                <Feather name="chevron-down" size={20} color="#9AA4B2" />
                            </TouchableOpacity>

                            {isDropdownOpen && (
                                <View className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl overflow-hidden shadow-lg z-50 max-h-48">
                                    <ScrollView nestedScrollEnabled>
                                        {upcomingLectures.map((lecture) => (
                                            <TouchableOpacity
                                                key={lecture.id}
                                                className="p-4 border-b border-border last:border-b-0 active:bg-input"
                                                onPress={() => {
                                                    setSelectedLecture(lecture.id);
                                                    setIsDropdownOpen(false);
                                                }}
                                            >
                                                <Text className="text-foreground font-inter-medium">{lecture.title}</Text>
                                                <Text className="text-muted-foreground text-xs">{lecture.courseCode} • {lecture.startTime}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>
                            )}
                        </View>

                        {/* Time Controls */}
                        <View className="flex-row gap-4 mb-6">
                            <View className="flex-1">
                                <Text className="text-muted-foreground font-inter-medium text-xs mb-2 uppercase tracking-wider">Start Time</Text>
                                <TextInput
                                    value={startTime}
                                    onChangeText={setStartTime}
                                    className="bg-input text-foreground p-4 rounded-xl border border-border font-inter-bold text-center"
                                />
                            </View>
                            <View className="flex-1">
                                <Text className="text-muted-foreground font-inter-medium text-xs mb-2 uppercase tracking-wider">End Time</Text>
                                <TextInput
                                    value={endTime}
                                    onChangeText={setEndTime}
                                    placeholder="--"
                                    placeholderTextColor="#4B5563"
                                    className="bg-input text-foreground p-4 rounded-xl border border-border font-inter-bold text-center"
                                />
                            </View>
                        </View>

                        {/* Duration Chips */}
                        <View className="flex-row gap-3 mb-8">
                            {DURATION_CHIPS.map((chip) => (
                                <TouchableOpacity
                                    key={chip.label}
                                    onPress={() => handleDurationSelect(chip.value)}
                                    className="bg-secondary px-4 py-2 rounded-full border border-border"
                                >
                                    <Text className="text-foreground font-inter-medium text-xs">{chip.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Action Button */}
                        <TouchableOpacity
                            className={`w-full h-14 rounded-2xl items-center justify-center ${selectedLecture ? 'bg-primary' : 'bg-muted'}`}
                            onPress={handleStartSession}
                            disabled={!selectedLecture}
                        >
                            <Text className={`font-inter-bold text-base ${selectedLecture ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
                                Start Session Now
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};
