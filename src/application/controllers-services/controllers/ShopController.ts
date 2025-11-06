import { TryCatch } from "@/middlewares/error";
import { NextFunction, Request, Response } from "express";
import { ShopServices } from "../services";
import { ResponseData } from "@/utils/helper";
import { StatusCode } from "@/utils/CommonConfig";



export const ShopData = {

    createShopData: TryCatch(async (req: Request, res: Response, next: NextFunction) => {
        const { name, plantId } = req.body
        const data = await ShopServices.shopServicesData.AddShop(req.body)
        if (!data) {
            return ResponseData.ResponseHelpers.SetErrorResponse("Error in data creating", res, StatusCode.BAD_REQUEST)
        }
        return ResponseData.ResponseHelpers.SetSuccessResponse(data, res, StatusCode.OK)
    }),
    getAllShopsDetails: TryCatch(async (req: Request, res: Response, next: NextFunction) => {
        const getdetails = await ShopServices.shopServicesData.getAllShopsDetails()
        if (!getdetails) {
            return ResponseData.ResponseHelpers.SetErrorResponse("Error in data creating", res, StatusCode.BAD_REQUEST)
        }
        return ResponseData.ResponseHelpers.SetSuccessResponse(getdetails, res, StatusCode.OK)
    }),
    getShopsByPlantId: TryCatch(async (req: Request, res: Response, next: NextFunction) => {
        const plantId = req.params.plantId
        const shop = await ShopServices.shopServicesData.getShopByplantId(plantId)
        if (!shop) {
            return ResponseData.ResponseHelpers.SetErrorResponse("Error in data creating", res, StatusCode.BAD_REQUEST)
        }
        return ResponseData.ResponseHelpers.SetSuccessResponse(shop, res, StatusCode.OK)
    }),
    getAllShops: TryCatch(async (req: Request, res: Response, next: NextFunction) => {
        const allshops = await ShopServices.shopServicesData.getallShops()
        if (!allshops) {
            return ResponseData.ResponseHelpers.SetErrorResponse("Error in data creating", res, StatusCode.BAD_REQUEST)
        }
        return ResponseData.ResponseHelpers.SetSuccessResponse(allshops, res, StatusCode.OK)

    })
}