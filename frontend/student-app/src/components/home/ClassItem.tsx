import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { cn } from '../../lib/utils';
import { ClassSession } from '../../types/domain';

interface ClassItemProps {
    session: ClassSession;
}

export function ClassItem({ session }: ClassItemProps) {
    // Helper to get icon
    const getIcon = () => {
        switch (session.iconName) {
            case 'function': return <MaterialCommunityIcons name="sigma" size={24} color="#38BDF8" />;
            case 'laptop': return <MaterialCommunityIcons name="laptop" size={24} color="#9AA4B2" />;
            case 'history': return <Feather name="feather" size={24} color="#9AA4B2" />;
            default: return <Feather name="book" size={24} color="#9AA4B2" />;
        }
    };

    // Helper for background color of icon container
    const getIconBg = () => {
        if (session.iconName === 'function') return 'bg-info/10';
        return 'bg-muted';
    };

    return (
        <View className="bg-card p-4 rounded-2xl mb-3 border border-border flex-row items-center gap-4">
            {/* Icon Box */}
            <View className={cn("h-12 w-12 rounded-xl items-center justify-center", getIconBg())}>
                {getIcon()}
            </View>

            {/* Main Info */}
            <View className="flex-1">
                <Text className="text-foreground font-inter-bold text-base mb-1" numberOfLines={1}>
                    {session.title}
                </Text>
                <View className="flex-row items-center gap-1.5">
                    <Feather
                        name={session.type === 'remote' ? 'video' : 'map-pin'}
                        size={12}
                        color="#9AA4B2"
                    />
                    <Text className="text-muted-foreground text-xs font-inter">
                        {session.location}
                    </Text>
                </View>
            </View>

            {/* Time Info */}
            <View className="items-end">
                <Text className="text-foreground font-inter-bold text-sm mb-1">
                    {session.startTime}
                </Text>
                {session.statusLabel ? (
                    <Text className="text-muted-foreground text-[10px] font-inter-bold uppercase">
                        {session.statusLabel}
                    </Text>
                ) : (
                    <Text className="text-muted-foreground text-[10px] font-inter uppercase">
                        {session.durationMinutes} MIN
                    </Text>
                )}
            </View>

            {/* Active Indicator Line for first item if needed contextually, 
            but strictly following image, first item has blue left border? 
            Visual check: Yes, "Advanced Math" has a blue curve on the left.
        */}
            {session.iconName === 'function' && (
                <View className="absolute left-0 top-3 bottom-3 w-1 bg-info rounded-r-full" />
            )}
        </View>
    );
}
