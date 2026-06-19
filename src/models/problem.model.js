const mongoose=require("mongoose");

const problemSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    description:{
        type:String,
        required:true
    },
    difficulty:{
        type:String,
        enum:["EASY","MEDIUM","HARD"],
        required:true
    },
    constraints:{
        type:String,
        required:true
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

},
{
    timestamps:true
});
const problemModel=mongoose.model("Problem",problemSchema);
module.exports=problemModel;