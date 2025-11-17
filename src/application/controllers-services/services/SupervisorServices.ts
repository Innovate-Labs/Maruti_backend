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
  UpdateSupervisor: async(id:string,updateData:Partial<{ name:string; employeeId:string; email:string; plant_id:string; contactNo:string; }>)=>{
    const data = await Supervisor.update(updateData,{
        where:{id}
    })
    console.log(data)
    return data
  },

// UpdateShopLine: async (
//   superviseId: string,
//   updateData: Partial<{ shopId: string[]; lineId: string[] }>
// ) => {
//   const newShopIds = [...new Set(updateData.shopId || [])]; // Remove duplicates
//   const newLineIds = [...new Set(updateData.lineId || [])]; // Remove duplicates

//   // Get existing mappings
//   const existing = await SupervisorShopLine.findAll({
//     where: { superviseId },
//   });

//   const existingShopIds = existing
//     .map((r: any) => r.shop_id)
//     .filter(Boolean);

//   const existingLineIds = existing
//     .map((r: any) => r.line_id)
//     .filter(Boolean);

//   // ---------------------- SHOPS ----------------------

//   // Find shops to remove
//   const shopsToRemove = existingShopIds.filter(
//     (id) => !newShopIds.includes(id)
//   );

//   if (shopsToRemove.length > 0) {
//     await SupervisorShopLine.destroy({
//       where: {
//         superviseId,
//         shopId: shopsToRemove,
//       },
//     });
//   }

//   // Add new shops (only if not already present)
//   for (const shopId of newShopIds) {
//     const exists = await SupervisorShopLine.findOne({
//       where: { superviseId, shopId: shopId },
//     });

//     if (!exists) {
//       await SupervisorShopLine.create({
//         superviseId,
//         shopId: shopId,
//         lineId: ""
//       });
//     }
//   }

//   // ---------------------- LINES ----------------------

//   // Find lines to remove
//   const linesToRemove = existingLineIds.filter(
//     (id) => !newLineIds.includes(id)
//   );

//   if (linesToRemove.length > 0) {
//     await SupervisorShopLine.destroy({
//       where: {
//         superviseId,
//         lineId: linesToRemove,
//       },
//     });
//   }

//   // Add new lines (only if not already present)
//   for (const lineId of newLineIds) {
//     const exists = await SupervisorShopLine.findOne({
//       where: { superviseId, lineId: lineId },
//     });

//     if (!exists) {
//       await SupervisorShopLine.create({
//         superviseId,
//         lineId: lineId,
//       });
//     }
//   }

//   return {
//     success: true,
//     message: "Supervisor shop/line mapping updated successfully",
//     updatedShops: newShopIds,
//     updatedLines: newLineIds,
//   };
// };




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
},

UpdateShopLine: async (lineIds: string[], shopIds: string[], superviseId: string) => {

  // Step 1: Remove all old mappings
  await SupervisorShopLine.destroy({
    where: { superviseId }
  });

  // Step 2: Create new mapping rows
  const entries = [];

  for (let i = 0; i < shopIds.length; i++) {
    entries.push({
      superviseId,
      shopId: shopIds[i],
      lineId: lineIds[i],
    });
  }

  // Insert new pairs
  return SupervisorShopLine.bulkCreate(entries);

}

  
}