import { login, signup } from "@/app/controllers/user";
import dbConnection from "@/app/utils/database";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
    await dbConnection();

    try {
        const {searchParams} = new URL(req.url);
        // if /auth?signup=true&passcode=99&val=0.4 => searchparams : {signup : true, passcode : 99 , val : 0.4}
        // http://localhost:3000/api/auth?signup=true
        if(searchParams.get('signup')) {
            return signup(req);
        }
        // http://localhost:3000/api/auth?login=true
        if(searchParams.get('login')) {
            return login(req);
        }
        return NextResponse.json({message : "testing api"});
    } catch (error) {
        return NextResponse.json({success : false , message : "Internal Server Error(auth routes) " + error.message});
    }
}

export async function GET() {
    try {
        await cookies().set("userToken", "", { expires: new Date(0) }); // Clearing token
        return NextResponse.json({ success: true, message: "Logout successful" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: `Logout failed: ${error.message}` }, { status: 500 });
    }
}