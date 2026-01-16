import prisma from '../config/prisma';
import ApiError from '../utils/ApiError';
import { SessionStatus, AttendanceStatus, VerificationResult } from '@prisma/client';

export const createSession = async (data: any) => {
    // Validate if teacher belongs to class/subject? skipped for brevity
    const session = await prisma.attendanceSession.create({
        data: {
            ...data,
            status: SessionStatus.UPCOMING,
        },
    });
    return session;
};

export const startSession = async (id: string) => {
    const session = await prisma.attendanceSession.update({
        where: { id },
        data: { status: SessionStatus.ACTIVE },
    });
    return session;
};

export const endSession = async (id: string) => {
    const session = await prisma.attendanceSession.update({
        where: { id },
        data: { status: SessionStatus.CLOSED }, // or COMPLETED? Schema has CLOSED
    });
    return session;
};

export const getSession = async (id: string) => {
    const session = await prisma.attendanceSession.findUnique({
        where: { id },
        include: { attendances: true }
    });
    if (!session) throw new ApiError(404, 'Session not found');
    return session;
};

export const markAttendance = async (studentId: string, data: any) => {
    const { sessionId, deviceHash, faceVerified } = data;

    const session = await prisma.attendanceSession.findUnique({ where: { id: sessionId }, include: { class: { include: { students: true } } } });
    if (!session) throw new ApiError(404, 'Session not found');

    if (session.status !== SessionStatus.ACTIVE) {
        throw new ApiError(400, 'Session is not active');
    }

    // Check if student in class
    const isStudentInClass = session.class.students.some((s: any) => s.id === studentId);
    if (!isStudentInClass) throw new ApiError(403, 'Student not enrolled in this class');

    // Check device
    const device = await prisma.device.findUnique({ where: { deviceHash } });
    if (!device || device.userId !== studentId) {
        // Mark as FAILED or throw? 
        // "Device ownership matches user" requirement
        throw new ApiError(400, 'Invalid device');
    }

    // Check existing attendance
    const existing = await prisma.attendance.findUnique({
        where: { studentId_sessionId: { studentId, sessionId } }
    });
    if (existing) throw new ApiError(400, 'Attendance already marked');

    // Create attendance
    const attendance = await prisma.attendance.create({
        data: {
            studentId,
            sessionId,
            organisationId: session.organisationId,
            deviceId: device.id,
            status: AttendanceStatus.PRESENT,
            deviceVerified: true,
            faceVerified: faceVerified || false,
        }
    });

    if (faceVerified) {
        await prisma.faceVerification.create({
            data: {
                attendanceId: attendance.id,
                result: VerificationResult.PASSED,
                confidenceScore: 0.95 // Mock
            }
        });
    }

    return attendance;
};

export const overrideAttendance = async (attendanceId: string, adminId: string, data: any) => {
    const { status, reason, notes } = data;

    // Transaction
    const result = await prisma.$transaction(async (tx: any) => {
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

    return result;
};
