import { Router } from 'express';

import {
  validateRegister,
  validateLoginInput,
} from '../middlewares/validationMiddleware.js';
import { login, logout, register } from '../controllers/authController.js';

const router = Router();

router.route('/register').post(validateRegister, register);
router.route('/login').post(validateLoginInput, login);
router.route('/logout').get(logout);

export default router;
