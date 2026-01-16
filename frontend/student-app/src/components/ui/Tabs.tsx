import { Text, TouchableOpacity, View } from "react-native";
import { cn } from "../../lib/utils";

interface TabOption {
    value: string;
    label: string;
}

interface TabsProps {
    options: TabOption[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export function Tabs({ options, value, onChange, className }: TabsProps) {
    return (
        <View className={cn("flex-row bg-card p-1 rounded-2xl border border-input", className)}>
            {options.map((option) => {
                const isActive = value === option.value;
                return (
                    <TouchableOpacity
                        key={option.value}
                        onPress={() => onChange(option.value)}
                        className={cn(
                            "flex-1 h-10 items-center justify-center rounded-xl",
                            isActive ? "bg-muted" : "bg-transparent"
                        )}
                    >
                        <Text
                            className={cn(
                                "font-inter-bold text-xs uppercase tracking-wide",
                                isActive ? "text-foreground" : "text-muted-foreground"
                            )}
                        >
                            {option.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
