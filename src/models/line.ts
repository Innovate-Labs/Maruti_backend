import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "@/database/db.config";


interface LineAttributes {
  id: string;
  lineName: string;
  plantId: string;
  shopId: string;
}

interface LineCreationAttributes extends Optional<LineAttributes, "id"> {}

export class Line extends Model<LineAttributes, LineCreationAttributes>
  implements LineAttributes {
  public id!: string;
  public lineName!: string;
  public plantId!: string;
  public shopId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Line.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    lineName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    plantId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "plants", // table name
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    shopId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "shops", // table name
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "lines",
    timestamps: true,
  }
);
