import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MailIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
    const navigate = useNavigate();

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        navigate("/auth/reset-password");
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/10 p-6">
            <Card className="w-full max-w-md border-border bg-card shadow-sm rounded-lg overflow-hidden">
                <div className="h-1 bg-primary/30 w-full" />
                <CardHeader className="space-y-1 text-center pt-10">
                    <CardTitle className="font-heading text-2xl font-bold tracking-tight text-foreground">Verify Your Email</CardTitle>
                    <CardDescription className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest">
                        Password Recovery Step 1
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleVerify} className="pt-2">
                    <CardContent className="space-y-6 px-10 pb-10">
                        <div className="space-y-4">
                            <p className="text-xs text-muted-foreground text-center leading-relaxed">
                                Enter your registered institutional email address to begin the verification process.
                            </p>
                            <div className="space-y-1.5">
                                <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Email Address</Label>
                                <div className="relative">
                                    <Input id="email" type="email" placeholder="name@university.edu" className="pl-9 h-10 bg-background border-border rounded-md focus:ring-primary text-sm" required />
                                    <MailIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                            <Button className="w-full h-10 bg-primary text-primary-foreground font-medium uppercase tracking-widest rounded-md shadow-sm hover:opacity-90 transition-opacity" type="submit">
                                Verify
                            </Button>
                            <div className="mt-6 text-center">
                                <span
                                    className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest hover:text-primary cursor-pointer transition-colors"
                                    onClick={() => navigate("/login")}
                                >
                                    Cancel & Return Home
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </form>
            </Card>
        </div>
    );
}
