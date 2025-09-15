import {User} from "../models/user.model.js"
import { sendTokenCookie } from "../utils/auth.util.js";
import { generateAccessToken } from "../utils/auth.util.js";
import bcrypt from "bcrypt";

async function signup(req,res) {
    try {
        const {fullName,email,password} = req.body;
        if(!(fullName && email && password)) {
            return res.status(400).json({success:false,message:"Provide all credentials"});
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "Email already exists" });
        }
        const user = await User.create({fullName,email,password});
        const accessToken = generateAccessToken(user._id);
        sendTokenCookie(res,accessToken);
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Error in signing up:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

async function login(req,res) {
    try {
        const {email,password} = req.body;
        if(!(email && password)) {
            return res.status(400).json({success:false,message:"Provide all credentials"});
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Email does not exist. Kindly signup" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Incorrect Password" });
        }
        const accessToken = generateAccessToken(user._id);
        sendTokenCookie(res, accessToken);
        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

async function changePassword(req,res) {
    try {
        const {id} = req.user;
        const user = await User.findById(id);
        if(!user) {
            return res.status(401).json({success:false,message:"User not found while changing passowrd"});
        }
        const {currPassword,updatedPassword} = req.body;
        if(!currPassword) {
            return res.status(401).json({success:false,message:"Current password is required to change the password."});
        }
        const isMatch = await bcrypt.compare(currPassword,user.password);
        if(!isMatch) {
            return res.status(401).json({success:false,message:"Current password is incorrect."});
        }
        if(!updatedPassword) {
            return res.status(400).json({success:false,message:"Provide password to update"});
        }
        user.password = updatedPassword;
        await user.save();
        return res.status(201).json({success:true,message:"Password updated successfully"});
    } catch (error) {
        console.log("Error during changing password:",error);
        return res.status(500).json({success:false,message:"Internal server error"});
    }
}

export {signup,login,changePassword};