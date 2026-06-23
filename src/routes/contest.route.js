const express =require("express");
const contestRouter =express.Router();

const {createContest,getAllContests,getContestById,joinContest,getParticipants,getLeaderboard,contestStats,myContests,updateContest,deleteContest}=require("../controllers/contest.controller");

const authMiddleware =require("../middlewares/auth.middleware");
const isAdminMiddleware=require("../middlewares/isAdmin.middleware");

contestRouter.post("/createContest",authMiddleware,isAdminMiddleware,createContest);
contestRouter.get("/getAllContests",authMiddleware,getAllContests);
contestRouter.get("/getContestById/:id",authMiddleware,getContestById);
contestRouter.post("/:id/joinContest",authMiddleware,joinContest);
contestRouter.get("/:id/getParticipants",authMiddleware,getParticipants);
contestRouter.get("/:id/getLeaderboard",authMiddleware,getLeaderboard);
contestRouter.get("/:id/contestStats",authMiddleware,contestStats);
contestRouter.get("/myContests",authMiddleware,myContests);
contestRouter.post("/:id/updateContest",authMiddleware,isAdminMiddleware,updateContest);
contestRouter.post("/:id/deleteContest",authMiddleware,isAdminMiddleware,deleteContest);

module.exports =contestRouter;