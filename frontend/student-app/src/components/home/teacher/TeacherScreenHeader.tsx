import { Image, Text, TouchableOpacity, View } from 'react-native';
import { InstructorUser } from '../../../types/domain';

interface TeacherScreenHeaderProps {
    title: string;
    user?: InstructorUser;
    rightElement?: React.ReactNode;
}

export function TeacherScreenHeader({ title, user, rightElement }: TeacherScreenHeaderProps) {
    return (
        <View className="flex-row items-center justify-between mb-6 pt-2">
            <Text className="text-foreground font-inter-bold text-2xl">
                {title}
            </Text>         

            {rightElement}

            {!rightElement && user && (
                <TouchableOpacity className="h-10 w-10 rounded-full border-2 border-primary/20 overflow-hidden">
                    <Image
                        source={{ uri: user.avatarUrl }}
                        className="h-full w-full"
                        resizeMode="cover"
                    />
                </TouchableOpacity>
            )}
        </View>
    );
}
