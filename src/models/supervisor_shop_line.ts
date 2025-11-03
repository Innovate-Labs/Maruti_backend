import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "@/database/db.config";


interface SupervisorShopLineAttributes {
  id: string;
  shopId: string;
  lineId: string;
  superviseId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
interface SupervisorShopLineCreationAttributes
  extends Optional<SupervisorShopLineAttributes, "id"> { }

export class SupervisorShopLine
  extends Model<SupervisorShopLineAttributes, SupervisorShopLineCreationAttributes>
  implements SupervisorShopLineAttributes {
  public id!: string;
  public shopId!: string;
  public lineId!: string;
  public superviseId!: string;


  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SupervisorShopLine.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    shopId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "shop_id",
      references: {
        model: "shops",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    lineId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "line_id",
      references: {
        model: "lines",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    superviseId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "supervise_id",
      references: {
        model: "supervisors",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "updated_at",
    },
  },
  {
    sequelize,
    tableName: "supervisor_shop_line",
    timestamps: true,
    underscored: true,
  }
);

