"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAudit = exports.getAttendanceAudit = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const getAttendanceAudit = async (attendanceId, institutionId) => {
    // Audit logs for attendance overrides/creation?
    // Using AttendanceOverride table + Attendance creation info
    const attendance = await prisma_1.default.attendance.findUnique({
        where: { id: attendanceId },
        include: { override: true }
    });
    if (!attendance || attendance.institutionId !== institutionId)
        throw new ApiError_1.default(404, 'Not found');
    return {
        createdAt: attendance.createdAt,
        updatedAt: attendance.updatedAt,
        markedVia: attendance.markedVia,
        override: attendance.override
    };
};
exports.getAttendanceAudit = getAttendanceAudit;
const getUserAudit = async (userId, institutionId) => {
    // Basic logs: creation, last login
    const user = await prisma_1.default.user.findUnique({ where: { id: userId } });
    if (!user || user.institutionId !== institutionId)
        throw new ApiError_1.default(404, 'User not found');
    return {
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        // lastLoginAt removed
        // formatted history could be added here if we had an ActionLog table
    };
};
exports.getUserAudit = getUserAudit;
