import prisma from '../config/prisma';
import ApiError from '../utils/ApiError';
import bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

import { generateTokens } from './auth.service';

export const createInstitution = async (data: any) => {
    const { institution: institutionData, user: userData } = data;

    // Check if user email exists
    const existingUser = await prisma.user.findUnique({ where: { email: userData.email } });
    if (existingUser) {
        throw new ApiError(400, 'User with this email already exists');
    }

    // Generate unique join code
    const joinCode = uuidv4().slice(0, 8).toUpperCase();

    // Atomic Creation Transaction
    const result = await prisma.$transaction(async (tx) => {
        // 1. Create Institution
        const institution = await tx.institution.create({
            data: {
                name: institutionData.name,
                joinCode: joinCode,
            },
        });

        // 2. Hash Password
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // 3. Create Admin User linked to Institution
        const user = await tx.user.create({
            data: {
                email: userData.email,
                password: hashedPassword,
                name: userData.name,
                role: Role.ADMIN,
                institutionId: institution.id,
            },
        });

        // 4. Generate Tokens
        const { accessToken, refreshToken } = generateTokens(user);

        return {
            institution,
            user: { id: user.id, email: user.email, name: user.name, role: user.role },
            accessToken,
            refreshToken
        };
    });

    return result;
};

export const joinInstitution = async (userId: string, joinCode: string) => {
    // Verify user doesn't have an institution
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user?.institutionId) {
        throw new ApiError(400, 'User already belongs to an institution');
    }

    // Find institution
    const institution = await prisma.institution.findUnique({ where: { joinCode } });
    if (!institution) {
        throw new ApiError(404, 'Invalid join code');
    }

    // Check existing request
    const existingRequest = await prisma.joinRequest.findUnique({
        where: { userId_institutionId: { userId, institutionId: institution.id } }
    });

    if (existingRequest) {
        if (existingRequest.status === 'PENDING') throw new ApiError(400, 'Join request already pending');
        if (existingRequest.status === 'APPROVED') throw new ApiError(400, 'User already joined');
    }

    // Create Request
    const request = await prisma.joinRequest.create({
        data: {
            userId,
            institutionId: institution.id,
            status: 'PENDING'
        }
    });

    return request;
};

export const getJoinRequests = async (institutionId: string) => {
    return await prisma.joinRequest.findMany({
        where: { institutionId, status: 'PENDING' },
        include: { user: { select: { id: true, name: true, email: true, role: true } } }
    });
};

export const approveJoinRequest = async (adminId: string, requestId: string) => {
    // Verify Admin belongs to same institution is handled by middleware injecting institutionId?
    // We should double check if the request matches the admin's institution.

    // Note: In controller, we will pass admin's institutionId to verify ownership.

    return await prisma.$transaction(async (tx) => {
        const request = await tx.joinRequest.findUnique({ where: { id: requestId } });
        if (!request) throw new ApiError(404, 'Request not found');

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

export const rejectJoinRequest = async (requestId: string) => {
    await prisma.joinRequest.update({
        where: { id: requestId },
        data: { status: 'REJECTED' }
    });
    return { message: 'Request rejected' };
};

export const getInstitution = async (id: string) => {
    const institution = await prisma.institution.findUnique({
        where: { id },
    });
    if (!institution) throw new ApiError(404, 'Institution not found');
    return institution;
};

export const updateInstitution = async (id: string, data: any) => {
    const institution = await prisma.institution.update({
        where: { id },
        data,
    });
    return institution;
};

export const deleteInstitution = async (id: string, adminId: string) => {
    // Cascading delete is handled by Prisma Schema (@onDelete: Cascade)
    await prisma.institution.delete({ where: { id } });
    return { message: 'Institution deleted' };
};

