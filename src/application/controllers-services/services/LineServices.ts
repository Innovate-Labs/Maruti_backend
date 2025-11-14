import { Line } from "@/models/line"
import { Plant } from "@/models/plant"
import { Shop } from "@/models/shop"

export const LineServicesData = {
    AddLine: async(data:any) =>{
        const line = await Line.create(data)
        return line
    },
    getLineData: async()=>{
        const getlinedata = await Line.findAll({
            include:[
               {
                 model:Plant,
                 as:"plant"
               }, 
               {
                 model:Shop,
                 as:"shop"
               }
            ]
        })

        return getlinedata
    },
    getLineByshop: async(shopId:any) => {
      const getlinedata = await Line.findAll({
        where:{
          shopId:shopId
        }
      })
      return getlinedata
    },
    UpdateLine: async(id:string,updateData:Partial<{ name:string; lineId:string; shopId:string }>)=>{
      const data = await Line.update(updateData,{
          where:{id}
      })
      console.log(data)
      return data
    },
    DeleteLine: async(id:string)=>{
      const data = await Line.destroy({
          where:{id}
      })
      return data
    }
}