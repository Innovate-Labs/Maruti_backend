import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "@/database/db.config";
// Define attributes interface

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  SUPER_ADMIN = "SUPER_ADMIN",
}


interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role:UserRole
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
  public role!: UserRole;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize model
User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // generated manually using uuid package
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
    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      allowNull: false,
      defaultValue: UserRole.USER
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
