'use client';

import axios from 'axios'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { ReactNode, use, useEffect, useState } from 'react'
import toast from 'react-hot-toast';



export default function ManagePage() {
    const router = useRouter();
    const [add,setAdd] = useState(false)
    const [storedetails,setStoreDetails] = useState({storename:'',description:''})
    const [selectedStore,setSelectedStore] = useState(null);
    const [editstoredetails,setEditStoreDetails] = useState({storeid:null,storename:'',description:''})
    const [productdetails,setProductdetails] = useState({storeid:null,name:'',description:'',price:0,imageurl:'',category:''})
    const [stores,setStores]:any = useState()
    const [selectedOperation,setSelectedOperation] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // -------------------------------UPLOAD FUNCTIONS FOR CLOUDINARY----------------------------------------------

    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files ? event.target.files[0] : null;
      setSelectedFile(file);
    };
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log(selectedFile);
    };
  
    const UploadToCloudinary = async() =>{
      try {
          if (selectedFile?.type === 'image/png' || selectedFile?.type === 'image/jpeg' || selectedFile?.type === 'image/jpg'){
              
            const formdata = new FormData();
            formdata.append('file', selectedFile)
            formdata.append('upload_preset','cvrhackthon')
            const uploadResponse = await fetch(
              "https://api.cloudinary.com/v1_1/dvudkkxl4/image/upload",
              {
                method: "POST",
                body: formdata,
              }
            );
            const uploadedImageData = await uploadResponse.json();
            const imageUrl = uploadedImageData.url;
            return imageUrl
          }
          else{
              toast.error('Please upload only images')
          }
      } catch (error) {
          console.log(error);
      }
  
    } 

    const Add = async()=>{
      if (add === true){
        setAdd(false)
        setStoreDetails({storename:'',description:''})
      }
      else{
        setAdd(true)
      }
    }
// -------------------------------------------------

