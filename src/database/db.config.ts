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
    
    // 👇 Import all models BEFORE syncing
    await import("../models/plant");
    await import("../models/shop");
    await import("../models/line");
    await import("../models/associations"); // defines Plant.hasMany(Shop), etc.

    // 👇 Sync models (auto create/alter tables)
    await sequelize.sync({ alter: true });

      await sequelize.sync({ alter: true }); 
  } catch (error) {
    console.error("❌ Unable to connect to database:", error);
  }
};
