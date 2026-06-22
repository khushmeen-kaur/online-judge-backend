const Submission = require("../models/submission.model");
const TestCase = require("../models/testcase.model");
const {writeCppSource,compileCpp,writeInputFile,runCpp,compareOutput}=require("../executors/cpp.executor");


const judgeSubmission =
async (submissionId) => {
   //fetch submission by id 
   const submission =await Submission.findById(submissionId);
   console.log("Submission Found");

   if(!submission){return;}

   submission.status ="RUNNING";
   await submission.save();
   
   // fetch testcase
   const testCases =await TestCase.find({problemId:submission.problemId});

   console.log(`${testCases.length}test cases found`);

   console.log("Judge started");

   console.log("Status changed to RUNNING");
   try{
      await writeCppSource(submission.code,submission._id.toString());
      await compileCpp(submission._id.toString());
   }
   catch(error){
      submission.status="COMPILATION_ERROR";
      await submission.save();
      console.log(error.stderr || error.message || error);
      return;
   }

let allPassed=true;
let maxExecutionTime=0;
for (const testcase of testCases){
   await writeInputFile(submission._id.toString(),testcase.input);
   let actualOutput;
   let executionTime;
   try{
    const result=await runCpp(submission._id.toString());
    actualOutput=result.stdout;
    executionTime=result.executionTime;
    maxExecutionTime=Math.max(maxExecutionTime,executionTime);
   }
   catch(error){

   if(error.killed){

      submission.status =
      "TIME_LIMIT_EXCEEDED";

   }
   else{

      submission.status =
      "RUNTIME_ERROR";

   }

   await submission.save();

   return;
}
   const passed=compareOutput(actualOutput,testcase.expectedOutput);
   if (!passed){
      allPassed=false;
      break;
   }
}
submission.executionTime=maxExecutionTime;
if (allPassed){
   submission.status="ACCEPTED";
}else{
   submission.status="WRONG_ANSWER";
}
await new Promise(resolve =>setTimeout(resolve,3000));

await submission.save();
console.log(
   "Final Status:",
   submission.status
);

};



module.exports = {judgeSubmission};