import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "@/database/db.config";


interface TasksAttributes {
    id: string;
    technicianId?: string;
    status?: string;
    machineId?: string;
    currentDate?: any;
    originalDate?: Date;
}


interface MachineStepsCreationAttributes extends Optional<TasksAttributes, "id"> { }

export class Task extends Model<TasksAttributes, MachineStepsCreationAttributes>
    implements TasksAttributes {
    public id!: string;
    public technicianId?: string;
    public status?: string;
    public machineId?: string;
    public currentDate?: any;
    public originalDate?: Date;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Task.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        technicianId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: "technician_id",
            references: {
                model: "technicians",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true
        },
        machineId: {
            type: DataTypes.UUID,
            allowNull: true,
            field: "machine_id",
            references: {
                model: "machines",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        currentDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
    },
    {
        sequelize,
        tableName: "tasks",
        timestamps: true,
        underscored: true,
    }
);

