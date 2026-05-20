import mongoose from "mongoose";

export const MONGO_URL = process.env.MONGO_URL

export const connectDB = async () => {
    try{
        if(mongoose.connections[0].readyState){
            return
        }

        await mongoose.connect(MONGO_URL)
        console.log("MongoDB connected")
    }
    catch(error){
        console.log("MongoDB Error:", error)
    }
}