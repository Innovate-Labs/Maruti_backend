import { User } from "@/models/user"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const UserServices = {
  
    AddUser: async(data:any)=>{
        const result = await User.create(data)
        return result
    },

getUserLogin: async (email:any, password:any) => {
  const userData = await User.findOne({
    attributes: ["id", "name", "email", "password", "role"],
    where: { email },
  });

  if (!userData) {
    return { success: false, message: "Invalid email or password" };
  }

  const user = JSON.parse(JSON.stringify(userData));

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return { success: false, message: "Invalid email or password" };
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || "mysecretkey",
    { expiresIn: "7d" }
  );

  delete user.password;

  return {
    success: true,
    message: "Login successful",
    token,
    user,
  };
}

}