import { Product } from "../models/ProductModel.js";
import mongoose from "mongoose";

export const GetProducts=async(req,res)=>{
    try {
const data=await Product.find()        
res.json(data)
    } catch (error) {
        res.json({message:error.message})
    }
}

//flitering api

export const filProduct = async (req, res) => {
    const { price, category, litre } = req.query;  // Use req.query instead of req.body
    let filters = {};

    if (price) {
        const [minPrice, maxPrice] = price.split('-').map(Number);
        filters.price = { $gte: minPrice, $lte: maxPrice };
    }

    if (category) {
        filters.category = category;
    }

    if (litre) {
        filters.litre = litre;
    }


    try {
        const data = await Product.find(filters);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching data" });
    }
};

export const GetProduct=async(req,res)=>{
    const {id}=req.params;
    
try {
    const data=await Product.findById(id)
    if (!data) {
     return  res.json({message:'product not found'})
    }
    res.status(200).json({data})
} catch (error) {
    res.status(500).json({message:"error fetching docs",error})
}
}