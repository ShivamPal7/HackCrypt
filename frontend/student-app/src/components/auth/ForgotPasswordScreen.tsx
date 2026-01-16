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

export function ForgotPasswordScreen() {
    const router = useRouter();
    const [email, setEmail] = useState("");

    const handleSendCode = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        router.push("/verify-reset-otp");
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
                            Reset Password
                        </Text>
                        <Text className="text-muted-foreground text-lg font-inter-medium leading-relaxed">
                            Enter your email address to receive a recovery code.
                        </Text>
                    </Animated.View>

                    <Animated.View
                        entering={FadeInDown.delay(100).duration(400)}
                        className="gap-y-6"
                    >
                        <Input
                            label="Email Address"
                            placeholder="name@university.edu"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            leftIcon="mail"
                        />

                        <Button
                            className="mt-2 shadow-lg shadow-primary/20"
                            onPress={handleSendCode}
                        >
                            <View className="flex-row items-center justify-center space-x-2">
                                <Text className="text-primary-foreground font-inter-semibold text-lg mr-2">Send Recovery Code</Text>
                                <Ionicons name="arrow-forward" size={20} color="#0B0F14" />
                            </View>
                        </Button>
                    </Animated.View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
