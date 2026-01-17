import { Router } from 'express';
import * as institutionController from '../controllers/institution.controller';
import * as institutionValidator from '../validators/institution.validator';
import { validate } from '../middlewares/validate.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import asyncHandler from '../utils/asyncHandler';
import { Role } from '@prisma/client';

const router = Router();

// Public: Create Institution (and Admin User)
router.post('/', validate(institutionValidator.createInstitutionSchema), asyncHandler(institutionController.create));

// Protected
router.use(authenticate);

// Join Flow
router.post('/join-request', validate(institutionValidator.joinRequestSchema), asyncHandler(institutionController.joinRequest));
router.get('/join-requests', authorize([Role.ADMIN]), asyncHandler(institutionController.getJoinRequests));
router.post('/join-requests/:id/approve', authorize([Role.ADMIN]), asyncHandler(institutionController.approveJoinRequest));
router.post('/join-requests/:id/reject', authorize([Role.ADMIN]), asyncHandler(institutionController.rejectJoinRequest));

// Institution Management
router.get('/me', authorize([Role.ADMIN, Role.TEACHER, Role.STUDENT]), asyncHandler(institutionController.getMe));
router.put('/me', authorize([Role.ADMIN]), validate(institutionValidator.updateInstitutionSchema), asyncHandler(institutionController.update));
router.delete('/me', authorize([Role.ADMIN]), asyncHandler(institutionController.remove));

export default router;
