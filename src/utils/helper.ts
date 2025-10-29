import { Response } from "express"

export const ResponseData = {
    ResponseHelpers: {
        SetSuccessResponse: function (data:any, res:Response, statusCode:number) {
            let response = {
                success: true,
                data: data,
                error: null,
                status: statusCode
            }
            this.SetResponse(statusCode, response, res)
        },
        SetSuccessErrorResponse: function (data:any, res:Response, statusCode:number) {
            let response = {
                success: false,
                data: [],
                error: data,
                status: statusCode
            }
            this.SetResponse(statusCode, response, res)
        },
        SetErrorResponse(errors:any, res:Response, statusCode:number) {
            const response = {
                success: false,
                data: [],
                error: errors,
                statusCode:statusCode
            }
            this.SetResponse(500, response, res)
        },
        SetNotFoundResponse(errors:any, res:Response) {
            const response = {
                success: false,
                data: [],
                error: errors
            }
            this.SetResponse(404, response, res)
        },
        SetBadRequestResponse(errors:any, res:Response) {
            const response = {
                success: false,
                data: [],
                error: errors
            }
            this.SetResponse(401, response, res)
        },
        SetForbiddenResponse(errors:any, res:Response) {
            const response = {
                success: false,
                data: [],
                error: errors
            }
            this.SetResponse(403, response, res)
        },
        SetResponse: function (status:any, response:any, res:Response) {
            // console.info('======================================================================')
            // console.info(response)
            // console.info('======================================================================')
            res.status(status).json(response)
            res.end()
        }
    },
}