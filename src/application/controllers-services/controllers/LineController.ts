import { TryCatch } from "@/middlewares/error";
import { NextFunction, Request, Response } from "express";
import { LineServices, ShopServices } from "../services";
import { ResponseData } from "@/utils/helper";
import { StatusCode } from "@/utils/CommonConfig";

export const LineData = {
  createLineData: TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const { name, lineId, shopId } = req.body;
      const data = await LineServices.LineServicesData.AddLine(req.body);
      if (!data) {
        return ResponseData.ResponseHelpers.SetErrorResponse(
          "Error in data creating",
          res,
          StatusCode.BAD_REQUEST
        );
      }
      return ResponseData.ResponseHelpers.SetSuccessResponse(
        data,
        res,
        StatusCode.OK
      );
    }
  ),
  getLineData: TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = await LineServices.LineServicesData.getLineData();
      if (!data) {
        return ResponseData.ResponseHelpers.SetErrorResponse(
          "Error in data creating",
          res,
          StatusCode.BAD_REQUEST
        );
      }
      return ResponseData.ResponseHelpers.SetSuccessResponse(
        data,
        res,
        StatusCode.OK
      );
    }
  ),
  getLineByshop: TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const shopId = req.params.shopId;
      const data = await LineServices.LineServicesData.getLineByshop(shopId);
      if (!data) {
        return ResponseData.ResponseHelpers.SetErrorResponse(
          "Error in data creating",
          res,
          StatusCode.BAD_REQUEST
        );
      }
      return ResponseData.ResponseHelpers.SetSuccessResponse(
        data,
        res,
        StatusCode.OK
      );
    }
  ),
  EditLine: TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const updateData = req.body;
      const data = await LineServices.LineServicesData.UpdateLine(
        id,
        updateData
      );
      if (!data) {
        return ResponseData.ResponseHelpers.SetErrorResponse(
          "Error in data creating",
          res,
          StatusCode.BAD_REQUEST
        );
      }
      return ResponseData.ResponseHelpers.SetSuccessResponse(
        "Line Updated Successfully",
        res,
        StatusCode.OK
      );
    }
  ),
  DeleteLine: TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const data = await LineServices.LineServicesData.DeleteLine(id);
      if (!data) {
        return ResponseData.ResponseHelpers.SetErrorResponse(
          "Error in data creating",
          res,
          StatusCode.BAD_REQUEST
        );
      }
      return ResponseData.ResponseHelpers.SetSuccessResponse(
        "Line Deleted Successfully",
        res,
        StatusCode.OK
      );
    }
  ),
};
