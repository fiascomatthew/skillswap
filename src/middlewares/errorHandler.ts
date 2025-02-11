import type { Request, Response, NextFunction } from 'express';
import HttpError from '../errors/HttpError';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let message = 'Un problème est survenu, veuillez réessayer plus tard.';

  if (err instanceof HttpError) {
    statusCode = err.statusCode;
    if (statusCode === 404 || statusCode === 401) {
      message = 'La page que vous recherchez est introuvable.';
    }
  }

  console.log('ERROR', err);
  res.status(statusCode).render('pages/error', { message });
};

export default errorHandler;
