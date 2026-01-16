import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LockIcon, UserIcon, MailIcon, BadgeCheckIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigate = useNavigate();
    const [role, setRole] = useState("admin");
    const [showPassword, setShowPassword] = useState(false);

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Sign up attempt as:", role);
        localStorage.setItem("userRole", role);
        navigate("/login");
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-6">
            <Card className="w-full max-w-md border-border bg-card shadow-sm rounded-lg overflow-hidden">
                <div className="h-1 bg-primary/30 w-full" />
                <CardHeader className="space-y-1 text-center pt-10">
                    <CardTitle className="font-heading text-2xl font-bold tracking-tight text-foreground">Create Account</CardTitle>
                    <CardDescription className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest">
                        Institutional Registration Portal
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSignUp} className="pt-2">
                    <CardContent className="space-y-4 px-10 pb-10">
                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Select Role</Label>
                            <div className="grid grid-cols-2 gap-2 p-1 bg-muted/50 rounded-md border border-border">
                                <button
                                    type="button"
                                    onClick={() => setRole("admin")}
                                    className={`py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all ${role === "admin"
                                        ? "bg-primary text-primary-foreground shadow-sm"
                                        : "text-muted-foreground hover:bg-muted"
                                        }`}
                                >
                                    ADMIN
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole("teacher")}
                                    className={`py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all ${role === "teacher"
                                        ? "bg-primary text-primary-foreground shadow-sm"
                                        : "text-muted-foreground hover:bg-muted"
                                        }`}
                                >
                                    TEACHER
                                </button>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Full Name</Label>
                            <div className="relative">
                                <Input id="name" type="text" placeholder="John Doe" className="pl-9 h-10 bg-background border-border rounded-md focus:ring-primary text-sm" required />
                                <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            </div>
                        </div>

                        {role === "teacher" && (
                            <div className="space-y-1.5">
                                <Label htmlFor="institute-id" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Institution ID</Label>
                                <div className="relative">
                                    <Input id="institute-id" type="text" placeholder="INST-2023-001" className="pl-9 h-10 bg-background border-border rounded-md focus:ring-primary text-sm" required />
                                    <BadgeCheckIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                </div>
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email</Label>
                            <div className="relative">
                                <Input id="email" type="email" placeholder="name@university.edu" className="pl-9 h-10 bg-background border-border rounded-md focus:ring-primary text-sm" required />
                                <MailIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="password" title="Password" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="pl-9 pr-9 h-10 bg-background border-border rounded-md focus:ring-primary text-sm"
                                    required
                                />
                                <LockIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="pt-2">
                            <Button className="w-full h-10 bg-primary text-primary-foreground font-medium uppercase tracking-widest rounded-md shadow-sm hover:opacity-90 transition-opacity" type="submit">
                                Sign Up
                            </Button>
                            <div className="mt-6 text-center">
                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                                    Already have an account?{" "}
                                    <span
                                        className="text-primary/80 hover:text-primary cursor-pointer underline transition-colors"
                                        onClick={() => navigate("/login")}
                                    >
                                        Log In
                                    </span>
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </form>
            </Card>
        </div>
    );
}
