import { Request, Response, NextFunction } from 'express';
import * as reportService from '../services/report.service';
import { sendResponse } from '../utils/response';

export const getClassReport = async (req: Request, res: Response, next: NextFunction) => {
    const result = await reportService.getClassAttendanceReport(req.params.id as string, req.user!.institutionId!);
    sendResponse(res, 200, 'Class report', result);
};

export const getStudentReport = async (req: Request, res: Response, next: NextFunction) => {
    const result = await reportService.getStudentAttendanceReport(req.params.id as string, req.user!.institutionId!);
    sendResponse(res, 200, 'Student report', result);
};

export const getSubjectReport = async (req: Request, res: Response, next: NextFunction) => {
    const result = await reportService.getSubjectAttendanceReport(req.params.id as string, req.user!.institutionId!);
    sendResponse(res, 200, 'Subject report', result);
};
