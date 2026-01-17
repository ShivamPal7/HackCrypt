import prisma from '../config/prisma';
import ApiError from '../utils/ApiError';
import { SessionStatus } from '@prisma/client';

export const createLecture = async (data: any, user: any) => {
    const { institutionId, role, id: userId } = user;

    // 1. Role-Based Override
    if (role === 'TEACHER') {
        if (data.teacherId && data.teacherId !== userId) {
            throw new ApiError(403, 'Teachers can only create lectures for themselves');
        }
        data.teacherId = userId; // Force it
    }

    // 2. Verify Class and Subject belong to Institution
    const classData = await prisma.class.findUnique({
        where: { id: data.classId },
        include: { department: { include: { teachers: { select: { id: true } } } } }
    });
    if (!classData || classData.institutionId !== institutionId) throw new ApiError(404, 'Class not found in this institution');

    const subjectData = await prisma.subject.findUnique({
        where: { id: data.subjectId },
        include: { classes: { select: { id: true } } }
    });
    if (!subjectData || subjectData.institutionId !== institutionId) throw new ApiError(404, 'Subject not found in this institution');

    // 3. STRICT: Subject must be assigned to the Class
    const isLinked = subjectData.classes.some(c => c.id === data.classId);
    if (!isLinked) throw new ApiError(400, 'Subject is not assigned to this Class. Assign it first.');

    // 4. Verify Teacher Authorization (If Teacher)
    if (role === 'TEACHER') {
        // Must be Class Teacher OR in Department
        const isClassTeacher = classData.teacherId === userId;
        const isInDepartment = classData.department.teachers.some(t => t.id === userId);

        if (!isClassTeacher && !isInDepartment) {
            throw new ApiError(403, 'You are not authorized to schedule lectures for this class (Must be Class Teacher or in Department)');
        }
    }

    // 5. Verify Target Teacher (for Admin or valid Teacher)
    const teacher = await prisma.user.findUnique({ where: { id: data.teacherId } });
    if (!teacher || teacher.institutionId !== institutionId) throw new ApiError(404, 'Teacher not found in this institution');

    const lecture = await prisma.lecture.create({
        data: { ...data, institutionId },
    });
    return lecture;
};

export const getLectures = async (query: any, institutionId: string, user: any) => {
    const { date } = query;
    const where: any = { institutionId };

    // 1. Role-Based Scoping
    if (user.role === 'STUDENT') {
        if (!user.studentClassId) throw new ApiError(403, 'Student not assigned to any class');
        where.classId = user.studentClassId;
    } else if (user.role === 'TEACHER') {
        where.teacherId = user.id;
    }
    // Admin sees all (already scoped by institutionId)

    // 2. Date Filtering
    if (date) {
        // Specific date: 00:00 to 23:59
        const targetDate = new Date(date);
        const nextDay = new Date(targetDate);
        nextDay.setDate(targetDate.getDate() + 1);

        where.startTime = {
            gte: targetDate,
            lt: nextDay
        };
    } else {
        // No date? Fetch ALL scheduled lectures?
        // User spec: "If date is NOT provided: Fetch all scheduled lectures"
        // We might want to limit to 'future' or something for sanity, but sticking to spec "ALL".
    }

    // 3. Fetch Data
    const lectures = await prisma.lecture.findMany({
        where,
        include: {
            subject: { select: { icon: true } },
            // teacher: { select: { name: true } } // Optional, not requested in specs response
        },
        orderBy: { startTime: 'asc' }
    });

    // 4. Transform & Format
    const formattedLectures = lectures.map(l => {
        const start = l.startTime;
        const end = l.endTime;
        const duration = Math.round((end.getTime() - start.getTime()) / (1000 * 60)); // minutes

        // Format time HH:mm
        const formatTime = (d: Date) => d.toISOString().substring(11, 16);

        return {
            lectureId: l.id,
            title: l.title || l.topic || "Untitled Lecture", // Fallback
            date: start.toISOString().split('T')[0],
            startTime: formatTime(start),
            endTime: formatTime(end),
            duration,
            roomNumber: l.roomNumber,
            location: l.location,
            icon: l.icon || l.subject.icon, // Fallback
            status: l.status
        };
    });

    // 5. Grouping or Single Date Return
    if (date) {
        return {
            date: date,
            lectures: formattedLectures
        };
    } else {
        // Group by date
        const grouped: Record<string, typeof formattedLectures> = {};

        formattedLectures.forEach(l => {
            if (!grouped[l.date]) grouped[l.date] = [];
            grouped[l.date].push(l);
        });

        // Convert to array
        return Object.keys(grouped).sort().map(d => ({
            date: d,
            lectures: grouped[d]
        }));
    }
};


export const getLecture = async (id: string, institutionId: string) => {
    const lecture = await prisma.lecture.findUnique({
        where: { id },
        include: { subject: true, class: true, teacher: { select: { name: true, id: true } }, attendances: true }
    });
    if (!lecture || lecture.institutionId !== institutionId) throw new ApiError(404, 'Lecture not found');
    return lecture;
};

export const updateLecture = async (id: string, data: any, institutionId: string) => {
    const lecture = await prisma.lecture.findUnique({ where: { id } });
    if (!lecture || lecture.institutionId !== institutionId) throw new ApiError(404, 'Lecture not found');

    const updated = await prisma.lecture.update({
        where: { id },
        data,
    });
    return updated;
};

export const deleteLecture = async (id: string, institutionId: string) => {
    const lecture = await prisma.lecture.findUnique({ where: { id } });
    if (!lecture || lecture.institutionId !== institutionId) throw new ApiError(404, 'Lecture not found');

    await prisma.lecture.delete({ where: { id } });
    return { message: 'Lecture deleted' };
};

export const getTeacherLectures = async (teacherId: string, institutionId: string) => {
    const lectures = await prisma.lecture.findMany({
        where: { teacherId, institutionId },
        include: {
            subject: { select: { name: true, code: true } },
            class: {
                select: {
                    name: true,
                    _count: { select: { students: true } }
                }
            },
            attendances: {
                select: { status: true }
            }
        },
        orderBy: { startTime: 'desc' }
    });

    return lectures.map(l => {
        const totalStudents = l.class._count.students;

        // Calculate stats
        const presentCount = l.attendances.filter(a => ['PRESENT', 'LATE'].includes(a.status)).length;
        const attendancePercentage = totalStudents > 0 ? Math.round((presentCount / totalStudents) * 100) : 0;

        const start = l.startTime.getTime();
        const end = l.endTime.getTime();
        const durationMinutes = Math.round((end - start) / (1000 * 60));

        let progress = 0;
        if (l.status === 'CLOSED') progress = 100;
        else if (l.status === 'ACTIVE') {
            const now = Date.now();
            const elapsed = now - start;
            progress = Math.min(100, Math.max(0, Math.round((elapsed / (end - start)) * 100)));
        }

        return {
            id: l.id,
            title: l.title || l.topic || l.subject.name,
            subjectName: l.subject.name,
            subjectCode: l.subject.code,
            className: l.class.name,
            startTime: l.startTime,
            endTime: l.endTime,
            status: l.status,
            durationMinutes,
            totalStudents,
            presentCount,
            attendancePercentage,
            progress
        };
    });
};
