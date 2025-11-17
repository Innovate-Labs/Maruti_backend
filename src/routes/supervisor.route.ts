import { supervisorController } from "@/application/controllers-services/controllers";
import { SchemaValidation, validateSchema } from "@/middlewares/ValidationSchema/validateSchema";
import { Router } from "express";

const router = Router();

router.post("/supervisor-create",
// validateSchema(SchemaValidation.BodySchema.Supervisor),
supervisorController.SupervisorData.AddSupervisor)

router.get("/get-supervisor-details",
supervisorController.SupervisorData.GetSupervisor
)

router.get("/get-supervisor-details-only",
    supervisorController.SupervisorData.GetAllSupervisorDetails
)

router.post("/edit-supervisor/:id",
   supervisorController.SupervisorData.EditSupervisor
)

export default router;