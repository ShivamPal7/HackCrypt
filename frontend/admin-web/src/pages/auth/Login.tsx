import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LockIcon, UserIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get("role");
  const initialRole = roleParam === "teacher" ? "teacher" : "admin";
  const [role, setRole] = useState(initialRole);

  useEffect(() => {
    setRole(initialRole);
  }, [initialRole]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt as:", role);
    localStorage.setItem("userRole", role);
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md border-border bg-card shadow-sm rounded-lg overflow-hidden">
        <div className="h-1 bg-primary/30 w-full" />
        <CardHeader className="space-y-1 text-center pt-10">
          <CardTitle className="font-heading text-2xl font-bold tracking-tight text-foreground">Staff Portal Access</CardTitle>
          <CardDescription className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest">
            Identity & Attendance Management
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin} className="pt-2">
          <CardContent className="space-y-4 px-10 pb-10">
            <div className="space-y-1.5 pb-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Access Mode</Label>
              <div className="flex items-center gap-2 px-3 py-2 bg-secondary/30 border border-border rounded-md">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-foreground/80">
                  {role === "teacher" ? "Signing in as Faculty Member" : "Create an Admin Account"}
                </span>
              </div>
            </div>
            {role === "admin" && (
              <div className="space-y-1.5">
                <Label htmlFor="fullname" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Full Name</Label>
                <div className="relative">
                  <Input id="fullname" placeholder="Enter full name" className="pl-9 h-10 bg-background border-border rounded-md focus:ring-primary text-sm" />
                  <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email</Label>
              <div className="relative">
                <Input id="email" type="email" placeholder="staff@institution.edu" className="pl-9 h-10 bg-background border-border rounded-md focus:ring-primary text-sm" required />
                <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" title="Password" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Password</Label>
                <span className="text-[10px] text-primary/80 font-bold cursor-pointer hover:underline uppercase tracking-tight">Support?</span>
              </div>
              <div className="relative">
                <Input id="password" type="password" placeholder="••••••••" className="pl-9 h-10 bg-background border-border rounded-md focus:ring-primary text-sm" required />
                <LockIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex justify-end pt-0.5">
                <span
                  className="text-[9px] text-muted-foreground/40 font-bold hover:text-primary cursor-pointer underline uppercase tracking-widest transition-colors"
                  onClick={() => navigate("/auth/verify-email")}
                >
                  Forgot Password?
                </span>
              </div>
            </div>
            <div className="pt-2">
              <Button className="w-full h-10 bg-primary text-primary-foreground font-medium uppercase tracking-widest rounded-md shadow-sm hover:opacity-90 transition-opacity" type="submit">
                {role === "admin" ? "Register" : "Login"}
              </Button>
              {role === "teacher" && (
                <div className="mt-6 text-center">
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                    Don't have an account?{" "}
                    <span
                      className="text-primary/80 hover:text-primary cursor-pointer underline transition-colors"
                      onClick={() => navigate("/signup?role=teacher")}
                    >
                      Sign Up
                    </span>
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}

