"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateClassSchema = exports.createClassSchema = void 0;
const zod_1 = require("zod");
exports.createClassSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1),
        departmentId: zod_1.z.string().uuid(),
        teacherId: zod_1.z.string().uuid(),
        academicYear: zod_1.z.string().optional(),
        section: zod_1.z.string().optional(),
        iconKey: zod_1.z.string().optional(),
    }),
});
exports.updateClassSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1).optional(),
        teacherId: zod_1.z.string().uuid().optional(),
        academicYear: zod_1.z.string().optional(),
        section: zod_1.z.string().optional(),
        iconKey: zod_1.z.string().optional(),
    }),
});
