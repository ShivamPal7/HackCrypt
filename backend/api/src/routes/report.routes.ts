import { Router } from 'express';
import * as reportController from '../controllers/report.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import asyncHandler from '../utils/asyncHandler';
import { Role } from '@prisma/client';

const router = Router();

router.use(authenticate);

// Reports
router.get('/attendance/class/:id', authorize([Role.ADMIN, Role.TEACHER]), asyncHandler(reportController.getClassReport));
router.get('/attendance/student/:id/summary', authorize([Role.ADMIN, Role.STUDENT]), asyncHandler(reportController.getStudentSummary));
router.get('/attendance/student/:id/subjects', authorize([Role.ADMIN, Role.STUDENT]), asyncHandler(reportController.getStudentSubjectSummaries));
router.get('/attendance/student/:studentId/subject/:subjectId', authorize([Role.ADMIN, Role.STUDENT]), asyncHandler(reportController.getStudentSubjectDetails));
router.get('/attendance/student/:id/heatmap', authorize([Role.ADMIN, Role.STUDENT]), asyncHandler(reportController.getStudentAttendanceHeatmap));
router.get('/attendance/student/:id/history', authorize([Role.ADMIN, Role.STUDENT]), asyncHandler(reportController.getStudentLectureHistory));
router.get('/attendance/student/:id', authorize([Role.ADMIN, Role.TEACHER, Role.STUDENT]), asyncHandler(reportController.getStudentReport));
router.get('/attendance/subject/:id', authorize([Role.ADMIN, Role.TEACHER]), asyncHandler(reportController.getSubjectReport));

export default router;
