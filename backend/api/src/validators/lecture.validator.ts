import { z } from 'zod';
import { SessionStatus } from '@prisma/client';

export const createLectureSchema = z.object({
    body: z.object({
        subjectId: z.string().uuid(),
        classId: z.string().uuid(),
        teacherId: z.string().uuid(),
        startTime: z.string().datetime(),
        endTime: z.string().datetime(),
        title: z.string().optional(),
        topic: z.string().optional(),
        description: z.string().optional(),
    }),
});

export const updateLectureSchema = z.object({
    body: z.object({
        startTime: z.string().datetime().optional(),
        endTime: z.string().datetime().optional(),
        status: z.nativeEnum(SessionStatus).optional(),
        teacherId: z.string().uuid().optional(),
        title: z.string().optional(),
        topic: z.string().optional(),
        description: z.string().optional(),
        cancellationReason: z.string().optional(),
    }),
});
