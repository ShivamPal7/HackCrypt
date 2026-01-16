import { Feather } from '@expo/vector-icons';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { User } from '../../types/domain';

interface ProfileAvatarProps {
    user: User;
}

export function ProfileAvatar({ user }: ProfileAvatarProps) {
    return (
        <View className="items-center justify-center my-6">
            <View className="relative">
                <Image
                    source={{ uri: user.avatarUrl }}
                    className="h-28 w-28 rounded-full bg-muted"
                    resizeMode="cover"
                />
                <TouchableOpacity
                    className="absolute bottom-0 right-0 h-9 w-9 bg-info rounded-full items-center justify-center border-4 border-background"
                >
                    <Feather name="camera" size={16} color="white" />
                </TouchableOpacity>
            </View>
            <Text className="text-muted-foreground font-inter text-sm mt-4">
                Student ID: {user.studentId}
            </Text>
        </View>
    );
}
