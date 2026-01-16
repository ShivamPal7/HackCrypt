import { z } from 'zod';

export const createClassSchema = z.object({
    body: z.object({
        name: z.string().min(1),
        organisationId: z.string().uuid(),
        departmentId: z.string().uuid(),
        teacherId: z.string().uuid(),
    }),
});

export const updateClassSchema = z.object({
    body: z.object({
        name: z.string().min(1).optional(),
        teacherId: z.string().uuid().optional(),
    }),
});
