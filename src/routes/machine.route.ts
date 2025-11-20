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

router.get("/get-specific-machine/:id",
machineController.MachineController.GetSpecificMachine
)

router.get("/get-machine-history/:id",
    machineController.MachineController.GetMachineStepsDetails)

router.get("/get-machine-overview-steps/:id",
    machineController.MachineController.GetSpecificMAchineDetails
)

router.post("/edit-machine/:id",
   machineController.MachineController.EditMachine
)

router.delete("/delete-machine/:id",
   machineController.MachineController.DeleteMachine
)

router.get("/machine-calendar-view",
    machineController.MachineController.GetMachineOccurrences
)

export default router;