import {connect} from '@/dbConfig/dbConfig';
import { NextRequest,NextResponse } from 'next/server';
import Profile from '@/models/profileModel';
import User from '@/models/userModel';
import Store from '@/models/storeModel';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import axios from 'axios';

connect()


export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const userId = await getDataFromToken(request)
        const {file} = reqBody
        const res = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`,file)
        console.log(res)
        return NextResponse.json({message:'store created',success:true})
    }
    catch (error:any) {
        console.log(error)
        return NextResponse.json({error: error.message},{status:500})

    }


}