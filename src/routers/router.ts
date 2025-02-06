import { Router, type Request, type Response } from 'express';
import { authController } from '../controllers/authController';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.render('pages/home');
});

router.post('/login', authController.login);
router.post('/register', authController.register);

export default router;
