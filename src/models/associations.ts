import { Line } from "./line";
import { Machine } from "./machine";
import { MachineSteps } from "./machinesSteps";
import { Plant } from "./plant";
import { Shop } from "./shop";
import { Supervisor } from "./supervisor";
import { SupervisorShopLine } from "./supervisor_shop_line";
import { Task } from "./task";
import { Technician } from "./technician";
import { TechnicianSupervisor } from "./technician_supervisor";

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


// Supervisor ↔ Plant (One-to-Many)
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

// Supervisor ↔ Shop ↔ Line (Many-to-Many through supervisor_shop_line)
Supervisor.belongsToMany(Shop, {
  through: SupervisorShopLine,
  foreignKey: "superviseId",
  otherKey: "shopId",
  as: "shops",
});

Shop.belongsToMany(Supervisor, {
  through: SupervisorShopLine,
  foreignKey: "shopId",
  otherKey: "superviseId",
  as: "supervisors",
});

Supervisor.belongsToMany(Line, {
  through: SupervisorShopLine,
  foreignKey: "superviseId",
  otherKey: "lineId",
  as: "lines",
});

Line.belongsToMany(Supervisor, {
  through: SupervisorShopLine,
  foreignKey: "lineId",
  otherKey: "superviseId",
  as: "supervisors",
});

Supervisor.belongsToMany(Technician, {
  through: TechnicianSupervisor,
  foreignKey: "superviseId",
  otherKey: "technicianId",
  as: "technicians",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Technician.belongsToMany(Supervisor, {
  through: TechnicianSupervisor,
  foreignKey: "technicianId",  // maps to technician ID
  otherKey: "superviseId",     // maps to supervisor ID
  as: "supervisors",           // technician.supervisors[]
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// -------------------- Machine Relationships --------------------

// Plant ↔ Machine (One-to-Many)
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

// Shop ↔ Machine (One-to-Many)
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

// Line ↔ Machine (One-to-Many)
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


// One Machine has many MachineSteps
Machine.hasMany(MachineSteps, {
  foreignKey: "machineId",
  as: "machineSteps", // alias for readability (machine.steps)
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// Each MachineSteps belongs to one Machine
MachineSteps.belongsTo(Machine, {
  foreignKey: "machineId",
  as: "machine",
});

// One Machine has many Tasks
Machine.hasMany(Task, {
  foreignKey: "machineId",
  as: "tasks", // use plural "tasks" for better semantics
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// Each Task belongs to one Machine
Task.belongsTo(Machine, {
  foreignKey: "machineId",
  as: "machine",
});


// -------------------- MachineSteps ↔ Task Relationships --------------------

// One MachineStep has many Tasks
// MachineSteps.hasMany(Task, {
//   foreignKey: "stepsId",
//   as: "tasks",
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",
// });

// // Each Task belongs to one MachineStep
// Task.belongsTo(MachineSteps, {
//   foreignKey: "stepsId",
//   as: "step",
// });


// -------------------- Technician ↔ Task Relationships --------------------

// One Technician has many Tasks
Technician.hasMany(Task, {
  foreignKey: "technicianId",
  as: "tasks",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// Each Task belongs to one Technician
Task.belongsTo(Technician, {
  foreignKey: "technicianId",
  as: "technician",
});

Task.hasMany(MachineSteps, {
  foreignKey: "taskId",
  as: "steps", // use plural for clarity (task.steps)
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// Each MachineStep belongs to one Task
MachineSteps.belongsTo(Task, {
  foreignKey: "taskId",
  as: "task",
});

Supervisor.hasMany(SupervisorShopLine, {
  foreignKey: "superviseId",
  as: "superpersives", // must match your query alias
});

SupervisorShopLine.belongsTo(Supervisor, {
  foreignKey: "superviseId",
  as: "supervisor",
});

SupervisorShopLine.belongsTo(Shop, {
  foreignKey: "shop_id",
  as: "shop",
});

SupervisorShopLine.belongsTo(Line, {
  foreignKey: "line_id",
  as: "line",
});

Technician.hasMany(TechnicianSupervisor, {
  foreignKey: "technicianId",     // ✅ must match your field name in TechnicianSupervisor.init()
  as: "techniciansupervisors",    // ✅ this alias must match your include "as"
});

TechnicianSupervisor.belongsTo(Technician, {
  foreignKey: "technicianId",
  as: "technician",
});

TechnicianSupervisor.belongsTo(Supervisor, {
  foreignKey: "superviseId",
  as: "supervisor", // 👈 must match include alias
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Supervisor.hasMany(TechnicianSupervisor, {
  foreignKey: "superviseId",
  as: "techniciansupervisors",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
