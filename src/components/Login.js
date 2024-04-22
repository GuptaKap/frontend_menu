import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = (props) => {

  const [credentials, setCredentials] = useState({ email: "" });
  const navigate = useNavigate();
  const host = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = credentials;

    try {
      const response = await fetch(`${host}/api/otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email })
      });
      const json = await response.json();
      if (response.ok) {
        console.log("Successful login");
        // Store email in local storage
        localStorage.setItem('token',json.authToken)
        localStorage.setItem('email', email);
        navigate("/otp"); // Navigate to "/otp" route
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      console.log("Login failed");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex justify-center items-center h-screen'>
        <div className='w-96 bg-white border border-black p-4 rounded-lg'>
          <h2 className='text-2xl font-semibold mb-4 text-center '>Login</h2>
          <div className='mb-4'>
            <label htmlFor='email' className='block mb-1 px-2 text-lg'>Email</label>
            <input type='text' id='email' value={credentials.email} className='w-full  border border-gray-300 rounded-md px-3 py-2' onChange={onChange} />
          </div>
          <div className='mb-4'>
            <button className='bg-gray-500 hover:bg-gray-600 text-white w-full border border-gray-300 rounded-md px-3 py-2'>Send OTP</button>
          </div>

          <div className="mb-4 flex items-center justify-center">
            <hr className='flex-grow border border-gray-300' />
            <span className='absolute -mt-1 text-center text-xl text-gray-500 bg-white px-2'>or</span>
          </div>
          <div className='mb-4 w-full text-center  border border-gray-300 rounded-md px-3 py-2'>
            <i className="  fa-solid fa-envelope"></i>
            <span className='px-1'>Continue with Email</span>
          </div>
          <div className='mb-4 w-full text-center border border-gray-300 rounded-md px-3 py-2'>
            <i className=" fa-brands fa-google"></i>
            <span className='px-1'>Continue with Google</span>
          </div>
          <hr className='mb-3' />
          <div >
            <span className='mb-2'>New to MenuCart?</span>
            <Link to='/signup' className='text-blue-500 ml-2'>Signup</Link>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
