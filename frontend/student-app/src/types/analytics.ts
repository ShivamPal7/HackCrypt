export type DateRange = 'Today' | 'Week' | 'Month' | 'Custom';

export interface AnalyticsSummary {
    attendanceRate: number; // Percentage (0-100)
    totalLectures: number;
    avgStudentsPresent: number;
    totalStudentsParsed: number;
}

export interface AnalyticsTrend {
    label: string; // e.g., "Mon", "Tue" or "Week 1"
    date: string; // YYYY-MM-DD
    value: number; // Attendance count or percentage
}

export interface SubjectPerformance {
    subjectId: string;
    subjectName: string;
    courseCode: string;
    attendanceRate: number;
    totalClasses: number;
}

export interface ClassPerformance {
    classId: string;
    className: string; // e.g., "CS-A", "CS-B"
    attendanceRate: number;
}

export interface AnalyticsData {
    summary: AnalyticsSummary;
    trends: AnalyticsTrend[];
    subjects: SubjectPerformance[];
    classes: ClassPerformance[];
}
