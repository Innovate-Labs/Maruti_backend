import { Response } from "express";

export const ResponseData = {
  ResponseHelpers: {
    /**
     * ✅ Send success response
     */
    SetSuccessResponse(data: any, res: Response, statusCode: number = 200): Response {
      const response = {
        success: true,
        data,
        error: null,
        statusCode,
      };
      return this.SetResponse(statusCode, response, res);
    },

    /**
     * ✅ Send failure response (custom message)
     */
    SetSuccessErrorResponse(error: any, res: Response, statusCode: number = 400): Response {
      const response = {
        success: false,
        data: [],
        error,
        statusCode,
      };
      return this.SetResponse(statusCode, response, res);
    },

    /**
     * ✅ Send server or validation error
     */
    SetErrorResponse(errors: any, res: Response, statusCode: number = 500): Response {
      const response = {
        success: false,
        data: [],
        error: errors,
        statusCode,
      };
      return this.SetResponse(statusCode, response, res);
    },

    /**
     * ✅ Not found
     */
    SetNotFoundResponse(error: any, res: Response): Response {
      const response = {
        success: false,
        data: [],
        error,
        statusCode: 404,
      };
      return this.SetResponse(404, response, res);
    },

    /**
     * ✅ Bad request
     */
    SetBadRequestResponse(error: any, res: Response): Response {
      const response = {
        success: false,
        data: [],
        error,
        statusCode: 400,
      };
      return this.SetResponse(400, response, res);
    },

    /**
     * ✅ Forbidden
     */
    SetForbiddenResponse(error: any, res: Response): Response {
      const response = {
        success: false,
        data: [],
        error,
        statusCode: 403,
      };
      return this.SetResponse(403, response, res);
    },

    /**
     * ✅ Base response sender
     */
    SetResponse(status: number, response: any, res: Response): Response {
      return res.status(status).json(response);
    },
  },
};
