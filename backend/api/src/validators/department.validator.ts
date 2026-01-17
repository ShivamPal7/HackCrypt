import { z } from 'zod';

export const createDepartmentSchema = z.object({
    body: z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        colorCode: z.string().optional(),
        iconKey: z.string().optional(),
    }),
});

export const updateDepartmentSchema = z.object({
    body: z.object({
        name: z.string().min(1).optional(),
        description: z.string().optional(),
        colorCode: z.string().optional(),
        iconKey: z.string().optional(),
    }),
});
