import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "@/database/db.config";

 interface TechnicianAttributes {
  id: string;
  name: string;
  employeeId: string;
  email: string;
  contactNo: string;
  password: string;
}


interface TechnicianCreationAttributes extends Optional<TechnicianAttributes, "id"> { }

export class Technician extends Model<TechnicianAttributes, TechnicianCreationAttributes>
    implements TechnicianAttributes {
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

Technician.init(
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
    },
    {
        sequelize,
        tableName: "technicians",
        timestamps: true,
        underscored: true,
    }
);