const setupStore = async(a:string,key:any)=>{
  setSelectedOperation(a)
  setSelectedStore(key)
  if(a ==='EDIT'){
    setEditStoreDetails({...editstoredetails,storeid:key})
  }
  if(a ==='ADDPROD'){
    setProductdetails({...productdetails,storeid:key})
  }
}
  
  // -------------------------------ADDING STORE---------------------------------------
    const CreateStore = async ()=>{
      try {
        if (storedetails.storename !=''){
        const response = await axios.post('api/users/createstore',storedetails)
        console.log('succesfuly created',response)
        router.push('/profile')
        location.reload()
        }
        else{
          toast.error('Please fill all fields')
        }
  
      } catch (error:any) {
        console.log('creating failed',error.message)
        toast.error(error.message)
      }
    } 
  
    //  ------------------------------- UPDATE STORE --------------------------------

    const Updatestore = async ()=>{
      try {
        if (editstoredetails.storename !=''){
        const response = await axios.post('api/users/updatestore',editstoredetails)
        console.log('succesfuly update',response)
        router.push('/manage')
        location.reload()
        }
        else{
          toast.error('Please fill all fields')
        }
  
      } catch (error:any) {
        console.log('creating failed',error.message)
        toast.error(error.message)
      }
    } 
  // ----------------------------------ADDING PRODUCT------------------------------------
  const AddProduct = async ()=>{
    try {
      const imageUrl = UploadToCloudinary();
      imageUrl.then((value:string)=>{
        productdetails.imageurl = value
      }).then( async ()=>{
        if (productdetails.name !='' || productdetails.price != 0 || productdetails.imageurl !='' || productdetails.storeid !=null || productdetails.category !=''){
        const response = await axios.post('api/users/addproduct',productdetails)
        console.log('succesfuly added',response)
        router.push('/manage')
        }
        else{
          toast.error('Please fill all fields')
        }
      }).then(()=>{
        location.reload()
      })
    } catch (error:any) {
      console.log('adding failed',error.message)
      toast.error(error.message)
    }
  } 
  // ----------------------------GET STORES INFORMATION------------------------------------------
  const getStores = async ()=>{
    const res = await axios.get('api/users/getstores')
    setStores(res.data.data)
  }
  useEffect(()=>{
    getStores()
  },[])
  
    return (
      <>
    <h1>--------------------------------------STORES-------------------------------------------------</h1>
    {stores != undefined || null  ? stores.map((store:any)=>{
      return( 
        <div className="card" key={store._id}>
          <div>
          <h5 className="card-title">{store.storename}</h5>
          <p >{store.description}</p>
          <button onClick={(e)=>{e.preventDefault();setupStore('EDIT',store._id)}} >Edit Store</button>
          <button onClick={(e)=>{e.preventDefault();setupStore('VIEW',store._id)}}>View Store</button>
          <button onClick={(e)=>{e.preventDefault();setupStore('ADDPROD',store._id)}} >Add Product</button>
          <Link href={`/manage/${store._id}`} >got to store</Link>
          </div>
        </div>
        )
      })
    : <>
    No stores
    </>
    }
    

      { (stores!=null ||undefined) && stores.map((store:any)=>{
        return (
          <div key={store._id} >
          <div>
            <h1>-----------------------------------EDIT STORE------------------------------------------</h1>
            {(selectedOperation=== 'EDIT' && selectedStore == store._id ) && <>
            <div className="card" key={store._id}>
            <p>Editing : {editstoredetails.storeid}</p>
            <input  value={editstoredetails.storename} onChange={(e)=>setEditStoreDetails({...editstoredetails,storename:e.target.value})} placeholder='store name' type="text"/>
            <input  value={editstoredetails.description} onChange={(e)=>setEditStoreDetails({...editstoredetails,description:e.target.value})} placeholder='store desc' type="text"/>
            <button onClick={Updatestore}>Update Store</button>
            </div>
            </>}
          </div>
          <div>
          <h1>-----------------------------------VIEW STORE------------------------------------------</h1>
          {(selectedOperation=== 'VIEW' && selectedStore == store._id ) && <>
          {(store.products.length > 0 ) ? <>
          {store.products.map((product:any)=>{
            return <div key={product._id}>
            <p> {product.name} </p>
            <p> {product.price} </p>
            </div>
          })}
          </> : <>No Products</> }
          </>}
          </div>
        <div>
        <h1>-----------------------------------ADD PRODUCT------------------------------------------</h1>
        {(selectedOperation=== 'ADDPROD' && selectedStore == store._id ) && <>
        <p>Adding To {store.storename}</p>
        <input  value={productdetails.name} onChange={(e)=>setProductdetails({...productdetails,name:e.target.value})} placeholder='product name' type="text"/>
          <input  value={productdetails.description} onChange={(e)=>setProductdetails({...productdetails,description:e.target.value})} placeholder='product desc' type="text"/>
          <input  value={productdetails.price} onChange={(e)=>setProductdetails({...productdetails,price:Number(e.target.value)})} placeholder='product price' type="number"/>
          <input  value={productdetails.category} onChange={(e)=>setProductdetails({...productdetails,category:e.target.value})} placeholder='product category' type="text"/>
          <div className="App">
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileInput} />
          </form>
        </div>
          <button onClick={(e)=>{e.preventDefault();AddProduct()}}>Add Product</button>
        
        </> }

          
        </div>
          </div>
        )
      })}

      <div>
        <h1>--------------------------------------ADD STORE-------------------------------------------------</h1>
        <button onClick={Add} >Add Store</button>
        {add && 
        <>
          <input  value={storedetails.storename} onChange={(e)=>setStoreDetails({...storedetails,storename:e.target.value})} placeholder='store name' type="text"/>
          <input  value={storedetails.description} onChange={(e)=>setStoreDetails({...storedetails,description:e.target.value})} placeholder='store desc' type="text"/>
          <button onClick={CreateStore}>Create Store</button>
        </>
        }
      </div>
      </>
  
    )
  }
  