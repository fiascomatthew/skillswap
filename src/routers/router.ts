import { Router, type Request, type Response } from 'express';
import { authController } from '../controllers/authController';
import { catchErrors } from '../middlewares/catchErrors';
import { getHomePage, getSkillsSearch } from '../controllers/mainController';

const router = Router();

router.get('/', catchErrors(getHomePage));
router.get('/search', catchErrors(getSkillsSearch));

router.post('/login', catchErrors(authController.login));
router.post('/register', catchErrors(authController.register));

router.get('/error', (req: Request, res: Response) => {
  res.render('pages/error', { message: 'Une erreur est survenue' });
});

export default router;
