import { db } from "@/app";
import { TryCatch } from "@/middlewares/error";
import { StatusCode } from "@/utils/CommonConfig";
import { ResponseData } from "@/utils/helper";
import { generateToken } from "@/utils/tokenConfig";
import { NextFunction, Request, Response } from "express";

export const UserCreation = {
    NewUser : TryCatch(async (req:Request,res:Response,next:NextFunction) => {
        const {email , name, role} = req.body;
        const createUser = await db.user.create({
          data:{
              email:email,
              name:name,
              role:role
          }
        })
        if(!createUser)
        {
          return ResponseData.ResponseHelpers.SetErrorResponse("Unable to create data",res,StatusCode.BAD_REQUEST)
        }
        const token = generateToken(req.body)
        const data = {
            ...createUser,
            token
        }
        return ResponseData.ResponseHelpers.SetSuccessResponse(data,res,StatusCode.OK)
  
  }),
}