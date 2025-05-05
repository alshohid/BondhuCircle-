import { IUser } from "./user.interface"
import { UserModel } from "./user.model";
import bcrypt from "bcrypt"


const usercreation = async(userdata:IUser)=>{
    const hashpassword = await bcrypt.hash(userdata.passwordHash,10)
    const modifiedUserData ={
        ...userdata,
        passwordHash:hashpassword
    }
    const usercreateResult = await UserModel.create(modifiedUserData)
    if(!usercreateResult){
        throw new Error("user database jai nai , failed")
    }
    return usercreateResult;
}
const authenticateUser=async (phone:string, password:string)=>{
    const user = await UserModel.findOne({phone})

    if(!user){
        return null
    }
    const ispasswordMatch = await bcrypt.compare(password,user.passwordHash)
    if(!ispasswordMatch){
        return null
    }
    return user

}
const getUserInformation = async (userId:string)=>{
        const result = await UserModel.findById(userId).select('name email avatarUrl phone role location')
        if(!result){
            throw new Error ('some thing wrong error occoured')
        }
        return result
}
const deleteUser =async (userId:string) =>{
    const result = await UserModel.findByIdAndDelete(userId)
    if(!result){
        throw new Error("database error")
    }
   return result

}
export default{usercreation,authenticateUser,getUserInformation,deleteUser}