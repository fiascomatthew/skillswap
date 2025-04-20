import type { Request, Response } from 'express';
import { User } from '../models';
import bcrypt from 'bcrypt';
import { loginSchema, registerSchema } from '../utils/validationSchemas';

export const authController = {
  getLoginPage(req: Request, res: Response) {
    if (req.session?.connectedUser) {
      return res.redirect('/register');
    }

    const returnTo = req.query.returnTo || '';

    res.render('pages/login', { returnTo });
  },

  getRegisterPage(req: Request, res: Response) {
    if (req.session?.connectedUser) {
      return res.redirect('/');
    }

    const returnTo = req.query.returnTo || '';

    res.render('pages/register', { returnTo });
  },

  async login(req: Request, res: Response) {
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

    // Store user details in session
    req.session.connectedUser = {
      id: user.id,
      firstname: user.firstname,
      image: user.image,
    };

    return res.status(200).json({ error: false, message: 'Connexion réussie' });
  },

  async logout(req: Request, res: Response) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          error: true,
          message: 'Erreur lors de la déconnexion.',
        });
      }
    });
    return res.redirect('/');
  },

  async register(req: Request, res: Response) {
    const {
      value: { firstname, lastname, email, password, confirmPassword, location },
      error,
    } = registerSchema.validate(req.body);

    if (error) {
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

    // Store user details in session
    req.session.connectedUser = {
      id: createdUser.id,
      firstname: createdUser.firstname,
      image: createdUser.image,
    };

    return res.status(200).json({ error: false, message: 'Inscription réussie' });
  },
};
