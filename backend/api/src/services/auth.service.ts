import prisma from '../config/prisma';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import env from '../config/env';
import ApiError from '../utils/ApiError';
import { Role, User } from '@prisma/client';

export const generateTokens = (user: { id: string; role: Role; email: string; institutionId: string | null }) => {
    const accessOptions: SignOptions = { expiresIn: env.JWT_EXPIRES_IN as any };
    const refreshOptions: SignOptions = { expiresIn: env.JWT_REFRESH_EXPIRES_IN as any };

    const accessToken = jwt.sign(
        { id: user.id, role: user.role, email: user.email, institutionId: user.institutionId },
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

import { sendOtp as sendEmailOtp } from './email.service';

export const sendOtp = async (email: string) => {
    // 1. Check if email is already registered? Optional. User might be re-registering.
    // 2. Generate 6 digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // 3. Save to DB (Upsert to handle resend)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    // Check if OTP exists
    const existingOtp = await prisma.otp.findFirst({ where: { email } });
    if (existingOtp) {
        await prisma.otp.update({
            where: { id: existingOtp.id },
            data: { code, expiresAt }
        });
    } else {
        await prisma.otp.create({
            data: { email, code, expiresAt }
        });
    }

    // 4. Send Email
    await sendEmailOtp(email, code);

    return { message: 'OTP sent' };
};

export const register = async (data: any) => {
    // 1. Verify OTP
    const otpRecord = await prisma.otp.findFirst({
        where: { email: data.email, code: data.otp }
    });

    if (!otpRecord) {
        throw new ApiError(400, 'Invalid OTP');
    }

    if (otpRecord.expiresAt < new Date()) {
        throw new ApiError(400, 'OTP Expired');
    }

    // 2. Check if email exists
    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) {
        throw new ApiError(400, 'Email already in use');
    }

    // 3. Validate Join Code & Find Institution
    // User provides 'joinCode'
    const institution = await prisma.institution.findUnique({
        where: { joinCode: data.joinCode }
    });

    if (!institution) {
        throw new ApiError(404, 'Invalid Join Code');
    }

    // 4. Hash Password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // 5. Create User WITHOUT linking to Institution yet
    // They are linked via JoinRequest
    const user = await prisma.user.create({
        data: {
            email: data.email,
            password: hashedPassword,
            name: data.name,
            role: data.role,
            rollNo: data.rollNo,
            institutionId: null, // Explicitly null
        },
    });

    // 6. Create Join Request
    await prisma.joinRequest.create({
        data: {
            userId: user.id,
            institutionId: institution.id,
            status: 'PENDING',
        }
    });

    // 7. Delete OTP
    await prisma.otp.delete({ where: { id: otpRecord.id } });

    // DO NOT generate tokens yet. Wait for approval.
    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    return {
        user: userWithoutPassword,
        message: 'Registration successful. Please wait for an Admin/Teacher to approve your join request.'
    };
};

export const webRegister = async (data: any) => {
    // 1. Enforce Role: Web Registration is for TEACHERS (Admins register via Institution Create)
    // Students must use App.
    if (data.role !== Role.TEACHER) {
        throw new ApiError(403, 'Web registration is restricted to Teachers.');
    }

    // 2. Reuse standard registration logic
    return await register(data);
};

export const login = async (data: any) => {
    // App Login: TEACHER & STUDENT only
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
        throw new ApiError(401, 'Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid credentials');
    }

    // Role Restriction for App
    const allowedAppRoles: Role[] = [Role.TEACHER, Role.STUDENT];
    if (!allowedAppRoles.includes(user.role)) {
        throw new ApiError(403, 'Access denied: App login is restricted to Teachers and Students');
    }

    // PENDING APPROVAL CHECK
    if (!user.institutionId) {
        const joinRequest = await prisma.joinRequest.findFirst({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' }
        });

        if (joinRequest?.status === 'REJECTED') {
            throw new ApiError(403, 'Your join request was rejected.');
        } else {
            throw new ApiError(403, 'Your account is pending approval.');
        }
    }

    const { accessToken, refreshToken } = generateTokens(user as any); // user has institutionId here
    const { password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, accessToken, refreshToken };
};

export const webLogin = async (data: any) => {
    // Web Login: ADMIN & TEACHER only
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
        throw new ApiError(401, 'Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid credentials');
    }

    // Role Restriction for Web
    const allowedWebRoles: Role[] = [Role.ADMIN, Role.TEACHER]; // Role Check
    if (!allowedWebRoles.includes(user.role)) {
        throw new ApiError(403, 'Access denied for this role on web portal');
    }

    // PENDING APPROVAL CHECK
    if (!user.institutionId) {
        const joinRequest = await prisma.joinRequest.findFirst({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' }
        });

        if (joinRequest?.status === 'REJECTED') {
            throw new ApiError(403, 'Your join request was rejected.');
        } else {
            throw new ApiError(403, 'Your account is pending approval.');
        }
    }

    const { accessToken, refreshToken } = generateTokens(user as any);
    const { password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, accessToken, refreshToken };
};

export const refreshToken = async (token: string) => {
    try {
        const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET) as { id: string };
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });

        if (!user || !user.institutionId) {
            throw new ApiError(401, 'Invalid refresh token or user not linked');
        }

        const tokens = generateTokens(user as any);
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
