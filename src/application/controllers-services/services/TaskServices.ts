import { Machine } from "@/models/machine"
import { Task } from "@/models/task"
import { Technician } from "@/models/technician"


export const taskServices = {
    AddTask: async(data:any) => {
        const result = await Task.create(data)
        return result
    },
    GetTask: async() =>{
        const result = await Task.findAll({
             include: [
      {
        model: Technician,
        as: "technician",
        attributes: ["id", "name","employee_id","email"], // select columns you need
      },
      {
        model: Machine,
        as: "machine",
        attributes: ["id", "machine_name","serial_number","services_frequency"], // select columns you need
      },
    ],
    order: [["created_at", "DESC"]],
        })

        return result
    }
}