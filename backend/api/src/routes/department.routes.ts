import { Router } from 'express';
import * as departmentController from '../controllers/department.controller';
import * as departmentValidator from '../validators/department.validator';
import { validate } from '../middlewares/validate.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import asyncHandler from '../utils/asyncHandler';
import { Role } from '@prisma/client';

const router = Router();

router.use(authenticate);

router.post('/', authorize([Role.ADMIN]), validate(departmentValidator.createDepartmentSchema), asyncHandler(departmentController.create));
router.get('/', authorize([Role.ADMIN, Role.TEACHER, Role.STUDENT]), asyncHandler(departmentController.getAll));
router.get('/:id', authorize([Role.ADMIN, Role.TEACHER]), asyncHandler(departmentController.get));
router.put('/:id', authorize([Role.ADMIN]), validate(departmentValidator.updateDepartmentSchema), asyncHandler(departmentController.update));
router.delete('/:id', authorize([Role.ADMIN]), asyncHandler(departmentController.remove));

export default router;
