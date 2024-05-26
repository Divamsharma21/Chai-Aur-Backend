import mongoose from 'mongodb'

const playlistschema=new schema({
    name:{
        type:String,
        required:true,
        unique:true,

    },

    description:{
        type:String,
        required:false,
        unique:false
    },

    video:{
        type:schema.Types.ObjectId,
        ref:"video"
    },

    owner:{
        type:schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true})

export const playlist = mongoose.modal("Playlist",playlistschema)