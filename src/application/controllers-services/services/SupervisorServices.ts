import { Line } from "@/models/line";
import { Plant } from "@/models/plant";
import { Shop } from "@/models/shop";
import { Supervisor } from "@/models/supervisor"
import { SupervisorShopLine } from "@/models/supervisor_shop_line";
import { Technician } from "@/models/technician";


export const supervisorServicesData = {
  AddSupervisor: async (data: any) => {
    const addData = await Supervisor.create(data)
    return addData;
  },
  AddSupervisorMap: async (
    shopIds: string[] = [],
    lineIds: string[] = [],
    superviseId: string
  ) => {
    try {
      const shopList = Array.isArray(shopIds) ? shopIds : [shopIds];
      const lineList = Array.isArray(lineIds) ? lineIds : [lineIds];

      const entries = [];
      for (const shopId of shopList) {
        for (const lineId of lineList) {
          entries.push({ shopId, lineId, superviseId });
        }
      }

      const created = await SupervisorShopLine.bulkCreate(entries, {
        ignoreDuplicates: true, 
      });

      return {
        success: true,
        message: "Supervisor mappings created successfully",
        data: created,
      };
    } catch (error: any) {
      console.error("Error adding supervisor map:", error);
      return {
        success: false,
        message: "Failed to create supervisor mappings",
        error: error.message,
      };
    }
  },
  GetAllSupervisorDetails: async()=>{
   try {
    const getAllData = await Supervisor.findAll({
      include: [
        {
          model: Plant,
          as: "plant",
          attributes: ["id", "name"],
        },
        {
          model: SupervisorShopLine,
          as: "superpersives",
          include: [
            {
              model: Shop,
              as: "shop",
              attributes: ["id", "name"],
            },

          ],
        },
        {
          model: Technician,
          as: "technicians",
          attributes: ["id", "name", "email", "contactNo"],
          through: { attributes: [] }, // exclude join table columns
        },
      ],
    });

    return {
      success: true,
      data: getAllData,
    };
  } catch (error) {
    console.error("Error fetching supervisor details:", error);
    return {
      success: false,
      message: "Failed to fetch supervisor details",
      error,
    };
  }
  },
  GetAllSupervisorDetailsOnly: async()=>{
      return await Supervisor.findAll()
  }
  
}