import { Sequelize } from 'sequelize-typescript';
import { User, Category, Skill, Availability, Review, Message, UserSkill, UserInterest, } from './index.js';
export const sequelizeClient = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: true,
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
    .then(() => {
    console.log('Connection has been established successfully.');
})
    .catch((error) => {
    console.error('Unable to connect to the database:', error);
});
