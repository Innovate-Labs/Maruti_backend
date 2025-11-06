import { Machine } from "@/models/machine"
import { MachineSteps } from "@/models/machinesSteps"
import { Task } from "@/models/task"
import { Technician } from "@/models/technician"


export const taskServices = {
  AddTask: async (data: any) => {
    const result = await Task.create(data)
    return result
  },
  GetTask: async () => {
    const result = await Task.findAll({
      include: [
        {
          model: Technician,
          as: "technician",
          attributes: ["id", "name", "employee_id", "email"], // select columns you need
        },
        {
          model: Machine,
          as: "machine",
          attributes: ["id", "machine_name", "serial_number", "services_frequency"], // select columns you need
        },
      ],
      order: [["created_at", "DESC"]],
    })

    return result
  },
  CreateStesps: async (data: any) => {
    const result = MachineSteps.create(data)
    return result;
  },
  GetTaskOverview: async (taskId: any) => {
    const result = await MachineSteps.findOne({
      where: { taskId },
      include: [
        {
          model: Machine,
          as: "machine",
          attributes: ["id", "machine_name", "serial_number", "estimate_check", "created_at", "first_services"],
        },
        {
          model: Task,
          as: "task",
          attributes: ["id", "status", "technicianId", "createdAt"],
          include: [
            {
              model: Technician,
              as: "technician",
              attributes: ["id", "name", "email", "employee_id", "contact_no"],
            },
          ],
        },
      ],
    });

    if (!result) return null;

    const plainData = result.get({ plain: true }) as {
      stepsRecord?: string | any[];
      [key: string]: any;
    };
    if (plainData.stepsRecord && typeof plainData.stepsRecord === "string") {
      try {
        plainData.stepsRecord = JSON.parse(plainData.stepsRecord);
      } catch (error) {
        console.error("Error parsing stepsRecord:", error);
        plainData.stepsRecord = [];
      }
    }

    return plainData;
  },
   ChecktheTask: async(technicianId:any,machineId:any) =>{
      const task = await Task.findOne({
        where:{
          technicianId:technicianId,
          machineId:machineId
        }
      })

      return task
   }
}