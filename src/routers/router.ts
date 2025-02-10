import { Router, type Request, type Response } from 'express';
import { authController } from '../controllers/authController';
import { catchError } from '../middlewares/catchError';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.render('pages/home');
});

router.get('/error', (req: Request, res: Response) => {
  res.render('pages/error', { message: 'Une erreur est survenue' });
});

router.post('/login', catchError(authController.login));
router.post('/register', catchError(authController.register));

export default router;
