import { supervisorController } from "@/application/controllers-services/controllers";
import { SchemaValidation, validateSchema } from "@/middlewares/ValidationSchema/validateSchema";
import { Router } from "express";

const router = Router();

router.post("/supervisor-create",
validateSchema(SchemaValidation.BodySchema.Supervisor),
supervisorController.SupervisorData.AddSupervisor)

export default router;