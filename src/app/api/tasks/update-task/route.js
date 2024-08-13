import { connect } from "@/lib/database/connect";
import Task from "@/lib/database/models/taskModels";
import User from "@/lib/database/models/userModels";
import { getUserToken } from "@/lib/getUserToken";
import { NextResponse } from 'next/server';

connect();

export async function POST(request) {
    try {
        const userId = await getUserToken(request);
        const user = await User.findOne({ _id: userId }).select("-password");
        if (!user) {
            return NextResponse.json({
                message: "Unauthorized user",
            }, { status: 401 });
        }

        const reqBody = await request.json();
        const { _id, status, priority, dueDate, taskName, assignTo,visibility,taskDescription } = reqBody;

        
        const filter = {};
        if (_id) filter._id = _id;
        if (status) filter.status = status;
        if (priority) filter.priority = priority;
        if (dueDate) filter.dueDate = dueDate;
        if (taskName) filter.taskName = taskName;
        if (assignTo) filter.assignTo = assignTo;
        if(visibility) filter.visibility = visibility;
        if(taskDescription) filter.taskDescription = taskDescription

       
        const task = await Task.findOne({ _id: _id });
        if (task) {
            const taskUpdated = await Task.findOneAndUpdate(
                { _id: _id }, 
                { $set: filter },
                { new: true }
            );
            if (taskUpdated) {
                return NextResponse.json(
                    { message: "Task updated successfully", data: taskUpdated },
                    { status: 200 }
                );
            }
        } else {
            return NextResponse.json(
                { message: "Task not found" },
                { status: 404 }
            );
        }

    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
