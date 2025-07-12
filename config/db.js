import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

console.log("Loaded URI =", process.env.MONGODB_URI);
let cached = global.mongoose

if(!cached){
    cached = global.mongoose = { conn: null, promise: null}
}

async function connectDB() {
    if(cached.conn){
        return cached.conn
    }

    if(!cached.promise){
        const opts = {
            bufferCommands: false
        }

        cached.promise = mongoose.connect
            (`${process.env.MONGODB_URI}/MyCart`,opts).then(
                mongoose =>{
            return mongoose
                }
            )
    }
    cached.conn = await cached.promise
    return cached.conn
}

export default connectDB
console.log("MongoDB URI:", process.env.MONGODB_URI);
