"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyDevices = exports.registerDevice = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const registerDevice = async (userId, data) => {
    // Check if device hash already registered to another user?
    const existing = await prisma_1.default.device.findUnique({ where: { deviceHash: data.deviceHash } });
    if (existing) {
        if (existing.userId !== userId) {
            throw new ApiError_1.default(400, 'Device already registered to another user'); // Or handle gracefully
        }
        return existing;
    }
    const device = await prisma_1.default.device.create({
        data: {
            ...data,
            userId,
        },
    });
    return device;
};
exports.registerDevice = registerDevice;
const getMyDevices = async (userId) => {
    const devices = await prisma_1.default.device.findMany({ where: { userId } });
    return devices;
};
exports.getMyDevices = getMyDevices;
