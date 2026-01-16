"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.createUser = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUser = async (data) => {
    // Basic user creation (e.g. by admin)
    // Check email
    const existing = await prisma_1.default.user.findUnique({ where: { email: data.email } });
    if (existing)
        throw new ApiError_1.default(400, 'Email already in use');
    const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
    const user = await prisma_1.default.user.create({
        data: {
            ...data,
            password: hashedPassword,
        },
    });
    const { password, ...rest } = user;
    return rest;
};
exports.createUser = createUser;
const getUser = async (id) => {
    const user = await prisma_1.default.user.findUnique({ where: { id } });
    if (!user)
        throw new ApiError_1.default(404, 'User not found');
    const { password, ...rest } = user;
    return rest;
};
exports.getUser = getUser;
const updateUser = async (id, data) => {
    if (data.password) {
        data.password = await bcryptjs_1.default.hash(data.password, 10);
    }
    const user = await prisma_1.default.user.update({
        where: { id },
        data,
    });
    const { password, ...rest } = user;
    return rest;
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    await prisma_1.default.user.delete({ where: { id } });
    return { message: 'User deleted' };
};
exports.deleteUser = deleteUser;
