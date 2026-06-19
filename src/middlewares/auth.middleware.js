const userModel=require("../models/user.model");
const jwt=require("jsonwebtoken");

async function authMiddleware(req,res,next){
    // token can be sent as cookie or authorization header (Bearer abc123)
    const token =
  req.cookies?.token ||
  req.cookies?.jwt_token ||
  req.headers?.authorization?.split(" ")[1];
    //console.log(req.cookies);
    //console.log(token);
    
    if (!token){
        return res.status(401).json({
            message:"unauthorized access, token is missing"
        })
    }
    try{
        //verify token 
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        // find user by id from decoded token
        if (!decoded || !decoded.userId) {
            console.error('token decoded but missing userId', decoded);
            return res.status(401).json({ message: 'unauthorized access, token invalid' });
        }
        const user = await userModel.findById(decoded.userId);
        req.user = user;
        //req ko contoller ki trf move
        return next();

    }catch(err){
        console.error('authMiddleware verify error:', err);
        return res.status(401).json({
            message:"unauthorized access, token is invalid here "
        })
    }
}


module.exports = authMiddleware;