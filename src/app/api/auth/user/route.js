import { connect } from "@/lib/database/connect";
import User from "@/lib/database/models/userModels";
import { getUserToken } from "@/lib/getUserToken";
import { NextResponse } from "next/server";

connect();
// new deploy

export async function GET(request) {
    try {

        const userId = await getUserToken(request)
        
        const user = await User.findOne({_id:userId}).select("-password")
        if(!user){
            return NextResponse.json({
                message:"Unauthorized user",
            },{status:404})
        }
        return NextResponse.json({
            message:"Logged in Success",
            data:user
        },{status:200})
    }catch (error) {
        return NextResponse.json(
            {error:error.message},
            {status:500}
        )
    }
  
}
