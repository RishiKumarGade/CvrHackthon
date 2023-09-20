import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Profile from "@/models/profileModel";
import Store from "@/models/storeModel";
import User from "@/models/userModel";
import { NextResponse,NextRequest } from "next/server";

connect();

export async function GET(request:NextRequest){
    try {

        const userId = await getDataFromToken(request)
        const reqBody = request.json()
        const 
        const profile = await Profile.findOne({userId: userId});
        profile.lo
        
        let products = []
        try {
        stores = await Store.find({profileId:profile._id}).populate('products')
        } catch (error) {
        stores = await Store.find({profileId:profile._id})
        }
        return NextResponse.json({
            message:'user found',
            data:stores,
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }
}



