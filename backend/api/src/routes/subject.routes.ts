import { Router } from 'express';
import * as subjectController from '../controllers/subject.controller';
import * as subjectValidator from '../validators/subject.validator';
import { validate } from '../middlewares/validate.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import asyncHandler from '../utils/asyncHandler';
import { Role } from '@prisma/client';

const router = Router();

router.use(authenticate);

router.post('/', authorize([Role.ORGANISATION, Role.ADMIN]), validate(subjectValidator.createSubjectSchema), asyncHandler(subjectController.create));
router.get('/:id', authorize([Role.ORGANISATION, Role.ADMIN, Role.TEACHER, Role.STUDENT]), asyncHandler(subjectController.get));
router.put('/:id', authorize([Role.ORGANISATION, Role.ADMIN]), validate(subjectValidator.updateSubjectSchema), asyncHandler(subjectController.update));
router.delete('/:id', authorize([Role.ORGANISATION, Role.ADMIN]), asyncHandler(subjectController.remove));

export default router;
