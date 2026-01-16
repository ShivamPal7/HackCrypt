"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInstitutionSchema = exports.joinRequestSchema = exports.createInstitutionSchema = void 0;
const zod_1 = require("zod");
exports.createInstitutionSchema = zod_1.z.object({
    body: zod_1.z.object({
        institution: zod_1.z.object({
            name: zod_1.z.string().min(1),
            description: zod_1.z.string().optional(),
            logoUrl: zod_1.z.string().url().optional(),
            email: zod_1.z.string().email().optional(),
            phone: zod_1.z.string().optional(),
            address: zod_1.z.string().optional(),
            website: zod_1.z.string().url().optional(),
            isActive: zod_1.z.boolean().optional(),
        }),
        user: zod_1.z.object({
            email: zod_1.z.string().email(),
            password: zod_1.z.string().min(6),
            name: zod_1.z.string().min(1),
            // role is ADMIN implicitly
        }),
    }),
});
exports.joinRequestSchema = zod_1.z.object({
    body: zod_1.z.object({
        joinCode: zod_1.z.string().min(1),
    }),
});
exports.updateInstitutionSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1).optional(),
    }),
});
