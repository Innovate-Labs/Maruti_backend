import { TechnicianSupervisor } from "@/models/technician_supervisor";


export const technicianServices = {

  AddTechnician: async(
      data:any
  )=>{
    try {
        const addData = await TechnicianSupervisor.create(data)
        return addData; 
    } catch (error) {
        console.log(error)
        throw error
    }
  },




    // AddtechnicianMap: async (
    //   superviseId: string[] = [],
    //   technician_id: string
    //      ) => {
    // try {
    //     // Ensure arrays are always arrays (in case single values are sent)
    //     const shopList = Array.isArray(superviseId) ? superviseId : [superviseId];
    //     const lineList = Array.isArray(lineIds) ? lineIds : [lineIds];
    
    //     // Prepare entries
    //     const entries = [];
    //     for (const shopId of shopList) {
    //       for (const lineId of lineList) {
    //         entries.push({ shopId, lineId, superviseId });
    //       }
    //     }
    
    //     // Bulk insert all at once
    //     const created = await SupervisorShopLine.bulkCreate(entries, {
    //       ignoreDuplicates: true, // ✅ Skips duplicates automatically (MySQL only)
    //     });
    
    //     return {
    //       success: true,
    //       message: "Supervisor mappings created successfully",
    //       data: created,
    //     };
    //   } catch (error: any) {
    //     console.error("Error adding supervisor map:", error);
    //     return {
    //       success: false,
    //       message: "Failed to create supervisor mappings",
    //       error: error.message,
    //     };
    //   }
    // }
}