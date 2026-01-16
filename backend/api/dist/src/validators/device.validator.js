"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerDeviceSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.registerDeviceSchema = zod_1.z.object({
    body: zod_1.z.object({
        deviceHash: zod_1.z.string().min(1),
        platform: zod_1.z.nativeEnum(client_1.DevicePlatform),
    }),
});
