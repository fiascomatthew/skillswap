import type { NextFunction, Request, Response } from 'express';
import { User } from '../models';
import bcrypt from 'bcrypt';

export const authController = {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        error: true,
        message: 'Adresse e-mail ou mot de passe incorrect.',
      });
    }

    const match = bcrypt.compareSync(password, user.password || '');

    if (!match) {
      return res.status(401).json({
        error: true,
        message: 'Adresse e-mail ou mot de passe incorrect.',
      });
    }

    return res.status(200).json({ error: false, message: 'Connexion réussie' });
  },

  async register(req: Request, res: Response) {
    const { firstname, lastname, email, password, location } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({ error: 'Utilisateur déjà existant' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const createdUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      location,
    } as User);

    return res.status(200).json({ error: false, message: 'Inscription réussie' });
  },
};
