import { NextFunction, Request, Response } from "express"
import { TaskServices } from "../services"
import { ResponseData } from "@/utils/helper"
import { StatusCode } from "@/utils/CommonConfig"
import { Task } from "@/models/task"
import dayjs from "dayjs"
import { Op, Sequelize } from "sequelize"
import { MachineOccurence } from "@/models/machineOccurence"

export const taskController = {
    // createTask: async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const { technicianId, machineId, status, currentDate } = req.body
            
    //         const checkCurrenttechnician = await TaskServices.taskServices.ChecktheTask(technicianId,machineId,currentDate)
    //         const ardata = JSON.parse(JSON.stringify(checkCurrenttechnician))
    //         console.log(JSON.parse(JSON.stringify(checkCurrenttechnician)))
    //         // console.log(ardata.machineId)
    //          if (checkCurrenttechnician) {
    //          return   ResponseData.ResponseHelpers.SetErrorResponse('Technician is already assigned to this machine.', res, StatusCode.BAD_REQUEST)
    //         }
    //         const checkmachinealreadyassigned = await TaskServices.taskServices.AlreadyassignedTask(machineId,currentDate)
    //         if(checkmachinealreadyassigned)
    //         {
    //             const updatewithnewTechnician = await TaskServices.taskServices.UpdateNewTechnicianDetails(technicianId,machineId,currentDate)
    //             if(!updatewithnewTechnician){
    //           return  ResponseData.ResponseHelpers.SetErrorResponse('Error in updating technician task', res, StatusCode.BAD_REQUEST)
    //             }
    //             return ResponseData.ResponseHelpers.SetSuccessResponse("Technician Updated Successfully",res,StatusCode.OK)
    //         }
    //         const data = await TaskServices.taskServices.AddTask(req.body)
    //         if (!data) {
    //           return  ResponseData.ResponseHelpers.SetErrorResponse('unable to create data', res, StatusCode.BAD_REQUEST)
    //         }
    //        return ResponseData.ResponseHelpers.SetSuccessResponse(data, res, StatusCode.OK)
    //     } catch (error) {
    //         console.log(error)
    //         throw error
    //     }
    // },
//     createTask: async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { technicianId, machineId, status, currentDate } = req.body;

//     // Check if technician is already assigned on same machine & date
//     const checkTechAssigned = await TaskServices.taskServices.ChecktheTask(
//       technicianId, machineId, currentDate
//     );

//     if (checkTechAssigned) {
//       return ResponseData.ResponseHelpers.SetErrorResponse(
//         "Technician is already assigned to this machine.",
//         res,
//         StatusCode.BAD_REQUEST
//       );
//     }

//     // If machine already has a task for this date → update technician
//     const existingTask = await TaskServices.taskServices
//       .AlreadyassignedTask(machineId, currentDate);

//     if (existingTask) {
//       const updatedTask = await TaskServices.taskServices
//         .UpdateNewTechnicianDetails(technicianId, machineId, currentDate);

//       // ⭐ UPDATE nextEventDate ALSO
//       await TaskServices.taskServices.UpdateNextEventDate(machineId, currentDate);

//       return ResponseData.ResponseHelpers.SetSuccessResponse(
//         "Technician Updated Successfully",
//         res,
//         StatusCode.OK
//       );
//     }

//     // Create new task
//     const data = await TaskServices.taskServices.AddTask(req.body);

//     // ⭐ UPDATE nextEventDate after creating task
//   const updatedTask =  await TaskServices.taskServices.UpdateNextEventDate(machineId, currentDate);
//   console.log('PPPPPPPPP',updatedTask)

//     return ResponseData.ResponseHelpers.SetSuccessResponse(data, res, StatusCode.OK);
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// },

// createTask: async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     let { technicianId, machineId, status, currentDate, originalDate } = req.body;

//     // ⭐ FIX: Ensure dates stay in LOCAL timezone (important!)
//     currentDate = dayjs(currentDate).format("YYYY-MM-DD HH:mm:ss");
//     originalDate = dayjs(originalDate).format("YYYY-MM-DD HH:mm:ss");
//     console.log('ASEERTTTTT',currentDate,originalDate)

//     // 🔍 CASE 1: SAME technician already assigned to SAME machine (any date)
//     const existingTechTask = await Task.findOne({
//       where: { technicianId, machineId }
//     });

//     const existingData = JSON.parse(JSON.stringify(existingTechTask));

//     if (existingTechTask) {
//       await Task.update(
//         {
//              originalDate: Sequelize.literal(`'${originalDate}'`) as unknown as any,
//   currentDate: Sequelize.literal(`'${currentDate}'`) as unknown as any,
//         },
//         { where: { id: existingData.id } }
//       );

//       return ResponseData.ResponseHelpers.SetSuccessResponse(
//         "Task Rescheduled Successfully",
//         res,
//         StatusCode.OK
//       );
//     }

//     // 🔍 CASE 2: A task already exists for this MACHINE + original recurring date
//     const existingOriginalTask = await Task.findOne({
//       where: { machineId, originalDate }
//     });
//     const exisitngTaskData = JSON.parse(JSON.stringify(existingOriginalTask));
//     if (existingOriginalTask) {
//       await Task.update(
//         {
//           technicianId,
//                originalDate: Sequelize.literal(`'${originalDate}'`) as unknown as any,
//   currentDate: Sequelize.literal(`'${currentDate}'`) as unknown as any,
//         },
//         { where: { id: exisitngTaskData.id } }
//       );

//       return ResponseData.ResponseHelpers.SetSuccessResponse(
//         "Technician Updated for This Task",
//         res,
//         StatusCode.OK
//       );
//     }

//     // 🆕 CASE 3: No task exists → CREATE NEW OVERRIDE
//     const newTask = await Task.create({
//       technicianId,
//       machineId,
//       status,
//       originalDate: Sequelize.literal(`'${originalDate}'`) as unknown as any,
//   currentDate: Sequelize.literal(`'${currentDate}'`) as unknown as any,
//     });

//     return ResponseData.ResponseHelpers.SetSuccessResponse(
//       newTask,
//       res,
//       StatusCode.OK
//     );

//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// },
createTask: async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { technicianId, machineId, status, currentDate, originalDate, occurrenceId } = req.body;

    const formattedDateTime = dayjs(currentDate).format("YYYY-MM-DD HH:mm:ss");

    // -------------------------------
    // 1. STRICT CHECK — EXACT DATE + TIME
    // -------------------------------
    const existingTaskForOccurrence = await Task.findOne({
      where: {
        machineId,
        technicianId,
        currentDate: formattedDateTime       // DB column name
      }
    });

    if (existingTaskForOccurrence) {
      return ResponseData.ResponseHelpers.SetSuccessResponse(
        "Task Already scheduled Successfully",
        res,
        StatusCode.OK
      );
    }

    // -------------------------------
    // 2. Same DATE but different TIME
    // -------------------------------
    const existingTaskForOccurrenceDate = await Task.findOne({
      where: {
        machineId,
        technicianId,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn("DATE", Sequelize.col("current_date")),
            dayjs(formattedDateTime).format("YYYY-MM-DD")
          ),
          Sequelize.where(
            Sequelize.fn("TIME", Sequelize.col("current_date")),
            "!=",
            dayjs(formattedDateTime).format("HH:mm:ss")
          ),
        ],
      },
    });

    if (existingTaskForOccurrenceDate) {
      return ResponseData.ResponseHelpers.SetSuccessResponse(
        "Task time change scheduled Successfully",
        res,
        StatusCode.OK
      );
    }

    // -------------------------------
    // 3. CREATE NEW ENTRY (correct way)
    // -------------------------------
    const newTask = await Task.create({
      technicianId,
      machineId,
      status,
      currentDate: formattedDateTime        // FIXED
    });

    await MachineOccurence.update(
      {
        taskId: newTask.id,
        rescheduledDate: formattedDateTime,   // FIXED
        technicianId,
        status: "assigned",
      },
      { where: { id: occurrenceId } }
    );

    return ResponseData.ResponseHelpers.SetSuccessResponse(
      newTask,
      res,
      StatusCode.OK
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
}


