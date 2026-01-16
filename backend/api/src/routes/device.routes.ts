import { Router } from 'express';
import * as deviceController from '../controllers/device.controller';
import * as deviceValidator from '../validators/device.validator';
import { validate } from '../middlewares/validate.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import asyncHandler from '../utils/asyncHandler';
import { Role } from '@prisma/client';

const router = Router();

router.use(authenticate);

router.post('/register', authorize([Role.STUDENT]), validate(deviceValidator.registerDeviceSchema), asyncHandler(deviceController.register));
router.get('/me', authorize([Role.STUDENT]), asyncHandler(deviceController.getMe));

export default router;
