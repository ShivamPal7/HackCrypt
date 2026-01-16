import { Router } from 'express';
import * as attendanceController from '../controllers/attendance.controller';
import * as attendanceValidator from '../validators/attendance.validator';
import { validate } from '../middlewares/validate.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import asyncHandler from '../utils/asyncHandler';
import { Role } from '@prisma/client';

const router = Router();

router.use(authenticate);

// 10. Attendance (Critical Path)
// Student
router.post('/mark', authorize([Role.STUDENT]), validate(attendanceValidator.markAttendanceSchema), asyncHandler(attendanceController.mark));
router.get('/me', authorize([Role.STUDENT]), asyncHandler(attendanceController.getMyAttendance));

// Teacher
router.get('/lecture/:id', authorize([Role.TEACHER, Role.ADMIN]), asyncHandler(attendanceController.getLectureAttendance));

// Admin (Overrides & Details)
router.post('/:id/override', authorize([Role.ADMIN]), validate(attendanceValidator.overrideAttendanceSchema), asyncHandler(attendanceController.override));
router.get('/:id/override', authorize([Role.ADMIN]), asyncHandler(attendanceController.getOverride));

// Legacy or Internal Session Management (Optional, favoring Lecture Nested Routes)
// router.get('/sessions/:id', ...); // Deprecated in favor of /lectures/:id/sessions?
// Let's keep specific session getter if needed by UI directly by ID? "GET /lectures/:id/sessions" gives list. 
// "GET /attendance/sessions/:id" useful for specific details?
// Spec 9: GET /lectures/:id/sessions. Doesn't mention GET /sessions/:id specific.
// I'll keep it for robustness but strict to spec is preferred. Leaving it out as per "No API should remain...".

export default router;