// createTask: async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { technicianId, machineId, status, currentDate, occurrenceId } = req.body;

//     if (!occurrenceId) {
//       return ResponseData.ResponseHelpers.SetErrorResponse(
//         "Occurrence ID is required",
//         res,
//         StatusCode.BAD_REQUEST
//       );
//     }

//     // 1️⃣ Fetch the occurrence
//     const occ = await MachineOccurence.findOne({ where: { id: occurrenceId } });

//     if (!occ) {
//       return ResponseData.ResponseHelpers.SetErrorResponse(
//         "Invalid occurrence ID",
//         res,
//         StatusCode.BAD_REQUEST
//       );
//     }

//     // Values we need
//     const finalOriginalDate = occ.rescheduledDate || occ.scheduledDate;
//     const existingTaskId = occ.taskId;

//     // ====================================================
//     // CASE A: Occurrence ALREADY has a task
//     // ====================================================
//     if (existingTaskId) {
//       const existingTask = await Task.findOne({ where: { id: existingTaskId } });

//       // Same technician + Same EXACT date-time
//       if (
//         existingTask?.technicianId === technicianId &&
//         dayjs(existingTask?.currentDate).format("YYYY-MM-DD HH:mm") ===
//           dayjs(currentDate).format("YYYY-MM-DD HH:mm")
//       ) {
//         return ResponseData.ResponseHelpers.SetErrorResponse(
//           "Task already assigned for this time slot",
//           res,
//           StatusCode.BAD_REQUEST
//         );
//       }

