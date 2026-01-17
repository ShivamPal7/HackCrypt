import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { UsersIcon, CheckCircleIcon, XCircleIcon, AlertTriangleIcon, ActivityIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const INITIAL_INVITATIONS = [
    { id: 1, name: "Aditya Kumar", role: "Student", date: "09:45 AM" },
    { id: 2, name: "Prof. Henderson", role: "Teacher", date: "10:15 AM" },
    { id: 3, name: "Sarah Miller", role: "Student", date: "11:20 AM" },
];

export default function Analytics() {
    const userRole = localStorage.getItem("userRole") || "admin";
    const [invitations, setInvitations] = useState(INITIAL_INVITATIONS);

    const filteredInvitations = invitations.filter(inv => {
        if (userRole === "teacher") {
            return inv.role === "Student";
        }
        return true;
    });

    const handleAccept = (id: number) => {
        setInvitations(invs => invs.filter(inv => inv.id !== id));
    };

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
                            <CardTitle className="font-heading text-lg font-bold text-foreground">Pending Invitations</CardTitle>
                            <CardDescription className="text-[10px] font-semibold uppercase tracking-wider mt-0.5 opacity-60">Verification Queue</CardDescription>
                        </div>
                        <div className="px-2.5 py-1 bg-primary/10 border border-primary/20 rounded-md">
                            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{filteredInvitations.length} Pending</span>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 flex-1">
                        <div className="divide-y divide-border">
                            {filteredInvitations.length > 0 ? (
                                filteredInvitations.map((inv) => (
                                    <div key={inv.id} className="flex items-center justify-between p-5 hover:bg-muted/5 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 border border-border rounded-md bg-secondary flex items-center justify-center font-heading font-bold text-xs text-primary shadow-sm">
                                                {inv.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-foreground/80 tracking-tight">{inv.name}</p>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className={`text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-md ${inv.role === 'Teacher' ? 'bg-primary/10 text-primary' : 'bg-info/10 text-info'}`}>
                                                        {inv.role}
                                                    </span>
                                                    <span className="text-[9px] font-medium text-muted-foreground/40 uppercase tracking-tighter">— {inv.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Button
                                            size="sm"
                                            onClick={() => handleAccept(inv.id)}
                                            className="h-8 bg-primary hover:opacity-90 text-primary-foreground text-[10px] font-bold uppercase tracking-widest rounded-md px-4 shadow-sm"
                                        >
                                            Accept Invitation
                                        </Button>
                                    </div>
                                ))
                            ) : (
                                <div className="h-48 flex flex-col items-center justify-center text-center p-8">
                                    <div className="p-3 bg-muted/50 rounded-full mb-3">
                                        <CheckCircleIcon className="h-6 w-6 text-muted-foreground/30" />
                                    </div>
                                    <p className="text-xs font-bold text-muted-foreground/50 uppercase tracking-widest">Verification Queue Clear</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="bg-muted/5 p-4 border-t border-border">
                        <p className="text-[9px] font-medium text-muted-foreground/50 uppercase tracking-widest">
                            Requires {userRole === 'admin' ? 'Administrative' : 'Faculty'} Approval Authority
                        </p>
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


