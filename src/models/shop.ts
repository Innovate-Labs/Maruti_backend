import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "@/database/db.config";

// Define attributes
interface ShopAttributes {
  id: string;
  name: string;
  plantId?: string; // 👈 foreign key

}

// For creation (id auto-generated)
interface ShopCreationAttributes extends Optional<ShopAttributes, "id"> {}

// Model class
export class Shop extends Model<ShopAttributes, ShopCreationAttributes>
  implements ShopAttributes {
  public id!: string;
  public name!: string;
public plantId?: string; 



  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize model
Shop.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    plantId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "plants",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },

  },
  {
    sequelize,
    tableName: "shops",
    timestamps: true,
  }
);
