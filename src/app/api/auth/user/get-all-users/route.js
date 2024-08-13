import { connect } from "@/lib/database/dbConfig";
import User from "@/lib/database/models/userModels";

import {NextResponse } from "next/server";

connect();

export async function GET() {
    try {
        const user = await User.find()
        if(!user){
            return NextResponse.json({
                message:"No Users To Show",
            },{status:404})
        }
       
        return NextResponse.json({
            data:user
        },{status:200})
    }catch (error) {
        return NextResponse.json(
            {error:error.message},
            {status:500}
        )
    }
  
}
