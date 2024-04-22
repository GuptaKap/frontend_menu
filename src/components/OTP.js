import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';

const OTP = (props)=> {
  const Email =localStorage.getItem('email');
    const [credentials, setcredentials] = useState({ email:`${Email}`,otp: "" });
    let navigate = useNavigate();
    const host = process.env.REACT_APP_API_BASE_URL;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email,otp } = credentials;
        //API
        const response = await fetch (`${host}/api/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }, body: JSON.stringify({ email,otp })
        });
        
        if (response.ok) {
          //Save the authtoken and redirect
          console.log("correct");
          
          navigate("/");
        
        }
        else {
          console.log("not correct")
        }
      }
      const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.id]: e.target.value })
      }
  return (
    <>
    <form onSubmit={handleSubmit}>
    <div className='flex justify-center items-center h-screen'>
      <div className='w-96 bg-white border border-black p-4 rounded-lg'>
        <h2 className='text-xl font-semibold mb-4 text-center'>Login</h2>
        <div className='mb-4'>
          <label htmlFor='email' className='block mb-1'>Email</label>
          <input type='text' id='email' value={credentials.email} className='w-full  border border-gray-300 rounded-md px-3 py-2'  />
        </div>
        <div className='mb-4'>
          <label htmlFor='email' className='block mb-1'>OTP</label>
          <input type='text' id='otp' value={credentials.otp} className='w-full  border border-gray-300 rounded-md px-3 py-2' onChange={onChange} />
        </div>
        <div className='mb-4'>

          <button  className='bg-gray-500 hover:bg-gray-600 text-white w-full border border-gray-300 rounded-md px-3 py-2' >Login</button>
        </div>
        
      
      </div>
    </div>
    </form>
    
    </>
  )
}

export default OTP
