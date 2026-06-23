const submissionModel = require("../models/submission.model");
const problemModel = require("../models/problem.model");
const {judgeSubmission} = require("../services/judge.service");
const submissionQueue = require("../queues/submission.queue");
const contestModel=require("../models/contest.model");
const contestRegistrationModel = require("../models/contestRegistration.model");

const submitSolutionController= async (req,res) => {
  try {

    const {
      problemId,
      language,
      code,
      contestId
    } = req.body;

    const problem =
      await problemModel.findById(problemId);

    if (!problem) {
      return res.status(404).json({
        message: "Problem not found"
      });
    }
    const contest=await contestModel.findById(contestId);
    if (!contest){
      return res.status(404).json({
        message:"contest not found"
      })
    }
    const problemExists =contest.problems.some(problem =>problem.toString() ===problemId);
    if(!problemExists){

   return res.status(400)
   .json({

      message:
      "Problem does not belong to contest"

   });

}
    const registration=await contestRegistrationModel.findOne({contestId,userId:req.user.userId});
    if (!registration){
      return res.status(403).json({
        message:"join contest first"
      });
    }
    const now=new date();
    if (now<contest.startTime){
      return res.status(400).json({
        message:"contest has not started yet"
      })
    }
    if (now>contest.endTime){
      return res.status(400).json({
        message:"contest has ended"
      })
    }
    const submission =
      await submissionModel.create({
        userId: req.user._id,
        problemId,
        language,
        code,
        status: "PENDING",
        contestId:contestId || null
      });

      // added after judge service import 
      //add jobs (sub id) in sub queue
      await submissionQueue.add(
        "judge",
        {submissionId:submission._id},
        {attempts: 3,}
      );


    return res.status(201).json({
      message:
        "Submission created",

      submission
    });

  } catch (error) {

    return res.status(500).json({
      message: error.message
    });

  }

};

async function getSubmissionById(req,res){
  const submission=await submissionModel.findById(req.params.id);
  if(!submission){
    return res.status(404).json({
      message:"submission niot found"
    })
  }
  if (submission.userId.toString()!==req.user._id.toString()){
    return res.status(403).json({
          message:"Access denied"
    });
  }
   return res.status(200).json(submission);
}

async function getMySubmission(req,res){
  const page=Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const submissions=await submissionModel.find({
    userId:req.user._id
  }).populate(
    "problemId",
    "title difficulty"
  ).sort({
    createdAt:-1
  }).skip(
    (page-1)*limit
  ).limit(limit);

  return res.status(200).json(submissions);

}


module.exports = {submitSolutionController,getSubmissionById,getMySubmission};