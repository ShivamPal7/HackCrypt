import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon, BookOpenIcon, EditIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SubjectModal } from "@/components/SubjectModal";

interface Subject {
    id: string;
    name: string;
    code: string;
    teachers: string[];
    classes: string[];
}

const INITIAL_SUBJECTS: Subject[] = [
    { id: "1", name: "Data Structures", code: "CS-101", teachers: ["Prof. Smith", "Prof. Doe"], classes: ["CS-A", "IT-B"] },
    { id: "2", name: "Database Management", code: "CS-102", teachers: ["Prof. Doe"], classes: ["CS-B"] },
    { id: "3", name: "Computer Networks", code: "CS-103", teachers: ["Prof. Smith"], classes: ["IT-A", "IT-B"] },
    { id: "4", name: "Operating Systems", code: "CS-104", teachers: ["Prof. Adams"], classes: ["CS-A"] },
    { id: "5", name: "Web Development", code: "CS-105", teachers: ["Prof. Wilson"], classes: ["CS-A", "IT-A"] },
];

export default function SubjectConfig() {
    const [subjects, setSubjects] = React.useState<Subject[]>(INITIAL_SUBJECTS);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingSubject, setEditingSubject] = React.useState<Subject | null>(null);

    const handleCreateNew = () => {
        setEditingSubject(null);
        setIsModalOpen(true);
    };

    const handleEdit = (subject: Subject) => {
        setEditingSubject(subject);
        setIsModalOpen(true);
    };

    const handleSave = (subject: Subject) => {
        if (editingSubject) {
            setSubjects(subjects.map((s) => (s.id === subject.id ? subject : s)));
        } else {
            setSubjects([...subjects, subject]);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                    <h2 className="font-heading text-2xl font-bold text-foreground">Academics</h2>
                    <Button onClick={handleCreateNew} className="bg-primary hover:opacity-90 text-primary-foreground rounded-md px-4 h-9">
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Create New Subject
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-1 w-8 bg-primary opacity-50" />
                    <p className="text-muted-foreground font-semibold text-[10px] uppercase tracking-wider">Course Registry & Faculty Assignment</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {subjects.map((subject) => (
                    <Card key={subject.id} className="border border-border bg-card shadow-sm rounded-lg overflow-hidden flex flex-col">
                        <CardHeader className="p-5 border-b border-border bg-muted/5">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/5 rounded-md text-primary border border-primary/10">
                                        <BookOpenIcon className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <CardTitle className="font-heading font-bold text-base text-foreground leading-tight">{subject.name}</CardTitle>
                                        <CardDescription className="text-[10px] font-bold text-primary/70 uppercase tracking-widest mt-0.5">Code: {subject.code}</CardDescription>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-md text-muted-foreground/60 hover:text-primary hover:bg-primary/5 transition-colors"
                                    onClick={() => handleEdit(subject)}
                                >
                                    <EditIcon className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-5 space-y-4 flex-1">
                            <div className="space-y-1.5">
                                <span className="text-[9px] font-bold text-muted-foreground/50 uppercase tracking-widest">Assigned Teachers</span>
                                <div className="flex flex-wrap gap-1.5 pt-0.5">
                                    {subject.teachers.map((teacher, i) => (
                                        <div key={i} className="px-2 py-0.5 bg-muted/50 rounded-md text-[10px] font-medium border border-border/50 text-muted-foreground">
                                            {teacher}
                                        </div>
                                    ))}
                                    {subject.teachers.length === 0 && <span className="text-[10px] italic text-muted-foreground/40">No teachers assigned</span>}
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <span className="text-[9px] font-bold text-muted-foreground/50 uppercase tracking-widest">Enrollment Classes</span>
                                <div className="flex flex-wrap gap-1.5 pt-0.5">
                                    {subject.classes.map((cls, i) => (
                                        <Badge key={i} variant="outline" className="rounded-md px-1.5 py-0 text-[9px] font-bold bg-background text-foreground/70 border-border shadow-none">
                                            {cls}
                                        </Badge>
                                    ))}
                                    {subject.classes.length === 0 && <span className="text-[10px] italic text-muted-foreground/40">No classes assigned</span>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <SubjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                subject={editingSubject}
            />
        </div>
    );
}
