import { Line } from "@/models/line";
import { Machine } from "@/models/machine"
import { MachineOccurence } from "@/models/machineOccurence";
import { MachineSteps } from "@/models/machinesSteps";
import { Plant } from "@/models/plant";
import { Shop } from "@/models/shop";
import { Task } from "@/models/task";
import { Technician } from "@/models/technician";
import { format } from "date-fns";
import dayjs, { ManipulateType } from "dayjs";
import { Op } from "sequelize";



export const MachineServices = {
     createMachine: async(data:any)=>{
        console.log("++++++++++",data)
         const result = await Machine.create(data)
         return result;
     },
  generateMachineOccurrences: async (
  machineId: string,
  firstServiceDate: string,
  frequency: string
) => {
  const occurrences = [];
  let current = dayjs(firstServiceDate);

  const endDate = dayjs().add(12, "month"); // generate for 1 year

  let step: { unit: ManipulateType; value: number };

  console.log("Frequencyttttt",frequency)

  switch (frequency.toLowerCase()) {
    case "weekly":
      step = { unit: "day", value: 7 };
      break;

    case "bi-weekly":
    case "biweekly":
      step = { unit: "day", value: 14 };
      break;

    case "monthly":
      step = { unit: "month", value: 1 };
      break;

    case "quarterly":
      step = { unit: "month", value: 3 };
      break;

    default:
      throw new Error("Invalid frequency");
  }

  while (current.isBefore(endDate)) {
    occurrences.push({
      machineId,
      scheduledDate: current.format("YYYY-MM-DD HH:mm:ss"),
      rescheduledDate: null,
      technicianId: null,
      status: "not_assigned",
      frequency: frequency,
    });

    current = current.add(step.value, step.unit);
  }

  // Bulk insert
  await MachineOccurence.bulkCreate(occurrences);

  return occurrences;
},
     allMachine:async()=>{
      const machineData = await Machine.findAll();

    // Convert Sequelize models to plain objects
    const plainMachines = machineData.map((m) => m.get({ plain: true }));

    // Format `firstServices` field
    const formattedMachines = plainMachines.map((machine) => ({
       ...machine,
  firstServices: machine.firstServices
    ? format(new Date(machine.firstServices), "dd/MM/yyyy h:mm a")
    : null,

  nextEventDate: machine.nextEventDate
    ? format(new Date(machine.nextEventDate), "dd/MM/yyyy h:mm a")
    : null,
    }));

    return formattedMachines;
     },
getRecurringEvents: async (startRange: string, endRange: string) => {
  const machines = await Machine.findAll();
  const tasks = await Task.findAll();  // ⭐ Get all overrides
  const plainMachines = machines.map(m => m.get({ plain: true }));
  const plainTasks = tasks.map(t => t.get({ plain: true }));

  const start = dayjs(startRange);
  const end = dayjs(endRange);

  const result: any[] = [];

  plainMachines.forEach((machine) => {
    if (!machine.firstServices) return;

    const freq = machine.servicesFrequency?.toLowerCase();

    let current = dayjs(machine.firstServices);

    // ⭐ Build a map of overrides for this machine
    const overrides:any = {};
    plainTasks
      .filter(t => t.machineId === machine.id)
      .forEach(t => {
        const key = dayjs(t.originalDate).format("YYYY-MM-DD");
        overrides[key] = t.currentDate;
      });

    // Skip until inside range
    while (current.isBefore(start)) {
      if (freq === "weekly") current = current.add(7, "day");
      else if (freq === "bi-weekly" || freq === "biweekly") current = current.add(14, "day");
      else if (freq === "monthly") current = current.add(1, "month");
      else if (freq === "quarterly") current = current.add(3, "month");
      else break;
    }

    // Generate recurrence
    while (current.isBefore(end)) {
      const baseDateKey = current.format("YYYY-MM-DD");

      // ⭐ Check overrides
      const finalDate = overrides[baseDateKey]
        ? dayjs(overrides[baseDateKey])
        : current;

      result.push({
        id: machine.id + "-" + finalDate.valueOf(),
        machineId: machine.id,
        machineName: machine.machineName,
        serialNumber: machine.serialNumber,
        plantId: machine.plantId,
        shopId: machine.shopId,
        lineId: machine.lineId,
        servicesFrequency: machine.servicesFrequency,
        estimate_check: machine.estimate_check,
        eventDate: finalDate.format("YYYY-MM-DDTHH:mm:ss"),
      });

      // move to next frequency date
      if (freq === "weekly") current = current.add(7, "day");
      else if (freq === "bi-weekly" || freq === "biweekly") current = current.add(14, "day");
      else if (freq === "monthly") current = current.add(1, "month");
      else if (freq === "quarterly") current = current.add(3, "month");
      else break;
    }
  });

  return result;
},

     allMachineDetails:async()=>{
         const machineData = await Machine.findAll({
      include: [
        {
          model: Plant,
          as: "plants",
          attributes: ["id", "name"], // Only include needed fields
        },
        {
          model: Shop,
          as: "shops",
          attributes: ["id", "name"],
        },
        {
          model: Line,
          as: "lines",
          attributes: ["id", "lineName"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    // // Convert Sequelize models to plain objects
    // const plainMachines = machineData.map((m) => m.get({ plain: true }));

    // // Format `firstServices` date
    // const formattedMachines = plainMachines.map((machine) => ({
    //   ...machine,
    //   firstServices: machine.firstServices
    //     ? format(new Date(machine.firstServices), "dd/MM/yyyy h:mm a")
    //     : null,
    // }));
        return machineData;
     },
     checkMachine:async(machineName:any,serialNumber:any)=>{
          const checkData = await Machine.findOne({
            where:{
              machineName:machineName,
              serialNumber:serialNumber
            }
          })
          return checkData;
     },
     getSpecificMachineDataBySerialNumber:async(serialNumber:any)=>{
        const machineData = await Machine.findOne({
          where:{
            serialNumber:serialNumber
          },
              include: [
      {
        model: Plant,
        as: "plants", // make sure this alias matches your association
        attributes: ["id", "name"],
      },
      {
        model: Shop,
        as: "shops",
        attributes: ["id", "name"],
      },
      {
        model: Line,
        as: "lines",
        attributes: ["id", "lineName"],
      },
    ],
        })
        return machineData;
     },
     GetMachineHistroyDetails: async(serialNumber:any)=>{
         const result = await Machine.findOne({
            where:{serialNumber},
            include:{
              model:MachineSteps,
              as:"machineSteps",
              include:[
                {
                  model:Task,
                  as:"task",
                  include:[{
                     model:Technician,
                     as:"technician"
                  }
                  
                ]
                },
              
              ]
            }
         })
         return result
     },
getSpecificMachineDetails: async (id: any) => {
  const machineData = await MachineSteps.findOne({
    where: { machineId: id },
  });

  if (!machineData) {
    return null; // No record found
  }

  // ✅ Convert Sequelize model to plain JS object
  const formattedData = machineData.toJSON();

  // ✅ Parse stepsRecord safely
  if (formattedData.stepsRecord) {
    try {
      formattedData.stepsRecord = typeof formattedData.stepsRecord === 'string' 
        ? JSON.parse(formattedData.stepsRecord) 
        : formattedData.stepsRecord;
    } catch (error) {
      console.error("❌ Error parsing stepsRecord:", error);
      formattedData.stepsRecord = [];
    }
  } else {
    formattedData.stepsRecord = [];
  }

  return formattedData;
},

UpdateMachine: async (id: string, data: any) => {
  const result = await Machine.update(data, {
    where: { id },
  });
  return result; // Returns true if any rows were updated
},

DeleteMachine: async (id: string) => {
  const result = await Machine.destroy({
    where: { id },
  });
  return result;
},

getOccurrencesByRange: async (start: string, end: string) => {
    return await MachineOccurence.findAll({
      where: {
        [Op.or]: [
          {
            scheduledDate: {
              [Op.between]: [start, end],
            },
          },
          {
            rescheduledDate: {
              [Op.between]: [start, end],
            },
          },
        ],
      },
      include: [
        {
          model: Machine,
          as: "machine",
          attributes: ["id", "machineName", "serialNumber"],
        },
        {
          model: Technician,
          as: "technician",
          attributes: ["id", "name", "employeeId"],
        },
        {
          model: Task,
          as: "task",
          attributes: ["id", "status", "currentDate"],
        }
      ],
      order: [["scheduledDate", "ASC"]],
    });
  },
      
}