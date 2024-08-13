import { NextResponse } from "next/server";

export async function GET(request){
    try {
        const response = NextResponse.json({
            message:"Logout Successfully",
            success:true
        },{status:200})
        
        response.cookies.set("AuthToken","",{
            httpOnly:true,
            expires: new Date(0)
        })      
        return response
    } catch (error) {
        return NextResponse.json(
            {error:error.message},
            {status:500}
        )
    }
}