import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { PlayIcon, StopCircleIcon, ClockIcon } from "lucide-react";
import { useState } from "react";

export default function SessionControl() {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className="space-y-6 max-w-xl mx-auto">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Session Control</h2>
                <p className="text-muted-foreground">Start or stop attendance sessions for a class.</p>
            </div>

            <Card className={isActive ? "border-green-500 shadow-lg shadow-green-100 dark:shadow-green-900/20" : ""}>
                <CardHeader>
                    <CardTitle>Current Session Configuration</CardTitle>
                    <CardDescription>Select subject and class details to begin.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Subject</Label>
                        <Select disabled={isActive}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Subject" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="dsa">Data Structures (CS-301)</SelectItem>
                                <SelectItem value="dbms">DBMS (CS-302)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Class / Section</Label>
                            <Select disabled={isActive}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Class" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="a">CS-A</SelectItem>
                                    <SelectItem value="b">CS-B</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Duration (Minutes)</Label>
                            <Select disabled={isActive} defaultValue="10">
                                <SelectTrigger>
                                    <SelectValue placeholder="Duration" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="5">5 Mins</SelectItem>
                                    <SelectItem value="10">10 Mins</SelectItem>
                                    <SelectItem value="15">15 Mins</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {isActive && (
                        <div className="bg-green-50 text-green-800 p-4 rounded-lg flex items-center justify-center gap-2 dark:bg-green-900/30 dark:text-green-300">
                            <ClockIcon className="h-5 w-5 animate-pulse" />
                            <span className="font-bold text-lg">09:45 Remaining</span>
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    {!isActive ? (
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={() => setIsActive(true)}>
                            <PlayIcon className="mr-2 h-4 w-4" />
                            Start Session
                        </Button>
                    ) : (
                        <Button variant="destructive" className="w-full" onClick={() => setIsActive(false)}>
                            <StopCircleIcon className="mr-2 h-4 w-4" />
                            Stop Session
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
