import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { UsersIcon, CheckCircleIcon, XCircleIcon, AlertTriangleIcon, ActivityIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Analytics() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-1">
                <h2 className="font-heading text-2xl font-bold text-foreground">Dashboard Analytics</h2>
                <div className="flex items-center gap-2">
                    <div className="h-1 w-8 bg-primary opacity-50" />
                    <p className="text-muted-foreground font-semibold text-[10px] uppercase tracking-wider">Institution Performance Metrics</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { title: "Total Students", value: "2,350", trend: "+180 new", icon: UsersIcon, color: "text-primary", bg: "bg-primary/10" },
                    { title: "Avg. Attendance", value: "92.4%", trend: "Stable", icon: ActivityIcon, color: "text-info", bg: "bg-info/10" },
                    { title: "Absent Today", value: "145", trend: "-12", icon: XCircleIcon, color: "text-destructive", bg: "bg-destructive/10" },
                    { title: "System Alerts", value: "23", trend: "Critical", icon: AlertTriangleIcon, color: "text-warning", bg: "bg-warning/10" },
                ].map((card, i) => (
                    <Card key={i} className="border border-border bg-card shadow-sm rounded-lg overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">{card.title}</CardTitle>
                            <div className={`p-1.5 rounded-md ${card.bg}`}>
                                <card.icon className={`h-3.5 w-3.5 ${card.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-heading font-bold tabular-nums">{card.value}</div>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${card.bg} ${card.color}`}>{card.trend}</span>
                                <span className="text-[9px] font-medium text-muted-foreground/50 uppercase tracking-widest">Growth Factor</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 rounded-lg border-border bg-card shadow-sm flex flex-col">
                    <CardHeader className="p-5 border-b border-border bg-muted/5 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="font-heading text-lg font-bold text-foreground">Attendance Trends</CardTitle>
                            <CardDescription className="text-[10px] font-semibold uppercase tracking-wider mt-0.5 opacity-60">Daily Presence Analysis</CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="h-7 w-7 p-0 border-border rounded-md"><UsersIcon className="h-3 w-3 text-muted-foreground" /></Button>
                            <Button variant="outline" className="h-7 w-7 p-0 border-border rounded-md"><ActivityIcon className="h-3 w-3 text-muted-foreground" /></Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="h-[300px] flex flex-col items-center justify-center bg-muted/5 relative">
                            <div className="flex gap-1.5 items-end h-24 mb-6">
                                {[35, 65, 45, 85, 55, 95, 75, 45, 65, 85].map((h, i) => (
                                    <div key={i} className="w-4 bg-primary/20 rounded-t-sm transition-colors hover:bg-primary/40" style={{ height: `${h}%` }} />
                                ))}
                            </div>
                            <p className="font-heading font-bold text-muted-foreground/20 tracking-widest uppercase text-[9px]">Verified Statistical Records</p>
                        </div>
                    </CardContent>
                    <CardFooter className="bg-muted/5 p-5 border-t border-border">
                        <div className="flex flex-wrap gap-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70 text-muted-foreground/60">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-primary" />
                                <span>Present stability</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-border" />
                                <span>Historical baseline</span>
                            </div>
                        </div>
                    </CardFooter>
                </Card>

                <Card className="col-span-3 rounded-lg border-border bg-card shadow-sm flex flex-col">
                    <CardHeader className="p-5 border-b border-border">
                        <CardTitle className="font-heading text-lg font-bold text-foreground">Session Log</CardTitle>
                        <CardDescription className="text-[10px] font-semibold uppercase tracking-wider mt-0.5 opacity-60">Real-time Updates</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 p-5 overflow-hidden">
                        <div className="space-y-6">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0 opacity-60" />
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs font-bold leading-none text-foreground/80 tracking-tight">Class {i}4-Alpha Activity</p>
                                            <span className="text-[9px] font-bold text-muted-foreground/50 uppercase tracking-tighter">09:1{i} AM</span>
                                        </div>
                                        <p className="text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-wider">Faculty: Prof. Henderson</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter className="border-t border-border p-0">
                        <button className="w-full py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 hover:bg-muted/50 transition-colors">
                            Full Activity Log
                        </button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}


