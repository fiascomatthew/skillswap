import { Sequelize } from "sequelize-typescript";
import {
  User,
  Category,
  Skill,
  Availability,
  Review,
  Message,
  UserSkill,
  UserInterest,
} from "./index";

export const sequelize = new Sequelize(
  // TODO: url in ENV
  "postgres://postgres:postgres@db:5432/postgres",
  {
    dialect: "postgres",
    logging: true,
    models: [
      User,
      Category,
      Skill,
      Availability,
      Review,
      Message,
      UserSkill,
      UserInterest,
    ],
    define: {
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

// test de la connexion à la base de données
sequelize
  .authenticate()
  .then((): void => {
    console.log("Connection has been established successfully.");
  })
  .catch((error: Error): void => {
    console.error("Unable to connect to the database:", error);
  });
