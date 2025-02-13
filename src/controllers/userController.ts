import type { NextFunction, Request, Response } from 'express';
import { User } from '../models';
import HttpError from '../errors/HttpError';

export const userController = {
  async show(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      include: [
        { association: 'skills' },
        { association: 'interests' },
        { association: 'availabilities' },
        {
          association: 'reviewsReceived',
          include: [
            {
              model: User,
              as: 'reviewer',
              attributes: ['firstname', 'lastname'],
            },
          ],
        },
      ],
    });

    if (!user) {
      return next(new HttpError('Utilisateur introuvable', 404));
    }

    return res.render('pages/user', { user });
  },
};
