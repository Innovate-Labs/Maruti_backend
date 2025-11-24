

import { userController } from "@/application/controllers-services/controllers";
import { Router } from "express";

const router = Router();

router.post("/user-create",
userController.UserController.createUser)

router.post("/user-login",
userController.UserController.Login)



export default router;