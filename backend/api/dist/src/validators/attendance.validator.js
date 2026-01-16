"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.overrideAttendanceSchema = exports.markAttendanceSchema = exports.createSessionSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.createSessionSchema = zod_1.z.object({
    body: zod_1.z.object({
        organisationId: zod_1.z.string().uuid(),
        classId: zod_1.z.string().uuid(),
        subjectId: zod_1.z.string().uuid(),
        startTime: zod_1.z.string().datetime(),
        endTime: zod_1.z.string().datetime(),
    }),
});
exports.markAttendanceSchema = zod_1.z.object({
    body: zod_1.z.object({
        sessionId: zod_1.z.string().uuid(),
        deviceHash: zod_1.z.string(), // Student sends hash to prove device ownership
        faceVerified: zod_1.z.boolean().optional(), // In real app, this comes from ML service
    }),
});
exports.overrideAttendanceSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.nativeEnum(client_1.AttendanceStatus),
        reason: zod_1.z.nativeEnum(client_1.OverrideReason),
        notes: zod_1.z.string().optional(),
    }),
});
