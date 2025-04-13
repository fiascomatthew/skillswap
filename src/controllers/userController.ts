import type { NextFunction, Request, Response } from 'express';
import { User } from '../models';
import HttpError from '../errors/HttpError';

export const userController = {
  async show(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const userId = req.session.connectedUser?.id;

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

    const currentUser = await User.findByPk(userId);
    const isFollowing = currentUser ? await currentUser.isFollowing(user) : false;

    return res.render('pages/user', { user, isFollowing });
  },

  async toggleFollow(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const userId = req.session.connectedUser?.id;

    const user = await User.findByPk(id);
    const currentUser = await User.findByPk(userId);

    if (!user || !currentUser) {
      return res.status(404).json({ success: false, message: 'Utilisateur introuvable' });
    }

    await ((await currentUser.isFollowing(user))
      ? user.removeFollower(currentUser)
      : user.addFollower(currentUser));

    console.log('isFollowing:', await currentUser.isFollowing(user));

    return res.redirect(`/users/${id}`);
  },
};
