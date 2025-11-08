import { Line } from "@/models/line";
import { Machine } from "@/models/machine"
import { Plant } from "@/models/plant";
import { Shop } from "@/models/shop";
import { format } from "date-fns";


export const MachineServices = {
     createMachine: async(data:any)=>{
        console.log("++++++++++",data)
         const result = await Machine.create(data)
         return result;
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
    }));

    return formattedMachines;
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

    // Convert Sequelize models to plain objects
    const plainMachines = machineData.map((m) => m.get({ plain: true }));

    // Format `firstServices` date
    const formattedMachines = plainMachines.map((machine) => ({
      ...machine,
      firstServices: machine.firstServices
        ? format(new Date(machine.firstServices), "dd/MM/yyyy h:mm a")
        : null,
    }));
        return formattedMachines;
     },
     checkMachine:async(machineName:any,serialNumber:any)=>{
          const checkData = await Machine.findOne({
            where:{
              machineName:machineName,
              serialNumber:serialNumber
            }
          })
          return checkData;
     }
}