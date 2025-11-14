import { Router } from "express";
import { shopController } from "@/application/controllers-services/controllers";
// import { SchemaValidation, validateSchema } from "@/middlewares/ValidationSchema/validateSchema";

const router = Router();

// router.get("/user-detaile",authController.Usercontroller.GetAllUser);

router.post("/shop-create",
// validateSchema(SchemaValidation.BodySchema.PlantCreate),
shopController.ShopData.createShopData)

router.get("/get-all-shops-details",
shopController.ShopData.getAllShopsDetails
)

router.get("/get-shop-plant/:plantId",
shopController.ShopData.getShopsByPlantId
)

router.get("/get-all-shops",
    shopController.ShopData.getAllShops
)
router.post("/edit-shop/:id",
   shopController.ShopData.ShopEdit 
)
router.delete("/delete-shop/:id",
   shopController.ShopData.ShopDelete
)

export default router;