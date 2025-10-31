import { Supervisor } from "@/models/supervisor"
import { SupervisorShopLine } from "@/models/supervisor_shop_line";


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
    // Ensure arrays are always arrays (in case single values are sent)
    const shopList = Array.isArray(shopIds) ? shopIds : [shopIds];
    const lineList = Array.isArray(lineIds) ? lineIds : [lineIds];

    // Prepare entries
    const entries = [];
    for (const shopId of shopList) {
      for (const lineId of lineList) {
        entries.push({ shopId, lineId, superviseId });
      }
    }

    // Bulk insert all at once
    const created = await SupervisorShopLine.bulkCreate(entries, {
      ignoreDuplicates: true, // ✅ Skips duplicates automatically (MySQL only)
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
}
}