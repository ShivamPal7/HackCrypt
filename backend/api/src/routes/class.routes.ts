import { Router } from 'express';
import * as classController from '../controllers/class.controller';
import * as classValidator from '../validators/class.validator';
import { validate } from '../middlewares/validate.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import asyncHandler from '../utils/asyncHandler';
import { Role } from '@prisma/client';

const router = Router();

router.use(authenticate);

router.post('/', authorize([Role.ADMIN]), validate(classValidator.createClassSchema), asyncHandler(classController.create));
router.get('/:id', authorize([Role.ADMIN, Role.TEACHER, Role.STUDENT]), asyncHandler(classController.get));
router.put('/:id', authorize([Role.ADMIN]), validate(classValidator.updateClassSchema), asyncHandler(classController.update));
router.delete('/:id', authorize([Role.ADMIN]), asyncHandler(classController.remove));

export default router;
