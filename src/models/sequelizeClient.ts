import { Sequelize } from 'sequelize-typescript';
import {
  User,
  Category,
  Skill,
  Availability,
  Review,
  Message,
  UserSkill,
  UserInterest,
} from './index';

export const sequelizeClient = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: 'postgres',
  logging: process.env.NODE_ENV !== 'test',
  models: [User, Category, Skill, Availability, Review, Message, UserSkill, UserInterest],
  define: {
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  },
});

// test de la connexion à la base de données
sequelizeClient
  .authenticate()
  .then((): void => {
    console.log('Connection has been established successfully.');
  })
  .catch((error: Error): void => {
    console.error('Unable to connect to the database:', error);
  });
