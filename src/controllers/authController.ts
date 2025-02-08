import { Request, Response } from 'express';
import { User } from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const jwtKey: string = process.env.JWT_KEY as string;

export const authController = {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        console.log('BAD USER');
        throw new Error('Connexion échouée, veuillez rééssayer');
      }

      const match = bcrypt.compareSync(password, user.password || '');

      if (!match) {
        console.log('BAD PASSWORD');
        throw new Error('Connexion échouée, veuillez rééssayer');
      }

      const token = jwt.sign({ id: user.id, email }, jwtKey, { expiresIn: '7d' });

      res.render('pages/home');
    } catch (error: any) {
      console.log('LOGIN ERR : ', error);
      res.status(401).json({ error, message: error.message });
    }
  },

  async register(req: Request, res: Response) {
    const { firstname, lastname, email, password, location } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user) {
      throw new Error('Utilisateur déjà existant, veuillez vous connecter');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const createdUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      location,
    } as User);

    if (!createdUser) {
      throw new Error('Utilisateur non créé');
    }

    const token = jwt.sign({ id: createdUser.id, email }, jwtKey, { expiresIn: '7d' });
    res.render('pages/home');
  },
};
