import { connect } from "@/lib/database/dbConfig";
import Task from "@/lib/database/models/taskModels";
import User from "@/lib/database/models/userModels";
import { getUserToken } from "@/lib/getUserToken";

import {NextResponse } from "next/server";

connect();

export async function GET(request) {
    try {
        const userId = await getUserToken(request)
        
        const user = await User.findOne({_id:userId}).select("-password")
        if(!user){
            return NextResponse.json({
                message:"Unauthorized user",
            },{status:403})
        }

        const tasks = await Task.find({ visibility: "visible",creator:userId }).populate("assignTo");
        
        if(!tasks){
            return NextResponse.json({
                message:"No Tasks To Show",
            },{status:404})
        }
       
        return NextResponse.json({
            data:tasks
        },{status:200})
    }catch (error) {
        return NextResponse.json(
            {error:error.message},
            {status:500}
        )
    }
  
}

