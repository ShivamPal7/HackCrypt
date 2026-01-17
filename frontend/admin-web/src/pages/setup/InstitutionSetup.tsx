import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BuildingIcon, SaveIcon, PlusIcon, ArrowLeftIcon, UsersIcon, GraduationCapIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";

const DEPARTMENTS_DATA = [
    {
        id: "cs",
        name: "Computer Science",
        faculty: ["Dr. Henderson", "Prof. Miller", "Dr. Sarah"],
        years: [
            {
                id: "cs-y1",
                name: "1st Year",
                incharge: "Dr. Henderson",
                students: [
                    { roll: "CS2401", name: "Aditya Kumar" },
                    { roll: "CS2402", name: "Rohan Sharma" },
                    { roll: "CS2403", name: "Sneha Patil" },
                    { roll: "CS2404", name: "Priya Singh" },
                ],
            },
            {
                id: "cs-y2",
                name: "2nd Year",
                incharge: "Prof. Miller",
                students: [
                    { roll: "CS2301", name: "Ananya Iyer" },
                    { roll: "CS2302", name: "Vikram Seth" },
                    { roll: "CS2303", name: "Siddharth Malhotra" },
                ],
            },
            {
                id: "cs-y3",
                name: "3rd Year",
                incharge: "Dr. Sarah",
                students: [
                    { roll: "CS2201", name: "Ishaan Khattar" },
                    { roll: "CS2202", name: "Zoya Akhtar" },
                ],
            },
            {
                id: "cs-y4",
                name: "4th Year",
                incharge: "Dr. Henderson",
                students: [
                    { roll: "CS2101", name: "Kabir Khan" },
                ],
            },
        ],
    },
    {
        id: "ee",
        name: "Electronics",
        faculty: ["Dr. Thompson", "Prof. Lee"],
        years: [
            {
                id: "ee-y1",
                name: "1st Year",
                incharge: "Dr. Thompson",
                students: [
                    { roll: "EE2401", name: "Meera Reddy" },
                    { roll: "EE2402", name: "Arjun Kapoor" },
                ],
            },
        ],
    },
    {
        id: "me",
        name: "Mechanical Engineering",
        faculty: ["Prof. Gadha", "Dr. Gupta"],
        years: [
            {
                id: "me-y1",
                name: "1st Year",
                incharge: "Prof. Gadha",
                students: [
                    { roll: "ME2401", name: "Rahul Dravid" },
                ],
            },
        ],
    },
    {
        id: "ce",
        name: "Civil Engineering",
        faculty: ["Dr. Banerjee"],
        years: [
            {
                id: "ce-y1",
                name: "1st Year",
                incharge: "Dr. Banerjee",
                students: [
                    { roll: "CE2401", name: "Saurav Ganguly" },
                ],
            },
        ],
    },
];

