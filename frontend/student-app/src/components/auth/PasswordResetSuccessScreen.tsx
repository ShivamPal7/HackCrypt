import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "../ui/Button";

export function PasswordResetSuccessScreen() {
    const router = useRouter();

    const handleBackToLogin = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        router.push("/login");
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
                    {/* Glow Effect */}
                    <View className="absolute w-40 h-40 bg-success/20 blur-3xl rounded-full" />

                    {/* Icon Container */}
                    <View className="w-32 h-32 rounded-full items-center justify-center border-4 border-[#1F2937] shadow-2xl shadow-success/30 overflow-hidden">
                        <LinearGradient
                            colors={['#121823', '#0B0F14']}
                            className="absolute inset-0"
                        />
                        <Ionicons name="checkmark" size={64} color="#22C55E" />
                    </View>
                </Animated.View>

                <Animated.View
                    entering={FadeInDown.delay(300).duration(500)}
                    className="items-center mb-10 w-full"
                >
                    <Text className="text-3xl font-sora-bold text-foreground mb-4 text-center">
                        Password Reset!
                    </Text>
                    <Text className="text-muted-foreground text-center text-lg font-inter-medium leading-relaxed px-4">
                        Your password has been successfully reset. Click below to log in securely.
                    </Text>
                </Animated.View>

                <Animated.View
                    entering={FadeInDown.delay(500).duration(500)}
                    className="w-full"
                >
                    <Button
                        className="w-full shadow-lg shadow-success/20"
                        onPress={handleBackToLogin}
                    >
                        Back to Login
                    </Button>
                </Animated.View>
            </View>
        </SafeAreaView>
    );
}
