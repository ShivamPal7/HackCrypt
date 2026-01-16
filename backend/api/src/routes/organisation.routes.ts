import { Router } from 'express';
import * as organisationController from '../controllers/organisation.controller';
import * as organisationValidator from '../validators/organisation.validator';
import { validate } from '../middlewares/validate.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import asyncHandler from '../utils/asyncHandler';
import { Role } from '@prisma/client';

const router = Router();

router.use(authenticate);

router.post('/', authorize([Role.ORGANISATION, Role.ADMIN]), validate(organisationValidator.createOrganisationSchema), asyncHandler(organisationController.create));
router.get('/:id', authorize([Role.ORGANISATION, Role.ADMIN, Role.TEACHER]), asyncHandler(organisationController.get)); // Teacher might need to see org details?
router.put('/:id', authorize([Role.ORGANISATION, Role.ADMIN]), validate(organisationValidator.updateOrganisationSchema), asyncHandler(organisationController.update));
router.delete('/:id', authorize([Role.ORGANISATION, Role.ADMIN]), asyncHandler(organisationController.remove));

export default router;
