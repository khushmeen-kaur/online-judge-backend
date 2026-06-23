const express=require("express");
const problemRouter=express.Router();

const authMiddleware=require("../middlewares/auth.middleware");
const isAdminMiddleware=require("../middlewares/isAdmin.middleware");
const problemController=require("../controllers/problem.controller");


problemRouter.post("/createProblem",authMiddleware,isAdminMiddleware,problemController.createProblem);

problemRouter.get(
    "/",
    authMiddleware,
    problemController.getAllProblems
);

problemRouter.get("/:id", authMiddleware, problemController.getProblemById);

problemRouter.post("/:id/createTestcase", authMiddleware, problemController.createTestcase);

module.exports = problemRouter;