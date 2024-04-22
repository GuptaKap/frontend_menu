import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';

const Signup = (props) => {
  const [credentials, setcredentials] = useState({ name: "", contactNo: "", email: "" });
  let navigate = useNavigate();
  const host = process.env.REACT_APP_API_BASE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, contactNo, email } = credentials;
    //API
    const response = await fetch (`${host}/api/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

        }, body: JSON.stringify({ name, contactNo, email })
      });
    const json = await response.json();
    console.log(json)
    if (json.success) {
      //Save the authtoken and redirect
      console.log("Successful Signup");
      localStorage.setItem('token', json.authToken);
      
      navigate("/login");
      console.log("create")
    }
    else {
      console.log("Not create")
    }
  }
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.id]: e.target.value })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='flex justify-center items-center h-screen'>
          <div className='w-80 bg-white border border-black p-4 rounded-lg'>
            <h2 className='text-xl font-semibold mb-4 text-center'>Sign Up</h2>
            <div className='mb-3'>
              <label htmlFor='name' className='block mb-1'>Name</label>
              <input type='text' id='name' value={credentials.name} className='w-full border border-gray-300 rounded px-3 py-2' onChange={onChange} minLength={5} required />
            </div>
            <div className='mb-3'>
              <label htmlFor='email' className='block mb-1'>Email</label>
              <input type='text' id='email' value={credentials.email} className='w-full border border-gray-300 rounded px-3 py-2' onChange={onChange} required />
            </div>
            <div className='mb-3'>
              <label htmlFor='number' className='block mb-1'>Contact No.</label>
              <input type='number' id='contactNo' value={credentials.contactNo} className='w-full border border-gray-300 rounded px-3 py-2' onChange={onChange} pattern="[0-9]{10}" title="Please enter 10 digits" required />
            </div>
            <div className='mb-4'>

              <button className='bg-gray-700 text-white w-full border border-gray-300 rounded px-3 py-2' > Create Account</button>
            </div>

            <hr className='my-4' />
            <div>
              <span className='mb-2'>Already have an Account?</span>
              <Link to='/login' className='text-blue-500 ml-2'>Login</Link>
            </div>
          </div>
        </div>
      </form>
      
    </>
  );
}

export default Signup;
