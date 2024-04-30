import {asyncHandler} from '../utiles/asyncHandler.js'


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

export{
    registerUser,
}
 