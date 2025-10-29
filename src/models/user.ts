import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "@/database/db.config";
// Define attributes interface
interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
}

// For creation (since id is auto-generated)
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

// Define model class
export class User extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize model
User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "users",
    sequelize,
    timestamps: true,
  }
);
