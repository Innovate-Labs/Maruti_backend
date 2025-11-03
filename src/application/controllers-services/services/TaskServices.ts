import { Task } from "@/models/task"


export const taskServices = {
    AddTask: async(data:any) => {
        const result = await Task.create(data)
        return result
    }
}