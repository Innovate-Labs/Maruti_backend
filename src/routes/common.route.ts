import { commonController } from "@/application/controllers-services/controllers";
import { Router } from "express";


const router = Router();

router.get('/all-data',
commonController.CommonController.getAlldata
)

export default router;
 
