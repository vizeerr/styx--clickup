
import { connect } from "@/lib/database/connect";
import Task from "@/lib/database/models/taskModels";
import User from "@/lib/database/models/userModels";
import { getUserToken } from "@/lib/getUserToken";
import {NextResponse } from 'next/server';


connect();

export async function POST(request) {
    try {

        const userId = await getUserToken(request)
        
        const user = await User.findOne({_id:userId}).select("-password")
        if(!user){
            return NextResponse.json({
                message:"Unauthorized user",
            },{status:404})
        }

        const reqBody = await request.json();
        const { taskName,taskDescription,assignTo,priority,status,dueDate } = reqBody;

        const newTask = new Task({
            taskName,
            taskDescription,
            assignTo,
            priority:priority||"normal",
            status:status||"todo",
            dueDate,
            creator:userId
          });
      
          const savedTask = await newTask.save();
          if (savedTask) {
            await savedTask.populate('assignTo');

            return NextResponse.json(
              { message: "Task created successfully",
                data:savedTask
               },
              { status: 200 }
            );
          }else{
            return NextResponse.json(
                { message: "Task Not Created" },
                { status: 403 }
              );
          }

    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
