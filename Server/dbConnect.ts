import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

export const dbConnect = async () => {
    console.log(process.env.VITE_MONGO_URI);
    try{
        await mongoose.connect(process.env.VITE_MONGO_URI!,{
            dbName : "JobEcho",
        });
        console.log("connection established");
    } catch(error){
        console.log(error);
        console.log("error connecting to database");
    }
}