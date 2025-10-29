import { Plant } from "@/models/plant";

export const PlantServicesData = {
    AddPlantUser: async(data: { name: string; description: string }) => {
          const plant = await Plant.create(data);
          return plant
    }
}