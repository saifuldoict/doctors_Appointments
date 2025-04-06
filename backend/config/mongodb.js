import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected',()=>console.log("database Connect"))
    await mongoose.connect(`${process.env.MONGODB_URI}/doctors`)
}

export default connectDB;