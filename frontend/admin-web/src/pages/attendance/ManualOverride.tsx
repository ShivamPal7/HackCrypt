import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircleIcon } from "lucide-react";

export default function ManualOverride() {
    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Manual Attendance Override</h2>
                <p className="text-muted-foreground">Manually mark a student as present in case of system failure.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Attendance Details</CardTitle>
                    <CardDescription>All fields are mandatory for audit logs.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Date</Label>
                            <Input type="date" />
                        </div>
                        <div className="space-y-2">
                            <Label>Session / Subject</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Subject" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="dsa">Data Structures</SelectItem>
                                    <SelectItem value="dbms">DBMS</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Student Roll Number</Label>
                        <Input placeholder="Enter Roll No (e.g. 2024001)" />
                    </div>

                    <div className="space-y-2">
                        <Label>Reason for Manual Entry</Label>
                        <Textarea placeholder="Explain why biometric/geo-fencing failed..." />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">
                        <CheckCircleIcon className="mr-2 h-4 w-4" />
                        Confirm & Mark Present
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
