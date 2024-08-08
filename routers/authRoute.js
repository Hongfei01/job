import { Router } from 'express';
import rateLimiter from 'express-rate-limit';

import {
  validateRegister,
  validateLoginInput,
} from '../middlewares/validationMiddleware.js';
import { login, logout, register } from '../controllers/authController.js';

const router = Router();

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15,
  message: { msg: 'IP rate limit exceeded, retry in 15 minutes.' },
});

router.route('/register').post(apiLimiter, validateRegister, register);
router.route('/login').post(apiLimiter, validateLoginInput, login);
router.route('/logout').get(logout);

export default router;
