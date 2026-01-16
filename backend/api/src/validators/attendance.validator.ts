import { z } from 'zod';
import { SessionStatus, AttendanceStatus, OverrideReason } from '@prisma/client';

export const createSessionSchema = z.object({
    body: z.object({
        lectureId: z.string().uuid(),
        remarks: z.string().optional(),
    }),
});

export const markAttendanceSchema = z.object({
    body: z.object({
        lectureId: z.string().uuid(), // Added as per instruction
        sessionId: z.string().uuid(),
        status: z.nativeEnum(AttendanceStatus).optional(),
        deviceHash: z.string().optional(),
        faceVerified: z.boolean().optional(),
        remarks: z.string().optional(),
        markedVia: z.string().optional(),
        // sessionId is optional now?
    }),
});

export const overrideAttendanceSchema = z.object({
    body: z.object({
        status: z.nativeEnum(AttendanceStatus),
        reason: z.nativeEnum(OverrideReason),
        notes: z.string().optional(),
    }),
});
