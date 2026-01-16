import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlusIcon, SearchIcon, MoreVerticalIcon, MailIcon, PhoneIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { TeacherModal } from "@/components/TeacherModal";

interface Teacher {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    department: string;
    designation: string;
    subjects: string[];
}

const INITIAL_TEACHERS: Teacher[] = [
    { id: "1", firstName: "Dr. Ankit", lastName: "Sharma", email: "ankit.sharma@university.edu", phone: "+91 98765 00011", department: "Computer Science", designation: "Professor", subjects: ["DSA", "DBMS"] },
    { id: "2", firstName: "Prof. Neha", lastName: "Verma", email: "neha.verma@university.edu", phone: "+91 98765 00012", department: "Information Technology", designation: "Associate Professor", subjects: ["Networks", "OS"] },
    { id: "3", firstName: "Dr. Rajesh", lastName: "Kumar", email: "rajesh.kumar@university.edu", phone: "+91 98765 00013", department: "Computer Science", designation: "Assistant Professor", subjects: ["Web Tech", "Java"] },
    { id: "4", firstName: "Prof. Priya", lastName: "Mehta", email: "priya.mehta@university.edu", phone: "+91 98765 00014", department: "Electrical Engineering", designation: "Professor", subjects: ["Circuits", "Power"] },
    { id: "5", firstName: "Dr. Aman", lastName: "Gupta", email: "aman.gupta@university.edu", phone: "+91 98765 00015", department: "Computer Science", designation: "Professor", subjects: ["AI", "ML"] },
    { id: "6", firstName: "Prof. Sneha", lastName: "Iyer", email: "sneha.iyer@university.edu", phone: "+91 98765 00016", department: "Information Technology", designation: "Assistant Professor", subjects: ["Cybersecurity", "Ethics"] },
];

export default function TeacherList() {
    const [teachers, setTeachers] = React.useState<Teacher[]>(INITIAL_TEACHERS);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingTeacher, setEditingTeacher] = React.useState<Teacher | null>(null);
    const userRole = localStorage.getItem("userRole") || "admin";
    const isAdmin = userRole === "admin";

    const handleAdd = () => {
        setEditingTeacher(null);
        setIsModalOpen(true);
    };

    const handleEdit = (teacher: Teacher) => {
        setEditingTeacher(teacher);
        setIsModalOpen(true);
    };

    const handleSave = (teacherData: Teacher) => {
        if (editingTeacher) {
            setTeachers(teachers.map(t => t.id === teacherData.id ? teacherData : t));
        } else {
            setTeachers([...teachers, teacherData]);
        }
    };

    const handleRemove = (id: string) => {
        setTeachers(teachers.filter(t => t.id !== id));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Teachers</h2>
                    <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest font-bold opacity-70">Manage faculty members and their subject assignments.</p>
                </div>
                {isAdmin && (
                    <Button onClick={handleAdd} className="bg-primary hover:opacity-90 rounded-md font-medium uppercase tracking-widest text-[10px] h-9 px-6">
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Add Teacher
                    </Button>
                )}
            </div>

            <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-sm">
                    <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search teachers..." className="pl-9 bg-background border-border rounded-md h-10 text-sm" />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {teachers.map((teacher) => (
                    <Card key={teacher.id} className="border-border bg-card shadow-sm rounded-lg">
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold">
                                    {teacher.firstName[0]}{teacher.lastName[0]}
                                </div>
                                <div>
                                    <CardTitle className="text-base font-bold font-heading">{teacher.firstName} {teacher.lastName}</CardTitle>
                                    <CardDescription className="text-[10px] font-bold uppercase tracking-widest opacity-70">{teacher.department}</CardDescription>
                                </div>
                            </div>
                            {isAdmin && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="-mr-2 h-8 w-8 text-muted-foreground hover:text-primary transition-colors">
                                            <MoreVerticalIcon className="h-4 w-4" />
                                            <span className="sr-only">Menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="rounded-md border-border shadow-md">
                                        <DropdownMenuItem onClick={() => handleEdit(teacher)} className="text-[10px] font-bold uppercase tracking-widest">Edit Details</DropdownMenuItem>
                                        <DropdownMenuItem className="text-[10px] font-bold uppercase tracking-widest">View Profile</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleRemove(teacher.id)} className="text-destructive text-[10px] font-bold uppercase tracking-widest">Remove</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </CardHeader>
                        <CardContent>
                            <div className="mt-4 grid gap-2 text-xs text-muted-foreground font-medium">
                                <div className="flex items-center gap-2">
                                    <MailIcon className="h-3.5 w-3.5 opacity-60" />
                                    <span>{teacher.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <PhoneIcon className="h-3.5 w-3.5 opacity-60" />
                                    <span>{teacher.phone}</span>
                                </div>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {teacher.subjects.map((subject, idx) => (
                                    <div key={idx} className="rounded-md bg-primary/5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-primary border border-primary/10">
                                        {subject}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <TeacherModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                teacher={editingTeacher}
            />
        </div>
    );
}

