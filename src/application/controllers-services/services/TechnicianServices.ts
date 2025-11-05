import { Machine } from "@/models/machine";
import { Task } from "@/models/task";
import { Technician } from "@/models/technician";
import { TechnicianSupervisor } from "@/models/technician_supervisor";


export const technicianServices = {

  AddTechnician: async (
    data: any
  ) => {
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
      const superviseList = Array.isArray(superviseId) ? superviseId : [superviseId];
      const entries = [];
      for (const superviseId of superviseList) {
        entries.push({ technicianId, superviseId });
      }
      const created = await TechnicianSupervisor.bulkCreate(entries, {
        ignoreDuplicates: true,
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
  },
  getUserLogin: async (email: string) => {
    const getTechnician = await Technician.findOne({
      attributes: ['id', 'name', 'employeeId', 'contactNo', 'password'],
      where: {
        email: email
      }
    })
    return getTechnician
  },
  getTaskBytechnicianId: async (technicianId: any) => {
    const result = await Task.findAll({
      where: { technicianId },
      include: [
        {
          model: Technician,
          as: "technician",
          attributes: ["id", "name", "email", "contact_no", "employee_id"],
        },
        {
          model: Machine,
          as: "machine",
          attributes: ["id", "machine_name", "serial_number", "first_services", "services_frequency"],
        },
      ],
    });

    return result.map((task) => task.get({ plain: true }));
  }

}