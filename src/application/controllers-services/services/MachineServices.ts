import { Machine } from "@/models/machine"


export const MachineServices = {
     createMachine: async(data:any)=>{
        console.log("++++++++++",data)
         const result = await Machine.create(data)
         return result;
     },
     allMachine:async()=>{
         const machineData = await Machine.findAll()
         return machineData
     }
}