import { Router } from "express";
import { shopController } from "@/application/controllers-services/controllers";
// import { SchemaValidation, validateSchema } from "@/middlewares/ValidationSchema/validateSchema";

const router = Router();

// router.get("/user-detaile",authController.Usercontroller.GetAllUser);

router.post("/shop-create",
// validateSchema(SchemaValidation.BodySchema.PlantCreate),
shopController.ShopData.createShopData)

export default router;