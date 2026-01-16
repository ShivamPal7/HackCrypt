import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import * as authValidator from '../validators/auth.validator';
import { validate } from '../middlewares/validate.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import asyncHandler from '../utils/asyncHandler';
import { Role } from '@prisma/client';

const router = Router();

router.use(authenticate);

// Self Management (All Roles)
router.get('/me', asyncHandler(userController.getMe));
router.put('/me/profile', asyncHandler(userController.updateProfile)); // Validate schema?

// Admin Management (Strict)
router.get('/', authorize([Role.ADMIN]), asyncHandler(userController.getAll));
router.post('/', authorize([Role.ADMIN]), validate(authValidator.registerSchema), asyncHandler(userController.create));
router.get('/:id', authorize([Role.ADMIN]), asyncHandler(userController.get));
router.put('/:id', authorize([Role.ADMIN]), asyncHandler(userController.update));
router.patch('/:id/status', authorize([Role.ADMIN]), asyncHandler(userController.updateStatus));
router.delete('/:id', authorize([Role.ADMIN]), asyncHandler(userController.remove));

export default router;

