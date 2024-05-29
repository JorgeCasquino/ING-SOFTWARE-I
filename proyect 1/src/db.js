import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        await mongoose.connect("mongodb://localhost/proyect1");
        console.log(">>> DB is conected")
    } catch (error) {
        console.log(error);
    }
};