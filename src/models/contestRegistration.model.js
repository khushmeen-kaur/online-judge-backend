const mongoose =
require("mongoose");

const contestRegistrationSchema =
new mongoose.Schema(
{
   contestId:{
      type:
      mongoose.Schema.Types.ObjectId,

      ref:"Contest",

      required:true
   },

   userId:{
      type:
      mongoose.Schema.Types.ObjectId,

      ref:"User",

      required:true
   }
},
{
   timestamps:true
}
);
const contestRegistrationModel=mongoose.model("ContestRegistration",contestRegistrationSchema);
module.exports =contestRegistrationModel;