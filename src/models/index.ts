import * as User from './user'
import * as Line from './line'
import * as Plant from './plant'
import * as Shop from './shop'
import * as Supervisor from './supervisor'
import * as SupervisorShopLine from './supervisor_shop_line'
import * as Machine from './machine'
import * as MachineSteps from './machinesSteps'

import "./associations";
import { sequelize } from '@/database/db.config'


export {
    User,
    Line,
    Plant,
    Shop,
    Supervisor,
    SupervisorShopLine,
    Machine,
    MachineSteps,
    sequelize
}

// Connect + Sync function
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");

    // await sequelize.sync({ alter: true });
    console.log("🗂️ Tables synchronized successfully!");
  } catch (error) {
    console.error("❌ Unable to connect to database:", error);
  }
};