import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

function connectDB(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("DB connected");
    })
    .catch((err)=>{
        console.log("DB connection error", err);
    })
}

export default connectDB;