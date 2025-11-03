import { NextFunction, Request, Response } from "express"
import { TaskServices } from "../services"
import { ResponseData } from "@/utils/helper"
import { StatusCode } from "@/utils/CommonConfig"

export const taskController = {
    createTask: async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const {technicianId,machineId,status,currentDate} = req.body
            const data = await TaskServices.taskServices.AddTask(req.body)
            if(!data)
            {
                ResponseData.ResponseHelpers.SetErrorResponse('unable to create data',res,StatusCode.BAD_REQUEST)
            }
            ResponseData.ResponseHelpers.SetSuccessResponse(data,res,StatusCode.OK)
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    GetAllTask: async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const data = await TaskServices.taskServices.GetTask()
            if(!data)
            {
                ResponseData.ResponseHelpers.SetErrorResponse('unable to create data',res,StatusCode.BAD_REQUEST)
            }
            ResponseData.ResponseHelpers.SetSuccessResponse(data,res,StatusCode.OK)
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}