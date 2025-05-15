import type { Request, Response } from 'express';
import { User } from '../models/index';
import { sequelizeClient } from '../models/sequelizeClient';
import { Op } from 'sequelize';
import { searchSkillSchema } from '../utils/validationSchemas';

export const getHomePage = async (req: Request, res: Response) => {
  const users = await User.findAll({
    include: [{ association: 'skills' }],
    order: sequelizeClient.fn('RANDOM'),
    limit: 6,
  });

  res.render('pages/home', { users });
};

export const getSkillsSearch = async (req: Request, res: Response) => {
  const { error } = searchSkillSchema.validate(req.query);

  if (error) {
    return res.render('pages/searchResults', {
      users: [],
      query: '',
      error: 'La recherche ne peut pas être vide',
    });
  }

  const { query } = req.query;

  const users = await User.findAll({
    include: [
      {
        association: 'skills',
        where: {
          description: {
            [Op.iLike]: `%${query}%`,
          },
        },
      },
    ],
  });

  res.render('pages/searchResults', { users, query, error: null });
};
