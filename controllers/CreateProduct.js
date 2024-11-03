import cloudinary from 'cloudinary';
import { Product } from "../models/ProductModel.js";
import dotenv from 'dotenv'

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const CreateProduct = async (req, res) => {
  try {
    const { name, category, price, image } = req.body;  
    const data = await Product.create({
      name,
      category,
      price,
      image,  
    });
    res.status(200).json({ message: 'Product uploaded successfully', data });
  }
   catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading product', error });
    console.log("error in backend clg",error)
  }
};