const mongoose=require("mongoose");

const tokenBlacklistSchema=new mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true
    }
},
    {
        timestamps:true
    }
)
const tokenBlacklistModel=mongoose.model("tokenblacklist",tokenBlacklistSchema);

module.exports=tokenBlacklistModel;