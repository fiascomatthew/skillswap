import type { Request, Response, NextFunction } from 'express';

export const connectedUserToLocals = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.connectedUser) {
    res.locals.connectedUser = req.session.connectedUser;
  } else {
    res.locals.connectedUser = false;
  }

  next();
};
