"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSubjectSchema = exports.createSubjectSchema = void 0;
const zod_1 = require("zod");
exports.createSubjectSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1),
        organisationId: zod_1.z.string().uuid(),
        classId: zod_1.z.string().uuid(),
        teacherId: zod_1.z.string().uuid(),
    }),
});
exports.updateSubjectSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1).optional(),
        teacherId: zod_1.z.string().uuid().optional(),
    }),
});
