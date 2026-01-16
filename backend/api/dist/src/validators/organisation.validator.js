"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrganisationSchema = exports.createOrganisationSchema = void 0;
const zod_1 = require("zod");
exports.createOrganisationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1),
    }),
});
exports.updateOrganisationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1).optional(),
    }),
});
