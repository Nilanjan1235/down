import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    
    userId:{type:String,required:true},
    name:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:String,required:true},
    category_1:{type:String,required:true},
    category_2:{type:String},
    category_3:{type:String},
    location:{type:String,required:true},
    contact:{type:Number,required:true},
    status: {type:String, default:"pending"},

})

const menuModel = mongoose.models.menu || mongoose.model ("menu",menuSchema);

export default menuModel;