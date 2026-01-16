import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withSpring, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "../ui/Button";

export function RegistrationSuccessScreen() {
    const router = useRouter();
    const pulse = useSharedValue(1);
    const tickScale = useSharedValue(0);

    useEffect(() => {
        // Pulse animation for the glow
        pulse.value = withRepeat(
            withSequence(
                withTiming(1.2, { duration: 1500 }),
                withTiming(1, { duration: 1500 })
            ),
            -1,
            true
        );

        // Simple tick pop animation
        tickScale.value = withDelay(300, withSpring(1, { damping: 12 }));
    }, []);

    const animatedPulseStyle = useAnimatedStyle(() => ({
        transform: [{ scale: pulse.value }],
        opacity: 0.5,
    }));

    const animatedTickStyle = useAnimatedStyle(() => ({
        transform: [{ scale: tickScale.value }],
    }));

    const handleGotIt = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        router.push("/login"); // Navigate back to login
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
            <StatusBar style="light" />

            {/* Background elements */}
            <View className="absolute inset-0 overflow-hidden">
                <View className="absolute top-0 left-0 w-full h-[60%] opacity-10">
                    <LinearGradient
                        colors={['#22C55E', 'transparent']}
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>
            </View>

            <View className="flex-1 items-center justify-center px-6">
                <Animated.View
                    entering={FadeInDown.duration(600)}
                    className="mb-10 items-center justify-center"
                >
                    {/* Pulsing Glow Effect */}
                    <Animated.View style={animatedPulseStyle} className="absolute w-40 h-40 bg-success/20 blur-3xl rounded-full" />

                    {/* Icon Container */}
                    <View className="w-32 h-32 rounded-full items-center justify-center border-4 border-[#1F2937] shadow-2xl shadow-success/30 overflow-hidden">
                        <LinearGradient
                            colors={['#121823', '#0B0F14']}
                            className="absolute inset-0"
                        />
                        <Animated.View style={animatedTickStyle}>
                            <Ionicons name="checkmark" size={64} color="#22C55E" />
                        </Animated.View>
                    </View>
                </Animated.View>

                <Animated.View
                    entering={FadeInDown.delay(300).duration(500)}
                    className="items-center mb-12 w-full"
                >
                    <Text className="text-3xl font-sora-bold text-foreground mb-4 text-center tracking-tight">
                        Account Created!
                    </Text>
                    <Text className="text-muted-foreground text-center text-lg font-inter-medium leading-relaxed px-4">
                        Your registration was successful. You can now log in to the platform once an admin approves your request.
                    </Text>
                </Animated.View>

                {/* Info Card */}
                <Animated.View
                    entering={FadeInDown.delay(500).duration(500)}
                    className="w-full bg-[#121823] border border-[#1F2937] rounded-2xl p-4 mb-10 flex-row items-start gap-3 shadow-lg"
                >
                    <View className="w-10 h-10 rounded-full bg-blue-500/10 items-center justify-center">
                        <Ionicons
                            name="information-circle-outline"
                            size={22}
                            color="#3B82F6"
                        />
                    </View>

                    <View className="flex-1">
                        <Text className="text-white font-inter-bold text-base mb-1">
                            Approval Pending
                        </Text>
                        <Text className="text-muted-foreground font-inter-regular text-sm leading-5">
                            Admins typically review new accounts within 24 hours. You will receive an
                            email notification.
                        </Text>
                    </View>
                </Animated.View>

                <Animated.View
                    entering={FadeInDown.delay(700).duration(500)}
                    className="w-full"
                >
                    <Button
                        className="w-full shadow-lg shadow-success/20"
                        onPress={handleGotIt}
                    >
                        Return to Login
                    </Button>
                </Animated.View>
            </View>
        </SafeAreaView>
    );
}
