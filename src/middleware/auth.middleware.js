import {ApiError} from "../utiles/ApiError.js";
import { asyncHandler} from "../utiles/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../modals/user.modal.js";


export const verifyJWT=asyncHandler(async(req,_,next)=>{
     try{
        const token =req.cookie?.accessToken || req.header("Authorized")?.replace("Bearer","")

        // console.log(tokrn)
        if(!token){
            throw new ApiError(401,"Unauthorized request")
        }

        const decodedToken =jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        const user =await User.findById(decodedToken?._id).select(" -passward -refreshToken")

        if(!user){
            throw new ApiError(401,"Invaild Access token")
        }

        req.user = user;
        next()
    }catch(error){
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})