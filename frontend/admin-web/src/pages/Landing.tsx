import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import {
    CheckCircleIcon,
    ActivityIcon,
    Building2Icon,
    GraduationCapIcon,
    ClockIcon,
    FileBarChartIcon,
    TriangleAlertIcon
} from "lucide-react";

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/10 selection:text-primary">
            <Navbar />
            <section className="pt-28 pb-16 bg-card border-b border-border">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center space-y-6 py-20">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-background border border-border rounded-md mb-4">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Academic Portal Edition</span>
                        </div>
                        <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
                            Integrated Attendance & <br />
                            <span className="text-primary">Institutional Management</span>
                        </h1>
                        <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            A centralized geofencing platform for schools and colleges to streamline record keeping, verify presence, and generate certified academic reports.
                        </p>
                        <div className="flex justify-center gap-4 pt-8">
                            <Button
                                onClick={() => navigate("/create-institute")}
                                className="h-11 px-12 bg-primary hover:opacity-90 text-primary-foreground rounded-md shadow-sm text-sm font-medium uppercase tracking-wider"
                            >
                                Create an Institute
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => navigate("/login?role=teacher")}
                                className="h-11 px-12 border-border text-foreground hover:bg-muted/50 rounded-md text-sm font-medium uppercase tracking-wider"
                            >
                                Faculty Login
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-20 bg-background">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
                        <div className="space-y-6">
                            <h2 className="font-heading text-2xl font-bold text-foreground">Standardizing Workflow</h2>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Manual attendance systems struggle with accuracy and lack the real-time analytics needed for effective institutional management. Attendix provides a secure, consolidated alternative.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Eliminate paper-heavy manual logs",
                                    "Real-time visibility for administration",
                                    "Prevent unauthorized presence proxies",
                                    "Instant generation of compliance data"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                        <CheckCircleIcon className="mt-0.5 h-4 w-4 text-success shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-2">
                            {[
                                { title: "Uptime", val: "99.9%" },
                                { title: "Verified", val: "100%" },
                                { title: "Efficiency", val: "40%+" },
                                { title: "Security", val: "High" },
                            ].map((stat, i) => (
                                <div key={i} className="p-6 border border-border bg-card rounded-lg text-center space-y-1">
                                    <div className="text-2xl font-bold text-primary">{stat.val}</div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">{stat.title}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-20 bg-card border-y border-border">
                <div className="container mx-auto px-6 space-y-12">
                    <div className="text-center space-y-3">
                        <h2 className="font-heading text-3xl font-bold text-foreground tracking-tight">System Capabilities</h2>
                        <p className="text-sm text-muted-foreground">Comprehensive tools designed for daily institutional operations.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {[
                            { title: "Geofencing Control", desc: "Restrict student check-ins to specific classroom coordinates.", icon: GraduationCapIcon },
                            { title: "Session Console", desc: "Manage specific attendance windows and time-locked sessions.", icon: ClockIcon },
                            { title: "Live Telemetry", desc: "View real-time student entries as they happen on campus.", icon: ActivityIcon },
                            { title: "Records Archive", desc: "Maintain immutable logs of all attendance activities.", icon: FileBarChartIcon },
                            { title: "Institutional Setup", desc: "Define departments, subjects, and faculty hierarchies.", icon: Building2Icon },
                            { title: "System Overrides", desc: "Official audit trail for administrative adjustments.", icon: TriangleAlertIcon },
                        ].map((feature, i) => (
                            <Card key={i} className="border-border bg-card shadow-sm rounded-lg">
                                <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-3">
                                    <feature.icon className="h-5 w-5 text-primary" />
                                    <CardTitle className="font-heading font-bold text-base">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
            <footer className="py-12 bg-background border-t border-border mt-auto">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex items-center gap-2">
                            <span className="font-heading font-bold text-lg text-primary tracking-tight">Attendix</span>
                            <span className="text-[10px] text-muted-foreground/60 border-l border-border pl-2 ml-2">Institutional Platform</span>
                        </div>
                        <div className="text-[11px] font-medium text-muted-foreground/80 tracking-wide uppercase flex gap-8">
                            <span className="hover:text-primary cursor-pointer transition-colors">Privacy Information</span>
                            <span className="hover:text-primary cursor-pointer transition-colors">Compliance Terms</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
