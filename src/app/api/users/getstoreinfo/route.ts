import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Store from "@/models/storeModel";
import { NextResponse,NextRequest } from "next/server";

connect();

export async function GET(request:NextRequest){
    try {
        const userId = await getDataFromToken(request)
        const reqBody = await request.json()
        console.log(reqBody)
        // const {storeid} = reqBody
        // const store = await Store.findOne({_id:storeid})
        return NextResponse.json({
            message:'Store found',
            // data:store
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }
}