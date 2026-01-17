import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";

export default function CreateInstitute() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/10 selection:text-primary">
            <Navbar />
            <div className="container mx-auto px-6 pt-32 pb-16">
                <Card className="max-w-xl mx-auto border-border bg-card rounded-lg shadow-sm">
                    <CardHeader className="space-y-1 py-8 text-center border-b border-border bg-muted/5">
                        <CardTitle className="font-heading text-2xl font-bold tracking-tight">Create Institute</CardTitle>
                        <CardDescription className="text-xs font-bold text-primary/70 uppercase tracking-widest mt-1">Registration & Onboarding</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Institute Name</Label>
                                <Input id="name" placeholder="Ex: IIT Bombay" className="h-10 border-border rounded-md focus:ring-primary" />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="address" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Institute Address</Label>
                                <Input id="address" placeholder="Ex: Main Campus, Powai, Mumbai" className="h-10 border-border rounded-md focus:ring-primary" />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Phone Number</Label>
                                <Input id="phone" placeholder="Ex: +91 9876543210" className="h-10 border-border rounded-md focus:ring-primary" />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Official Email Address</Label>
                                <Input id="email" type="email" placeholder="admin@iitb.ac.in" className="h-10 border-border rounded-md focus:ring-primary" />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <Button
                                onClick={() => navigate("/login?role=admin")}
                                className="flex-1 h-11 bg-primary hover:opacity-90 text-primary-foreground rounded-md shadow-sm text-sm font-medium uppercase tracking-wider"
                            >
                                Continue
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => navigate("/")}
                                className="flex-1 h-11 border-border text-foreground hover:bg-muted/50 rounded-md text-sm font-medium uppercase tracking-wider"
                            >
                                Cancel
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
