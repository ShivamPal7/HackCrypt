import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DownloadIcon, FileTextIcon } from "lucide-react";

const REPORT_DATA = [
    { date: "2024-01-16", name: "Rahul Patil", rollNo: "2024MS101", subject: "DSA", time: "09:05 AM", status: "Present", method: "Biometric" },
    { date: "2024-01-16", name: "Aditi Kulkarni", rollNo: "2024MS102", subject: "DSA", time: "09:07 AM", status: "Present", method: "Biometric" },
    { date: "2024-01-16", name: "Rohit Sharma", rollNo: "2024MS103", subject: "CS-301", time: "09:10 AM", status: "Present", method: "Facial" },
    { date: "2024-01-16", name: "Neha Singh", rollNo: "2024MS104", subject: "DSA", time: "09:12 AM", status: "Present", method: "Biometric" },
    { date: "2024-01-16", name: "Kunal Verma", rollNo: "2024MS105", subject: "DBMS", time: "09:15 AM", status: "Present", method: "Biometric" },
    { date: "2024-01-16", name: "Amit Shah", rollNo: "2024MS106", subject: "DSA", time: "09:18 AM", status: "Present", method: "Facial" },
    { date: "2024-01-16", name: "Sanya Mishra", rollNo: "2024MS107", subject: "DSA", time: "09:20 AM", status: "Present", method: "Biometric" },
    { date: "2024-01-16", name: "Vikram Rathore", rollNo: "2024MS108", subject: "CS-301", time: "09:22 AM", status: "Present", method: "Biometric" },
];

export default function AttendanceReports() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight font-heading">Attendance Reports</h2>
                <div className="flex gap-2">
                    <Button variant="outline" className="rounded-md font-medium text-xs">
                        <FileTextIcon className="mr-2 h-4 w-4" />
                        Export CSV
                    </Button>
                    <Button variant="outline" className="rounded-md font-medium text-xs">
                        <DownloadIcon className="mr-2 h-4 w-4" />
                        Export PDF
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <CardTitle>Detailed Record</CardTitle>
                            <CardDescription>View and download attendance history.</CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Input type="date" className="w-[150px]" />
                            <Select defaultValue="all">
                                <SelectTrigger className="w-[150px]">
                                    <SelectValue placeholder="Subject" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Subjects</SelectItem>
                                    <SelectItem value="dsa">DSA</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-secondary border-b">
                                <tr>
                                    <th className="px-4 py-3">Date</th>
                                    <th className="px-4 py-3">Student Name</th>
                                    <th className="px-4 py-3">Roll No</th>
                                    <th className="px-4 py-3">Subject</th>
                                    <th className="px-4 py-3">Time In</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Method</th>
                                </tr>
                            </thead>
                            <tbody>
                                {REPORT_DATA.map((student, i) => (
                                    <tr key={i} className="border-b border-border hover:bg-secondary transition-colors">
                                        <td className="px-4 py-3 text-xs font-bold font-heading">{student.date}</td>
                                        <td className="px-4 py-3 font-medium">{student.name}</td>
                                        <td className="px-4 py-3 text-xs font-bold text-muted-foreground">{student.rollNo}</td>
                                        <td className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-primary/70">{student.subject}</td>
                                        <td className="px-4 py-3 text-xs font-medium">{student.time}</td>
                                        <td className="px-4 py-3">
                                            <span className={`${i === 2 ? "bg-warning/10 text-warning border-warning/20" : "bg-success/10 text-success border-success/20"} text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border`}>
                                                {i === 2 ? "Delayed" : student.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">{student.method}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
