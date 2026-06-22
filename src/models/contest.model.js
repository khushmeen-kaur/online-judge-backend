const mongoose =
require("mongoose");

const contestSchema =
new mongoose.Schema(
{
   title:{
      type:String,
      required:true
   },

   description:{
      type:String
   },

   startTime:{
      type:Date,
      required:true
   },

   endTime:{
      type:Date,
      required:true
   },

   problems:[
      {
         type:
         mongoose.Schema.Types.ObjectId,
         ref:"Problem"
      }
   ],

   createdBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
   }
},
{
   timestamps:true
}
);
const contestModel=mongoose.model("Contest",contestSchema);
module.exports =contestModel;
