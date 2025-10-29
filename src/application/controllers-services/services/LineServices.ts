import { Line } from "@/models/line"

export const LineServicesData = {
    AddLine: async(data:any) =>{
        const line = await Line.create(data)
        return line
    }
}