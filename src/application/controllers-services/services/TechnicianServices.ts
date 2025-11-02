import { Technician } from "@/models/technician";
import { TechnicianSupervisor } from "@/models/technician_supervisor";


export const technicianServices = {

  AddTechnician: async(
      data:any
  )=>{
    try {
        const addData = await Technician.create(data)
        return addData; 
    } catch (error) {
        console.log(error)
        throw error
    }
  },




    AddtechnicianMap: async (
      superviseId: string[] = [],
      technicianId: string
         ) => {
    try {
        // Ensure arrays are always arrays (in case single values are sent)
        const superviseList = Array.isArray(superviseId) ? superviseId : [superviseId];
        console.log(technicianId)
        // Prepare entries
        const entries = [];
        for (const superviseId of superviseList) {
            entries.push({ technicianId, superviseId });
          
        }
    
        // Bulk insert all at once
        const created = await TechnicianSupervisor.bulkCreate(entries, {
          ignoreDuplicates: true, // ✅ Skips duplicates automatically (MySQL only)
        });
    
        return created
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