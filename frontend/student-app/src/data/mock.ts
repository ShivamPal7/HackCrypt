import { AttendanceStats, ClassSession, Course, CourseDetails, DailyAttendance, User } from '../types/domain';

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

export const courses: Course[] = [
    {
        id: 'course1',
        title: 'Advanced Mathematics',
        professor: 'Prof. Katherine Johnson',
        location: 'Hall A',
        percentage: 94,
        iconName: 'function',
        themeColor: 'bg-info/10',
        totalStudents: 32,
        studentAvatars: [
            'https://randomuser.me/api/portraits/thumb/men/1.jpg',
            'https://randomuser.me/api/portraits/thumb/women/2.jpg',
            'https://randomuser.me/api/portraits/thumb/men/3.jpg',
        ],
    },
    {
        id: 'course2',
        title: 'Computer Science 101',
        professor: 'Prof. Alan Turing',
        location: 'Lab 4',
        percentage: 88,
        iconName: 'code',
        themeColor: 'bg-purple-500/10',
        totalStudents: 45,
        studentAvatars: [
            'https://randomuser.me/api/portraits/thumb/women/4.jpg',
            'https://randomuser.me/api/portraits/thumb/men/5.jpg',
        ],
    },
    {
        id: 'course3',
        title: 'Modern History',
        professor: 'Prof. Howard Zinn',
        location: 'Room 202',
        percentage: 91,
        iconName: 'history',
        themeColor: 'bg-orange-500/10',
        totalStudents: 18,
        studentAvatars: [
            'https://randomuser.me/api/portraits/thumb/men/6.jpg',
            'https://randomuser.me/api/portraits/thumb/women/7.jpg',
            'https://randomuser.me/api/portraits/thumb/men/8.jpg',
        ],
    },
    {
        id: 'course4',
        title: 'Physics 201',
        professor: 'Prof. Richard Feynman',
        location: 'Lab 1',
        percentage: 78,
        iconName: 'function',
        themeColor: 'bg-info/10',
        totalStudents: 50,
        studentAvatars: [
            'https://randomuser.me/api/portraits/thumb/men/9.jpg',
            'https://randomuser.me/api/portraits/thumb/women/10.jpg',
        ],
    },
    {
        id: 'course5',
        title: 'Art History',
        professor: 'Prof. Leonardo',
        location: 'Studio B',
        percentage: 92,
        iconName: 'history',
        themeColor: 'bg-orange-500/10',
        totalStudents: 25,
        studentAvatars: [
            'https://randomuser.me/api/portraits/thumb/men/11.jpg',
            'https://randomuser.me/api/portraits/thumb/women/12.jpg',
            'https://randomuser.me/api/portraits/thumb/men/13.jpg',
        ],
    },
];

const generateHeatmap = (): DailyAttendance[] => {
    const days: DailyAttendance[] = [];
    for (let i = 1; i <= 31; i++) {
        let status: DailyAttendance['status'] = 'none';
        if ([7, 8, 9, 10, 11, 14, 15, 16, 18, 20, 21, 24].includes(i)) status = 'present';
        if ([13].includes(i)) status = 'late';
        if ([5].includes(i)) status = 'absent';
        days.push({ day: i, status });
    }
    return days;
};

export const cs101Details: CourseDetails = {
    courseId: 'course2',
    stats: {
        present: 22,
        presentTrend: '+5%',
        late: 2,
        lateTrend: '-1%',
        absent: 1,
        absentTrend: '0%',
    },
    heatmap: generateHeatmap(),
    activityLog: [
        {
            id: 'a1',
            date: 'October 24, 2023',
            day: 'TUESDAY',
            time: '09:02 AM',
            status: 'Present',
            meta: 'Checked in at 09:02 AM',
        },
        {
            id: 'a2',
            date: 'October 22, 2023',
            day: 'SUNDAY',
            time: '09:15 AM',
            status: 'Present',
            meta: 'Checked in at 09:15 AM',
        },
        {
            id: 'a3',
            date: 'October 18, 2023',
            day: 'WEDNESDAY',
            time: '',
            status: 'Absent',
            meta: 'No check-in record',
        },
        {
            id: 'a4',
            date: 'October 15, 2023',
            day: 'SUNDAY',
            time: '08:58 AM',
            status: 'Present',
            meta: 'Checked in at 08:58 AM',
        },
        {
            id: 'a5',
            date: 'October 11, 2023',
            day: 'WEDNESDAY',
            time: '09:12 AM',
            status: 'Late',
            meta: 'Checked in at 09:12 AM',
        },
    ],
};
