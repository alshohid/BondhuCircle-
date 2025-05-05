import { IResource } from "./resource.interface"
import { ResourceModel } from "./resource.model"

const newResource =async(resourceData:IResource)=>{
        const nwwResourceResult = await ResourceModel.create(resourceData);
        if(!nwwResourceResult){
            throw new Error("No Resource Created")
        }
        return nwwResourceResult
}
const allResouurcCollection = async()=>{
    const result = await ResourceModel.find()
    if(!result){
        throw new Error("No Resurce found")
    }
    return result;
}
const singleUserResourceData = async(userId:string)=>{
    const result = await ResourceModel.find({ userId: userId }).populate('userId','name email'); 
  if (!result || result.length === 0) {
    throw new Error("No resources found for this user.");
  }

  return result;
}
export default{
    newResource,allResouurcCollection,singleUserResourceData
}