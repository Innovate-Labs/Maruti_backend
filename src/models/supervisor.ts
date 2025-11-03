import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "@/database/db.config";
import { Plant } from "./plant";
import bcrypt from "bcrypt";

 interface SupervisorAttributes {
  id: string;
  name: string;
  employeeId: string;
  email: string;
  contactNo: string;
  password: string;
  plantId?: string;
}


interface SupervisorCreationAttributes extends Optional<SupervisorAttributes, "id"> { }

export class Supervisor extends Model<SupervisorAttributes, SupervisorCreationAttributes>
    implements SupervisorAttributes {
    public id!: string;
    public name!: string;
    public employeeId!: string;
    public email!: string;
    public contactNo!: string;
    public password!: string;
    public plantId?: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Supervisor.init(
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
        employeeId: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        contactNo: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        plantId: {
            type: DataTypes.UUID,
            allowNull: true,
            field: "plant_id",
            references: {
                model: "plants",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
    },
    {
        sequelize,
        tableName: "supervisors",
        timestamps: true,
        underscored: true,
        hooks: {
              // ✅ Encrypt password before saving a new technician
              beforeCreate: async (supervisor: Supervisor) => {
                if (supervisor.password) {
                  const salt = await bcrypt.genSalt(10);
                  supervisor.password = await bcrypt.hash(supervisor.password, salt);
                }
              },
              // ✅ Encrypt password before updating (if password changed)
              beforeUpdate: async (supervisor: Supervisor) => {
                if (supervisor.changed("password")) {
                  const salt = await bcrypt.genSalt(10);
                  supervisor.password = await bcrypt.hash(supervisor.password, salt);
                }
              },
            },
    }
);

