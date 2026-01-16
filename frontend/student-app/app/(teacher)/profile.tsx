import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileField } from '../../src/components/profile/ProfileField';
import { currentInstructor } from '../../src/data/mock';

export default function TeacherProfileScreen() {
    const router = useRouter();

    // Local state for editing form
    const [name, setName] = useState(currentInstructor.name);
    const [email, setEmail] = useState("alex.thompson@university.edu"); // Mock email
    const [role, setRole] = useState(currentInstructor.role);

    const handleSave = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        console.log('Saving teacher profile:', { name, email, role });
        router.back();
    };

    const onLogout = () => {
        router.push('/login');
    };

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            {/* Custom Header with Save Button */}
            <View className="flex-row items-center justify-between px-5 py-4">
                <TouchableOpacity onPress={() => router.back()}>
                    <Feather name="chevron-left" size={28} color="#E6EDF3" />
                </TouchableOpacity>
                <Text className="text-foreground font-inter-bold text-xl">Edit Profile</Text>
                <TouchableOpacity onPress={handleSave}>
                    <Text className="text-info font-inter-bold text-base">Save</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                className="flex-1 px-5"
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Editable Avatar Section */}
                <View className="items-center justify-center my-6">
                    <View className="relative">
                        <Image
                            source={{ uri: currentInstructor.avatarUrl }}
                            className="h-28 w-28 rounded-full bg-muted"
                            resizeMode="cover"
                        />
                        <TouchableOpacity
                            className="absolute bottom-0 right-0 h-9 w-9 bg-info rounded-full items-center justify-center border-4 border-background"
                        >
                            <Feather name="camera" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text className="text-muted-foreground font-inter text-sm mt-4">
                        Instructor ID: {currentInstructor.id.toUpperCase()}
                    </Text>
                </View>

                {/* Form Fields */}
                <ProfileField
                    label="Name"
                    value={name}
                    onChangeText={setName}
                />

                <ProfileField
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                />

                <ProfileField
                    label="Role"
                    value={role}
                    onChangeText={setRole}
                // Maybe kept editable or read-only depending on logic. Making editable for now as per "editable field" request generically
                />

                {/* Settings Options (Kept from before but styled consistently if needed, or moved below logout) */}
                {/* <View className="gap-3 mb-6">
                    <TouchableOpacity className="bg-card p-4 rounded-xl border border-border flex-row items-center justify-between">
                        <View className="flex-row items-center gap-3">
                            <Feather name="settings" size={20} color="#E6EDF3" />
                            <Text className="text-foreground font-inter-medium text-base">Settings</Text>
                        </View>
                        <Feather name="chevron-right" size={20} color="#9AA4B2" />
                    </TouchableOpacity>
                 </View> */}

                {/* Actions */}

                {/* Switch Back (Temp) */}
                <TouchableOpacity
                    className="w-full h-14 bg-info/10 rounded-2xl border border-info/20 items-center justify-center flex-row gap-2 mt-6"
                    onPress={() => router.push('/(student)/(tabs)')}
                >
                    <Feather name="refresh-cw" size={20} color="#38BDF8" />
                    <Text className="text-info font-inter-bold text-base">Switch to Student View</Text>
                </TouchableOpacity>

                {/* Logout */}
                <TouchableOpacity className="w-full h-14 bg-destructive/10 rounded-2xl border border-destructive/20 items-center justify-center flex-row gap-2 mt-4" onPress={onLogout}>
                    <Feather name="log-out" size={20} color="#EF4444" />
                    <Text className="text-destructive font-inter-bold text-base">Logout</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}
