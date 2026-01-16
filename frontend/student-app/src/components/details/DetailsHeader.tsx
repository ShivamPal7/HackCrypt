import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export function DetailsHeader() {
    const router = useRouter();

    return (
        <View className="flex-row items-center justify-between py-4">
            <TouchableOpacity
                onPress={() => router.back()}
                className="h-10 w-10 items-center justify-center rounded-full"
            >
                <Feather name="chevron-left" size={28} color="#E6EDF3" />
            </TouchableOpacity>

            <View className="items-center">
                <Text className="text-foreground font-inter-bold text-lg">CS 101: Computer Science</Text>
                <Text className="text-muted-foreground text-xs font-inter">Prof. Alan Turing • Room 302</Text>
            </View>

            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full">
                <MaterialCommunityIcons name="dots-vertical" size={24} color="#E6EDF3" />
            </TouchableOpacity>
        </View>
    );
}
