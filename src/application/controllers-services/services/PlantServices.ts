import { Plant } from "@/models/plant";
import { Shop } from "@/models/shop";


export const PlantServicesData = {
    AddPlantUser: async(data: { name: string; description: string }) => {
          const plant = await Plant.create(data);
          return plant
    },
    GetPlantUser: async()=>{
       const plantdata = await Plant.findAll({
           include: [
      {
        model: Shop,
        as: "shops",
      },
    ],
       })
       return plantdata
    }
}