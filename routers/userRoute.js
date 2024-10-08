import { Router } from 'express';

import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
} from '../controllers/userController.js';
import { validateUpdateUserInput } from '../middlewares/validationMiddleware.js';
import {
  authenticatePermission,
  checkForTestUser,
} from '../middlewares/authenticateMiddleware.js';
import upload from '../middlewares/multerMiddleware.js';

const router = Router();

router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', [
  authenticatePermission('admin'),
  getApplicationStats,
]);
router.patch(
  '/update-user',
  checkForTestUser,
  upload.single('avatar'),
  validateUpdateUserInput,
  updateUser
);

export default router;
