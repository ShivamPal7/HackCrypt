import { Request, Response, NextFunction } from 'express';
import * as auditService from '../services/audit.service';
import { sendResponse } from '../utils/response';

export const getAttendanceAudit = async (req: Request, res: Response, next: NextFunction) => {
    const result = await auditService.getAttendanceAudit(req.params.id as string, req.user!.institutionId!);
    sendResponse(res, 200, 'Audit log', result);
};

export const getUserAudit = async (req: Request, res: Response, next: NextFunction) => {
    const result = await auditService.getUserAudit(req.params.id as string, req.user!.institutionId!);
    sendResponse(res, 200, 'User audit', result);
};
