import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../ui/Button';

export function QuickCheckIn() {
    return (
        <Button className='w-full mt-4 active:opacity-90 bg-primary'>
            <MaterialCommunityIcons name="qrcode-scan" size={24} color="#0B0F14" />
            <View>
                <Text className="text-primary-foreground font-inter-bold text-lg leading-tight ml-2">
                    Quick Check-in
                </Text>
            </View>
        </Button>
    );
}
