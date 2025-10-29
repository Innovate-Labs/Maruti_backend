import { Router } from "express";
import {   lineController } from "@/application/controllers-services/controllers";
// import { SchemaValidation, validateSchema } from "@/middlewares/ValidationSchema/validateSchema";

const router = Router();

// router.get("/user-detaile",authController.Usercontroller.GetAllUser);

router.post("/line-create",
// validateSchema(SchemaValidation.BodySchema.PlantCreate),
lineController.LineData.createLineData)

export default router;