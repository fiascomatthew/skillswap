import { Router } from 'express';
import { authController } from '../controllers/authController.js';
import { userController } from '../controllers/userController.js';
import { catchErrors } from '../middlewares/catchErrors.js';
import { getHomePage, getSkillsSearch } from '../controllers/mainController.js';
import { isAuthorized } from '../middlewares/isAuthorized.js';
import { sanitizeInputs } from '../middlewares/sanitizeInputs.js';
import { dashboardController } from '../controllers/dashboardController.js';
const router = Router();
router.get('/', catchErrors(getHomePage));
router.get('/search', catchErrors(getSkillsSearch));
router.get('/login', catchErrors(authController.getLoginPage));
router.get('/register', catchErrors(authController.getRegisterPage));
router.post('/login', sanitizeInputs, catchErrors(authController.login));
router.post('/register', sanitizeInputs, catchErrors(authController.register));
router.get('/logout', catchErrors(authController.logout));
router.get('/users/:id(\\d+)', isAuthorized, catchErrors(userController.show));
router.post('/users/:id(\\d+)/toggle-follow', isAuthorized, catchErrors(userController.toggleFollow));
router.get('/dashboard', isAuthorized, catchErrors(dashboardController.show));
router.patch('/dashboard/user', isAuthorized, catchErrors(dashboardController.editUser));
router.patch('/dashboard/bio', isAuthorized, catchErrors(dashboardController.editBio));
router.post('/dashboard/interest', isAuthorized, catchErrors(dashboardController.addInterest));
router.delete('/dashboard/interest', isAuthorized, catchErrors(dashboardController.removeInterest));
router.post('/dashboard/skill', isAuthorized, catchErrors(dashboardController.addSkill));
router.delete('/dashboard/skill', isAuthorized, catchErrors(dashboardController.removeSkill));
router.get('/error', (req, res) => {
    res.render('pages/error', { message: 'Une erreur est survenue' });
});
router.get('/about', (req, res) => {
    res.render('pages/about');
});
router.get('/contact', (req, res) => {
    res.render('pages/contact');
});
router.get('/terms', (req, res) => {
    res.render('pages/terms');
});
router.get('/gcu', (req, res) => {
    res.render('pages/gcu');
});
export default router;
