const Submission = require("../models/submission.model");
const TestCase = require("../models/testcase.model");

const judgeSubmission =
async (submissionId) => {
   //fetch submission by id 
   const submission =await Submission.findById(submissionId);
   console.log("Submission Found");

   if(!submission){return;}

   submission.status ="RUNNING";
   
   // fetch testcase
   const testCases =await TestCase.find({problemId:submission.problemId});

   console.log(`${testCases.length}test cases found`);

   console.log("Judge started");

   console.log("Status changed to RUNNING");

// for checking accept or wrong ans
if(
   submission.code.includes(
      "return"
   )
){
   submission.status =
   "ACCEPTED";
}
else{
   submission.status =
   "WRONG_ANSWER";
}

await new Promise(resolve =>setTimeout(resolve,3000));
await submission.save();
console.log(
   "Final Status:",
   submission.status
);

};



module.exports = {judgeSubmission};