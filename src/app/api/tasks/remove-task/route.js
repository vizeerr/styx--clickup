
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
        const { id } = reqBody;

          const task = await Task.findOne({_id:id});
          if(task){
            const deletedTask = await Task.findOneAndUpdate({visibility:"hidden"})
            if (deletedTask) {
                return NextResponse.json(
                  { message: "Task deleted successfully" },
                  { status: 200 }
                );
              }
          }
          else{
            return NextResponse.json(
                { message: "Task Not Deleted" },
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
