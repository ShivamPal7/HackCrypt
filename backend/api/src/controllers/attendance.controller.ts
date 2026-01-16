import { Request, Response, NextFunction } from 'express';
import * as attendanceService from '../services/attendance.service';
import { sendResponse } from '../utils/response';

export const createSession = async (req: Request, res: Response, next: NextFunction) => {
    const result = await attendanceService.createSession(req.user!.id, req.body);
    sendResponse(res, 201, 'Session created', result);
};

// Start session is essentially createSession or we can have a specific start if schedule exists.
// For now mapping start -> create if not exists? Or deprecating startSession route?
// User: "Attendance Session... Can be opened and closed independently".
// Let's assume createSession OPENS it.

export const endSession = async (req: Request, res: Response, next: NextFunction) => {
    const result = await attendanceService.endSession(req.params.id as string, req.user!.institutionId!);
    sendResponse(res, 200, 'Session ended', result);
};

export const getSession = async (req: Request, res: Response, next: NextFunction) => {
    const result = await attendanceService.getSession(req.params.id as string, req.user!.institutionId!);
    sendResponse(res, 200, 'Session details', result);
};

export const mark = async (req: Request, res: Response, next: NextFunction) => {
    // req.body now contains lectureId etc.
    const result = await attendanceService.markAttendance(req.user!.id, req.body, req.user!.institutionId!);
    sendResponse(res, 201, 'Attendance marked successfully', result);
};

// ... existing methods ...

export const override = async (req: Request, res: Response, next: NextFunction) => {
    const result = await attendanceService.overrideAttendance(req.params.id as string, req.user!.id, req.body);
    sendResponse(res, 200, 'Attendance overridden', result);
};

export const closeActiveSession = async (req: Request, res: Response, next: NextFunction) => {
    const result = await attendanceService.closeActiveSession(req.params.id as string, req.user!.institutionId!);
    sendResponse(res, 200, 'Session closed', result);
};

export const getLectureSessions = async (req: Request, res: Response, next: NextFunction) => {
    const result = await attendanceService.getLectureSessions(req.params.id as string, req.user!.institutionId!);
    sendResponse(res, 200, 'Sessions retrieved', result);
};

export const getMyAttendance = async (req: Request, res: Response, next: NextFunction) => {
    const result = await attendanceService.getStudentAttendance(req.user!.id, req.user!.institutionId!);
    sendResponse(res, 200, 'My attendance retrieved', result);
};

export const getLectureAttendance = async (req: Request, res: Response, next: NextFunction) => {
    const result = await attendanceService.getLectureAttendance(req.params.id as string, req.user!.institutionId!);
    sendResponse(res, 200, 'Lecture attendance retrieved', result);
};

export const getOverride = async (req: Request, res: Response, next: NextFunction) => {
    const result = await attendanceService.getAttendanceOverride(req.params.id as string, req.user!.institutionId!);
    sendResponse(res, 200, 'Override details', result);
};

