import { NextFunction, Request, Response } from "express"
import { TaskServices } from "../services"
import { ResponseData } from "@/utils/helper"
import { StatusCode } from "@/utils/CommonConfig"

export const taskController = {
    createTask: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { technicianId, machineId, status, currentDate } = req.body
            const checkCurrenttechnician = await TaskServices.taskServices.ChecktheTask(technicianId,machineId)
             if (checkCurrenttechnician) {
             return   ResponseData.ResponseHelpers.SetErrorResponse('Task is already assigned to machine', res, StatusCode.BAD_REQUEST)
            }
            const data = await TaskServices.taskServices.AddTask(req.body)
            if (!data) {
              return  ResponseData.ResponseHelpers.SetErrorResponse('unable to create data', res, StatusCode.BAD_REQUEST)
            }
           return ResponseData.ResponseHelpers.SetSuccessResponse(data, res, StatusCode.OK)
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    GetAllTask: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await TaskServices.taskServices.GetTask()
            if (!data) {
              return  ResponseData.ResponseHelpers.SetErrorResponse('unable to create data', res, StatusCode.BAD_REQUEST)
            }
         return   ResponseData.ResponseHelpers.SetSuccessResponse(data, res, StatusCode.OK)
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    TaskPerform: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { machine_id, steps_record, task_id } = req.body
            const createtask = await TaskServices.taskServices.CreateStesps(req.body)
            if (!createtask) {
               return ResponseData.ResponseHelpers.SetErrorResponse('unable to create task', res, StatusCode.BAD_REQUEST)
            }
            return ResponseData.ResponseHelpers.SetSuccessResponse(createtask, res, StatusCode.OK)
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    TaskOverview: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const taskId = req.params.taskId
            const getTask = await TaskServices.taskServices.GetTaskOverview(taskId)
            if (!getTask) {
              return ResponseData.ResponseHelpers.SetErrorResponse('unable to create task', res, StatusCode.BAD_REQUEST)
            }
            return ResponseData.ResponseHelpers.SetSuccessResponse(getTask,res,StatusCode.OK)
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    
 
}