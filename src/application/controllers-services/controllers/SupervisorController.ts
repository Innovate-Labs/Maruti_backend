import { TryCatch } from "@/middlewares/error";
import { NextFunction, Request, Response } from "express";
import { ResponseData } from "@/utils/helper";
import { StatusCode } from "@/utils/CommonConfig";
import { SupervisorServices } from "../services";
import { get } from "http";

export const SupervisorData = {
  AddSupervisor: TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const {
        name,
        employeeId,
        email,
        plant_id,
        contactNo,
        password,
        shopId,
        lineId,
      } = req.body;
      const data =
        await SupervisorServices.supervisorServicesData.AddSupervisor(req.body);
      const result = JSON.parse(JSON.stringify(data));
      if (!data) {
        return ResponseData.ResponseHelpers.SetErrorResponse(
          "Error in data creating",
          res,
          StatusCode.BAD_REQUEST
        );
      }
      console.log(lineId,shopId)
      const getAllLinedata = await SupervisorServices.supervisorServicesData.GetAllLineByShopIds(shopId)
       console.log('++++++++',JSON.parse(JSON.stringify(getAllLinedata)))
       const lineIds = getAllLinedata?.map((line:any)=>line.id)
       console.log('LLLLLLL',lineIds)
       const shopIds = getAllLinedata?.map((line:any)=>line.shopId)
       console.log('SSSSSSSSSS',shopIds)
    //   const supervisiordata =
    //     await SupervisorServices.supervisorServicesData.AddSupervisorMap(
    //       shopId,
    //       lineId,
    //       result.id)
    await SupervisorServices.supervisorServicesData.AddShopLine(
      lineIds,
      shopIds,
      result.id
    );

      return ResponseData.ResponseHelpers.SetSuccessResponse(
        data,
        res,
        StatusCode.OK
      );
    }
  ),
  GetSupervisor: TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const data =
        await SupervisorServices.supervisorServicesData.GetAllSupervisorDetails();
      if (!data) {
        return ResponseData.ResponseHelpers.SetErrorResponse(
          "Error in data creating",
          res,
          StatusCode.BAD_REQUEST
        );
      }
    //   const supervisors = JSON.parse(JSON.stringify(data.data));

  // ⭐ GROUPING LOGIC FOR EACH SUPERVISOR ⭐
//   const finalResponse = supervisors.map((sup: any) => {
//     const grouped:any = {};

//     sup.superpersives.forEach((item: any) => {
//       const shopId = item.shopId;

//       if (!grouped[shopId]) {
//         grouped[shopId] = {
//           shopId: item.shopId,
//           shopName: item.shop?.name,
//           lines: []
//         };
//       }

//       grouped[shopId].lines.push({
//         lineId: item.lineId
//       });
//     });

//     return {
//       ...sup,
//       superpersives: Object.values(grouped)
//     };
//   });

//   return ResponseData.ResponseHelpers.SetSuccessResponse(
//     { success: true, data: finalResponse },
//     res,
//     StatusCode.OK
//   );
      return ResponseData.ResponseHelpers.SetSuccessResponse(
        data,
        res,
        StatusCode.OK
      );
    }
  ),
  GetAllSupervisorDetails: TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const data =
        await SupervisorServices.supervisorServicesData.GetAllSupervisorDetailsOnly();
      if (!data) {
        return ResponseData.ResponseHelpers.SetErrorResponse(
          "Error in fetching data",
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
  EditSupervisor: TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const updateData = req.body;
      const data = await SupervisorServices.supervisorServicesData.UpdateSupervisor(
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
        "Supervisor Updated Successfully",
        res,
        StatusCode.OK
      );
    }
  ),
};
