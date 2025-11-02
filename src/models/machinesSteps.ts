 import { DataTypes, Model, Optional } from "sequelize";
 import { sequelize } from "@/database/db.config";
 
 
 interface MachineStepsAttributes {
     id: string;
     machineId?: string;
     stepsRecord?: JSON;
 }
 
 
 interface MachineStepsCreationAttributes extends Optional<MachineStepsAttributes, "id"> { }
 
 export class MachineSteps extends Model<MachineStepsAttributes, MachineStepsCreationAttributes>
     implements MachineStepsAttributes {
     public id!: string;
     public machineId?: string;
     public stepsRecord?: JSON; 
 
 
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
         stepsRecord: {
             type: DataTypes.JSON,
             allowNull:false
         }
 
     },
     {
         sequelize,
         tableName: "machinesSteps",
         timestamps: true,
         underscored: true,
     }
 );
 
 