import mongoose from 'mongoose';
import {DB_NAME} from "../constants.js";

const connectDB=async() =>{
    try{
const connectionInstance=await mongoose.connect('${process.env.MONGODB_URI}/${DB_NAME}')
console.log(' Mongo connected !! DB HOST:${connectionInstance.connection.host}');
    }catch(error){
        console.log("MONGOOSE connection error" ,error);
        process.exit(1);
    }
}


export default connectDB
// see the code from github and also it have two methods to connnect db 
// we also write in index file but it not best way 
// the best way is to write sepeartly in db folder file and import in index file.