import { AttendanceStats, ClassSession, Course, CourseDetails, DailyAttendance, ReportSummary, User } from '../types/domain';

export const currentUser: User = {
    id: 'u1',
    name: 'Alex Thompson',
    avatarUrl: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png', // Simple reliable placeholder
    studentId: '#ST-2024-08',
    department: 'Computer Science',
    classGrade: 'B.Tech - 3rd Year',
    rollNo: 'CS2021045',
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
    // Fixed to October 2023 for Mock Data consistency
    const year = 2023;
    const month = 9; // October (0-indexed)
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
        // Create date string "YYYY-MM-DD"
        // Note: Months depend on your date library or convention. 
        // Here we build "2023-10-XX" manually or via Date object.
        const dateObj = new Date(year, month, i);
        // Helper to format YYYY-MM-DD locally to avoid timezone shifts if using UTC methods
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

        let status: DailyAttendance['status'] = 'none';

        // Map original day numbers to statuses for existing logic preservation
        if ([7, 8, 9, 10, 11, 14, 15, 16, 18, 20, 21, 24].includes(i)) status = 'present';
        if ([13].includes(i)) status = 'late';
        if ([5].includes(i)) status = 'absent';

        days.push({ date: dateStr, status });
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

export const mockReportData: ReportSummary = {
    month: 'October 2023',
    totalSessions: 120,
    presentSessions: 98,
    absentSessions: 12,
    lateSessions: 10,
    attendancePercentage: 82,
    trend: [
        { day: 'Mon', present: 8, absent: 1 },
        { day: 'Tue', present: 7, absent: 2 },
        { day: 'Wed', present: 8, absent: 0 },
        { day: 'Thu', present: 6, absent: 3 },
        { day: 'Fri', present: 9, absent: 0 },
        { day: 'Sat', present: 4, absent: 0 },
    ],
    subjects: [
        {
            id: 's1',
            subjectName: 'Advanced Mathematics',
            percentage: 92,
            totalClasses: 24,
            attendedClasses: 22,
            color: '#3B82F6' // info
        },
        {
            id: 's2',
            subjectName: 'Computer Science 101',
            percentage: 85,
            totalClasses: 30,
            attendedClasses: 25,
            color: '#A855F7' // purple
        },
        {
            id: 's3',
            subjectName: 'Modern History',
            percentage: 78,
            totalClasses: 20,
            attendedClasses: 15,
            color: '#F97316' // orange
        },
        {
            id: 's4',
            subjectName: 'Physics 201',
            percentage: 65,
            totalClasses: 28,
            attendedClasses: 18,
            color: '#EF4444' // destructive
        },
    ]
};
