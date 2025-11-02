import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "@/database/db.config";


interface MachineAttributes {
    id: string;
    machineName: string;
    serialNumber: string;
    servicesFrequency: string;
    plantId?: string;
    shopId?: string;
    lineId?: string;
    estimate_check?: string;
    firstServices?: Date;
}


interface MachineCreationAttributes extends Optional<MachineAttributes, "id"> { }

export class Machine extends Model<MachineAttributes, MachineCreationAttributes>
    implements MachineAttributes {
    public id!: string;
    public machineName!: string;
    public serialNumber!: string;
    public servicesFrequency!: string;
    public plantId?: string;
    public shopId?: string;
    public lineId?: string;
    public firstServices?: Date


    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Machine.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        machineName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        serialNumber: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        servicesFrequency: {
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
        shopId: {
            type: DataTypes.UUID,
            allowNull: true,
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
            allowNull: true,
            field: "line_id",
            references: {
                model: "lines",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },

        estimate_check: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstServices: {
            type: DataTypes.DATE,
            allowNull: true,  // ✅ allows saving without a value
        }

    },
    {
        sequelize,
        tableName: "machines",
        timestamps: true,
        underscored: true,
    }
);

