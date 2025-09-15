import jwt from "jsonwebtoken";

function verifyCredentials(req,res,next) {
    const token = req.cookies.accessToken;
    if(!token) {
        return res.status(401).json({success:false,message:"No access token"});
    }
    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });   
    }
}

export default verifyCredentials;