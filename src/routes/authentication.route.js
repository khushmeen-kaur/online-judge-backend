const express=require("express");
const authRouter=express.Router();
const authController=require("../controllers/authentication.controller");


authRouter.post("/register",authController.userRegistrationController);
authRouter.post("/login",authController.userLoginController);
authRouter.post("/logout",authController.userLogoutController);

module.exports=authRouter;