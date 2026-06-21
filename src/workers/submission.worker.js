const path = require("path");
const { Worker } = require("bullmq");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const connectToDB = require("../config/db.js");

connectToDB();


const {judgeSubmission}=require("../services/judge.service");

const worker =new Worker(
    "submissionQueue",
async(job)=>{
    console.log("Processing Job:",job.data);
    await judgeSubmission(job.data.submissionId);

},
{
    connection:{host:"127.0.0.1",port:6379}
}

);
console.log("Submission Worker Started");

worker.on(
   "completed",
   (job)=>{console.log(`Job ${job.id}completed`);}
);
worker.on(
   "failed",
   (job,error)=>{console.log(`Job ${job.id}failed`);

      console.log(error);
   }
);
module.exports = worker;