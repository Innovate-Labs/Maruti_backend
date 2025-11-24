import { User } from "@/models/user"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const UserServices = {
  
    AddUser: async(data:any)=>{
        const result = await User.create(data)
        return result
    },

getUserLogin: async(email:any,password:any)=>{
        console.log(email,password)
         const users = await User.findOne(
            { 
                attributes: ['id', 'name', 'email', 'password', 'role'],
                where: { email } });
        //  console.log("ASAEFDDDAAAAAA",user)

         const user = JSON.parse(JSON.stringify(users));

  if (!user) {
    return { success: false, message: "Invalid email or password" };
  }

  // 2. Compare entered password with hashed password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return { success: false, message: "Invalid email or password" };
  }

  // 3. Remove password from return object
//   const plainUser = user.get({ plain: true });
//   delete plainUser.password;
    const token = jwt.sign(
      { id: user.id, email: user.email },   // payload
      process.env.JWT_SECRET || "mysecretkey",        // secret
      { expiresIn: "7d" }                             // expiry
    );
    delete user.password;

  return {
    success: true,
    message: "Login successful",
    token,
    user: user,
  };
    }
}