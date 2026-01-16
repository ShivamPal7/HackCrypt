import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileAvatar } from '../../../src/components/profile/ProfileAvatar';
import { ProfileDropdown } from '../../../src/components/profile/ProfileDropdown';
import { ProfileField } from '../../../src/components/profile/ProfileField';
import { currentUser } from '../../../src/data/mock';

export default function ProfileScreen() {
    const router = useRouter();

    // Local state for editing form
    const [name, setName] = useState(currentUser.name);
    const [department, setDepartment] = useState(currentUser.department);
    const [classGrade, setClassGrade] = useState(currentUser.classGrade);
    const [rollNo, setRollNo] = useState(currentUser.rollNo);

    // Mock Options
    const departments = ["Computer Science", "Information Technology", "Electronics", "Mechanical Engineering", "Civil Engineering"];
    const classes = ["B.Tech - 1st Year", "B.Tech - 2nd Year", "B.Tech - 3rd Year", "B.Tech - 4th Year"];

    const handleSave = () => {
        // Here you would typically make an API call to update the user profile
        console.log('Saving profile:', { name, department, classGrade, rollNo });
        router.back();
    };

    const onLogout = () => {
        // Here you would typically make an API call to update the user profile
        console.log('Logging out');
        router.push('/login');
    };

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            {/* Header */}
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
                {/* We pass the original user object for the avatar, but typically avatar is also editable separately */}
                <ProfileAvatar user={currentUser} />

                <ProfileField
                    label="Name"
                    value={name}
                    onChangeText={setName}
                />

                <ProfileDropdown
                    label="Department"
                    value={department}
                    options={departments}
                    onSelect={setDepartment}
                />

                <ProfileDropdown
                    label="Class"
                    value={classGrade}
                    options={classes}
                    onSelect={setClassGrade}
                />

                <ProfileField
                    label="Roll No."
                    value={rollNo}
                    onChangeText={setRollNo}
                />

                {/* Notifications Row */}
                {/* <TouchableOpacity className="bg-card w-full p-5 rounded-2xl border border-border mt-2 mb-6 flex-row items-center justify-between">
                    <View className="flex-row items-center gap-3">
                        <Feather name="bell" size={20} color="#9AA4B2" />
                        <Text className="text-foreground font-inter-medium text-base">Notifications</Text>
                    </View>
                    <Feather name="chevron-right" size={20} color="#9AA4B2" />
                </TouchableOpacity> */}

                {/* Temp Switch Button */}
                <TouchableOpacity
                    className="w-full h-14 bg-primary/10 rounded-2xl border border-primary/20 items-center justify-center flex-row gap-2 mt-6"
                    onPress={() => router.push('/(teacher)/home')}
                >
                    <Feather name="refresh-cw" size={20} color="#6CFFC4" />
                    <Text className="text-primary font-inter-bold text-base">Switch to Teacher View (Temp)</Text>
                </TouchableOpacity>

                {/* Logout Button */}
                <TouchableOpacity className="w-full h-14 bg-destructive/10 rounded-2xl border border-destructive/20 items-center justify-center flex-row gap-2 mt-2" onPress={onLogout}>
                    <Feather name="log-out" size={20} color="#EF4444" />
                    <Text className="text-destructive font-inter-bold text-base">Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
