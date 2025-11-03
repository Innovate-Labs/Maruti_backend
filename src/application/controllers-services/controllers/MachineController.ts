import { NextFunction, Request, Response } from "express";
import { MachineServices } from "../services";
import { ResponseData } from "@/utils/helper";
import { StatusCode } from "@/utils/CommonConfig";

export const MachineController = {

    AddMachine: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { machine_name, serial_number, services_frequency, plant_id, shop_id, line_id, estimate_check, first_services } = req.body
            console.log(req.body)
            const data = await MachineServices.MachineServices.createMachine(req.body)
            if (!data) {
                ResponseData.ResponseHelpers.SetErrorResponse('Unable to create', res, StatusCode.BAD_REQUEST)
            }
            return ResponseData.ResponseHelpers.SetSuccessResponse(data, res, StatusCode.OK)
        } catch (error) {
            console.log(error)
            throw error
        }

    },
    GetAllMachine: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await MachineServices.MachineServices.allMachine()
            if (!data) {
                ResponseData.ResponseHelpers.SetErrorResponse('Unable to get data', res, StatusCode.BAD_REQUEST)
            }
            return ResponseData.ResponseHelpers.SetSuccessResponse(data, res, StatusCode.OK)
        } catch (error) {
            console.log(error)
            throw error
        }
    }

}