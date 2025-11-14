import { Line } from "@/models/line";
import { Plant } from "@/models/plant";
import { Shop } from "@/models/shop"
import { Supervisor } from "@/models/supervisor";
import { Technician } from "@/models/technician";
import { Sequelize } from "sequelize";


interface ShopSummary {
    id: string;
    name: string;
    lineCount: number;
    supervisorCount: number;
    technicianCount: number;
    plant: {
        id: string;
        name: string;
    } | null;
}
export const shopServicesData = {
    AddShop: async (data: any) => {
        const shop = await Shop.create(data)
        return shop
    },
 getAllShopsDetails: async (): Promise<{
        success: boolean;
        data?: ShopSummary[];
        message?: string;
        error?: unknown;
    }> => {
        try {
            const data = await Shop.findAll({
                attributes: [
                    "id",
                    "name",
                    [Sequelize.fn("COUNT", Sequelize.col("lines.id")), "lineCount"],
                    [Sequelize.fn("COUNT", Sequelize.col("supervisors.id")), "supervisorCount"],
                    [Sequelize.fn("COUNT", Sequelize.col("supervisors->technicians.id")), "technicianCount"]
                ],
                include: [
                    {
                        model: Plant,
                        as: "plant",
                        attributes: ["id", "name"]
                    },
                    {
                        model: Line,
                        as: "lines",
                        attributes: [],
                        required: false
                    },
                    {
                        model: Supervisor,
                        as: "supervisors",
                        attributes: [],
                        required: false,
                        include: [
                            {
                                model: Technician,
                                as: "technicians",
                                attributes: [],
                                required: false
                            }
                        ]
                    }
                ],
                group: ["Shop.id", "Shop.name", "plant.id", "plant.name"], // group by shop and plant for aggregation
                subQuery: false,
                raw: false
            });


            return JSON.parse(JSON.stringify(data))

        
        } catch (error) {
            console.error("Error fetching shop details:", error);
            return {
                success: false,
                message: "Failed to fetch shop details",
                error
            };
        }
    },
    getShopByplantId:async(plantId:any) =>{
       const shop = await Shop.findAll({
        where:{
            plantId:plantId
        }
       })

       return shop
    },
    getallShops:async()=>{
        const shop = await Shop.findAll()
        return shop
    },
    UpdateShop:async(id:string,updateData:Partial<{ name: string; plantId: string }>)=>{
        const data = await Shop.update(updateData,{
            where:{id}
        })
        return data
    },
    DeleteShop:async(id:string)=>{
        const data = await Shop.destroy({
            where:{id}
        })
        return data
    }
}