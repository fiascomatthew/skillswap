import { Router, type Request, type Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.render('pages/home');
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
