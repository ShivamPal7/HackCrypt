import { z } from 'zod';
import { SessionStatus, AttendanceStatus, OverrideReason } from '@prisma/client';

export const createSessionSchema = z.object({
    body: z.object({
        organisationId: z.string().uuid(),
        classId: z.string().uuid(),
        subjectId: z.string().uuid(),
        startTime: z.string().datetime(),
        endTime: z.string().datetime(),
    }),
});

export const markAttendanceSchema = z.object({
    body: z.object({
        sessionId: z.string().uuid(),
        deviceHash: z.string(), // Student sends hash to prove device ownership
        faceVerified: z.boolean().optional(), // In real app, this comes from ML service
    }),
});

export const overrideAttendanceSchema = z.object({
    body: z.object({
        status: z.nativeEnum(AttendanceStatus),
        reason: z.nativeEnum(OverrideReason),
        notes: z.string().optional(),
    }),
});
