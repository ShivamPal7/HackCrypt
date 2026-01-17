import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Student {
    id: string;
    rollNo: string;
    name: string;
    class: string;
    status: "Active" | "Inactive";
}

interface StudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (student: Student) => void;
    student?: Student | null;
}

export function StudentModal({ isOpen, onClose, onSave, student }: StudentModalProps) {
    const [formData, setFormData] = React.useState<Student>({
        id: "",
        rollNo: "",
        name: "",
        class: "CS-A",
        status: "Active",
    });

    React.useEffect(() => {
        if (student) {
            setFormData(student);
        } else {
            setFormData({
                id: Math.random().toString(36).substr(2, 9),
                rollNo: "",
                name: "",
                class: "CS-A",
                status: "Active",
            });
        }
    }, [student, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-lg rounded-lg border bg-card p-6 shadow-md">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-heading text-xl font-bold text-foreground">
                        {student ? "Edit Student Details" : "Enroll New Student"}
                    </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Student Name</Label>
                        <Input
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. John Doe"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Roll Number</Label>
                            <Input
                                value={formData.rollNo}
                                onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                                placeholder="e.g. 2024MS101"
                                required
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Class / Section</Label>
                            <Select
                                value={formData.class}
                                onValueChange={(val) => setFormData({ ...formData, class: val })}
                            >
                                <SelectTrigger className="rounded-md">
                                    <SelectValue placeholder="Select Class" />
                                </SelectTrigger>
                                <SelectContent className="rounded-md">
                                    <SelectItem value="CS-A">CS-A</SelectItem>
                                    <SelectItem value="CS-B">CS-B</SelectItem>
                                    <SelectItem value="CS-C">CS-C</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Status</Label>
                        <Select
                            value={formData.status}
                            onValueChange={(val: "Active" | "Inactive") => setFormData({ ...formData, status: val })}
                        >
                            <SelectTrigger className="rounded-md">
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent className="rounded-md">
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t mt-4">
                        <Button type="button" variant="ghost" onClick={onClose} className="rounded-md font-medium uppercase tracking-widest text-[10px]">Cancel</Button>
                        <Button type="submit" className="bg-primary hover:opacity-90 text-primary-foreground rounded-md px-6 font-medium uppercase tracking-widest text-[10px]">
                            {student ? "Save Changes" : "Enroll Student"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
