import { create } from "domain";
import { NextFunction, Request, Response } from "express";
import { UserServices } from "../services";
import { ResponseData } from "@/utils/helper";
import { StatusCode } from "@/utils/CommonConfig";
import bcrypt from "bcryptjs";


export const UserController = {
    Login:async(req: Request, res: Response, next: NextFunction)=>{
         const {email,password}= req.body
         console.log('ATTTYGHUUUU',email,password)
         const user = await UserServices.UserServices.getUserLogin(email,password)
        if (!user) {
            return ResponseData.ResponseHelpers.SetErrorResponse("Invalid email", res, StatusCode.BAD_REQUEST)
        }
        return ResponseData.ResponseHelpers.SetSuccessResponse(user, res, StatusCode.OK)
    },

    createUser:async(req: Request, res: Response, next: NextFunction)=>{
        const {name,email,password,role}= req.body
            // ⭐ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Replace plain password with hashed password
    const payload = {
      name,
      email,
      role,
      password: hashedPassword,
    };

        const data =  UserServices.UserServices.AddUser(payload)
        if(!data){
            return ResponseData.ResponseHelpers.SetErrorResponse("Error in data creating",res,StatusCode.BAD_REQUEST)
        }
        return ResponseData.ResponseHelpers.SetSuccessResponse("Admin created",res,StatusCode.CREATED)
    }
}    