import prisma from '../config/prisma';
import ApiError from '../utils/ApiError';

export const getClassAttendanceReport = async (classId: string, institutionId: string) => {
    const classData = await prisma.class.findUnique({ where: { id: classId } });
    if (!classData || classData.institutionId !== institutionId) throw new ApiError(404, 'Class not found');

    const attendances = await prisma.attendance.findMany({
        where: { classId },
        include: { student: { select: { name: true } } }
    });
    return attendances;
};

export const getStudentAttendanceReport = async (studentId: string, institutionId: string) => {
    // Verify aggregation ownership
    const attendances = await prisma.attendance.findMany({
        where: { studentId, institutionId },
        include: { lecture: { select: { title: true, startTime: true } } }
    });
    return attendances;
};

export const getSubjectAttendanceReport = async (subjectId: string, institutionId: string) => {
    // Verify subject
    const subject = await prisma.subject.findUnique({ where: { id: subjectId } });
    if (!subject || subject.institutionId !== institutionId) throw new ApiError(404, 'Subject not found');

    // Find lectures for this subject
    const lectures = await prisma.lecture.findMany({ where: { subjectId }, select: { id: true } });
    const lectureIds = lectures.map(l => l.id);

    const attendances = await prisma.attendance.findMany({
        where: { lectureId: { in: lectureIds } }
    });
    return attendances;
};

export const getStudentAttendanceSummary = async (studentId: string, institutionId: string) => {
    // 1. Verify Student Existence & Institution
    const student = await prisma.user.findUnique({
        where: { id: studentId },
    });

    if (!student || student.institutionId !== institutionId) {
        throw new ApiError(404, 'Student not found');
    }

    // 2. Get Class ID
    if (!student.studentClassId) {
        // If student not assigned to class, return 0 stats
        return {
            overallAttendancePercentage: 0,
            totalLecturesConducted: 0,
            totalLecturesAttended: 0,
            totalLecturesMissed: 0
        };
    }

    const classId = student.studentClassId;

    // 3. Get all Subjects for this Class
    const subjects = await prisma.subject.findMany({
        where: { classId },
        select: { id: true }
    });

    const subjectIds = subjects.map(s => s.id);

    if (subjectIds.length === 0) {
        return {
            overallAttendancePercentage: 0,
            totalLecturesConducted: 0,
            totalLecturesAttended: 0,
            totalLecturesMissed: 0
        };
    }

    // 4. Get Conducted Lectures (Status = CLOSED)
    // We filter by subjects in the student's class
    const conductedLectures = await prisma.lecture.findMany({
        where: {
            subjectId: { in: subjectIds },
            status: 'CLOSED'
        },
        select: { id: true }
    });

    const totalLecturesConducted = conductedLectures.length;

    if (totalLecturesConducted === 0) {
        return {
            overallAttendancePercentage: 0,
            totalLecturesConducted: 0,
            totalLecturesAttended: 0,
            totalLecturesMissed: 0
        };
    }

    // 5. Count Attended Lectures (Present or Late)
    const attendedCount = await prisma.attendance.count({
        where: {
            studentId,
            lectureId: { in: conductedLectures.map(l => l.id) },
            status: { in: ['PRESENT', 'LATE'] }
        }
    });

    const totalLecturesAttended = attendedCount;
    const totalLecturesMissed = totalLecturesConducted - totalLecturesAttended;

    const overallAttendancePercentage = Math.round((totalLecturesAttended / totalLecturesConducted) * 100);

    return {
        overallAttendancePercentage,
        totalLecturesConducted,
        totalLecturesAttended,
        totalLecturesMissed
    };
};

