import { taskController } from "@/application/controllers-services/controllers";
import { Router } from "express";


const router = Router()

router.post('/create-task',
 taskController.taskController.createTask
)

router.get('/get-all-task',
taskController.taskController.GetAllTask
)

export default router