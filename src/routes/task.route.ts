import { taskController } from "@/application/controllers-services/controllers";
import { Router } from "express";


const router = Router()

router.post('/create-task',
 taskController.taskController.createTask
)

router.get('/get-all-task',
taskController.taskController.GetAllTask
)

router.post('/create-steps',
 taskController.taskController.TaskPerform   
)

router.get('/get-task-overview/:taskId',
    taskController.taskController.TaskOverview
)

router.get('/get-task-technician/:technicianId')

export default router