import { Router } from 'express';
import { authController } from '../controllers/authController.js';
import { sanitizeInputs } from '../middlewares/sanitizeInputs.js';
import { catchErrors } from '../middlewares/catchErrors.js';

const router = Router();

router.get('/login', catchErrors(authController.getLoginPage));
router.get('/register', catchErrors(authController.getRegisterPage));
router.post('/login', sanitizeInputs, catchErrors(authController.login));
router.post('/register', sanitizeInputs, catchErrors(authController.register));
router.get('/logout', catchErrors(authController.logout));

export default router;
