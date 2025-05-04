import resourceService from "./resource.service";
import { Request, Response , NextFunction } from "express";

const ResourcePost =async(req:Request,res:Response, next:NextFunction)=>{
    try {
        const resourceData = req.body;
    
       const  newResource= await resourceService.newResource(resourceData)
       if(! newResource){
           res.status(400).json({
               msg:"Failed to registration",
               data:null,
           })
       }
       res.status(200).json({
           msg:"successfully registered user data ",
           data: newResource
       })
    } catch (error) {
       next(error)
    }

}
export const ResourceController={
    ResourcePost
}
