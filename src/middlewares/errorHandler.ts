import type { Request, Response, NextFunction } from 'express';
import HttpError from '../errors/HttpError';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let message = 'Something wrong happened';

  if (err instanceof HttpError) {
    statusCode = err.statusCode;
    if (statusCode === 404 || statusCode === 401) {
      message = 'La page que vous recherchez est introuvable.';
    }
  }

  res.status(statusCode).render('pages/error', { message });
};

export default errorHandler;
