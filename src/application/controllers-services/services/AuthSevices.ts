import { db } from "@/app"
import { User } from "@/models"

export const UserServices = {
    GetAllUserDetails : async() =>{
        const data = await User.UserModel.create({
            name:"vinay",
            email:"vinay@exampple.com",
            password:"vinay@123"

        })
       return data
   }
}
