import { Image, Text, TouchableOpacity, View } from 'react-native';
import { User } from '../../types/domain';

interface ClassesHeaderProps {
    user: User;
}

export function ClassesHeader({ user }: ClassesHeaderProps) {
    return (
        <View className="flex-row items-center justify-between mb-2 mt-2">
            <Text className="text-foreground font-inter-bold text-2xl">
                My Classes
            </Text>

            <TouchableOpacity className="h-10 w-10 rounded-full border-2 border-primary/20 overflow-hidden">
                <Image
                    source={{ uri: user.avatarUrl }}
                    className="h-full w-full"
                    resizeMode="cover"
                />
            </TouchableOpacity>
        </View>
    );
}
