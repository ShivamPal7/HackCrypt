"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDepartmentSchema = exports.createDepartmentSchema = void 0;
const zod_1 = require("zod");
exports.createDepartmentSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1),
        organisationId: zod_1.z.string().uuid(),
    }),
});
exports.updateDepartmentSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1).optional(),
    }),
});
