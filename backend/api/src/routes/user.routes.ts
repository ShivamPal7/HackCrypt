import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import * as authValidator from '../validators/auth.validator'; // Reuse register schema or create new user schema? Use auth validator for now or create generic user
import { validate } from '../middlewares/validate.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import asyncHandler from '../utils/asyncHandler';
import { Role } from '@prisma/client';

const router = Router();

router.use(authenticate);

// Admin can manage all users. Organisations can manage their own (logic needs refinement for org-specific, but RBAC allows ADMIN/ORG)
router.post('/', authorize([Role.ADMIN, Role.ORGANISATION]), validate(authValidator.registerSchema), asyncHandler(userController.create));
router.get('/:id', authorize([Role.ADMIN, Role.ORGANISATION]), asyncHandler(userController.get));
router.put('/:id', authorize([Role.ADMIN, Role.ORGANISATION]), asyncHandler(userController.update));
router.delete('/:id', authorize([Role.ADMIN, Role.ORGANISATION]), asyncHandler(userController.remove));

export default router;
