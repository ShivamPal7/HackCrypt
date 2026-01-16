import { z } from 'zod';

export const createOrganisationSchema = z.object({
    body: z.object({
        name: z.string().min(1),
    }),
});

export const updateOrganisationSchema = z.object({
    body: z.object({
        name: z.string().min(1).optional(),
    }),
});
