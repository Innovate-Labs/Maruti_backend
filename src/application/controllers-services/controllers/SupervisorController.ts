import { TryCatch } from "@/middlewares/error";
import { NextFunction, Request, Response } from "express";
import { ResponseData } from "@/utils/helper";
import { StatusCode } from "@/utils/CommonConfig";
import { SupervisorServices } from "../services";

export const SupervisorData = {

    AddSupervisor: TryCatch(async (req: Request, res: Response, next: NextFunction) => {
        const { name, employeeId, email, plant_id, contactNo, password, shopId, lineId } = req.body
        const data = await SupervisorServices.supervisorServicesData.AddSupervisor(req.body)
        const result = JSON.parse(JSON.stringify(data))
        if (!data) {
            return ResponseData.ResponseHelpers.SetErrorResponse("Error in data creating", res, StatusCode.BAD_REQUEST)
        }
        const supervisiordata = await SupervisorServices.supervisorServicesData.AddSupervisorMap(shopId, lineId, result.id)
        return ResponseData.ResponseHelpers.SetSuccessResponse(data, res, StatusCode.OK)
    })
}