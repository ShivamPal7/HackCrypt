"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLectureSchema = exports.createLectureSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.createLectureSchema = zod_1.z.object({
    body: zod_1.z.object({
        subjectId: zod_1.z.string().uuid(),
        classId: zod_1.z.string().uuid(),
        teacherId: zod_1.z.string().uuid(),
        startTime: zod_1.z.string().datetime(),
        endTime: zod_1.z.string().datetime(),
        title: zod_1.z.string().optional(),
        topic: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
    }),
});
exports.updateLectureSchema = zod_1.z.object({
    body: zod_1.z.object({
        startTime: zod_1.z.string().datetime().optional(),
        endTime: zod_1.z.string().datetime().optional(),
        status: zod_1.z.nativeEnum(client_1.SessionStatus).optional(),
        teacherId: zod_1.z.string().uuid().optional(),
        title: zod_1.z.string().optional(),
        topic: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        cancellationReason: zod_1.z.string().optional(),
    }),
});
