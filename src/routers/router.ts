import { Router } from 'express';
import { catchErrors } from '../middlewares/catchError';
import { getHomePage, getSkillsSearch }from '../controllers/mainController';

const router = Router();

router.get('/',catchErrors(getHomePage));
router.get('/search',catchErrors(getSkillsSearch));

export default router;
