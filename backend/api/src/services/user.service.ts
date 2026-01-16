import prisma from '../config/prisma';
import ApiError from '../utils/ApiError';
import bcrypt from 'bcryptjs';

export const createUser = async (data: any, institutionId: string) => {
    // Admin creating user for their institution
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw new ApiError(400, 'Email already in use');

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
        data: {
            ...data,
            password: hashedPassword,
            institutionId, // Force link
        },
    });

    const { password, ...rest } = user;
    return rest;
};

export const getAllUsers = async (institutionId: string) => {
    return prisma.user.findMany({
        where: { institutionId },
        select: { id: true, name: true, email: true, role: true, isActive: true, avatarUrl: true, firstName: true, lastName: true }
    });
};

export const getUser = async (id: string, institutionId: string) => {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user || user.institutionId !== institutionId) throw new ApiError(404, 'User not found');
    const { password, ...rest } = user;
    return rest;
};

export const updateUser = async (id: string, data: any, institutionId: string) => {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user || user.institutionId !== institutionId) throw new ApiError(404, 'User not found');

    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }
    const updated = await prisma.user.update({
        where: { id },
        data,
    });
    const { password, ...rest } = updated;
    return rest;
};

export const updateStatus = async (id: string, isActive: boolean, institutionId: string) => {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user || user.institutionId !== institutionId) throw new ApiError(404, 'User not found');

    // Prevent disabling self? Controller should handle or here?
    // Let's allow it but UI should warn.

    return prisma.user.update({
        where: { id },
        data: { isActive },
        select: { id: true, isActive: true }
    });
};

export const updateProfile = async (id: string, data: any) => {
    // Self update, no institution check needed strictly if auth worked, but good practice.
    // data: firstName, lastName, avatarUrl, phone, bio
    return prisma.user.update({
        where: { id },
        data,
        select: { id: true, name: true, firstName: true, lastName: true, avatarUrl: true, bio: true, phoneNumber: true }
    });
};

export const deleteUser = async (id: string, institutionId: string) => {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user || user.institutionId !== institutionId) throw new ApiError(404, 'User not found');

    await prisma.user.delete({ where: { id } });
    return { message: 'User deleted' };
};

