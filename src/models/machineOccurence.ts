import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "@/database/db.config";


interface MachineOccurenceAttributes {
   id: string;
  frequency: string | null;
  scheduledDate: string | null;
  rescheduledDate: string | null;
  technicianId?: string | null;
  status?: string | null;
  machineId?: string | null;
  taskId?: string | null;
}


interface MachineOccurenceCreationAttributes extends Optional<MachineOccurenceAttributes, "id"> { }

export class MachineOccurence extends Model<MachineOccurenceAttributes, MachineOccurenceCreationAttributes>
    implements MachineOccurenceAttributes {
    public id!: string;
    public frequency!: any;
    public scheduledDate!: string;
    public rescheduledDate!: string;
    public technicianId?: string;
    public status?: string;
    public machineId?: string;
    public taskId?: string;


    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

MachineOccurence.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        frequency: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        scheduledDate: {
            type: DataTypes.STRING(15),
            allowNull: true,
        },
        rescheduledDate: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        technicianId: {
            type: DataTypes.UUID,
            allowNull: true,
            field: "technician_id",
            references: {
                model: "technicians",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        machineId: {
            type: DataTypes.UUID,
            allowNull: false,
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
         
        status: {
            type: DataTypes.STRING,
            allowNull: true
        }


    },
    {
        sequelize,
        tableName: "Machineoccurence",
        timestamps: true,
        underscored: true,
    }
);

