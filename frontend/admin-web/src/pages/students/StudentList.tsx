import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MoreHorizontalIcon, PlusIcon, SearchIcon, FilterIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { StudentModal } from "@/components/StudentModal";

interface Student {
    id: string;
    rollNo: string;
    name: string;
    class: string;
    status: "Active" | "Inactive";
}

const INITIAL_STUDENTS: Student[] = [
    { id: "1", rollNo: "2024MS101", name: "Rahul Patil", class: "CS-A", status: "Active" },
    { id: "2", rollNo: "2024MS102", name: "Aditi Kulkarni", class: "CS-A", status: "Active" },
    { id: "3", rollNo: "2024MS103", name: "Rohit Sharma", class: "CS-B", status: "Inactive" },
    { id: "4", rollNo: "2024MS104", name: "Neha Singh", class: "CS-A", status: "Active" },
    { id: "5", rollNo: "2024MS105", name: "Kunal Verma", class: "CS-C", status: "Active" },
];

export default function StudentList() {
    const [students, setStudents] = React.useState<Student[]>(INITIAL_STUDENTS);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingStudent, setEditingStudent] = React.useState<Student | null>(null);

    const handleAdd = () => {
        setEditingStudent(null);
        setIsModalOpen(true);
    };

    const handleEdit = (student: Student) => {
        setEditingStudent(student);
        setIsModalOpen(true);
    };

    const handleSave = (studentData: Student) => {
        if (editingStudent) {
            setStudents(students.map(s => s.id === studentData.id ? studentData : s));
        } else {
            setStudents([...students, studentData]);
        }
    };

    const handleRemove = (id: string) => {
        setStudents(students.filter(s => s.id !== id));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Students</h2>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mt-1">Institutional Student Registry</p>
                </div>
                <Button onClick={handleAdd} className="bg-primary hover:opacity-90 rounded-md font-medium uppercase tracking-widest text-[10px] h-9 px-6 shadow-sm">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add Student
                </Button>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1 max-w-sm">
                    <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by name or roll no..." className="pl-9 bg-background border-border rounded-md h-10 text-sm" />
                </div>
                <div className="flex gap-2">
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[150px] rounded-md bg-background border-border h-10 text-sm">
                            <FilterIcon className="mr-2 h-3 w-3" />
                            <SelectValue placeholder="Class" />
                        </SelectTrigger>
                        <SelectContent className="rounded-md border-border shadow-md">
                            <SelectItem value="all" className="text-xs font-bold uppercase tracking-widest">All Classes</SelectItem>
                            <SelectItem value="cs-a" className="text-xs font-bold uppercase tracking-widest">CS-A</SelectItem>
                            <SelectItem value="cs-b" className="text-xs font-bold uppercase tracking-widest">CS-B</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Card className="border-border bg-card shadow-sm rounded-lg">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold font-heading">Enrolled Students</CardTitle>
                    <CardDescription className="text-[10px] font-bold uppercase tracking-widest opacity-60">Total {students.length} students currently registered.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left border-collapse">
                            <thead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 border-b">
                                <tr>
                                    <th className="px-4 py-3">Roll No</th>
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Class</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {students.map((student) => (
                                    <tr key={student.id} className="hover:bg-secondary transition-colors">
                                        <td className="px-4 py-3 font-bold text-xs tracking-tighter text-primary/80">{student.rollNo}</td>
                                        <td className="px-4 py-3 font-medium text-foreground">{student.name}</td>
                                        <td className="px-4 py-3 text-xs font-bold text-muted-foreground">{student.class}</td>
                                        <td className="px-4 py-3">
                                            <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border ${student.status === "Active"
                                                ? "bg-success/10 text-success border-success/20"
                                                : "bg-destructive/10 text-destructive border-destructive/20"
                                                }`}>
                                                {student.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors">
                                                        <MoreHorizontalIcon className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="rounded-md border-border shadow-md">
                                                    <DropdownMenuItem onClick={() => handleEdit(student)} className="text-[10px] font-bold uppercase tracking-widest">Edit Details</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-[10px] font-bold uppercase tracking-widest">View Attendance</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleRemove(student.id)} className="text-destructive text-[10px] font-bold uppercase tracking-widest">Suspend</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <StudentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                student={editingStudent}
            />
        </div>
    );
}

