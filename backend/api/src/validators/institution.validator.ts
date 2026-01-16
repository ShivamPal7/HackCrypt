import { z } from 'zod';

export const createInstitutionSchema = z.object({
    body: z.object({
        institution: z.object({
            name: z.string().min(1),
            description: z.string().optional(),
            logoUrl: z.string().url().optional(),
            email: z.string().email().optional(),
            phone: z.string().optional(),
            address: z.string().optional(),
            website: z.string().url().optional(),
            isActive: z.boolean().optional(),
        }),
        user: z.object({
            email: z.string().email(),
            password: z.string().min(6),
            name: z.string().min(1),
            firstName: z.string().optional(),
            lastName: z.string().optional(),
            age: z.number().optional(),
            // role is ADMIN implicitly
        }),
    }),
});

export const joinRequestSchema = z.object({
    body: z.object({
        joinCode: z.string().min(1),
    }),
});

export const updateInstitutionSchema = z.object({
    body: z.object({
        name: z.string().min(1).optional(),
    }),
});

