import mongoose from "mongoose";

const userSch=new mongoose.Schema({
    userName:String,
    email:String,
    password:String
})

export const User=new mongoose.model('User',userSch)