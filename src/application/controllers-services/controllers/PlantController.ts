import { TryCatch } from "@/middlewares/error";
import { NextFunction, Request, Response } from "express";
import { PlantServices } from "../services";
import { ResponseData } from "@/utils/helper";
import { StatusCode } from "@/utils/CommonConfig";



export const PlantController = {

    createPlant: TryCatch(async(req:Request,res:Response,next:NextFunction)=>{
         const {name, description} = req.body
         const data = await PlantServices.PlantServicesData.AddPlantUser(req.body)
         if(!data)
         {
             return ResponseData.ResponseHelpers.SetErrorResponse("Error in data creating",res,StatusCode.BAD_REQUEST)
         }
         return ResponseData.ResponseHelpers.SetSuccessResponse(data,res,StatusCode.OK)
    })
}