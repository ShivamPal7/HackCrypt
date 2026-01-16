import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, TouchableOpacity, View } from 'react-native';

export function QuickCheckIn() {
    return (
        <TouchableOpacity className="w-full mt-4 active:opacity-90">
            <LinearGradient
                colors={['#2563EB', '#3B82F6']} // Blue gradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="rounded-[2rem] p-4 flex-row items-center justify-center gap-3 h-16"
            >
                <MaterialCommunityIcons name="qrcode-scan" size={24} color="white" />
                <View>
                    <Text className="text-white font-inter-bold text-lg leading-tight">
                        Quick Check-in
                    </Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
}
