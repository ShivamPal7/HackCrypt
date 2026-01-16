import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BuildingIcon, SaveIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

export default function InstitutionSetup() {
    const [activeTab, setActiveTab] = useState("details");

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight font-heading">Institution Setup</h2>
                <Button className="rounded-md font-medium">
                    <SaveIcon className="mr-2 h-4 w-4" />
                    Save Changes
                </Button>
            </div>

            <div className="space-y-4">
                <div className="flex space-x-2 border-b">
                    <button
                        onClick={() => setActiveTab("details")}
                        className={`px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${activeTab === "details"
                            ? "border-b-2 border-primary text-primary"
                            : "text-muted-foreground"
                            }`}
                    >
                        Institution Details
                    </button>
                    <button
                        onClick={() => setActiveTab("departments")}
                        className={`px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${activeTab === "departments"
                            ? "border-b-2 border-primary text-primary"
                            : "text-muted-foreground"
                            }`}
                    >
                        Departments
                    </button>
                    <button
                        onClick={() => setActiveTab("structure")}
                        className={`px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${activeTab === "structure"
                            ? "border-b-2 border-primary text-primary"
                            : "text-muted-foreground"
                            }`}
                    >
                        Academic Structure
                    </button>
                </div>

                {activeTab === "details" && (
                    <Card className="rounded-lg border-border">
                        <CardHeader>
                            <CardTitle className="font-heading font-bold">Basic Information</CardTitle>
                            <CardDescription>Manage your school or college profile details.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Institution Name</Label>
                                    <Input id="name" placeholder="Ex: IIT Bombay" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="code">Institution Code</Label>
                                    <Input id="code" placeholder="Ex: IITB-2024" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Official Email</Label>
                                    <Input id="email" type="email" placeholder="admin@iitb.ac.in" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Contact Number</Label>
                                    <Input id="phone" placeholder="+91 98765 43210" />
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" placeholder="Main Campus, Powai, Mumbai" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {activeTab === "departments" && (
                    <Card className="rounded-lg border-border">
                        <CardHeader>
                            <CardTitle className="font-heading font-bold">Departments</CardTitle>
                            <CardDescription>Add and manage departments (e.g., maintain Computer Science, Mechanical).</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex gap-2">
                                    <Input placeholder="New Department Name" className="max-w-sm" />
                                    <Button variant="outline" className="rounded-md font-medium">
                                        <PlusIcon className="mr-2 h-4 w-4" />
                                        Add
                                    </Button>
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    {["Computer Science", "Electronics", "Mechanical Engineering", "Civil Engineering"].map((dept) => (
                                        <div key={dept} className="flex items-center justify-between rounded-lg border border-border p-3 bg-secondary/30">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20">
                                                    <BuildingIcon className="h-4 w-4" />
                                                </div>
                                                <span className="font-medium">{dept}</span>
                                            </div>
                                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                                                <TrashIcon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {activeTab === "structure" && (
                    <Card className="rounded-lg border-border">
                        <CardHeader>
                            <CardTitle className="font-heading font-bold">Academic Structure</CardTitle>
                            <CardDescription>Define years, semesters, and sections.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">Configuration for academic years and semesters goes here.</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
