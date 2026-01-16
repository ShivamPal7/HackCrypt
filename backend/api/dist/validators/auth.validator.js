"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtpSchema = exports.refreshTokenSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(6),
        name: zod_1.z.string(),
        role: zod_1.z.enum(['TEACHER', 'STUDENT']),
        joinCode: zod_1.z.string().min(1, "Join Code is required"),
        otp: zod_1.z.string().length(6, "OTP must be 6 digits"),
        rollNo: zod_1.z.string().optional(),
        verificationImages: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
    }),
});
exports.refreshTokenSchema = zod_1.z.object({
    body: zod_1.z.object({
        refreshToken: zod_1.z.string(),
    }),
});
exports.sendOtpSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
    }),
});
