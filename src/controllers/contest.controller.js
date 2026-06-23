const contestModel = require("../models/contest.model");
const problemModel=require("../models/problem.model");
const contestRegistrationModel=require("../models/contestRegistration.model");
const submissionModel=require("../models/submission.model")
const userModel=require("../models/user.model");

async function createContest(req,res){
   try{
      const {title,description,startTime,endTime,problems} = req.body;
      const contest =await contestModel.create({title,description,startTime,endTime,problems,createdBy:req.user._id});
      res.status(201).json(contest);
   }
   catch(error){
      console.log(error);
      res.status(500).json({
         message:"Error creating contest"
      });
   }
};

async function getAllContests(req,res){
    const contests=await contestModel.find().populate("createdBy","fullname email");
    res.status(200).json(contests);
};

async function getContestById(req,res){
    try{
        const contest=await contestModel.findById(req.params.id).populate("problems").populate("createdBy","fullname email");
        if (!contest){
            res.status(404).json({
                message:"contest not found"
            })
        }
        res.status(200).json({
            contest
        })
    }catch{
        res.status(500).json({
            message:"error fecthing contest"

        });
    }
};

async function joinContest(req,res){
    const contestId = req.params.id;
    const userId = req.user._id;
    const contest = await contestModel.findById(contestId);
    if (!contest){
        return res.status(404).json({
            message:"cant find this contest"
        })
    }
    const existingRegistration = await contestRegistrationModel.findOne({ contestId, userId });
    if (existingRegistration){
        return res.status(400).json({
            message:"already registered for this contest"
        })
    }

    const registration = await contestRegistrationModel.create({ contestId, userId });
    res.json({
        registration
    })
}

async function getParticipants(req,res){
    const contestId=req.params.id;
    const participants=await contestRegistrationModel.find({contestId}).populate("userId","fullname email");
    return res.status(200).json({
        participants
    })

}
async function getLeaderboard(req,res){
    const submissions=await submissionModel.find({contestId:req.params.id,status:"ACCEPTED"});
    const leaderboard={};
    for (const submission of submissions){
        const userId=submission.userId.toString();
        const problemId=submission.problemId.toString();
        if (!leaderboard[userId]){
            leaderboard[userId]={solvedProblems:new Set()}
        }
        leaderboard[userId].solvedProblems.add(problemId);
    }
    const result =
await Promise.all(

   Object.entries(leaderboard).map(

      async([userId,data])=>{
         const user =await userModel.findById(userId);
         return {userId,name:user.fullname,email:user.email,score:data.solvedProblems.size};
        })
)

    res.status(200).json({
        result
    })
}
async function contestStats(req,res){6
try{

      const contestId =
      req.params.id;

      const contest =
      await contestModel.findById(
         contestId
      );

      if(!contest){

         return res.status(404)
         .json({
            message:
            "Contest not found"
         });
      }

      const participants =
      await contestRegistrationModel
      .countDocuments({
         contestId
      });

      const totalSubmissions =
      await submissionModel
      .countDocuments({
         contestId
      });

      const acceptedSubmissions =
      await submissionModel
      .countDocuments({

         contestId,

         status:
         "ACCEPTED"

      });

      res.status(200).json({

         participants,

         problems:
         contest.problems.length,

         acceptedSubmissions,

         totalSubmissions

      });

   }
   catch(error){

      console.log(error);

      res.status(500).json({

         message:
         "Error fetching stats"

      });

   }

}

async function myContests(req,res){
    try{

      const registrations =
      await contestRegistrationModel
      .find({
         userId:
         req.user._id
      })
      .populate(
         "contestId"
      );
      
      

      const contests =
      registrations.map(
         registration =>
         registration.contestId
      );

      res.status(200).json({
         contests
      });

   }
   catch(error){

      console.log(error);

      res.status(500).json({
         message:
         "Error fetching contests"
      });

   }

}

const updateContest =
async(req,res)=>{

   try{

      const contest =
      await contestModel.findByIdAndUpdate(

         req.params.id,

         req.body,

         {
            new:true
         }

      );

      if(!contest){

         return res.status(404)
         .json({
            message:
            "Contest not found"
         });
      }

      res.status(200).json(
         contest
      );

   }
   catch(error){

      console.log(error);

      res.status(500).json({
         message:
         "Error updating contest"
      });

   }

};

async function deleteContest(req,res){
      const contest =
      await Contest.findByIdAndDelete(
         req.params.id
      );

      if(!contest){

         return res.status(404)
         .json({
            message:
            "Contest not found"
         });
      }

      res.status(200).json({
         message:
         "Contest deleted successfully"
      });
    }

module.exports = {createContest,getAllContests,getContestById,joinContest,getParticipants,getLeaderboard,contestStats,myContests,updateContest,deleteContest};