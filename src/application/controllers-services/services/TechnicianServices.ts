import { Machine } from "@/models/machine";
import { Task } from "@/models/task";
import { Technician } from "@/models/technician";
import { TechnicianSupervisor } from "@/models/technician_supervisor";
import { differenceInDays } from "date-fns";



export interface MachinePlain {
  id: string;
  machine_name?: string;
  serial_number?: string;
  first_services?: string | Date;
  services_frequency?: string;
  plantId?: string;
  shopId?: string;
  lineId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  // ... any other DB fields you want to expose
  dueDate?: string; // we'll add this
}

export interface TaskPlain {
  id: string;
  technicianId?: string;
  status?: string;
  machineId?: string;
  currentDate?: Date | string;
  createdAt?: Date;
  updatedAt?: Date;
  technician?: {
    id: string;
    name?: string;
    email?: string;
    contact_no?: string;
    employee_id?: string;
  } | null;
  machine?: MachinePlain | null;
}

type TaskWithRelations = Task & {
  machine?: Machine;
  technician?: Technician;
};
export const technicianServices = {

  AddTechnician: async (
    data: any
  ) => {
    try {
      const addData = await Technician.create(data)
      return addData;
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  AddtechnicianMap: async (
    superviseId: string[] = [],
    technicianId: string
  ) => {
    try {
      const superviseList = Array.isArray(superviseId) ? superviseId : [superviseId];
      const entries = [];
      for (const superviseId of superviseList) {
        entries.push({ technicianId, superviseId });
      }
      const created = await TechnicianSupervisor.bulkCreate(entries, {
        ignoreDuplicates: true,
      });
      return created
    } catch (error: any) {
      console.error("Error adding supervisor map:", error);
      return {
        success: false,
        message: "Failed to create supervisor mappings",
        error: error.message,
      };
    }
  },
  getUserLogin: async (email: string) => {
    const getTechnician = await Technician.findOne({
      attributes: ['id', 'name', 'employeeId', 'contactNo', 'password'],
      where: {
        email: email
      }
    })
    return getTechnician
  },
  getTaskBytechnicianId: async (technicianId: any) => {
    // const result = await Task.findAll({
    //   where: { technicianId },
    //   include: [
    //     {
    //       model: Technician,
    //       as: "technician",
    //       attributes: ["id", "name", "email", "contact_no", "employee_id"],
    //     },
    //     {
    //       model: Machine,
    //       as: "machine",
    //       attributes: ["id", "machine_name", "serial_number", "first_services", "services_frequency"],
    //     },
    //   ],
    // });

    // return result.map((task) => task.get({ plain: true }));
//       const result = await Task.findAll({
//     where: { technicianId },
//     include: [
//       {
//         model: Technician,
//         as: "technician",
//         attributes: ["id", "name", "email", "contact_no", "employee_id"],
//       },
//       {
//         model: Machine,
//         as: "machine",
//         attributes: [
//           "id",
//           "machine_name",
//           "serial_number",
//           "first_services",
//           "services_frequency",
//         ],
//       },
//     ],
//   });


//    console.log(JSON.parse(JSON.stringify(result)))
// const today = new Date();

//   const tasksWithDueDate: TaskPlain[] = result.map((task) => {
//     const plainTask = task.get({ plain: true }) as TaskPlain;
//     const machine = plainTask.machine;

//     if (!machine?.first_services) return plainTask;

//     const firstServiceDate = new Date(machine.first_services);
//     const daysDiff = differenceInDays(firstServiceDate, today);

//     let dueDateText = "";
//     if (daysDiff > 0) {
//       dueDateText = `in ${daysDiff} day${daysDiff > 1 ? "s" : ""}`;
//     } else if (daysDiff === 0) {
//       dueDateText = "today";
//     } else {
//       dueDateText = `overdue by ${Math.abs(daysDiff)} day${Math.abs(daysDiff) > 1 ? "s" : ""}`;
//     }

//     return {
//       ...plainTask,
//       machine: {
//         ...machine,
//         dueDate: dueDateText,
//       },
//     };
//   });

//   return {
//     success: true,
//     data: tasksWithDueDate,
//   };


  
//   }


    const result = await Task.findAll({
      where: { technicianId },
      include: [
        {
          model: Technician,
          as: "technician",
          attributes: ["id", "name", "email", "contact_no", "employee_id"],
        },
        {
          model: Machine,
          as: "machine",
          attributes: [
            "id",
            "machine_name",
            "serial_number",
            "first_services",
            "services_frequency",
          ],
        },
      ],
    });

    const today = new Date();

    const tasksWithDueDate: TaskPlain[] = (result as unknown as TaskWithRelations[]).map((task) => {
      const plainTask = task.get({ plain: true }) as TaskPlain;
      const machine = plainTask.machine;

      if (!machine?.first_services) return plainTask;

      const firstServiceDate = new Date(machine.first_services);
      const daysDiff = differenceInDays(firstServiceDate, today);

      let dueDateText = "";
      if (daysDiff > 0) {
        dueDateText = `in ${daysDiff} day${daysDiff > 1 ? "s" : ""}`;
      } else if (daysDiff === 0) {
        dueDateText = "today";
      } else {
        dueDateText = `overdue by ${Math.abs(daysDiff)} day${Math.abs(daysDiff) > 1 ? "s" : ""}`;
      }

      return {
        ...plainTask,
        machine: {
          ...machine,
          dueDate: dueDateText,
        },
      };
    });

    return {
      success: true,
      data: tasksWithDueDate,
    };
  },

}