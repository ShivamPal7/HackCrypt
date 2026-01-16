import { z } from 'zod';

export const createSubjectSchema = z.object({
    body: z.object({
        name: z.string().min(1),
        classId: z.string().uuid(),
        // teacherId removed from schema
        code: z.string().optional(),
        description: z.string().optional(),
        colorCode: z.string().optional(),
    }),
});

export const updateSubjectSchema = z.object({
    body: z.object({
        name: z.string().min(1).optional(),
        code: z.string().optional(),
        description: z.string().optional(),
        colorCode: z.string().optional(),
    }),
});
