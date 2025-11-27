import { Line } from "./line";
import { Machine } from "./machine";
import { MachineOccurence } from "./machineOccurence";
import { MachineSteps } from "./machinesSteps";
import { Plant } from "./plant";
import { Shop } from "./shop";
import { Supervisor } from "./supervisor";
import { SupervisorShopLine } from "./supervisor_shop_line";
import { Task } from "./task";
import { Technician } from "./technician";
import { TechnicianSupervisor } from "./technician_supervisor";


// -------------------- PLANT ↔ SHOP --------------------
Plant.hasMany(Shop, {
  foreignKey: "plantId",
  as: "shops",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Shop.belongsTo(Plant, {
  foreignKey: "plantId",
  as: "plant",
});


// -------------------- SHOP ↔ LINE --------------------
Shop.hasMany(Line, {
  foreignKey: "shopId",
  as: "lines",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Line.belongsTo(Shop, {
  foreignKey: "shopId",
  as: "shop",
});


// -------------------- PLANT ↔ LINE --------------------
Plant.hasMany(Line, {
  foreignKey: "plantId",
  as: "lines",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Line.belongsTo(Plant, {
  foreignKey: "plantId",
  as: "plant",
});


// -------------------- SUPERVISOR ↔ PLANT --------------------
Plant.hasMany(Supervisor, {
  foreignKey: "plantId",
  as: "supervisors",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Supervisor.belongsTo(Plant, {
  foreignKey: "plantId",
  as: "plant",
});


// -------------------- SUPERVISOR ↔ SHOP (Many-to-Many) --------------------
// IMPORTANT: MUST match real DB columns: superviseId + shop_id

Supervisor.belongsToMany(Shop, {
  through: SupervisorShopLine,
  foreignKey: "superviseId",
  otherKey: "shop_id",    // FIXED
  as: "shops",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  hooks: true,
});

Shop.belongsToMany(Supervisor, {
  through: SupervisorShopLine,
  foreignKey: "shop_id",  // FIXED
  otherKey: "superviseId",
  as: "supervisors",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  hooks: true,
});


// -------------------- SUPERVISOR ↔ LINE (Many-to-Many) --------------------
Supervisor.belongsToMany(Line, {
  through: SupervisorShopLine,
  foreignKey: "superviseId",
  otherKey: "line_id",     // FIXED
  as: "lines",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  hooks: true,
});

Line.belongsToMany(Supervisor, {
  through: SupervisorShopLine,
  foreignKey: "line_id",   // FIXED
  otherKey: "superviseId",
  as: "supervisors",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  hooks: true,
});


// -------------------- SUPERVISOR_SHOP_LINE (Direct Relations) --------------------
// SupervisorShopLine.belongsTo(Supervisor, {
//   foreignKey: "superviseId",
//   as: "supervisor",
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",
// });

Supervisor.hasMany(SupervisorShopLine, {
  foreignKey: "superviseId",
  as: "superpersives",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

SupervisorShopLine.belongsTo(Supervisor, {
  foreignKey: "superviseId",
  as: "superpersives",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});


SupervisorShopLine.belongsTo(Shop, {
  foreignKey: "shop_id",
  as: "shop",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

SupervisorShopLine.belongsTo(Line, {
  foreignKey: "line_id",
  as: "line",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});


// -------------------- SUPERVISOR ↔ TECHNICIAN (Many-to-Many) --------------------
Supervisor.belongsToMany(Technician, {
  through: TechnicianSupervisor,
  foreignKey: "superviseId",
  otherKey: "technicianId",
  as: "technicians",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  hooks: true,
});

Technician.belongsToMany(Supervisor, {
  through: TechnicianSupervisor,
  foreignKey: "technicianId",
  otherKey: "superviseId",
  as: "supervisors",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  hooks: true,
});


// -------------------- TECHNICIAN ↔ TASK --------------------
Technician.hasMany(Task, {
  foreignKey: "technicianId",
  as: "tasks",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Task.belongsTo(Technician, {
  foreignKey: "technicianId",
  as: "technician",
});


// -------------------- MACHINE RELATIONSHIPS --------------------
Plant.hasMany(Machine, {
  foreignKey: "plantId",
  as: "machines",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Machine.belongsTo(Plant, {
  foreignKey: "plantId",
  as: "plants",
});

Shop.hasMany(Machine, {
  foreignKey: "shopId",
  as: "machines",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Machine.belongsTo(Shop, {
  foreignKey: "shopId",
  as: "shops",
});

Line.hasMany(Machine, {
  foreignKey: "lineId",
  as: "machines",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Machine.belongsTo(Line, {
  foreignKey: "lineId",
  as: "lines",
});


// -------------------- MACHINE ↔ MACHINE_STEPS --------------------
Machine.hasMany(MachineSteps, {
  foreignKey: "machineId",
  as: "machineSteps",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
MachineSteps.belongsTo(Machine, {
  foreignKey: "machineId",
  as: "machine",
});


// -------------------- TASK ↔ MACHINE --------------------
Machine.hasMany(Task, {
  foreignKey: "machineId",
  as: "tasks",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Task.belongsTo(Machine, {
  foreignKey: "machineId",
  as: "machine",
});


// -------------------- TASK ↔ STEPS --------------------
Task.hasMany(MachineSteps, {
  foreignKey: "taskId",
  as: "steps",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
MachineSteps.belongsTo(Task, {
  foreignKey: "taskId",
  as: "task",
});

Technician.hasMany(TechnicianSupervisor, {
  foreignKey: "technicianId",
  as: "techniciansupervisors",
});

TechnicianSupervisor.belongsTo(Technician, {
  foreignKey: "technicianId",
  as: "technician",
});

Supervisor.hasMany(TechnicianSupervisor, {
  foreignKey: "superviseId",
  as: "techniciansupervisors",
});

TechnicianSupervisor.belongsTo(Supervisor, {
  foreignKey: "superviseId",
  as: "supervisor",
});

Machine.hasMany(MachineOccurence, {
  foreignKey: "machineId",
  as: "occurrences",
});

MachineOccurence.belongsTo(Machine, {
  foreignKey: "machineId",
  as: "machine",
});

Technician.hasMany(MachineOccurence, {
  foreignKey: "technicianId",
  as: "occurrences",
});

MachineOccurence.belongsTo(Technician, {
  foreignKey: "technicianId",
  as: "technician",
});

Task.hasOne(MachineOccurence, {
  foreignKey: "taskId",
  as: "occurrence",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

MachineOccurence.belongsTo(Task, {
  foreignKey: "taskId",
  as: "task",
});

// -------------------- MACHINE_OCCURENCE ↔ MACHINE_STEPS --------------------
MachineOccurence.hasMany(MachineSteps, {
  foreignKey: "occuranceMachineId",
  as: "steps",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

MachineSteps.belongsTo(MachineOccurence, {
  foreignKey: "occuranceMachineId",
  as: "occurrence",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

