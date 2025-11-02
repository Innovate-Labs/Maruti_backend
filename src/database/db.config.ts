import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("Maruti_db", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
  logging: false,
});
