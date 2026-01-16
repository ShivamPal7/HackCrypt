import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

export function ChangePasswordScreen() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleResetPassword = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        router.push("/password-reset-success");
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
            <StatusBar style="light" />

            {/* Header */}
            <View className="px-6 py-4">
                <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center -ml-2">
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            >
                <ScrollView
                    contentContainerClassName="flex-grow px-6 pb-10"
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <Animated.View entering={FadeInDown.duration(400)} className="mb-8">
                        <Text className="text-3xl font-sora-bold text-foreground mb-4">
                            New Password
                        </Text>
                        <Text className="text-muted-foreground text-lg font-inter-medium leading-relaxed">
                            Your new password must be different from previously used passwords.
                        </Text>
                    </Animated.View>

                    <Animated.View
                        entering={FadeInDown.delay(100).duration(400)}
                        className="gap-y-6"
                    >
                        <Input
                            label="New Password"
                            placeholder="••••••••"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                            leftIcon="lock-closed"
                        />

                        <Input
                            label="Confirm Password"
                            placeholder="••••••••"
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            leftIcon="lock-closed"
                        />

                        <Button
                            className="mt-4 shadow-lg shadow-primary/20"
                            onPress={handleResetPassword}
                        >
                            <View className="flex-row items-center justify-center space-x-2">
                                <Text className="text-primary-foreground font-inter-semibold text-lg mr-2">Reset Password</Text>
                                <Ionicons name="checkmark-circle" size={20} color="#0B0F14" />
                            </View>
                        </Button>
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
