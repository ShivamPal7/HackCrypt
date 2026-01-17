import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Animated, { FadeIn, FadeInUp, FadeOut, SlideInDown } from 'react-native-reanimated';

export type ModalType = 'alert' | 'action-sheet' | 'success' | 'error';

export interface ModalOption {
    label: string;
    onPress: () => void;
    icon?: keyof typeof Ionicons.glyphMap;
    isDestructive?: boolean;
    isCancel?: boolean;
}

interface CustomModalProps {
    visible: boolean;
    type: ModalType;
    title: string;
    message?: string;
    onClose: () => void;
    options?: ModalOption[]; // For action-sheet
    confirmText?: string; // For alert
    onConfirm?: () => void; // For alert
}

export function CustomModal({
    visible,
    type,
    title,
    message,
    onClose,
    options = [],
    confirmText = 'OK',
    onConfirm,
}: CustomModalProps) {

    const renderIcon = () => {
        switch (type) {
            case 'success':
                return (
                    <View className="w-12 h-12 rounded-full bg-green-500/20 items-center justify-center mb-4">
                        <Ionicons name="checkmark" size={24} color="#22c55e" />
                    </View>
                );
            case 'error':
                return (
                    <View className="w-12 h-12 rounded-full bg-red-500/20 items-center justify-center mb-4">
                        <Ionicons name="alert-circle" size={24} color="#ef4444" />
                    </View>
                );
            default:
                return null;
        }
    };

    const renderContent = () => {
        if (type === 'action-sheet') {
            return (
                <Animated.View
                    entering={SlideInDown.duration(300)}
                    exiting={FadeOut}
                    className="w-full bg-card rounded-t-3xl border-t border-border overflow-hidden pb-10"
                >
                    <View className="w-12 h-1.5 bg-muted rounded-full self-center mt-3 mb-6" />

                    <View className="px-6 mb-2">
                        <Text className="text-xl font-sora-bold text-foreground mb-2 text-center">{title}</Text>
                        {message && <Text className="text-muted-foreground text-center font-inter-medium mb-6">{message}</Text>}
                    </View>

                    <View className="px-6 space-y-3">
                        {options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    option.onPress();
                                    onClose();
                                }}
                                className={`w-full p-4 rounded-xl flex-row items-center justify-between
                                    ${option.isCancel ? 'bg-muted/10' : 'bg-muted/5'}
                                    ${option.isDestructive ? 'border border-destructive/20 bg-destructive/5' : ''}
                                `}
                            >
                                <View className="flex-row items-center space-x-3">
                                    {option.icon && (
                                        <Ionicons
                                            name={option.icon}
                                            size={20}
                                            color={option.isDestructive ? '#ef4444' : option.isCancel ? '#9ca3af' : '#ffffff'}
                                        />
                                    )}
                                    <Text className={`font-inter-bold text-base ml-2
                                        ${option.isDestructive ? 'text-destructive' : 'text-foreground'}
                                        ${option.isCancel ? 'text-muted-foreground' : ''}
                                    `}>
                                        {option.label}
                                    </Text>
                                </View>
                                {!option.isCancel && <Ionicons name="chevron-forward" size={18} color="#52525b" />}
                            </TouchableOpacity>
                        ))}
                    </View>
                </Animated.View>
            );
        }

        // Alert / Success / Error
        return (
            <Animated.View
                entering={FadeInUp.duration(300)}
                exiting={FadeOut}
                className="w-[85%] bg-card rounded-3xl border border-border p-6 items-center shadow-xl"
            >
                {renderIcon()}
                <Text className="text-xl font-sora-bold text-foreground mb-2 text-center">{title}</Text>
                {message && <Text className="text-muted-foreground text-center font-inter-medium mb-6 leading-relaxed">{message}</Text>}

                <TouchableOpacity
                    onPress={() => {
                        if (onConfirm) onConfirm();
                        onClose();
                    }}
                    className="w-full bg-primary h-12 rounded-xl items-center justify-center shadow-lg shadow-primary/20"
                >
                    <Text className="text-primary-foreground font-inter-bold text-base">{confirmText}</Text>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    return (
        <Modal
            transparent
            visible={visible}
            animationType="none"
            onRequestClose={onClose}
            statusBarTranslucent
        >
            <View className="flex-1 bg-black/60 justify-center items-center">
                <TouchableWithoutFeedback onPress={onClose}>
                    <Animated.View entering={FadeIn} exiting={FadeOut} className="absolute inset-0 bg-black/60" />
                </TouchableWithoutFeedback>

                <View className={`flex-1 w-full ${type === 'action-sheet' ? 'justify-end' : 'justify-center items-center'}`}>
                    {renderContent()}
                </View>
            </View>
        </Modal>
    );
}
