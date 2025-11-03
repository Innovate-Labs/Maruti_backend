import { NextFunction, Request, Response } from "express"
import { TaskServices } from "../services"

export const taskController = {
    createTask: async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const {technicianId,machineId,status,currentDate} = req.body
            const data = await TaskServices.taskServices.AddTask(req.body)
            if(!data)
            {
                
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}