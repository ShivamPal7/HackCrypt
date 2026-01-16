import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface FilterDropdownProps {
    label: string;
    value: string;
    options: string[];
    onSelect: (value: string) => void;
}

export const FilterDropdown = ({ label, value, options, onSelect }: FilterDropdownProps) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <View className="flex-1">
            <Text className="text-muted-foreground font-inter-medium text-[10px] mb-1.5 uppercase tracking-wider pl-1">
                {label}
            </Text>

            <TouchableOpacity
                onPress={() => setIsVisible(true)}
                className="bg-card border border-border rounded-xl h-10 px-3 flex-row items-center justify-between"
            >
                <Text
                    className="text-foreground font-inter-medium text-xs flex-1 mr-2"
                    numberOfLines={1}
                >
                    {value}
                </Text>
                <Feather name="chevron-down" size={14} color="#9AA4B2" />
            </TouchableOpacity>

            <Modal
                transparent
                visible={isVisible}
                animationType="fade"
                onRequestClose={() => setIsVisible(false)}
            >
                <TouchableOpacity
                    className="flex-1 bg-black/50"
                    activeOpacity={1}
                    onPress={() => setIsVisible(false)}
                >
                    <View className="flex-1 justify-center px-6">
                        <View className="bg-card rounded-2xl border border-border p-2 max-h-[50%]">
                            <Text className="text-muted-foreground font-inter-bold text-xs uppercase p-3 border-b border-border mb-2">
                                Select {label}
                            </Text>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {options.map((option) => (
                                    <TouchableOpacity
                                        key={option}
                                        onPress={() => {
                                            onSelect(option);
                                            setIsVisible(false);
                                        }}
                                        className={`p-3 rounded-lg flex-row items-center justify-between ${value === option ? 'bg-primary/10' : 'active:bg-input'
                                            }`}
                                    >
                                        <Text className={`font-inter-medium text-sm ${value === option ? 'text-primary' : 'text-foreground'
                                            }`}>
                                            {option}
                                        </Text>
                                        {value === option && (
                                            <Feather name="check" size={16} color="#6CFFC4" />
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};
