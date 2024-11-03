import mongoose from "mongoose";

const ProductSch=new mongoose.Schema({
    name:String,
    category:String,
    litre:Number,
    image:String,
    price:Number
})

export const Product=mongoose.model('Product',ProductSch)