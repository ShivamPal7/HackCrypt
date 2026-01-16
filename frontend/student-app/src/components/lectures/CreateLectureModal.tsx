import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { DaySelector } from '../ui/DaySelector';

const COURSES = ['CS101 - Intro to UI Design', 'MATH202 - Advanced Calculus', 'DES304 - Product Design', 'PHY201 - Physics II'];
const DEPARTMENTS = ['Computer Science', 'Mathematics', 'Design', 'Physics', 'History'];
const DURATION_CHIPS = [
    { label: '1 hr', value: 60 },
    { label: '90 min', value: 90 },
    { label: '2 hrs', value: 120 },
];

interface CreateLectureModalProps {
    visible: boolean;
    onClose: () => void;
}

export const CreateLectureModal = ({ visible, onClose }: CreateLectureModalProps) => {
    // Form State
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [department, setDepartment] = useState('');
    const [courseName, setCourseName] = useState('');
    const [roomNo, setRoomNo] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    // UI State
    const [isDeptDropdownOpen, setIsDeptDropdownOpen] = useState(false);
    const [isCourseDropdownOpen, setIsCourseDropdownOpen] = useState(false);

    const handleCreate = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        console.log("Create Lecture", { selectedDate, department, courseName, roomNo, startTime, endTime });
        onClose();
        // Reset form (optional, could be done via effect)
        setSelectedDate(new Date());
        setCourseName('');
        setDepartment('');
        setRoomNo('');
        setStartTime('');
        setEndTime('');
    };

    const handleDurationSelect = (minutes: number) => {
        Haptics.selectionAsync();
        // Mock logic to auto-calculate end time based on a hypothetical start time
        // If start time is empty, maybe default to "Now" logic or just set end time text relative to start
        if (!startTime) {
            setStartTime("09:00 AM");
        }
        // Simple string logic for demo
        let startHour = startTime ? parseInt(startTime) : 9;
        if (isNaN(startHour)) startHour = 9;

        const addedHours = Math.floor(minutes / 60);
        const addedMins = minutes % 60;

        let endH = startHour + addedHours;
        const ampm = endH >= 12 ? 'PM' : 'AM';
        if (endH > 12) endH -= 12;

        setEndTime(`${endH}:${addedMins === 0 ? '00' : addedMins} ${ampm}`);
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-black/80 justify-center px-5">
                <View className="bg-card w-full rounded-3xl p-6 border border-border">
                    {/* Modal Header */}
                    <View className="flex-row items-center justify-between mb-6">
                        <Text className="text-foreground font-inter-bold text-xl">Create Lecture</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Feather name="x" size={24} color="#9AA4B2" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView className="max-h-[500px]" showsVerticalScrollIndicator={false}>
                        <View className="gap-4 pb-4">

                            {/* Department Dropdown */}
                            <View className="z-50">
                                <Text className="text-muted-foreground font-inter-medium text-xs mb-2 uppercase tracking-wider">DEPARTMENT</Text>
                                <TouchableOpacity
                                    className="bg-input p-4 rounded-xl border border-border flex-row justify-between items-center"
                                    onPress={() => {
                                        setIsDeptDropdownOpen(!isDeptDropdownOpen);
                                        setIsCourseDropdownOpen(false);
                                    }}
                                >
                                    <Text className={department ? "text-foreground font-inter-medium" : "text-muted-foreground font-inter-medium"}>
                                        {department || "Select Department"}
                                    </Text>
                                    <Feather name="chevron-down" size={20} color="#9AA4B2" />
                                </TouchableOpacity>

                                {isDeptDropdownOpen && (
                                    <View className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl overflow-hidden shadow-lg z-50">
                                        <ScrollView nestedScrollEnabled className="max-h-40">
                                            {DEPARTMENTS.map((dept) => (
                                                <TouchableOpacity
                                                    key={dept}
                                                    className="p-4 border-b border-border last:border-b-0 active:bg-input"
                                                    onPress={() => {
                                                        setDepartment(dept);
                                                        setIsDeptDropdownOpen(false);
                                                    }}
                                                >
                                                    <Text className="text-foreground font-inter-medium">{dept}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </ScrollView>
                                    </View>
                                )}
                            </View>

                            {/* Course Dropdown */}
                            <View className="z-40">
                                <Text className="text-muted-foreground font-inter-medium text-xs mb-2 uppercase tracking-wider">COURSE</Text>
                                <TouchableOpacity
                                    className="bg-input p-4 rounded-xl border border-border flex-row justify-between items-center"
                                    onPress={() => {
                                        setIsCourseDropdownOpen(!isCourseDropdownOpen);
                                        setIsDeptDropdownOpen(false);
                                    }}
                                >
                                    <Text className={courseName ? "text-foreground font-inter-medium" : "text-muted-foreground font-inter-medium"}>
                                        {courseName || "Select Course"}
                                    </Text>
                                    <Feather name="chevron-down" size={20} color="#9AA4B2" />
                                </TouchableOpacity>

                                {isCourseDropdownOpen && (
                                    <View className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl overflow-hidden shadow-lg z-50">
                                        <ScrollView nestedScrollEnabled className="max-h-40">
                                            {COURSES.map((course) => (
                                                <TouchableOpacity
                                                    key={course}
                                                    className="p-4 border-b border-border last:border-b-0 active:bg-input"
                                                    onPress={() => {
                                                        setCourseName(course);
                                                        setIsCourseDropdownOpen(false);
                                                    }}
                                                >
                                                    <Text className="text-foreground font-inter-medium">{course}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </ScrollView>
                                    </View>
                                )}
                            </View>

                            {/* Date Selector */}
                            <View className="z-10">
                                <Text className="text-muted-foreground font-inter-medium text-xs mb-2 uppercase tracking-wider">DATE</Text>
                                <DaySelector
                                    selectedDate={selectedDate}
                                    onSelectDate={setSelectedDate}
                                    variant="input"
                                />
                            </View>

                            {/* Room Number */}
                            <View>
                                <Text className="text-muted-foreground font-inter-medium text-xs mb-2 uppercase tracking-wider">ROOM NUMBER</Text>
                                <TextInput
                                    placeholder="e.g. 304"
                                    placeholderTextColor="#4B5563"
                                    value={roomNo}
                                    onChangeText={setRoomNo}
                                    className="bg-input text-foreground p-4 rounded-xl border border-border font-inter-medium"
                                />
                            </View>

                            {/* Time Controls */}
                            <View className="flex-row gap-4">
                                <View className="flex-1">
                                    <Text className="text-muted-foreground font-inter-medium text-xs mb-2 uppercase tracking-wider">START TIME</Text>
                                    <TextInput
                                        placeholder="09:00 AM"
                                        placeholderTextColor="#4B5563"
                                        value={startTime}
                                        onChangeText={setStartTime}
                                        className="bg-input text-foreground p-4 rounded-xl border border-border font-inter-bold text-center"
                                    />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-muted-foreground font-inter-medium text-xs mb-2 uppercase tracking-wider">END TIME</Text>
                                    <TextInput
                                        placeholder="10:00 AM"
                                        placeholderTextColor="#4B5563"
                                        value={endTime}
                                        onChangeText={setEndTime}
                                        className="bg-input text-foreground p-4 rounded-xl border border-border font-inter-bold text-center"
                                    />
                                </View>
                            </View>

                            {/* Duration Chips */}
                            <View className="flex-row gap-3">
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

                        </View>
                    </ScrollView>

                    {/* Action Button */}
                    <TouchableOpacity
                        className="w-full h-14 bg-primary rounded-2xl items-center justify-center mt-4"
                        onPress={handleCreate}
                    >
                        <Text className="text-primary-foreground font-inter-bold text-base">Create Lecture</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};
