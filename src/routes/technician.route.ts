// import { SchemaValidation, validateSchema } from "@/middlewares/ValidationSchema/validateSchema";
import { technicianController } from "@/application/controllers-services/controllers";
import { Router } from "express";

const router = Router();

router.post("/technician-create",
// validateSchema(SchemaValidation.BodySchema.Supervisor),
technicianController.TechnicianData.AddTechnician)

export default router;