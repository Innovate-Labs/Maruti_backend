import { Line } from "./line";
import { Plant } from "./plant";
import { Shop } from "./shop";
import { Supervisor } from "./supervisor";
import { SupervisorShopLine } from "./supervisor_shop_line";
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
  foreignKey: "superviseId",   // maps to supervisor ID
  otherKey: "technicianId",    // maps to technician ID
  as: "technicians",           // supervisor.technicians[]
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
