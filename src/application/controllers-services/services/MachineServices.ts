import { Machine } from "@/models/machine"
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
     }
}