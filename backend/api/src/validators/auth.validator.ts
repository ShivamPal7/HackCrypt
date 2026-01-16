import { z } from 'zod';
import { Role } from '@prisma/client';

export const registerSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(6),
        name: z.string(),
        role: z.enum(['TEACHER', 'STUDENT']),
        joinCode: z.string().min(1, "Join Code is required"),
        otp: z.string().length(6, "OTP must be 6 digits"),
        rollNo: z.string().optional(),
    }),
});

export const loginSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string(),
    }),
});

export const refreshTokenSchema = z.object({
    body: z.object({
        refreshToken: z.string(),
    }),
});

export const sendOtpSchema = z.object({
    body: z.object({
        email: z.string().email(),
    }),
});
