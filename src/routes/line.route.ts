import { Router } from "express";
import {   lineController } from "@/application/controllers-services/controllers";
// import { SchemaValidation, validateSchema } from "@/middlewares/ValidationSchema/validateSchema";

const router = Router();

// router.get("/user-detaile",authController.Usercontroller.GetAllUser);

router.post("/line-create",
// validateSchema(SchemaValidation.BodySchema.PlantCreate),
lineController.LineData.createLineData)

router.get("/get-all-line",
lineController.LineData.getLineData
)
router.get("/get-line-shop/:shopId",
lineController.LineData.getLineByshop)

router.post("/edit-line/:id",
   lineController.LineData.EditLine
)

router.delete("/delete-line/:id",
   lineController.LineData.DeleteLine
)

export default router;