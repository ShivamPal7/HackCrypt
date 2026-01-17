import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

interface TeacherModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (teacher: Teacher) => void;
    teacher?: Teacher | null;
}

export function TeacherModal({ isOpen, onClose, onSave, teacher }: TeacherModalProps) {
    const [formData, setFormData] = React.useState<Teacher>({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "Computer Science",
        designation: "professor",
        subjects: [],
    });

    React.useEffect(() => {
        if (teacher) {
            setFormData(teacher);
        } else {
            setFormData({
                id: Math.random().toString(36).substr(2, 9),
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                department: "Computer Science",
                designation: "professor",
                subjects: [],
            });
        }
    }, [teacher, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-2xl rounded-lg border bg-card p-8 shadow-lg">
                <div className="flex items-center justify-between mb-8 border-b pb-4">
                    <div>
                        <h3 className="font-heading text-xl font-bold text-foreground">
                            {teacher ? "Edit Teacher" : "Add New Teacher"}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                            {teacher ? "Update faculty details and assignments." : "Onboard a new faculty member to the system."}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary/60 border-b pb-1">Personal Information</h4>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">First Name</Label>
                                <Input
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    placeholder="e.g. Aditya"
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Last Name</Label>
                                <Input
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    placeholder="e.g. Bhatt"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Email Address</Label>
                                <Input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="sbnx001@gmail.com"
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Phone Number</Label>
                                <Input
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="27183564829"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary/60 border-b pb-1">Academic Role</h4>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Department</Label>
                                <Select
                                    value={formData.department}
                                    onValueChange={(val) => setFormData({ ...formData, department: val })}
                                >
                                    <SelectTrigger className="rounded-md">
                                        <SelectValue placeholder="Select Department" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-md">
                                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                                        <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                                        <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                                        <SelectItem value="Civil Engineering">Civil Engineering</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Designation</Label>
                                <Input
                                    value={formData.designation}
                                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                                    placeholder="e.g. professor"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-6 border-t mt-8">
                        <Button type="button" variant="ghost" onClick={onClose} className="rounded-md font-medium uppercase tracking-widest text-[10px]">Cancel</Button>
                        <Button type="submit" className="bg-primary hover:opacity-90 text-primary-foreground rounded-md px-8 font-medium uppercase tracking-widest text-[10px]">
                            {teacher ? "Update Teacher Account" : "Create Teacher Account"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
