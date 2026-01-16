import { Feather } from '@expo/vector-icons';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { cn } from '../../lib/utils';
import { CourseDetails } from '../../types/domain';

interface HistoryTabProps {
    logs: CourseDetails['activityLog'];
}

export function HistoryTab({ logs }: HistoryTabProps) {
    return (
        <View className="flex-1">
            {/* Search & Filter */}
            <View className="flex-row items-center gap-3 mb-6">
                <View className="flex-1 flex-row items-center bg-card border border-border rounded-xl px-4 h-12">
                    <Feather name="search" size={20} color="#9AA4B2" />
                    <TextInput
                        placeholder="Search sessions..."
                        placeholderTextColor="#9AA4B2"
                        className="flex-1 ml-3 font-inter text-foreground"
                    />
                </View>
                <TouchableOpacity className="h-12 w-12 items-center justify-center bg-card border border-border rounded-xl">
                    <Feather name="sliders" size={20} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            {/* List */}
            <View className="gap-4 pb-20">
                {logs.map((log) => {
                    // Reconstruct full date format: "Tuesday, October 24"
                    // log.day is "TUESDAY", log.date is "October 24, 2023"
                    const dayCapitalized = log.day.charAt(0).toUpperCase() + log.day.slice(1).toLowerCase(); // "Tuesday"
                    const datePart = log.date.split(',')[0]; // "October 24"
                    const fullDateSubheading = `${dayCapitalized}, ${datePart}`;

                    // Subject Name (Hardcoded for this specific screen context as per DetailsHeader)
                    const subjectName = "CS 101: Computer Science";

                    let badgeClass = "bg-muted/20 border-muted";
                    let badgeTextClass = "text-muted-foreground";
                    let badgeLabel = log.status.toUpperCase();

                    if (log.status === 'Present') {
                        badgeClass = "bg-success/10 border-success/20";
                        badgeTextClass = "text-success";
                    } else if (log.status === 'Late') {
                        // Updated to remove download button logic previously
                        badgeClass = "bg-warning/10 border-warning/20 text-warning";
                        badgeTextClass = "text-warning";
                    } else if (log.status === 'Absent') {
                        badgeClass = "bg-destructive/10 border-destructive/20";
                        badgeTextClass = "text-destructive";
                    }

                    return (
                        <View key={log.id} className="bg-card p-5 rounded-2xl border border-border">
                            {/* Header Row */}
                            <View className="flex-row justify-between items-start mb-3">
                                <View>
                                    <Text className="text-foreground font-inter-bold text-lg mb-1">{subjectName}</Text>
                                    <Text className="text-muted-foreground font-inter-bold text-xs uppercase tracking-wider">{fullDateSubheading}</Text>
                                </View>
                                <View className={cn("px-3 py-1.5 rounded-lg border", badgeClass)}>
                                    <Text className={cn("font-inter-bold text-[10px]", badgeTextClass)}>{badgeLabel}</Text>
                                </View>
                            </View>

                            {/* Meta Row */}
                            <View className="flex-row items-center gap-2">
                                <Feather
                                    name={log.status === 'Absent' ? "alert-circle" : "clock"}
                                    size={14}
                                    color="#9AA4B2"
                                />
                                <Text className="text-muted-foreground font-inter-medium text-sm italic">
                                    {log.meta}
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </View>

            {/* FAB Removed */}
        </View>
    );
}
