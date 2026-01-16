import { Feather } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { cn } from '../../lib/utils';
import { CourseDetails } from '../../types/domain';

interface RecentActivityProps {
    logs: CourseDetails['activityLog'];
}

export function RecentActivity({ logs }: RecentActivityProps) {
    return (
        <View className="mb-20">
            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-foreground font-inter-bold text-lg">Recent Activity</Text>
                <TouchableOpacity>
                    <Text className="text-info font-inter-bold text-sm">See all</Text>
                </TouchableOpacity>
            </View>

            <View className="gap-3">
                {logs.map((log) => {
                    let iconBg = "bg-muted";
                    let iconToken = <Feather name="help-circle" size={20} color="#9AA4B2" />;
                    let statusBadge = null;

                    if (log.status === 'Present') {
                        iconBg = "bg-success/10";
                        iconToken = <Feather name="check" size={20} color="#22C55E" />;
                        statusBadge = (
                            <View className="bg-success/10 px-2 py-1 rounded-md border border-success/20">
                                <Text className="text-success font-inter-bold text-[10px] uppercase">Present</Text>
                            </View>
                        );
                    } else if (log.status === 'Late') {
                        iconBg = "bg-warning/10";
                        iconToken = <Feather name="clock" size={20} color="#FACC15" />;
                        statusBadge = (
                            <View className="bg-warning/10 px-2 py-1 rounded-md border border-warning/20">
                                <Text className="text-warning font-inter-bold text-[10px] uppercase">Late</Text>
                            </View>
                        );
                    } else if (log.status === 'Absent') {
                        iconBg = "bg-destructive/10";
                        iconToken = <Feather name="x" size={20} color="#EF4444" />;
                        statusBadge = (
                            <View className="bg-destructive/10 px-2 py-1 rounded-md border border-destructive/20">
                                <Text className="text-destructive font-inter-bold text-[10px] uppercase">Absent</Text>
                            </View>
                        );
                    }

                    return (
                        <View key={log.id} className="bg-card p-4 rounded-2xl border border-border flex-row items-center justify-between">
                            <View className="flex-row items-center gap-3">
                                <View className={cn("h-10 w-10 rounded-full items-center justify-center", iconBg)}>
                                    {iconToken}
                                </View>
                                <View>
                                    <Text className="text-foreground font-inter-bold text-base">{log.date}</Text>
                                    <Text className="text-muted-foreground text-xs font-inter">{log.meta}</Text>
                                </View>
                            </View>

                            {/* Right Side */}
                            <View>
                                {statusBadge}
                            </View>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}
