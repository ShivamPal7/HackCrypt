"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDepartment = exports.getDepartments = exports.updateDepartment = exports.getDepartment = exports.createDepartment = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const createDepartment = async (data) => {
    const department = await prisma_1.default.department.create({
        data,
    });
    return department;
};
exports.createDepartment = createDepartment;
const getDepartment = async (id) => {
    const department = await prisma_1.default.department.findUnique({
        where: { id },
        include: { classes: true, teachers: true }
    });
    if (!department)
        throw new ApiError_1.default(404, 'Department not found');
    return department;
};
exports.getDepartment = getDepartment;
const updateDepartment = async (id, data) => {
    const department = await prisma_1.default.department.update({
        where: { id },
        data,
    });
    return department;
};
exports.updateDepartment = updateDepartment;
const getDepartments = async (institutionId) => {
    return await prisma_1.default.department.findMany({
        where: { institutionId },
        include: { classes: true, teachers: true }
    });
};
exports.getDepartments = getDepartments;
const deleteDepartment = async (id) => {
    await prisma_1.default.department.delete({ where: { id } });
    return { message: 'Department deleted' };
};
exports.deleteDepartment = deleteDepartment;
