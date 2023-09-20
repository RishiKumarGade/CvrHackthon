import {connect} from '@/dbConfig/dbConfig';
import { NextRequest,NextResponse } from 'next/server';
import Profile from '@/models/profileModel';
import User from '@/models/userModel';
import Store from '@/models/storeModel';
import { getDataFromToken } from '@/helpers/getDataFromToken';

connect()


export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const userId = await getDataFromToken(request)
        const {latitude,longitude} = reqBody
        const profile = await Profile.findOne({userId:userId})
        profile.latitude = latitude
        profile.longitude = longitude
        await profile.save()
        return NextResponse.json({message:'Location Updated',success:true})
    }
    catch (error:any) {
        console.log(error)
        return NextResponse.json({error: error.message},{status:500})

    }


}