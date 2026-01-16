import { Router } from 'express';
import * as joinRequestController from '../controllers/join-request.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import asyncHandler from '../utils/asyncHandler';
import { Role } from '@prisma/client';

const router = Router();

// Only Admins and Teachers can view/manage requests
router.use(authenticate, authorize([Role.ADMIN, Role.TEACHER]));

router.get('/', asyncHandler(joinRequestController.listRequests));
router.patch('/:id', asyncHandler(joinRequestController.updateStatus));

export default router;
