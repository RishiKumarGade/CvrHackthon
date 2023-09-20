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
        const {storeid,storename,description} = reqBody
        const store = await Store.findOne({_id:storeid})
        store.storename = storename
        store.description = description
        await store.save()
        return NextResponse.json({message:'store updated',success:true})
    }
    catch (error:any) {
        console.log(error)
        return NextResponse.json({error: error.message},{status:500})

    }


}