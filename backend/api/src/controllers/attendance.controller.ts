import { Request, Response, NextFunction } from 'express';
import * as attendanceService from '../services/attendance.service';
import { sendResponse } from '../utils/response';

export const createSession = async (req: Request, res: Response, next: NextFunction) => {
    const result = await attendanceService.createSession(req.body);
    sendResponse(res, 201, 'Session created', result);
};

export const startSession = async (req: Request, res: Response, next: NextFunction) => {
    const result = await attendanceService.startSession(req.params.id as string);
    sendResponse(res, 200, 'Session started', result);
};

export const endSession = async (req: Request, res: Response, next: NextFunction) => {
    const result = await attendanceService.endSession(req.params.id as string);
    sendResponse(res, 200, 'Session ended', result);
};

export const getSession = async (req: Request, res: Response, next: NextFunction) => {
    const result = await attendanceService.getSession(req.params.id as string);
    sendResponse(res, 200, 'Session retrieved', result);
};

export const mark = async (req: Request, res: Response, next: NextFunction) => {
    const result = await attendanceService.markAttendance(req.user!.id, req.body);
    sendResponse(res, 200, 'Attendance marked successfully', result);
};

export const override = async (req: Request, res: Response, next: NextFunction) => {
    const result = await attendanceService.overrideAttendance(req.params.id as string, req.user!.id, req.body);
    sendResponse(res, 200, 'Attendance overridden', result);
};
