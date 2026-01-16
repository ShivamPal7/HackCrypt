import { AttendanceStats, ClassSession, User } from '../types/domain';

export const currentUser: User = {
    id: 'u1',
    name: 'Alex Johnson',
    // Using a placeholder avatar that looks professional
    avatarUrl: 'https://cdn.pixabay.com/photo/2024/02/12/17/23/ai-generated-8569065_1280.jpg',
};

export const attendanceSummary: AttendanceStats = {
    semesterLabel: 'Spring Semester 2024',
    percentage: 88,
    targetPercentage: 80,
    presentDays: 44,
    absentDays: 6,
    status: 'On Track',
};

export const todaysClasses: ClassSession[] = [
    {
        id: 'c1',
        title: 'Advanced Mathematics',
        location: 'Room 204, Hall B',
        startTime: '09:00 AM',
        statusLabel: 'STARTS IN 5M',
        type: 'lecture',
        iconName: 'function',
    },
    {
        id: 'c2',
        title: 'Computer Science 101',
        location: 'Lab 3, Science Block',
        startTime: '11:30 AM',
        durationMinutes: 90,
        type: 'lab',
        iconName: 'laptop',
    },
    {
        id: 'c3',
        title: 'Modern History',
        location: 'Remote via Zoom',
        startTime: '02:00 PM',
        durationMinutes: 60,
        type: 'remote',
        iconName: 'history',
    },
];
