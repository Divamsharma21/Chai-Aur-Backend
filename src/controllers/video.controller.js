import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
     const videos = await Video.find().populate(){
        const count = await Video.countDocuments()
        const page=Math.ciel(count/limit)
        const pages=Math.floor(count/limit)
        res.json(new ApiResponse(videos, page, pages, limit, count, req.originalUrl, req.query))

     }
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    // TODO: get video, upload to cloudinary, create video

    const video = new Video({
        title,
        description,
        //TODO: add user id
        //TODO: add video url
    

    })
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
    if(isValidObjectId(videoId)){
        const video =await Videos.findById().populate()
        if(video){
            res.json(new ApiResponse(video, 1, 1, 1, 1, req.originalUrl, req.query))

        }

    }
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail
       if(isValidObjectId(videoId)){
        const video = await Video.findByIdAndUpdate(videoId, req.body, {new: true})
            if(video){
                res.json(new ApiResponse(video, 1, 1, 1, 1, req.originalUrl, req.query))
                    }
        }

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
    if(isValidObjectId(videoId)){
        const video = await Video.findByIdAndDelete(videoId)
        if(video){
            res.json(new ApiResponse(video, 1, 1, 1, 1, req.originalUrl, req.query))

              
    }
    }
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}