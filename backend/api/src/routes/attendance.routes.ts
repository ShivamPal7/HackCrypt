import { Router } from 'express';
import * as attendanceController from '../controllers/attendance.controller';
import * as attendanceValidator from '../validators/attendance.validator';
import { validate } from '../middlewares/validate.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import asyncHandler from '../utils/asyncHandler';
import { Role } from '@prisma/client';

const router = Router();

router.use(authenticate);

// Sessions
router.post('/sessions', authorize([Role.TEACHER, Role.ADMIN]), validate(attendanceValidator.createSessionSchema), asyncHandler(attendanceController.createSession));
router.get('/sessions/:id', authorize([Role.TEACHER, Role.ADMIN, Role.STUDENT]), asyncHandler(attendanceController.getSession));
router.post('/sessions/:id/start', authorize([Role.TEACHER, Role.ADMIN]), asyncHandler(attendanceController.startSession));
router.post('/sessions/:id/end', authorize([Role.TEACHER, Role.ADMIN]), asyncHandler(attendanceController.endSession));

// Attendance
router.post('/attendance/mark', authorize([Role.STUDENT]), validate(attendanceValidator.markAttendanceSchema), asyncHandler(attendanceController.mark));
router.post('/attendance/:id/override', authorize([Role.ADMIN]), validate(attendanceValidator.overrideAttendanceSchema), asyncHandler(attendanceController.override));

export default router;
