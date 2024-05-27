import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query

})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const {videoId}=req.params
    const {text}=req.body

})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
     const {videoId,commentId}=req.params
     const {text}=req.body

})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
       const {videoId} =req.params
       if(isValidObjectId(commentId)){
        const comment =await comment.findByIdAndDelete(commentId)
        if(comment){
            res.json(new ApiResponse(comment,1,1,1,1,req.originalUrl, req.query))
        }
       }
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }