import mongoose from "mongoose";

export const connectDB = async() => {

    await mongoose.connect('mongodb+srv://niluban003:Marooned2025@cluster0.07s2f.mongodb.net/kaster').then(()=>console.log("DB connected"));
}