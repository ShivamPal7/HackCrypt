"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClass = exports.getClasses = exports.updateClass = exports.getClass = exports.createClass = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const createClass = async (data) => {
    const classData = await prisma_1.default.class.create({
        data,
    });
    return classData;
};
exports.createClass = createClass;
const getClass = async (id) => {
    const classData = await prisma_1.default.class.findUnique({
        where: { id },
        include: { lectures: true, subjects: true, students: true, teacher: true }
    });
    if (!classData)
        throw new ApiError_1.default(404, 'Class not found');
    return classData;
};
exports.getClass = getClass;
const updateClass = async (id, data) => {
    const classData = await prisma_1.default.class.update({
        where: { id },
        data,
    });
    return classData;
};
exports.updateClass = updateClass;
const getClasses = async (institutionId) => {
    return await prisma_1.default.class.findMany({
        where: { institutionId },
        include: { lectures: true, subjects: true } // Reduced depth for list
    });
};
exports.getClasses = getClasses;
const deleteClass = async (id) => {
    await prisma_1.default.class.delete({ where: { id } });
    return { message: 'Class deleted' };
};
exports.deleteClass = deleteClass;
