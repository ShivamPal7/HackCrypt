"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatus = exports.listRequests = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const client_1 = require("@prisma/client");
const listRequests = async (institutionId, userRole, userId) => {
    const where = {
        institutionId,
        status: client_1.JoinRequestStatus.PENDING, // Usually want to see pending ones
    };
    // Teacher Restriction: Can only see STUDENT requests
    if (userRole === client_1.Role.TEACHER) {
        where.user = {
            role: client_1.Role.STUDENT
        };
    }
    // Admin sees all (TEACHER and STUDENT)
    return await prisma_1.default.joinRequest.findMany({
        where,
        include: {
            user: {
                select: { id: true, name: true, email: true, role: true, avatarUrl: true }
            }
        },
        orderBy: { createdAt: 'desc' }
    });
};
exports.listRequests = listRequests;
const updateStatus = async (requestId, status, approverId, approverRole, institutionId) => {
    // 1. Fetch Request
    const request = await prisma_1.default.joinRequest.findUnique({
        where: { id: requestId },
        include: { user: true }
    });
    if (!request) {
        throw new ApiError_1.default(404, 'Join request not found');
    }
    if (request.institutionId !== institutionId) {
        throw new ApiError_1.default(403, 'Request belongs to another institution');
    }
    if (request.status !== client_1.JoinRequestStatus.PENDING) {
        throw new ApiError_1.default(400, 'Request is already processed');
    }
    // 2. Permission Check
    if (approverRole === client_1.Role.TEACHER) {
        // Teachers can ONLY approve STUDENTS
        if (request.user.role !== client_1.Role.STUDENT) {
            throw new ApiError_1.default(403, 'Teachers can only approve Student requests');
        }
    }
    // Admin can approve anyone
    // 3. Process Status
    if (status === client_1.JoinRequestStatus.APPROVED) {
        // Transaction to update status AND link user
        await prisma_1.default.$transaction([
            prisma_1.default.joinRequest.update({
                where: { id: requestId },
                data: { status: client_1.JoinRequestStatus.APPROVED }
            }),
            prisma_1.default.user.update({
                where: { id: request.userId },
                data: { institutionId: request.institutionId }
            })
        ]);
        return { message: 'Request approved and user linked' };
    }
    else if (status === client_1.JoinRequestStatus.REJECTED) {
        await prisma_1.default.joinRequest.update({
            where: { id: requestId },
            data: { status: client_1.JoinRequestStatus.REJECTED }
        });
        return { message: 'Request rejected' };
    }
    else {
        throw new ApiError_1.default(400, 'Invalid status');
    }
};
exports.updateStatus = updateStatus;