export default function InstitutionSetup() {
    const [activeTab, setActiveTab] = useState("details");
    const [selectedDeptId, setSelectedDeptId] = useState<string | null>(null);
    const [selectedYearId, setSelectedYearId] = useState<string | null>(null);
    const userRole = localStorage.getItem("userRole") || "admin";

    const selectedDept = DEPARTMENTS_DATA.find(d => d.id === selectedDeptId);
    const selectedYear = selectedDept?.years.find(y => y.id === selectedYearId);

    const filteredDepts = DEPARTMENTS_DATA.filter(dept => {
        if (userRole === "teacher") {
            // Mock: Teachers only see Computer Science
            return dept.name === "Computer Science";
        }
        return true;
    });

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
                        onClick={() => {
                            setActiveTab("details");
                            setSelectedDeptId(null);
                            setSelectedYearId(null);
                        }}
                        className={`px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${activeTab === "details"
                            ? "border-b-2 border-primary text-primary"
                            : "text-muted-foreground"
                            }`}
                    >
                        Institution Details
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab("departments");
                            setSelectedDeptId(null);
                            setSelectedYearId(null);
                        }}
                        className={`px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${activeTab === "departments"
                            ? "border-b-2 border-primary text-primary"
                            : "text-muted-foreground"
                            }`}
                    >
                        Departments
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab("structure");
                            setSelectedDeptId(null);
                            setSelectedYearId(null);
                        }}
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
                    <>
                        {!selectedDeptId ? (
                            <Card className="rounded-lg border-border">
                                <CardHeader>
                                    <CardTitle className="font-heading font-bold">Departments</CardTitle>
                                    <CardDescription>Add and manage departments. Click a department to view details.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {userRole === "admin" && (
                                            <>
                                                <div className="flex gap-2">
                                                    <Input placeholder="New Department Name" className="max-w-sm" />
                                                    <Button variant="outline" className="rounded-md font-medium">
                                                        <PlusIcon className="mr-2 h-4 w-4" />
                                                        Add
                                                    </Button>
                                                </div>
                                                <Separator />
                                            </>
                                        )}
                                        <div className="grid gap-3 sm:grid-cols-2">
                                            {filteredDepts.map((dept) => (
                                                <div
                                                    key={dept.id}
                                                    onClick={() => setSelectedDeptId(dept.id)}
                                                    className="flex items-center justify-between rounded-lg border border-border p-4 bg-secondary/30 hover:bg-secondary/50 cursor-pointer transition-colors group"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary border border-primary/20">
                                                            <BuildingIcon className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <span className="font-bold text-sm tracking-tight">{dept.name}</span>
                                                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-0.5">
                                                                {dept.years.length} Academic Years
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <ChevronRightIcon className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : !selectedYearId ? (
                            <div className="space-y-4">
                                <Button
                                    variant="ghost"
                                    onClick={() => setSelectedDeptId(null)}
                                    className="h-8 px-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary"
                                >
                                    <ArrowLeftIcon className="mr-2 h-3 w-3" />
                                    Back to Departments
                                </Button>
                                <Card className="rounded-lg border-border overflow-hidden">
                                    <CardHeader className="bg-muted/5 border-b border-border py-6 px-8 flex-row items-center justify-between">
                                        <div>
                                            <CardTitle className="font-heading text-2xl font-bold">{selectedDept?.name}</CardTitle>
                                            <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-primary/70 mt-1">
                                                Department Overview
                                            </CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-8 space-y-10">
                                        <div className="grid gap-6 md:grid-cols-3">
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                                                    <UsersIcon className="h-3 w-3" />
                                                    Faculty Members
                                                </div>
                                                <div className="space-y-1.5 pt-1">
                                                    {selectedDept?.faculty.map((f, i) => (
                                                        <div key={i} className="text-sm font-medium px-3 py-1.5 bg-secondary rounded-md border border-border/50 text-foreground/80">
                                                            {f}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="col-span-2 p-6 border border-border bg-secondary/20 rounded-lg flex flex-col items-center justify-center text-center space-y-2">
                                                <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground/50">Total Enrolled Students</div>
                                                <div className="text-5xl font-heading font-bold text-primary tabular-nums">
                                                    {selectedDept?.years.reduce((acc, y) => acc + y.students.length, 0)}
                                                </div>
                                                <p className="text-[10px] font-medium text-muted-foreground leading-relaxed max-w-[200px]">
                                                    Aggregate count across all academic years and semesters.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-muted-foreground">Academic Classes</h3>
                                            </div>
                                            <div className="grid gap-3 sm:grid-cols-2">
                                                {selectedDept?.years.map((year) => (
                                                    <div
                                                        key={year.id}
                                                        onClick={() => setSelectedYearId(year.id)}
                                                        className="flex items-center justify-between p-4 rounded-lg bg-card border border-border hover:bg-muted/5 hover:border-primary/30 transition-all cursor-pointer group shadow-sm"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-9 w-9 bg-primary/10 rounded-md border border-primary/20 flex items-center justify-center text-primary">
                                                                <GraduationCapIcon className="h-4 w-4" />
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-sm tracking-tight">{year.name}</p>
                                                                <p className="text-[10px] text-muted-foreground font-medium">Incharge: {year.incharge}</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right flex items-center gap-3">
                                                            <span className="text-xs font-bold font-heading tabular-nums">{year.students.length} Students</span>
                                                            <ChevronRightIcon className="h-4 w-4 text-muted-foreground/20 group-hover:text-primary" />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <Button
                                    variant="ghost"
                                    onClick={() => setSelectedYearId(null)}
                                    className="h-8 px-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary"
                                >
                                    <ArrowLeftIcon className="mr-2 h-3 w-3" />
                                    Back to {selectedDept?.name}
                                </Button>
                                <Card className="rounded-lg border-border">
                                    <CardHeader className="bg-muted/5 border-b border-border py-6 px-8">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-primary/70 mb-1">{selectedDept?.name}</p>
                                                <CardTitle className="font-heading text-2xl font-bold">{selectedYear?.name}</CardTitle>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 mb-1">Faculty Incharge</p>
                                                <p className="font-bold text-sm">{selectedYear?.incharge}</p>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="p-8 border-b border-border bg-secondary/10">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-muted-foreground">Student Roster</h3>
                                                <div className="text-xs font-bold px-3 py-1 bg-background border border-border rounded-md text-muted-foreground">
                                                    Total: {selectedYear?.students.length}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm text-left">
                                                <thead className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground bg-muted/5 border-b border-border">
                                                    <tr>
                                                        <th className="w-[120px] px-8 py-3">Roll No</th>
                                                        <th className="px-8 py-3">Full Name</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {selectedYear?.students.map((student) => (
                                                        <tr key={student.roll} className="hover:bg-secondary/30 transition-colors border-b border-border last:border-0 text-sm">
                                                            <td className="font-heading font-black text-xs text-primary/60 px-8 py-4">{student.roll}</td>
                                                            <td className="font-bold text-foreground/80 px-8 py-4">{student.name}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </>
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
