import { StatusCode } from '@/utils/CommonConfig';
import { ResponseData } from '@/utils/helper';
import { NextFunction } from 'express';
import { z } from 'zod'

export const SchemaValidation = {
   
    BodySchema:{
        login:z.object({
              name:z.string().min(5,{message:'Must be 5 or more characters long'}),
              email:z.string().email({message:'Invalid email'})
        }),

        Register:z.object({
            name: z.string().min(1, { message: 'Name is required' }),
            email: z.string().email({ message: 'Invalid email' }).min(1, { message: 'Email is required' })
        })
        
        
    }
}

export const validateSchema = (schema: z.Schema<any>):any => 
    (req: Request, res: any, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return ResponseData.ResponseHelpers.SetErrorResponse(result.error.format(),res,StatusCode.BAD_REQUEST)
        }
        next();
    };
