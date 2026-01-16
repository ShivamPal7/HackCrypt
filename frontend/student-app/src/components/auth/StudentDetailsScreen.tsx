import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { ProfileDropdown } from "../profile/ProfileDropdown";
import { ProfileField } from "../profile/ProfileField";
import { Button } from "../ui/Button";

export function StudentDetailsScreen() {
    const router = useRouter();
    const [rollNo, setRollNo] = useState("");
    const [department, setDepartment] = useState("");
    const [studentClass, setStudentClass] = useState("");

    const departments = ["Computer Science", "Information Technology", "Electronics & Communication", "Mechanical", "Civil"];
    const classes = ["Class A", "Class B", "Class C", "Class D"];

    const handleComplete = () => {
        if (!rollNo || !department || !studentClass) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            return;
        }

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        router.push("/registration-success");
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
            <StatusBar style="light" />

            {/* Header */}
            <View className="flex-row items-center justify-between px-6 py-4">
                <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center -ml-2">
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-white font-inter-bold text-lg">Student Details</Text>
                <View className="w-10" />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            >
                <ScrollView
                    contentContainerClassName="flex-grow px-6 pb-10 pt-4"
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Title Section */}
                    <Animated.View entering={FadeInDown.duration(400)} className="mb-8">
                        <Text className="text-3xl font-sora-bold text-foreground mb-3 tracking-tight">
                            More About You
                        </Text>
                        <Text className="text-muted-foreground text-lg font-inter-medium leading-relaxed">
                            Please provide your academic details to complete your profile.
                        </Text>
                    </Animated.View>

                    {/* Form Section */}
                    <View className="space-y-4">
                        <Animated.View entering={FadeInDown.delay(100).duration(400)}>
                            <ProfileField
                                label="Roll Number"
                                value={rollNo}
                                onChangeText={setRollNo}
                            />
                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay(200).duration(400)}>
                            <ProfileDropdown
                                label="Department"
                                value={department || "Select Department"}
                                options={departments}
                                onSelect={setDepartment}
                            />
                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay(300).duration(400)}>
                            <ProfileDropdown
                                label="Class"
                                value={studentClass || "Select Class"}
                                options={classes}
                                onSelect={setStudentClass}
                            />
                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay(400).duration(400)}>
                            <Button
                                className="mt-6 shadow-lg shadow-primary/20"
                                onPress={handleComplete}
                            >
                                <View className="flex-row items-center justify-center space-x-2">
                                    <Text className="text-primary-foreground font-inter-semibold text-lg mr-2">Complete Registration</Text>
                                    <Ionicons name="checkmark-circle" size={20} color="#0B0F14" />
                                </View>
                            </Button>
                        </Animated.View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
