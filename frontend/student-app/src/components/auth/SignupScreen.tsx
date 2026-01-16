import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Tabs } from "../ui/Tabs";

export function SignupScreen() {
    const router = useRouter();
    const [userType, setUserType] = useState("student");
    const [fullName, setFullName] = useState("");
    const [universityId, setUniversityId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        router.push("/verify-email");
    };

    const handleUserTypeChange = (type: string) => {
        Haptics.selectionAsync();
        setUserType(type);
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
            <StatusBar style="light" />

            {/* Header */}
            <View className="flex-row items-center justify-between px-6 py-4">
                <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center -ml-2">
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-white font-inter-bold text-lg">Sign Up</Text>
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
                            Create Account
                        </Text>
                        <Text className="text-muted-foreground text-lg font-inter-medium leading-relaxed">
                            Join Attendix to manage your attendance seamlessly.
                        </Text>
                    </Animated.View>

                    {/* Form Section */}
                    <View className="space-y-8">
                        <Animated.View entering={FadeInDown.delay(100).duration(400)}>
                            <Tabs
                                options={[
                                    { label: "Student", value: "student" },
                                    { label: "Instructor", value: "instructor" },
                                ]}
                                value={userType}
                                onChange={handleUserTypeChange}
                                className="mb-2"
                            />
                        </Animated.View>

                        <Animated.View
                            entering={FadeInDown.delay(200).duration(400)}
                            className="gap-y-6 pt-2"
                        >
                            <Input
                                label="Full Name"
                                placeholder="John Doe"
                                value={fullName}
                                onChangeText={setFullName}
                                autoCapitalize="words"
                            />

                            <Input
                                label="University ID"
                                placeholder="U-2023-0001"
                                value={universityId}
                                onChangeText={setUniversityId}
                                autoCapitalize="characters"
                            />

                            <Input
                                label="Email Address"
                                placeholder="name@university.edu"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />

                            <Input
                                label="Password"
                                placeholder="••••••••"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                                rightIcon="eye"
                            />
                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay(300).duration(400)}>
                            <Button
                                className="mt-6 shadow-lg shadow-primary/20"
                                onPress={handleSignUp}
                            >
                                <View className="flex-row items-center justify-center space-x-2">
                                    <Text className="text-primary-foreground font-inter-semibold text-lg mr-2">Sign Up</Text>
                                    <Ionicons name="arrow-forward" size={20} color="#0B0F14" />
                                </View>
                            </Button>
                        </Animated.View>
                    </View>

                    {/* Footer */}
                    <Animated.View
                        entering={FadeIn.delay(400).duration(500)}
                        className="flex-row justify-center mt-auto pt-10"
                    >
                        <Text className="text-muted-foreground mr-1 font-inter-medium">
                            Already have an account?
                        </Text>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Text className="text-primary font-inter-bold">Log In</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
