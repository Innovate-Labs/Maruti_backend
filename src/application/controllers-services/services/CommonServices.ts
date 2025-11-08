import { Line } from "@/models/line"
import { Machine } from "@/models/machine"
import { Plant } from "@/models/plant"
import { Shop } from "@/models/shop"
import { Supervisor } from "@/models/supervisor"
import { Technician } from "@/models/technician"
import dayjs from 'dayjs';
import { col, Op, where } from 'sequelize';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);

export const commonServices = {
  GetAllData: async () => {
    const [
      plantCount,
      shopCount,
      lineCount,
      technicianCount,
      supervisorCount,
      machineCount
    ] = await Promise.all([
      Plant.count(),
      Shop.count(),
      Line.count(),
      Technician.count(),
      Supervisor.count(),
      Machine.count()
    ]);

    return {
      plant: plantCount,
      shop: shopCount,
      line: lineCount,
      technician: technicianCount,
      supervisor: supervisorCount,
      machine: machineCount
    };
  },
GetAllDashboardData: async () => {
  const tz = "Asia/Kolkata";

  const todayStart = dayjs().tz(tz).startOf("day").format("YYYY-MM-DD HH:mm:ss");
  const todayEnd = dayjs().tz(tz).endOf("day").format("YYYY-MM-DD HH:mm:ss");

  const [
    technicianCount,
    machineCount,
    todayScheduledMachineCount
  ] = await Promise.all([
    Technician.count(),
    Machine.count(),
    Machine.count({
      where: where(
        col("first_services"),
        {
          [Op.between]: [todayStart, todayEnd],
        }
      ),
    }),
  ]);

  return {
    technician: technicianCount,
    machine: machineCount,
    todayScheduledMachines: todayScheduledMachineCount,
  };
}

  
}

