"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSubjectSchema = exports.createSubjectSchema = void 0;
const zod_1 = require("zod");
exports.createSubjectSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1),
        classId: zod_1.z.string().uuid(),
        // teacherId removed from schema
        code: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        colorCode: zod_1.z.string().optional(),
    }),
});
exports.updateSubjectSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1).optional(),
        code: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        colorCode: zod_1.z.string().optional(),
    }),
});
