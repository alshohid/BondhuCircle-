/// <reference types="../../../types/express" />

import resourceService from "./resource.service";
import { Request, Response , NextFunction } from "express";

const ResourcePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resourceData = req.body;
  
      const user = req.user as { _id: string };

      if (!user?._id) {
        return res.status(401).json({ msg: "Unauthorized", data: null });
      }
  
      const newResource = await resourceService.newResource({
        ...resourceData,
        userId: user._id, 
      });
  
      if (!newResource) {
        return res.status(400).json({
          msg: "Failed to create resource",
          data: null,
        });
      }
  
      res.status(200).json({
        msg: "Successfully created resource",
        data: newResource,
      });
    } catch (error) {
      next(error);
    }
  };
const getAllResource = async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const allResource = await resourceService.allResouurcCollection();
        if(!allResource){
            return res.status(400).json({
                msg:"No Resource Found ",
                data:null,
            })
        }
        res.status(200).json({
            msg:"All Resource ",
            data:allResource
        })
        
    } catch (error) {
        next(error)
    }

}
const singleUserResource = async(req:Request,res:Response, next:NextFunction)=>{
   try {
    const user = req.user as { _id: string };
    const userId= user._id
  
    const userCorespondingResourceData= await resourceService.singleUserResourceData(userId)
    if(!userCorespondingResourceData){
        return res.status(400).json({
            msg:"No User Resource data found",
            data:null
        })
    }
    res.status(200).json({
        msg:"Successfully user corresponding resource data found ",
        data:userCorespondingResourceData
    })

   } catch (error) {
     next(error)
   }

}
export const ResourceController={
    ResourcePost,getAllResource,singleUserResource
}
