import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Provide name"],
    },
    email:{ 
        type:String,
        required:[true,"Provide Email"],
        unique : true
    },
    password:{
        type:String,
        required:[true,"Provide Password"],
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

const User = mongoose.models.User || mongoose.model("User",userSchema)

export default User
