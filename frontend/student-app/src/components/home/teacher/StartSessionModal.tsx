import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useEffect, useState } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { todaysLectures } from '../../../data/mock';

const DURATION_CHIPS = [
    { label: '10 min', value: 10 },
    { label: '30 min', value: 30 },
    { label: '1 hr', value: 60 },
];

interface StartSessionModalProps {
    visible: boolean;
    onClose: () => void;
}

export const StartSessionModal = ({ visible, onClose }: StartSessionModalProps) => {
    const [selectedLecture, setSelectedLecture] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Time State
    const [startTime, setStartTime] = useState('09:00 AM');
    const [endTime, setEndTime] = useState('10:00 AM');

    // Filter mainly upcoming lectures for the dropdown
    const upcomingLectures = todaysLectures.filter(l => l.status !== 'completed');

    // Reset state when modal opens
    useEffect(() => {
        if (visible) {
            const now = new Date();
            setStartTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            setEndTime('');
            setSelectedLecture('');
            setIsDropdownOpen(false);
        }
    }, [visible]);

    const handleDurationSelect = (minutes: number) => {
        Haptics.selectionAsync();

        // Parse start time (Expected format: "HH:MM AM/PM")
        let startH = 9;
        let startM = 0;
        let isPM = false;

        if (startTime) {
            const timeParts = startTime.split(':');
            if (timeParts.length === 2) {
                startH = parseInt(timeParts[0]);
                const minParts = timeParts[1].split(' ');
                startM = parseInt(minParts[0]);
                if (minParts.length > 1) {
                    isPM = minParts[1].toUpperCase() === 'PM';
                }
            }
        }

        // Convert to minutes from midnight
        if (isPM && startH !== 12) startH += 12;
        if (!isPM && startH === 12) startH = 0;

        let totalStartMins = startH * 60 + startM;
        let totalEndMins = totalStartMins + minutes;

        // Convert back to HH:MM AM/PM
        let endH = Math.floor(totalEndMins / 60);
        let endM = totalEndMins % 60;

        let endPeriod = 'AM';
        if (endH >= 12) {
            endPeriod = 'PM';
            if (endH > 12) endH -= 12;
        }
        if (endH === 0) endH = 12;

        setEndTime(`${endH}:${endM.toString().padStart(2, '0')} ${endPeriod}`);
    };

    const handleStartSession = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        console.log("Session Started", { selectedLecture, startTime, endTime });
        onClose();
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
                        <Text className="text-foreground font-inter-bold text-xl">Start New Session</Text>
                        <TouchableOpacity onPress={onClose}>
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
    );
};
