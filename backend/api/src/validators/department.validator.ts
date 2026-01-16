import { z } from 'zod';

export const createDepartmentSchema = z.object({
    body: z.object({
        name: z.string().min(1),
        organisationId: z.string().uuid(),
    }),
});

export const updateDepartmentSchema = z.object({
    body: z.object({
        name: z.string().min(1).optional(),
    }),
});
