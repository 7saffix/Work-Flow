import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{type:String,unique:true,require:true},
    email:{type:String,unique:true,require:true},
    fullName:{type:String,require:true},
    password:{type:String,require:true},
    otp:{type:String,default:0},
},{
    timestamps:true,
    versionKey:false
});

const userModel = mongoose.model('users',userSchema);
export default userModel;