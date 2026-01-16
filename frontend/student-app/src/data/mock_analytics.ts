import { AnalyticsData } from '../types/analytics';

export const mockAnalyticsData: Record<string, AnalyticsData> = {
    'Week': {
        summary: {
            attendanceRate: 85,
            totalLectures: 12,
            avgStudentsPresent: 45,
            totalStudentsParsed: 540
        },
        trends: [
            { label: 'Mon', date: '2023-10-23', value: 82 },
            { label: 'Tue', date: '2023-10-24', value: 88 },
            { label: 'Wed', date: '2023-10-25', value: 75 },
            { label: 'Thu', date: '2023-10-26', value: 90 },
            { label: 'Fri', date: '2023-10-27', value: 85 },
            { label: 'Sat', date: '2023-10-28', value: 60 },
        ],
        subjects: [
            { subjectId: '1', subjectName: 'UI Design', courseCode: 'CS101', attendanceRate: 92, totalClasses: 3 },
            { subjectId: '2', subjectName: 'Advanced Calculus', courseCode: 'MATH202', attendanceRate: 78, totalClasses: 4 },
            { subjectId: '3', subjectName: 'Physics II', courseCode: 'PHY201', attendanceRate: 85, totalClasses: 3 },
            { subjectId: '4', subjectName: 'Product Design', courseCode: 'DES304', attendanceRate: 88, totalClasses: 2 },
        ],
        classes: [
            { classId: 'c1', className: 'CS A', attendanceRate: 89 },
            { classId: 'c2', className: 'CS B', attendanceRate: 82 },
            { classId: 'c3', className: 'Math A', attendanceRate: 75 },
        ]
    },
    'Month': {
        summary: {
            attendanceRate: 82,
            totalLectures: 48,
            avgStudentsPresent: 43,
            totalStudentsParsed: 2150
        },
        trends: [
            { label: 'Week 1', date: '2023-10-01', value: 80 },
            { label: 'Week 2', date: '2023-10-08', value: 85 },
            { label: 'Week 3', date: '2023-10-15', value: 78 },
            { label: 'Week 4', date: '2023-10-22', value: 84 },
        ],
        subjects: [
            { subjectId: '1', subjectName: 'UI Design', courseCode: 'CS101', attendanceRate: 88, totalClasses: 12 },
            { subjectId: '2', subjectName: 'Advanced Calculus', courseCode: 'MATH202', attendanceRate: 75, totalClasses: 16 },
            { subjectId: '3', subjectName: 'Physics II', courseCode: 'PHY201', attendanceRate: 82, totalClasses: 12 },
            { subjectId: '4', subjectName: 'Product Design', courseCode: 'DES304', attendanceRate: 90, totalClasses: 8 },
        ],
        classes: [
            { classId: 'c1', className: 'CS A', attendanceRate: 85 },
            { classId: 'c2', className: 'CS B', attendanceRate: 80 },
            { classId: 'c3', className: 'Math A', attendanceRate: 78 },
        ]
    }
};

// Default fallback
export const defaultAnalytics = mockAnalyticsData['Week'];
