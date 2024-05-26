import mongoose from 'mongodb'

const commentSchema= new schema({
    content:{
        type:String,
        required:true
    },
    
    video:{
        type:Schema.Types.ObjectId,
        ref:'video'
    },

    owner:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true})

export const comment = mongoose.modal("Comment",commentschema);