import type { Request, Response, NextFunction } from 'express';
import HttpError from '../errors/HttpError';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  next(new HttpError('Page not found', 404));
};

export default notFound;
