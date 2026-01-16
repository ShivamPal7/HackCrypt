import prisma from '../config/prisma';
import ApiError from '../utils/ApiError';
import { AttendanceStatus } from '@prisma/client';

export const createSession = async (userId: string, data: any) => {
    // If Teacher creates a "Session", it's an AttendanceSession linked to a Lecture.
    const lecture = await prisma.lecture.findUnique({ where: { id: data.lectureId } });
    if (!lecture) throw new ApiError(404, 'Lecture not found');

    // Create Session
    const session = await prisma.attendanceSession.create({
        data: {
            lectureId: data.lectureId,
            institutionId: lecture.institutionId,
            status: 'ACTIVE',
            startTime: new Date()
        }
    });
    return session;
};

export const getSession = async (id: string, institutionId: string) => {
    const session = await prisma.attendanceSession.findUnique({
        where: { id },
        include: { attendances: true, lecture: true }
    });
    if (!session) throw new ApiError(404, 'Session not found');
    if (session.institutionId !== institutionId) throw new ApiError(403, 'Access denied');
    return session;
};

export const endSession = async (id: string, institutionId: string) => {
    const session = await prisma.attendanceSession.findUnique({ where: { id } });
    if (!session) throw new ApiError(404, 'Session not found');
    if (session.institutionId !== institutionId) throw new ApiError(403, 'Access denied');

    const updated = await prisma.attendanceSession.update({
        where: { id },
        data: { status: 'CLOSED', endTime: new Date() }
    });
    return updated;
};

export const markAttendance = async (studentId: string, data: any, institutionId: string) => {
    const { lectureId, status, deviceHash, faceVerified } = data; // lectureId is mandatory now

    const lecture = await prisma.lecture.findUnique({
        where: { id: lectureId },
        include: { class: { include: { students: true } } }
    });
    if (!lecture) throw new ApiError(404, 'Lecture not found');

    if (lecture.institutionId !== institutionId) {
        throw new ApiError(403, 'Lecture belongs to another institution');
    }

    // Strict Check: Student must belong to the Lecture's Class
    const isStudentInClass = lecture.class.students.some(s => s.id === studentId);
    if (!isStudentInClass) {
        throw new ApiError(403, 'Student does not belong to the class of this lecture');
    }

    // Optional: Device Check
    let deviceId = null;
    if (deviceHash) {
        const device = await prisma.device.findUnique({ where: { deviceHash } });
        if (device) deviceId = device.id;
    }

    const attendance = await prisma.attendance.create({
        data: {
            studentId,
            lectureId,
            institutionId,
            classId: lecture.classId,
            departmentId: lecture.class.departmentId, // Denormalized
            status: status || AttendanceStatus.PRESENT,
            deviceVerified: !!deviceId,
            faceVerified: faceVerified || false,
            deviceId,
            // sessionId: data.sessionId // Optional if passed
        },
    });
    return attendance;
};

export const overrideAttendance = async (attendanceId: string, adminId: string, data: any) => {
    const { status, reason, notes } = data;

    // Transaction
    const result = await prisma.$transaction(async (tx) => {
        const attendance = await tx.attendance.update({
            where: { id: attendanceId },
            data: { status },
        });

        await tx.attendanceOverride.create({
            data: {
                attendanceId,
                overriddenById: adminId,
                reason,
                notes,
            }
        });

        return attendance;
    });


    // ... existing overrideAttendance ...
    return result;
};

// ==========================================
// CANONICAL API HELPERS
// ==========================================

export const closeActiveSession = async (lectureId: string, institutionId: string) => {
    // Find active session for this lecture
    const session = await prisma.attendanceSession.findFirst({
        where: {
            lectureId,
            institutionId,
            status: 'ACTIVE'
        }
    });

    if (!session) throw new ApiError(404, 'No active session found for this lecture');

    return prisma.attendanceSession.update({
        where: { id: session.id },
        data: { status: 'CLOSED', endTime: new Date() }
    });
};

export const getLectureSessions = async (lectureId: string, institutionId: string) => {
    // Verify lecture belongs to institution
    const lecture = await prisma.lecture.findUnique({ where: { id: lectureId } });
    if (!lecture || lecture.institutionId !== institutionId) throw new ApiError(403, 'Access denied');

    return prisma.attendanceSession.findMany({
        where: { lectureId },
        orderBy: { startTime: 'desc' }
    });
};

export const getStudentAttendance = async (studentId: string, institutionId: string) => {
    // Check access? Student accessing own, or Admin/Teacher accessing student?
    // Service just returns data, controller checks permission.
    // Ensure student is in institution - implied by data query or check?
    // Let's rely on data query scoping.
    return prisma.attendance.findMany({
        where: { studentId, institutionId },
        include: { lecture: true, session: true },
        orderBy: { createdAt: 'desc' }
    });
};

export const getLectureAttendance = async (lectureId: string, institutionId: string) => {
    const lecture = await prisma.lecture.findUnique({ where: { id: lectureId } });
    if (!lecture || lecture.institutionId !== institutionId) throw new ApiError(403, 'Access denied');

    return prisma.attendance.findMany({
        where: { lectureId },
        include: { student: { select: { id: true, name: true, email: true } }, session: true },
        orderBy: { createdAt: 'desc' }
    });
};

export const getAttendanceOverride = async (id: string, institutionId: string) => {
    const attendance = await prisma.attendance.findUnique({
        where: { id },
        include: { override: true }
    });
    if (!attendance || attendance.institutionId !== institutionId) throw new ApiError(404, 'record not found');
    return attendance.override;
};

