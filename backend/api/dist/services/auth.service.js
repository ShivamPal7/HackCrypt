"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.refreshToken = exports.webLogin = exports.login = exports.webRegister = exports.register = exports.sendOtp = exports.generateTokens = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../config/env"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const client_1 = require("@prisma/client");
const generateTokens = (user) => {
    const accessOptions = { expiresIn: env_1.default.JWT_EXPIRES_IN };
    const refreshOptions = { expiresIn: env_1.default.JWT_REFRESH_EXPIRES_IN };
    const accessToken = jsonwebtoken_1.default.sign({ id: user.id, role: user.role, email: user.email, institutionId: user.institutionId }, env_1.default.JWT_SECRET, accessOptions);
    const refreshToken = jsonwebtoken_1.default.sign({ id: user.id }, env_1.default.JWT_REFRESH_SECRET, refreshOptions);
    return { accessToken, refreshToken };
};
exports.generateTokens = generateTokens;
const email_service_1 = require("./email.service");
const sendOtp = async (email) => {
    // 1. Check if email is already registered? Optional. User might be re-registering.
    // 2. Generate 6 digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    // 3. Save to DB (Upsert to handle resend)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
    // Check if OTP exists
    const existingOtp = await prisma_1.default.otp.findFirst({ where: { email } });
    if (existingOtp) {
        await prisma_1.default.otp.update({
            where: { id: existingOtp.id },
            data: { code, expiresAt }
        });
    }
    else {
        await prisma_1.default.otp.create({
            data: { email, code, expiresAt }
        });
    }
    // 4. Send Email
    await (0, email_service_1.sendOtp)(email, code);
    return { message: 'OTP sent' };
};
exports.sendOtp = sendOtp;
const register = async (data) => {
    // 1. Verify OTP
    const otpRecord = await prisma_1.default.otp.findFirst({
        where: { email: data.email, code: data.otp }
    });
    if (!otpRecord) {
        throw new ApiError_1.default(400, 'Invalid OTP');
    }
    if (otpRecord.expiresAt < new Date()) {
        throw new ApiError_1.default(400, 'OTP Expired');
    }
    // 2. Check if email exists
    const existingUser = await prisma_1.default.user.findUnique({ where: { email: data.email } });
    if (existingUser) {
        throw new ApiError_1.default(400, 'Email already in use');
    }
    // 3. Validate Join Code & Find Institution
    // User provides 'joinCode'
    const institution = await prisma_1.default.institution.findUnique({
        where: { joinCode: data.joinCode }
    });
    if (!institution) {
        throw new ApiError_1.default(404, 'Invalid Join Code');
    }
    // 4. Hash Password
    const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
    // 5. Create User WITHOUT linking to Institution yet
    // They are linked via JoinRequest
    const user = await prisma_1.default.user.create({
        data: {
            email: data.email,
            password: hashedPassword,
            name: data.name,
            role: data.role,
            rollNo: data.rollNo,
            verificationImages: data.verificationImages,
            institutionId: null, // Explicitly null
        },
    });
    // 6. Create Join Request
    await prisma_1.default.joinRequest.create({
        data: {
            userId: user.id,
            institutionId: institution.id,
            status: 'PENDING',
        }
    });
    // 7. Delete OTP
    await prisma_1.default.otp.delete({ where: { id: otpRecord.id } });
    // DO NOT generate tokens yet. Wait for approval.
    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    return {
        user: userWithoutPassword,
        message: 'Registration successful. Please wait for an Admin/Teacher to approve your join request.'
    };
};
exports.register = register;
const webRegister = async (data) => {
    // 1. Enforce Role: Web Registration is for TEACHERS (Admins register via Institution Create)
    // Students must use App.
    if (data.role !== client_1.Role.TEACHER) {
        throw new ApiError_1.default(403, 'Web registration is restricted to Teachers.');
    }
    // 2. Reuse standard registration logic
    return await (0, exports.register)(data);
};
exports.webRegister = webRegister;
const login = async (data) => {
    // App Login: TEACHER & STUDENT only
    const user = await prisma_1.default.user.findUnique({ where: { email: data.email } });
    if (!user) {
        throw new ApiError_1.default(401, 'Invalid credentials');
    }
    const isPasswordValid = await bcryptjs_1.default.compare(data.password, user.password);
    if (!isPasswordValid) {
        throw new ApiError_1.default(401, 'Invalid credentials');
    }
    // Role Restriction for App
    const allowedAppRoles = [client_1.Role.TEACHER, client_1.Role.STUDENT];
    if (!allowedAppRoles.includes(user.role)) {
        throw new ApiError_1.default(403, 'Access denied: App login is restricted to Teachers and Students');
    }
    // PENDING APPROVAL CHECK
    if (!user.institutionId) {
        const joinRequest = await prisma_1.default.joinRequest.findFirst({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' }
        });
        if (joinRequest?.status === 'REJECTED') {
            throw new ApiError_1.default(403, 'Your join request was rejected.');
        }
        else {
            throw new ApiError_1.default(403, 'Your account is pending approval.');
        }
    }
    const { accessToken, refreshToken } = (0, exports.generateTokens)(user); // user has institutionId here
    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, accessToken, refreshToken };
};
exports.login = login;
const webLogin = async (data) => {
    // Web Login: ADMIN & TEACHER only
    const user = await prisma_1.default.user.findUnique({ where: { email: data.email } });
    if (!user) {
        throw new ApiError_1.default(401, 'Invalid credentials');
    }
    const isPasswordValid = await bcryptjs_1.default.compare(data.password, user.password);
    if (!isPasswordValid) {
        throw new ApiError_1.default(401, 'Invalid credentials');
    }
    // Role Restriction for Web
    const allowedWebRoles = [client_1.Role.ADMIN, client_1.Role.TEACHER]; // Role Check
    if (!allowedWebRoles.includes(user.role)) {
        throw new ApiError_1.default(403, 'Access denied for this role on web portal');
    }
    // PENDING APPROVAL CHECK
    if (!user.institutionId) {
        const joinRequest = await prisma_1.default.joinRequest.findFirst({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' }
        });
        if (joinRequest?.status === 'REJECTED') {
            throw new ApiError_1.default(403, 'Your join request was rejected.');
        }
        else {
            throw new ApiError_1.default(403, 'Your account is pending approval.');
        }
    }
    const { accessToken, refreshToken } = (0, exports.generateTokens)(user);
    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, accessToken, refreshToken };
};
exports.webLogin = webLogin;
const refreshToken = async (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.default.JWT_REFRESH_SECRET);
        const user = await prisma_1.default.user.findUnique({ where: { id: decoded.id } });
        if (!user || !user.institutionId) {
            throw new ApiError_1.default(401, 'Invalid refresh token or user not linked');
        }
        const tokens = (0, exports.generateTokens)(user);
        return tokens;
    }
    catch (error) {
        throw new ApiError_1.default(401, 'Invalid refresh token');
    }
};
exports.refreshToken = refreshToken;
const getMe = async (userId) => {
    const user = await prisma_1.default.user.findUnique({ where: { id: userId } });
    if (!user)
        throw new ApiError_1.default(404, 'User not found');
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
};
exports.getMe = getMe;
