const express =require("express");

const contestRouter =express.Router();

const {createContest,getAllContests,getContestById,joinContest,getParticipants}=require("../controllers/contest.controller");

const authMiddleware =require("../middlewares/auth.middleware");

contestRouter.post("/createContest",authMiddleware,createContest);
contestRouter.get("/getAllContests",authMiddleware,getAllContests);
contestRouter.get("/getContestById/:id",authMiddleware,getContestById);
contestRouter.post("/:id/joinContest",authMiddleware,joinContest);
contestRouter.get("/:id/getParticipants",authMiddleware,getParticipants);

module.exports =contestRouter;