import {  generateRefreshToken } from '../../../helper/authhelper/generateRefreshToken';
import { json, NextFunction ,Request,Response} from "express"
import UserService from "./user.service"
import {generateAccessToken} from "../../../helper/authhelper/generateAccesstoken"
import config from '../../../config';
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { IUser } from './user.interface';

const signup =async(req:Request,res:Response, next:NextFunction)=>{
     try {
        const userdata = req.body;
        const createUser= await UserService.usercreation(userdata)
        if(!createUser){
            res.status(400).json({
                msg:"Failed to registration",
                data:null,
            })
        }
        res.status(200).json({
            msg:"successfully registered user data ",
            data:createUser
        })
     } catch (error) {
        next(error)
     }

}
const loginUser =async (req:Request, res:Response,next:NextFunction)=>{
    try {
        const {phone,passwordHash}=req.body
        if(!phone || !passwordHash){
            return res.status(400).json({
                success: false,
                message: "Both phoneNumber and password are required",
                data: null,
            })
        }
        const user = await UserService.authenticateUser(phone,passwordHash) 
        if (!user) {
            return res.status(401).json({
              success: false,
              message: "Invalid credentials",
              data: null,
            });
          }
        const accessToken = await generateAccessToken(user)
        const refreshToken = await generateRefreshToken(user)
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Set 'secure' to true in production
            maxAge: 365 * 24 * 60 * 60 * 1000, 
          });

          res.status(200).json({
            msg:"user successfully Logged In ",
            data:{accessToken},
           
          })
        
    } catch (error) {
        next(error)
    }
}
const refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Get the refreshToken from the request cookie
      const refreshToken = req.cookies.refreshToken;
  
      // Ensure the refreshToken is provided in the request cookie
      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          message: "Refresh token is missing",
          data: null,
        });
      }
  
      try {
        // Verify the refresh token using the refresh_secret
        const decodedToken = jwt.verify(
          refreshToken,
          config.jwt.refresh_secret as Secret
        ) as IUser;
  
        // Generate a new access token using the decoded user information
        const accessToken = generateAccessToken(decodedToken);
  
        // Send the new access token in the response
        res.status(200).json({
          success: true,
          message: "Access token refreshed successfully",
          data: {
            accessToken,
          },
        });
      } catch (err) {
        return res.status(401).json({
          success: false,
          message: "Invalid refresh token",
          data: null,
        });
      }
    } catch (error) {
      next(error);
    }
  };
  

const getUserOwnProfile =async(req:Request, res:Response, next:NextFunction)=>{
    try {
      const user = req.user as {_id:string}
      if(!user._id){
        return res.status(401).json({
          msg:'User Anauthoraize',
          data:null
        })
      }
      const userinfo = await UserService.getUserInformation(user._id) 
      if(!userinfo){
        return res.status(400).json({
          msg:"User no found ",
          data:null
        })
      }
      res.status(200).json({
        msg:"successfully user info get",
        data:userinfo
          
      })
    } catch (error) {
      next(error)
    }
}

const deleteUser = async(req:Request ,res:Response , next:NextFunction)=>{
  try {
    const {id}= req.params
    const deleteUserResult = await UserService.deleteUser(id)
    if(!deleteUserResult){
      return res.status(400).json({
        msg:"no user found delete for this id ",
        data:null
      })
    }
    res.status(200).json({
      msg:"User Successsfully deleted ",
      data:deleteUserResult
    })
    
  } catch (error) {
    next(error)
  }

}
export const UserController= {
    signup,loginUser,refreshToken,getUserOwnProfile,deleteUser
}