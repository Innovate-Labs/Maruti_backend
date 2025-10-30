import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "@/database/db.config";

interface TechnicianSupervisorAttributes {
    id: string;
    superviseId?: string;
    technicianId?: string;
}


interface TechnicianSupervisorCreationAttributes extends Optional<TechnicianSupervisorAttributes, "id"> { }

export class TechnicianSupervisor extends Model<TechnicianSupervisorAttributes, TechnicianSupervisorCreationAttributes>
    implements TechnicianSupervisorAttributes {
    public id!: string;
    public supervisor_id!: string;
    public technician_id!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

TechnicianSupervisor.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
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

    },
    {
        sequelize,
        tableName: "technician_supervisors",
        timestamps: true,
        underscored: true,
    }
);

