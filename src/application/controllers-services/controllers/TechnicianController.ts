import { TryCatch } from "@/middlewares/error";
import { StatusCode } from "@/utils/CommonConfig";
import { ResponseData } from "@/utils/helper";
import { NextFunction, Request, Response } from "express";
import { TechnicianServices } from "../services";
import bcrypt from "bcrypt"

export const TechnicianData = {
    AddTechnician: TryCatch(async (req: Request, res: Response, next: NextFunction) => {
        const { name, employeeId, email, contactNo, password, superviseId } = req.body
        const data = await TechnicianServices.technicianServices.AddTechnician(req.body)
        const result = JSON.parse(JSON.stringify(data))
        console.log(result)
        if (!data) {
            return ResponseData.ResponseHelpers.SetErrorResponse("Error in data creating", res, StatusCode.BAD_REQUEST)
        }
        const supervisiordata = await TechnicianServices.technicianServices.AddtechnicianMap(superviseId, result.id)
        return ResponseData.ResponseHelpers.SetSuccessResponse(data, res, StatusCode.CREATED)
    }),
    Logintechnician: TryCatch(async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const checkuser = await TechnicianServices.technicianServices.getUserLogin(email)
        if (!checkuser) {
            return ResponseData.ResponseHelpers.SetErrorResponse("Invalid email", res, StatusCode.BAD_REQUEST)
        }
        const result = JSON.parse(JSON.stringify(checkuser))
        const isMatch = await bcrypt.compare(password, result.password);
        if (!isMatch) {
            return ResponseData.ResponseHelpers.SetErrorResponse('Invalid password', res, StatusCode.BAD_REQUEST)
        }
        return ResponseData.ResponseHelpers.SetSuccessResponse(checkuser, res, StatusCode.OK)
    }),
    Tasktechnician: async (req: Request, res: Response, next: NextFunction) => {
        const technicianId = req.params.technicianId
        const technicianTask = await TechnicianServices.technicianServices.getTaskBytechnicianId(technicianId)
        if (!technicianTask) {
            return ResponseData.ResponseHelpers.SetErrorResponse('Unable to get task', res, StatusCode.BAD_REQUEST)
        }
        return ResponseData.ResponseHelpers.SetSuccessResponse(technicianTask.data, res, StatusCode.OK)
    },
    GetAlltechnician: async (req: Request, res: Response, next: NextFunction) => {
        const technicainData = await TechnicianServices.technicianServices.GetAllTechincianFortask()
        if (!technicainData) {
            return ResponseData.ResponseHelpers.SetErrorResponse('Unable to get task', res, StatusCode.BAD_REQUEST)
        }
        return ResponseData.ResponseHelpers.SetSuccessResponse(technicainData, res, StatusCode.OK)
    },
       GetAlltechnicianSupervisor: async (req: Request, res: Response, next: NextFunction) => {
        const technicainData = await TechnicianServices.technicianServices.GetAllTechnicinaSupervisor()
        if (!technicainData) {
            return ResponseData.ResponseHelpers.SetErrorResponse('Unable to get task', res, StatusCode.BAD_REQUEST)
        }
        return ResponseData.ResponseHelpers.SetSuccessResponse(technicainData, res, StatusCode.OK)
    }
}