import { decodeToken } from "../Utilities/tokenUtility.js";

export const authVerification=async(req,res,next)=>{
    const token = req.cookies['token'];
    const decoded = decodeToken(token);

    if(!decoded){
        res.status(400).json({success:false,message:'unauthorized'})
    }else{
        req.headers.email = decoded['email'];
        req.headers.id = decoded['id'];
        next()
    }
}
