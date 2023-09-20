'use client';

import axios from 'axios'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function ProfilePage() {

  const [requirements , setRequirements] = useState({category:'' , name:'',location:5,})
  const[products,setProducts] = useState(null);

  const getProductsData = async()=>{
    try {
      const res = await axios.get('')
      
    } catch (error) {
      
    }
  }

  return (
    <>
    Search Page

    <input type="text" value={requirements.name} placeholder='name of the product' onChange={(e)=>{setRequirements({...requirements,name:e.target.value});getProductsData()}}  />
    <input type="text" value={requirements.name} placeholder='category of the product' onChange={(e)=>{setRequirements({...requirements,category:e.target.value});getProductsData()}}  />
    <input type="number" value={requirements.name} placeholder='distance in KM' onChange={(e)=>{setRequirements({...requirements,location:Number(e.target.value)});getProductsData()}}  />
    
    </>
  )
}


