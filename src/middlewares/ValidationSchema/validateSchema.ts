import { StatusCode } from "@/utils/CommonConfig";
import { ResponseData } from "@/utils/helper";
import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from "joi";

export const SchemaValidation = {
  BodySchema: {
    login: Joi.object({
      name: Joi.string().min(5).required().messages({
        "string.empty": "Name is required",
        "string.min": "Must be 5 or more characters long",
      }),
      email: Joi.string().email().required().messages({
        "string.email": "Invalid email",
        "string.empty": "Email is required",
      }),
    }),

    Register: Joi.object({
      name: Joi.string().min(1).required().messages({
        "string.empty": "Name is required",
      }),
      email: Joi.string().email().required().messages({
        "string.email": "Invalid email",
        "string.empty": "Email is required",
      }),
    }),

    PlantCreate: Joi.object({
      name: Joi.string().min(2).required().messages({
        "string.min": "Name must be at least 2 characters long",
        "string.empty": "Name is required",
      }),
      description: Joi.string().min(5).required().messages({
        "string.min": "Description must be at least 5 characters long",
        "string.empty": "Description is required",
      }),
    }),

    Supervisor: Joi.object({
      name: Joi.string().min(2).required().messages({
        "string.min": "Name must be at least 2 characters long",
        "string.empty": "Name is required",
      }),
  employeeId: Joi.string().required().messages({
    "string.empty": "Employee Id is required",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Invalid email",
    "string.empty": "Email is required",
  }),

  contactNo: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
    "string.empty": "Contact number is required",
    "string.pattern.base": "Contact number must be 10 digits long",
  }),

  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),

  plantId: Joi.string().uuid().required().messages({
    "string.guid": "Invalid plant ID format",
    "string.empty": "Plant ID is required",
  }),
shopId: Joi.alternatives()
    .try(
      Joi.string().uuid(),
      Joi.array().items(Joi.string().uuid()).min(1)
    )
    .required()
    .messages({
      "alternatives.match": "shopId must be a valid UUID or an array of UUIDs",
      "string.guid": "Invalid shop ID format",
      "array.min": "At least one shop ID is required",
    }),

  lineId: Joi.alternatives()
    .try(
      Joi.string().uuid(),
      Joi.array().items(Joi.string().uuid()).min(1)
    )
    .required()
    .messages({
      "alternatives.match": "lineId must be a valid UUID or an array of UUIDs",
      "string.guid": "Invalid line ID format",
      "array.min": "At least one line ID is required",
    }),
   

    })


  },
};

export const validateSchema = (schema: Joi.ObjectSchema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      errors: { wrap: { label: "" } }, // removes extra quotes
    });

    if (error) {
      const errors: Record<string, string> = {};
      error.details.forEach((err) => {
        let field = err.path.join(".");
        field = field.replace(/^[./]+/, ""); // removes slashes or dots
        const cleanMessage = err.message.replace(/['"]/g, ""); // removes quotes
        errors[field || "body"] = cleanMessage;
      });

      ResponseData.ResponseHelpers.SetErrorResponse(
        { message: "Validation failed", errors },
        res,
        StatusCode.BAD_REQUEST
      );
      return;
    }

    next();
  };
};

