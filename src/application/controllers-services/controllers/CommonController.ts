import { NextFunction, Request, Response } from "express";
import { CommonServices } from "../services";
import { ResponseData } from "@/utils/helper";
import { StatusCode } from "@/utils/CommonConfig";

export const CommonController = {
    getAlldata: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await CommonServices.commonServices.GetAllData()
            if (!data) {
                ResponseData.ResponseHelpers.SetErrorResponse('Unable to get data', res, StatusCode.BAD_REQUEST)
            }
            ResponseData.ResponseHelpers.SetSuccessResponse(data,res,StatusCode.OK)
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}