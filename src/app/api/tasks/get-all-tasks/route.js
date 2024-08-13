import { connect } from "@/lib/database/dbConfig";
import Task from "@/lib/database/models/taskModels";
import User from "@/lib/database/models/userModels";

import {NextResponse } from "next/server";

connect();

export async function GET() {
    try {
        const tasks = await Task.find({ visibility: "visible" }).populate("assignTo");

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

