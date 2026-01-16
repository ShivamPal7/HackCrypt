import prisma from '../config/prisma';
import ApiError from '../utils/ApiError';
import bcrypt from 'bcryptjs';

export const createUser = async (data: any) => {
    // Basic user creation (e.g. by admin)
    // Check email
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw new ApiError(400, 'Email already in use');

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
        data: {
            ...data,
            password: hashedPassword,
        },
    });

    const { password, ...rest } = user;
    return rest;
};

export const getUser = async (id: string) => {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new ApiError(404, 'User not found');
    const { password, ...rest } = user;
    return rest;
};

export const updateUser = async (id: string, data: any) => {
    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }
    const user = await prisma.user.update({
        where: { id },
        data,
    });
    const { password, ...rest } = user;
    return rest;
};

export const deleteUser = async (id: string) => {
    await prisma.user.delete({ where: { id } });
    return { message: 'User deleted' };
};
