import { NextFunction, Request, Response } from "express";
import { MachineServices } from "../services";
import { ResponseData } from "@/utils/helper";
import { StatusCode } from "@/utils/CommonConfig";

export const MachineController = {
  AddMachine: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        machineName,
        serialNumber,
        services_frequency,
        plant_id,
        shop_id,
        line_id,
        estimate_check,
        first_services,
      } = req.body;
      const sameMachnie = await MachineServices.MachineServices.checkMachine(
        machineName,
        serialNumber
      );
      if (sameMachnie) {
        return ResponseData.ResponseHelpers.SetErrorResponse(
          "Machine Already Exist",
          res,
          StatusCode.BAD_REQUEST
        );
      }
      const data = await MachineServices.MachineServices.createMachine(
        req.body
      );
      if (!data) {
        ResponseData.ResponseHelpers.SetErrorResponse(
          "Unable to create",
          res,
          StatusCode.BAD_REQUEST
        );
      }
      return ResponseData.ResponseHelpers.SetSuccessResponse(
        data,
        res,
        StatusCode.OK
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  GetAllMachine: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await MachineServices.MachineServices.allMachine();
      if (!data) {
        ResponseData.ResponseHelpers.SetErrorResponse(
          "Unable to get data",
          res,
          StatusCode.BAD_REQUEST
        );
      }
      return ResponseData.ResponseHelpers.SetSuccessResponse(
        data,
        res,
        StatusCode.OK
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  GetAllMachineIndetails: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await MachineServices.MachineServices.allMachineDetails();
      if (!data) {
        ResponseData.ResponseHelpers.SetErrorResponse(
          "Unable to get data",
          res,
          StatusCode.BAD_REQUEST
        );
      }
      return ResponseData.ResponseHelpers.SetSuccessResponse(
        data,
        res,
        StatusCode.OK
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  GetSpecificMachine: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const data =
        await MachineServices.MachineServices.getSpecificMachineDataBySerialNumber(
          id
        );
      if (!data) {
        return ResponseData.ResponseHelpers.SetErrorResponse(
          "Unable to get data",
          res,
          StatusCode.BAD_REQUEST
        );
      }
      return ResponseData.ResponseHelpers.SetSuccessResponse(
        data,
        res,
        StatusCode.OK
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  GetMachineStepsDetails: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const data =
        await MachineServices.MachineServices.GetMachineHistroyDetails(id);
      if (!data) {
        return ResponseData.ResponseHelpers.SetErrorResponse(
          "Unable to get data",
          res,
          StatusCode.BAD_REQUEST
        );
      }
      return ResponseData.ResponseHelpers.SetSuccessResponse(
        data,
        res,
        StatusCode.OK
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  GetSpecificMAchineDetails: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const data =
        await MachineServices.MachineServices.getSpecificMachineDetails(id);
      if (!data) {
        return ResponseData.ResponseHelpers.SetErrorResponse(
          "Unable to get data",
          res,
          StatusCode.BAD_REQUEST
        );
      }
      return ResponseData.ResponseHelpers.SetSuccessResponse(
        data,
        res,
        StatusCode.OK
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  EditMachine: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const data = await MachineServices.MachineServices.UpdateMachine(
        id,
        updateData
      );
      if (!data) {
        return ResponseData.ResponseHelpers.SetErrorResponse(
          "Error in updating",
          res,
          StatusCode.BAD_REQUEST
        );
      }
      return ResponseData.ResponseHelpers.SetSuccessResponse(
        "Machine Updated Successfully",
        res,
        StatusCode.OK
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  DeleteMachine: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
        const data = await MachineServices.MachineServices.DeleteMachine(id);
      if (!data) {
        return ResponseData.ResponseHelpers.SetErrorResponse(
          "Error in data deleting",
          res,
          StatusCode.BAD_REQUEST
        );
      }
      return ResponseData.ResponseHelpers.SetSuccessResponse(
        "Machine Deleted Successfully",
        res,
        StatusCode.OK
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
