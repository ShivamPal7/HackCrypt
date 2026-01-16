import prisma from '../config/prisma';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import env from '../config/env';
import ApiError from '../utils/ApiError';
import { Role, User } from '@prisma/client';

const generateTokens = (user: { id: string; role: Role; email: string }) => {
    const accessOptions: SignOptions = { expiresIn: env.JWT_EXPIRES_IN as any };
    const refreshOptions: SignOptions = { expiresIn: env.JWT_REFRESH_EXPIRES_IN as any };

    const accessToken = jwt.sign(
        { id: user.id, role: user.role, email: user.email },
        env.JWT_SECRET,
        accessOptions
    );

    const refreshToken = jwt.sign(
        { id: user.id },
        env.JWT_REFRESH_SECRET,
        refreshOptions
    );

    return { accessToken, refreshToken };
};

export const register = async (data: any) => {
    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) {
        throw new ApiError(400, 'Email already in use');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
        data: {
            ...data,
            password: hashedPassword,
        },
    });

    const { accessToken, refreshToken } = generateTokens(user);
    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, accessToken, refreshToken };
};

export const login = async (data: any) => {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
        throw new ApiError(401, 'Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid credentials');
    }

    const { accessToken, refreshToken } = generateTokens(user);
    const { password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, accessToken, refreshToken };
};

export const refreshToken = async (token: string) => {
    try {
        const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET) as { id: string };
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });

        if (!user) {
            throw new ApiError(401, 'Invalid refresh token');
        }

        const tokens = generateTokens(user);
        return tokens;
    } catch (error) {
        throw new ApiError(401, 'Invalid refresh token');
    }
};

export const getMe = async (userId: string) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new ApiError(404, 'User not found');

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
};
