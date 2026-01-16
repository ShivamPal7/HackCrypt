import prisma from '../config/prisma';
import ApiError from '../utils/ApiError';

export const registerDevice = async (userId: string, data: any) => {
    // Check if device hash already registered to another user?
    const existing = await prisma.device.findUnique({ where: { deviceHash: data.deviceHash } });
    if (existing) {
        if (existing.userId !== userId) {
            throw new ApiError(400, 'Device already registered to another user'); // Or handle gracefully
        }
        return existing;
    }

    const device = await prisma.device.create({
        data: {
            ...data,
            userId,
        },
    });
    return device;
};

export const getMyDevices = async (userId: string) => {
    const devices = await prisma.device.findMany({ where: { userId } });
    return devices;
};
