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
        const {storename,description} = reqBody
        const profile = await Profile.findOne({userId:userId})
        const newstore = new Store({profileId:profile._id,storename:storename, description:description})
        const savedStore = await newstore.save()
        profile.stores.push(savedStore)
        await profile.save()
        return NextResponse.json({message:'store created',success:true})
    }
    catch (error:any) {
        console.log(error)
        return NextResponse.json({error: error.message},{status:500})

    }


}