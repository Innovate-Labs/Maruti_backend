import { Router } from "express";
import { authController } from "@/application/controllers-services/controllers";

const router = Router();

router.get("/user-detaile",authController.Usercontroller.GetAllUser);

export default router;
