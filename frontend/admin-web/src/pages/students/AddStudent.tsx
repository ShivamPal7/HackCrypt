import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeftIcon, UploadIcon, RefreshCwIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AddStudent() {
    const navigate = useNavigate();

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                    <ChevronLeftIcon className="h-5 w-5" />
                </Button>
                <h2 className="text-2xl font-bold tracking-tight">Register New Student</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Personal Details</CardTitle>
                        <CardDescription>Enter student's basic information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" placeholder="Jane" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" placeholder="Doe" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="dob">Date of Birth</Label>
                                <Input id="dob" type="date" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="gender">Gender</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="m">Male</SelectItem>
                                        <SelectItem value="f">Female</SelectItem>
                                        <SelectItem value="o">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-1">
                    <CardHeader>
                        <CardTitle>Academic Info</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="class">Class</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Class" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="csa">CS-A</SelectItem>
                                    <SelectItem value="csb">CS-B</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="roll">Roll Number</Label>
                            <Input id="roll" placeholder="Ex: 2024001" />
                        </div>
                        <div className="space-y-2">
                            <Label>Student ID</Label>
                            <div className="flex gap-2">
                                <Input disabled value="STU-2024-X9Y2" className="font-mono bg-gray-50" />
                                <Button variant="outline" size="icon" title="Generate New ID">
                                    <RefreshCwIcon className="h-4 w-4" />
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">Auto-generated unique ID.</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-1">
                    <CardHeader>
                        <CardTitle>Biometrics & Documents</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer">
                            <UploadIcon className="h-8 w-8 text-gray-400 mb-2" />
                            <span className="text-sm font-medium">Upload Photo</span>
                            <span className="text-xs text-muted-foreground">or drag and drop</span>
                        </div>
                        <div className="space-y-2">
                            <Label>Biometric Status</Label>
                            <div className="flex items-center gap-2 text-sm text-yellow-600 bg-yellow-50 p-2 rounded border border-yellow-100">
                                <span>Pending Registration</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Register Student</Button>
            </div>
        </div>
    );
}
