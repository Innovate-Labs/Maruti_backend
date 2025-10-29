import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "@/database/db.config";

// Define attributes
interface PlantAttributes {
  id: string;
  name: string;
  description: string

}

// For creation (id auto-generated)
interface PlantCreationAttributes extends Optional<PlantAttributes, "id"> {}

// Model class
export class Plant extends Model<PlantAttributes, PlantCreationAttributes>
  implements PlantAttributes {
  public id!: string;
  public name!: string;
  public description!: string


  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize model
Plant.init(
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
    description:{
       type: DataTypes.STRING(300),
       allowNull: true 
    }

  },
  {
    sequelize,
    tableName: "plants",
    timestamps: true,
  }
);
