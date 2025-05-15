import { Router, type Request, type Response } from 'express';
import {
  getHomePage,
  getSkillsSearch,
  getErrorPage,
  getAboutPage,
  getContactPage,
  getTermsPage,
  getGcuPage,
} from '../controllers/mainController.js';
import { catchErrors } from '../middlewares/catchErrors.js';

const router = Router();

router.get('/', catchErrors(getHomePage));
router.get('/search', catchErrors(getSkillsSearch));
router.get('/error', getErrorPage);
router.get('/about', getAboutPage);
router.get('/contact', getContactPage);
router.get('/terms', getTermsPage);
router.get('/gcu', getGcuPage);

export default router;
