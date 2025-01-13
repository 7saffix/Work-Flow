import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title:{type:String,require:true},
    description:{type:String,require:true},
    status:{type:String,require:true},
    userId:{type:mongoose.Schema.Types.ObjectId,require:true},
},{
    timestamps:true,
    versionKey:false,
});

const taskModel = mongoose.model('tasks',taskSchema);
export default taskModel;