import type { Request, Response, NextFunction } from 'express';

function isAuthorized(req: Request, res: Response, next: NextFunction) {
  if (!req.session.connectedUser) {
    return res.redirect(`/login?returnTo=${encodeURIComponent(req.originalUrl)}`);
  }

  return next();
}

export { isAuthorized };
