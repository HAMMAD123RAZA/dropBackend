import mongoose from "mongoose";
import express from "express";
import { User } from "../models/UserModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();


export const signUp=async(req,res)=>{
    const {username,email,password}=req.body
    try {
        const user=await User.findOne({email})
        if (user) {
            return res.status(500).json({message:"user already exists"})
        }
        const hashPass= await bcrypt.hash(password,10)
        const newUser=await User.create({username,email,password:hashPass})
       const token= jwt.sign({id:newUser._id,email},process.env.jwt_secKey,{expiresIn:'1h'})
        res.status(200).json({message:'user created',newUser,token})
    } catch (error) {
        res.status(500).json({message:'error creating user',error})
    }
}


export const login=async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await User.findOne({email})
        if (!user) {
         return   res.status(500).json({message:'user doesnt exist'})
        }
        const comparePass=await bcrypt.compare(password,user.password)
        if(!comparePass){
            return res.status(500).json({message:"invalid password or email"})
        }
        const token=jwt.sign({id:user._id, email},process.env.jwt_secKey, {expiresIn:"1h"})
        res.status(200).json({message:"user logged in ",token})

    } catch (error) {
        res.status(500).json({message:'error loggin in',error})
    }
}