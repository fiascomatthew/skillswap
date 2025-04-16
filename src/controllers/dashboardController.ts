import type { NextFunction, Request, Response } from 'express';
import { User } from '../models';
import HttpError from '../errors/HttpError';
import { editUserSchema, editBioSchema } from '../utils/validationSchemas';

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

  async editUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.session.connectedUser?.id;

    if (!userId) {
      return next(new HttpError('Utilisateur non connecté', 401));
    }

    const {
      value: { firstname, lastname, email, location },
      error,
    } = editUserSchema.validate(req.body);

    if (error) {
      console.log(error);
      return res.status(500).json({
        violation: true,
      });
    }

    try {
      await User.update({ firstname, lastname, email, location }, { where: { id: userId } });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: true,
        message: "Erreur lors de la mise à jour de l'utilisateur.",
      });
    }

    return res.status(200).json({ error: false, message: "Mise à jour de l'utilisateur réussie" });
  },

  async editBio(req: Request, res: Response, next: NextFunction) {
    const userId = req.session.connectedUser?.id;

    if (!userId) {
      return next(new HttpError('Utilisateur non connecté', 401));
    }

    const {
      value: { bio },
      error,
    } = editBioSchema.validate(req.body);

    if (error) {
      console.log(error);
      return res.status(500).json({
        violation: true,
      });
    }

    try {
      await User.update({ bio }, { where: { id: userId } });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: true,
        message: "Erreur lors de la mise à jour de la bio de l'utilisateur.",
      });
    }

    return res.status(200).json({ error: false, message: 'Mise à jour de la bio réussie' });
  },
};
