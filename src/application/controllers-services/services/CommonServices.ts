import { Line } from "@/models/line"
import { Machine } from "@/models/machine"
import { Plant } from "@/models/plant"
import { Shop } from "@/models/shop"
import { Supervisor } from "@/models/supervisor"
import { Technician } from "@/models/technician"

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
  }
}