import { Line } from "@/models/line";
import { Plant } from "@/models/plant";
import { Shop } from "@/models/shop";
import { Supervisor } from "@/models/supervisor"
import { SupervisorShopLine } from "@/models/supervisor_shop_line";
import { Technician } from "@/models/technician";
import { Op } from "sequelize";


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
  GetAllLineByShopIds: async (shopIds: string[]) => {
    return Line.findAll({
      where: {
        shopId: {
          [Op.in]: shopIds,
        },
      },
      attributes: ["id", "lineName", "shopId"],
          raw: true    // ⭐ REQUIRED FIX

    });
  },
  // AddSupervisorMap: async (
  //   shopIds: string[] = [],
  //   lineIds: string[] = [],
  //   superviseId: string
  // ) => {
  //   try {
  //     const shopList = Array.isArray(shopIds) ? shopIds : [shopIds];
  //     const lineList = Array.isArray(lineIds) ? lineIds : [lineIds];

  //     // 🔥 Fetch lines for all selected shops
  //     const allShopLines = await Line.findAll({
  //       where: { shopId: { [Op.in]: shopList } },
  //       attributes: ["id", "shopId"]
  //     });

  //     // 🔥 Group lines by shopId for fast lookup
  //     const linesByShop: Record<string, string[]> = {};

  //     allShopLines.forEach((line) => {
  //       if (!linesByShop[line.shopId]) {
  //         linesByShop[line.shopId] = [];
  //       }
  //       linesByShop[line.shopId].push(line.id);
  //     });

  //     const validEntries: any[] = [];

  //     // 🔥 Insert only valid pairs
  //     for (const shopId of shopList) {
  //       const validLineIds = linesByShop[shopId] || [];

  //       for (const lineId of lineList) {
  //         if (validLineIds.includes(lineId)) {
  //           validEntries.push({
  //             shopId,
  //             lineId,
  //             superviseId,
  //           });
  //         }
  //       }
  //     }

  //     const created = await SupervisorShopLine.bulkCreate(validEntries, {
  //       ignoreDuplicates: true
  //     });

  //     return {
  //       success: true,
  //       message: "Supervisor mappings created successfully",
  //       data: created
  //     };

  //   } catch (error: any) {
  //     console.error("Error adding supervisor map:", error);
  //     return {
  //       success: false,
  //       message: "Failed to create supervisor mappings",
  //       error: error.message
  //     };
  //   }
  // },
  GetSupervisorById: async (id: string) => {
  return Supervisor.findOne({
    where: { id },

    include: [
      {
        model: Plant,
        as: "plant",
        attributes: ["id", "name"],
      },
      {
        model: SupervisorShopLine,
        as: "superpersives",
        attributes: ["id", "shopId", "lineId", "superviseId", "createdAt", "updatedAt"],

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
      },
    ],
  });
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
  },
  UpdateSupervisor: async(id:string,updateData:Partial<{ name:string; employeeId:string; email:string; plant_id:string; contactNo:string; password:string }>)=>{
    const data = await Supervisor.update(updateData,{
        where:{id}
    })
    console.log(data)
    return data
  },

GetLinesForShops: async (shopIds: string[]) => {
  return Line.findAll({
    where: {
      shopId: {
        [Op.in]: shopIds,   // 👈 shopIds is an array
      },
    },
    attributes: ["id", "lineName", "shopId"],
  });
},

AddShopLine:async(lineIds: string[], shopIds: string[], superviseId: string)=>{
  const entries = [];

  for (let i = 0; i < lineIds.length; i++) {
    entries.push({
      lineId: lineIds[i],
      shopId: shopIds[i],
      superviseId,
    });
  }

  return SupervisorShopLine.bulkCreate(entries, {
    ignoreDuplicates: true,
  });
}
  
}