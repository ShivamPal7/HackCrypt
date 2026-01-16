import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Tabs } from "../ui/Tabs";

export function LoginScreen() {
    const [userType, setUserType] = useState("student");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        router.push("/(tabs)");
        console.log("Sign in");
    };

    const handleUserTypeChange = (type: string) => {
        Haptics.selectionAsync();
        setUserType(type);
    };

    const handleSignUp = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        router.push("/signup");
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            >
                <ScrollView
                    contentContainerClassName="flex-grow justify-center px-6 py-10"
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >

                    {/* Logo Section */}
                    <View className="items-center mb-8">
                        <View className="relative">
                            {/* Glow effect */}
                            {/* <View className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary opacity-20 blur-xl rounded-full" /> */}

                            <LinearGradient
                                colors={["#1A5CFF", "#0040E0"]}
                                className="w-24 h-24 rounded-[28px] items-center justify-center mb-6 shadow-lg shadow-primary/20 overflow-hidden"
                            >
                                <View className="bg-white rounded-lg p-3">
                                    <Ionicons name="list-outline" size={32} color="#1A5CFF" />
                                    <View className="absolute bottom-2 right-2 bg-[#1A5CFF] rounded-full p-[2px] border-2 border-white">
                                        <Ionicons name="checkmark" size={10} color="white" />
                                    </View>
                                </View>
                            </LinearGradient>
                        </View>

                        <Text className="text-4xl font-sora-bold text-foreground mb-3 tracking-tight">
                            Attendix
                        </Text>
                        <Text className="text-muted-foreground text-center text-lg font-inter-medium leading-relaxed max-w-[280px]">
                            Your attendance, simplified and secured
                        </Text>
                    </View>

                    {/* Form Section */}
                    <View className="space-y-8 w-full max-w-sm mx-auto">
                        <Animated.View entering={FadeInDown.duration(400)}>
                            <Tabs
                                options={[
                                    { label: "Student", value: "student" },
                                    { label: "Instructor", value: "instructor" },
                                ]}
                                value={userType}
                                onChange={handleUserTypeChange}
                                className="mb-6"
                            />
                        </Animated.View>

                        <Animated.View
                            entering={FadeInDown.delay(100).duration(400)}
                            className="gap-y-6"
                        >
                            <Input
                                label="Email address"
                                placeholder="name@university.edu"
                                leftIcon="mail"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />

                            <View className="gap-y-2">
                                <View className="flex-row justify-between items-center">
                                    <Text className="text-muted-foreground uppercase text-xs font-inter-bold tracking-wider ml-1">
                                        Password
                                    </Text>
                                    <TouchableOpacity onPress={() => router.push("/forgot-password")}>
                                        <Text className="text-primary font-inter-bold text-sm">Forgot?</Text>
                                    </TouchableOpacity>
                                </View>
                                <Input
                                    placeholder="••••••••"
                                    leftIcon="lock-closed"
                                    secureTextEntry
                                    value={password}
                                    onChangeText={setPassword}
                                />
                            </View>
                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay(200).duration(400)}>
                            <Button
                                className="mt-6 shadow-lg shadow-primary/20"
                                onPress={handleSignIn}
                            >
                                <View className="flex-row items-center justify-center space-x-2">
                                    <Text className="text-primary-foreground font-inter-semibold text-lg mr-2">Sign In</Text>
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
                            Don't have an account?
                        </Text>
                        <TouchableOpacity onPress={handleSignUp}>
                            <Text className="text-primary font-inter-bold">Sign up</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
