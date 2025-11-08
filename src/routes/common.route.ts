import { commonController } from "@/application/controllers-services/controllers";
import { Router } from "express";


const router = Router();

router.get('/all-data',
commonController.CommonController.getAlldata
)

router.get('/all-dashboard-data',
commonController.CommonController.getAllDashboardData
)

export default router;
 
