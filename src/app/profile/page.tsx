'use client';

import axios from 'axios'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] :any   = useState()
  const [profile, setProfile] :any = useState()

  // ----------------------------GET USER DATA--------------------------------------------------------

  const getUserDetails = async()=>{
    const res = await axios.get('api/users/me')
    setUser(res.data.userdata)
    setProfile(res.data.profiledata)
  }
  // -------------------------------------LOGOUT-----------------------------------------------
  const logout = async ()=>{
    try {
      await axios.get('api/users/logout')
      router.push('/signup')
    } catch (error:any) {
      console.log(error.message)
    }
  }
  // ---------------------------------------LOAD AT VISIT---------------------------------------------

  useEffect(()=>{
    getUserDetails()
  },[])

  // ----------------------------------------GET USER LOCATION--------------------------------------------

  const getLocation =()=>{
    try {
      navigator.geolocation.getCurrentPosition((position)=>{
      updateLocation(position.coords.latitude,position.coords.longitude).then(()=>{
        location.reload()
      })
      })
    } catch (error:any) {
      toast.error(error)
    }
  }
  // ----------------------------------------UPDATE LOCATION--------------------------------------------

  const updateLocation = async(latitude:any,longitude:any)=>{
    try {
    const res = await axios.post('api/users/setlocation',{latitude:latitude,longitude:longitude})
    console.log(res)
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <>
    ProfilePage
    <br/>
    <button onClick={logout} >logout</button>
    <br/> 
      {user != null && <><p>{user.username}</p>
      <p>{user.email}</p>
      <p>{profile.description}</p>
      <p>{user.isVerified === false  ?  'not verified' : 'verified' }</p> 
      {(profile.latitude == null || profile.longitude == null) ?
      <div>
      <h1>Please Set Your Location To Start Selling Or Buying</h1>
      <button onClick={getLocation}>Add Location</button>
      </div>:
      <div>
        <h1>Your Location is {profile.latitude}, {profile.longitude}</h1>
        <br />
        <button onClick={getLocation}>Update Location</button>
        <br />
        <Link href='/manage'>Manage Store</Link>
        <br />
        <Link href='/search'>Search Products</Link>
      </div>
    }
      </>
      }
    <br />
    <br />

    </>
  )
}


