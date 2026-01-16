import prisma from '../config/prisma';
import ApiError from '../utils/ApiError';
import { JoinRequestStatus, Role } from '@prisma/client';

export const listRequests = async (institutionId: string, userRole: Role, userId: string) => {
    const where: any = {
        institutionId,
        status: JoinRequestStatus.PENDING, // Usually want to see pending ones
    };

    // Teacher Restriction: Can only see STUDENT requests
    if (userRole === Role.TEACHER) {
        where.user = {
            role: Role.STUDENT
        };
    }
    // Admin sees all (TEACHER and STUDENT)

    return await prisma.joinRequest.findMany({
        where,
        include: {
            user: {
                select: { id: true, name: true, email: true, role: true, avatarUrl: true }
            }
        },
        orderBy: { createdAt: 'desc' }
    });
};

export const updateStatus = async (
    requestId: string,
    status: JoinRequestStatus,
    approverId: string,
    approverRole: Role,
    institutionId: string
) => {
    // 1. Fetch Request
    const request = await prisma.joinRequest.findUnique({
        where: { id: requestId },
        include: { user: true }
    });

    if (!request) {
        throw new ApiError(404, 'Join request not found');
    }

    if (request.institutionId !== institutionId) {
        throw new ApiError(403, 'Request belongs to another institution');
    }

    if (request.status !== JoinRequestStatus.PENDING) {
        throw new ApiError(400, 'Request is already processed');
    }

    // 2. Permission Check
    if (approverRole === Role.TEACHER) {
        // Teachers can ONLY approve STUDENTS
        if (request.user.role !== Role.STUDENT) {
            throw new ApiError(403, 'Teachers can only approve Student requests');
        }
    }
    // Admin can approve anyone

    // 3. Process Status
    if (status === JoinRequestStatus.APPROVED) {
        // Transaction to update status AND link user
        await prisma.$transaction([
            prisma.joinRequest.update({
                where: { id: requestId },
                data: { status: JoinRequestStatus.APPROVED }
            }),
            prisma.user.update({
                where: { id: request.userId },
                data: { institutionId: request.institutionId }
            })
        ]);
        return { message: 'Request approved and user linked' };
    } else if (status === JoinRequestStatus.REJECTED) {
        await prisma.joinRequest.update({
            where: { id: requestId },
            data: { status: JoinRequestStatus.REJECTED }
        });
        return { message: 'Request rejected' };
    } else {
        throw new ApiError(400, 'Invalid status');
    }
};
