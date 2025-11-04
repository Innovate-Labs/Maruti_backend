import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "@/database/db.config";


interface MachineStepsAttributes {
    id: string;
    machineId?: string;
    stepsRecord?: any[];
    stepsId?: string;
    taskId?: string;
}


interface MachineStepsCreationAttributes extends Optional<MachineStepsAttributes, "id"> { }

export class MachineSteps extends Model<MachineStepsAttributes, MachineStepsCreationAttributes>
    implements MachineStepsAttributes {
    public id!: string;
    public machineId?: string;
    public taskId?: string;
    public stepsRecord?: any[];
    public stepsId?: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

MachineSteps.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
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
        taskId: {
            type: DataTypes.UUID,
            allowNull: true,
            field: "task_id", // 👈 new column
            references: {
                model: "tasks",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        stepsRecord: {
            type: DataTypes.JSON,
            allowNull: false
        }

    },
    {
        sequelize,
        tableName: "machinesSteps",
        timestamps: true,
        underscored: true,
    }
);

