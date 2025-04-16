import { Router, type Request, type Response } from 'express';
import { authController } from '../controllers/authController';
import { userController } from '../controllers/userController';
import { catchErrors } from '../middlewares/catchErrors';
import { getHomePage, getSkillsSearch } from '../controllers/mainController';
import { isAuthorized } from '../middlewares/isAuthorized';
import { sanitizeInputs } from '../middlewares/sanitizeInputs';
import { dashboardController } from '../controllers/dashboardController';

const router = Router();

router.get('/', catchErrors(getHomePage));
router.get('/search', catchErrors(getSkillsSearch));

router.get('/login', catchErrors(authController.getLoginPage));
router.get('/register', catchErrors(authController.getRegisterPage));

router.post('/login', sanitizeInputs, catchErrors(authController.login));
router.post('/register', sanitizeInputs, catchErrors(authController.register));

router.get('/logout', catchErrors(authController.logout));

router.get('/users/:id(\\d+)', isAuthorized, catchErrors(userController.show));
router.post(
  '/users/:id(\\d+)/toggle-follow',
  isAuthorized,
  catchErrors(userController.toggleFollow),
);

router.get('/dashboard', isAuthorized, catchErrors(dashboardController.show));
router.patch('/dashboard/user', isAuthorized, catchErrors(dashboardController.editUser));

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
