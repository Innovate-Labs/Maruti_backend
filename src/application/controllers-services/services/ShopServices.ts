import { Shop } from "@/models/shop"

export const shopServicesData = {
    AddShop: async(data:any) =>{
        const shop = await Shop.create(data)
        return shop
    }
}