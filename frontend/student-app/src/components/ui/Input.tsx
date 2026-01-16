import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { cn } from "../../lib/utils";

interface InputProps extends React.ComponentProps<typeof TextInput> {
    label?: string;
    error?: string;
    leftIcon?: keyof typeof Ionicons.glyphMap;
    rightIcon?: keyof typeof Ionicons.glyphMap;
    onRightIconPress?: () => void;
    containerClassName?: string;
}

export function Input({
    label,
    error,
    leftIcon,
    rightIcon,
    onRightIconPress,
    containerClassName,
    className,
    secureTextEntry,
    ...props
}: InputProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isPassword = !!secureTextEntry;

    return (
        <View className={cn("space-y-2", containerClassName)}>
            {label && (
                <Text className="text-muted-foreground uppercase text-xs font-inter-bold tracking-wider ml-1 mb-2">
                    {label}
                </Text>
            )}

            <View className={cn(
                "flex-row items-center bg-card border rounded-xl h-14 px-4",
                error ? "border-destructive" : "border-input",
                "focus:border-primary"
            )}>
                {leftIcon && (
                    <Ionicons
                        name={leftIcon}
                        size={20}
                        color="#9AA4B2"
                        style={{ marginRight: 12 }}
                    />
                )}

                <TextInput
                    className={cn(
                        "flex-1 text-foreground font-inter-medium text-base h-full placeholder:text-muted-foreground",
                        className
                    )}
                    placeholderTextColor="#9AA4B2"
                    secureTextEntry={isPassword && !isPasswordVisible}
                    {...props}
                />

                {(isPassword || rightIcon) && (
                    <TouchableOpacity
                        onPress={isPassword ? () => setIsPasswordVisible(!isPasswordVisible) : onRightIconPress}
                        disabled={!isPassword && !onRightIconPress}
                    >
                        <Ionicons
                            name={isPassword ? (isPasswordVisible ? "eye-off" : "eye") : rightIcon}
                            size={20}
                            color="#9AA4B2"
                        />
                    </TouchableOpacity>
                )}
            </View>

            {error && (
                <Text className="text-destructive text-sm ml-1">{error}</Text>
            )}
        </View>
    );
}
