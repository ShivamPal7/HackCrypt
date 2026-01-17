import { Router } from 'express';
import * as subjectController from '../controllers/subject.controller';
import * as subjectValidator from '../validators/subject.validator';
import { validate } from '../middlewares/validate.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import asyncHandler from '../utils/asyncHandler';
import { Role } from '@prisma/client';

const router = Router();

router.use(authenticate);

router.post('/', authorize([Role.ADMIN]), validate(subjectValidator.createSubjectSchema), asyncHandler(subjectController.create));
router.get('/', authorize([Role.ADMIN, Role.TEACHER, Role.STUDENT]), asyncHandler(subjectController.getAll));
router.get('/:id', authorize([Role.ADMIN, Role.TEACHER, Role.STUDENT]), asyncHandler(subjectController.get));
router.put('/:id', authorize([Role.ADMIN]), validate(subjectValidator.updateSubjectSchema), asyncHandler(subjectController.update));

// Assignment Routes
router.post('/:id/assign-class', authorize([Role.ADMIN]), asyncHandler(subjectController.assignToClass));
router.post('/:id/assign-department', authorize([Role.ADMIN]), asyncHandler(subjectController.assignToDepartment));

router.delete('/:id', authorize([Role.ADMIN]), asyncHandler(subjectController.remove));

export default router;
