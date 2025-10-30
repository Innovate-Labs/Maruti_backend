import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "@/database/db.config";


interface SupervisorShopLineAttributes {
  id: string;
  shopId: string;
  lineId: string;
  superviseId: string;
}
interface SupervisorShopLineCreationAttributes
  extends Optional<SupervisorShopLineAttributes, "id"> {}

export class SupervisorShopLine
  extends Model<SupervisorShopLineAttributes, SupervisorShopLineCreationAttributes>
  implements SupervisorShopLineAttributes
{
  public id!: string;
  public shopId!: string;
  public lineId!: string;
  public superviseId!: string;
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
  },
  {
    sequelize,
    tableName: "supervisor_shop_line",
    timestamps: false,
    underscored: true,
  }
);

