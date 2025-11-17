// import { SchemaValidation, validateSchema } from "@/middlewares/ValidationSchema/validateSchema";
import { technicianController } from "@/application/controllers-services/controllers";
import { Router } from "express";

const router = Router();

router.post("/technician-create",
    // validateSchema(SchemaValidation.BodySchema.Supervisor),
    technicianController.TechnicianData.AddTechnician)

router.post("/login-technician",
    technicianController.TechnicianData.Logintechnician)

router.get("/get-all-task-technicain/:technicianId",
    technicianController.TechnicianData.Tasktechnician
)

router.get("/get-all-technician",
    technicianController.TechnicianData.GetAlltechnician
)

router.get("/get-all-technician-supervisor",
    technicianController.TechnicianData.GetAlltechnicianSupervisor
)
router.get("/get-task-history-technician/:technicianId",
    technicianController.TechnicianData.TaskHistoryByTechnician
)

router.post("/edit-technician/:id",
    technicianController.TechnicianData.EditTechnician
)

router.delete("/delete-technician/:id",
    technicianController.TechnicianData.DeleteTechnician
)


export default router;