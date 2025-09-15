import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const db_connect = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        console.log("MongoDB connected",db_connect.connection.host)
    } catch (error) {
        console.error("DB connection failder",error);
        throw new error;
    }
}

export default connectDB