import userModel from "../Models/usersModel.js";
import bycript from 'bcryptjs'
import { encodeTokenAndSetCookie } from "../Utilities/tokenUtility.js";


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
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({success:false,message:'Invalid email!'})
        } 
        const isPasswordValid = await bycript.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({success:false,message:'Invalid password'})
        }
        //generate jwt token and set cookie
        const token = encodeTokenAndSetCookie(res,user._id);
        return res.status(200).json({success:true,message:'login successful',token:token})
    } catch (error) {
        res.status(500).json({success:false,message:error.message.toString()})
    }
}