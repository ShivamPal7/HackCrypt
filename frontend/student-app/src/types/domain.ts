
export interface User {
    id: string;
    name: string;
    avatarUrl: string;
    studentId: string;
    department: string;
    classGrade: string; // "B.Tech - 3rd Year"
    rollNo: string;
}

export interface AttendanceStats {
    semesterLabel: string;
    percentage: number;
    targetPercentage: number;
    presentDays: number;
    absentDays: number;
    status: 'On Track' | 'At Risk' | 'Off Track';
}

export interface ClassSession {
    id: string;
    title: string;
    location: string;
    startTime: string; // ISO string or specific time string e.g., "09:00 AM"
    durationMinutes?: number;
    statusLabel?: string; // e.g. "STARTS IN 5M"
    type: 'lecture' | 'lab' | 'remote';
    iconName: 'function' | 'laptop' | 'history'; // Mapping to icon names
}

export interface Course {
    id: string;
    title: string;
    professor: string;
    location: string;
    percentage: number;
    iconName: 'function' | 'laptop' | 'history' | 'code';
    themeColor: string; // e.g. "bg-info/10" or hex
    totalStudents: number;
    // We will simulate avatars by just having a count or a few URLs
    studentAvatars: string[];
}

export interface TabRoute {
    name: string;
    label: string;
    icon: string;
}

export interface DailyAttendance {
    date: string; // ISO Date "YYYY-MM-DD"
    status: 'present' | 'absent' | 'late' | 'none'; // 'none' for future/empty
    intensity?: 'low' | 'medium' | 'high'; // For heatmap coloring
}

export interface ActivityLog {
    id: string;
    date: string; // "October 24, 2023"
    day: string; // "TUESDAY"
    time: string; // "09:02 AM"
    status: 'Present' | 'Late' | 'Absent';
    meta?: string; // "Checked in at..." or "No check-in record"
}

export interface CourseDetails {
    courseId: string;
    stats: {
        present: number;
        presentTrend: string; // "+5%"
        late: number;
        lateTrend: string; // "-1%"
        absent: number;
        absentTrend: string; // "0%"
    };
    heatmap: DailyAttendance[];
    activityLog: ActivityLog[];
}

export interface AttendanceTrend {
    day: string; // "Mon", "Tue"
    present: number;
    absent: number;
}

export interface SubjectAttendance {
    id: string;
    subjectName: string;
    percentage: number;
    totalClasses: number;
    attendedClasses: number;
    color: string; // Support themed colors
}

export interface ReportSummary {
    month: string;
    totalSessions: number;
    presentSessions: number;
    absentSessions: number;
    lateSessions: number;
    attendancePercentage: number;
    trend: AttendanceTrend[];
    subjects: SubjectAttendance[];
}