//       // Same technician + same DATE but different time → RESCHEDULE
//       if (
//         existingTask?.technicianId === technicianId &&
//         dayjs(existingTask?.currentDate).format("YYYY-MM-DD") ===
//           dayjs(currentDate).format("YYYY-MM-DD")
//       ) {
//         // Update task time
//         await Task.update(
//           {
//             currentDate,
//           },
//           { where: { id: existingTaskId } }
//         );

//         // Update occurrence reschedule date
//         await MachineOccurence.update(
//           {
//             rescheduledDate: currentDate,
//             technicianId,
//             status: "assigned",
//           },
//           { where: { id: occurrenceId } }
//         );

//         return ResponseData.ResponseHelpers.SetSuccessResponse(
//           "Task rescheduled successfully",
//           res,
//           StatusCode.OK
//         );
//       }

//       // Same occurrence but different technician → reassign
//       await Task.update(
//         {
//           technicianId,
//           currentDate,
//         },
//         { where: { id: existingTaskId } }
//       );

//       await MachineOccurence.update(
//         {
//           technicianId,
//           rescheduledDate: currentDate,
//           status: "assigned",
//         },
//         { where: { id: occurrenceId } }
//       );

//       return ResponseData.ResponseHelpers.SetSuccessResponse(
//         "Technician reassigned successfully",
//         res,
//         StatusCode.OK
//       );
//     }

//     // ====================================================
//     // CASE B: No task exists → CREATE NEW TASK
//     // ====================================================
//     const newTask = await Task.create({
//       technicianId,
//       machineId,
//       status: "Pending",
//       currentDate,
//     });

//     await MachineOccurence.update(
//       {
//         taskId: newTask.id,
//         technicianId,
//         rescheduledDate: currentDate,
//         status: "assigned",
//       },
//       { where: { id: occurrenceId } }
//     );

//     return ResponseData.ResponseHelpers.SetSuccessResponse(
//       newTask,
//       res,
//       StatusCode.OK
//     );
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// },




,




    GetAllTask: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await TaskServices.taskServices.GetTask()
            if (!data) {
              return  ResponseData.ResponseHelpers.SetErrorResponse('unable to create data', res, StatusCode.BAD_REQUEST)
            }
         return   ResponseData.ResponseHelpers.SetSuccessResponse(data, res, StatusCode.OK)
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    TaskPerform: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { machine_id, steps_record, taskId } = req.body
            const createtask = await TaskServices.taskServices.CreateStesps(req.body)
            if (!createtask) {
               return ResponseData.ResponseHelpers.SetErrorResponse('unable to create task', res, StatusCode.BAD_REQUEST)
            }
            await TaskServices.taskServices.updatedTaskStatus(taskId,"completed")
            return ResponseData.ResponseHelpers.SetSuccessResponse(createtask, res, StatusCode.OK)
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    TaskOverview: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const taskId = req.params.taskId
            const getTask = await TaskServices.taskServices.GetTaskOverview(taskId)
            if (!getTask) {
              return ResponseData.ResponseHelpers.SetErrorResponse('unable to create task', res, StatusCode.BAD_REQUEST)
            }
            return ResponseData.ResponseHelpers.SetSuccessResponse(getTask,res,StatusCode.OK)
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    
 
}