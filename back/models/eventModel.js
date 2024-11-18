import mongoose from "mongoose";


const eventSchema = new mongoose.Schema({

    userId:{type:String,required:true},
    name:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true},
    location:{type:String,required:true},
    contact:{type:Number,required:true},
    date: { type: Date, required: true }, // Date field
    time: { type: String, required: true },
    price:{type:Number,required:true},
    status: {type:String, default:"pending"},

})

const eventModel = mongoose.models.event || mongoose.model ("event",eventSchema);

export default eventModel;