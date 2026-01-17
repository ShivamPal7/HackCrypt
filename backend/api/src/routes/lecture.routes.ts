import { Router } from 'express';
import * as lectureController from '../controllers/lecture.controller';
import * as attendanceController from '../controllers/attendance.controller'; // Import attendance controller
import * as lectureValidator from '../validators/lecture.validator';
import { validate } from '../middlewares/validate.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import asyncHandler from '../utils/asyncHandler';
import { Role } from '@prisma/client';

const router = Router();

router.use(authenticate);

// Canonical Session Routes (Nested)
// POST /lectures/:id/sessions/start (Teacher) - We map this to createSession, passing lectureId in body? 
// No, spec says POST /lectures/:id/sessions/start.
// We need a wrapper in controller to inject req.params.id into body.lectureId or service method change.
// createSession takes (userId, data). Data needs lectureId.
// Let's use a middleware or just a small inline handler wrapper?
// Or update attendanceController.createSession to look at params if body missing?
// Let's stick to simple: The route handler can simple take params.id and call service.
// Actually, I'll map `POST /:id/sessions/start` to `attendanceController.createSession` BUT I need to ensure `req.body.lectureId` is set.
// I'll add a middleware to copy param to body? Or better, just update the controller.
// `attendanceController.createSession` reads `req.body`.
// Let's modify `attendanceController.createSession` to check `req.params.id` (which is lectureId in this context).

router.post('/:id/sessions/start', authorize([Role.TEACHER, Role.ADMIN]), (req, res, next) => {
    req.body.lectureId = req.params.id;
    next();
}, asyncHandler(attendanceController.createSession));

router.post('/:id/sessions/close', authorize([Role.TEACHER, Role.ADMIN]), asyncHandler(attendanceController.closeActiveSession));
router.get('/:id/sessions', authorize([Role.TEACHER, Role.ADMIN]), asyncHandler(attendanceController.getLectureSessions));


// Lecture Management
router.post('/', authorize([Role.ADMIN]), validate(lectureValidator.createLectureSchema), asyncHandler(lectureController.create));
router.get('/teacher/me', authorize([Role.ADMIN, Role.TEACHER]), asyncHandler(lectureController.getTeacherDashboard));
router.get('/', authorize([Role.ADMIN, Role.TEACHER, Role.STUDENT]), asyncHandler(lectureController.getAll));
router.get('/:id', authorize([Role.ADMIN, Role.TEACHER, Role.STUDENT]), asyncHandler(lectureController.get));
router.put('/:id', authorize([Role.ADMIN]), validate(lectureValidator.updateLectureSchema), asyncHandler(lectureController.update));
router.delete('/:id', authorize([Role.ADMIN]), asyncHandler(lectureController.remove));

export default router;

