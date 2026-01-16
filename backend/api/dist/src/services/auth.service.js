"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.refreshToken = exports.login = exports.register = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../config/env"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const generateTokens = (user) => {
    const accessOptions = { expiresIn: env_1.default.JWT_EXPIRES_IN };
    const refreshOptions = { expiresIn: env_1.default.JWT_REFRESH_EXPIRES_IN };
    const accessToken = jsonwebtoken_1.default.sign({ id: user.id, role: user.role, email: user.email }, env_1.default.JWT_SECRET, accessOptions);
    const refreshToken = jsonwebtoken_1.default.sign({ id: user.id }, env_1.default.JWT_REFRESH_SECRET, refreshOptions);
    return { accessToken, refreshToken };
};
const register = async (data) => {
    const existingUser = await prisma_1.default.user.findUnique({ where: { email: data.email } });
    if (existingUser) {
        throw new ApiError_1.default(400, 'Email already in use');
    }
    const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
    const user = await prisma_1.default.user.create({
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
exports.register = register;
const login = async (data) => {
    const user = await prisma_1.default.user.findUnique({ where: { email: data.email } });
    if (!user) {
        throw new ApiError_1.default(401, 'Invalid credentials');
    }
    const isPasswordValid = await bcryptjs_1.default.compare(data.password, user.password);
    if (!isPasswordValid) {
        throw new ApiError_1.default(401, 'Invalid credentials');
    }
    const { accessToken, refreshToken } = generateTokens(user);
    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, accessToken, refreshToken };
};
exports.login = login;
const refreshToken = async (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.default.JWT_REFRESH_SECRET);
        const user = await prisma_1.default.user.findUnique({ where: { id: decoded.id } });
        if (!user) {
            throw new ApiError_1.default(401, 'Invalid refresh token');
        }
        const tokens = generateTokens(user);
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
