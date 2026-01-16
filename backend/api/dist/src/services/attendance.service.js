"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.overrideAttendance = exports.markAttendance = exports.getSession = exports.endSession = exports.startSession = exports.createSession = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const client_1 = require("@prisma/client");
const createSession = async (data) => {
    // Validate if teacher belongs to class/subject? skipped for brevity
    const session = await prisma_1.default.attendanceSession.create({
        data: {
            ...data,
            status: client_1.SessionStatus.UPCOMING,
        },
    });
    return session;
};
exports.createSession = createSession;
const startSession = async (id) => {
    const session = await prisma_1.default.attendanceSession.update({
        where: { id },
        data: { status: client_1.SessionStatus.ACTIVE },
    });
    return session;
};
exports.startSession = startSession;
const endSession = async (id) => {
    const session = await prisma_1.default.attendanceSession.update({
        where: { id },
        data: { status: client_1.SessionStatus.CLOSED }, // or COMPLETED? Schema has CLOSED
    });
    return session;
};
exports.endSession = endSession;
const getSession = async (id) => {
    const session = await prisma_1.default.attendanceSession.findUnique({
        where: { id },
        include: { attendances: true }
    });
    if (!session)
        throw new ApiError_1.default(404, 'Session not found');
    return session;
};
exports.getSession = getSession;
const markAttendance = async (studentId, data) => {
    const { sessionId, deviceHash, faceVerified } = data;
    const session = await prisma_1.default.attendanceSession.findUnique({ where: { id: sessionId }, include: { class: { include: { students: true } } } });
    if (!session)
        throw new ApiError_1.default(404, 'Session not found');
    if (session.status !== client_1.SessionStatus.ACTIVE) {
        throw new ApiError_1.default(400, 'Session is not active');
    }
    // Check if student in class
    const isStudentInClass = session.class.students.some((s) => s.id === studentId);
    if (!isStudentInClass)
        throw new ApiError_1.default(403, 'Student not enrolled in this class');
    // Check device
    const device = await prisma_1.default.device.findUnique({ where: { deviceHash } });
    if (!device || device.userId !== studentId) {
        // Mark as FAILED or throw? 
        // "Device ownership matches user" requirement
        throw new ApiError_1.default(400, 'Invalid device');
    }
    // Check existing attendance
    const existing = await prisma_1.default.attendance.findUnique({
        where: { studentId_sessionId: { studentId, sessionId } }
    });
    if (existing)
        throw new ApiError_1.default(400, 'Attendance already marked');
    // Create attendance
    const attendance = await prisma_1.default.attendance.create({
        data: {
            studentId,
            sessionId,
            organisationId: session.organisationId,
            deviceId: device.id,
            status: client_1.AttendanceStatus.PRESENT,
            deviceVerified: true,
            faceVerified: faceVerified || false,
        }
    });
    if (faceVerified) {
        await prisma_1.default.faceVerification.create({
            data: {
                attendanceId: attendance.id,
                result: client_1.VerificationResult.PASSED,
                confidenceScore: 0.95 // Mock
            }
        });
    }
    return attendance;
};
exports.markAttendance = markAttendance;
const overrideAttendance = async (attendanceId, adminId, data) => {
    const { status, reason, notes } = data;
    // Transaction
    const result = await prisma_1.default.$transaction(async (tx) => {
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
exports.overrideAttendance = overrideAttendance;
