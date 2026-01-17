import { Router } from 'express';
import * as auditController from '../controllers/audit.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import asyncHandler from '../utils/asyncHandler';
import { Role } from '@prisma/client';

const router = Router();

router.use(authenticate);

router.get('/attendance/:id', authorize([Role.ADMIN]), asyncHandler(auditController.getAttendanceAudit));
router.get('/user/:id', authorize([Role.ADMIN]), asyncHandler(auditController.getUserAudit));

export default router;
