import userModel from "../Models/usersModel.js";
import bycript from 'bcryptjs'
import { encodeTokenAndSetCookie } from "../Utilities/tokenUtility.js";
import mongoose from "mongoose";


// registration
export const signup = async(req,res)=>{
    const {username,email,fullName,password} = req.body;

    try {
        if(!username || !email || !fullName || !password){
            return res.status(400).json({success:false,message:'All field required!'})
        }
        
        const userExist = await userModel.findOne({email});
        if(userExist){
            return res.status(400).json({success:false,message:'User already exist!'})
        } 

        const hashPassword = await bycript.hash(password,10);
        const user = new userModel({
            username,email,fullName,
            password:hashPassword
        })
        await user.save()
        res.status(201).json({success:true,message:'Registration Successful'})
    } catch (error) {
        res.status(500).json({success:false,message:error.message.toString()})
    }
} 

//login
export const login = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email})
        if(!user){
            res.status(400).json({success:false,message:'invalid email'})
        }
        const isPasswordValid = bycript.compare(password,user.password);
        if(!isPasswordValid){
            res.status(400).json({success:false,message:'invalid password'})
        }
        const token = encodeTokenAndSetCookie(res,email,user._id)
        res.status(200).json({success:true,message:'login successful',token:token})
    } catch (error) {
        res.status(500).json({success:false,message:error.message.toString()})
    }
}

//logout
export const logout =async(req,res)=>{
    try {
        res.clearCookie('token');
        res.status(200).json({success:true,message:'logout successful'})
    } catch (error) {
        res.status(500).json({success:true,message:error.message.toString()})
    }
}

// //profile read
// export const profileRead =  async(req,res)=>{
//     // const email = req.headers.email
//     const id = req.headers.id
//     const objectId =new mongoose.Types.ObjectId(id);
//     try {
//         const matchStage = {
//             $match:{
//             //    email
//             "_id":objectId
//             }
//         };
//         const projectStage = {
//             $project:{
//                 email:1,
//                 username:1
//             }
//         }

//         const user = await userModel.aggregate([matchStage,projectStage])
//         res.status(200).json({success:true,message:'success',data:user})
//     } catch (error) {
//         res.status(500).json({success:false,message:error.message.toString()})
//     }
// }
export const profileRead = async(req,res)=>{
    const email = req.headers.email;
    try {
        const user = await userModel.findOne({email});
        res.status(200).json({success:true,
            data:{      
                    email:user.email,
                    username:user.username,
                    fullname:user.fullName,
            }})
    } catch (error) {
        res.status(500).json({success:false,message:error.message.toString()})
    }
}