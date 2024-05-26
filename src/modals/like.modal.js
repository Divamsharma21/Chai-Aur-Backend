import mongoose from 'mongodb'

const likeschema= new schema({
    comment:{
        type:schema.Types.ObjectId,
        ref:"Comment"
    },

    video:{
        type:schema.Types.ObjectId,
        ref:"video"
    },

    likedBy:{
        type:schema.Types.ObjectId,
        ref:"User"
    },

    tweet:{
        type:schema.Types.ObjectId,
        ref:"Tweet"
    }
},{timestamps:true})

export const Like=mongoose.modal("Likes",likeschema)