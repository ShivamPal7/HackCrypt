import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
    LayoutDashboardIcon,
    Building2Icon,
    UsersIcon,
    GraduationCapIcon,
    BookOpenIcon,
    MapPinIcon,
    ClockIcon,
    ActivityIcon,
    FileBarChartIcon,
    LogOutIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboardIcon },
    { label: "Institution Setup", href: "/setup", icon: Building2Icon },
    { label: "Teachers", href: "/teachers", icon: UsersIcon },
    { label: "Students", href: "/students", icon: GraduationCapIcon },
    { label: "Academics", href: "/academics", icon: BookOpenIcon },
    { label: "Locations", href: "/locations", icon: MapPinIcon },
    { label: "Sessions", href: "/attendance/sessions", icon: ClockIcon },
    { label: "Live Monitor", href: "/attendance/live", icon: ActivityIcon },
    { label: "Reports", href: "/reports", icon: FileBarChartIcon },
];

export function Sidebar() {
    const location = useLocation();
    const userRole = localStorage.getItem("userRole") || "admin";

    const filteredNavItems = navItems.filter(item => {
        if (userRole === "teacher" && item.label === "Institution Setup") {
            return false;
        }
        return true;
    });

    return (
        <div className="flex h-full w-64 flex-col border-r bg-sidebar text-sidebar-foreground">
            <div className="flex h-16 items-center border-b px-6">
                <Link to="/dashboard" className="flex items-center gap-2">
                    <span className="font-heading font-bold text-lg text-primary tracking-tight">
                        Attendix
                    </span>
                </Link>
            </div>
            <div className="flex-1 overflow-auto py-4 px-3">
                <nav className="grid items-start gap-1">
                    <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2">Management</p>
                    {filteredNavItems.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-md px-3 py-2 transition-colors group text-sm font-medium",
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                )}
                            >
                                <item.icon className={cn(
                                    "h-4 w-4",
                                    isActive ? "text-primary" : "text-muted-foreground/70 group-hover:text-primary"
                                )} />
                                <span className="tracking-tight">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="border-t p-4 bg-card">
                <Link to="/login">
                    <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive rounded-md h-10 px-3">
                        <LogOutIcon className="h-4 w-4" />
                        <span className="font-bold text-xs tracking-widest uppercase">Sign Out</span>
                    </Button>
                </Link>
            </div>
        </div>
    );
}

