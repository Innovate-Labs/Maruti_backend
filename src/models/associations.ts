import { Line } from "./line";
import { Plant } from "./plant";
import { Shop } from "./shop";

// A Plant has many Shops
Plant.hasMany(Shop, {
  foreignKey: "plantId",
  as: "shops", // you can access plant.shops
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// A Shop belongs to one Plant
Shop.belongsTo(Plant, {
  foreignKey: "plantId",
  as: "plant", // you can access shop.plant
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

// 🌱 Plant → Line (1-to-many)
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
