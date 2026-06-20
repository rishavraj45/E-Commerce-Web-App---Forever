import mongoose from "mongoose";

//we have created this connectDB function, whenever we execute this function then mongoDB database will be connected to the project
const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log("DB Connected")
    });

    await mongoose.connect(process.env.MONGODB_URI);
}

export default connectDB;