export const getStudentSubjectSummaries = async (studentId: string, institutionId: string, searchParams?: { search?: string }) => {
    // 1. Verify Student & Class
    const student = await prisma.user.findUnique({
        where: { id: studentId },
        select: { id: true, studentClassId: true, institutionId: true }
    });

    if (!student || student.institutionId !== institutionId) {
        throw new ApiError(404, 'Student not found');
    }

    if (!student.studentClassId) {
        return [];
    }

    const classId = student.studentClassId;

    // 2. Fetch Subjects (with optional Search)
    const whereSubject: any = { classId, institutionId };
    if (searchParams?.search) {
        whereSubject.name = { contains: searchParams.search, mode: 'insensitive' };
    }

    const subjects = await prisma.subject.findMany({
        where: whereSubject,
        include: {
            class: {
                select: {
                    _count: { select: { students: true } },
                    students: {
                        take: 5,
                        select: { avatarUrl: true, name: true }
                    }
                }
            }
        }
    });

    // 3. Calculate Stats for Each Subject
    // We need to fetch attendance in parallel or efficiently.
    // Let's iterate for now, or use groupBy if possible.
    // Query: For a subject, count Lectures (CLOSED), and My Attendance (PRESENT/LATE)

    const summaries = await Promise.all(subjects.map(async (subject) => {
        // Count Conducted Lectures for this Subject
        const totalConducted = await prisma.lecture.count({
            where: {
                subjectId: subject.id,
                status: 'CLOSED'
            }
        });

        // Count Attended by Me (requires fetching lectures IDs first? Or direct join logic?)
        // Attendance -> Lecture -> Subject. 
        // We can query Attendance where studentId = me AND lecture.subjectId = subject.id AND lecture.status = CLOSED
        const totalAttended = await prisma.attendance.count({
            where: {
                studentId,
                status: { in: ['PRESENT', 'LATE'] },
                lecture: {
                    subjectId: subject.id,
                    status: 'CLOSED'
                }
            }
        });

        const percentage = totalConducted > 0
            ? Math.round((totalAttended / totalConducted) * 100)
            : 0;

        return {
            subjectId: subject.id,
            subjectName: subject.name,
            subjectIcon: subject.icon,
            totalStudents: subject.class._count.students,
            studentIcons: subject.class.students.map(s => s.avatarUrl).filter(Boolean), // Classmates
            attendancePercentage: percentage,
            totalConducted,
            totalAttended
        };
    }));

    return summaries;
};

export const getStudentSubjectDetails = async (studentId: string, subjectId: string, institutionId: string) => {
    // 1. Verify Student
    const student = await prisma.user.findUnique({
        where: { id: studentId },
    });
    if (!student || student.institutionId !== institutionId) {
        throw new ApiError(404, 'Student not found');
    }

    // 2. Verify Subject & Class Link
    const subject = await prisma.subject.findUnique({
        where: { id: subjectId },
    });
    if (!subject || subject.institutionId !== institutionId) {
        throw new ApiError(404, 'Subject not found');
    }

    if (student.studentClassId !== subject.classId) {
        throw new ApiError(403, 'Subject does not belong to your class');
    }

    // 3. Calculate Metrics

    // Conducted: Lectures for this subject that are CLOSED
    const conductedLectures = await prisma.lecture.findMany({
        where: {
            subjectId,
            status: 'CLOSED'
        },
        select: { id: true }
    });
    const totalLecturesConducted = conductedLectures.length;

    // Attendance Stats
    // We can count based on status for these specific lectures
    const lectureIds = conductedLectures.map(l => l.id);

    // Attended (Present)
    const lecturesAttended = await prisma.attendance.count({
        where: {
            studentId,
            lectureId: { in: lectureIds },
            status: 'PRESENT'
        }
    });

    // Late
    const lecturesMarkedLate = await prisma.attendance.count({
        where: {
            studentId,
            lectureId: { in: lectureIds },
            status: 'LATE'
        }
    });

    // Missed = Conducted - (Present + Late)
    // Or we could count ABSENT explicitly? 
    // Spec implies "Missed" generally. Let's calculate it to be safe against data gaps, 
    // but typically it should be Conducted - (Present + Late + Excused).
    // Let's stick to simple: Missed = Total - (Present + Late).
    // If 'Excused' exists, it counts as attended? Or separate? 
    // User request: "Count total, attended, late, missed". 
    // If I am Excused, I didn't "Attend", but I didn't "Miss" in a negative way.
    // However, for simple UI metrics:
    // Attended = Present
    // Late = Late
    // Missed = (Conducted - Present - Late) (Assume strict)

    const lecturesMissed = totalLecturesConducted - (lecturesAttended + lecturesMarkedLate);

    return {
        subjectId,
        subjectName: subject.name,
        subjectIcon: subject.icon,
        totalLecturesConducted,
        lecturesAttended,
        lecturesMarkedLate,
        lecturesMissed
    };
};

