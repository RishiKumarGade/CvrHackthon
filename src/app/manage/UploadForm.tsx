'use client';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function UploadForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
          const imageUrl = uploadedImageData.secure_url.toString();
          console.log(imageUrl);
        }
        else{
            toast.error('Please upload only images')
        }
    } catch (error) {
        console.log(error);
    }

  } 

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileInput} />
        <button onClick={(e)=>{e.preventDefault();UploadToCloudinary()}}>Upload</button>
      </form>
    </div>
  );
}
