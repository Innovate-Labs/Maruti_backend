import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("Maruti_db", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
  logging: false,
});

// Test connection
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Unable to connect to database:", error);
  }
};
