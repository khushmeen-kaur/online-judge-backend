const express = require("express");

const submissionRouter = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");

const { submitSolutionController } = require("../controllers/submission.controller");
const {getSubmissionById}=require("../controllers/submission.controller");
const {getMySubmission}=require("../controllers/submission.controller");

submissionRouter.post("/", authMiddleware, submitSolutionController);
submissionRouter.get("/",authMiddleware,getMySubmission);
submissionRouter.get("/:id",authMiddleware,getSubmissionById);

module.exports = submissionRouter;