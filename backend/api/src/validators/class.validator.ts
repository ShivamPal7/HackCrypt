import { z } from 'zod';

export const createClassSchema = z.object({
    body: z.object({
        name: z.string().min(1),
        departmentId: z.string().uuid(),
        teacherId: z.string().uuid(),
        academicYear: z.string().optional(),
        section: z.string().optional(),
        iconKey: z.string().optional(),
    }),
});

export const updateClassSchema = z.object({
    body: z.object({
        name: z.string().min(1).optional(),
        teacherId: z.string().uuid().optional(),
        academicYear: z.string().optional(),
        section: z.string().optional(),
        iconKey: z.string().optional(),
    }),
});
