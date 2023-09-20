import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Profile from "@/models/profileModel";
import User from "@/models/userModel";
import { NextResponse,NextRequest } from "next/server";

connect();

export async function GET(request:NextRequest){
    try {

        const userId = await getDataFromToken(request)
        const user = await User.findOne({_id:userId}).select("-password")
        const profile = await Profile.findOne({userId:userId})
        // console.log(profile)
        return NextResponse.json({
            message:'user found',
            userdata:user,
            profiledata:profile
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }
}