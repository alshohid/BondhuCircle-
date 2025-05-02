import { ICow } from "./cow.interface"
import { CowModel } from "./cow.model"


const createCow = async (cow:ICow) =>{
    const createdCow = await CowModel.create(cow)
    if(!createdCow){
        throw new Error ("Failed to Create Cow")
    }
    return createdCow;
}
const singleCowget =async(id:string):Promise<ICow | null>=>{
    const cow =await CowModel.findById({_id:id});
    return cow;    
}
const allcowget =async()=>{
    const allcow= await CowModel.find();
    if(!allcow){
        throw new Error("all cow ashe nai")
    }
    return allcow;

}
export default {
    createCow,singleCowget,allcowget
}