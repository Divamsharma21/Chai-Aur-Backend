import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
    const {text, userId} =req.body
    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID")
    }
    
})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
    
})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
    const {userId}=req.body
    const {tweetId}=req.params
    if (!isValidObjectId(userId) || !isValidObjectId(tweetId)){
        throw new ApiError(400, "Invalid user ID or tweet ID")
    }

    const tweet = await tweet.findByIdAndUpdate(tweetId)
    if(tweet){
        res.json(new ApiResponse(tweet,200,"tweet is update successfully"))

    }
})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
    const {userId} =req.body
    const {tweetId}=req.params
        
    if (!isValidObjectId(userId) || !isValidObjectId(tweetId)){
        throw new ApiError(400, "Invalid user ID or tweet ID")
    }

    const tweet = await tweet.findByIdAndDelete(tweetId)
    if(tweet){
        res.json(new ApiResponse(tweetId,200,"tweet is deleted successfully"))
    }


})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}