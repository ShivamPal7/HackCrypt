import { Request, Response, NextFunction } from 'express';
import * as deviceService from '../services/device.service';
import { sendResponse } from '../utils/response';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const result = await deviceService.registerDevice(req.user!.id, req.body);
    sendResponse(res, 201, 'Device registered successfully', result);
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
    const result = await deviceService.getMyDevices(req.user!.id);
    sendResponse(res, 200, 'My devices', result);
};
