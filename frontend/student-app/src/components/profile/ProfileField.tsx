import { Feather } from '@expo/vector-icons';
import { useRef } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { cn } from '../../lib/utils';

interface ProfileFieldProps {
    label: string;
    value: string;
    onChangeText?: (text: string) => void;
    editable?: boolean;
}

export function ProfileField({ label, value, onChangeText, editable = true }: ProfileFieldProps) {
    const inputRef = useRef<TextInput>(null);

    const handleEditPress = () => {
        inputRef.current?.focus();
    };

    return (
        <View className="bg-card w-full p-4 rounded-2xl border border-border mb-4 flex-row items-center justify-between">
            <View className="flex-1 mr-4">
                <Text className="text-muted-foreground text-[10px] font-inter-bold uppercase tracking-wider mb-1">
                    {label}
                </Text>
                <TextInput
                    ref={inputRef}
                    value={value}
                    onChangeText={onChangeText}
                    editable={editable}
                    className={cn(
                        "text-foreground font-inter-bold text-lg p-0",
                        editable ? "opacity-100" : "opacity-50"
                    )}
                    placeholder={`Enter ${label}`}
                    placeholderTextColor="#4B5563"
                />
            </View>
            {editable && (
                <TouchableOpacity
                    onPress={handleEditPress}
                    className="h-10 w-10 bg-muted/10 rounded-full items-center justify-center"
                >
                    <Feather name="edit-2" size={16} color="#9AA4B2" />
                </TouchableOpacity>
            )}
        </View>
    );
}
