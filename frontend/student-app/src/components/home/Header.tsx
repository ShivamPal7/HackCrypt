import { Ionicons } from '@expo/vector-icons';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { User } from '../../types/domain';

interface HeaderProps {
    user: User;
}

export function Header({ user }: HeaderProps) {
    return (
        <View className="flex-row items-center justify-between mb-6">
            <View className="flex-row items-center gap-3">
                <View className="h-12 w-12 rounded-full border-2 border-primary/20 overflow-hidden">
                    <Image
                        source={{ uri: user.avatarUrl }}
                        className="h-full w-full"
                        resizeMode="cover"
                    />
                </View>
                <View>
                    <Text className="text-muted-foreground font-inter-medium text-sm">
                        Good morning,
                    </Text>
                    <Text className="text-foreground font-inter-bold text-xl">
                        {user.name}
                    </Text>
                </View>
            </View>

            <TouchableOpacity className="h-10 w-10 bg-card rounded-xl items-center justify-center border border-border">
                <Ionicons name="notifications" size={20} color="#E6EDF3" />
                <View className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive border border-card" />
            </TouchableOpacity>
        </View>
    );
}
