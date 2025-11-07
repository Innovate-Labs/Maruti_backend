// import { SchemaValidation, validateSchema } from "@/middlewares/ValidationSchema/validateSchema";import { Router } from "express";

import { machineController } from "@/application/controllers-services/controllers";
import { Router } from "express";

const router = Router();

router.post("/machine-create",
machineController.MachineController.AddMachine)

router.get("/get-all-machine",
machineController.MachineController.GetAllMachine
)

router.get("/get-all-machine-details",
machineController.MachineController.GetAllMachineIndetails
)

export default router;