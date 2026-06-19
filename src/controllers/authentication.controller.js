const userModel=require("../models/user.model");
const jwt=require("jsonwebtoken");
const tokenBlacklistModel=require("../models/tokenBlacklist.model");

async function userRegistrationController(req,res){
    const {email,password,username} = req.body || {};
    const isExists=await userModel.findOne({
        email:email
    })
    if (isExists){
        return res.status(400).json({
            message:"some account already registered with this provided email , try another one please"
        })
    }
    const user=await userModel.create({
        email,
        password,
        username
    })
    const token = await user.generateJWT();
    res.cookie("jwt_token", token, { httpOnly: true });
    return res.status(201).json({ message: 'user registered', userId: user._id, token });
    // lets send email to user that they have regis with our website


}

async function userLoginController(req,res){
    const {email,password} = req.body || {};
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(401).json({
            message:"cant find user with this email"
        })
    }
    const isValid = await user.comparePassword(password);
    if (!isValid) {
        return res.status(401).json({
            message: "you are filling wrong password"
        });
    }
    //generate token after login
    const token = await user.generateJWT();
    res.cookie("jwt_token", token, { httpOnly: true });
    res.status(200).json({
        message: "successfully logged in",
        user: {
            username: user.username,
            email: user.email,
            userId: user._id
        },
        token
    })
};

async function userLogoutController(req,res){
    const token=req.cookies?.jwt_token;
    if (!token){
        console.log('logout: no token found in cookies or headers', { cookies: req.cookies, authHeader: req.headers?.authorization });
        return res.status(400).json({
            message:"no token found - are you logged in?"
        })
    }
    await tokenBlacklistModel.create({
        token:token
    })
    res.clearCookie("jwt_token");
    return res.status(200).json({
        message:"user logged out successfully"
    })
}

module.exports={userRegistrationController,userLoginController,userLogoutController};