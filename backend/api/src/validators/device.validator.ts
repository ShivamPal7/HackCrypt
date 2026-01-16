import { z } from 'zod';
import { DevicePlatform } from '@prisma/client';

export const registerDeviceSchema = z.object({
    body: z.object({
        deviceHash: z.string().min(1),
        platform: z.nativeEnum(DevicePlatform),
    }),
});
