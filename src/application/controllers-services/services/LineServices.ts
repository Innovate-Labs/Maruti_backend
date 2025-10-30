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
    }
}