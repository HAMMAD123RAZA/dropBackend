import { Product } from "../models/ProductModel.js"

export const delProduct=async(req,res)=>{
    const {id}=req.params
    try {
        const data=await Product.findByIdAndDelete(id)
        res.status(200).json("prouduct deleted successfully")
    } catch (error) {
        console.log("eroor in backend",error)
        res.status(501)
    }
}