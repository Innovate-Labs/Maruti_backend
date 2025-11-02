import { TryCatch } from "@/middlewares/error";
import { StatusCode } from "@/utils/CommonConfig";
import { ResponseData } from "@/utils/helper";
import { NextFunction, Request, Response } from "express";
import { TechnicianServices } from "../services";


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
    })
}