export const getStudentAttendanceHeatmap = async (studentId: string, institutionId: string) => {
    // 1. Verify Student
    const student = await prisma.user.findUnique({
        where: { id: studentId },
    });
    if (!student || student.institutionId !== institutionId) {
        throw new ApiError(404, 'Student not found');
    }

    if (!student.studentClassId) return [];

    // 2. Fetch all CLOSED lectures for the student's class
    const lectures = await prisma.lecture.findMany({
        where: {
            classId: student.studentClassId,
            status: 'CLOSED'
        },
        select: { id: true, startTime: true }
    });

    if (lectures.length === 0) return [];

    // 3. Keep track of lecture IDs per date
    const lecturesByDate: Record<string, string[]> = {};
    lectures.forEach(l => {
        const date = l.startTime.toISOString().split('T')[0];
        if (!lecturesByDate[date]) lecturesByDate[date] = [];
        lecturesByDate[date].push(l.id);
    });

    // 4. Fetch Attendance for these lectures
    const lectureIds = lectures.map(l => l.id);
    const attendance = await prisma.attendance.findMany({
        where: {
            studentId,
            lectureId: { in: lectureIds }
        },
        select: { lectureId: true, status: true }
    });

    // Map attendance by lecture ID
    const attendanceMap: Record<string, string> = {};
    attendance.forEach(a => {
        attendanceMap[a.lectureId] = a.status;
    });

    // 5. Build Heatmap Data
    const heatmapData = Object.keys(lecturesByDate).sort().map(date => {
        const dailyLectureIds = lecturesByDate[date];
        const totalLectures = dailyLectureIds.length;

        let attendedCount = 0;
        let presentCount = 0;
        let lateCount = 0;

        dailyLectureIds.forEach(lid => {
            const status = attendanceMap[lid];
            if (status === 'PRESENT') {
                attendedCount++;
                presentCount++;
            }
            if (status === 'LATE') {
                attendedCount++;
                lateCount++;
            }
        });

        // Determine Status
        let status = 'absent';
        if (presentCount > 0) status = 'present';
        else if (lateCount > 0) status = 'late';
        else if (totalLectures === 0) status = 'none';

        // Determine Intensity (0-3) based on percentage attended
        const percentage = totalLectures > 0 ? (attendedCount / totalLectures) : 0;
        let intensity = 0;

        if (percentage === 0) intensity = 0; // None/Red
        else if (percentage <= 0.4) intensity = 1; // Low
        else if (percentage <= 0.8) intensity = 2; // Medium
        else intensity = 3; // High

        let intensityStr = 'none';
        if (intensity === 1) intensityStr = 'low';
        if (intensity === 2) intensityStr = 'medium';
        if (intensity === 3) intensityStr = 'high';

        return {
            date,
            status,
            intensity: intensityStr
        };
    });

    return heatmapData;
};

export const getStudentLectureHistory = async (studentId: string, institutionId: string, query: { search?: string, status?: string }) => {
    // 1. Verify Student
    const student = await prisma.user.findUnique({
        where: { id: studentId },
    });

    if (!student || student.institutionId !== institutionId) {
        throw new ApiError(404, 'Student not found');
    }

    if (!student.studentClassId) return [];

    // 2. Fetch Closed Lectures (Active and Upcoming don't have attendance)
    // Filter by search (title) if provided
    const lectureWhere: any = {
        classId: student.studentClassId,
        status: 'CLOSED'
    };

    if (query.search) {
        lectureWhere.title = { contains: query.search, mode: 'insensitive' };
    }

    const lectures = await prisma.lecture.findMany({
        where: lectureWhere,
        orderBy: { startTime: 'desc' }, // Latest first
        select: {
            id: true,
            title: true,
            startTime: true,
            endTime: true,
            topic: true // Fallback for title
        }
    });

    if (lectures.length === 0) return [];

    // 3. Fetch Attendance Records for these lectures
    const lectureIds = lectures.map(l => l.id);
    const attendances = await prisma.attendance.findMany({
        where: {
            studentId,
            lectureId: { in: lectureIds }
        },
        select: {
            lectureId: true,
            status: true,
            createdAt: true
        }
    });

    // Map attendance by LectureID
    const attendanceMap: Record<string, { status: string, checkInTime: Date | null }> = {};
    attendances.forEach(a => {
        attendanceMap[a.lectureId] = { status: a.status, checkInTime: a.createdAt };
    });

    // 4. Construct History & Filter by Status
    const history = lectures.map(l => {
        const record = attendanceMap[l.id];
        let status = 'ABSENT';
        let checkInTime = null;

        if (record) {
            status = record.status;
            checkInTime = record.checkInTime;
        }

        return {
            lectureId: l.id,
            title: l.title || l.topic || "Untitled Lecture",
            date: l.startTime,
            status,
            checkInTime
        };
    });

    // 5. Apply Status Filter (if provided)
    if (query.status) {
        return history.filter(h => h.status === query.status);
    }

    return history;
};





