import { CONTENT_TYPE, ERRORS, StatusCode } from "@/utils/CommonConfig"
import { NextFunction, Request, Response } from "express"
import jwt,{ JwtPayload } from "jsonwebtoken";

declare module 'express-serve-static-core' {
    interface Request {
        content_type?: string;  
    }
}
interface CustomRequest extends Request {
    user?: JwtPayload; // Extend Request type to include user data
}
export const RequestType = {
    RequestMethodsMiddlewares: {
        ApplicationJsonData: async (req: Request, res: Response, next: NextFunction) => {
            const contentType = req.get('Content-Type');
            if (!contentType || contentType.split(';')[0] !== CONTENT_TYPE.JSON) {
                const error = new Error(ERRORS.CONTENT_TYPE_JSON) as any;
                error.status = StatusCode.BAD_REQUEST;
                return next(error);
            }
            req.content_type = contentType;
            return next();
        },
        ApplicationFormData: async (req: Request, res: Response, next: NextFunction) => {
            const contentType = req.get('Content-Type');
            if (!contentType || contentType.split(';')[0] !== CONTENT_TYPE.MULTIPART) {
                const error = new Error(ERRORS.CONTENT_TYPE_MULTIPART) as any;
                error.status = StatusCode.BAD_REQUEST;
                return next(error); 
            }
            req.content_type = contentType;
            return next();
        },
        CheckAuthorizationHeader: async (req:Request, res:Response, next: NextFunction) => {
            let contentType = req.get('Authorization')
            if (!contentType) {
                const error = new Error(ERRORS.HEADER_NOT_FOUND) as any;
                error.status = StatusCode.BAD_REQUEST;
                return next(error);
            }
            req.content_type = contentType
            return next();
        },
         verifyToken : (req: CustomRequest, res: Response, next: NextFunction) => {
            const token = req.headers.authorization?.split(' ')[1];
        
            if (!token) {
                return res.status(401).json({ message: 'Unauthorized - No token provided' });
            }
        
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
                req.user = decoded;  
                next();
            } catch (error) {
                return res.status(403).json({ message: 'Forbidden - Invalid token' });
            }
        }
    },
}