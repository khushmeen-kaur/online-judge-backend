const contestModel = require("../models/contest.model");
const problemModel=require("../models/problem.model");
const contestRegistrationModel=require("../models/contestRegistration.model");

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

module.exports = {createContest,getAllContests,getContestById,joinContest,getParticipants};