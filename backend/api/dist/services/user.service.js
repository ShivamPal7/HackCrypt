"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateProfile = exports.updateStatus = exports.updateUser = exports.getUser = exports.getAllUsers = exports.createUser = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUser = async (data, institutionId) => {
    // Admin creating user for their institution
    const existing = await prisma_1.default.user.findUnique({ where: { email: data.email } });
    if (existing)
        throw new ApiError_1.default(400, 'Email already in use');
    const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
    const user = await prisma_1.default.user.create({
        data: {
            ...data,
            password: hashedPassword,
            institutionId, // Force link
        },
    });
    const { password, ...rest } = user;
    return rest;
};
exports.createUser = createUser;
const getAllUsers = async (institutionId) => {
    return prisma_1.default.user.findMany({
        where: { institutionId },
        select: { id: true, name: true, email: true, role: true, isActive: true, avatarUrl: true, rollNo: true }
    });
};
exports.getAllUsers = getAllUsers;
const getUser = async (id, institutionId) => {
    const user = await prisma_1.default.user.findUnique({ where: { id } });
    if (!user || user.institutionId !== institutionId)
        throw new ApiError_1.default(404, 'User not found');
    const { password, ...rest } = user;
    return rest;
};
exports.getUser = getUser;
const updateUser = async (id, data, institutionId) => {
    const user = await prisma_1.default.user.findUnique({ where: { id } });
    if (!user || user.institutionId !== institutionId)
        throw new ApiError_1.default(404, 'User not found');
    if (data.password) {
        data.password = await bcryptjs_1.default.hash(data.password, 10);
    }
    const updated = await prisma_1.default.user.update({
        where: { id },
        data,
    });
    const { password, ...rest } = updated;
    return rest;
};
exports.updateUser = updateUser;
const updateStatus = async (id, isActive, institutionId) => {
    const user = await prisma_1.default.user.findUnique({ where: { id } });
    if (!user || user.institutionId !== institutionId)
        throw new ApiError_1.default(404, 'User not found');
    // Prevent disabling self? Controller should handle or here?
    // Let's allow it but UI should warn.
    return prisma_1.default.user.update({
        where: { id },
        data: { isActive },
        select: { id: true, isActive: true }
    });
};
exports.updateStatus = updateStatus;
const updateProfile = async (id, data) => {
    // Self update, no institution check needed strictly if auth worked, but good practice.
    // data: avatarUrl, phone
    return prisma_1.default.user.update({
        where: { id },
        data,
        select: { id: true, name: true, avatarUrl: true, phoneNumber: true, rollNo: true }
    });
};
exports.updateProfile = updateProfile;
const deleteUser = async (id, institutionId) => {
    const user = await prisma_1.default.user.findUnique({ where: { id } });
    if (!user || user.institutionId !== institutionId)
        throw new ApiError_1.default(404, 'User not found');
    await prisma_1.default.user.delete({ where: { id } });
    return { message: 'User deleted' };
};
exports.deleteUser = deleteUser;
