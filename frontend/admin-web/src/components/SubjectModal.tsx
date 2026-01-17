import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { XIcon } from "lucide-react";

interface Subject {
    id: string;
    name: string;
    code: string;
    teachers: string[];
    classes: string[];
}

interface SubjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (subject: Subject) => void;
    subject?: Subject | null;
}

export function SubjectModal({ isOpen, onClose, onSave, subject }: SubjectModalProps) {
    const [formData, setFormData] = React.useState<Subject>({
        id: "",
        name: "",
        code: "",
        teachers: [],
        classes: [],
    });

    const [teacherInput, setTeacherInput] = React.useState("");
    const [classInput, setClassInput] = React.useState("");

    React.useEffect(() => {
        if (subject) {
            setFormData(subject);
        } else {
            setFormData({
                id: Math.random().toString(36).substr(2, 9),
                name: "",
                code: "",
                teachers: [],
                classes: [],
            });
        }
    }, [subject, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    const addTeacher = () => {
        if (teacherInput.trim()) {
            setFormData({ ...formData, teachers: [...formData.teachers, teacherInput.trim()] });
            setTeacherInput("");
        }
    };

    const addClass = () => {
        if (classInput.trim()) {
            setFormData({ ...formData, classes: [...formData.classes, classInput.trim()] });
            setClassInput("");
        }
    };

    const removeTeacher = (index: number) => {
        setFormData({ ...formData, teachers: formData.teachers.filter((_, i) => i !== index) });
    };

    const removeClass = (index: number) => {
        setFormData({ ...formData, classes: formData.classes.filter((_, i) => i !== index) });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-lg rounded-lg border bg-card p-6 shadow-md">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-heading text-xl font-bold text-foreground">
                        {subject ? "Edit Subject" : "Create New Subject"}
                    </h3>
                    <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                        <XIcon className="h-4 w-4" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Subject Name</Label>
                        <Input
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Advanced Mathematics"
                            required
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Subject Code</Label>
                        <Input
                            value={formData.code}
                            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                            placeholder="e.g. MATH-402"
                            required
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Assigned Teachers</Label>
                        <div className="flex gap-2">
                            <Input
                                value={teacherInput}
                                onChange={(e) => setTeacherInput(e.target.value)}
                                placeholder="Enter teacher name"
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTeacher())}
                            />
                            <Button type="button" variant="outline" onClick={addTeacher} className="h-9 px-3 rounded-md font-medium">Add</Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {formData.teachers.map((teacher, i) => (
                                <div key={i} className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-xs font-medium border border-border">
                                    {teacher}
                                    <XIcon className="h-3 w-3 cursor-pointer text-muted-foreground hover:text-foreground" onClick={() => removeTeacher(i)} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Classes</Label>
                        <div className="flex gap-2">
                            <Input
                                value={classInput}
                                onChange={(e) => setClassInput(e.target.value)}
                                placeholder="e.g. CS-4A"
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addClass())}
                            />
                            <Button type="button" variant="outline" onClick={addClass} className="h-9 px-3 rounded-md font-medium">Add</Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {formData.classes.map((className, i) => (
                                <div key={i} className="flex items-center gap-1 px-2 py-1 bg-primary/5 text-primary rounded-md text-xs font-bold border border-primary/10">
                                    {className}
                                    <XIcon className="h-3 w-3 cursor-pointer opacity-70 hover:opacity-100" onClick={() => removeClass(i)} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button type="button" variant="ghost" onClick={onClose} className="rounded-md font-medium">Cancel</Button>
                        <Button type="submit" className="bg-primary hover:opacity-90 text-primary-foreground rounded-md px-6 font-medium">
                            {subject ? "Save Changes" : "Create Subject"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
