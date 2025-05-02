import { NextFunction ,Request,Response} from "express";
import { ICow } from "./cow.interface";
import cowService from "./cow.service";


const cowPostCreated= async(req:Request, res:Response,next:NextFunction)=>{
    try{
        const cowData:ICow= req.body;
        if(!cowData){
            return res.status(400).json({
                success:false,
                message:"Cow data is missing",
                data:null

            })
        }
        const createdCow = await cowService.createCow(cowData)
        res.status(200).json({
            success:true,
            message:"Cow created Successfully",
            data:createdCow
        })

    }catch(err){
        next(err)
    }

}
const getSingleCow =async (req:Request,res:Response, next:NextFunction)=>{
    try {
        const {id}=req.params;
        const singleCowResult = await cowService.singleCowget(id);
        if(!singleCowResult){
            return res.status(400).json({
                message:"Cow Not Found",
                data:null
            })
        }
        res.status(200).json({
            message:"Successfully single cow data acheived",
            data:singleCowResult,
        })

    } catch (error) {
        next(error)
    }

}
const getAllCows = async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const allCow =await cowService.allcowget()
        if(!allCow){
            return res.status(400).json({
                message:"No Cow data ",
                data:null
            })
        }
        res.status(200).json({
            message:"Get All Cow data ",
            data:allCow,
        })
    } catch (error) {
        next(error)
    }

}
export const CowController = {
    cowPostCreated,
    getSingleCow,
    getAllCows
}