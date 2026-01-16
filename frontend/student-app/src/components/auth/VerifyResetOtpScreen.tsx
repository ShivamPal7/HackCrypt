import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "../ui/Button";

export function VerifyResetOtpScreen() {
    const router = useRouter();
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [timeLeft, setTimeLeft] = useState(59);
    const inputRefs = useRef<Array<TextInput | null>>([]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const handleOtpChange = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        router.push("/change-password");
    };

    const handleResend = () => {
        if (timeLeft === 0) {
            Haptics.selectionAsync();
            setTimeLeft(59);
            console.log("Resend code");
        }
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
                    <Animated.View entering={FadeInDown.duration(400)} className="mb-10">
                        <Text className="text-3xl font-sora-bold text-foreground mb-4">
                            Verify Code
                        </Text>
                        <Text className="text-muted-foreground text-base font-inter-medium leading-relaxed">
                            Please enter the code we just sent to your email address.
                        </Text>
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(100).duration(400)}>
                        <View className="flex-row justify-between mb-10">
                            {otp.map((digit, index) => (
                                <View key={index} className="relative">
                                    <TextInput
                                        ref={(ref) => (inputRefs.current[index] = ref)}
                                        className={`w-[72px] h-[72px] rounded-2xl border-2 text-center text-3xl font-sora-regular bg-[#121823] text-foreground focus:border-primary border-input`}
                                        style={{ lineHeight: 32 }}
                                        maxLength={1}
                                        keyboardType="number-pad"
                                        value={digit}
                                        onChangeText={(text) => handleOtpChange(text, index)}
                                        onKeyPress={(e) => handleKeyPress(e, index)}
                                        selectTextOnFocus
                                        selectionColor="#1A5CFF"
                                        placeholder="-"
                                        placeholderTextColor="#2A3441"
                                    />
                                </View>
                            ))}
                        </View>

                        <Button
                            className="shadow-lg shadow-primary/20 mb-8"
                            onPress={handleVerify}
                        >
                            Verify Code
                        </Button>

                        <View className="items-center">
                            <Text className="text-muted-foreground font-inter-medium mb-2">
                                Didn't receive a code?
                            </Text>

                            <TouchableOpacity
                                onPress={handleResend}
                                disabled={timeLeft > 0}
                                className="mb-6"
                            >
                                <Text className={`font-inter-bold text-base ${timeLeft > 0 ? "text-muted-foreground opacity-50" : "text-primary"}`}>
                                    Resend Code
                                </Text>
                            </TouchableOpacity>

                            <View className="bg-[#1A2232] px-4 py-2 rounded-full flex-row items-center space-x-2">
                                <Ionicons name="time-outline" size={16} color="#9AA4B2" />
                                <Text className="text-muted-foreground font-inter-medium text-sm ml-2">
                                    Resend in <Text className="text-foreground font-inter-bold">{formatTime(timeLeft)}</Text>
                                </Text>
                            </View>
                        </View>
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
