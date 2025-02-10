import type { Request, Response, NextFunction } from 'express';

function catchError(
  controllerMethod: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<void | Response<any>>,
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controllerMethod(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

export { catchError };
