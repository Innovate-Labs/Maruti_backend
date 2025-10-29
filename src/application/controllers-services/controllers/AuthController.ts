import { TryCatch } from "@/middlewares/error";
import { StatusCode } from "@/utils/CommonConfig";
import { ResponseData } from "@/utils/helper";
import { NextFunction, Request, Response } from "express";
import { authservices } from "../services";



export const Usercontroller = {
   GetAllUser : TryCatch(async (req:Request,res:Response,next:NextFunction) => {
     const getalluser:any = await authservices.UserServices.GetAllUserDetails()
      if(!getalluser)
      {
        return ResponseData.ResponseHelpers.SetErrorResponse("Unable to get data",res,StatusCode.BAD_REQUEST)
      }
      return ResponseData.ResponseHelpers.SetSuccessResponse("user inserted sucessfully",res,StatusCode.OK)
  
  })
}
