import {asyncHandler} from '../utiles/asyncHandler.js'
import {ApiError} from "../utiles/ApiError.js"
import {User} from "../modals/user.modal.js"
import {ApiResponse} from "../utiles/ApiResponse.js"
import jwt from "jsonwebtoken"
import {uploadOnCloudinary} from "../utiles/Cloudinary.js"

const registerUser=asyncHandler(async (req,res)=>{
        res.status(200).json({
        message:"chai aur code"
        })


         //this is the algo that how to work in user controller
              // get user details from frontend
             // validation - not empty
           // check if user already exists: username, email
            // check for images, check for avatar
            // upload them to cloudinary, avatar
          // create user object - create entry in db
          // remove password and refresh token field from response
           // check for user creation
            // return res
         const {fullName,email,username,passward}=req.body
         console.log("email",email);
         // })

           if(
          [fullName,email,username,passward].some((field )=>field?.trim()==="")
         ){
          throw new ApiError(400,"all fields are required ")
           }

        const exitedUser=await User.findOne({
         $or:[{username},{email}]
          })

          if(exitedUser){
           throw new ApiError(409,"user with email or username already exits ")
           }

           const avatarLocalPath=req.files?.coverImage[0]?.path;

        let coverImageLocalPath;
        if(req.files && Array.isArray(req.files.coverImage) && req.filles.coverImage.length>0){
         coverImageLocalpath=req.files.coverImage[0].path
        } 
        if(!avatarLocalPath){
          throw new ApiError(400,"Avatar file is required")
          }

      const avatar =await  uploadOncloudinary(avatarLocalPath)
       const coverImage=await uploadOncloudinary(coverImageLocalPath)
         if(!avatar){
         throw new ApiError(400,"Avatar file is required")
        }

       const User =await User.create({
         fullName,
        avatar:avatar.url,
          email,
            passward,
           username:username.toLowerCase()
        })

       const createdUser=await User.findById(user._id).select(
           "-passward -refreshToken"
         )

         if (!createdUser) {
             throw new ApiError(500, "Something went wrong while registering the user")
            }

         return res.status(201).json(
           new ApiResponse(200, createdUser, "User registered Successfully")
            )

})


const loginUser=asyncHandler(async(res,req)=>{
        // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const { email,username,passward}=req.body
    //   console.log(email);
     
    if(!(username && email)){
        throw new ApiError(400,"username or email is required")
    }

    const user = await User.findOne({
        $or:[{username},{email}]
    })

    if(!user){
        throw new ApiError(404,"user does not exit")
    }

    const isPasswardValid=await user.isPasswardCorrect(passward)

    if(!isPasswardValid){
        throw new ApiError(400,"passward is not valid")

    }   

    const {accessToken,refreshToken}=await generateAcessAndRefreshToken(user._id)

    const loggedInUser =await User.findById(user._id).select("-passward  -refreshToken")

    const options ={
        httpOnly:true,
        secure:true
    }

    return  res 
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
          new ApiResponse(
            200,
            {
                user:loggedInUser,accessToken,refreshToken
            },
            "user logged In Successfully"
          )
    )
  })    

const logoutUser =asyncHandler(async(req,res)=>{
       await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken:1 // this remove the field from document 
            }
        },
        {
            new :true

        }
       )

       const options = {
        httpOnly:true,
        secure:true
       }

       return res
       .status(200)
       .clearCookie("accessToken",options)
       .clearCookie("refreshToken",options)
       .json(new ApiResponse(200,{},"User logged out"))

})

const refreshAccessToken = asyncHandler(async(req,res) =>{
       
       const incomingRefreshToken=req.cookies.refreshToken || req.body.refreshToken

       if(!incomingRefreshToken){
        throw new ApiError(401,"unauthorized request")
       }

       try{
         const decodedToken =jwt.verfiy(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
         )

         const user =await User.findById(decodedToken?._id)

         if(!user){
            throw new ApiError(401," invalid Refresh token")

         }

         if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401,"Refresh token is expired or used ")
         }

         const { accessToken,newRefreshToken} = await generateAcessAndRefreshToken(user._id)

         return res
         .status(200)
         .cookie("accessToken",accessToken,options)
         .cookie("refreshToken",refreshToken,options)
         .json(
            new ApiResponse(
                200,
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
         )
       }catch(error){
        throw new ApiError(401,error?.message || "Invaild refresh token")
       }
})






     

    export{
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken
}
 