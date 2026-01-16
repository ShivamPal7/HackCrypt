import { Feather } from '@expo/vector-icons';
import { TextInput, View } from 'react-native';

export function SearchBar() {
    return (
        <View className="flex-row items-center bg-card border border-input h-12 rounded-2xl px-4 mt-2 mb-6">
            <Feather name="search" size={20} color="#9AA4B2" />
            <TextInput
                placeholder="Search your classes..."
                placeholderTextColor="#9AA4B2"
                className="flex-1 ml-3 text-foreground font-inter text-base h-full"
            />
        </View>
    );
}
