import { IResource } from "./resource.interface"
import { ResourceModel } from "./resource.model"

const newResource =async(resourceData:IResource)=>{
        const nwwResourceResult = await ResourceModel.create(resourceData);
        if(!nwwResourceResult){
            throw new Error("No Resource Created")
        }
        return nwwResourceResult
}
export default{
    newResource
}