"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubject = exports.updateSubject = exports.getSubject = exports.createSubject = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const createSubject = async (data) => {
    const subject = await prisma_1.default.subject.create({
        data,
    });
    return subject;
};
exports.createSubject = createSubject;
const getSubject = async (id) => {
    const subject = await prisma_1.default.subject.findUnique({
        where: { id },
        include: { sessions: true, teacher: true }
    });
    if (!subject)
        throw new ApiError_1.default(404, 'Subject not found');
    return subject;
};
exports.getSubject = getSubject;
const updateSubject = async (id, data) => {
    const subject = await prisma_1.default.subject.update({
        where: { id },
        data,
    });
    return subject;
};
exports.updateSubject = updateSubject;
const deleteSubject = async (id) => {
    await prisma_1.default.subject.delete({ where: { id } });
    return { message: 'Subject deleted' };
};
exports.deleteSubject = deleteSubject;
