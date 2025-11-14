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
    },
    UpdatePlantUser: async(id:string,updateData:Partial<{ name: string; description: string }>)=>{
      console.log('FFFFFF',updateData)
      const data = await Plant.update(updateData,{
          where:{id}
      })
      console.log('PPPPzzz',data)
      return data
    },

    DeletePlantUser:async(id:string)=>{
        const data = await Plant.destroy({
            where:{id}
        })
        return data
    }

  }