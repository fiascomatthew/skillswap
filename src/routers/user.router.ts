import { Router } from 'express';
import { userController } from '../controllers/userController.js';
import { isAuthorized } from '../middlewares/isAuthorized.js';
import { catchErrors } from '../middlewares/catchErrors.js';

const router = Router();

router.get('/users/:id(\\d+)', isAuthorized, catchErrors(userController.show));
router.post(
  '/users/:id(\\d+)/toggle-follow',
  isAuthorized,
  catchErrors(userController.toggleFollow),
);

export default router;
