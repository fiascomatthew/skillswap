import { Router } from 'express';
import mainRouter from './main.router.js';
import authRouter from './auth.router.js';
import userRouter from './user.router.js';
import dashboardRouter from './dashboard.router.js';

const router = Router();

router.use(mainRouter);
router.use(authRouter);
router.use(userRouter);
router.use(dashboardRouter);

export default router;
