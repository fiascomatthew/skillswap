import { Router, type Request, type Response } from 'express';
import { authController } from '../controllers/authController';
import { userController } from '../controllers/userController';
import { catchErrors } from '../middlewares/catchErrors';
import { getHomePage, getSkillsSearch } from '../controllers/mainController';

const router = Router();

router.get('/', catchErrors(getHomePage));
router.get('/search', catchErrors(getSkillsSearch));

router.get('/login', catchErrors(authController.getLoginPage));
router.get('/register', catchErrors(authController.getRegisterPage));
router.post('/login', catchErrors(authController.login));
router.post('/register', catchErrors(authController.register));

router.get('/users/:id(\\d+)', catchErrors(userController.show));

router.get('/error', (req: Request, res: Response) => {
  res.render('pages/error', { message: 'Une erreur est survenue' });
});

router.get('/about', (req: Request, res: Response) => {
  res.render('pages/about');
});

router.get('/contact', (req: Request, res: Response) => {
  res.render('pages/contact');
});

router.get('/terms', (req: Request, res: Response) => {
  res.render('pages/terms');
});

router.get('/gcu', (req: Request, res: Response) => {
  res.render('pages/gcu');
});

export default router;
