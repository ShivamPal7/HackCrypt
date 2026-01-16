import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { MapPinIcon, CrosshairIcon, SaveIcon } from "lucide-react";

export default function ClassroomSetup() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight font-heading">Location Setup</h2>
                <Button className="rounded-md font-medium">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add Classroom
                </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-heading">Map View</CardTitle>
                            <CardDescription>Drag the pin to set precise location for geofencing.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="aspect-video w-full bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed">
                                <div className="text-center text-gray-500">
                                    <MapPinIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                    <p>Map Integration Placeholder (Google Maps / MapLibre)</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-heading font-bold">Classroom Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Room Name / Number</Label>
                                <Input placeholder="Room 304 - Lecture Hall" />
                            </div>
                            <Separator />
                            <div className="space-y-2">
                                <Label>Latitude</Label>
                                <div className="relative">
                                    <Input placeholder="19.0760" />
                                    <CrosshairIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Longitude</Label>
                                <div className="relative">
                                    <Input placeholder="72.8777" />
                                    <CrosshairIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Geo-fence Radius (meters)</Label>
                                <Input type="number" defaultValue={50} />
                                <p className="text-xs text-muted-foreground">Students must be within this range to mark attendance.</p>
                            </div>
                            <Button className="w-full mt-2 rounded-md font-medium">
                                <SaveIcon className="mr-2 h-4 w-4" />
                                Save Location
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Saved Locations</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {["Main Auditorium", "Lab 2 (CS)", "Room 101"].map((loc) => (
                                <div key={loc} className="flex items-center justify-between p-2 rounded-md hover:bg-secondary border border-border">
                                    <span className="text-sm font-medium">{loc}</span>
                                    <MapPinIcon className="h-4 w-4 text-gray-400" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function PlusIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    )
}
