import { Feather, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

export default function TeacherTabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false, // Hide default headers for custom ones
                tabBarStyle: {
                    backgroundColor: '#0B0F14',
                    borderTopColor: '#1F2937',
                    borderTopWidth: 1,
                    height: Platform.OS === 'ios' ? 88 : 68,
                    paddingBottom: Platform.OS === 'ios' ? 28 : 10,
                    paddingTop: 10,
                },
                tabBarActiveTintColor: '#E6EDF3',
                tabBarInactiveTintColor: '#9AA4B2',
                tabBarLabelStyle: {
                    fontFamily: 'Inter-Medium',
                    fontSize: 10,
                    marginTop: 2,
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    headerShown: false, // Hide header for Home to match design
                    tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="lectures"
                options={{
                    title: 'Lectures',
                    tabBarIcon: ({ color }) => <Feather name="calendar" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="analytics"
                options={{
                    title: 'Analytics',
                    tabBarIcon: ({ color }) => <Ionicons name="stats-chart-outline" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}
