import { Router } from "express";
import {  plantController } from "@/application/controllers-services/controllers";
// import { SchemaValidation, validateSchema } from "@/middlewares/ValidationSchema/validateSchema";

const router = Router();

// router.get("/user-detaile",authController.Usercontroller.GetAllUser);

router.post("/plant-create",
// validateSchema(SchemaValidation.BodySchema.PlantCreate),
plantController.PlantController.createPlant)

export default router;