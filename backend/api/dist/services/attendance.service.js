"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttendanceOverride = exports.getLectureAttendance = exports.getStudentAttendance = exports.getLectureSessions = exports.closeActiveSession = exports.overrideAttendance = exports.markAttendance = exports.endSession = exports.getSession = exports.createSession = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const client_1 = require("@prisma/client");
const createSession = async (userId, data) => {
    // If Teacher creates a "Session", it's an AttendanceSession linked to a Lecture.
    const lecture = await prisma_1.default.lecture.findUnique({ where: { id: data.lectureId } });
    if (!lecture)
        throw new ApiError_1.default(404, 'Lecture not found');
    // Create Session
    const session = await prisma_1.default.attendanceSession.create({
        data: {
            lectureId: data.lectureId,
            institutionId: lecture.institutionId,
            status: 'ACTIVE',
            startTime: new Date()
        }
    });
    return session;
};
exports.createSession = createSession;
const getSession = async (id, institutionId) => {
    const session = await prisma_1.default.attendanceSession.findUnique({
        where: { id },
        include: { attendances: true, lecture: true }
    });
    if (!session)
        throw new ApiError_1.default(404, 'Session not found');
    if (session.institutionId !== institutionId)
        throw new ApiError_1.default(403, 'Access denied');
    return session;
};
exports.getSession = getSession;
const endSession = async (id, institutionId) => {
    const session = await prisma_1.default.attendanceSession.findUnique({ where: { id } });
    if (!session)
        throw new ApiError_1.default(404, 'Session not found');
    if (session.institutionId !== institutionId)
        throw new ApiError_1.default(403, 'Access denied');
    const updated = await prisma_1.default.attendanceSession.update({
        where: { id },
        data: { status: 'CLOSED', endTime: new Date() }
    });
    return updated;
};
exports.endSession = endSession;
const markAttendance = async (studentId, data, institutionId) => {
    const { lectureId, status, deviceHash, faceVerified } = data; // lectureId is mandatory now
    const lecture = await prisma_1.default.lecture.findUnique({
        where: { id: lectureId },
        include: { class: { include: { students: true } } }
    });
    if (!lecture)
        throw new ApiError_1.default(404, 'Lecture not found');
    if (lecture.institutionId !== institutionId) {
        throw new ApiError_1.default(403, 'Lecture belongs to another institution');
    }
    // Strict Check: Student must belong to the Lecture's Class
    const isStudentInClass = lecture.class.students.some(s => s.id === studentId);
    if (!isStudentInClass) {
        throw new ApiError_1.default(403, 'Student does not belong to the class of this lecture');
    }
    // Optional: Device Check
    let deviceId = null;
    if (deviceHash) {
        const device = await prisma_1.default.device.findUnique({ where: { deviceHash } });
        if (device)
            deviceId = device.id;
    }
    const attendance = await prisma_1.default.attendance.create({
        data: {
            studentId,
            lectureId,
            institutionId,
            classId: lecture.classId,
            departmentId: lecture.class.departmentId, // Denormalized
            status: status || client_1.AttendanceStatus.PRESENT,
            deviceVerified: !!deviceId,
            faceVerified: faceVerified || false,
            deviceId,
            // sessionId: data.sessionId // Optional if passed
        },
    });
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
    // ... existing overrideAttendance ...
    return result;
};
exports.overrideAttendance = overrideAttendance;
// ==========================================
// CANONICAL API HELPERS
// ==========================================
const closeActiveSession = async (lectureId, institutionId) => {
    // Find active session for this lecture
    const session = await prisma_1.default.attendanceSession.findFirst({
        where: {
            lectureId,
            institutionId,
            status: 'ACTIVE'
        }
    });
    if (!session)
        throw new ApiError_1.default(404, 'No active session found for this lecture');
    return prisma_1.default.attendanceSession.update({
        where: { id: session.id },
        data: { status: 'CLOSED', endTime: new Date() }
    });
};
exports.closeActiveSession = closeActiveSession;
const getLectureSessions = async (lectureId, institutionId) => {
    // Verify lecture belongs to institution
    const lecture = await prisma_1.default.lecture.findUnique({ where: { id: lectureId } });
    if (!lecture || lecture.institutionId !== institutionId)
        throw new ApiError_1.default(403, 'Access denied');
    return prisma_1.default.attendanceSession.findMany({
        where: { lectureId },
        orderBy: { startTime: 'desc' }
    });
};
exports.getLectureSessions = getLectureSessions;
const getStudentAttendance = async (studentId, institutionId) => {
    // Check access? Student accessing own, or Admin/Teacher accessing student?
    // Service just returns data, controller checks permission.
    // Ensure student is in institution - implied by data query or check?
    // Let's rely on data query scoping.
    return prisma_1.default.attendance.findMany({
        where: { studentId, institutionId },
        include: { lecture: true, session: true },
        orderBy: { createdAt: 'desc' }
    });
};
exports.getStudentAttendance = getStudentAttendance;
const getLectureAttendance = async (lectureId, institutionId) => {
    const lecture = await prisma_1.default.lecture.findUnique({ where: { id: lectureId } });
    if (!lecture || lecture.institutionId !== institutionId)
        throw new ApiError_1.default(403, 'Access denied');
    return prisma_1.default.attendance.findMany({
        where: { lectureId },
        include: { student: { select: { id: true, name: true, email: true } }, session: true },
        orderBy: { createdAt: 'desc' }
    });
};
exports.getLectureAttendance = getLectureAttendance;
const getAttendanceOverride = async (id, institutionId) => {
    const attendance = await prisma_1.default.attendance.findUnique({
        where: { id },
        include: { override: true }
    });
    if (!attendance || attendance.institutionId !== institutionId)
        throw new ApiError_1.default(404, 'record not found');
    return attendance.override;
};
exports.getAttendanceOverride = getAttendanceOverride;
