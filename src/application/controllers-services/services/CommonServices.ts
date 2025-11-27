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
import { MachineSteps } from "@/models/machinesSteps"

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
async function countCriticalAlerts() {
const allSteps = await MachineSteps.findAll({
  attributes: ["stepsRecord"]
});
console.log('MJHHH',allSteps)
let totalCritical = 0;
const allstepsData = JSON.parse(JSON.stringify(allSteps));
allstepsData?.forEach((item: any) => {
  let steps = [];

  try {
    let parsed = item.stepsRecord;

    // First parse
    if (typeof parsed === "string") {
      parsed = JSON.parse(parsed);
    }

    // Second parse (your data needs this)
    if (typeof parsed === "string") {
      parsed = JSON.parse(parsed);
    }

    steps = Array.isArray(parsed) ? parsed : [];
  } catch {
    steps = [];
  }

  console.log('ARTTTTQWERTTYYUU',steps)

  const count = steps.filter((s: any) =>
    s.panelType !== "Unknown" && (s.rating === 4 || s.rating === 5)
  ).length;

  totalCritical += count;
});

console.log("TOTAL CRITICAL ALERTS =", totalCritical);
return totalCritical;
}
  const [
    technicianCount,
    machineCount,
    todayScheduledMachineCount,
    countCriticalAlertsCount
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
      countCriticalAlerts()   // 👈 here.
  ]);

  return {
    technician: technicianCount,
    machine: machineCount,
    todayScheduledMachines: todayScheduledMachineCount,
    countCriticalAlertsCount:countCriticalAlertsCount
  };
}

  
}

