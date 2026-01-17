import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LockIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
    const navigate = useNavigate();

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        navigate("/login");
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/10 p-6">
            <Card className="w-full max-w-md border-border bg-card shadow-sm rounded-lg overflow-hidden">
                <div className="h-1 bg-primary/30 w-full" />
                <CardHeader className="space-y-1 text-center pt-10">
                    <CardTitle className="font-heading text-2xl font-bold tracking-tight text-foreground">Reset Password</CardTitle>
                    <CardDescription className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest">
                        Finalize Security Recovery
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleUpdate} className="pt-2">
                    <CardContent className="space-y-4 px-10 pb-10">
                        <div className="space-y-1.5">
                            <Label htmlFor="new-password" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">New Password</Label>
                            <div className="relative">
                                <Input id="new-password" type="password" placeholder="••••••••" className="pl-9 h-10 bg-background border-border rounded-md focus:ring-primary text-sm" required />
                                <LockIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="confirm-password" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Re-enter New Password</Label>
                            <div className="relative">
                                <Input id="confirm-password" type="password" placeholder="••••••••" className="pl-9 h-10 bg-background border-border rounded-md focus:ring-primary text-sm" required />
                                <LockIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button className="w-full h-10 bg-primary text-primary-foreground font-medium uppercase tracking-widest rounded-md shadow-sm hover:opacity-90 transition-opacity" type="submit">
                                Update Password
                            </Button>
                        </div>
                    </CardContent>
                </form>
            </Card>
        </div>
    );
}
