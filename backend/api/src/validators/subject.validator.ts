import { z } from 'zod';

export const createSubjectSchema = z.object({
    body: z.object({
        name: z.string().min(1),
        organisationId: z.string().uuid(),
        classId: z.string().uuid(),
        teacherId: z.string().uuid(),
    }),
});

export const updateSubjectSchema = z.object({
    body: z.object({
        name: z.string().min(1).optional(),
        teacherId: z.string().uuid().optional(),
    }),
});
