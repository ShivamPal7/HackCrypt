import { Router } from 'express';
import { sendResponse } from '../utils/response';
import { Role, AttendanceStatus, SessionStatus } from '@prisma/client';

const router = Router();

router.get('/roles', (req, res) => sendResponse(res, 200, 'Roles', Object.values(Role)));
router.get('/attendance-status', (req, res) => sendResponse(res, 200, 'Attendance Statuses', Object.values(AttendanceStatus)));
router.get('/session-status', (req, res) => sendResponse(res, 200, 'Session Statuses', Object.values(SessionStatus)));

export default router;
