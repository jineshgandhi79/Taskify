import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            trim: true,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: [true, "Email is required"],
        },
        password: {
            type: String,
            trim: true,
            required: [true, "Password is required"],
        },
        forgotPasswordOTP: {
            type: Number,
            default: 0
        },
        forgotPasswordOTPExpire: {
            type: Number,
            default: 0
        },
        emailVerifydOTP: {
            type: Number,
            default: 0
        },
        emailVerifyOTPExpire: {
            type: Number,
            default: 0
        },
        isEmailVerified: {
            type: Boolean,
            default: false
        }
    },
    {timestamps:true}
)

userSchema.pre('save',async function(next){
    try {
        if(!this.isModified("password")) return next();
        this.password = await bcrypt.hash(this.password,10);
        next();
    } catch (error) {
        console.log("Error in pre middleware for userSchema in save",error);
    }
})

userSchema.pre('findOneAndUpdate', async function (next) {
    try {
        const update = this.getUpdate();
        if (update?.password) {
            const hashed = await bcrypt.hash(update.password, 10);
            this.setUpdate({ ...update, password: hashed });
        }
        next();
    } catch (error) {
        console.log("Error in pre middleware for userSchema in findOneAndUpdate",error);
    }
});



export const User = mongoose.model("User",userSchema);