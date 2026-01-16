import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

interface ProfileDropdownProps {
    label: string;
    value: string;
    options: string[];
    onSelect: (value: string) => void;
}

export function ProfileDropdown({ label, value, options, onSelect }: ProfileDropdownProps) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className="bg-card w-full p-4 rounded-2xl border border-border mb-4 flex-row items-center justify-between"
            >
                <View className="flex-1 mr-4">
                    <Text className="text-muted-foreground text-[10px] font-inter-bold uppercase tracking-wider mb-1">
                        {label}
                    </Text>
                    <Text className="text-foreground font-inter-bold text-lg">
                        {value}
                    </Text>
                </View>
                <View className="h-10 w-10 bg-muted/10 rounded-full items-center justify-center">
                    <Feather name="chevron-down" size={20} color="#9AA4B2" />
                </View>
            </TouchableOpacity>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View className="flex-1 bg-black/50 items-center justify-center p-5">
                        <TouchableWithoutFeedback>
                            <View className="bg-card w-full rounded-2xl border border-border overflow-hidden max-h-[50%]">
                                <View className="p-4 border-b border-border bg-muted/20">
                                    <Text className="text-foreground font-inter-bold text-center">Select {label}</Text>
                                </View>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    {options.map((option, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            className={`p-4 border-b border-border/50 active:bg-muted/10 ${value === option ? 'bg-info/10' : ''}`}
                                            onPress={() => {
                                                onSelect(option);
                                                setModalVisible(false);
                                            }}
                                        >
                                            <Text
                                                className={`font-inter-medium text-base ${value === option ? 'text-info font-inter-bold' : 'text-foreground'}`}
                                            >
                                                {option}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                                <TouchableOpacity
                                    className="p-4 items-center justify-center bg-muted/10"
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text className="text-muted-foreground font-inter-bold">Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
}
