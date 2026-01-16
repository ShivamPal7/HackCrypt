import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import * as authValidator from '../validators/auth.validator';
import { validate } from '../middlewares/validate.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import asyncHandler from '../utils/asyncHandler';

const router = Router();

router.post('/register', validate(authValidator.registerSchema), asyncHandler(authController.register));
router.post('/login', validate(authValidator.loginSchema), asyncHandler(authController.login));
router.post('/refresh', validate(authValidator.refreshTokenSchema), asyncHandler(authController.refresh));
router.get('/me', authenticate, asyncHandler(authController.getMe));

export default router;
