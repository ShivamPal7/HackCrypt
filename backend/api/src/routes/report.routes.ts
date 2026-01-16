import { Router } from 'express';
import * as reportController from '../controllers/report.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import asyncHandler from '../utils/asyncHandler';
import { Role } from '@prisma/client';

const router = Router();

router.use(authenticate);

// Reports
router.get('/attendance/class/:id', authorize([Role.ADMIN, Role.TEACHER]), asyncHandler(reportController.getClassReport));
router.get('/attendance/student/:id', authorize([Role.ADMIN, Role.TEACHER, Role.STUDENT]), asyncHandler(reportController.getStudentReport)); // Student can view own? Need check in service/controller.
router.get('/attendance/subject/:id', authorize([Role.ADMIN, Role.TEACHER]), asyncHandler(reportController.getSubjectReport));

export default router;
