"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.overrideAttendanceSchema = exports.markAttendanceSchema = exports.createSessionSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.createSessionSchema = zod_1.z.object({
    body: zod_1.z.object({
        lectureId: zod_1.z.string().uuid(),
        remarks: zod_1.z.string().optional(),
    }),
});
exports.markAttendanceSchema = zod_1.z.object({
    body: zod_1.z.object({
        lectureId: zod_1.z.string().uuid(), // Added as per instruction
        sessionId: zod_1.z.string().uuid(),
        status: zod_1.z.nativeEnum(client_1.AttendanceStatus).optional(),
        deviceHash: zod_1.z.string().optional(),
        faceVerified: zod_1.z.boolean().optional(),
        remarks: zod_1.z.string().optional(),
        markedVia: zod_1.z.string().optional(),
        // sessionId is optional now?
    }),
});
exports.overrideAttendanceSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.nativeEnum(client_1.AttendanceStatus),
        reason: zod_1.z.nativeEnum(client_1.OverrideReason),
        notes: zod_1.z.string().optional(),
    }),
});
