"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInstitution = exports.updateInstitution = exports.getInstitution = exports.rejectJoinRequest = exports.approveJoinRequest = exports.getJoinRequests = exports.joinInstitution = exports.createInstitution = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const auth_service_1 = require("./auth.service");
const createInstitution = async (data) => {
    const { institution: institutionData, user: userData } = data;
    // Check if user email exists
    const existingUser = await prisma_1.default.user.findUnique({ where: { email: userData.email } });
    if (existingUser) {
        throw new ApiError_1.default(400, 'User with this email already exists');
    }
    // Generate unique join code
    const joinCode = (0, uuid_1.v4)().slice(0, 8).toUpperCase();
    // Atomic Creation Transaction
    const result = await prisma_1.default.$transaction(async (tx) => {
        // 1. Create Institution
        const institution = await tx.institution.create({
            data: {
                name: institutionData.name,
                joinCode: joinCode,
            },
        });
        // 2. Hash Password
        const hashedPassword = await bcryptjs_1.default.hash(userData.password, 10);
        // 3. Create Admin User linked to Institution
        const user = await tx.user.create({
            data: {
                email: userData.email,
                password: hashedPassword,
                name: userData.name,
                role: client_1.Role.ADMIN,
                institutionId: institution.id,
            },
        });
        // 4. Generate Tokens
        const { accessToken, refreshToken } = (0, auth_service_1.generateTokens)(user);
        return {
            institution,
            user: { id: user.id, email: user.email, name: user.name, role: user.role },
            accessToken,
            refreshToken
        };
    });
    return result;
};
exports.createInstitution = createInstitution;
const joinInstitution = async (userId, joinCode) => {
    // Verify user doesn't have an institution
    const user = await prisma_1.default.user.findUnique({ where: { id: userId } });
    if (user?.institutionId) {
        throw new ApiError_1.default(400, 'User already belongs to an institution');
    }
    // Find institution
    const institution = await prisma_1.default.institution.findUnique({ where: { joinCode } });
    if (!institution) {
        throw new ApiError_1.default(404, 'Invalid join code');
    }
    // Check existing request
    const existingRequest = await prisma_1.default.joinRequest.findUnique({
        where: { userId_institutionId: { userId, institutionId: institution.id } }
    });
    if (existingRequest) {
        if (existingRequest.status === 'PENDING')
            throw new ApiError_1.default(400, 'Join request already pending');
        if (existingRequest.status === 'APPROVED')
            throw new ApiError_1.default(400, 'User already joined');
    }
    // Create Request
    const request = await prisma_1.default.joinRequest.create({
        data: {
            userId,
            institutionId: institution.id,
            status: 'PENDING'
        }
    });
    return request;
};
exports.joinInstitution = joinInstitution;
const getJoinRequests = async (institutionId) => {
    return await prisma_1.default.joinRequest.findMany({
        where: { institutionId, status: 'PENDING' },
        include: { user: { select: { id: true, name: true, email: true, role: true } } }
    });
};
exports.getJoinRequests = getJoinRequests;
const approveJoinRequest = async (adminId, requestId) => {
    // Verify Admin belongs to same institution is handled by middleware injecting institutionId?
    // We should double check if the request matches the admin's institution.
    // Note: In controller, we will pass admin's institutionId to verify ownership.
    return await prisma_1.default.$transaction(async (tx) => {
        const request = await tx.joinRequest.findUnique({ where: { id: requestId } });
        if (!request)
            throw new ApiError_1.default(404, 'Request not found');
        // Update Request
        await tx.joinRequest.update({
            where: { id: requestId },
            data: { status: 'APPROVED' }
        });
        // Update User
        await tx.user.update({
            where: { id: request.userId },
            data: { institutionId: request.institutionId }
        });
        return { message: 'Request approved' };
    });
};
exports.approveJoinRequest = approveJoinRequest;
const rejectJoinRequest = async (requestId) => {
    await prisma_1.default.joinRequest.update({
        where: { id: requestId },
        data: { status: 'REJECTED' }
    });
    return { message: 'Request rejected' };
};
exports.rejectJoinRequest = rejectJoinRequest;
const getInstitution = async (id) => {
    const institution = await prisma_1.default.institution.findUnique({
        where: { id },
    });
    if (!institution)
        throw new ApiError_1.default(404, 'Institution not found');
    return institution;
};
exports.getInstitution = getInstitution;
const updateInstitution = async (id, data) => {
    const institution = await prisma_1.default.institution.update({
        where: { id },
        data,
    });
    return institution;
};
exports.updateInstitution = updateInstitution;
const deleteInstitution = async (id, adminId) => {
    // Cascading delete is handled by Prisma Schema (@onDelete: Cascade)
    await prisma_1.default.institution.delete({ where: { id } });
    return { message: 'Institution deleted' };
};
exports.deleteInstitution = deleteInstitution;
