import { Text, View } from 'react-native';

interface StatCardProps {
    label: string;
    value: string;
    width?: 'full' | 'half';
}

export const StatCard = ({ label, value, width = 'half' }: StatCardProps) => {
    return (
        <View className="flex-1 bg-card rounded-2xl p-5 border border-border mr-4 last:mr-0 h-24 justify-between">
            <Text className="text-muted-foreground font-inter-bold text-[10px] uppercase tracking-wider">
                {label}
            </Text>
            <Text className="text-foreground font-inter-bold text-2xl">
                {value}
            </Text>
        </View>
    );
};
