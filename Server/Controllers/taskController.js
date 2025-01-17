import mongoose from "mongoose";
import taskModel from "../Models/taskModel.js";

//create task
export const createTask = async(req,res)=>{
    const {title,description,status} = req.body;
    const userId = req.headers.id;
    try {
        if(!title || !description || !status ){
            return res.status(400).json({success:false,message:'required all field!'})
        }
        const task = await taskModel.create({title,description,status,userId})
        res.status(201).json({success:true,message:'new task created!',data:task})
    } catch (error) {
        res.status(500).json({success:false,message:error.toString()})
    }

}

//update task status
export const updateTaskStatus=async(req,res)=>{
    const status = req.params.status;
    const taskId = req.params.id;
    const userId = req.headers.id;

    try {
        await taskModel.updateOne({_id:taskId,userId:userId},{status:status});
        res.status(200).json({success:true,message:'task updated'})
    } catch (error) {
        res.status(500).json({success:false,message:error.toString()});
    }
}

// delete task 
export const deleteTask=async(req,res)=>{
    const taskId = req.params.id;
    const userId = req.headers.id;

    try {
        await taskModel.deleteOne({_id:taskId,userId:userId})
        res.status(200).json({success:true,message:'task deleted'})
    } catch (error) {
        res.status(500).json({success:false,message:error.toString()})
    }
}

//task list by status
export const listByTaskStatus=async(req,res)=>{
    const status = req.params.status;
    const userId = req.headers.id;
    try {
        const task = await taskModel.find({userId:userId,status:status})
        res.status(200).json({success:true,data:task})
    } catch (error) {
        res.status(500).json({success:false,message:error.toString()})
    }
}

//count task
export const countTask=async(req,res)=>{
    const userId = new mongoose.Types.ObjectId(req.headers.id);
    try {
        const data = await taskModel.aggregate([
            {$match:{userId:userId}},
            {$group:{_id:"$status",total:{$count:{}}}}
        ])
        res.status(200).json({success:true,data:data})
    } catch (error) {
        res.status(500).json({success:false,message:error.toString()})
    }
    
}