import type { Request, Response, NextFunction } from 'express';
import validator from 'validator';

const sanitizeInputs = (req: Request, res: Response, next: NextFunction) => {
  if (req.body && typeof req.body === 'object') {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = validator.trim(req.body[key]);
        req.body[key] = validator.escape(req.body[key]);
      }
    }
  }
  next();
};

export { sanitizeInputs };
