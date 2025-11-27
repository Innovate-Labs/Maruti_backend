import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // 👈 must come before using process.env


export const sequelize = new Sequelize(process.env.DATABASE_NAME as string, process.env.DATABASE_USER as string, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: "mysql",
    timezone: "+05:30",     // <-- MOST IMPORTANT
  dialectOptions: {
    useUTC: false,
    dateStrings: true,
    typeCast: true
  },
  port:3306,
  logging: false,
});
