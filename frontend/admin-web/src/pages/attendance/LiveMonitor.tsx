import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircleIcon, MapPinIcon, FingerprintIcon, ActivityIcon, UsersIcon, ClockIcon, AlertTriangleIcon } from "lucide-react";

const LIVE_STUDENTS = [
    { name: "Rahul Patil", rollNo: "2024001", time: "10:05 AM", match: "98%" },
    { name: "Aditi Kulkarni", rollNo: "2024002", time: "10:06 AM", match: "99%" },
    { name: "Rohit Sharma", rollNo: "2024003", time: "10:07 AM", match: "97%" },
    { name: "Neha Singh", rollNo: "2024004", time: "10:08 AM", match: "98%" },
    { name: "Kunal Verma", rollNo: "2024005", time: "10:09 AM", match: "96%" },
    { name: "Amit Shah", rollNo: "2024006", time: "10:10 AM", match: "99%" },
    { name: "Sanya Mishra", rollNo: "2024007", time: "10:11 AM", match: "97%" },
    { name: "Vikram Rathore", rollNo: "2024008", time: "10:12 AM", match: "98%" },
];

export default function LiveMonitor() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight font-heading">Live Telemetry</h2>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mt-1">Real-time Session Monitoring: Data Structures (CS-A)</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <div className="flex h-3 w-3 items-center justify-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-info animate-pulse" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-info">In Progress</span>
                    </div>
                    <div className="flex items-center gap-2 bg-secondary border border-border px-3 py-1.5 rounded-md">
                        <ActivityIcon className="h-3.5 w-3.5 text-primary" />
                        <span className="text-xs font-bold text-foreground">Session: CSE-302</span>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                {[
                    { title: "Total Enrolled", value: "60", icon: UsersIcon, color: "text-foreground" },
                    { title: "Verified Presence", value: "45", icon: CheckCircleIcon, color: "text-success" },
                    { title: "Pending Auth", value: "12", icon: ClockIcon, color: "text-warning" },
                    { title: "Anomalies", value: "3", icon: AlertTriangleIcon, color: "text-destructive" },
                ].map((stat, i) => (
                    <Card key={i} className="rounded-lg border-border bg-card shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">{stat.title}</CardTitle>
                            <stat.icon className={`h-4 w-4 ${stat.color} opacity-80`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold tabular-nums">{stat.value}</div>
                            {i === 1 && <Progress value={75} className="mt-3" />}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {LIVE_STUDENTS.map((student, i) => (
                    <Card key={i} className="overflow-hidden border-border bg-card rounded-lg shadow-sm group hover:border-primary/30 transition-colors">
                        <div className="flex items-start p-4 gap-3">
                            <div className="relative">
                                <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold text-sm border border-border group-hover:border-primary/50 transition-colors">
                                    {student.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="absolute -bottom-1 -right-1 bg-success rounded-full p-0.5 border-2 border-card">
                                    <CheckCircleIcon className="h-2.5 w-2.5 text-white" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="font-bold text-sm tracking-tight text-foreground">{student.name}</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">ID: {student.rollNo}</p>
                                <div className="flex gap-1.5 mt-2">
                                    <Badge variant="secondary" className="text-[9px] h-5 px-1.5 font-bold uppercase tracking-widest gap-1 border-border/50">
                                        <MapPinIcon className="h-2.5 w-2.5" /> Loc
                                    </Badge>
                                    <Badge variant="secondary" className="text-[9px] h-5 px-1.5 font-bold uppercase tracking-widest gap-1 border-border/50">
                                        <FingerprintIcon className="h-2.5 w-2.5" /> Bio
                                    </Badge>
                                </div>
                            </div>
                        </div>
                        <div className="bg-secondary/50 px-4 py-3 flex justify-between items-center border-t border-border">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/70">Matched: {student.time}</span>
                            <span className="text-[9px] font-bold uppercase tracking-widest text-success bg-success/10 px-1.5 py-0.5 rounded-md border border-success/20">{student.match}</span>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

function Progress({ value, className }: { value: number, className?: string }) {
    return (
        <div className={`w-full bg-secondary rounded-full h-1.5 overflow-hidden ${className}`}>
            <div
                className="bg-primary h-full transition-all duration-500 ease-out"
                style={{ width: `${value}%` }}
            />
        </div>
    );
}
