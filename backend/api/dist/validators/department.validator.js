"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDepartmentSchema = exports.createDepartmentSchema = void 0;
const zod_1 = require("zod");
exports.createDepartmentSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1),
        description: zod_1.z.string().optional(),
        colorCode: zod_1.z.string().optional(),
        iconKey: zod_1.z.string().optional(),
    }),
});
exports.updateDepartmentSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1).optional(),
        description: zod_1.z.string().optional(),
        colorCode: zod_1.z.string().optional(),
        iconKey: zod_1.z.string().optional(),
    }),
});
