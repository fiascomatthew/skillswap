import type { NextFunction, Request, Response } from 'express';
import { User } from '../models';
import HttpError from '../errors/HttpError';

export const dashboardController = {
  async show(req: Request, res: Response, next: NextFunction) {
    const userId = req.session.connectedUser?.id;

    if (!userId) {
      return next(new HttpError('Utilisateur non connecté', 401));
    }

    const user = await User.findByPk(userId, {
      include: [
        { association: 'skills' },
        { association: 'interests' },
        { association: 'availabilities' },
        { association: 'followers' },
        { association: 'following' },
      ],
    });

    if (!user) {
      return next(new HttpError('Utilisateur introuvable', 404));
    }

    return res.render('pages/dashboard', { user });
  },
};
