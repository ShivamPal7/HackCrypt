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
