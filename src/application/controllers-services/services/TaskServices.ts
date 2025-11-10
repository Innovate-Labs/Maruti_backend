import { Machine } from "@/models/machine"
import { MachineSteps } from "@/models/machinesSteps"
import { Task } from "@/models/task"
import { Technician } from "@/models/technician"
import dayjs from "dayjs"
import { Op } from "sequelize"

// const startOfDay = dayjs().startOf("day").format("YYYY-MM-DD HH:mm:ss");
// const endOfDay = dayjs().endOf("day").format("YYYY-MM-DD HH:mm:ss");

export const taskServices = {
  AddTask: async (data: any) => {
    const result = await Task.create(data)
    return result
  },
  GetTask: async () => {
   const result = await Task.findAll({
  // where: {
  //   currentDate: {
  //     [Op.between]: [startOfDay, endOfDay],
  //   },
  // },
  include: [
    {
      model: Technician,
      as: "technician",
      attributes: ["id", "name", "employee_id", "email"],
    },
    {
      model: Machine,
      as: "machine",
      attributes: ["id", "machine_name", "serial_number", "services_frequency"],
    },
  ],
  order: [["currentDate", "DESC"]],
});

    return result
  },
 CreateStesps: async (data: any) => {
  const result = await MachineSteps.create({
    ...data,
    status: "complete",
  });
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
   ChecktheTask: async(technicianId:any,machineId:any,currentDate:any) =>{
      const task = await Task.findOne({
        where:{
          technicianId:technicianId,
          machineId:machineId,
          currentDate:currentDate
        }
      })

      return task
   },
   AlreadyassignedTask: async(machineId:any)=>{
       const machine = await Task.findOne({
        where:{
           machineId:machineId
        }
       })

       return machine
   },
   UpdateNewTechnicianDetails: async(technicianId:any,machineId:any,currentDate:any)=>{
      try {
    // Step 1: Run update query
    const [affectedRows] = await Task.update(
      { technicianId , currentDate }, // ✅ maps to DB column 'technician_id'
      {
        where: { machineId }, // ✅ maps to 'machine_id'
      }
    );

    // Step 2: Handle no matching record
    if (affectedRows === 0) {
      console.log("⚠️ No task found for the provided machineId.");
      return null;
    }

    // Step 3: Fetch updated record (MySQL does not support `returning`)
    const updatedTask = await Task.findOne({ where: { machineId } });

    if (!updatedTask) {
      console.log("⚠️ Task not found after update.");
      return null;
    }

    return updatedTask;
  } catch (error) {
    console.error("❌ Error in UpdateNewTechnicianDetails:", error);
    throw error;
  }
   },
   updatedTaskStatus: async(taskId:any,status:any)=>{
      const result = await Task.update(
        { status },
        {
          where: { id: taskId },
        }
      );
      return result;
   }
}