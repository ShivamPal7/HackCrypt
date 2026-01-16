import { Request, Response, NextFunction } from 'express';
import * as reportService from '../services/report.service';
import { sendResponse } from '../utils/response';
import ApiError from '../utils/ApiError';

export const getClassReport = async (req: Request, res: Response, next: NextFunction) => {
    const result = await reportService.getClassAttendanceReport(req.params.id as string, req.user!.institutionId!);
    sendResponse(res, 200, 'Class report', result);
};

export const getStudentReport = async (req: Request, res: Response, next: NextFunction) => {
    const result = await reportService.getStudentAttendanceReport(req.params.id as string, req.user!.institutionId!);
    sendResponse(res, 200, 'Student report', result);
};

export const getStudentSummary = async (req: Request, res: Response, next: NextFunction) => {
    const studentId = req.params.id as string;

    // RBAC Check: Only Admin or the Student themselves
    if (req.user!.role !== 'ADMIN' && req.user!.id !== studentId) {
        throw new ApiError(403, 'Access denied: You can only view your own summary');
    }

    const result = await reportService.getStudentAttendanceSummary(studentId, req.user!.institutionId!);
    sendResponse(res, 200, 'Student attendance summary', result);
};



export const getStudentSubjectSummaries = async (req: Request, res: Response, next: NextFunction) => {
    const studentId = req.params.id as string;
    const search = req.query.search as string;

    // RBAC Check
    if (req.user!.role !== 'ADMIN' && req.user!.id !== studentId) {
        throw new ApiError(403, 'Access denied: You can only view your own subjects');
    }

    const result = await reportService.getStudentSubjectSummaries(studentId, req.user!.institutionId!, { search });
    sendResponse(res, 200, 'Student subject summaries', result);
};



export const getStudentSubjectDetails = async (req: Request, res: Response, next: NextFunction) => {
    const studentId = req.params.studentId as string;
    const subjectId = req.params.subjectId as string;

    // RBAC Check
    if (req.user!.role !== 'ADMIN' && req.user!.id !== studentId) {
        throw new ApiError(403, 'Access denied: You can only view your own metrics');
    }

    const result = await reportService.getStudentSubjectDetails(studentId, subjectId, req.user!.institutionId!);
    sendResponse(res, 200, 'Subject attendance details', result);
};



export const getStudentAttendanceHeatmap = async (req: Request, res: Response, next: NextFunction) => {
    const studentId = req.params.id as string;

    // RBAC Check
    if (req.user!.role !== 'ADMIN' && req.user!.id !== studentId) {
        throw new ApiError(403, 'Access denied: You can only view your own heatmap');
    }

    const result = await reportService.getStudentAttendanceHeatmap(studentId, req.user!.institutionId!);
    sendResponse(res, 200, 'Attendance heatmap', result);
};



export const getStudentLectureHistory = async (req: Request, res: Response, next: NextFunction) => {
    const studentId = req.params.id as string;
    const { search, status } = req.query;

    // RBAC Check
    if (req.user!.role !== 'ADMIN' && req.user!.id !== studentId) {
        throw new ApiError(403, 'Access denied: You can only view your own history');
    }

    const result = await reportService.getStudentLectureHistory(
        studentId,
        req.user!.institutionId!,
        { search: search as string, status: status as string }
    );
    sendResponse(res, 200, 'Lecture attendance history', result);
};

export const getSubjectReport = async (req: Request, res: Response, next: NextFunction) => {
    const result = await reportService.getSubjectAttendanceReport(req.params.id as string, req.user!.institutionId!);
    sendResponse(res, 200, 'Subject report', result);
};
