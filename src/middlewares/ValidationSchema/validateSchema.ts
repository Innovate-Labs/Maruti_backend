import { StatusCode } from '@/utils/CommonConfig';
import { ResponseData } from '@/utils/helper';
import { NextFunction, RequestHandler } from 'express';
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
        }),

      PlantCreate: z.object({
      name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters long" }),
      description: z
        .string()
        .min(5, { message: "Description must be at least 5 characters long" }),
    }),
        
        
    }
}

// export const validateSchema = (schema: z.Schema<any>): RequestHandler => {
// //   return (req: Request, res: Response, next: NextFunction): void => {
// //     const result = schema.safeParse(req.body);

// //     if (!result.success) {
// //       const errors: Record<string, string> = {};
// //       result.error.errors.forEach((err) => {
// //         const field = err.path.join(".");
// //         if (!errors[field]) {
// //           errors[field] = err.message;
// //         }
// //       });

// //       ResponseData.ResponseHelpers.SetErrorResponse(
// //         { message: "Validation failed", errors },
// //         res,
// //         StatusCode.BAD_REQUEST
// //       );
// //       return; // 👈 ensure function ends
// //     }

// //     next();
// //   };
// };

