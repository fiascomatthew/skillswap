import { Router } from 'express';
import { dashboardController } from '../controllers/dashboardController.js';
import { isAuthorized } from '../middlewares/isAuthorized.js';
import { catchErrors } from '../middlewares/catchErrors.js';

const router = Router();

router.get('/dashboard', isAuthorized, catchErrors(dashboardController.show));
router.patch('/dashboard/user', isAuthorized, catchErrors(dashboardController.editUser));
router.patch('/dashboard/bio', isAuthorized, catchErrors(dashboardController.editBio));
router.post('/dashboard/interest', isAuthorized, catchErrors(dashboardController.addInterest));
router.delete('/dashboard/interest', isAuthorized, catchErrors(dashboardController.removeInterest));
router.post('/dashboard/skill', isAuthorized, catchErrors(dashboardController.addSkill));
router.delete('/dashboard/skill', isAuthorized, catchErrors(dashboardController.removeSkill));

export default router;
