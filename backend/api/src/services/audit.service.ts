import prisma from '../config/prisma';
import ApiError from '../utils/ApiError';

export const getAttendanceAudit = async (attendanceId: string, institutionId: string) => {
    // Audit logs for attendance overrides/creation?
    // Using AttendanceOverride table + Attendance creation info
    const attendance = await prisma.attendance.findUnique({
        where: { id: attendanceId },
        include: { override: true }
    });
    if (!attendance || attendance.institutionId !== institutionId) throw new ApiError(404, 'Not found');

    return {
        createdAt: attendance.createdAt,
        updatedAt: attendance.updatedAt,
        markedVia: attendance.markedVia,
        override: attendance.override
    };
};

export const getUserAudit = async (userId: string, institutionId: string) => {
    // Basic logs: creation, last login
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.institutionId !== institutionId) throw new ApiError(404, 'User not found');

    return {
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        lastLoginAt: user.lastLoginAt,
        // formatted history could be added here if we had an ActionLog table
    };
};
