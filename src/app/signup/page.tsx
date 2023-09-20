'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function SignupPage() {
  const router = useRouter();
  const [user,setUser] = useState({
    email:'',
    password:'',
    username:'',
  })
  const [buttonDisabled,setButtonDisabled] = useState(false);
  const [loading,setLoading] = useState(false);


  const onSignup = async ()=>{

    try {
      setLoading(true);
      axios.post('api/users/signup',user)
      console.log('succesfully created')
      router.push('/login')
       
    } catch (error:any) {
      toast.error(error.message)
      console.log(error)
    }
    finally{
      setLoading(false)
    }
  } 

  useEffect(()=>{
    if (user.email.length>0 && user.username.length>0 && user.password.length>0){
      setButtonDisabled(false);
    }
    else{
      setButtonDisabled(true)
    }
  },[user])


  return (
    <>
    <div>Signup</div>
  <div className='flex'> 
  <h1> {loading?'processing': 'signup'  } </h1>
    <hr/>
    <label htmlFor="username">username</label>
    <input className='p-2 border-gray-300 rounded-lg' type="text" id='username' value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})} placeholder='username'/>
    <label htmlFor="email">email</label>
    <input className='p-2 border-gray-300 rounded-lg' type="email" id='email' value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} placeholder='email'/>
    <label htmlFor="password">password</label>
    <input className='p-2 border-gray-300 rounded-lg' type="password" id='password' value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} placeholder='password'/>
    <button className='p-2'  onClick={onSignup} >{buttonDisabled? 'no signup' : 'signup'}</button>
    <Link href='/login' className='p-2' >Visit Login</Link>
    </div>
    </>
  )
}

