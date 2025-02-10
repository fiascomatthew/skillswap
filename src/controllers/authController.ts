import type { NextFunction, Request, Response } from 'express';
import { User } from '../models';
import bcrypt from 'bcrypt';
import Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const registerSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
  location: Joi.string().required(),
  terms: Joi.boolean().truthy('on').falsy('off').required(),
});

export const authController = {
  async login(req: Request, res: Response, next: NextFunction) {
    const {
      value: { email, password },
      error,
    } = loginSchema.validate(req.body);

    if (error) {
      return res.status(500).json({
        violation: true,
      });
    }

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
    const {
      value: { firstname, lastname, email, password, confirmPassword, location },
      error,
    } = registerSchema.validate(req.body);

    if (error) {
      console.log(error);
      return res.status(500).json({
        violation: true,
      });
    }

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
